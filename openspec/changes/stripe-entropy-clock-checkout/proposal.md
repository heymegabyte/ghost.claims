# Proposal: activate the Ghost Signal entropy clock checkout

**Architect:** codex  
**Architect Role:** assigned

## Why

The homepage presents the entropy clock as a $378 product but still routes buyers to a newsletter and says checkout is unavailable, while a verified live Ghost Signal Stripe Payment Link now exists. This mismatch prevents purchase and contradicts the product’s R&D reservation terms.

## What Changes

- Replace the launch-list-only primary action with the live, branded Stripe checkout while retaining a secondary email-updates action.
- Present the non-refundable R&D reservation, 100-customer production threshold, tax, fulfillment, and receipt terms before the buyer leaves Ghost Signal.
- Treat Stripe-hosted Checkout as the payment and card-data boundary, including its accessible decline/error states and branded confirmation surface.
- Enable and verify Stripe customer receipts, refund emails, and printable invoice PDFs; do not duplicate sensitive payment handling in the Worker.
- Add regression coverage for product price, disclosures, checkout destination, secure link behavior, responsive layout, keyboard access, and production availability.

## Capabilities

### New Capabilities

- `entropy-clock-checkout`: A trustworthy purchase handoff from the Ghost Signal clock listing to Stripe-hosted Checkout, including pre-purchase disclosures, confirmation, failure recovery, and receipt delivery.

### Modified Capabilities

None.

## Impact

- Homepage markup and product copy in `public/index.html`.
- Product-section presentation in `public/styles.css` only where the existing component contract needs a state or disclosure variant.
- Playwright and contract tests for the alarm-clock purchase journey.
- The existing live Stripe product and Payment Link; no card data, new SDK, local order table, or new payment secret is introduced.

