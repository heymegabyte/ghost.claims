import { test, expect } from "@playwright/test";
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
  test("mobile viewport: nav, chat widget, hotline, and range controls remain usable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await gotoHome(page, SEEDED_CUSTOM_RANGE);

    // Compact nav exposes the same destinations through its menu.
    await expect(page.locator(".tt-nav__links")).toBeHidden();
    await page.getByRole("button", { name: "Browse", exact: true }).click();
    await expect(page.getByRole("link", { name: "Signal", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Close menu" }).click();

    // Range presets work
    await page.getByRole("button", { name: "7d", exact: true }).click();
    await expect(page).toHaveURL(/range=7d/);

    // Chat toggle visible and functional
    const chatToggle = page.locator("#chat-toggle");
    await expect(chatToggle).toBeVisible();
    await chatToggle.click();
    await expect(page.locator("#chat-panel")).toHaveAttribute("aria-hidden", "false");
    await page.locator("#chat-close").click();
    await expect(page.locator("#chat-panel")).toHaveAttribute("aria-hidden", "true");

    // Timeline moved to the dedicated Story route.
    await page.goto("/story");
    await waitForTimelineReady(page);
    await expect(page.locator("#timeline-track")).toBeVisible();

    // Hotline number remains on the product homepage.
    await page.goto("/");
    await expect(page.locator(".signal-closing .hotline-number")).toContainText("(601) 666-6602");

    // Docs link navigates
    await page.getByRole("link", { name: "Docs" }).click();
    await expect(page).toHaveURL(/\/docs$/);
  });
});

test("keyboard accessibility: skip link, nav focus, semantic timeline, chat Escape close", async ({ page }) => {
  await gotoHome(page, SEEDED_CUSTOM_RANGE);

  // Skip link
  await page.keyboard.press("Tab");
  await expect(page.locator(".tt-skip")).toBeFocused();
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

  await page.goto("/story");
  await waitForTimelineReady(page);
  await expect(page.locator("#timeline-track")).toHaveAttribute("role", "list");
  await expect(page.locator("#timeline-track .tl-item").first()).toHaveAttribute("role", "listitem");
});

test("web properties: manifest, robots, sitemap, security.txt, and cross-links", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator("head link[rel='manifest']")).toHaveAttribute("href", "/site.webmanifest");

  const manifest = await getJson(request, "/site.webmanifest");
  expect(manifest.name).toBe("The Ghost Signal");
  expect(manifest.shortcuts).toHaveLength(4);

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
  await expect(page.locator(".tt-footer")).toContainText("ghost.claims");
  await expect(page.locator(".tt-footer a[href='/docs']")).toBeVisible();
  await expect(page.locator(".tt-footer a[href='/api/docs']")).toBeVisible();
});

test("featured Signal transmission is accessible and defers its video payload", async ({ page, request }) => {
  await page.goto("/");

  const section = page.getByTestId("the-signal-video");
  await expect(section.getByRole("heading", { name: /The Signal/ })).toBeVisible();
  await expect(section).toContainText("The high electric-field (EF) readings have continued");
  await expect(section).toContainText("Hindu Temple apartment");

  await expect(section).toContainText("project’s direct first-person evidence");
  await expect(section).toContainText("not been independently validated as scientific proof");

  const video = section.locator("video");
  await expect(video).toHaveAttribute("controls", "");
  await expect(video).toHaveAttribute("preload", "none");
  await expect(video.locator("source")).toHaveAttribute("src", "/the-signal.mp4");

  const asset = await request.get("/the-signal.mp4", { headers: { Range: "bytes=0-1023" } });
  expect([200, 206]).toContain(asset.status());
  expect(asset.headers()["content-type"]).toContain("video/mp4");
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
