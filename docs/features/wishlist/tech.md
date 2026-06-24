# Tech — Wishlist Feature

## Architecture Overview

The heart button is a Client Component (needs click handler, optimistic state). It sits inside the room card which is a Server Component. Wishlists are organised as named collections — one `WishlistList` document per collection, with an array of room ObjectId references embedded directly.

---

## File Map (planned)

```
src/
  app/
    api/
      wishlist/
        lists/
          route.ts                          → GET + POST /api/wishlist/lists (thin)
          [id]/
            items/
              route.ts                      → POST /api/wishlist/lists/[id]/items (thin)
              [roomId]/
                route.ts                    → DELETE /api/wishlist/lists/[id]/items/[roomId] (thin)
        check/
          route.ts                          → GET /api/wishlist/check?roomId= (thin)

  features/
    wishlist/
      components/
        HeartButton.tsx                     → Client Component — heart icon, opens WishlistModal
        heartButton.scss                    → Icon overlay styles
        WishlistModal.tsx                   → Client Component — collection picker + new list input
        wishlistModal.scss
        WishlistCollectionCard.tsx          → Collection card: name, count, cover image
        WishlistsTab.tsx                    → Grid of WishlistCollectionCard (used on profile page)
        WishlistCollectionView.tsx          → Full view of one collection's saved property cards
      lib/
        getWishlistLists.ts                 → Fetch user's collections (server-side)
        checkWishlistStatus.ts              → Fetch which lists contain a given roomId
      models/
        WishlistList.ts                     → Mongoose WishlistList schema
      api/
        getListsHandler.ts                  → GET — return user's collections with count + cover image
        createListHandler.ts                → POST — create a new named collection
        addItemHandler.ts                   → POST — add roomId to a collection
        removeItemHandler.ts                → DELETE — remove roomId from a collection
        checkWishlistHandler.ts             → GET — return list IDs that contain a given roomId
      types/
        wishlist.ts                         → WishlistList + WishlistCollectionCard TypeScript interfaces
```

---

## Mongoose Schema — WishlistList

```ts
{
  _id:        ObjectId
  userId:     String        // NextAuth session user id
  name:       String        // required — user-defined collection name
  properties: [ObjectId]    // ref: Room — ordered array
  createdAt:  Date          // auto
}
```

---

## API Routes

### `GET /api/wishlist/lists`
- Requires session
- Returns all collections for the current user
- Each item includes: `_id`, `name`, property count, cover image URL (first property's image)

### `POST /api/wishlist/lists`
- Body: `{ name: string }`
- Requires session
- Creates a new empty collection, returns it

### `POST /api/wishlist/lists/[id]/items`
- Body: `{ roomId: string }`
- Requires session
- Pushes roomId into `properties[]` if not already present (idempotent)

### `DELETE /api/wishlist/lists/[id]/items/[roomId]`
- Requires session
- Pulls roomId from `properties[]`

### `GET /api/wishlist/check?roomId=`
- Requires session
- Returns `{ listIds: string[] }` — IDs of collections that contain this room
- Used to initialise heart button state on Server Component render

---

## Optimistic UI

`HeartButton` receives `isSaved: boolean` (true if room is in any collection) as a prop from the Server Component.  
On click: immediately toggle the heart fill, open `WishlistModal`.  
On API error: revert heart state and show an error toast.

---

## WishlistModal Flow

1. Fetch `GET /api/wishlist/lists` to populate the list
2. User selects a collection → `POST /api/wishlist/lists/[id]/items` → close modal
3. User selects **"+ New list"** → show name input → on confirm: `POST /api/wishlist/lists` then `POST .../items` → close modal
4. If room already in a collection → show filled heart; selecting that collection removes the room (`DELETE`)
