import { expect, test } from "@playwright/test";

test("open letter is complete, grounded, and uses the shared site shell", async ({ page }) => {
  await page.goto("/open-letter");

  await expect(page).toHaveTitle(/Open Letter on Preparedness/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Build a protocol for the unknown.");
  await expect(page.locator(".letter-principles li")).toHaveCount(10);
  await expect(page.locator('[data-theme-tools="site-nav"]')).toBeVisible();
  await expect(page.locator('[data-theme-tools="site-footer"]')).toBeVisible();
  await expect(page.locator(".letter-paper")).toContainText("not as conclusive proof");
  await expect(page.getByRole("button", { name: "Print or save the letter" })).toBeVisible();
});

test("open letter remains readable on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/open-letter");

  const paper = page.locator(".letter-paper");
  await expect(paper).toBeVisible();
  const bounds = await paper.boundingBox();
  expect(bounds.x).toBeGreaterThanOrEqual(0);
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(390);
  await expect(page.locator(".letter-actions .tt-btn")).toHaveCount(2);
});
