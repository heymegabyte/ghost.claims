import { expect, test } from "@playwright/test";
import { waitForTimelineReady } from "./helpers.js";

test("homepage stays product-focused and retains only the featured Signal narrative", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("the-signal-video")).toBeVisible();
  await expect(page.locator("#timeline-track")).toHaveCount(0);
  await expect(page.getByTestId("plate-vault")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Read the full story" })).toHaveAttribute("href", "/story");
});

test("Story owns the first-person dossier and complete chronology", async ({ page }) => {
  await page.goto("/story");
  await expect(page.locator("body")).toHaveAttribute("data-page", "story");
  await expect(page.locator("body")).toHaveAttribute("data-content-page", "story");
  await expect(page.getByRole("heading", { name: "I Signal." })).toHaveCount(0);
  await expect(page.getByTestId("manifesto")).toBeVisible();
  await expect(page.locator(".cinema-chapter")).toHaveCount(0);
  await waitForTimelineReady(page);
  await expect(page.locator("#timeline-track .tl-item")).not.toHaveCount(0);
  await expect(page.locator("#timeline-track")).toHaveAttribute("aria-busy", "false");
  await expect(page.getByTestId("timeline-nav")).toHaveCSS("opacity", "1");
  await expect(page.locator("#timeline-track .tl-item").first()).toHaveCSS("opacity", "1");
  await expect(page.getByTestId("plate-vault")).toHaveCount(0);
});

test("Plates owns the complete archive and separates record from interpretation", async ({ page }) => {
  await page.goto("/plates");
  await expect(page.getByRole("heading", { name: "Plates." })).toBeVisible();
  await expect(page.locator("#plate-essay")).toContainText("XOBRIAN");
  await expect(page.locator("#plate-essay")).toContainText("8388");
  await expect(page.locator("#plate-essay")).toContainText("cannot independently prove");
  await expect(page.getByTestId("plate-vault")).toBeVisible();
  expect(await page.locator("#plate-vault-grid .plate-vault-card").count()).toBeGreaterThan(20);
});

test("Story and Plates share the canonical Browse navbar", async ({ page }) => {
  for (const route of ["/story", "/plates"]) {
    await page.goto(route);
    await expect(page.locator('[data-theme-tools="site-nav"]')).toBeVisible();
    await page.getByRole("button", { name: "Browse", exact: true }).click();
    await expect(page.getByRole("menuitem", { name: /^Story\b/ })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: /^Plates\b/ })).toBeVisible();
  }
});
