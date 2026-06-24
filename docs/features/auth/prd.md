# PRD — Authentication & User Profile Feature

## Overview

Authentication lets guests create an account, log in, and access a personal profile page. The Profile button in the navbar reflects the user's logged-in state and directs them to login or their profile accordingly. The profile page has three tabs: Info, Bookings, and Wishlists.

---

## Goals

- Allow new users to create an account via a sign-up form
- Allow existing users to log in with their credentials
- Show a user profile page for authenticated users with tabs for info, bookings, and wishlists
- Gate protected routes (profile, booking) behind authentication

---

## User Stories

| ID | As a... | I want to... | So that... |
|----|---------|-------------|-----------|
| A-01 | New user | Fill out a sign-up form with name, email, and password | I can create an account |
| A-02 | Existing user | Log in with my email and password | I can access my profile and bookings |
| A-03 | Logged-in user | See my profile page with tabs | I can view my info, bookings, and wishlists in one place |
| A-04 | Logged-in user | Log out | I can securely end my session |
| A-05 | Guest | See a "Log in" link in the navbar | I know I can sign in |
| A-06 | Logged-in user | See my avatar or name in the navbar | I know I'm signed in |
| A-07 | Logged-in user | Upload a profile photo from my profile page | I can personalise my account |

---

## Profile Page — Tabs

### Info Tab
- Avatar (from Cloudinary URL stored in `User.image`) with a **"Change photo"** button
- Upload goes directly to Cloudinary; URL is saved back to `User.image` via `PATCH /api/auth/avatar`
- Full name, email address (read-only)
- "Member since" date from `User.createdAt`

### Bookings Tab
- List of the user's reservations fetched from the Booking feature
- Each card shows: property image, property name, check-in date, check-out date, total price, status badge (**Upcoming** / **Past**)
- Empty state when the user has no bookings

### Wishlists Tab
- Grid of the user's named wishlist collections
- Each collection card shows: list name, property count, cover image (first property in the list)
- Clicking a collection opens it and shows the saved property cards
- Empty state when the user has no wishlists

---

## Acceptance Criteria

- [x] Sign-up page collects name, email, password; validates inputs; creates account
- [x] Login page accepts email + password; returns session/token on success
- [x] Invalid credentials show a clear error message
- [x] Profile page is only accessible when logged in (redirect to `/login` otherwise)
- [x] `Profile.tsx` component reflects real auth state (not hardcoded `isLogged=false`)
- [x] Logout clears session and redirects to home
- [ ] Profile page has three tabs: Info, Bookings, Wishlists
- [ ] Info tab displays avatar, name, email, member since — all read-only
- [ ] "Change photo" button uploads image to Cloudinary and updates `User.image`
- [ ] Bookings tab lists all user bookings with property image, dates, price, and status
- [ ] Wishlists tab shows named collections with cover image and property count

---

## Out of Scope (v1)

- OAuth / social login (Google, GitHub)
- Password reset / forgot password flow
- Email verification
- Editing name or email from profile page
