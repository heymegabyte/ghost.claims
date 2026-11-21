import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { verifyConstrainedInteractionTrace } from '../../theme.tools/packages/testing/dist/runtime-module-boundary.js';

test('the EMF chart constrained trace remains valid and Worker-bound', async () => {
  const receipt = JSON.parse(await readFile(new URL('../docs/runtime-boundary/emf-chart-constrained-trace.json', import.meta.url), 'utf8'));
  const report = verifyConstrainedInteractionTrace(receipt);
  assert.deepEqual(report.issues, []);
  assert.equal(report.valid, true);
  assert.equal(receipt.interaction.strategy, 'main-thread');
  assert.equal(receipt.interaction.samples.length, 5);
  assert.ok(receipt.interaction.samples.every((sample) => sample.contentVisible && sample.focusPreserved && sample.keyboardOperable));
  assert.match(receipt.build.workerBundleDigest, /^sha256:[a-f0-9]{64}$/u);
});
