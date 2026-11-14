# ghost.claims

<instructions>

## Product
Public record + entropy science project at ghost.claims. Built on radical truth, a public EMF sensor, an AI hotline, and a multimedia dossier of unexplained life events.

Core pillars:
1. **Public EMF sensor** — GQ EMF-390 connected to Home Assistant, exposed through a Cloudflare-cached API. Anyone can poll, graph, and analyze the readings.
2. **Entropy AI** — true random numbers harvested from a living electromagnetic field. Entropy no algorithm can fake, intended for computer science, physics, and AI use.
3. **Multimedia dossier** — interactive tour of paranormal events, gangstalking documentation, unexplained patterns, time traveler encounters — facts that would surface anyway due to systematic targeting by clandestine actors operating outside standard thought patterns
4. **AI hotline** — (601) 666-6602, every call transcribed and published as public record

The operator: Brian Zalewski. Aerospace Engineering (Applied Science) background. 14+ years as high-level technological advisor. Experiences the universe differently — intuition, deja-vu karma, a pattern-recognition load too dense to dismiss. The site is the disclosure on his terms.

Tone: Direct, unfiltered, conspiratorial but credible. The weird stuff is the point — it sells the truth and serves science. Never sanitize. Never apologize. Do NOT frame as a presidential campaign — the project is a public record + entropy API, not a political run.

## Stack
CF Workers + Hono + @hono/zod-openapi | Static assets in `public/` | Home Assistant upstream | Cloudflare Cache API | KV rate limiting | D1 (chat, calls, newsletter, EMF snapshots) | xterm.js MUD terminal | Twilio AI hotline | TypeScript | Wrangler

## Architecture
- `src/index.ts` — Hono worker: EMF API, chat, Twilio webhooks, WebSocket MUD proxy, newsletter
- `src/lib/chat.ts` — AI chat with Ghost Signal persona (Claude Sonnet)
- `src/lib/twilio.ts` — Voice AI hotline with TwiML (Claude Haiku)
- `src/data/timeline.yaml` — Timeline events data
- `public/index.html` — Single-page site: hero, EMF chart, timeline, dossier cards, mission statement, evidence, MUD terminal, newsletter
- `public/app.js` — Frontend controller: chart rendering, chat widget, MUD xterm.js, countdown
- `public/styles.css` — CSS cascade layers, dark theme (#060610), brand colors

## Deploy
`CLOUDFLARE_EMAIL=$(get-secret CLOUDFLARE_EMAIL) CLOUDFLARE_API_KEY=$(get-secret CLOUDFLARE_API_KEY) npx wrangler deploy` then purge CDN. Rollback: `wrangler rollback`.

## Routing
Skills: @~/.agentskills/_router.md. Agents: @~/.agentskills/agents/. Rules: @~/.claude/rules/.

</instructions>

<context>
See global CLAUDE.md for full Emdash OS v6.0 policy. Project-specific overrides go in this file.
</context>
