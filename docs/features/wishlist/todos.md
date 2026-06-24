# TODOs — Wishlist Feature

## Status Legend
- `[ ]` — Not started
- `[~]` — In progress
- `[x]` — Done
- `[!]` — Blocked

---

## High Priority

| ID | Priority | Blocked by | Task |
|----|----------|-----------|------|
| W-T01 | High | — | Create `WishlistList` Mongoose model in `features/wishlist/models/WishlistList.ts` — fields: userId, name, properties[] (ObjectId refs), createdAt |
| W-T02 | High | W-T01 | Create `POST /api/wishlist/lists` handler — create a new named collection for the current user |
| W-T03 | High | W-T01 | Create `GET /api/wishlist/lists` handler — return all collections for the current user (with count + cover image) |
| W-T04 | High | W-T01 | Create `POST /api/wishlist/lists/[id]/items` handler — add a roomId to a collection |
| W-T05 | High | W-T01 | Create `DELETE /api/wishlist/lists/[id]/items/[roomId]` handler — remove a room from a collection |
| W-T06 | High | W-T01 | Create `GET /api/wishlist/check?roomId=` handler — return which lists (if any) contain this room |
| W-T07 | High | — | Build `HeartButton.tsx` — Client Component, heart icon overlay on room cards, filled red when room is in any collection |
| W-T08 | High | W-T07, W-T03 | Build `WishlistModal.tsx` — shows existing collections + "New list" input; fires add/remove API calls |
| W-T09 | High | W-T07, W-T08 | Wire `HeartButton` click to open `WishlistModal` (authenticated) or show login prompt (unauthenticated) |
| W-T10 | High | W-T07 | Integrate `<HeartButton />` into `<RoomCard />` — pass `isSaved` prop from Server Component |
| W-T11 | High | W-T07 | Add `<HeartButton />` to the room detail page (`app/room/[id]/page.tsx`) |

---

## Medium Priority

| ID | Priority | Blocked by | Task |
|----|----------|-----------|------|
| W-T12 | Medium | W-T03 | Build `WishlistCollectionCard.tsx` — shows list name, property count, cover image |
| W-T13 | Medium | W-T12 | Build `WishlistsTab.tsx` (used in profile page) — grid of `<WishlistCollectionCard />` |
| W-T14 | Medium | W-T13 | Build `WishlistCollectionView.tsx` — full view of a single collection, shows property cards |
| W-T15 | Medium | W-T14 | Add remove button to each property card inside `WishlistCollectionView` |

---

## Low Priority

| ID | Priority | Task |
|----|----------|------|
| W-T16 | Low | Revert optimistic update + show error toast if API call fails |
| W-T17 | Low | "Log in to save" prompt when unauthenticated user clicks heart |

---

## Done

_(No tasks completed yet — feature not started)_
