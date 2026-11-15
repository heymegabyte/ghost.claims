import { test, expect } from "@playwright/test";

test("theme.tools Night Archive publishes three fictional horror essays", async ({ page }) => {
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });

  await page.goto("/blog");
  await expect(page).toHaveTitle(/Night Archive/);
  await expect(page.locator(".tt-post")).toHaveCount(3);
  await expect(page.getByText(/speculative horror and cultural criticism/i)).toBeVisible();
  await page.getByRole("link", { name: /The Clout War Above Heaven/ }).click();
  await expect(page).toHaveURL(/the-clout-war-above-heaven/);
  await expect(page.locator("tt-article-reader")).toBeVisible();
  await expect(page.locator(".tt-article")).toContainText("Above the atmosphere, two ancient courts discovered metrics");
  expect(errors).toEqual([]);
});

test("blog remains readable on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/blog/bondage-of-the-failed-christ");
  await expect(page.locator(".tt-pagehead__title")).toHaveText("Bondage of the Failed Christ");
  await expect(page.locator("tt-article-reader")).toBeVisible();
});
