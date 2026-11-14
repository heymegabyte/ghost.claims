# SPEC — ghost.claims

## Slice 1 — Public API Foundation

### AC1. Health and metadata
Given the Worker is deployed
When a client requests `GET /health`
Then the API returns `200` with `{ status, version, timestamp }`

Given a client requests `GET /api/v1/ghost-emf/meta`
When the upstream sensor is configured
Then the API returns public metadata for the exposed sensor only

### AC2. Current reading endpoint
Given the Home Assistant sensor is reachable
When a client requests `GET /api/v1/ghost-emf/current`
Then the API returns a normalized JSON document containing:
- `entityId`
- `friendlyName`
- `state`
- `numericValue`
- `unit`
- `lastChanged`
- `lastUpdated`
- `source`
- `sampledAt`
- `cache`

And the endpoint is safe for polling
And it sends cache headers suitable for short-lived edge caching
And it never exposes Home Assistant secrets or unrelated attributes

### AC3. History endpoint
Given recent sensor history is available
When a client requests `GET /api/v1/ghost-emf/history?minutes=60`
Then the API returns a normalized time-series array with timestamps and numeric values

And the endpoint supports bounded query parameters:
- `minutes` 1-1440 for rolling windows
- `start` + `end` ISO timestamps for explicit ranges
- `targetPoints` 32-4000 for browser-friendly downsampling

### AC4. Entropy endpoint
Given a caller wants a derived metric for randomness experiments
When a client requests `GET /api/v1/ghost-emf/entropy?minutes=60&bins=16`
Then the API computes a bounded Shannon entropy estimate from the normalized history window

And the response includes:
- `entropyBits`
- `sampleCount`
- `windowMinutes`
- `bins`
- `min`
- `max`
- `mean`
- `updatedAt`

### AC4b. Timeline endpoint
Given a caller wants timeline context for the feed
When they request `GET /api/v1/ghost-emf/timeline`
Then the API returns:
- dated technical annotations
- narrative milestones
- a safety note forbidding cruelty and animal abuse

### AC4c. Snapshot storage and exports
Given the Worker cron is active and D1 is bound
When time passes
Then the Worker stores one EMF snapshot row per minute in the serverless database

And callers can:
- request raw D1 snapshot rows for a chosen range
- export a chosen range as CSV
- export a chosen range as an Excel-compatible workbook
- use the CSV export in Google Sheets via `IMPORTDATA`
- derive a reproducible number from the chosen stored snapshot range

### AC5. OpenAPI and docs
Given a developer lands on the docs
When they visit `/api/docs`
Then they can inspect the API contract, response schemas, rate limits, and example requests

Given a client needs machine-readable docs
When they request `/api/v1/openapi.json`
Then they receive a valid OpenAPI document generated from code

### AC6. Security and resilience
Given the API is public
When clients call read endpoints
Then only `GET` and `OPTIONS` are exposed publicly
And rate limiting is enforced per IP with KV
And CORS is explicit
And responses include a request ID
And upstream failures return a safe JSON error envelope

### AC7. Cloudflare caching
Given the upstream sensor is one Home Assistant entity
When repeated requests hit the current or history endpoints
Then Cloudflare edge caching reduces repeated upstream reads
And current-value TTL defaults to a low number of seconds suitable for polling
And history/entropy responses use their own bounded TTLs

## Slice 2 — Demo Website

### AC8. Homepage
Given a visitor opens `/`
When the site loads
Then they see:
- current EMF value
- sensor freshness state
- a live-updating graph
- explicit history range controls
- technical timeline markers and major story milestones
- a developer quickstart
- links to formal docs and OpenAPI

### AC9. Story section
Given a visitor wants context
When they scroll to the story section
Then they see a first-person explanation for why the feed exists
And the copy makes clear it represents personal experience and interpretation
And the site does not publish unsupported accusations as fact

### AC10. Motion and art direction
Given the site theme is spectral and data-forward
When the page renders
Then it uses animated green spectral illustrations for:
- a ghost child
- a mischievous woman
- a dog
- “The Hand”

And motion respects `prefers-reduced-motion`

## Slice 3 — Operations and Publish

### AC11. Deployment configuration
Given Cloudflare resources are available
When the user is ready to publish
Then the repo contains:
- `wrangler.jsonc`
- env var template
- KV/D1 binding declarations
- optional cron trigger for snapshots
- deploy checklist

### AC12. Pre-publish blockers
Given deployment is user-approved only after questions
When implementation is complete
Then the repo surfaces the remaining required answers:
- exact Home Assistant entity ID
- whether D1 snapshots should be enabled immediately
- Cloudflare zone/Worker naming confirmation
- whether the story section should remain subdued, expanded, or replaced with a personal essay drafted by the user

## Out of Scope for This Pass
- write access to Home Assistant
- authenticated dashboards
- billing
- unsupported allegations or abusive copy
