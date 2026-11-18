import { test, expect } from "@playwright/test";

const routes = [
  "/", "/transmissions", "/docs", "/api/docs", "/privacy", "/terms", "/blog",
  "/blog/the-panopticon-learned-to-pray", "/blog/the-clout-war-above-heaven",
  "/blog/bondage-of-the-failed-christ", "/blog/greystone-after-the-skunk",
  "/blog/jungle-habitat-dead-battery-safari-trails",
];

for (const viewport of [{ name: "desktop", width: 1440, height: 1000 }, { name: "phone", width: 390, height: 844 }]) {
  test(`canonical theme.tools shell is invariant on every route at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    let canonical;
    for (const route of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      const nav = page.locator('[data-theme-tools="site-nav"]');
      await expect(nav).toBeVisible();
      await expect(nav.locator(".tt-nav__logo")).toHaveAttribute("src", /logo-nav\.png/);
      await nav.locator(".tt-nav__logo").evaluate((image) => image.decode());
      await expect(nav.locator(".tt-nav__links a")).toHaveText(["Signal", "Transmissions", "Blog", "Docs", "API"]);
      expect((await nav.boundingBox())?.width).toBeLessThanOrEqual(viewport.width);
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

test("full theme.tools catalog and provenance manifest are public", async ({ request }) => {
  const stylesheet = await request.get("/theme-tools.css");
  expect(stylesheet.ok()).toBe(true);
  expect(await stylesheet.text()).toContain(".tt-widget");

  const manifest = await request.get("/theme-tools-components.json");
  expect(manifest.ok()).toBe(true);
  const catalog = await manifest.json();
  expect(catalog.sourceCommit).toBe("aefcd52426e3ed7fb7ca96c13e6b293c0728d75d");
  expect(catalog.componentTypes).toContain("article-reader");
  expect(catalog.componentTypes.length).toBeGreaterThanOrEqual(29);
});
