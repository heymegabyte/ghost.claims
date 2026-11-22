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

test("timeline renders the complete chronological record with evidence", async ({ page }) => {
  await gotoHome(page, SEEDED_CUSTOM_RANGE);
  await waitForTimelineReady(page);

  const items = page.locator(".tl-item");
  expect(await items.count()).toBeGreaterThanOrEqual(5);
  await expect(items.first().locator(".tl-title")).toBeVisible();
  await expect(items.first().locator(".tl-date")).toBeVisible();
  await expect(items.first().locator(".tl-cat")).toBeVisible();
  await expect(items.first().locator(".tl-body")).toBeVisible();
  await expect(items.locator(".tl-thumb")).toHaveCount(await items.count());
});

test("timeline is a semantic, non-collapsing list", async ({ page }) => {
  await gotoHome(page, SEEDED_CUSTOM_RANGE);
  await waitForTimelineReady(page);

  const track = page.locator("#timeline-track");
  await expect(track).toHaveAttribute("role", "list");
  const items = track.locator(".tl-item");
  await expect(items.first()).toHaveAttribute("role", "listitem");
  await expect(items.last()).toBeVisible();
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
  const hotlineSection = page.locator(".six-six-six-close");
  await expect(hotlineSection).toBeVisible();

  // Phone number link
  const phoneLink = hotlineSection.locator(".hotline-number");
  await expect(phoneLink).toContainText("(601) 666-6602");
  await expect(phoneLink).toHaveAttribute("href", "tel:+16016666602");

  // Hotline content
  await expect(hotlineSection).toContainText("The hotline is open");

  expectNoConsoleErrors(consoleErrors);
});
