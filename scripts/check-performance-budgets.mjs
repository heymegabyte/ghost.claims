import { readFile, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";

const budgets = {
  "public/index.html": 90_000,
  "public/styles.css": 100_000,
  "public/app.js": 45_000,
  "public/features.js": 30_000,
  "public/performance.js": 4_000,
};

let failed = false;
for (const [file, limit] of Object.entries(budgets)) {
  const source = await readFile(file);
  const compressed = gzipSync(source, { level: 9 }).byteLength;
  const status = compressed <= limit ? "PASS" : "FAIL";
  if (status === "FAIL") failed = true;
  console.log(`${status} ${file}: ${compressed} gzip bytes (budget ${limit})`);
}

const heroBytes = (await stat("public/hero-bg.mp4")).size;
if (heroBytes > 2_000_000) failed = true;
console.log(`${heroBytes <= 2_000_000 ? "PASS" : "FAIL"} public/hero-bg.mp4: ${heroBytes} bytes (budget 2000000)`);

const html = await readFile("public/index.html", "utf8");
const eagerImages = [...html.matchAll(/<img\b[^>]*>/gi)].filter(([tag]) => !/loading=["']lazy["']/i.test(tag));
const blockingScripts = [...html.matchAll(/<script\b[^>]*src=["'][^"']+["'][^>]*>/gi)].filter(([tag]) =>
  !/\bdefer\b/i.test(tag) && !/\basync\b/i.test(tag) && !/type=["']module["']/i.test(tag)
);
console.log(`${eagerImages.length <= 20 ? "PASS" : "FAIL"} eager images: ${eagerImages.length} (budget 20)`);
console.log(`${blockingScripts.length === 0 ? "PASS" : "FAIL"} parser-blocking scripts: ${blockingScripts.length} (budget 0)`);
if (eagerImages.length > 20 || blockingScripts.length > 0) failed = true;

if (failed) process.exitCode = 1;
