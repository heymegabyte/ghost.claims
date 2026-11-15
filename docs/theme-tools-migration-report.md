# theme.tools migration report

Date: 2026-11-15  
Architect: codex (`Architect Role: assigned`)  
Approved visual baseline: production ghost.claims, explicitly approved as the Figma-equivalent artifact.

## Migrated surfaces

The canonical `@theme.tools/blog` site renderer now supplies the shared navigation, skip link, and footer across static HTML, Hono-rendered transmissions, Hono/Scalar API reference, and React/Vite blog surfaces. The blog additionally uses theme.tools page headers, post grid, article reader, articles, media, galleries, timelines, stat cards, comparison tables, spec tables, and callouts. Ghost Signal retains product-specific content, sensor charts, chat, transmission data, and cinematic effects as thin consumer-owned composition.

## Route coverage

Every pass covered desktop (1440×1000) and phone (390×844) rendering for `/`, `/transmissions`, `/docs`, `/api/docs`, `/privacy`, `/terms`, `/blog`, and all five published article routes: 24 route/viewport combinations per pass.

## Ten visual refinement passes

1. **Shell inventory:** found four navbar implementations, missing Blog links on legal pages, an unlinked legal logo, and divergent mobile behavior.
2. **Geometry convergence:** removed legacy `.site-nav` interference and the blog-only 1120px/wrapping constraint.
3. **Shared furniture:** migrated skip links and footers to theme.tools and added cross-route invariants.
4. **Hierarchy review:** verified the shared shell preserves the approved cinematic, developer, legal, API, transmission, and editorial identities.
5. **Keyboard review:** verified first-tab skip access, visible focus, linked brand, and all destinations.
6. **Motion and isolation:** verified reduced-motion behavior and contained embedded-library styles.
7. **Touch targets:** corrected cascade specificity so every navigation destination is at least 44px high.
8. **Responsive review:** verified identical shell width/height, horizontal navigation access, and zero document overflow.
9. **Runtime review:** verified theme.tools footer presence and no unexpected failed requests across route families.
10. **Final visual comparison:** recaptured all routes and found zero console, overflow, inventory, sizing, or touch-target defects.

## Reuse and upstream status

Classification: `reuse-existing-shared`. The migration consumes pinned `@theme.tools/blog@1.0.0` and `@theme-tools/shared-utils@1.0.1`. The adjacent canonical theme.tools checkout contained extensive unrelated uncommitted field-service work, so no upstream files were modified or published. A future clean upstream change can promote the Ghost Signal shell token adapter into a documented branded-nav preset; this is not required for the deployed consumer migration and must not overwrite the existing dirty tree.

## Rollback

Revert the migration commit and deploy the reverted tree with `pnpm deploy`. No database, API, or data migration is involved.

## Validation classification

- PASS: unit tests (4/4), TypeScript, production blog build, performance budgets, strict OpenSpec validation, migration E2E (7/7), and all ten 24-page visual passes.
- FAIL (pre-existing / unrelated): the repository-wide 48-test parallel run completed 27 tests and failed 21. Nineteen failures came from concurrent suites resetting the same local D1 state or stale homepage assertions; two content tests target page assets already absent from the approved production baseline. A fresh isolated migration run passed all seven affected shell/blog journeys. These failures are reported, not skipped or relabeled as passing.
