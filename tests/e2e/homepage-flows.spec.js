import { test, expect } from "@playwright/test";
import {
  SEEDED_ALT_RANGE,
  SEEDED_CUSTOM_RANGE,
  SEEDED_FULL_RANGE,
  expectNoConsoleErrors,
  gotoHome,
  isoToLocalInput,
  seedSnapshots,
  trackConsoleErrors,
  waitForHomepageReady,
  waitForTimelineReady,
} from "./helpers.js";

test.beforeEach(async ({ request }) => {
  await seedSnapshots(request, SEEDED_FULL_RANGE);
});

test("hero, status grid, and 'Enter the Signal' button opens chat widget", async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoHome(page, SEEDED_CUSTOM_RANGE);

  // Hero section loads with glitch text
  const hero = page.locator("[data-testid='hero']");
  await expect(hero).toBeVisible();
  await expect(hero.locator(".glitch-text")).toHaveText("Copy a Multiverse-Leading Random Number");
  await expect(hero.locator(".eyebrow")).toContainText("PHYSICAL ENTROPY");
  await expect(hero.locator("#random-number")).not.toHaveText("--");
  await expect(hero.locator("#copy-entropy")).toHaveAccessibleName("Copy random number");

  // Status grid: 4 cards populated
  const grid = page.locator("[data-testid='status-grid']");
  await expect(grid.locator(".status-card")).toHaveCount(5);
  await expect(page.locator("#current-value")).not.toHaveText("--");
  await expect(page.locator("#current-state")).toContainText(/reporting|sample|offline/i);
  await expect(page.locator("#entropy-value")).toContainText("bits");
  await expect(page.locator("#signal-age")).not.toHaveText("--");

  // "Enter the Signal" opens the chat panel
  const chatPanel = page.locator("#chat-panel");
  await expect(chatPanel).toHaveAttribute("aria-hidden", "true");
  await page.locator("#open-chat").click();
  await expect(chatPanel).toHaveAttribute("aria-hidden", "false");
  await expect(page.locator("#chat-toggle")).toHaveAttribute("aria-expanded", "true");

  // Chart and timeline also loaded
  await expect(page.locator("#history-chart")).toBeVisible();
  await waitForTimelineReady(page);

  expectNoConsoleErrors(consoleErrors);
});

test("preset range buttons update URL, chart metadata, and export links", async ({ page }) => {
  await gotoHome(page, SEEDED_CUSTOM_RANGE);

  await page.getByRole("button", { name: "24h" }).click();
  await expect(page).toHaveURL(/range=24h/);

  await page.getByRole("button", { name: "7d", exact: true }).click();
  await expect(page).toHaveURL(/range=7d/);
  await expect(page.locator("#export-csv-link")).toHaveAttribute("href", /format=csv/);

  await page.getByRole("button", { name: "30d", exact: true }).click();
  await expect(page).toHaveURL(/range=30d/);

  await page.locator(".range-button[data-range='all']").click();
  await expect(page).toHaveURL(/range=all/);
  await expect(page.locator("#chart-meta")).toContainText(/points|readings/i);

  // Active button styling follows selection
  await expect(page.locator(".range-button[data-range='all']")).toHaveClass(/is-active/);
  await expect(page.locator(".range-button[data-range='7d']")).not.toHaveClass(/is-active/);
});

test("custom range form updates chart, sheets formula, and page URL", async ({ page }) => {
  await gotoHome(page, SEEDED_CUSTOM_RANGE);

  await page.locator("#history-start").fill(isoToLocalInput(SEEDED_ALT_RANGE.start));
  await page.locator("#history-end").fill(isoToLocalInput(SEEDED_ALT_RANGE.end));
  await page.getByRole("button", { name: "Apply" }).click();

  await expect(page).toHaveURL(/start=.*end=.*/);
  await expect(page.locator("#chart-meta")).toContainText(/points|readings/i);
  await expect(page.locator("#sheets-formula")).toContainText("IMPORTDATA");
  await expect(page.locator("#snapshot-json-link")).toHaveAttribute("href", /start=.*end=.*/);

  // Invalid range shows error
  await page.locator("#history-start").fill(isoToLocalInput(SEEDED_ALT_RANGE.end));
  await page.locator("#history-end").fill(isoToLocalInput(SEEDED_ALT_RANGE.start));
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.locator("#chart-meta")).toContainText("valid start");
});

test("share-link and sheets-formula copy actions work from the same session", async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: "http://127.0.0.1:8787",
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();

  await gotoHome(page, SEEDED_CUSTOM_RANGE);

  await page.locator("#copy-range-link").click();
  const copiedUrl = await page.evaluate(() => navigator.clipboard.readText());
  expect(copiedUrl).toContain("start=");
  expect(copiedUrl).toContain("end=");

  await page.locator("#copy-sheets-formula").click();
  await expect(page.locator("#copy-sheets-status")).toContainText("Copied");
  const copiedFormula = await page.evaluate(() => navigator.clipboard.readText());
  expect(copiedFormula).toContain("IMPORTDATA");

  await context.close();
});

test("deep-linked custom range restores state after reload and in a second tab", async ({ browser, page }) => {
  await gotoHome(page, SEEDED_ALT_RANGE);

  const sharedUrl = page.url();
  await page.reload();
  await waitForHomepageReady(page);
  await expect(page.locator("#history-start")).toHaveValue(isoToLocalInput(SEEDED_ALT_RANGE.start));
  await expect(page.locator("#history-end")).toHaveValue(isoToLocalInput(SEEDED_ALT_RANGE.end));

  const ctx2 = await browser.newContext({ baseURL: "http://127.0.0.1:8787" });
  const page2 = await ctx2.newPage();
  await page2.goto(sharedUrl);
  await waitForHomepageReady(page2);
  await expect(page2.locator("#history-start")).toHaveValue(isoToLocalInput(SEEDED_ALT_RANGE.start));
  await expect(page2.locator("#history-end")).toHaveValue(isoToLocalInput(SEEDED_ALT_RANGE.end));
  await ctx2.close();
});
