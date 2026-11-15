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
