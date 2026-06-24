# TODOs — Authentication & User Profile Feature

## Status Legend
- `[ ]` — Not started
- `[~]` — In progress
- `[x]` — Done
- `[!]` — Blocked

---

## High Priority

| ID | Priority | Task |
|----|----------|------|
| A-T01 | High | [x] Install `next-auth` and `bcryptjs` (+ `@types/bcryptjs`) packages |
| A-T02 | High | [x] Create `User` Mongoose model in `features/auth/models/User.ts` — fields: name, email, passwordHash, createdAt, image |
| A-T03 | High | [x] Set up `NextAuth` credentials provider at `app/api/auth/[...nextauth]/route.ts` |
| A-T04 | High | [x] Create `POST /api/auth/register` route — validate input, hash password with bcryptjs, create User |
| A-T05 | High | [x] Build signup form in `(auth)/signup/page.tsx` — name, email, password fields, client-side validation |
| A-T06 | High | [x] Build login form in `(auth)/login/page.tsx` — email, password, error message on failure |
| A-T07 | High | [x] Update `Profile.tsx` to read real session via `useSession()` — show avatar/name when logged in |
| A-T08 | High | [x] Gate `profile/page.tsx` with `getServerSession()` — redirect to `/login` if unauthenticated |
| A-T09 | High | [x] Add `NEXTAUTH_SECRET` and `NEXTAUTH_URL` to `.env.local` |

---

## Medium Priority

| ID | Priority | Task |
|----|----------|------|
| A-T10 | Medium | [x] Implement logout in `DropdownMenu.tsx` — call `signOut()` from next-auth/react |
| A-T11 | Medium | [x] Show clear error messages on form validation failure (wrong password, email taken, etc.) |
| A-T12 | Medium | [x] Style login + signup pages to match the app design (centered card, logo, primary button) |
| A-T13 | Medium | [x] Build `profile/page.tsx` — display user name, email, avatar, member since date |
| A-T14 | Medium | [x] `DropdownMenu.tsx`: show "Log in / Sign up" links when logged out; show "Profile / Log out" when logged in |

---

## Profile Page — Tabs

| ID | Priority | Blocked by | Task |
|----|----------|-----------|------|
| A-T19 | High | — | Build `ProfileTabs.tsx` — client component with Info / Bookings / Wishlists tab switcher |
| A-T20 | High | A-T19 | Build `InfoTab.tsx` — display avatar, name, email, member since (read-only) |
| A-T21 | High | A-T19 | Build `BookingsTab.tsx` — fetch `GET /api/bookings?userId=` and render booking cards |
| A-T22 | High | A-T19, W-T01 | Build `WishlistsTab.tsx` — fetch `GET /api/wishlist/lists` and render collection cards |
| A-T23 | High | A-T19–A-T22 | Wire tabs into `profile/page.tsx` — pass session data as props to each tab |

---

## Avatar Upload (Cloudinary)

| ID | Priority | Task |
|----|----------|------|
| A-T17 | Low | [ ] Add `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` to `.env.local` |
| A-T24 | Low | [ ] Create `PATCH /api/auth/avatar` handler — receive file, upload to Cloudinary, update `User.image` |
| A-T25 | Low | [ ] Build `AvatarUpload.tsx` — "Change photo" button + file input, calls `PATCH /api/auth/avatar`, updates UI |

---

## Low Priority

| ID | Priority | Task |
|----|----------|------|
| A-T15 | Low | [x] Client-side validation: email format regex, password min 8 chars |
| A-T16 | Low | [x] Add loading state to login/signup submit buttons |
| A-T18 | Low | [ ] OAuth provider: Google sign-in (requires Google OAuth credentials) |

---

## Done

| ID | Task |
|----|------|
| A-D01 | Route structure: `(auth)/login`, `(auth)/signup`, `profile` pages exist as stubs |
| A-D02 | `Profile.tsx` component exists (hardcoded placeholder state) |
| A-D03 | `next-auth` + `bcryptjs` installed |
| A-D04 | `User` Mongoose model — `features/auth/models/User.ts` |
| A-D05 | `authOptions.ts` — NextAuth credentials provider with bcrypt verify |
| A-D06 | `registerHandler.ts` — POST /api/auth/register with validation + bcrypt hash |
| A-D07 | `Providers.tsx` — SessionProvider wrapper added to root layout |
| A-D08 | `LoginForm.tsx` + `SignupForm.tsx` — styled forms with loading state + error messages |
| A-D09 | `Profile.tsx` reads real session via `useSession()` |
| A-D10 | `DropdownMenu.tsx` — dynamic auth state (Login/Signup vs Profile/Logout) |
| A-D11 | `profile/page.tsx` — protected with `getServerSession()`, shows name + email |
| A-D12 | `ConditionalNavbars.tsx` — hides Navbar + AuxNavbar on `/login` and `/signup` |
| A-D13 | Auth logo links back to `/` for easy navigation |
