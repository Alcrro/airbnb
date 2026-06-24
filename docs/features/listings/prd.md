# PRD — Listings Feature

## Overview

The Listings feature is the core of the product. It surfaces available rooms on the home page and provides a complete detail view per listing, including images, host info, amenities, pricing, reviews, and a booking widget.

---

## Goals

- Allow guests to browse all available rooms without authentication
- Give each card enough information to compare listings at a glance
- Provide a full-detail room page that enables an informed booking decision
- Display ratings and reviews per listing
- Allow guests to save listings to a wishlist via a heart button

---

## User Stories

| ID | As a... | I want to... | So that... |
|----|---------|-------------|-----------|
| L-01 | Guest | See a responsive grid of room cards on the home page | I can browse available listings |
| L-02 | Guest | See image, name, location, price per night, and star rating on each card | I can quickly compare listings |
| L-03 | Guest | See an image carousel on a card | I can preview multiple photos without clicking |
| L-04 | Guest | Click the heart icon on a card | I can save a listing to my wishlist |
| L-05 | Guest | Click a card | I navigate to the full detail page |
| L-06 | Guest | See a fallback placeholder when an image fails | The UI doesn't break on bad URLs |
| L-07 | Guest | See a loading skeleton while the grid loads | The page feels fast even before data arrives |
| L-08 | Guest | See the room detail page with all available information | I can make a booking decision |
| L-09 | Guest | View a full image gallery on the detail page | I can see the property clearly |
| L-10 | Guest | See host name and avatar on the detail page | I know who I'm staying with |
| L-11 | Guest | See a list of amenities | I know what's included |
| L-12 | Guest | See reviews and the average rating on the detail page | I can trust the listing |
| L-13 | Guest | See a booking widget with dates and price summary | I can initiate a reservation |
| L-14 | Guest | See a "Not Found" message for invalid room IDs | The app handles bad links gracefully |

---

## Acceptance Criteria

### Home page (grid)
- [ ] Responsive grid: 1 col mobile → 2 md → 3 lg → 4 xl → 5 2xl
- [ ] Each card shows: primary image, name + country, host name, price per night, star rating
- [ ] Heart icon overlaid on image; toggles filled/empty state
- [ ] Image carousel on card: dots navigation, arrows visible on hover
- [ ] Skeleton loading state shown while data fetches
- [ ] Clicking a card navigates to `/room/[id]`
- [ ] Card has hover animation (subtle lift + shadow)

### Room detail page (`/room/[id]`)
- [ ] Full-width image gallery: 1 large image left + 2×2 grid right (Airbnb layout), "Show all photos" button
- [ ] Room title, country, and type badge
- [ ] Star rating and review count ("4.87 · 128 reviews")
- [ ] Host section: avatar, name, "Hosted by X" subtitle, join date
- [ ] Amenities grid (icons + labels)
- [ ] Booking widget (sticky sidebar): price per night, date range picker, guest count, total price, Reserve button
- [ ] Reviews section below the fold (see Reviews feature)
- [ ] 404/not-found state when room ID doesn't exist

---

## Out of Scope (v1)

- Map view on detail page
- Booking confirmation flow (handled by Booking feature)
- Host profile page
- Listing creation / host dashboard
