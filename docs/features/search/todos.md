# TODOs — Search Feature

## Status Legend
- `[ ]` — Not started
- `[~]` — In progress
- `[x]` — Done
- `[!]` — Blocked

---

## High Priority

| ID | Priority | Task |
|----|----------|------|
| S-T01 | High | Build `CheckInTabs.tsx` — calendar date picker UI for check-in |
| S-T02 | High | Build `CheckOutTabs.tsx` — calendar date picker UI for check-out |
| S-T03 | High | Build `WhoType` modal — adult/children/infant counters with +/- buttons |
| S-T04 | High | Wire search button: push `?country=&checkIn=&checkOut=&guests=` to URL (Next.js `useRouter`) |
| S-T05 | High | Home page (`page.tsx`) reads URL search params and passes to `getRooms(params)` |
| S-T06 | High | Handle country selection in `WhereTabs` — update `NavbarContext` with selected value, reflect in "Where" field label |

---

## Medium Priority

| ID | Priority | Task |
|----|----------|------|
| S-T07 | Medium | Persist search state in URL query params (shareable/bookmarkable search URLs) |
| S-T08 | Medium | Type-ahead in "Where" field — filter the country list as user types |
| S-T09 | Medium | Validate dates: check-out must be after check-in; show error if invalid |
| S-T10 | Medium | Mobile collapse: show a compact search pill on `< md`; expand to full on tap |
| S-T11 | Medium | Highlight active field with border + label visibility |

---

## Low Priority

| ID | Priority | Task |
|----|----------|------|
| S-T12 | Low | Add transition animation when opening/closing field modals (fade + slide) |
| S-T13 | Low | "Clear all" button inside open search to reset all fields |
| S-T14 | Low | Define "Experience" mode search flow: what it searches, API behavior |
| S-T15 | Low | Show a loading spinner in the search button while results are fetching |

---

## Done

| ID | Task |
|----|------|
| S-D01 | `SearchBy.tsx` — Stays / Experience mode toggle |
| S-D02 | `NavbarContext` — `isActive` and `indexNavbarType` state management |
| S-D03 | `Search.tsx` async Server Component — renders search fields bar |
| S-D04 | `SearchTypesList.tsx` — conditional Stays/Experience rendering |
| S-D05 | `WhereType.tsx` — click-outside handler, modal open/close |
| S-D06 | `WhereTabs.tsx` — fetches and displays country list |
| S-D07 | `GET /api/navbar-filters` endpoint |
| S-D08 | `GET /api/navbar/search-bar` endpoint |
| S-D09 | `Stays.tsx` and `Experience.tsx` layout components |
