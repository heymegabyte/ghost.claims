# Capability Delta: canonical site shell

## ADDED Requirements

### Requirement: One canonical navigation across every public route

The site SHALL render the same brand asset, wordmark, destination set, order, dimensions, responsive behavior, and interaction styling on every public HTML route, with exactly one correct `aria-current="page"` destination where applicable.

#### Scenario: comparing route families

- **GIVEN** any static, Hono-rendered, API-reference, blog-index, or blog-article route
- **WHEN** the page is rendered at desktop or phone width
- **THEN** its navbar has the same five destinations, visible linked logo, measurable shell geometry, keyboard focus treatment, and applicable active state.

### Requirement: theme.tools is the presentation authority

Ghost Signal SHALL consume pinned theme.tools renderers and semantic tokens for supported site, editorial, media, and widget presentation while retaining only product content, configuration, route/data bindings, and thin compatibility adapters locally.

#### Scenario: package and consumer verification

- **GIVEN** a production build
- **WHEN** its dependency graph and rendered pages are inspected
- **THEN** theme.tools packages are pinned, shared components are imported rather than copied, and product behavior remains functional.

### Requirement: complete visual convergence evidence

The migration SHALL perform ten documented inspection passes over every public route at 1440×1000 and 390×844, with console/network errors, overflow, navigation geometry, keyboard focus, reduced motion, and critical interactions checked before deployment.

#### Scenario: final visual gate

- **GIVEN** the tenth pass
- **WHEN** all route captures and automated checks run
- **THEN** no known medium-or-higher visual, accessibility, navigation, or responsive defect remains and any blocked upstream work is explicitly identified.

### Requirement: constrained EMF interaction preserves runtime boundaries

The site SHALL bind its exact Cloudflare Worker bundle and browser assets to a five-sample constrained-device receipt for a representative EMF chart interaction, with the measured main-thread strategy justified and accessible behavior preserved.

#### Scenario: changing the chart history horizon

- **GIVEN** a seeded local Worker and a 390×844 browser under 4× CPU and Fast 3G constraints
- **WHEN** a keyboard user selects a different history-range preset
- **THEN** the URL, chart metadata, and visible canvas update within the declared threshold, focus remains on the initiating control, no optional interaction chunk is fabricated, and no serious or critical accessibility violation is present.

### Requirement: shared navigation is JSON-configured and visually invariant

The site SHALL render its logo, accessible brand label, destinations, active state, and full-width geometry from a serializable theme.tools navigation contract on every public route.

#### Scenario: full-width navigation with centered content

- **GIVEN** any public route at desktop or mobile width
- **WHEN** the canonical navigation renders
- **THEN** its background and border span the viewport, its inner content obeys the configured maximum width, and its logo and links remain identical across route families.

### Requirement: interactive records and AI controls preserve explicit user state

The site SHALL keep a transmission open once selected and SHALL expose observable voice-input states without silently swallowing permission or recognition failures.

#### Scenario: a user opens a transmission while live refresh continues

- **WHEN** the user selects a closed transmission and the feed refreshes
- **THEN** that transmission remains open and subsequent clicks do not collapse it.

### Requirement: canonical mega menu exposes the complete site map

The site SHALL use the theme.tools compact-overlay mega-menu on every public HTML route, with the brand at the left and Explore, search/command access, specialty links, and an accessible operator/profile affordance at the right.

#### Scenario: opening and navigating the menu

- **GIVEN** any public route at desktop or phone width
- **WHEN** a pointer, keyboard, or assistive-technology user opens the menu
- **THEN** grouped Signal, Records, Journal, and Developer destinations are available in one viewport-safe overlay, focus remains contained until close, Escape restores focus, and `/` or Command/Ctrl+K focuses search.

#### Scenario: comparing implementations

- **GIVEN** the homepage, a Worker-rendered route, and a React blog route
- **WHEN** their resting headers and open overlays are inspected
- **THEN** they derive from the same serializable configuration and expose equivalent logo, controls, account affordance, groups, featured content, responsive layout, and accessibility attributes.
