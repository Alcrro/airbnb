# Tech — Property Type Filter Feature

## Architecture Overview

The AuxNavbar is a fully server-rendered async component. It fetches property types from MongoDB and renders a horizontal list of links. No client state is required for display; filtering logic will be added via URL query params.

---

## File Map

```
src/
  app/
    api/
      aux-bar/route.ts                → GET /api/aux-bar (property type list)
  components/
    header/
      auxNavbar/
        AuxNavbar.tsx                 → Async Server Component — fetches types, renders list
        auxNavbar.scss                → Horizontal bar styles
        PropertiesTypeList/
          PropertiesTypeList.tsx      → Maps PropertyType[] → <LiTypes />
          ModalPropTypeList.tsx       → <ul> wrapper for the list
          LiTypes.tsx                 → Individual <li> with Next.js Link to "/"
  models/
    auxNavbar/
      PropertyType.ts                 → Mongoose schema: { property_type: String }
      WhereFilter.ts                  → (also lives here — used by location filter feature)
  _lib/
    navbar/
      auxNavbar/
        getPropeprtyType.ts           → fetch("/api/aux-bar")
```

---

## Data Flow

```
AuxNavbar.tsx (async Server Component)
  └── getPropertyType() → fetch("/api/aux-bar")
        └── GET /api/aux-bar → ConnectDB() → PropertyType.find()
              └── returns PropertyType[]
  └── <ModalPropTypeList>
        └── <PropertiesTypeList types={...} />
              └── types.map(t => <LiTypes key={t._id} type={t.property_type} />)
                    └── <Link href="/">{ type }</Link>
```

---

## Mongoose Schema — PropertyType

```ts
{
  _id:           ObjectId
  property_type: String    // e.g. "Apartment", "Studio", "Villa", "Cabin"
}
```

---

## API Route

### `GET /api/aux-bar`
- Connects to MongoDB
- Returns `PropertyType.find()`
- Response: `PropertyType[]`

---

## Current Limitations

- `LiTypes` links to `"/"` — filtering is not yet implemented
- No active state — selected type is not highlighted
- No icons per property type

---

## Dependencies

- `mongoose` — PropertyType model
- `next/link` — navigation link per type
