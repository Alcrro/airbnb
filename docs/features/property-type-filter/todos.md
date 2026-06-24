# TODOs — Property Type Filter Feature

## Status Legend
- `[ ]` — Not started
- `[~]` — In progress
- `[x]` — Done
- `[!]` — Blocked

---

## High Priority

| ID | Priority | Task |
|----|----------|------|
| PT-T01 | High | `LiTypes.tsx`: push `?type=<value>` to URL on click (replace `href="/"` with `useRouter().push`) — requires converting to Client Component |
| PT-T02 | High | Home page `page.tsx`: read `?type` from `searchParams` prop and pass to `getRooms({ type })` |
| PT-T03 | High | Highlight active property type — read `?type` URL param and apply `.active` class to the matching item |

---

## Medium Priority

| ID | Priority | Task |
|----|----------|------|
| PT-T04 | Medium | Add left/right scroll arrow buttons to `AuxNavbar` (visible when list overflows) |
| PT-T05 | Medium | Hide scrollbar visually on the filter row while keeping scroll functionality |
| PT-T06 | Medium | Add a "All" / clear button as the first item to reset the type filter |

---

## Low Priority

| ID | Priority | Task |
|----|----------|------|
| PT-T07 | Low | Map property types to Bootstrap Icons — display icon above label per type |
| PT-T08 | Low | Smooth scroll animation when clicking left/right arrows |

---

## Done

| ID | Task |
|----|------|
| PT-D01 | `GET /api/aux-bar` endpoint returning property types from MongoDB |
| PT-D02 | `AuxNavbar.tsx` async Server Component |
| PT-D03 | `PropertiesTypeList.tsx` + `LiTypes.tsx` list rendering |
| PT-D04 | `PropertyType` Mongoose schema + model |
| PT-D05 | `getPropertyType()` lib function |
