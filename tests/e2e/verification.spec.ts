import { test, expect, Page } from "@playwright/test";

const PROD = process.env.PROD_URL || "https://ghost.claims";

const BREAKPOINTS = [
  { name: "iphone-se", width: 375, height: 667 },
  { name: "iphone-13", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "desktop", width: 1280, height: 800 },
  { name: "wide", width: 1920, height: 1080 },
];

test.use({ baseURL: PROD });

async function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() !== "error") return;
    const text = msg.text();
    // CSP violations + JS errors are real; ignore noisy benign tracking
    if (/Content Security Policy|Refused to|violates the following/i.test(text)) {
      errors.push(`[CSP] ${text}`);
      return;
    }
    if (/SyntaxError|TypeError|ReferenceError|Uncaught/i.test(text)) {
      errors.push(`[JS] ${text}`);
    }
  });
  page.on("pageerror", (err) => errors.push(`[pageerror] ${err.message}`));
  return errors;
}

test.describe("Plate Section TDD Verification", () => {
  test("plate intro contains WTC2001 + JFK + Federal Reserve narrative", async ({ page }) => {
    await page.goto("/");
    const intro = page.locator("section").filter({ hasText: "The Signal Speaks Through Traffic" });
    await expect(intro).toBeVisible();
    await expect(intro).toContainText("WTC2001");
    await expect(intro).toContainText("Federal Reserve");
    await expect(intro).toContainText("9/11");
    await expect(intro).toContainText("JFK");
    await expect(intro).toContainText("Building 7");
  });

  test("BLCKCHN plate image loads at 800x800", async ({ page }) => {
    const res = await page.request.get(`${PROD}/evidence-plate-blckchn.webp`);
    expect(res.status()).toBe(200);
  });

  test("4 GONDOR figure is 300x300 and float-right on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const figure = page.locator(".dossier-feature-figure--float-right").first();
    await figure.scrollIntoViewIfNeeded();
    await expect(figure).toBeVisible();
    await page.waitForLoadState("load");
    const data = await figure.evaluate((el) => {
      const img = el.querySelector("img") as HTMLImageElement | null;
      const r = el.getBoundingClientRect();
      const ir = img?.getBoundingClientRect();
      return {
        figW: Math.round(r.width),
        figH: Math.round(r.height),
        imgW: ir ? Math.round(ir.width) : null,
        imgH: ir ? Math.round(ir.height) : null,
        float: getComputedStyle(el).float,
      };
    });
    console.log("4 GONDOR data:", JSON.stringify(data));
    expect(data.float).toBe("right");
    expect(data.figW).toBe(300);
    expect(data.imgW).toBeGreaterThanOrEqual(296);
    expect(data.imgW).toBeLessThanOrEqual(300);
    expect(data.imgH).toBeGreaterThanOrEqual(296);
    expect(data.imgH).toBeLessThanOrEqual(300);
  });

  test("4 GONDOR figure stacks centered on small screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    const figure = page.locator(".dossier-feature-figure--float-right").first();
    await expect(figure).toBeVisible();
    const cssFloat = await figure.evaluate((el) => getComputedStyle(el).float);
    expect(cssFloat).toBe("none");
    const margins = await figure.evaluate((el) => {
      const s = getComputedStyle(el);
      return { left: s.marginLeft, right: s.marginRight };
    });
    expect(margins.left).toBe(margins.right);
  });

  test("CSP allows inline scripts and Google Maps frames", async ({ request }) => {
    const res = await request.get(PROD);
    const csp = res.headers()["content-security-policy"];
    expect(csp).toBeTruthy();
    expect(csp).toContain("'unsafe-inline'");
    expect(csp).toMatch(/frame-src[^;]*maps\.google\.com/);
  });

  test("JCSAVES plate floats right inline with passage on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const figure = page.locator('figure.dossier-feature-figure--float-right:has(img[src*="jcsaves"])').first();
    await figure.scrollIntoViewIfNeeded();
    await expect(figure).toBeVisible();
    await page.waitForLoadState("load");
    const data = await figure.evaluate((el) => {
      const img = el.querySelector("img") as HTMLImageElement | null;
      const r = el.getBoundingClientRect();
      const ir = img?.getBoundingClientRect();
      return {
        figW: Math.round(r.width),
        imgW: ir ? Math.round(ir.width) : null,
        imgH: ir ? Math.round(ir.height) : null,
        float: getComputedStyle(el).float,
      };
    });
    expect(data.float).toBe("right");
    expect(data.figW).toBe(300);
    expect(data.imgW).toBeGreaterThanOrEqual(296);
    expect(data.imgH).toBeGreaterThanOrEqual(296);
  });

  test("Crop circle map is non-interactive and themed", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const map = page.locator(".dossier-feature-map--themed").first();
    await map.scrollIntoViewIfNeeded();
    await expect(map).toBeVisible();
    const overlay = map.locator(".dossier-feature-map-overlay");
    await expect(overlay).toHaveCount(1);
    const data = await map.evaluate((el) => {
      const iframe = el.querySelector("iframe") as HTMLIFrameElement | null;
      const cs = iframe ? getComputedStyle(iframe) : null;
      return {
        pointerEvents: cs?.pointerEvents,
        filter: cs?.filter,
        tabindex: iframe?.getAttribute("tabindex"),
      };
    });
    expect(data.pointerEvents).toBe("none");
    expect(data.filter).toMatch(/invert/);
    expect(data.tabindex).toBe("-1");
  });

  test("'O' avatar card has resonance/time-traveler narrative", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const card = page.locator('figure.avatar-frame-card:has(img[src="/story/o.webp"])').first();
    await card.scrollIntoViewIfNeeded();
    await expect(card).toBeVisible();
    await expect(card).toContainText("nanostructures");
    await expect(card).toContainText("resonance");
    await expect(card).toContainText("time travelers");
    const isMinimal = await card.evaluate((el) => el.classList.contains("avatar-frame-card-minimal"));
    expect(isMinimal).toBe(false);
  });

  test.describe("Console clean at all breakpoints", () => {
    for (const bp of BREAKPOINTS) {
      test(`${bp.name} (${bp.width}x${bp.height}) — no CSP/JS errors`, async ({ page }) => {
        const errors = await trackErrors(page);
        await page.setViewportSize({ width: bp.width, height: bp.height });
        await page.goto("/", { waitUntil: "domcontentloaded" });
        await page.waitForTimeout(3000);
        expect(errors, errors.join("\n")).toEqual([]);
      });
    }
  });
});
