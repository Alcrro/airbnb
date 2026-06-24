# Structure — Data Fetching (lib/)

## Purpose

Each feature owns its `lib/` folder for server-side fetch helpers. These async functions call internal API routes with explicit caching strategies, keeping data-fetching logic out of components.

---

## File Map (current — post-refactor)

```
src/
  features/
    listings/
      lib/
        getRooms.ts           → GET /api/rooms (ISR 24h) → Room[]
        getRoom.ts            → GET /api/room/:id (ISR 24h) → Room
    property-filter/
      lib/
        getPropertyType.ts    → GET /api/aux-bar → PropertyType[]
    location-filter/
      lib/
        getCountry.ts         → GET /api/navbar-filters → [{ uniqueValues: string[] }]
    search/
      lib/
        getSearch.ts          → GET /api/navbar/search-bar (force-cache) → SearchField[]
```

---

## Function Reference

### `getRooms()` — `features/listings/lib/getRooms.ts`
```ts
fetch(`${HOST_URI}/api/rooms`, { next: { revalidate: 86400 } })
// Returns: { rooms: Room[] }
// Used by: Rooms.tsx
```

### `getRoom(id)` — `features/listings/lib/getRoom.ts`
```ts
fetch(`${HOST_URI}/api/room/${id}`, { next: { revalidate: 86400 } })
// Returns: { room: Room }
// Used by: room/[id]/page.tsx
```

### `getPropertyType()` — `features/property-filter/lib/getPropertyType.ts`
```ts
fetch(`${HOST_URI}/api/aux-bar`, { next: { revalidate: 86400 } })
// Returns: { propertyType: PropertyType[] }
// Used by: AuxNavbar.tsx
```

### `getCountries()` — `features/location-filter/lib/getCountry.ts`
```ts
fetch(`${HOST_URI}/api/navbar-filters`)
// Returns: [{ uniqueValues: string[] }]
// Used by: WhereTabs.tsx
```

### `getSearchBar()` — `features/search/lib/getSearch.ts`
```ts
fetch(`${HOST_URI}/api/navbar/search-bar`, { cache: "force-cache" })
// Returns: SearchField[]
// Used by: Search.tsx
```

---

## Caching Strategy

| Function | Strategy | TTL | Reason |
|----------|----------|-----|--------|
| `getRooms` | ISR `revalidate: 86400` | 24h | Listings change infrequently |
| `getRoom` | ISR `revalidate: 86400` | 24h | Single room rarely changes |
| `getPropertyType` | ISR `revalidate: 86400` | 24h | Property types are stable |
| `getCountries` | ISR `revalidate: 86400` | 24h | Country list rarely changes |
| `getSearchBar` | `force-cache` | permanent | Static config — never changes |

---

## Search / Filter Pattern (planned)

When search or property-type filter is applied, the home page receives URL query params:

```
/?type=Apartment&country=Brazil&checkIn=2025-06-01&checkOut=2025-06-07&guests=2
```

`getRooms()` will accept an optional `params` argument and forward them to `GET /api/rooms`:

```ts
async function getRooms(params?: RoomSearchParams) {
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  return fetch(`${HOST_URI}/api/rooms?${qs}`, { cache: "no-store" });
  // no-store when filtering — results depend on user input, not cacheable
}
```

Handler (`getRoomsHandler.ts`) reads `searchParams` and builds a dynamic Mongoose query.

---

## Rules

- Every `fetch()` in `lib/` must have an explicit `cache` or `next.revalidate` option
- Use `HOST_URI` from `process.env` — never hardcode the base URL
- `cache: "no-store"` for any query that depends on user input (search, filter)
- Functions must be async and return typed results (no `any`)
- No side effects (logging, mutation) in lib functions

---

## Adding a New Lib Function

1. Create `src/features/<name>/lib/getFoo.ts`
2. Write a single `async function getFoo()` — one fetch, one return
3. Set explicit cache strategy
4. Add an entry to this doc
