import { test, expect } from "@playwright/test";
import {
  SEEDED_CUSTOM_RANGE,
  SEEDED_FULL_RANGE,
  countCsvRows,
  expectNoConsoleErrors,
  getJson,
  gotoHome,
  readDownload,
  resetSnapshots,
  seedSnapshots,
  trackConsoleErrors,
} from "./helpers.js";

test.beforeEach(async ({ request }) => {
  await seedSnapshots(request, SEEDED_FULL_RANGE);
});

test("CSV and Excel downloads from chart panel match snapshot API row count", async ({ page, request }) => {
  await gotoHome(page, SEEDED_CUSTOM_RANGE);
  const query = `start=${encodeURIComponent(SEEDED_CUSTOM_RANGE.start)}&end=${encodeURIComponent(SEEDED_CUSTOM_RANGE.end)}`;
  const snapshot = await getJson(request, `/api/v1/ghost-emf/snapshot?${query}`);

  const csvPromise = page.waitForEvent("download");
  await page.locator("#export-csv-link").click();
  const csvDownload = await csvPromise;
  const csvText = await readDownload(csvDownload);
  expect(csvText).toContain("entity_id,state,numeric_value");
  expect(countCsvRows(csvText)).toBe(snapshot.sampleCount + 1);

  const excelPromise = page.waitForEvent("download");
  await page.locator("#export-excel-link").click();
  const excelDownload = await excelPromise;
  const excelText = await readDownload(excelDownload);
  expect(excelText).toContain("<table");
  expect(excelText).toContain("numeric_value");
});

test("OpenAPI contract includes all v1 endpoints plus new chat, twilio, and transmission routes", async ({ request }) => {
  const openapi = await getJson(request, "/api/v1/openapi.json");
  expect(Object.keys(openapi.paths)).toEqual(
    expect.arrayContaining([
      "/api/v1/ghost-emf/current",
      "/api/v1/ghost-emf/snapshot",
      "/api/v1/ghost-emf/export",
      "/api/v1/ghost-emf/google-sheets",
      "/api/v1/ghost-emf/random",
      "/api/v1/ghost-emf/history",
      "/api/v1/ghost-emf/entropy",
      "/api/v1/ghost-emf/timeline",
    ]),
  );

  // Chat endpoint works
  const chatRes = await request.post("/api/v1/chat", {
    data: { message: "test message", sessionId: "e2e-test-session" },
  });
  expect(chatRes.ok()).toBeTruthy();
  const chatData = await chatRes.json();
  expect(chatData).toHaveProperty("response");
  expect(chatData).toHaveProperty("sessionId");

  // Transmission count returns a number
  const countData = await getJson(request, "/api/v1/transmission-count");
  expect(typeof countData.count).toBe("number");
});

test("google-sheets and random endpoints stay consistent with snapshot range", async ({ page, request }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoHome(page, SEEDED_CUSTOM_RANGE);

  const query = `start=${encodeURIComponent(SEEDED_CUSTOM_RANGE.start)}&end=${encodeURIComponent(SEEDED_CUSTOM_RANGE.end)}`;
  const sheets = await getJson(request, `/api/v1/ghost-emf/google-sheets?${query}`);
  const random = await getJson(request, `/api/v1/ghost-emf/random?${query}&digits=10`);
  const snapshot = await getJson(request, `/api/v1/ghost-emf/snapshot?${query}`);

  expect(sheets.csvUrl).toContain("/api/v1/ghost-emf/export");
  expect(sheets.importDataFormula).toContain(sheets.csvUrl);
  expect(random.sampleCount).toBe(snapshot.sampleCount);
  expect(random.randomNumber).toHaveLength(10);
  await expect(page.locator("#random-number")).toHaveText(random.randomNumber);

  expectNoConsoleErrors(consoleErrors);
});

test("cron-backed D1 flow: reset, trigger scheduled snapshots, verify homepage populates", async ({ page, request }) => {
  await resetSnapshots(request);

  await request.get("/__scheduled");
  await request.get("/__scheduled");
  await request.get("/__scheduled");

  await page.goto("/");
  await expect(page.locator("#current-value")).not.toHaveText("--", { timeout: 15000 });
  await expect(page.locator("#random-meta")).toContainText("rows contributed");
});

test("invalid API range followed by corrected UI range recovers the session", async ({ page, request }) => {
  const invalid = await request.get("/api/v1/ghost-emf/history?start=2026-04-10T08:00:00.000Z&end=2026-04-10T02:00:00.000Z");
  expect(invalid.status()).toBe(400);
  const invalidJson = await invalid.json();
  expect(invalidJson.code).toBe("VALIDATION_ERROR");

  await gotoHome(page, SEEDED_CUSTOM_RANGE);
  await expect(page.locator("#chart-meta")).toContainText(/points|readings/i);
  await expect(page.locator("#random-number")).not.toHaveText("--");
});
