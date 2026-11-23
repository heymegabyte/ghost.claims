import type { Env } from "../types";
import { parseIntegerSetting as getIntSetting } from "@theme-tools/shared-utils/client-and-worker-utils";

export function getSiteUrl(env: Env): string {
  return env.SITE_URL ?? "https://ghost.claims";
}

export function getCurrentCacheTtl(env: Env): number {
  return getIntSetting(env.CURRENT_CACHE_TTL_SECONDS, 3);
}

export function getHistoryCacheTtl(env: Env): number {
  return getIntSetting(env.HISTORY_CACHE_TTL_SECONDS, 15);
}

export function getEntropyCacheTtl(env: Env): number {
  return getIntSetting(env.ENTROPY_CACHE_TTL_SECONDS, 15);
}

export function getPublicRateLimit(env: Env): number {
  return getIntSetting(env.PUBLIC_API_RATE_LIMIT_PER_MINUTE, 60);
}

export function getSensorStartedAt(env: Env): string {
  return env.EMF_SENSOR_STARTED_AT ?? "2026-04-03T02:47:58.394637+00:00";
}
