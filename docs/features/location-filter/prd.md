# PRD — Location Filter Feature

## Overview

The Location Filter populates the "Where" search field with country suggestions. It connects the search bar to real location data stored in the database, letting guests pick a destination from a pre-defined list of available countries.

---

## Goals

- Provide a list of available destination countries to guests
- Power the "Where" dropdown in the search bar with real data
- Keep the country list fresh via database-driven content (not hardcoded)

---

## User Stories

| ID | As a... | I want to... | So that... |
|----|---------|-------------|-----------|
| LF-01 | Guest | See a dropdown of available destinations when I click "Where" | I can select my destination easily |
| LF-02 | Guest | Type to filter the destination list | I can find my country quickly |
| LF-03 | Guest | Select a destination | The listings grid is filtered to that location |

---

## Acceptance Criteria

- [ ] Clicking the "Where" field opens `WhereTabs` modal
- [ ] `WhereTabs` displays a list of unique country values from the database
- [ ] Selecting a country sets it as the search destination
- [ ] The selected destination is reflected in the "Where" field label
- [ ] Typing in the field filters the displayed country list in real time

---

## Out of Scope (v1)

- Free-text city/address search (only pre-defined countries)
- Geocoding or map integration
- "Flexible" / "I'm flexible" destination option
