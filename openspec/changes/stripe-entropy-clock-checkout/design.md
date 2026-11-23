# Design: Stripe-hosted entropy clock purchase journey

**Architect:** codex  
**Architect Role:** assigned

## Context

The site is a Cloudflare Worker/Hono application with a static homepage. A live Ghost Signal Stripe Payment Link already owns the $378 product, branding, automatic-tax readiness, shipping/name/phone collection, terms acceptance, successful-payment receipts, refund emails, invoice PDFs, and R&D confirmation copy. The homepage currently links to `#newsletter-form` and explicitly says checkout is inactive.

## Goals / Non-Goals

**Goals:**

- Make the live Stripe checkout the primary action inside the existing alarm-clock listing.
- Preserve the approved Ghost Signal visual identity and responsive composition.
- Give buyers clear, proximate reservation and fulfillment terms before checkout.
- Ensure payment success, declines, 3DS, wallets, receipts, invoices, and card security remain Stripe-owned.
- Verify the public purchase path without placing a real charge.

**Non-Goals:**

- Do not collect, proxy, log, or store card data in Ghost Signal infrastructure.
- Do not fabricate a paid order, tax registration, fulfillment date, inventory quantity, or scientific claim.
- Do not build an unverified local success page from query-string state.
- Do not add a cart or general e-commerce engine for this single-product reservation.

## Decisions

### Use the live Stripe Payment Link as the payment boundary

The primary CTA links directly to the verified live Payment Link. Stripe owns payment-method rendering, Link/wallet support, authentication, declines, error recovery, confirmation, and PCI scope. A custom PaymentIntent implementation would add secrets, webhook state, replay handling, and a larger compliance surface without improving this single-product flow.

### Keep success and error states Stripe-hosted

The Payment Link’s branded confirmation message is the authoritative success surface and includes R&D, threshold, and printable receipt guidance. Declines and recoverable payment errors remain inline in Stripe Checkout so buyers keep their entered data and receive provider-specific recovery instructions. Ghost Signal does not infer success from a URL parameter.

### Make receipt delivery redundant but single-sourced

Stripe sends successful-payment and refund emails and creates an invoice PDF. The product description and confirmation message both include the R&D and production-threshold terms. Ghost Signal does not send a second email until a signed, idempotent webhook and an approved outbound-mail provider are introduced in a separate change.

### Preserve a secondary no-payment path

The launch-list anchor remains as a secondary action for visitors who want updates without making the non-refundable reservation. The primary and secondary actions have distinct labels and accessible descriptions.

### Reuse the existing theme.tools button and surface vocabulary

The listing retains the pinned theme.tools button classes and existing Ghost Signal product composition. No reusable component fork is introduced; the consumer supplies only product copy, destination, and disclosure state.

## Accessibility and responsive behavior

- The purchase control is a real link with a visible focus state and an explicit accessible label containing the product and price.
- External checkout opens in the same tab so browser history and assistive technology remain predictable.
- Disclosures remain readable without hover and stack beneath the actions on narrow screens.
- The existing four-image gallery remains lazy-loaded and does not block the purchase control.

## Security and privacy

- Only the public Payment Link URL appears in source.
- No Stripe secret or customer/payment identifier enters browser code.
- Terms and Privacy Policy remain mandatory inside Checkout.
- The site does not log payment form contents or claim successful payment locally.

## Risks / Trade-offs

- **Stripe availability controls checkout availability** → keep the launch-list fallback and verify the Payment Link during release checks.
- **A Payment Link can be disabled or replaced in Stripe** → add a deterministic external-link contract test and production smoke check.
- **No local order status page** → favor truthful Stripe confirmation over an unverifiable local page; add a signed webhook/order-status capability only when live API credentials and operational email infrastructure are approved.
- **Manufacturing timing is uncertain** → keep the non-refundable, 100-reservation, R&D, and no-fixed-date disclosure adjacent to the CTA and in Stripe.

## Migration and rollback

Update the homepage action and disclosure, run tests and visual checks, then deploy the exact tested commit through Wrangler. Rollback is `git revert <checkout-commit>` followed by the established deployment command; Stripe configuration remains independently reversible by deactivating the Payment Link.

## Verification

Run type checks, unit tests, blog build, performance budgets, focused Playwright coverage, production link availability, keyboard checks, mobile/desktop visual inspection, and a no-charge Stripe checkout smoke test. A real charge is explicitly excluded.

