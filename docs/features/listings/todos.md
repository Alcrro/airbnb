# TODOs — Listings Feature

## Status Legend
- `[ ]` — Not started
- `[~]` — In progress
- `[x]` — Done
- `[!]` — Blocked

---

## Critical (room detail page is completely empty)

| ID | Priority | Task |
|----|----------|------|
| L-T01 | Critical | ✅ Build `room/[id]/page.tsx` — fetch room, compose detail layout, handle 404 |
| L-T02 | Critical | ✅ Build image gallery section — full-width hero image with fallback |
| L-T03 | Critical | ✅ Display room title, country, rating on detail page |
| L-T04 | Critical | ✅ Display host section: name, avatar placeholder |
| L-T05 | Critical | ✅ Display amenities grid (icons + label) — renders when data exists |

---

## High Priority

| ID | Priority | Task |
|----|----------|------|
| L-T06 | High | Define `Room` TypeScript interface in `features/listings/types/room.ts` — replace `any` in `Rooms.tsx` |
| L-T07 | High | Extract `<RoomCard />` component from `Rooms.tsx` — card gets its own component + SCSS file |
| L-T08 | High | Add star rating display to card: compute from `review_scores_rating` (0–100 → 0–5) |
| L-T09 | High | Fix price display: `$135 / night` format (not `135.00 $` raw decimal) |
| L-T10 | High | Add `<RoomCardSkeleton />` loading state — show 8 skeleton cards while `getRooms()` resolves |
| L-T11 | High | Add 404 / not-found handling in `room/[id]/page.tsx` using `notFound()` |

---

## Medium Priority

| ID | Priority | Task |
|----|----------|------|
| L-T12 | Medium | Add card hover animation: `translateY(-2px)` + shadow increase (200ms ease) |
| L-T13 | Medium | Image carousel on card: cycle through `item.images[]` on hover/swipe |
| L-T14 | Medium | Responsive grid: 1 col → 2 → 3 → 4 → 5 (Tailwind `grid-cols-*`) |
| L-T15 | Medium | Update `getRoomsHandler.ts` to accept `?type=`, `?country=`, `?guests=` query params |
| L-T16 | Medium | Update `getRooms(params?)` lib function to forward search params (with `cache: "no-store"`) |
| L-T17 | Medium | Display average rating + review count on detail page header ("4.87 · 128 reviews") |

---

## Low Priority

| ID | Priority | Task |
|----|----------|------|
| L-T18 | Low | Add "Load more" / pagination to home grid |
| L-T19 | Low | Add share button on detail page |
| L-T20 | Low | Breadcrumb navigation on detail page (`Home > Brazil > Room name`) |

---

## Done

| ID | Task |
|----|------|
| L-D01 | `GET /api/rooms` endpoint returning up to 20 rooms |
| L-D02 | `GET /api/room/[_id]` endpoint (fixed: returns room[0] not array, 404 on missing) |
| L-D03 | `Rooms.tsx` async Server Component with ISR |
| L-D04 | `ImagesRoom.tsx` with `FallbackImage` error handling |
| L-D05 | Rooms Mongoose schema + model |
| L-D06 | `getRooms()` and `getRoom()` lib functions |
| L-D07 | `Room` TypeScript interface in `features/listings/types/room.ts` |
| L-D08 | `RoomDetail.tsx` + `roomDetail.scss` — full detail page with host, booking widget, amenities, gallery |
| L-D09 | `generateMetadata` in `room/[id]/page.tsx` — dynamic page title |
| L-D10 | `tailwind.config.ts` content paths updated to match feature-sliced structure |
