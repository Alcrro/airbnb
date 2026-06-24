# TODOs — Booking Feature

## Status Legend
- `[ ]` — Not started
- `[~]` — In progress
- `[x]` — Done
- `[!]` — Blocked

---

## High Priority (blocked by: room detail page L-T01, auth A-T03)

| ID | Priority | Blocked by | Task |
|----|----------|-----------|------|
| B-T01 | High | L-T01 | Build `BookingWidget.tsx` — Client Component with date range, guest counter, price summary, Reserve button |
| B-T02 | High | L-T01 | Build `PriceSummary.tsx` — nightly rate × nights, cleaning fee, service fee, total |
| B-T03 | High | L-T01 | Integrate `<BookingWidget room={room} />` into `room/[id]/page.tsx` (sticky sidebar) |
| B-T04 | High | A-T03 | Create `Booking` Mongoose model in `features/booking/models/Booking.ts` |
| B-T05 | High | A-T03 | Create `POST /api/bookings` route + handler — validate session, check availability, save booking |
| B-T06 | High | B-T05 | Build confirmation page at `app/booking/confirmation/page.tsx` |

---

## Medium Priority

| ID | Priority | Blocked by | Task |
|----|----------|-----------|------|
| B-T07 | Medium | B-T01 | `DateRangePicker.tsx` — calendar with unavailable dates blocked (fetch from `/api/bookings?roomId=`) |
| B-T08 | Medium | B-T01 | `GuestCounter.tsx` — +/- buttons for adults, children, infants; enforce `room.accommodates` max |
| B-T09 | Medium | A-T03 | Disable Reserve button + show "Log in to reserve" for unauthenticated users |
| B-T10 | Medium | B-T05 | Create `GET /api/bookings?userId=` route — fetch user's reservation list |
| B-T11 | Medium | B-T10 | Show user's bookings on `profile/page.tsx` |

---

## Low Priority

| ID | Priority | Task |
|----|----------|------|
| B-T12 | Low | Mobile: show booking widget as a bottom action bar (sticky footer) |
| B-T13 | Low | Add loading state on Reserve button during submission |
| B-T14 | Low | Booking cancellation: PATCH `/api/bookings/:id` to set `status: "cancelled"` |

---

## Done

_(No tasks completed yet — feature not started)_
