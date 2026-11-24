import { checkKvFixedWindowRateLimit, fixedWindowRateLimitHeaders } from "@theme.tools/auth/cloudflare-kv-rate-limit";
import { createMiddleware } from "hono/factory";

import { ApiError } from "./errors";
import { getPublicRateLimit } from "./config";
import type { AppVariables, Env } from "../types";

type Bindings = {
  Bindings: Env;
  Variables: AppVariables;
};

function setPublicCorsHeaders(header: (name: string, value: string) => void): void {
  header("access-control-allow-origin", "*");
  header("access-control-allow-methods", "GET, OPTIONS");
  header("access-control-allow-headers", "Content-Type");
  header("access-control-expose-headers", "X-Request-ID, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset");
}

export const publicReadRateLimit = createMiddleware<Bindings>(async (c, next) => {
  if (!c.env.RATE_LIMIT_KV) {
    await next();
    setPublicCorsHeaders(c.header.bind(c));
    return;
  }
  if (c.req.method === "OPTIONS") {
    await next();
    return;
  }

  const result = await checkKvFixedWindowRateLimit({
    request: c.req.raw,
    kv: c.env.RATE_LIMIT_KV,
    limit: getPublicRateLimit(c.env),
    namespace: "public",
  });
  if (!result.allowed) {
    throw new ApiError("Rate limit exceeded. Slow down and try again in a minute.", 429, "RATE_LIMITED", {
      limit: result.limit,
      resetAt: result.resetAt,
    });
  }
  if (result.degraded) console.warn("[rate-limit] KV unavailable; allowing request");

  await next();
  setPublicCorsHeaders(c.header.bind(c));
  for (const [name, value] of Object.entries(fixedWindowRateLimitHeaders(result))) c.header(name, value);
});
