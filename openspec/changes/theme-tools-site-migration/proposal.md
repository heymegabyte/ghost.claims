# Proposal: migrate ghost.claims to the canonical theme.tools site system

**Architect:** codex
**Architect Role:** assigned

On 2026-11-22 the product owner approved a bounded navigation delta: retain the Ghost Signal brand and reduce the resting navbar to one `Browse` overlay trigger, removing the separate search, AI, call, and account controls. The overlay remains the complete navigation surface.

## Why

Ghost Signal currently renders four visually similar but independently implemented shells: static HTML pages, Hono-rendered transmissions, Hono-rendered API reference, and the React/Vite blog. The navbar differs in markup, dimensions, active-state handling, mobile behavior, and link inventory. Legal pages omit Blog and do not link the logo home. Reusable theme.tools components are used only by the blog, leaving the remaining pages as product-local presentation forks.

The user approved a bounded visual departure for the homepage hero on 2026-11-22. The recorded delta artifact is `openspec/approvals/full-page-entropy-hero.md`; it preserves product identity and data contracts while authorizing the new full-page composition and spectral WebGL field.

## Approved design

The user approved the current production site on 2026-11-15 as the Figma-equivalent artifact. This is a convergence migration, not a rebrand: the existing Ghost Signal identity, dark spectral palette, logo, typography character, content, and behaviors remain the visual source of truth.

## What changes

- Establish one canonical theme.tools navigation configuration and render-compatible shell contract across static, Hono, and React surfaces.
- Adopt theme.tools tokens, site components, editorial/media/widgets, and compatible shared utilities wherever they replace local presentation without changing product behavior.
- Normalize accessibility, responsive behavior, active states, focus treatment, spacing, and performance across all public routes.
- Run ten evidence-based visual inspection and repair passes across every public page at desktop and mobile sizes.
- Extend automated tests so navbar structure and visual invariants cannot drift again.
- Upgrade the pinned package artifact to the approved canonical theme.tools source revision that exposes the unified component registry.
- Load the complete site, widget, and media catalog on every public surface and dispatch editorial components through `renderComponent` rather than parallel local registries.
- Publish a machine-readable component/version manifest so production provenance and module invariants are inspectable.
- Reconcile the canonical structured engineering post with the React Night Archive so both editorial generations share one publication, route system, and theme.tools reading experience.
- Blend the blog's isolated crimson horror treatment with the approved site's cyan signal language while retaining red as a restrained Night Archive editorial accent.
- Make the canonical theme.tools default theme authoritative across every public surface by removing the later Ghost-specific palette, typography, radius, navigation, and background overrides that currently win in the cascade.
- Retain product-specific content layout, sensor visualizations, evidence media, and data bindings while sourcing visual tokens and shared shell geometry directly from theme.tools.
- Bind the Cloudflare Worker bundle and browser assets to a constrained-device interaction receipt for the EMF history chart, using the canonical theme.tools runtime-boundary verifier.
- Replace the remaining product-local navigation and AI-chat presentation forks with JSON-configured theme.tools contracts while preserving Ghost Signal data and interaction bindings.
- Remove the duplicate homepage Transmission Log, stabilize live-reading geometry, and recompose the entropy, random-number, Kickstarter-concept, and manifesto sections as responsive theme.tools-aligned layouts.
- Make transmission records persistently expandable and voice input observable, accessible, and testable.
- Promote the navbar into a full-width theme.tools mega-menu shell with a compact resting state, command-search access, an account/profile affordance, curated route groups, and identical behavior across every Ghost Signal surface.
- Re-architect the homepage above the fold as a viewport-filling entropy hero with clear CTAs, a dominant copyable “multiverse-leading” random-number instrument, and a performant spectral WebGL atmosphere with accessible fallbacks.

## Scope

Public routes: `/`, `/transmissions`, `/docs`, `/api/docs`, `/privacy`, `/terms`, `/blog`, all five Night Archive article routes, and the recovered `/blog/sensor-telemetry-web-dossier` route. API JSON/text endpoints are behavior-preserving and outside visual migration scope.

## Reuse classification

`reuse-existing-shared`: consume the pinned `@theme.tools/blog` and `@theme-tools/shared-utils` packages. The canonical theme.tools checkout has substantial unrelated uncommitted work, so this change SHALL NOT edit or publish from that dirty tree. Missing upstream capabilities will be recorded precisely rather than locally forked.
