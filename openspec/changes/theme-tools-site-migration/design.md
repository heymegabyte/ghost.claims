# Design: canonical Ghost Signal shell on theme.tools

**Architect:** codex
**Architect Role:** assigned

## Story and evidence archive split

The homepage is the product surface: live field data, entropy tools, the featured Signal film, and open-channel actions. The long first-person manifesto, chronology, and dossier move intact to `/story`; the license-plate chapter and complete media archive move intact to `/plates`. Both routes use the same generated theme.tools shell and product effects as the homepage, while route-specific introductions establish provenance and reading context.

The Signal film remains on the homepage as the project’s primary first-person evidence for its multiverse-aware EMF hypothesis. Copy distinguishes the existence of the recording and measurements from the supernatural interpretation, which is not presented as independently validated scientific proof. The Plates essay likewise distinguishes photographed vehicles and remembered experiences from unverified claims about drivers, agencies, possession, or coordination.

## Browse-only resting navigation

The canonical resting header exposes only the existing brand anchor and one `Browse` trigger. Search, AI, call, profile, and every destination remain available inside the theme.tools overlay rather than competing in the resting bar. Five visual convergence passes refine the trigger's silhouette, surface depth, icon rhythm, interaction states, and responsive/reduced-motion finish without forking the overlay implementation.

## Centered signal panels and singleton grids

The auditory legend uses three equally weighted, centered signal cards with title, frequency, and description on distinct lines. Five convergence passes cover alignment, hierarchy, surface depth, signal-specific accents, and responsive interaction polish. Homepage card grids with exactly one child collapse their reserved columns and center that child at a readable maximum width; multi-card and intentional full-row layouts remain unchanged.

The auditory scope diagram and Ghost Detector panel share one 760px responsive rail so their left and right edges align at desktop and collapse together on narrow screens.

## Editorial article convergence

Night Archive articles use a single centered, viewport-safe reading rail with left-aligned prose, consistent section rhythm, full-width media inside the rail, and a deliberate wide breakout only for the canonical source library. The Greystone field note receives five screenshot-led refinement passes across hierarchy, spacing, media, citations, and responsive polish. A synthesized audio briefing uses the canonical theme.tools audio component, requires an explicit play gesture, provides a transcript and download, and identifies its provenance. Generated editorial art is labeled as interpretive and is never presented as documentary evidence.

The Browse overlay uses a fully opaque black canvas and coordinated scrim/sheet/content transitions on open and close. Reduced-motion users receive the same state change without movement, focus remains trapped while open, and focus returns to the trigger on close.

## Approach

Create a product-specific configuration containing brand, links, and active-route rules, then use the pinned theme.tools renderer as the canonical markup source. Build-time generation supplies static pages; Hono routes consume the same serialized shell; the React blog imports the same configuration. A small Ghost Signal token adapter maps theme.tools semantic variables onto the approved production palette.

Page content remains in its current runtime to avoid a high-risk framework rewrite: static pages stay static, interactive homepage behavior stays in its existing scripts, Hono owns server-rendered routes, Scalar owns the API explorer, and React/Vite owns the blog. The migration consolidates presentation contracts, not application execution.

## Unified journal

The blog index uses theme.tools' magazine primitives to become one publication rather than two competing implementations. The canonical structured engineering post is the cover story; the five existing narrative and reported pieces remain the Night Archive below it. Both formats resolve through the same React route shell and full theme.tools component registry. The technical post retains its canonical JSON source and renders Markdown, figures, evidence provenance, tags, table of contents, sharing, and structured widgets through package exports rather than duplicated local templates.

The structured sensor-telemetry dossier uses a flat editorial canvas: its canonical widgets remain distinct, accessible surfaces, while the article and section wrappers are transparent and borderless. This avoids stacking widget tiles inside a second article tile. The journal `#main` is explicitly transparent so the shared Ghost Signal canvas remains visually continuous.

The visual bridge uses the canonical theme.tools canvas and electric cyan as the publication-wide identity. Night Archive distinctions come from content, composition, and editorial labels rather than a second palette. Typography, surface elevation, navigation, focus, responsive behavior, and motion remain shared across both desks.

## Default-theme authority

`@theme.tools/blog/site` and `ALL_BLOG_CSS` own the root visual tokens, global canvas, shared typography, navigation, footer, and interactive geometry. Product CSS may alias legacy variable names to canonical `--tt-*` tokens so existing data visualizations continue to function, but it may not redefine the theme palette or shared shell. The only shell adapter retained locally is the Ghost Signal logo image and route-aware `aria-current` annotation; both are product configuration rather than reusable UI implementation.

The homepage, legal pages, docs, transmissions, API reference, and React journal load the same generated package stylesheet first and retain no competing red/purple theme layer. Scalar receives a token-equivalent cyan skin because it is a third-party renderer outside theme.tools' DOM contract.

## Navigation invariant

Every page presents the same logo, `GHOST // SIGNAL` wordmark, five links in the same order, dimensions, spacing, responsive overflow behavior, focus appearance, and route-aware `aria-current`. Legal pages receive the missing Blog link and linked brand. Mobile keeps all destinations reachable without hiding the entire navigation.

The final shell uses the canonical compact-overlay mega-menu variant. Its edge-to-edge header contains the logo and wordmark on the left; Explore and command-search controls, route utilities, and a circular operator/profile affordance remain on the right. Opening Explore presents grouped Signal, Records, Journal, and Developer destinations with featured context, quick actions, and latest material. The same serializable configuration is rendered by static generation, Hono, and React. JavaScript is progressive enhancement: destinations remain available without it, while focus trapping, Escape, keyboard grid navigation, `/`, and Command/Ctrl+K are supplied by the shared theme.tools controller.

## Theme.tools boundaries

- Reuse site navigation, page header, article, post grid, media, widgets, and shared utility contracts from the pinned packages.
- Keep content, API bindings, sensor charts, chat, transmissions data, and product effects in ghost.claims.
- Do not edit the dirty canonical theme.tools checkout. Any missing framework-neutral shell compiler is an upstream follow-up, not copied reusable implementation.

## Full-catalog convergence

The consumer pins a reproducible tarball built from canonical theme.tools commit `748a389c6a9ca9d745c050c1ccd2a64a07f51a3e` in an isolated clean worktree. The unified `components-registry` is the only editorial widget/media dispatcher. `SITE_CSS` and `ALL_BLOG_CSS` are generated into one shared catalog stylesheet loaded before product-specific composition CSS on every route. Product code retains only content, routes, data bindings, and Ghost Signal-specific compositions. A generated JSON manifest records exact source provenance, every available component type, and runtime invariant results.

## Evidence-based visual convergence loop

The route inventory is covered by deterministic desktop/mobile geometry, accessibility, network, and interaction checks. Qualitative review stays focused on one route and one or two representative viewports per pass so defects remain attributable; four or more simultaneous screenshots are reserved for a recorded breakpoint or release-risk question. Each repair is re-captured at the affected viewport before the next evidence-led pass. Review covers shell/navbar, hierarchy, spacing/grid, typography, component convergence, interaction/focus, accessibility/contrast, responsive behavior, loading/error stability, media fallbacks, and final regression/performance polish. The loop ends only when a fresh inventory produces no further high-confidence defect.

## Migration and rollback

Changes are additive and reversible. Build the new shared shell assets, replace route-local navbar markup, validate all routes, then deploy one tested commit. Rollback is `git revert <migration-commit>` followed by `pnpm deploy`; no schema or data migration is involved.

## Verification

`pnpm check`, `pnpm test:unit`, `pnpm build:blog`, `pnpm check:performance`, full Playwright E2E, route visual audit, keyboard checks, reduced-motion checks, production browser verification, and clean-worktree confirmation.

The EMF chart boundary is verified from an exact Wrangler dry-run Worker bundle plus digest-bound static browser assets. Five fresh 390×844 browser contexts use 4× CPU slowdown and Fast 3G shaping, activate a preset-range button through the real local Worker/D1 fixture, and record update latency, keyboard focus preservation, URL state, canvas visibility, browser errors, and serious/critical Axe findings. This is intentionally a main-thread interaction: the bounded canvas redraw is product-specific, synchronous presentation with no optional SDK fan-out, while data authority remains in the Worker API.

## JSON navigation and AI surface convergence

The shared navbar accepts a validated serializable configuration containing brand text, brand URL, logo image metadata, navigation links, layout, and accessible labels. Ghost Signal keeps only that JSON data and route-aware active state; theme.tools owns the markup and full-width shell with a centered inner rail. The existing chat IDs and Worker endpoints remain stable, while a theme.tools custom-element host and canonical visual tokens own the panel surface. Browser speech recognition remains progressive enhancement with explicit permission, listening, unavailable, and error feedback.

The homepage removes its duplicate transmission archive because `/transmissions` remains the canonical record. Dynamic reading cards reserve numeric space to prevent layout shifts. The entropy explanation becomes a responsive text-and-carousel split; the random-number and alarm-clock sections clearly label metaphysical mechanisms as the project's theory and Kickstarter concept rather than verified physics or an active sale.

## Full-page entropy hero

The homepage begins with a full-viewport, two-column composition: the product promise and CTA hierarchy occupy the editorial rail, while a large instrument-like entropy card makes the copy action the primary task. The existing random-number endpoint, IDs, clipboard behavior, live metadata, and scientific disclaimer remain unchanged.

A product-specific canvas runs behind the content. A dependency-free fragment shader builds slow spectral fog, refracted cyan/violet light, particulate grain, and a central ghost-like void without loading textures or blocking the main content. Rendering caps device pixel ratio, pauses when the hero or document is hidden, and responds to element resize. Reduced-motion users receive a single static frame; devices without WebGL receive the same layered CSS fallback. The canvas is decorative, excluded from the accessibility tree, and never gates content or interaction.

The hero is at least one small-viewport height after navigation, keeps CTA targets at least 44px, preserves keyboard order and visible focus, avoids content shift while sensor data resolves, and collapses to a single readable column on narrow screens.
