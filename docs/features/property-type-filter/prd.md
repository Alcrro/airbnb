# PRD — Property Type Filter Feature

## Overview

The Property Type Filter is a secondary navigation bar below the main navbar. It lets guests filter listings by property category (e.g., apartments, studios, villas, cabins), helping them narrow down results without typing.

---

## Goals

- Surface property type categories visually as a horizontal scrollable list
- Allow guests to filter the listing grid by selecting a category
- Keep the filter bar lightweight and fast (server-rendered, cached)

---

## User Stories

| ID | As a... | I want to... | So that... |
|----|---------|-------------|-----------|
| PT-01 | Guest | See a row of property type categories below the main navbar | I can quickly filter by type |
| PT-02 | Guest | Click a property type | The listing grid updates to show only that category |
| PT-03 | Guest | See an icon or visual identifier per category | I can scan categories at a glance |

---

## Acceptance Criteria

- [ ] Property types are fetched from the database and rendered server-side
- [ ] Each type is displayed as a clickable item in a horizontal list
- [ ] Selecting a type filters the home page listings
- [ ] Active/selected type is visually highlighted
- [ ] List is scrollable horizontally on smaller screens

---

## Out of Scope (v1)

- Multi-select filtering (selecting more than one type at once)
- Custom icons per property type (icon set not yet defined)
