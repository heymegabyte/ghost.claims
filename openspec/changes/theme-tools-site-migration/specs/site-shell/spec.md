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

### Requirement: the above-the-fold experience centers the entropy action

The homepage SHALL present a viewport-filling hero whose dominant interactive task is copying the current signal-derived random number, with supporting product context and direct routes to source data, API documentation, and AI chat.

The desktop layout SHALL use the complete first viewport below the canonical navigation without cropping the headline, CTA rail, copy instrument, or primary copy control.

#### Scenario: copying the generated number

- **GIVEN** the random endpoint has returned a valid value
- **WHEN** a visitor activates the primary copy control with pointer or keyboard
- **THEN** the exact displayed value is copied, an accessible confirmation is announced, and the hero geometry does not shift.

### Requirement: spectral WebGL is ambient and performance-bounded

The hero SHALL render its ghost-like atmosphere as progressive enhancement that does not block content, interaction, accessibility, or recovery when graphics acceleration is unavailable.

#### Scenario: reduced motion or unavailable WebGL

- **GIVEN** reduced motion is requested or a WebGL context cannot be created
- **WHEN** the hero loads
- **THEN** all content and controls remain available over a legible static spectral fallback with no repeated animation work.

#### Scenario: the hero leaves the viewport

- **WHEN** the hero is no longer visible or the document becomes hidden
- **THEN** animation frames stop until visibility returns.

### Requirement: every route exposes the complete shared footer

Every public route SHALL render the same theme.tools footer with the Ghost Signal logo and description, a vertical destination list, a compact Signal Dispatch subscription form, and working Privacy and Terms destinations.

#### Scenario: newsletter submission from a non-homepage route

- **GIVEN** a visitor is on a static, Worker-rendered, or React route
- **WHEN** they submit a valid email in the footer
- **THEN** the shared controller posts to the declared newsletter endpoint and announces success or failure without navigating away.

#### Scenario: footer hotline interaction

- **WHEN** the hotline link is hovered, focused, or selected
- **THEN** its cyan text remains visible and its telephone destination remains unchanged.
