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
  await expect(page.locator(".tt-nav__links > .tt-nav__link")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Browse" })).toBeVisible();
  await expect(page.locator('.tt-ov__card[href="/blog"]')).toHaveAttribute("aria-current", "page");
  await expect(page.getByText(/speculative horror and cultural criticism/i)).toBeVisible();
  await page.getByRole("link", { name: /The Clout War Above Heaven/ }).click();
  await expect(page).toHaveURL(/the-clout-war-above-heaven/);
  await expect(page.locator("tt-article-reader")).toBeVisible();
  await expect(page.locator(".tt-article")).toContainText("Above the atmosphere, two ancient courts discovered metrics");
  expect(errors).toEqual([]);
});

test("sensor telemetry dossier uses a transparent editorial canvas without nested article tiles", async ({ page }) => {
  await page.goto("/blog/sensor-telemetry-web-dossier");
  const surfaces = await page.evaluate(() => {
    const main = document.querySelector("#main");
    const article = document.querySelector(".journal-technical-article > .tt-article");
    return {
      mainBackground: getComputedStyle(main).backgroundColor,
      articleBackground: getComputedStyle(article).backgroundColor,
      articleBorder: getComputedStyle(article).borderTopWidth,
      articleShadow: getComputedStyle(article).boxShadow,
    };
  });
  expect(surfaces).toEqual({
    mainBackground: "rgba(0, 0, 0, 0)",
    articleBackground: "rgba(0, 0, 0, 0)",
    articleBorder: "0px",
    articleShadow: "none",
  });
  await expect(page.locator(".journal-technical-article .tt-widget").first()).toBeVisible();
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

test("Greystone exposes accessible audio, media provenance, and article metadata", async ({ page }) => {
  await page.goto("/blog/greystone-after-the-skunk");
  const audio = page.locator(".tt-audio-narration-player");
  await expect(audio).toContainText("Greystone After the Skunk — audio briefing");
  await expect(audio.locator("audio")).toHaveAttribute("preload", "none");
  await expect(audio.getByRole("link", { name: "Read Transcript" })).toHaveAttribute("href", /audio-briefing\.txt$/);
  await expect(page.getByText(/AI-generated editorial illustration created for this essay/i)).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://ghost.claims/blog/greystone-after-the-skunk");
  const jsonLd = JSON.parse(await page.locator("#tt-article-jsonld").textContent());
  expect(jsonLd.associatedMedia.duration).toBe("PT3M13S");
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
  await expect(page.locator(".tt-source-card")).toHaveCount(9);
  await expect(page.getByLabel("9 references")).toBeVisible();
  await expect(page.locator(".tt-nav__logo")).toHaveAttribute("src", /\/logo-nav\.png/);
  expect(errors).toEqual([]);
});

test("blog remains readable on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/blog/bondage-of-the-failed-christ");
  await expect(page.locator(".tt-pagehead__title")).toHaveText("Bondage of the Failed Christ");
  await expect(page.locator("tt-article-reader")).toBeVisible();
});

test("every narrative article shares the centered left-aligned reading rail", async ({ page }) => {
  const routes = [
    "/blog/greystone-after-the-skunk",
    "/blog/jungle-habitat-dead-battery-safari-trails",
    "/blog/the-panopticon-learned-to-pray",
    "/blog/the-clout-war-above-heaven",
    "/blog/bondage-of-the-failed-christ",
  ];
  for (const route of routes) {
    await page.goto(route);
    const geometry = await page.locator(".tt-journal__article > .tt-article").evaluate((article) => {
      const rect = article.getBoundingClientRect();
      return { left: rect.left, right: innerWidth - rect.right, width: rect.width, textAlign: getComputedStyle(article).textAlign };
    });
    expect(Math.abs(geometry.left - geometry.right), route).toBeLessThan(1);
    expect(geometry.width, route).toBeLessThanOrEqual(820);
    expect(geometry.textAlign, route).toBe("left");
    const rails = await page.locator(".journal-reading-rail, .tt-journal__article").evaluateAll((elements) => elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left, right: innerWidth - rect.right };
    }));
    for (const rail of rails) expect(Math.abs(rail.left - rail.right), `${route} rail`).toBeLessThan(1);
  }
});

test("article pictures open as one keyboard-operable theme.tools lightbox gallery", async ({ page }) => {
  await page.goto("/blog/greystone-after-the-skunk");
  const zoomable = page.locator("img[data-tt-zoom]");
  await expect(zoomable.first()).toBeVisible();
  await zoomable.first().focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "Image gallery" })).toBeVisible();
  await page.locator(".tt-lightbox__img").evaluate((image) => image.decode());
  expect(await page.locator(".tt-lightbox__img").evaluate((image) => image.naturalWidth)).toBeGreaterThan(0);
  await expect(page.locator(".tt-lightbox__count")).toHaveText(/1 \/ \d+/);
  await page.keyboard.press("ArrowRight");
  await expect(page.locator(".tt-lightbox__count")).toHaveText(/2 \/ \d+/);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Image gallery" })).toHaveCount(0);
  await expect(zoomable.first()).toBeFocused();
});
