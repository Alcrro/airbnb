# TODOs — Location Filter Feature

## Status Legend
- `[ ]` — Not started
- `[~]` — In progress
- `[x]` — Done
- `[!]` — Blocked

---

## High Priority

| ID | Priority | Task |
|----|----------|------|
| LF-T01 | High | Handle country selection in `WhereTabs` — store selected country in `NavbarContext` |
| LF-T02 | High | Reflect selected country in the "Where" field label (`WhereType.tsx`) |
| LF-T03 | High | Pass selected country to `SearchButton` so it's included in the URL query params on search submit |

---

## Medium Priority

| ID | Priority | Task |
|----|----------|------|
| LF-T04 | Medium | Type-ahead filtering — convert `WhereTabs` list to a Client Component with a text input state; filter `countries[]` in real time |
| LF-T05 | Medium | Seed `WhereFilter` collection in MongoDB with realistic, diverse country data |

---

## Low Priority

| ID | Priority | Task |
|----|----------|------|
| LF-T06 | Low | Add a flag emoji or country icon next to each country name in the dropdown |
| LF-T07 | Low | Add a "Flexible" option at the top of the list (searches all countries) |

---

## Done

| ID | Task |
|----|------|
| LF-D01 | `GET /api/navbar-filters` endpoint |
| LF-D02 | `WhereFilter` Mongoose schema + model |
| LF-D03 | `getCountries()` lib function |
| LF-D04 | `WhereTabs.tsx` async Server Component — fetches and renders country list |
