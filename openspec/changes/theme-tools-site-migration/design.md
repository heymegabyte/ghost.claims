# Design: canonical Ghost Signal shell on theme.tools

**Architect:** codex
**Architect Role:** assigned

## Approach

Create a product-specific configuration containing brand, links, and active-route rules, then use the pinned theme.tools renderer as the canonical markup source. Build-time generation supplies static pages; Hono routes consume the same serialized shell; the React blog imports the same configuration. A small Ghost Signal token adapter maps theme.tools semantic variables onto the approved production palette.

Page content remains in its current runtime to avoid a high-risk framework rewrite: static pages stay static, interactive homepage behavior stays in its existing scripts, Hono owns server-rendered routes, Scalar owns the API explorer, and React/Vite owns the blog. The migration consolidates presentation contracts, not application execution.

## Unified journal

The blog index uses theme.tools' magazine primitives to become one publication rather than two competing implementations. The canonical structured engineering post is the cover story; the five existing narrative and reported pieces remain the Night Archive below it. Both formats resolve through the same React route shell and full theme.tools component registry. The technical post retains its canonical JSON source and renders Markdown, figures, evidence provenance, tags, table of contents, sharing, and structured widgets through package exports rather than duplicated local templates.

The visual bridge uses the canonical theme.tools canvas and electric cyan as the publication-wide identity. Night Archive distinctions come from content, composition, and editorial labels rather than a second palette. Typography, surface elevation, navigation, focus, responsive behavior, and motion remain shared across both desks.

## Default-theme authority

`@theme.tools/blog/site` and `ALL_BLOG_CSS` own the root visual tokens, global canvas, shared typography, navigation, footer, and interactive geometry. Product CSS may alias legacy variable names to canonical `--tt-*` tokens so existing data visualizations continue to function, but it may not redefine the theme palette or shared shell. The only shell adapter retained locally is the Ghost Signal logo image and route-aware `aria-current` annotation; both are product configuration rather than reusable UI implementation.

The homepage, legal pages, docs, transmissions, API reference, and React journal load the same generated package stylesheet first and retain no competing red/purple theme layer. Scalar receives a token-equivalent cyan skin because it is a third-party renderer outside theme.tools' DOM contract.

## Navigation invariant

Every page presents the same logo, `GHOST // SIGNAL` wordmark, five links in the same order, dimensions, spacing, responsive overflow behavior, focus appearance, and route-aware `aria-current`. Legal pages receive the missing Blog link and linked brand. Mobile keeps all destinations reachable without hiding the entire navigation.

## Theme.tools boundaries

- Reuse site navigation, page header, article, post grid, media, widgets, and shared utility contracts from the pinned packages.
- Keep content, API bindings, sensor charts, chat, transmissions data, and product effects in ghost.claims.
- Do not edit the dirty canonical theme.tools checkout. Any missing framework-neutral shell compiler is an upstream follow-up, not copied reusable implementation.

## Full-catalog convergence

The consumer pins a reproducible tarball built from canonical theme.tools commit `748a389c6a9ca9d745c050c1ccd2a64a07f51a3e` in an isolated clean worktree. The unified `components-registry` is the only editorial widget/media dispatcher. `SITE_CSS` and `ALL_BLOG_CSS` are generated into one shared catalog stylesheet loaded before product-specific composition CSS on every route. Product code retains only content, routes, data bindings, and Ghost Signal-specific compositions. A generated JSON manifest records exact source provenance, every available component type, and runtime invariant results.

## Ten-pass visual loop

Each pass captures all routes at 1440×1000 and 390×844 and reviews: shell/navbar; hierarchy; spacing/grid; typography; component convergence; interaction/focus; accessibility/contrast; responsive behavior; loading/error stability; and final regression/performance polish. Repairs are re-captured before the next pass.

## Migration and rollback

Changes are additive and reversible. Build the new shared shell assets, replace route-local navbar markup, validate all routes, then deploy one tested commit. Rollback is `git revert <migration-commit>` followed by `pnpm deploy`; no schema or data migration is involved.

## Verification

`pnpm check`, `pnpm test:unit`, `pnpm build:blog`, `pnpm check:performance`, full Playwright E2E, route visual audit, keyboard checks, reduced-motion checks, production browser verification, and clean-worktree confirmation.
