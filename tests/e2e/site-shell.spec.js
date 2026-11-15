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
    let canonicalHeight;
    for (const route of routes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const nav = page.locator('[data-theme-tools="site-nav"]');
      await expect(nav).toBeVisible();
      await expect(nav.locator(".tt-nav__logo")).toHaveAttribute("src", /logo-nav\.png/);
      await expect(nav.locator(".tt-nav__links a")).toHaveText(["Signal", "Transmissions", "Blog", "Docs", "API"]);
      await expect(nav).toHaveCSS("width", `${viewport.width}px`);
      const height = Math.round((await nav.boundingBox()).height);
      canonicalHeight ??= height;
      expect(height).toBe(canonicalHeight);
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
