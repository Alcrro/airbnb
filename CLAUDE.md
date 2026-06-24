# CLAUDE.md — Project Rules & Conventions

This file defines how Claude Code should behave when working on this project.

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: SCSS modules + Tailwind CSS (dark mode via `class`)
- **Database**: MongoDB via Mongoose
- **Theme**: `next-themes`
- **Icons**: Bootstrap Icons

---

## Project Structure

```
src/
  app/
    api/<feature>/route.ts     → Thin: 2 lines — import handler + export const GET
    (auth)/                    → Auth route group
    room/[id]/                 → Dynamic room detail page
    page.tsx + layout.tsx      → Root page and layout

  features/<feature-name>/     → One folder per product feature
    components/                → React components owned by this feature
    lib/                       → Server-side fetch helpers for this feature
    models/                    → Mongoose schemas for this feature
    api/                       → Route handler functions (imported by app/api/)
    types/                     → TypeScript interfaces for this feature

  shared/
    components/                → Structural UI: Navbar, Logo, Menu, SearchBy, etc.
    context/                   → Global React contexts (NavbarContext, WidthContext)
    db/                        → ConnectDB.ts

docs/
  features/                    → One folder per feature (prd.md, tech.md, todos.md)
  structuresProject/           → Docs for shared infrastructure
  commands/                    → Git/GitHub CLI reference
```

### Existing Features
| Feature | Path |
|---------|------|
| Listings | `src/features/listings/` |
| Search | `src/features/search/` |
| Property Filter | `src/features/property-filter/` |
| Location Filter | `src/features/location-filter/` |
| Auth | `src/features/auth/` |
| Reviews | `src/features/reviews/` |
| Booking | `src/features/booking/` |
| Wishlist | `src/features/wishlist/` |

---

## Feature Implementation Rules

These rules apply every time a new feature is added or an existing one is extended.

### 1. Feature folder structure
Every feature lives under `src/features/<feature-name>/` with these subfolders (create only what's needed):
```
src/features/<feature-name>/
  components/   ← React components for this feature only
  lib/          ← fetch helpers (server-side only)
  models/       ← Mongoose schemas
  api/          ← route handler functions
  types/        ← TypeScript interfaces
```

### 2. API routes are always thin
The file at `src/app/api/<route>/route.ts` must contain only:
```ts
import { myHandler } from "@/features/<name>/api/myHandler";
export const GET = myHandler;  // or POST, PUT, DELETE
```
All logic (DB calls, data transformation) lives in `src/features/<name>/api/myHandler.ts`.

### 3. Handler files
Every handler in `features/<name>/api/` must:
- Call `await ConnectDB()` before any Mongoose operation
- Return `NextResponse.json({ success, message, data })` on success
- Return `NextResponse.json({ error }, { status: 500 })` on failure
- Import `ConnectDB` from `@/shared/db/ConnectDB`

### 4. No cross-feature imports
Features must not import from each other's `components/`, `lib/`, or `models/`.
- If two features share a component → move it to `src/shared/components/`
- If two features share a type → move it to `src/shared/types/`
- If two features share a util → move it to `src/shared/lib/`

### 5. Shared components rule
`src/shared/components/` is for structural/layout components only (Navbar, Logo, Menu, etc.).
Feature UI components always stay inside their feature folder.

### 6. Lib functions (data fetching)
Every function in `features/<name>/lib/` must:
- Be `async` and return a typed response
- Use `@/` alias for all imports
- Include an explicit `cache` or `revalidate` option — no bare `fetch()`
- Default: `{ next: { revalidate: 86400 } }` | Static: `{ cache: "force-cache" }`

### 7. Models
Every Mongoose model must use the re-registration guard:
```ts
const Model = mongoose.models.ModelName || mongoose.model("ModelName", schema);
```
Models are only imported in handler files inside `features/<name>/api/` — never in components.

### 8. Documentation
Every new feature must have a folder under `docs/features/<feature-name>/` with:
- `prd.md` — user stories + acceptance criteria
- `tech.md` — file map, data flow, schema, API routes
- `todos.md` — task list with status and priority

---

## Code Conventions

### General
- Use TypeScript for all new files — no `.js` or `.jsx`
- Path alias `@/*` maps to `src/*` — always use it for imports
- No `any` types; define proper interfaces or use `unknown`
- No unused imports or variables

### Components
- One component per file; filename matches component name (PascalCase)
- Co-locate `.scss` files next to the component they style
- Async Server Components for data-fetching; mark Client Components with `"use client"` only when needed
- Never fetch data inside Client Components — pass it as props from Server Components

### Styling
- Prefer SCSS modules for component-level styles
- Use Tailwind for layout/spacing utilities only
- Never use inline styles unless absolutely unavoidable
- Dark mode: always add `dark:` variants for background and text colors

### Context
- Contexts live in `src/shared/context/`
- Export a named hook (`useXxx`) — never consume `useContext` directly in components
- Keep context state minimal — only UI state that multiple components need

---

## Documentation Rules

- Every product feature must have a folder under `docs/features/<feature-name>/` containing:
  - `prd.md` — what the feature does and why (user stories, acceptance criteria)
  - `tech.md` — technical design (components, API routes, data flow, models)
  - `todos.md` — current task list with status and priority
- Structural/infrastructure code (nav, DB, providers) is documented in `docs/structuresProject/`
- Keep `todos.md` files up to date as work progresses

---

## Git Conventions

- Branch naming: `feat/<feature>`, `fix/<issue>`, `chore/<task>`
- Commit format: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`, `test:`
- Never commit `.env` files
- PR title should be ≤ 70 characters

---

## What NOT to Do

- Do not add `console.log` in production code
- Do not use `any` type
- Do not fetch data in Client Components
- Do not bypass ESLint rules with `// eslint-disable`
- Do not create new files outside the established folder structure without updating this doc
- Do not write comments that describe *what* code does — only *why*
