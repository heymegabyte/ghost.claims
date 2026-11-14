# Project Brief — ghost.claims

## Thesis
`ghost.claims` is a public edge-hosted API and evidence-first website for one EMF sensor, exposing the current reading, recent history, and derived entropy metrics so anyone can inspect, poll, graph, or build on the data directly.

The product pairs a Cloudflare-cached public API with a realtime demo site that frames the sensor as a public record of an unusual personal experience, while keeping the claims clearly in the realm of first-person perspective rather than asserting unverified accusations as fact.

## Users
- Primary: developers, researchers, tinkerers, and paranormal-curious builders who want a stable public endpoint for EMF polling, dashboards, bots, and entropy experiments
- Secondary: visitors to `ghost.claims` who want to see the current reading, a live graph, and the context for why the feed exists
- Anti-persona: users looking for private data access, control over the Home Assistant instance, or a site that publishes unsupported accusations against named people or organizations

## Category & Model
Category: API platform + marketing/documentation site
Model: free public API + open website
Target: reliable public utility with low operating cost on Cloudflare free/low-cost primitives

## Success Criteria
- Primary: third-party developers can retrieve the current EMF value from a documented public endpoint in under one minute
- Secondary: homepage clearly displays the latest value and live graph, API docs are self-serve, and Cloudflare caching reduces upstream Home Assistant load
- Quality bar: secure public API, explicit rate limits, OpenAPI spec, responsive UI, accessible chart/labels, production-ready deploy docs

## Non-Goals
- No login, billing, or API key requirement for the public read endpoints in v1
- No direct exposure of Home Assistant internals, tokens, entity registry, or unrelated sensors
- No publication of unsupported factual accusations, targeted harassment, or hateful/derogatory copy
- No write operations against Home Assistant from the public site or API

## Programmatic SEO Plan
- Template type: documentation + use-case pages inside a single docs-forward site
- Seed terms: `emf api`, `home assistant sensor api`, `entropy api`, `public sensor feed`, `ghost emf`
- Data source: Home Assistant state API for current value, optional D1 snapshots for normalized history
- Hub page: `/docs`
- GEO: short answer blocks, FAQ, endpoint summaries, and structured data on homepage/docs

## AI-Native Dev Approach
- Spec-first: `SPEC.md` defines the API contract, cache policy, and content boundaries
- Tests: local typecheck and lint; production smoke checks once dependencies and Cloudflare credentials are available
- Parallelization: build docs/content, Worker/API, and frontend demo as separate slices
- Skills used: 02 goal-and-brief, 05 architecture-and-stack, 06 build-and-slice-loop, 09 brand-and-content-system, 10 experience-and-design-system, 11 motion-and-interaction-system, 08 deploy-and-runtime-verification

## Permanent Constraints
- Tech: Cloudflare Worker + Hono + OpenAPI docs + static asset binding
- Data access: upstream source is one Home Assistant entity backed by a USB-connected GQ EMF-390 sensor
- Security: public GET-only API, Cloudflare caching, KV-backed rate limiting, explicit CORS, no secrets in client code
- Content: personal background can be included only as clearly framed first-person context, not as verified accusation or harassment
- Publish flow: code can be prepared now, but deployment pauses for user answers before publishing

## Current Truth
Last updated: 2026-04-23

The repository started as a placeholder. This implementation will scaffold a single Cloudflare Worker that serves:
- `/api/v1/ghost-emf/current` for the current normalized reading
- `/api/v1/ghost-emf/history` for recent samples
- `/api/v1/ghost-emf/entropy` for derived entropy metrics
- `/api/v1/openapi.json` and `/api/docs` for formal API documentation
- `/` as the public demo and story site

The upstream Home Assistant server and token naming appear to already exist locally as `HASS_SERVER` and `HASS_TOKEN`. The exact sensor entity ID and deployment credentials still need confirmation before production publish.
