import { test, expect, devices } from "@playwright/test";
import {
  SEEDED_CUSTOM_RANGE,
  SEEDED_FULL_RANGE,
  getJson,
  gotoHome,
  isoToLocalInput,
  seedSnapshots,
  waitForHomepageReady,
  waitForTimelineReady,
} from "./helpers.js";

test.beforeEach(async ({ request }) => {
  await seedSnapshots(request, SEEDED_FULL_RANGE);
});

test.describe("mobile", () => {
  test.use({ ...devices["iPhone 13"] });

  test("mobile viewport: nav, chat widget, timeline, hotline, and range controls remain usable", async ({ page }) => {
    await gotoHome(page, SEEDED_CUSTOM_RANGE);

    // Nav visible
    await expect(page.locator(".site-nav")).toBeVisible();
    await expect(page.getByRole("link", { name: "Signal" })).toBeVisible();

    // Range presets work
    await page.getByRole("button", { name: "7 days" }).click();
    await expect(page).toHaveURL(/range=7d/);

    // Chat toggle visible and functional
    const chatToggle = page.locator("#chat-toggle");
    await expect(chatToggle).toBeVisible();
    await chatToggle.click();
    await expect(page.locator("#chat-panel")).toHaveAttribute("aria-hidden", "false");
    await page.locator("#chat-close").click();
    await expect(page.locator("#chat-panel")).toHaveAttribute("aria-hidden", "true");

    // Timeline scrollable with nodes
    await waitForTimelineReady(page);
    await expect(page.locator("#timeline-container")).toBeVisible();

    // Hotline number visible
    await expect(page.locator("[data-testid='hotline-number']")).toContainText("(601) 666-6602");

    // Docs link navigates
    await page.getByRole("link", { name: "Docs" }).click();
    await expect(page).toHaveURL(/\/docs$/);
  });
});

test("keyboard accessibility: skip link, nav tabs, timeline arrow keys, chat Escape close", async ({ page }) => {
  await gotoHome(page, SEEDED_CUSTOM_RANGE);
  await waitForTimelineReady(page);

  // Skip link
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);

  // Tab through nav links
  await page.keyboard.press("Tab");
  const focused1 = page.locator(":focus");
  await expect(focused1).toBeVisible();

  // Open chat via hero button, then close with Escape
  await page.locator("#open-chat").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#chat-panel")).toHaveAttribute("aria-hidden", "false");
  await page.keyboard.press("Escape");
  await expect(page.locator("#chat-panel")).toHaveAttribute("aria-hidden", "true");

  // Timeline keyboard navigation
  const timelineContainer = page.locator("#timeline-container");
  await timelineContainer.focus();

  await page.keyboard.press("Home");
  await expect(page.locator(".timeline-node").first()).toHaveClass(/is-active/);

  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".timeline-node").nth(1)).toHaveClass(/is-active/);

  await page.keyboard.press("End");
  await expect(page.locator(".timeline-node").last()).toHaveClass(/is-active/);

  await page.keyboard.press("ArrowLeft");
  const count = await page.locator(".timeline-node").count();
  await expect(page.locator(".timeline-node").nth(count - 2)).toHaveClass(/is-active/);
});

test("web properties: manifest, robots, sitemap, security.txt, and cross-links", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator("head link[rel='manifest']")).toHaveAttribute("href", "/site.webmanifest");

  const manifest = await getJson(request, "/site.webmanifest");
  expect(manifest.name).toBe("ghost.claims");
  expect(manifest.shortcuts).toHaveLength(2);

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("Sitemap");

  const humans = await request.get("/humans.txt");
  expect(humans.ok()).toBeTruthy();
  expect(await humans.text()).toContain("Megabyte");

  const security = await request.get("/.well-known/security.txt");
  expect(security.ok()).toBeTruthy();
  expect(await security.text()).toContain("Contact");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("/docs");

  // Cross-links in footer
  await expect(page.locator(".site-footer")).toContainText("ghost.claims");
  await expect(page.locator(".site-footer a[href='/docs']")).toBeVisible();
  await expect(page.locator(".site-footer a[href='/api/docs']")).toBeVisible();
});

test("future-ready dataset audit: snapshot, export, random all agree on one range", async ({ page, request }) => {
  await gotoHome(page, SEEDED_CUSTOM_RANGE);

  const query = `start=${encodeURIComponent(SEEDED_CUSTOM_RANGE.start)}&end=${encodeURIComponent(SEEDED_CUSTOM_RANGE.end)}`;
  const snapshot = await getJson(request, `/api/v1/ghost-emf/snapshot?${query}`);
  const sheets = await getJson(request, `/api/v1/ghost-emf/google-sheets?${query}`);
  const randomA = await getJson(request, `/api/v1/ghost-emf/random?${query}&digits=12`);
  const randomB = await getJson(request, `/api/v1/ghost-emf/random?${query}&digits=12`);

  expect(randomA.randomNumber).toBe(randomB.randomNumber);
  expect(randomA.sampleCount).toBe(snapshot.sampleCount);
  expect(sheets.importDataFormula).toContain("/api/v1/ghost-emf/export");

  const csvResponse = await request.get(`/api/v1/ghost-emf/export?${query}&format=csv`);
  expect(csvResponse.ok()).toBeTruthy();
  const csvText = await csvResponse.text();
  expect(csvText.trim().split(/\r?\n/).length).toBe(snapshot.sampleCount + 1);
});
