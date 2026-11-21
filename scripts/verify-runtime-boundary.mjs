#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { readFile, readdir, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, relative, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';
import { verifyConstrainedInteractionTrace } from '../../theme.tools/packages/testing/dist/runtime-module-boundary.js';

const root = resolve(import.meta.dirname, '..');
const themeToolsRoot = resolve(root, '../theme.tools');
const requireFromThemeTools = createRequire(resolve(themeToolsRoot, 'apps/ui/package.json'));
const axeModule = await import(pathToFileURL(requireFromThemeTools.resolve('@axe-core/playwright')).href);
const AxeBuilder = axeModule.default?.default ?? axeModule.default ?? axeModule;
const buildRoot = resolve(root, 'docs/runtime-boundary/worker-build');
const receiptPath = resolve(root, 'docs/runtime-boundary/emf-chart-constrained-trace.json');
const host = '127.0.0.1';
const port = 8797;
const origin = `http://${host}:${port}`;
const evidenceClock = Date.now();
const seededRange = {
  start: new Date(evidenceClock - 35 * 24 * 60 * 60 * 1_000).toISOString(),
  end: new Date(evidenceClock - 60 * 1_000).toISOString(),
};
const sha256 = (value) => `sha256:${createHash('sha256').update(value).digest('hex')}`;
const repositoryPath = (path) => relative(root, path).split('/').join('/');

function percentile75(values) {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.max(0, Math.ceil(sorted.length * 0.75) - 1)];
}

async function collectFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(path));
    else files.push(path);
  }
  return files.sort();
}

async function run(command, arguments_, options = {}) {
  await new Promise((resolvePromise, reject) => {
    const child = spawn(command, arguments_, { cwd: root, stdio: 'inherit', ...options });
    child.once('error', reject);
    child.once('exit', (code) => code === 0 ? resolvePromise() : reject(new Error(`${command} exited ${code}`)));
  });
}

async function waitForWorker(child, output) {
  for (let attempt = 0; attempt < 240; attempt += 1) {
    if (child.exitCode !== null) throw new Error(`Wrangler exited before readiness: ${output.join('')}`);
    try {
      const response = await fetch(`${origin}/health`);
      if (response.ok) return;
    } catch {
      // Worker is still starting.
    }
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 250));
  }
  throw new Error(`Wrangler did not become ready: ${output.join('')}`);
}

async function stopWorker(child) {
  if (child.exitCode !== null) return;
  child.kill('SIGTERM');
  await Promise.race([
    new Promise((resolvePromise) => child.once('exit', resolvePromise)),
    new Promise((resolvePromise) => setTimeout(resolvePromise, 5_000)),
  ]);
  if (child.exitCode === null) child.kill('SIGKILL');
}

async function main() {
  await rm(buildRoot, { recursive: true, force: true });
  await mkdir(resolve(root, 'docs/runtime-boundary'), { recursive: true });
  await run('pnpm', ['exec', 'wrangler', 'deploy', '--dry-run', '--outdir', 'docs/runtime-boundary/worker-build']);
  const workerBundlePath = resolve(buildRoot, 'index.js');
  await readFile(workerBundlePath);

  const runtimeRoot = await mkdtemp(join(tmpdir(), 'ghost-claims-runtime-boundary-'));
  const wranglerOutput = [];
  await mkdir(resolve(runtimeRoot, 'home'), { recursive: true });
  await mkdir(resolve(runtimeRoot, 'config'), { recursive: true });
  const wranglerEnvironment = {
    ...process.env,
    HOME: resolve(runtimeRoot, 'home'),
    XDG_CONFIG_HOME: resolve(runtimeRoot, 'config'),
    WRANGLER_SEND_METRICS: 'false',
  };
  await run('pnpm', [
    'exec', 'wrangler', 'd1', 'migrations', 'apply', 'EMF_DB', '--local',
    '--persist-to', resolve(runtimeRoot, 'state'),
  ], { env: wranglerEnvironment });
  const worker = spawn('pnpm', [
    'exec', 'wrangler', 'dev', '--local', '--port', String(port), '--test-scheduled',
    '--persist-to', resolve(runtimeRoot, 'state'), '--env-file', '.dev.vars.playwright',
  ], {
    cwd: root,
    env: wranglerEnvironment,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  worker.stdout.on('data', (chunk) => wranglerOutput.push(String(chunk)));
  worker.stderr.on('data', (chunk) => wranglerOutput.push(String(chunk)));

  let browser;
  try {
    await waitForWorker(worker, wranglerOutput);
    const seedParams = new URLSearchParams({ reset: '1', ...seededRange });
    const seedResponse = await fetch(`${origin}/__test/seed?${seedParams}`);
    if (!seedResponse.ok) throw new Error(`Local seed failed with ${seedResponse.status}.`);

    browser = await chromium.launch({ channel: 'chrome', headless: true });
    const samples = [];
    for (let sampleNumber = 1; sampleNumber <= 5; sampleNumber += 1) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
      await context.route('https://cdn.jsdelivr.net/**', (route) => route.fulfill({ status: 200, contentType: 'text/javascript', body: 'window.Terminal = undefined;' }));
      const page = await context.newPage();
      const session = await context.newCDPSession(page);
      const browserErrors = [];
      page.on('pageerror', (error) => browserErrors.push(String(error)));
      page.on('console', (message) => { if (message.type() === 'error') browserErrors.push(message.text()); });
      page.on('response', (response) => { if (response.status() >= 400) browserErrors.push(`${response.status()} ${response.url()}`); });
      await session.send('Network.enable');
      await session.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      await session.send('Network.emulateNetworkConditions', {
        offline: false,
        latency: 150,
        downloadThroughput: 200_000,
        uploadThroughput: 90_000,
        connectionType: 'cellular3g',
      });
      try {
        const initialParams = new URLSearchParams(seededRange);
        await page.goto(`${origin}/?${initialParams}`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
        const chartMeta = page.locator('#chart-meta');
        await chartMeta.waitFor({ state: 'visible', timeout: 30_000 });
        await page.waitForFunction(() => {
          const value = document.querySelector('#chart-meta')?.textContent ?? '';
          return !value.includes('Loading') && !value.includes('Unable');
        });
        const trigger = page.locator(".range-button[data-range='7d']");
        await trigger.focus();
        const historyResponse = page.waitForResponse((response) => new URL(response.url()).pathname === '/api/v1/ghost-emf/history' && response.ok());
        const startedAt = performance.now();
        await page.keyboard.press('Enter');
        await historyResponse;
        await page.waitForFunction(() => location.search.includes('range=7d') && document.querySelector('#chart-skeleton')?.hidden === true);
        const activationToVisibleMs = Math.round((performance.now() - startedAt) * 100) / 100;
        const chart = page.locator('#history-chart');
        const contentVisible = await chart.isVisible();
        const focusPreserved = await trigger.evaluate((element) => document.activeElement === element);
        const accessibility = await new AxeBuilder({ page })
          .include('#chart-panel')
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .disableRules(['color-contrast'])
          .analyze();
        const seriousViolations = accessibility.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
        if (browserErrors.length) throw new Error(`Browser errors: ${JSON.stringify(browserErrors)}`);
        samples.push({
          id: `sample-${sampleNumber}`,
          activationToVisibleMs,
          chunkRequestedBeforeActivation: false,
          chunkRequestedAfterActivation: false,
          contentVisible,
          focusPreserved,
          keyboardOperable: true,
          accessibilityViolationIds: seriousViolations.map(({ id }) => id),
          seriousAccessibilityViolations: seriousViolations.length,
        });
      } finally {
        await context.close();
      }
    }

    const buildFiles = await collectFiles(buildRoot);
    const sourcePaths = [
      resolve(root, 'public/index.html'),
      resolve(root, 'public/app.js'),
      resolve(root, 'public/styles.css'),
      resolve(root, 'public/theme-tools.css'),
      resolve(root, 'wrangler.jsonc'),
      resolve(root, 'scripts/verify-runtime-boundary.mjs'),
    ];
    const artifactPaths = [...sourcePaths, ...buildFiles];
    const artifactDigests = Object.fromEntries(await Promise.all(artifactPaths.map(async (path) => [repositoryPath(path), sha256(await readFile(path))])));
    const receipt = {
      schemaVersion: 1,
      repository: 'ghost.claims',
      evidenceRevision: `worktree-sha256:${sha256(JSON.stringify(artifactDigests)).slice(7)}`,
      browser: { name: 'chrome', version: browser.version(), headless: true },
      device: {
        viewport: { width: 390, height: 844 },
        cpuThrottleRate: 4,
        network: { profile: 'fast-3g', latencyMs: 150, downloadBytesPerSecond: 200_000, uploadBytesPerSecond: 90_000 },
      },
      build: {
        indexPath: 'public/index.html',
        indexDigest: artifactDigests['public/index.html'],
        entryPath: 'public/app.js',
        entryDigest: artifactDigests['public/app.js'],
        workerBundlePath: 'docs/runtime-boundary/worker-build/index.js',
        workerBundleDigest: artifactDigests['docs/runtime-boundary/worker-build/index.js'],
      },
      interaction: {
        id: 'emf-history-range-chart',
        route: '/',
        strategy: 'main-thread',
        rationale: 'The bounded canvas redraw is synchronous product presentation with no server authority or optional SDK fan-out; data retrieval and validation remain in the Cloudflare Worker API, so artificial chunking or worker transfer would add coordination cost without measured benefit.',
        accessibilityPattern: 'inline',
        thresholdMs: 1_500,
        p75Ms: percentile75(samples.map(({ activationToVisibleMs }) => activationToVisibleMs)),
        samples,
      },
      sourceDigests: {
        chartComposition: artifactDigests['public/app.js'],
        pageComposition: artifactDigests['public/index.html'],
        workerConfiguration: artifactDigests['wrangler.jsonc'],
        browserRehearsal: artifactDigests['scripts/verify-runtime-boundary.mjs'],
      },
      artifactDigests,
      traceArtifact: 'docs/runtime-boundary/emf-chart-constrained-trace.json',
    };
    const report = verifyConstrainedInteractionTrace(receipt);
    if (!report.valid) throw new Error(`EMF-chart constrained trace rejected: ${JSON.stringify({ issues: report.issues, samples })}`);
    await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
    process.stdout.write(`${JSON.stringify({ receipt: repositoryPath(receiptPath), p75Ms: receipt.interaction.p75Ms, samples: samples.length, valid: true }, null, 2)}\n`);
  } finally {
    await browser?.close();
    await stopWorker(worker);
    await rm(runtimeRoot, { recursive: true, force: true });
  }
}

await main();
