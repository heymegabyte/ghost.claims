# Proposal: migrate ghost.claims to the canonical theme.tools site system

**Architect:** codex
**Architect Role:** assigned

## Why

Ghost Signal currently renders four visually similar but independently implemented shells: static HTML pages, Hono-rendered transmissions, Hono-rendered API reference, and the React/Vite blog. The navbar differs in markup, dimensions, active-state handling, mobile behavior, and link inventory. Legal pages omit Blog and do not link the logo home. Reusable theme.tools components are used only by the blog, leaving the remaining pages as product-local presentation forks.

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

## Scope

Public routes: `/`, `/transmissions`, `/docs`, `/api/docs`, `/privacy`, `/terms`, `/blog`, all five Night Archive article routes, and the recovered `/blog/sensor-telemetry-web-dossier` route. API JSON/text endpoints are behavior-preserving and outside visual migration scope.

## Reuse classification

`reuse-existing-shared`: consume the pinned `@theme.tools/blog` and `@theme-tools/shared-utils` packages. The canonical theme.tools checkout has substantial unrelated uncommitted work, so this change SHALL NOT edit or publish from that dirty tree. Missing upstream capabilities will be recorded precisely rather than locally forked.
