import { test, expect } from "@playwright/test";
import {
  SEEDED_CUSTOM_RANGE,
  SEEDED_FULL_RANGE,
  expectNoConsoleErrors,
  gotoHome,
  seedSnapshots,
  trackConsoleErrors,
  waitForTimelineReady,
} from "./helpers.js";

test.beforeEach(async ({ request }) => {
  await seedSnapshots(request, SEEDED_FULL_RANGE);
});

test("timeline navigator: click nodes, verify detail panel updates with event content", async ({ page }) => {
  await gotoHome(page, SEEDED_CUSTOM_RANGE);
  await waitForTimelineReady(page);

  const nodes = page.locator(".timeline-node");
  const nodeCount = await nodes.count();
  expect(nodeCount).toBeGreaterThanOrEqual(5);

  // Click first node
  await nodes.first().click();
  await expect(nodes.first()).toHaveClass(/is-active/);
  await expect(page.locator(".timeline-detail-title")).toBeVisible();
  await expect(page.locator(".timeline-detail-body")).toBeVisible();
  await expect(page.locator(".timeline-detail-date")).toBeVisible();
  await expect(page.locator(".timeline-detail-category")).toBeVisible();

  const firstTitle = await page.locator(".timeline-detail-title").textContent();

  // Click a different node
  await nodes.nth(2).click();
  await expect(nodes.nth(2)).toHaveClass(/is-active/);
  await expect(nodes.first()).not.toHaveClass(/is-active/);
  const secondTitle = await page.locator(".timeline-detail-title").textContent();
  expect(secondTitle).not.toBe(firstTitle);

  // Each node has a dot, label, and date
  const firstNode = nodes.first();
  await expect(firstNode.locator(".timeline-node-dot")).toBeVisible();
  await expect(firstNode.locator(".timeline-node-label")).toBeVisible();
  await expect(firstNode.locator(".timeline-node-date")).toBeVisible();
});

test("timeline keyboard navigation: ArrowRight, ArrowLeft, Home, End traverse events", async ({ page }) => {
  await gotoHome(page, SEEDED_CUSTOM_RANGE);
  await waitForTimelineReady(page);

  const container = page.locator("#timeline-container");
  await container.focus();

  const nodes = page.locator(".timeline-node");
  const total = await nodes.count();

  // Home goes to first
  await page.keyboard.press("Home");
  await expect(nodes.first()).toHaveClass(/is-active/);
  const firstTitle = await page.locator(".timeline-detail-title").textContent();

  // ArrowRight advances
  await page.keyboard.press("ArrowRight");
  await expect(nodes.nth(1)).toHaveClass(/is-active/);
  const nextTitle = await page.locator(".timeline-detail-title").textContent();
  expect(nextTitle).not.toBe(firstTitle);

  // ArrowDown also advances (alias)
  await page.keyboard.press("ArrowDown");
  await expect(nodes.nth(2)).toHaveClass(/is-active/);

  // End goes to last
  await page.keyboard.press("End");
  await expect(nodes.nth(total - 1)).toHaveClass(/is-active/);

  // ArrowLeft goes back
  await page.keyboard.press("ArrowLeft");
  await expect(nodes.nth(total - 2)).toHaveClass(/is-active/);

  // ArrowUp also goes back (alias)
  await page.keyboard.press("ArrowUp");
  await expect(nodes.nth(total - 3)).toHaveClass(/is-active/);
});

test("chat widget: open via toggle, open via hero button, close via X, close via Escape", async ({ page }) => {
  await gotoHome(page, SEEDED_CUSTOM_RANGE);

  const panel = page.locator("#chat-panel");
  const toggle = page.locator("#chat-toggle");

  // Initially closed
  await expect(panel).toHaveAttribute("aria-hidden", "true");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  // Open via toggle button
  await toggle.click();
  await expect(panel).toHaveAttribute("aria-hidden", "false");
  await expect(toggle).toHaveAttribute("aria-expanded", "true");

  // Close via X button
  await page.locator("#chat-close").click();
  await expect(panel).toHaveAttribute("aria-hidden", "true");

  // Open via hero "Enter the Signal" button
  await page.locator("#open-chat").click();
  await expect(panel).toHaveAttribute("aria-hidden", "false");

  // Close via Escape key
  await page.keyboard.press("Escape");
  await expect(panel).toHaveAttribute("aria-hidden", "true");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");

  // Toggle reopens after Escape close
  await toggle.click();
  await expect(panel).toHaveAttribute("aria-hidden", "false");
  await expect(page.locator("#chat-input")).toBeFocused();
});

test("chat message flow: send message, see user bubble, typing indicator, then AI response", async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoHome(page, SEEDED_CUSTOM_RANGE);

  // Open chat
  await page.locator("#chat-toggle").click();
  await expect(page.locator("#chat-panel")).toHaveAttribute("aria-hidden", "false");

  // Initial assistant greeting visible
  const messages = page.locator("#chat-messages");
  await expect(messages.locator(".chat-assistant")).toHaveCount(1);
  await expect(messages.locator(".chat-assistant").first()).toContainText("signal is listening");

  // Type and send a message
  const input = page.locator("#chat-input");
  await input.fill("What is the significance of 666?");
  await page.locator("#chat-send").click();

  // User message appears
  await expect(messages.locator(".chat-user")).toHaveCount(1);
  await expect(messages.locator(".chat-user").first()).toContainText("significance of 666");

  // Input clears after send
  await expect(input).toHaveValue("");

  // AI response eventually appears (replaces typing indicator)
  await expect(messages.locator(".chat-assistant")).toHaveCount(2, { timeout: 15000 });

  // Session ID persisted in localStorage
  const sessionId = await page.evaluate(() => localStorage.getItem("ghost-chat-session"));
  expect(sessionId).toBeTruthy();
  expect(sessionId.length).toBeGreaterThan(10);

  expectNoConsoleErrors(consoleErrors);
});

test("hotline section: phone number visible with correct tel: href, section content intact", async ({ page }) => {
  const consoleErrors = trackConsoleErrors(page);
  await gotoHome(page, SEEDED_CUSTOM_RANGE);

  // Hotline section visible
  const hotlineSection = page.locator("[data-testid='hotline-section']");
  await expect(hotlineSection).toBeVisible();

  // Phone number link
  const phoneLink = page.locator("[data-testid='hotline-number']");
  await expect(phoneLink).toContainText("(601) 666-6602");
  await expect(phoneLink).toHaveAttribute("href", "tel:+16016666602");

  // Hotline content
  await expect(hotlineSection).toContainText("Everything you say becomes part of the signal");
  await expect(hotlineSection).toContainText("The Hotline");

  // Nav also has the 666 hotline link
  const navHotline = page.locator(".tt-nav__hotline");
  await expect(navHotline).toHaveAttribute("href", "tel:+16016666602");
  await expect(navHotline).toContainText("666");

  // Hero also has the call button
  const heroCallBtn = page.locator(".hero-actions a.button-red");
  await expect(heroCallBtn).toContainText("(601) 666-6602");
  await expect(heroCallBtn).toHaveAttribute("href", "tel:+16016666602");

  // Transmission count card exists
  await expect(page.locator("#transmission-count")).toBeVisible();

  expectNoConsoleErrors(consoleErrors);
});
