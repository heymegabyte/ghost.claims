import { test, expect } from "@playwright/test";

const routes = [
  "/", "/story", "/plates", "/transmissions", "/docs", "/api/docs", "/privacy", "/terms", "/blog",
  "/blog/the-panopticon-learned-to-pray", "/blog/the-clout-war-above-heaven",
  "/blog/bondage-of-the-failed-christ", "/blog/greystone-after-the-skunk",
  "/blog/jungle-habitat-dead-battery-safari-trails",
];

for (const viewport of [{ name: "desktop", width: 1440, height: 1000 }, { name: "phone", width: 390, height: 844 }]) {
  test(`canonical theme.tools shell is invariant on every route at ${viewport.name}`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize(viewport);
    let canonical;
    for (const route of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      const nav = page.locator('[data-theme-tools="site-nav"]');
      await expect(nav).toBeVisible();
      await expect(nav.locator(".tt-nav__logo")).toHaveAttribute("src", /logo-nav\.png/);
      await nav.locator(".tt-nav__logo").evaluate((image) => image.decode());
      await expect(nav.locator(".tt-nav__links > .tt-nav__link")).toHaveCount(0);
      await expect(nav.locator(".tt-nav__ov-search, .tt-nav__account")).toHaveCount(0);
      await expect(nav.locator(":scope > .tt-nav__actions > .tt-nav__ov-trigger")).toHaveText(/Browse/);
      await expect(nav.locator(".tt-ov__card")).toHaveCount(5);
      const navBox = await nav.boundingBox();
      expect(navBox?.x).toBe(0);
      expect(navBox?.width).toBe(viewport.width);
      // The active destination is intentionally route-aware. Remove only that state before
      // comparing geometry and computed presentation so everything else must remain identical.
      await nav.evaluate((element) => {
        element.querySelectorAll("*").forEach((child) => {
          child.style.setProperty("transition", "none", "important");
          child.style.setProperty("animation", "none", "important");
        });
      });
      await nav.locator('[aria-current="page"]').evaluateAll((links) => {
        links.forEach((link) => link.removeAttribute("aria-current"));
      });
      const geometry = await nav.evaluate((element) => {
        const properties = [
          "alignItems", "backgroundImage", "borderBottomColor", "borderBottomWidth",
          "boxShadow", "display", "fontFamily", "gap", "height", "justifyContent",
          "minHeight", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "width",
        ];
        const style = getComputedStyle(element);
        const navStyle = Object.fromEntries(properties.map((property) => [property, style[property]]));
        const childBoxes = [...element.querySelectorAll(":scope > *, .tt-nav__links > a")].map((child) => {
          const box = child.getBoundingClientRect();
          const childStyle = getComputedStyle(child);
          return [
            child.className, box.x, box.y, box.width, box.height,
            childStyle.backgroundColor, childStyle.color, childStyle.fontFamily,
            childStyle.fontSize, childStyle.fontWeight, childStyle.lineHeight,
          ];
        });
        return { navStyle, childBoxes };
      });

      await nav.screenshot({ animations: "disabled" });
      const snapshot = { geometry };
      canonical ??= snapshot;
      expect(snapshot, `${route} navbar differs from ${routes[0]} at ${viewport.name}`).toEqual(canonical);
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
    }
  });
}

test("canonical shell exposes keyboard navigation and theme.tools footer", async ({ page }) => {
  await page.goto("/privacy");
  await page.keyboard.press("Tab");
  await expect(page.locator(".tt-skip")).toBeFocused();
  await expect(page.locator('[data-theme-tools="site-footer"]')).toContainText("ghost.claims");
  await expect(page.locator(".tt-nav__brand")).toHaveAttribute("href", "/");
});

test("documentation sensor chips remain inside the mobile reading rail", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/docs");
  const chips = page.locator(".docs-sensor-chip");
  await expect(chips).toHaveCount(3);
  for (const chip of await chips.all()) {
    const box = await chip.boundingBox();
    expect(box?.x).toBeGreaterThanOrEqual(0);
    expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(390);
  }
  await expect(page.getByRole("link", { name: "Open Interactive Reference", exact: true })).toHaveCount(2);
});

test("mobile developer samples stay in a bounded horizontal scroller", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  for (const sample of await page.locator(".dev-snippet pre").all()) {
    const box = await sample.boundingBox();
    expect(box?.x).toBeGreaterThanOrEqual(0);
    expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(390);
    expect(await sample.evaluate((node) => getComputedStyle(node).overflowX)).toBe("auto");
  }
});

test("high-frequency controls keep comfortable touch geometry", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  for (const control of await page.locator(".tt-nav__brand, .tt-nav__ov-trigger, .range-button, .chart-icon-btn").all()) {
    const box = await control.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }

  await page.goto("/docs");
  for (const control of await page.locator(".family-cta, .usecase-link").all()) {
    const box = await control.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }
});

test("mobile editorial comparison tables stay inside a discoverable scroll rail", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of [
    "/blog/sensor-telemetry-web-dossier",
    "/blog/greystone-after-the-skunk",
    "/blog/jungle-habitat-dead-battery-safari-trails",
  ]) {
    await page.goto(route);
    for (const rail of await page.locator(".tt-comparison__scroll").all()) {
      const box = await rail.boundingBox();
      expect(box?.x).toBeGreaterThanOrEqual(0);
      expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(390);
      expect(await rail.evaluate((node) => getComputedStyle(node).overflowX)).toBe("auto");
    }
  }
});

test("shared lightbox placeholders do not request the current document as an image", async ({ page }) => {
  for (const route of ["/", "/story", "/plates"]) {
    await page.goto(route);
    const placeholder = page.locator(".lightbox-image");
    await expect(placeholder).toHaveCount(1);
    await expect(placeholder).not.toHaveAttribute("src", "");
  }
});

test("homepage uses the theme.tools hero with a copyable entropy instrument", async ({ page }) => {
  const candleRequests = [];
  page.on("request", (request) => {
    if (request.url().includes("hero-bg.mp4")) candleRequests.push(request.url());
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  const hero = page.getByTestId("hero");
  await expect(hero).toContainText("Copy a Multiverse-Leading Random Number");
  await expect(hero.locator(".tt-hero[data-theme-tools='homepage-hero']")).toBeVisible();
  await expect(hero.locator(".tt-hero__lead")).toBeVisible();
  await expect(hero.locator(".tt-hero__visual")).toBeVisible();
  await expect(hero.locator("#random-number")).toBeVisible();
  await expect(hero.locator("#copy-entropy")).toHaveAccessibleName("Copy random number");
  await expect(page.locator(".hero-stage, .hero-video, #orb-canvas, .gh-candle-flame")).toHaveCount(0);
  await expect(hero.locator("#spectral-hero-canvas")).toBeVisible();
  await expect.poll(() => hero.getAttribute("data-webgl")).toMatch(/ready|fallback/);
  expect(candleRequests).toEqual([]);
});

test("homepage hero preserves its content and static fallback under reduced motion", async ({ browser }) => {
  const context = await browser.newContext({
    baseURL: "http://127.0.0.1:8787",
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const hero = page.getByTestId("hero");
  await expect(hero.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(hero.locator("#copy-entropy")).toBeVisible();
  await expect(hero.locator(".spectral-hero-fallback")).toBeAttached();
  await context.close();
});

test("Browse menu opens, exposes the complete navigation, and restores focus", async ({ page }) => {
  await page.goto("/docs");
  const trigger = page.getByRole("button", { name: "Browse" });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Browse Ghost Signal" })).toBeVisible();
  await expect(page.locator(".tt-ov__card")).toHaveCount(5);
  await expect(page.locator(".tt-ov__card").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
});

test("Browse overlay is opaque and completes its animated close", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Browse" });
  await trigger.click();
  const overlay = page.getByRole("dialog", { name: "Browse Ghost Signal" });
  await expect(overlay).toBeVisible();
  expect(await overlay.locator(".tt-ov__scrim").evaluate((node) => getComputedStyle(node).backgroundColor)).toBe("rgb(0, 0, 0)");
  await overlay.locator("[data-tt-ov-close]").click();
  await expect(overlay).toBeVisible();
  await expect(overlay).toBeHidden({ timeout: 700 });
});

test("every Browse destination resolves and same-page actions close the overlay", async ({ page, request }) => {
  await page.goto("/");
  const hrefs = await page.locator('[data-tt-ov-panel] a[href]').evaluateAll((links) =>
    [...new Set(links.map((link) => link.getAttribute("href")).filter(Boolean))],
  );

  for (const href of hrefs) {
    const url = new URL(href, "http://127.0.0.1:8787");
    if (url.protocol !== "http:" || url.origin !== "http://127.0.0.1:8787") continue;
    const response = await request.get(url.pathname);
    expect(response.ok(), `${href} should resolve`).toBe(true);
    if (url.hash) {
      await page.goto(url.pathname);
      await expect(page.locator(url.hash), `${href} should target an existing element`).toHaveCount(1);
    }
  }

  for (const href of ["/#live"]) {
    await page.goto("/");
    await page.getByRole("button", { name: "Browse" }).click();
    const overlay = page.getByRole("dialog", { name: "Browse Ghost Signal" });
    await overlay.locator(`a[href="${href}"]`).first().click();
    await expect(page).toHaveURL(new RegExp(`${href.slice(1)}$`));
    await expect(overlay).toBeHidden({ timeout: 700 });
  }

  await page.goto("/");
  await page.getByRole("button", { name: "Browse" }).click();
  const overlay = page.getByRole("dialog", { name: "Browse Ghost Signal" });
  await overlay.locator('a[href="/#chat-widget"]').first().click();
  await expect(overlay).toBeHidden({ timeout: 700 });
  await expect(page.locator("#chat-panel")).toBeVisible();
  await page.locator("#chat-close").click();

  await page.getByRole("button", { name: "Browse" }).click();
  await page.locator('[data-tt-ov-panel] a[href="/story"]').first().click();
  await expect(page).toHaveURL(/\/story$/);
});

test("full theme.tools catalog and provenance manifest are public", async ({ request }) => {
  const stylesheet = await request.get("/theme-tools.css");
  expect(stylesheet.ok()).toBe(true);
  expect(await stylesheet.text()).toContain(".tt-widget");

  const manifest = await request.get("/theme-tools-components.json");
  expect(manifest.ok()).toBe(true);
  const catalog = await manifest.json();
  expect(catalog.version).toBe("1.0.12");
  expect(catalog.sourceCommit).toBe("639ed83de3702a1fbb4b463e10b1aed9ee347d3e");
  expect(catalog.sourcePatchSha256).toBe("dfc6695c2b85401007a7f09c62414cf4f7568e21d6781fb3a33fc28b72e57c23");
  expect(catalog.artifactSha256).toBe("158b1da100b13bc8bd4c2667c0684c19a1f8f9c6845003fb82299942e2c57fbd");
  expect(catalog.componentTypes).toContain("article-reader");
  expect(catalog.componentTypes.length).toBeGreaterThanOrEqual(29);
});
