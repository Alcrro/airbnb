# PRD — Search Feature

## Overview

The Search feature allows guests to find listings by destination, dates, and guest count. It operates in two modes: **Stays** and **Experiences**, each with a tailored set of search fields.

---

## Goals

- Enable guests to search for listings by location, check-in/check-out dates, and number of guests
- Support an "Experiences" mode for activity-based searches
- Provide a responsive search bar that adapts to desktop and mobile viewports
- Surface contextual dropdowns/modals for each search field

---

## User Stories

| ID | As a... | I want to... | So that... |
|----|---------|-------------|-----------|
| S-01 | Guest | Switch between "Stays" and "Experiences" search modes | I can search for the type of trip I want |
| S-02 | Guest | Type a destination in the "Where" field | I can filter listings by location |
| S-03 | Guest | Select check-in and check-out dates | I can find available listings for my trip |
| S-04 | Guest | Specify the number of guests | I can find listings that accommodate my group |
| S-05 | Guest | Click the search button | The app filters listings based on my criteria |
| S-06 | Guest | See a country suggestion dropdown when typing in "Where" | I can quickly select a destination |

---

## Acceptance Criteria

- [ ] Stays mode shows: Where → Check-in → Check-out → Who fields
- [ ] Experience mode shows: Where → Experience → Who fields
- [ ] Clicking a field opens its respective modal/dropdown
- [ ] Clicking outside an open modal closes it
- [ ] "Where" dropdown is populated from the `/api/navbar-filters` endpoint
- [ ] Search button triggers a filtered listing query
- [ ] Active field is visually highlighted
- [ ] Works on mobile (collapsed/responsive behavior)

---

## Out of Scope (v1)

- Date range picker UI (check-in/check-out fields are stubs)
- Guest counter with increment/decrement
- Actual filtering of the listings grid (search results page)
