# TODOs — Reviews Feature

## Status Legend
- `[ ]` — Not started
- `[~]` — In progress
- `[x]` — Done
- `[!]` — Blocked

---

## High Priority (unblocked once L-T01 is done)

| ID | Priority | Blocked by | Task |
|----|----------|-----------|------|
| R-T01 | High | — | Create `GET /api/reviews?roomId=xxx` route (thin + handler) |
| R-T02 | High | — | Create `getReviews(roomId)` lib function in `features/reviews/lib/getReviews.ts` |
| R-T03 | High | L-T01 | Build `ReviewsList.tsx` — async Server Component, fetches reviews for the given roomId |
| R-T04 | High | L-T01 | Build `ReviewCard.tsx` — reviewer name, date, star rating (1–5), comment text |
| R-T05 | High | L-T01 | Integrate `<ReviewsList roomId={id} />` into `room/[id]/page.tsx` |
| R-T06 | High | L-T01 | Display average rating + review count in the room detail header |

---

## Medium Priority

| ID | Priority | Blocked by | Task |
|----|----------|-----------|------|
| R-T07 | Medium | A-T03 | Build `ReviewForm.tsx` — authenticated form: star picker (1–5), text area, submit |
| R-T08 | Medium | A-T03 | Create `POST /api/reviews/submit` route — session-gated, saves review to MongoDB |
| R-T09 | Medium | R-T03 | Empty state: "No reviews yet" message with icon |
| R-T10 | Medium | R-T03 | Show review count breakdown by star (like Airbnb's bar chart) |

---

## Low Priority

| ID | Priority | Blocked by | Task |
|----|----------|-----------|------|
| R-T11 | Low | — | Seed sample review data in MongoDB (for development) |
| R-T12 | Low | R-T03 | Sort reviews by date (newest first) |
| R-T13 | Low | R-T03 | Paginate reviews: show 6 per page with "Show more reviews" button |

---

## Done

| ID | Task |
|----|------|
| R-D01 | `Reviews` Mongoose schema + model defined |
