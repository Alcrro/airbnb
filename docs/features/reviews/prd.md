# PRD — Reviews Feature

## Overview

The Reviews feature allows guests to see ratings and written feedback from previous guests for each listing. This builds trust and helps guests make informed booking decisions.

---

## Goals

- Display reviews on the room detail page
- Show an aggregate rating score per listing
- Allow authenticated guests to submit a review after a stay

---

## User Stories

| ID | As a... | I want to... | So that... |
|----|---------|-------------|-----------|
| R-01 | Guest | See reviews on a room detail page | I can assess the quality of the listing |
| R-02 | Guest | See the overall rating score | I can quickly judge the listing's reputation |
| R-03 | Authenticated user | Submit a review for a listing I stayed at | I can share my experience |
| R-04 | Guest | See the reviewer's name and date for each review | I know the feedback is real and recent |

---

## Acceptance Criteria

- [ ] Room detail page displays a list of reviews with: reviewer name, date, rating (1–5), comment
- [ ] Overall average rating is displayed prominently on the room detail page
- [ ] Authenticated users can submit a review via a form
- [ ] Submitted reviews are persisted to the database
- [ ] A room with no reviews shows "No reviews yet"

---

## Out of Scope (v1)

- Review moderation or reporting
- Host response to reviews
- Sorting or filtering reviews (by date, rating)
- Photo uploads with reviews
