# Tasks: Stripe entropy clock checkout

## 1. Purchase contract and homepage integration

- [x] 1.1 Add a failing checkout contract test covering the live Stripe destination, $378 price, primary/secondary action hierarchy, and proximate reservation disclosures; verify it fails before implementation.
- [x] 1.2 Replace the launch-list-only primary action with the live Stripe checkout while retaining an updates action; verify the focused contract test passes.
- [x] 1.3 Refine the existing product action and disclosure presentation for desktop, phone, keyboard, reduced-motion, and high-contrast behavior; verify focused Playwright and visual checks pass.

## 2. Stripe-owned completion and recovery

- [x] 2.1 Verify the live Payment Link renders the correct product, price, terms, address/phone collection, payment methods, R&D description, and branded appearance without submitting a charge.
- [x] 2.2 Verify Stripe customer successful-payment and refund emails, printable invoice PDF, confirmation copy, and provider-owned decline/error handling are enabled; record PASS/BLOCKED evidence without fabricating a payment.

## 3. Release verification

- [x] 3.1 Run `pnpm check`, `pnpm test:unit`, `pnpm build:blog`, `pnpm check:performance`, and focused/full E2E as applicable; classify every result distinctly.
- [x] 3.2 Inspect the final homepage clock listing at one desktop and one phone viewport and verify layout, focus, network, console, and checkout navigation evidence.
- [x] 3.3 Inspect the push-triggered workflows and deployment contract; deploy only the exact tested tree when current authority and credentials permit, then verify the real production route and Stripe handoff.

## Production evidence

- Source commit: `6abd78e6edfaec668643a63088facaebb8935805`
- Initial Cloudflare Worker version: `7fc0a9a4-e0fc-41ea-bacd-68bb9c7bc340`
- Production verification: `https://ghost.claims/`, terms, privacy, and the live Stripe Payment Link returned HTTP 200; a real browser reached the branded `$378.00` checkout and rendered the correct production-reservation description without submitting a charge.
- Receipt verification: Stripe customer successful-payment emails and printable invoice PDFs are enabled; an actual receipt was not generated because verification intentionally did not create a real `$378` charge.

## Workflow follow-up

- Archive the OpenSpec change only after production evidence is recorded and the deployed source revision is known.
