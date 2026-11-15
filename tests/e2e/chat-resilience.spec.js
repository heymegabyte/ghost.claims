import { test, expect } from "@playwright/test";

test("chat stream follows the browser SSE contract", async ({ request }) => {
  const response = await request.post("/api/v1/chat/stream", {
    data: { message: "What is the Ghost Signal?", sessionId: "e2e-stream-session" },
  });

  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("text/event-stream");
  expect(response.headers()["x-session-id"]).toBe("e2e-stream-session");
  const body = await response.text();
  expect(body).toContain('"type":"start"');
  expect(body).toContain('"type":"delta"');
  expect(body).toContain('"type":"suggestions"');
  expect(body).toContain('"type":"done"');
});

test("chat validates malformed messages and accepts feedback", async ({ request }) => {
  const invalid = await request.post("/api/v1/chat/stream", { data: {} });
  expect(invalid.status()).toBe(400);

  const feedback = await request.post("/api/v1/chat/feedback", {
    data: { messageId: "e2e-message", sessionId: "e2e-session", rating: 1 },
  });
  expect(feedback.ok()).toBeTruthy();
  expect(await feedback.json()).toMatchObject({ ok: true });
});

test("homepage has no injected Cloudflare scripts and service worker exists", async ({ request }) => {
  const homepage = await request.get("/");
  const html = await homepage.text();
  expect(html).not.toContain("static.cloudflareinsights.com");
  expect(html).not.toContain("challenge-platform/scripts/jsd");

  const worker = await request.get("/sw.js");
  expect(worker.ok()).toBeTruthy();
  expect(await worker.text()).toContain("skipWaiting");
});

test("API docs use the pinned Scalar standalone bundle", async ({ request }) => {
  const response = await request.get("/api/docs");
  expect(response.ok()).toBeTruthy();
  expect(await response.text()).toContain("@scalar/api-reference@1.78.1/dist/browser/standalone.js");
});
