# Capability Delta: entropy clock checkout

## ADDED Requirements

### Requirement: the homepage offers a truthful live purchase action

The entropy-clock listing SHALL present the active $378 Stripe-hosted checkout as its primary action and SHALL keep a distinct no-payment updates action.

#### Scenario: a buyer starts checkout

- **GIVEN** the buyer is viewing the homepage alarm-clock listing
- **WHEN** they activate the primary purchase control
- **THEN** the browser navigates to the live Ghost Signal Stripe checkout for exactly one $378 entropy-clock production reservation.

### Requirement: reservation terms are disclosed before payment

The listing SHALL state that the purchase is a non-refundable R&D production reservation, manufacturing requires at least 100 paid reservations, fulfillment timing depends on reaching that threshold, and customer updates will be delivered by email.

#### Scenario: a buyer reviews the offer without opening checkout

- **WHEN** the listing is rendered at desktop or phone width
- **THEN** the price, former price, reservation status, threshold, fulfillment uncertainty, and receipt availability are visible without hover or interaction.

### Requirement: Stripe remains the payment-status authority

Ghost Signal SHALL keep card entry, payment authentication, decline recovery, successful-payment confirmation, tax calculation, and receipt/invoice delivery on Stripe-hosted surfaces.

#### Scenario: payment fails or requires recovery

- **WHEN** Stripe rejects, declines, or requires additional authentication for a payment
- **THEN** Stripe Checkout displays the actionable error or recovery state without Ghost Signal recording or displaying card data.

#### Scenario: payment succeeds

- **WHEN** Stripe confirms a successful payment
- **THEN** the buyer sees the branded R&D confirmation, receives a Stripe receipt email, and can retain or print the generated invoice PDF.

### Requirement: the purchase journey remains accessible and responsive

The purchase and updates actions SHALL remain keyboard operable, visibly focused, correctly labeled, and viewport-safe across phone and desktop layouts.

#### Scenario: keyboard purchase at phone width

- **GIVEN** a 390-pixel-wide viewport
- **WHEN** a keyboard user reaches the alarm-clock actions
- **THEN** both actions are visible, ordered primary then secondary, have at least 44-pixel targets, and expose unambiguous accessible names.

