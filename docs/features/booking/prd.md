# PRD — Booking Feature

## Overview

The Booking feature allows authenticated guests to reserve a listing for specific dates. It provides a sticky booking widget on the room detail page that calculates the total price, validates availability, and submits a reservation.

---

## Goals

- Allow authenticated guests to select dates and guest count, then reserve a listing
- Display a clear price breakdown (nightly rate × nights + cleaning fee + service fee)
- Prevent double-bookings by checking availability before confirming
- Show guests their upcoming reservations on their profile page

---

## User Stories

| ID | As a... | I want to... | So that... |
|----|---------|-------------|-----------|
| B-01 | Guest | See a booking widget on the room detail page | I can select my dates and initiate a reservation |
| B-02 | Guest | See the total price breakdown before reserving | I'm not surprised by the final cost |
| B-03 | Guest | Click "Reserve" to confirm my booking | The listing is secured for my dates |
| B-04 | Guest | See a confirmation screen after booking | I know the reservation was successful |
| B-05 | Authenticated user | See my upcoming reservations on my profile | I can manage my bookings |
| B-06 | Guest | See unavailable dates greyed out on the calendar | I know when the listing is already booked |

---

## Acceptance Criteria

- [ ] Booking widget visible on room detail page (sticky sidebar on desktop, bottom bar on mobile)
- [ ] Date picker shows check-in / check-out with unavailable dates blocked
- [ ] Guest counter (adults, children) with min/max enforced
- [ ] Price breakdown: `$X × N nights`, cleaning fee, service fee, total
- [ ] "Reserve" button disabled if user is not logged in (shows "Log in to reserve")
- [ ] On submit: POST to `/api/bookings` → saves Booking to DB → redirect to confirmation page
- [ ] Confirmation page shows: listing name, dates, total price, booking reference ID
- [ ] Profile page shows a list of the user's bookings

---

## Out of Scope (v1)

- Payment processing (Stripe, etc.)
- Host approval flow (instant booking only)
- Booking cancellation
- Host calendar management
