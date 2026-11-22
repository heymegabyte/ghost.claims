import { expect, test } from "@playwright/test";

/**
 * Timeline evidence-image coverage.
 *
 * The Story page "Timeline" section (#timeline-track) must render one card per
 * chronicle event, and EVERY card must carry a related image so each entry has
 * visual validity. Runs against the local dev server by default; set PROD_URL to
 * verify the deployed site (e.g. PROD_URL=https://ghost.claims).
 */

const TARGET = `${process.env.PROD_URL || ""}/story`;
const MIN_EVENTS = 16;

test.describe("timeline evidence images", () => {
  test("AVATAR MUD uses an authentic terminal screenshot in the feature and chronology", async ({ page }) => {
    await page.goto(TARGET, { waitUntil: "domcontentloaded" });

    const feature = page.locator(".dossier-feature--avatar-mud");
    await expect(feature).toContainText("family-friendly, text-based Dungeons & Dragons-style world");
    await expect(feature).toContainText("teams with other live players");
    const featureImage = feature.locator(".avatar-mud-screenshot img");
    await featureImage.scrollIntoViewIfNeeded();
    await expect(featureImage).toHaveAttribute("src", "/avatar-mud-login.webp");
    await expect.poll(() => featureImage.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBe(1100);

    const timelineCard = page.locator(".tl-card", { hasText: "AVATAR MUD" }).first();
    const timelineImage = timelineCard.locator("img");
    await timelineImage.scrollIntoViewIfNeeded();
    await expect(timelineImage).toHaveAttribute("src", "/avatar-mud-login.webp");
  });

  test("American Spirits recollection is placed in the chronology and opens in the page gallery", async ({ page }) => {
    await page.goto(TARGET);
    const card = page.locator(".tl-card", { hasText: "American Spirits in the Pew" });
    await expect(card).toContainText("Give us the Marlboros");
    const image = card.locator("img");
    await expect(image).toHaveAttribute("src", "/story/american-spirits-marlboro-pew.webp");
    await image.click();
    await expect(page.getByRole("dialog", { name: "Image viewer" })).toBeVisible();
    const enlarged = page.locator("#gallery-lightbox .gallery-lightbox-stage img");
    await enlarged.evaluate((element: HTMLImageElement) => element.decode());
    expect(await enlarged.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  });
  test("every timeline entry renders a related image", async ({ page }) => {
    await page.goto(TARGET, { waitUntil: "domcontentloaded" });

    const track = page.locator("#timeline-track");
    await expect(track).toBeAttached();

    const items = track.locator(".tl-item");
    await expect
      .poll(() => items.count(), { timeout: 15_000 })
      .toBeGreaterThanOrEqual(MIN_EVENTS);

    const count = await items.count();
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      const img = item.locator(".tl-media img");
      await expect(img, `item ${i} has an image`).toHaveCount(1);

      // Bring the (lazy) image into view and confirm it actually decodes.
      await img.scrollIntoViewIfNeeded();
      const src = await img.getAttribute("src");
      const alt = await img.getAttribute("alt");
      expect(src, `item ${i} image has a src`).toBeTruthy();
      expect((alt || "").trim().length, `item ${i} image has alt text`).toBeGreaterThan(0);

      await expect
        .poll(
          () => img.evaluate((el) => (el as HTMLImageElement).naturalWidth),
          { timeout: 10_000, message: `item ${i} image (${src}) loads` },
        )
        .toBeGreaterThan(0);
    }
  });

  test("timeline images are visible (reveal state applied)", async ({ page }) => {
    await page.goto(TARGET, { waitUntil: "domcontentloaded" });
    const firstCard = page.locator("#timeline-track .tl-item").first();
    await firstCard.scrollIntoViewIfNeeded();
    await expect(firstCard).toBeVisible();
    await expect(firstCard.locator(".tl-media img")).toBeVisible();
  });
});
