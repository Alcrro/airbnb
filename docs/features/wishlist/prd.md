# PRD — Wishlist Feature

## Overview

The Wishlist feature lets authenticated guests save listings they like into named collections. Clicking the heart icon on any room card or the room detail page opens a modal to pick which collection to save to (or create a new one). All collections are accessible from the user's profile page.

---

## Goals

- Allow authenticated guests to save listings into named wishlist collections
- Let users create and manage multiple named collections
- Show saved listings organised by collection on the profile page
- Prompt unauthenticated users to log in when they attempt to save

---

## User Stories

| ID | As a... | I want to... | So that... |
|----|---------|-------------|-----------|
| W-01 | Guest | See a heart icon on every room card and on the room detail page | I know I can save listings |
| W-02 | Authenticated user | Click the heart to open a "Save to wishlist" modal | I can choose which collection to add the listing to |
| W-03 | Authenticated user | Create a new named collection from the modal | I can organise my saved listings (e.g. "Beach houses") |
| W-04 | Authenticated user | Select an existing collection in the modal to save a listing | The listing is added to that collection |
| W-05 | Authenticated user | Click the heart on an already-saved listing | A modal lets me remove it from its collection |
| W-06 | Authenticated user | See all my collections on my profile page | I can browse them at a glance |
| W-07 | Authenticated user | Open a collection on my profile page | I can see all saved listings inside it |
| W-08 | Guest (not logged in) | Click the heart | A "Log in to save" prompt appears |

---

## Heart Button Behaviour

1. User clicks heart on a room card or room detail page
2. **If not authenticated** → show "Log in to save" tooltip/modal
3. **If authenticated** → open `WishlistModal`:
   - Shows existing collections (name + cover image + count)
   - Shows **"+ New list"** option at the top
   - Selecting an existing collection saves the room there and closes the modal
   - Selecting **"+ New list"** shows an inline input to name the list, then saves

---

## Profile Page — Wishlists Tab

- Grid of collection cards: name, property count, cover image (first property in list)
- Clicking a collection opens a full view of its saved property cards
- Empty state when the user has no collections

---

## Acceptance Criteria

- [ ] Heart icon overlaid on top-right of every room card image
- [ ] Heart icon also visible on the room detail page
- [ ] Clicking heart when unauthenticated shows a "Log in to save" prompt
- [ ] Clicking heart when authenticated opens `WishlistModal`
- [ ] Modal lists the user's existing collections + "New list" option
- [ ] "New list" creates a named collection and saves the room in one step
- [ ] Selecting an existing collection saves the room immediately (optimistic UI)
- [ ] Heart fills red when the room is in at least one collection; empty when not saved anywhere
- [ ] Profile page Wishlists tab shows all user collections as cards
- [ ] Clicking a collection on profile shows its saved property cards
- [ ] Removing a listing from a collection is possible from within the collection view

---

## Out of Scope (v1)

- Sharing wishlists with other users
- Wishlist notifications (price drops, etc.)
- Reordering items within a collection
- Deleting a collection
