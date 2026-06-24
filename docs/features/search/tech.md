# Tech — Search Feature

## Architecture Overview

The search bar is a hybrid of Server and Client Components. The outer shell (`Search.tsx`) is an async Server Component that fetches static search configuration. Inner field components are Client Components that read from `NavbarContext` to manage open/close state.

---

## File Map

```
src/
  app/
    api/
      navbar/search-bar/route.ts      → GET /api/navbar/search-bar (static search fields config)
      navbar-filters/route.ts         → GET /api/navbar-filters (country list for Where dropdown)
  components/
    header/navbar/
      search/
        Search.tsx                    → Async Server Component — fetches searchData, renders SearchList
        search.scss
        searchButton/
          SearchButton.tsx            → Magnifying glass submit button
          searchButton.scss
        searchTypesList/
          SearchList.tsx              → Maps searchData[] → <SearchTypesList />
          SearchTypesList.tsx         → Renders Stays or Experience view based on mode
          types/
            ModelWhereType.tsx        → "Where" field wrapper (renders WhereType + WhereTabs modal)
            WhereType.tsx             → Click-outside handler, context-aware active state
            CheckInType.tsx           → "Check-in" field (stub)
            CheckOnType.tsx           → "Check-out" field (stub)
            WhoType.tsx               → "Add guests" field (stub)
            ExperienceType.tsx        → "Experience" field (Experience mode only)
        stays/
          Stays.tsx                   → Renders Where + CheckIn + CheckOut + Who
        experience/
          Experience.tsx              → Renders Where + Experience + Who
      tabs/
        ModalType.tsx                 → Generic modal container (wraps tab content)
        WhereTabs.tsx                 → Async — fetches countries, renders destination list
        CheckInTabs.tsx               → Date picker stub
        CheckOutTabs.tsx              → Date picker stub
        whereTabs.scss
        modalType.scss
      searchBy/
        SearchBy.tsx                  → Tabs: "Stays" / "Experiences" toggle
        searchBy.scss
  context/
    navbarContext/
      NavbarContext.tsx               → isActive (mode), indexNavbarType (open field index)
  _lib/
    navbar/
      search/
        getSearch.ts                  → fetch("/api/navbar/search-bar", force-cache)
        searchData.ts                 → Static array: [where, check-in, check-out, who, experience]
      getCountry/
        getCountry.ts                 → fetch("/api/navbar-filters")
```

---

## Data Flow

```
Search.tsx (async Server Component)
  └── getSearchBar() → fetch("/api/navbar/search-bar", force-cache)
        └── returns searchData[]
  └── <SearchList searchData={...} />
        └── maps each item → <SearchTypesList index={i} type={item.type} />
              └── reads NavbarContext.isActive (stays | experience)
                    └── isActive="stays"     → <Stays />     → WhereType, CheckInType, CheckOnType, WhoType
                    └── isActive="experience" → <Experience /> → WhereType, ExperienceType, WhoType

WhereType.tsx (Client Component)
  └── reads indexNavbarType from NavbarContext
  └── click handler → setIndexNavbarType(index)
  └── click-outside listener → setIndexNavbarType(null)
  └── indexNavbarType === index → renders <WhereTabs /> (open modal)

WhereTabs.tsx (async Server Component)
  └── getCountries() → fetch("/api/navbar-filters")
        └── GET /api/navbar-filters → ConnectDB() → WhereFilter.find()
              └── returns { uniqueValues: string[] }
  └── renders country list
```

---

## Context — NavbarContext

```ts
interface NavbarContextType {
  isActive: "stays" | "experience"    // current search mode
  setIsActive: (mode) => void
  indexNavbarType: number | null      // index of currently open field modal
  setIndexNavbarType: (i) => void
}
```

---

## Static Search Configuration (searchData.ts)

```ts
[
  { type: "where",      label: "Where",      placeholder: "Search destinations" },
  { type: "check-in",   label: "Check in",   placeholder: "Add dates" },
  { type: "check-out",  label: "Check out",  placeholder: "Add dates" },
  { type: "who",        label: "Who",        placeholder: "Add guests" },
  { type: "experience", label: "Experience", placeholder: "Search experiences" },
]
```

---

## API Routes

### `GET /api/navbar/search-bar`
- Returns `searchData` static array
- Cached permanently (`force-cache`)

### `GET /api/navbar-filters`
- Connects to MongoDB
- Returns `WhereFilter.find()` — array of `{ uniqueValues: string[] }`
- Used by `WhereTabs` to populate country suggestions

---

## Dependencies

- `NavbarContext` — manages which field is open and which mode is active
- `next-themes` — not directly used here, but coexists in layout
- Bootstrap Icons — search icon on `SearchButton`
