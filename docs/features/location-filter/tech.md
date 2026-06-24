# Tech — Location Filter Feature

## Architecture Overview

Location data is stored in a `WhereFilter` MongoDB collection as a document containing an array of unique country strings. The `WhereTabs` async Server Component fetches this list and renders it inside the "Where" modal. Selection state will be managed in `NavbarContext`.

---

## File Map

```
src/
  app/
    api/
      navbar-filters/route.ts         → GET /api/navbar-filters (country list)
  components/
    header/navbar/
      tabs/
        WhereTabs.tsx                 → Async Server Component — fetches + renders country list
        whereTabs.scss
  models/
    auxNavbar/
      WhereFilter.ts                  → Mongoose schema: { uniqueValues: string[] }
  _lib/
    navbar/
      getCountry/
        getCountry.ts                 → fetch("/api/navbar-filters")
```

---

## Data Flow

```
WhereType.tsx (Client Component — inside Search)
  └── indexNavbarType === this.index → renders <WhereTabs /> (open modal)

WhereTabs.tsx (async Server Component)
  └── getCountries() → fetch("/api/navbar-filters")
        └── GET /api/navbar-filters → ConnectDB() → WhereFilter.find()
              └── returns [{ uniqueValues: string[] }]
  └── renders list of country options
```

---

## Mongoose Schema — WhereFilter

```ts
{
  _id:          ObjectId
  uniqueValues: String[]   // e.g. ["France", "Italy", "United States", ...]
}
```

The entire country list is stored as a single document's `uniqueValues` array (denormalized for simplicity).

---

## API Route

### `GET /api/navbar-filters`
- Connects to MongoDB
- Returns `WhereFilter.find()`
- Response: `[{ uniqueValues: string[] }]`

---

## Current Limitations

- `WhereTabs` renders the list but selecting a country does not yet update any state
- No type-ahead / filter-as-you-type (would require a Client Component wrapper)
- Country list is a full document scan — no search index needed at current scale

---

## Dependencies

- `mongoose` — WhereFilter model
- `NavbarContext` — will store selected destination once selection is wired up
