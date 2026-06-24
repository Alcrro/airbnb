# Tech — Listings Feature

## Architecture Overview

Listings use Next.js 14 App Router with async Server Components and ISR. The room detail page is a key page that composes multiple feature components (Reviews, Booking widget).

---

## File Map (current + planned)

```
src/
  app/
    page.tsx                            → Home page (renders <Rooms />)
    room/
      [id]/
        page.tsx                        → Room detail page (currently empty — L-T01)
  features/
    listings/
      components/
        Rooms.tsx                       → ✅ Async Server Component — fetches + renders grid
        rooms.scss                      → Grid layout styles
        RoomCard.tsx                    → 🔲 Extracted card component (image, title, price, rating, heart)
        roomCard.scss                   → 🔲 Card styles
        RoomCardSkeleton.tsx            → 🔲 Loading skeleton for a single card
        RoomDetail.tsx                  → 🔲 Room detail layout (Server Component)
        roomDetail.scss                 → 🔲 Detail page styles
        ImageGallery.tsx                → 🔲 Detail page image gallery (1 large + 2×2 grid)
        imageGallery.scss               → 🔲
        AmenitiesList.tsx               → 🔲 Amenities grid component
        imagesRoom/
          ImagesRoom.tsx                → ✅ next/image with error handling
          FallbackImage.tsx             → ✅ Fallback when image errors
          imagesRoom.scss               → ✅
      lib/
        getRooms.ts                     → ✅ Fetch all rooms (ISR 24h)
        getRoom.ts                      → ✅ Fetch single room by ID (ISR 24h)
      models/
        Rooms.ts                        → ✅ Mongoose schema: Room
      api/
        getRoomsHandler.ts              → ✅ GET /api/rooms handler
        getRoomHandler.ts               → ✅ GET /api/room/:id handler
      types/
        room.ts                         → 🔲 TypeScript Room interface
  app/
    api/
      rooms/route.ts                    → ✅ Thin: export const GET = getRoomsHandler
      room/[_id]/route.ts               → ✅ Thin: export const GET = getRoomHandler
```

> ✅ = exists | 🔲 = planned

---

## Data Flow

```
Home Page (page.tsx)
  └── <Rooms /> (async Server Component)
        └── getRooms(params?) → fetch("/api/rooms?...") { revalidate: 86400 }
              └── GET /api/rooms → ConnectDB() → Room.aggregate([...]).limit(20)
        └── renders grid of <RoomCard /> items
              └── <ImagesRoom /> — next/image (errors → <FallbackImage />)
              └── heart icon — wishlist toggle (client island)

Room Detail (room/[id]/page.tsx)
  └── getRoom(id) → fetch("/api/room/:id") { revalidate: 86400 }
        └── GET /api/room/[_id] → ConnectDB() → Room.findById(_id)
  └── <ImageGallery images={room.images} />
  └── <AmenitiesList amenities={room.amenities} />
  └── <ReviewsList productId={id} />        ← from features/reviews
  └── <BookingWidget room={room} />          ← from features/booking
```

---

## Mongoose Schema — Room

```ts
{
  _id:          ObjectId
  name:         String     // listing title
  price:        Decimal128 // price per night (USD)
  images:       String[]   // array of image URLs
  host_name:    String     // host display name
  country:      String     // listing country
  property_type:String     // e.g. "Apartment", "Villa"
  bedrooms:     Number
  bathrooms:    Number
  accommodates: Number     // max guests
  amenities:    String[]   // e.g. ["Wifi", "Kitchen", "Pool"]
  summary:      String     // listing description
  review_scores_rating: Number // 0–100
  number_of_reviews:    Number
}
```

---

## API Routes

### `GET /api/rooms`
- Accepts optional query params: `type`, `country`, `guests`
- Returns: `{ success, message, rooms: Room[] }`

### `GET /api/room/[_id]`
- Returns: `{ success, message, room: Room }`
- Returns 404 response if not found

---

## Caching Strategy

| Layer | Strategy | TTL |
|-------|----------|-----|
| `getRooms()` — no params | ISR `revalidate: 86400` | 24h |
| `getRooms()` — with filter params | `cache: "no-store"` | none |
| `getRoom()` | ISR `revalidate: 86400` | 24h |
