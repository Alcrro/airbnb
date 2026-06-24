# Tech — Authentication & User Profile Feature

## Architecture Overview

Auth is not yet implemented. The current codebase has placeholder pages for login, signup, and profile, plus a `Profile.tsx` component with a hardcoded `isLogged = false`. The recommended approach is **NextAuth.js** (or a JWT + cookie implementation) with a `User` Mongoose model.

---

## File Map (Current State)

```
src/
  app/
    (auth)/
      login/page.tsx          → Stub page (empty)
      signup/page.tsx         → Stub page (empty)
    profile/page.tsx          → Stub page (empty)
  components/
    user/profile/
      Profile.tsx             → Profile icon; isLogged hardcoded to false
      profile.scss
```

---

## File Map (Target State)

```
src/
  app/
    (auth)/
      login/page.tsx          → Login form page
      signup/page.tsx         → Sign-up form page
    profile/page.tsx          → Protected profile page (redirect if not authed)
    api/
      auth/
        [...nextauth]/route.ts → NextAuth.js handler (or custom JWT endpoints)
  components/
    user/profile/
      Profile.tsx             → Reads real session state
  models/
    user/
      User.ts                 → Mongoose schema: { name, email, hashedPassword, createdAt }
  _lib/
    auth/
      getSession.ts           → Server helper to get current session
```

---

## Recommended Auth Flow (NextAuth.js + Credentials Provider)

```
User fills login form
  └── POST /api/auth/signin (NextAuth credentials provider)
        └── validateCredentials(email, password)
              └── User.findOne({ email }) → bcrypt.compare(password, hash)
                    └── success → NextAuth creates JWT session cookie
                    └── failure → returns error to form

Profile.tsx (Client Component)
  └── useSession() → { data: session, status }
        └── status === "authenticated" → show avatar + link to /profile
        └── status === "unauthenticated" → show "Log in" link

profile/page.tsx (Server Component)
  └── getServerSession() → redirect to /login if null
```

---

## Mongoose Schema — User (to be created)

```ts
{
  _id:            ObjectId
  name:           String    // required
  email:          String    // required, unique
  hashedPassword: String    // bcrypt hash
  createdAt:      Date      // auto
}
```

---

## Current Limitations

- `isLogged` is hardcoded `false` in `Profile.tsx` — no real session check
- Login/signup/profile pages are empty stubs
- No `User` model exists yet
- No auth library is installed (NextAuth not in `package.json`)

---

## Dependencies (to install)

```bash
npm install next-auth bcryptjs
npm install -D @types/bcryptjs
```
