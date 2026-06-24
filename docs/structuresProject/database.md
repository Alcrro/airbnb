# Structure — Database

## Purpose

Shared MongoDB connection and Mongoose models. Each feature owns its models inside `features/<name>/models/`. The `ConnectDB` singleton lives in `shared/db/`.

---

## File Map (current)

```
src/
  shared/
    db/
      ConnectDB.ts                      → Establishes and caches the MongoDB connection
  features/
    listings/
      models/
        Rooms.ts                        → Room / listing schema
    reviews/
      models/
        Reviews.ts                      → Reviews schema
    property-filter/
      models/
        PropertyType.ts                 → Property type filter schema
    location-filter/
      models/
        WhereFilter.ts                  → Country/location filter schema
```

**Planned models** (not yet created):
```
  features/
    auth/
      models/
        User.ts                         → User account schema (auth feature)
    booking/
      models/
        Booking.ts                      → Booking / reservation schema
    wishlist/
      models/
        Wishlist.ts                     → Saved listings schema
```

---

## Connection — ConnectDB.ts

```ts
import mongoose from "mongoose"

export async function ConnectDB() {
  await mongoose.connect(process.env.MONGO_URI!)
}
```

- Called at the start of every API route handler — before any Mongoose query
- Mongoose caches the connection after the first call — safe to call on every request
- Requires `MONGO_URI` in `.env.local`

```
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>
```

---

## Models Reference

### Rooms — `features/listings/models/Rooms.ts`

| Field | Type | Notes |
|-------|------|-------|
| `_id` | ObjectId | Auto-generated |
| `name` | String | Listing title |
| `price` | Decimal128 | Per-night USD price |
| `images` | String[] | Image URLs |
| `host_name` | String | Host display name |
| `country` | String | Listing country |
| `property_type` | String | e.g., "Apartment" |
| `bedrooms` | Number | — |
| `bathrooms` | Number | — |
| `accommodates` | Number | Max guests |
| `amenities` | String[] | e.g., ["Wifi", "Kitchen"] |
| `summary` | String | Description |
| `review_scores_rating` | Number | 0–100 |
| `number_of_reviews` | Number | — |

---

### Reviews — `features/reviews/models/Reviews.ts`

| Field | Type | Notes |
|-------|------|-------|
| `productId` | String | Room `_id` reference |
| `reviews` | Object[] | Array of review objects |
| `reviews[].name` | String | Reviewer name |
| `reviews[].rating` | Number | 1–5 |
| `reviews[].comment` | String | Review text |
| `reviews[].date` | Date | Submission date |

---

### PropertyType — `features/property-filter/models/PropertyType.ts`

| Field | Type | Notes |
|-------|------|-------|
| `property_type` | String | e.g., "Apartment", "Villa" |

---

### WhereFilter — `features/location-filter/models/WhereFilter.ts`

| Field | Type | Notes |
|-------|------|-------|
| `uniqueValues` | String[] | Available destination countries |

---

## Rules

- Models are only imported in handler files inside `features/<name>/api/` — never in components
- Always use the re-registration guard:
  ```ts
  const Model = mongoose.models.ModelName || mongoose.model("ModelName", schema)
  export default Model
  ```
- Import `ConnectDB` from `@/shared/db/ConnectDB` — never from a relative path

---

## Adding a New Model

1. Create `src/features/<name>/models/<ModelName>.ts`
2. Define schema + apply re-registration guard
3. Import only in the feature's `api/` handlers
4. Add schema docs to this file
