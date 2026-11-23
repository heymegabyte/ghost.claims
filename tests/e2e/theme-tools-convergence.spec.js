import { test, expect } from "@playwright/test";

test("homepage uses the converged shell and removes its duplicate transmission archive", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#transmissions, .transmissions-section")).toHaveCount(0);
  await expect(page.getByText("The Open Channel", { exact: true })).toHaveCount(0);
  await expect(page.locator(".chat-toggle-label")).toHaveText("AI");
  await expect(page.locator("tt-ai-chat-shell")).toHaveAttribute("data-theme-tools", "ai-chat-shell");
  await expect(page.locator("main > .section-divider")).toHaveCount(0);

  for (const section of await page.locator("main > section:not(.hero)").all()) {
    const borders = await section.evaluate((element) => ({
      top: getComputedStyle(element).borderTopWidth,
      bottom: getComputedStyle(element).borderBottomWidth,
    }));
    expect(borders).toEqual({ top: "0px", bottom: "0px" });
  }

  const nav = page.locator('[data-theme-tools="site-nav"]');
  const box = await nav.boundingBox();
  expect(box?.x).toBe(0);
  expect(box?.width).toBe(1280);
  await expect(nav.locator(".tt-nav__logo")).toHaveAttribute("src", /logo-nav\.png/);

  await expect(page.locator(".entropy-explainer .tt-gallery__slide")).toHaveCount(5);
  await expect(page.getByRole("heading", { name: /alarm clock for breaking multiverse bondage/i })).toBeVisible();
  for (const cardMetric of await page.locator(".status-card .metric").all()) {
    const fits = await cardMetric.evaluate((element) => element.scrollWidth <= element.clientWidth);
    expect(fits).toBe(true);
  }
  const metric = page.locator(".status-card .metric").first();
  const before = await metric.evaluate((node) => node.getBoundingClientRect().height);
  await metric.evaluate((node) => { node.textContent = "123456789012345678901234567890"; });
  const after = await metric.evaluate((node) => node.getBoundingClientRect().height);
  expect(Math.abs(after - before)).toBeLessThan(0.01);

  await page.goto("/story");
  const manifestoWidth = await page.locator(".manifesto-frame").evaluate((node) => node.getBoundingClientRect().width);
  expect(manifestoWidth).toBeLessThanOrEqual(720);
});

test("AI microphone visibly records recognized speech", async ({ page }) => {
  await page.addInitScript(() => {
    class RecognitionMock {
      start() {
        this.onstart?.();
        setTimeout(() => this.onresult?.({ resultIndex: 0, results: Object.assign([[{ transcript: "the signal is clear" }]], { 0: Object.assign([{ transcript: "the signal is clear" }], { isFinal: true }), length: 1 }) }), 20);
      }
      stop() { this.onend?.(); }
    }
    window.SpeechRecognition = RecognitionMock;
  });
  await page.goto("/");
  await page.locator("#chat-toggle").click();
  await page.locator("#chat-mic").click();
  await expect(page.locator("#chat-mic")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#chat-input")).toHaveValue("the signal is clear");
});

test("transmission records only open and remain open", async ({ page }) => {
  await page.route("**/api/v1/transmissions/live?**", (route) => route.fulfill({ json: {
    entries: [{ type: "chat", sessionId: "stable", role: "user", content: "Keep this conversation open after I select it.", createdAt: "2026-11-21T00:00:00Z" }], total: 1,
  } }));
  await page.route("**/api/v1/transmission-count", (route) => route.fulfill({ json: { calls: 0, chats: 1, count: 1 } }));
  await page.goto("/transmissions");
  const card = page.locator(".tx-card").first();
  await expect(card).toBeVisible();
  await card.click();
  await expect(card).toHaveClass(/expanded/);
  await card.click();
  await expect(card).toHaveClass(/expanded/);
});

test("entropy split becomes a full-width mobile stack", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const section = page.locator(".entropy-explainer");
  await section.scrollIntoViewIfNeeded();
  expect(await section.evaluate((node) => getComputedStyle(node).gridTemplateColumns.split(" ").length)).toBe(1);
  const carousel = page.locator(".entropy-explainer .tt-gallery");
  expect((await carousel.boundingBox())?.width).toBeGreaterThan(340);
});

test("Signal film actions are centered and footer content clears live telemetry", async ({ page }) => {
  await page.goto("/");

  const signalCopy = page.locator(".the-signal-copy");
  const actions = signalCopy.locator(".hero-actions");
  const alignment = await actions.evaluate((element) => {
    const parent = element.parentElement.getBoundingClientRect();
    const box = element.getBoundingClientRect();
    return {
      left: box.left - parent.left,
      right: parent.right - box.right,
      justifyContent: getComputedStyle(element).justifyContent,
    };
  });
  expect(alignment.justifyContent).toBe("center");
  expect(Math.abs(alignment.left - alignment.right)).toBeLessThan(1);

  const disclosurePadding = await signalCopy.locator(".the-signal-disclosure").evaluate((element) => ({
    block: Number.parseFloat(getComputedStyle(element).paddingTop),
    inline: Number.parseFloat(getComputedStyle(element).paddingLeft),
  }));
  expect(disclosurePadding.block).toBeGreaterThanOrEqual(20);
  expect(disclosurePadding.inline).toBeGreaterThanOrEqual(20);

  const actionSpacing = await actions.evaluate((element) => Number.parseFloat(getComputedStyle(element).paddingBottom));
  expect(actionSpacing).toBeGreaterThanOrEqual(20);

  await expect(page.locator(".signal-closing > .signal-closing__grid > .tt-panel")).toHaveCount(2);
  await expect(page.locator(".signal-closing__dispatch #newsletter-form")).toBeVisible();
  await expect(page.locator(".signal-closing__note .hotline-number")).toHaveAttribute("href", "tel:+16016666602");

  await page.locator(".tt-footer").scrollIntoViewIfNeeded();
  const clearance = await page.evaluate(() => {
    const content = document.querySelector(".tt-footer__row").getBoundingClientRect();
    const telemetry = document.querySelector(".telemetry-strip").getBoundingClientRect();
    const links = document.querySelector(".tt-footer__links").getBoundingClientRect();
    const note = document.querySelector(".tt-footer__note").getBoundingClientRect();
    return telemetry.top - Math.max(links.bottom, note.bottom, content.top);
  });
  expect(clearance).toBeGreaterThanOrEqual(32);
});

test("auditory signal cards and singleton data export stay centered", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator(".listen-feature-legend-card");
  await expect(cards).toHaveCount(3);
  await expect(cards.locator("strong")).toHaveText(["Drone.", "Harmonic.", "Whisper."]);
  for (const card of await cards.all()) {
    const alignment = await card.evaluate((element) => ({
      textAlign: getComputedStyle(element).textAlign,
      titleDisplay: getComputedStyle(element.querySelector("strong")).display,
      titleAlign: getComputedStyle(element.querySelector("strong")).textAlign,
      titleWeight: Number(getComputedStyle(element.querySelector("strong")).fontWeight),
      titleSize: Number.parseFloat(getComputedStyle(element.querySelector("strong")).fontSize),
      descriptionDisplay: getComputedStyle(element.querySelector(".listen-feature-description")).display,
      descriptionAlign: getComputedStyle(element.querySelector(".listen-feature-description")).textAlign,
    }));
    expect(alignment).toMatchObject({
      textAlign: "center",
      titleDisplay: "block",
      titleAlign: "center",
      titleWeight: 800,
      descriptionDisplay: "block",
      descriptionAlign: "center",
    });
    expect(alignment.titleSize).toBeGreaterThanOrEqual(24);
  }

  const singleton = await page.locator(".dossier-entropy-grid").evaluate((element) => {
    const grid = element.getBoundingClientRect();
    const card = element.firstElementChild.getBoundingClientRect();
    return { left: card.left - grid.left, right: grid.right - card.right };
  });
  expect(Math.abs(singleton.left - singleton.right)).toBeLessThan(1);

  const auditoryWidths = await page.locator(".listen-feature-scope-wrap, .listen-feature-detector").evaluateAll((elements) =>
    elements.map((element) => ({ left: element.getBoundingClientRect().left, width: element.getBoundingClientRect().width })),
  );
  expect(auditoryWidths).toHaveLength(2);
  expect(Math.abs(auditoryWidths[0].left - auditoryWidths[1].left)).toBeLessThan(1);
  expect(Math.abs(auditoryWidths[0].width - auditoryWidths[1].width)).toBeLessThan(1);
});
