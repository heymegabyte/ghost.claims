import { createMiddleware } from "hono/factory";

import { ApiError } from "./errors";
import { getPublicRateLimit } from "./config";
import type { AppVariables, Env } from "../types";

type Bindings = {
  Bindings: Env;
  Variables: AppVariables;
};

function getIpAddress(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export const publicReadRateLimit = createMiddleware<Bindings>(async (c, next) => {
  if (!c.env.RATE_LIMIT_KV) {
    await next();
    c.header("access-control-allow-origin", "*");
    c.header("access-control-allow-methods", "GET, OPTIONS");
    c.header("access-control-allow-headers", "Content-Type");
    c.header("access-control-expose-headers", "X-Request-ID");
    return;
  }

  if (c.req.method === "OPTIONS") {
    await next();
    return;
  }

  const limit = getPublicRateLimit(c.env);
  const ip = getIpAddress(c.req.raw);
  const minuteBucket = Math.floor(Date.now() / 60_000);
  const resetAt = (minuteBucket + 1) * 60;
  const key = `rate-limit:public:${ip}:${minuteBucket}`;
  let current = 0;
  try {
    current = Number.parseInt((await c.env.RATE_LIMIT_KV.get(key)) ?? "0", 10);
  } catch (error) {
    // Rate limiting is a protective layer, not a reason to take the public API
    // offline. A transient KV incident must not turn every sensor endpoint into
    // a 500; continue without the counter and leave a diagnosable warning.
    console.warn("[rate-limit] KV read failed; allowing request", {
      error: error instanceof Error ? error.message : String(error),
    });
    await next();
    c.header("access-control-allow-origin", "*");
    c.header("access-control-allow-methods", "GET, OPTIONS");
    c.header("access-control-allow-headers", "Content-Type");
    c.header("access-control-expose-headers", "X-Request-ID");
    c.header("x-ratelimit-status", "degraded");
    return;
  }

  if (current >= limit) {
    throw new ApiError("Rate limit exceeded. Slow down and try again in a minute.", 429, "RATE_LIMITED", {
      limit,
      resetAt,
    });
  }

  try {
    await c.env.RATE_LIMIT_KV.put(key, String(current + 1), { expirationTtl: 120 });
  } catch (error) {
    console.warn("[rate-limit] KV write failed; allowing request", {
      error: error instanceof Error ? error.message : String(error),
    });
  }

  await next();

  c.header("access-control-allow-origin", "*");
  c.header("access-control-allow-methods", "GET, OPTIONS");
  c.header("access-control-allow-headers", "Content-Type");
  c.header("access-control-expose-headers", "X-Request-ID, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset");
  c.header("x-ratelimit-limit", String(limit));
  c.header("x-ratelimit-remaining", String(Math.max(limit - current - 1, 0)));
  c.header("x-ratelimit-reset", String(resetAt));
});
