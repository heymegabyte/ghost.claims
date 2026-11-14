# Deploy

## Runtime Architecture
- Cloudflare Worker serves the public API, the docs, and the demo site
- Home Assistant is the upstream system of record for the sensor
- Cloudflare Cache API provides short-lived edge caching for public reads
- KV stores per-IP rate-limit counters
- D1 stores edge-local snapshots for the history graph, export downloads, and derived random-number generation
- Worker cron uses `HASS_SERVER` and `HASS_TOKEN` to poll Home Assistant and write minute snapshots into D1

## Required Secrets
- `HASS_SERVER`
- `HASS_TOKEN`
- `EMF_SENSOR_ENTITY_ID` set to `sensor.gq_emf390_emf_mg`

## Known Sensor Details
- Public entity: `sensor.gq_emf390_emf_mg`
- Earliest known retained reading: `2026-04-03T02:47:58.394637+00:00`
- History source: Home Assistant recorder via `GET /api/history/period/<timestamp>` with `filter_entity_id` and `end_time`
- Snapshot cadence: one D1 row per minute via Worker cron

## Required Cloudflare Resources
1. Create a KV namespace for `RATE_LIMIT_KV`
2. Create a D1 database for `EMF_DB`
3. Update [wrangler.jsonc](/Users/apple/emdash-projects/worktrees/puny-chairs-create-9eu/wrangler.jsonc) with the real KV `id` and D1 `database_id`
4. Verify that `ghost.claims` does not already have a conflicting CNAME before using the configured Cloudflare custom domain route

## Local Setup
```bash
pnpm install
cp .dev.vars.example .dev.vars
pnpm check
pnpm dev
```

## Database Migration
```bash
npx wrangler d1 migrations apply ghost-megabyte-space-emf --remote
```

## Production Publish
```bash
pnpm check
pnpm deploy
```

## Secrets Setup
```bash
npx wrangler secret put HASS_SERVER
npx wrangler secret put HASS_TOKEN
```

The Worker already consumes `HASS_TOKEN` in the cron snapshot path, so once the secret is present the scheduled sync will populate D1 automatically.

`EMF_SENSOR_ENTITY_ID` and `EMF_SENSOR_STARTED_AT` are already defined in [wrangler.jsonc](/Users/apple/emdash-projects/worktrees/puny-chairs-create-9eu/wrangler.jsonc).

## Post-Deploy Smoke Checks
```bash
curl https://ghost.claims/health
curl https://ghost.claims/api/v1/ghost-emf/current
curl "https://ghost.claims/api/v1/ghost-emf/history?start=2026-04-03T02:47:58.394637%2B00:00&end=2026-04-23T23:00:00.000Z&targetPoints=960"
curl "https://ghost.claims/api/v1/ghost-emf/entropy?start=2026-04-03T02:47:58.394637%2B00:00&end=2026-04-23T23:00:00.000Z&bins=24&targetPoints=960"
curl "https://ghost.claims/api/v1/ghost-emf/snapshot?start=2026-04-03T02:47:58.394637%2B00:00&end=2026-04-23T23:00:00.000Z"
curl "https://ghost.claims/api/v1/ghost-emf/export?start=2026-04-03T02:47:58.394637%2B00:00&end=2026-04-23T23:00:00.000Z&format=csv"
curl "https://ghost.claims/api/v1/ghost-emf/random?start=2026-04-03T02:47:58.394637%2B00:00&end=2026-04-23T23:00:00.000Z&digits=10"
curl https://ghost.claims/api/v1/ghost-emf/timeline
```

## Publish Notes
- The repo is wired for a custom domain route at `ghost.claims`
- The current implementation works with Home Assistant history alone; D1 snapshots remain optional but recommended if you want edge-local long-term retention independent of recorder settings
- For historical retention, use D1. KV is reserved for rate limiting, not time-series storage.
- Cloudflare’s Cache API is edge-local, so cache HIT behavior can vary by data center even with the same request URL
- `MOCK_SENSOR_MODE` and `TEST_HELPERS_ENABLED` are for local E2E only and should remain unset in production
