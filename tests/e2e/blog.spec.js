import { test, expect } from "@playwright/test";

test("theme.tools Night Archive publishes fiction and reported memoir", async ({ page }) => {
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });

  await page.goto("/blog");
  await expect(page).toHaveTitle(/Night Archive/);
  await expect(page.locator(".tt-post")).toHaveCount(5);
  await expect(page.locator(".tt-nav__logo")).toHaveAttribute("src", /\/logo-nav\.png/);
  await expect(page.locator(".tt-nav__links a")).toHaveText(["Signal", "Transmissions", "Blog", "Docs", "API"]);
  await expect(page.getByRole("link", { name: "Blog" })).toHaveAttribute("aria-current", "page");
  await expect(page.getByText(/speculative horror and cultural criticism/i)).toBeVisible();
  await page.getByRole("link", { name: /The Clout War Above Heaven/ }).click();
  await expect(page).toHaveURL(/the-clout-war-above-heaven/);
  await expect(page.locator("tt-article-reader")).toBeVisible();
  await expect(page.locator(".tt-article")).toContainText("Above the atmosphere, two ancient courts discovered metrics");
  expect(errors).toEqual([]);
});

test("Greystone memoir loads research components, citations, and archival media", async ({ page }) => {
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });

  await page.goto("/blog/greystone-after-the-skunk");
  await expect(page.locator(".tt-pagehead__title")).toHaveText("Greystone After the Skunk");
  await expect(page.getByText(/firsthand recollection with public records/i)).toBeVisible();
  await expect(page.locator(".tt-stat-cards")).toBeVisible();
  await expect(page.locator(".tt-timeline")).toBeVisible();
  await expect(page.locator(".tt-gallery img")).toHaveCount(6); // three slides plus three thumbnails
  await expect(page.locator("[id^='source-']")).toHaveCount(12);
  await expect(page.locator(".tt-nav__logo")).toHaveAttribute("src", /\/logo-nav\.png/);
  expect(errors).toEqual([]);
});

test("Jungle Habitat memoir loads research, original photography, and canonical navigation", async ({ page }) => {
  const errors = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });

  await page.goto("/blog/jungle-habitat-dead-battery-safari-trails");
  await expect(page.locator(".tt-pagehead__title")).toHaveText("Jungle Habitat: The Safari That Killed My Battery");
  await expect(page.getByText(/May 5, 2018 field footage and receipt/i)).toBeVisible();
  await expect(page.locator(".tt-gallery img")).toHaveCount(12);
  await expect(page.locator("[id^='jh-source-']")).toHaveCount(9);
  await expect(page.locator(".tt-nav__logo")).toHaveAttribute("src", /\/logo-nav\.png/);
  expect(errors).toEqual([]);
});

test("blog remains readable on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/blog/bondage-of-the-failed-christ");
  await expect(page.locator(".tt-pagehead__title")).toHaveText("Bondage of the Failed Christ");
  await expect(page.locator("tt-article-reader")).toBeVisible();
});
