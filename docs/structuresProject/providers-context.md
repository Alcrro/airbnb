# Structure — Providers & Context

## Purpose

Context providers manage global client-side state shared across multiple components. All providers are composed in the root layout, wrapping the entire app.

---

## File Map (current)

```
src/
  shared/
    context/
      NavbarContext.tsx        → Search mode + open field index
      WidthContext.tsx         → Window width (responsive breakpoint tracking)
```

---

## NavbarContext

**File**: `src/shared/context/NavbarContext.tsx`

Manages the two pieces of interactive state the search bar needs:

```ts
interface NavbarContextType {
  isActive: "stays" | "experience"
  setIsActive: Dispatch<SetStateAction<"stays" | "experience">>

  indexNavbarType: number | null      // index of the currently open field modal
  setIndexNavbarType: Dispatch<SetStateAction<number | null>>
}
```

**Hook**: `useNavbarContext()` — throws if used outside `<NavbarProvider>`

**Consumed by**:
- `SearchBy.tsx` — sets `isActive` on tab click
- `SearchTypesList.tsx` — reads `isActive` to decide which form to render
- `WhereType.tsx` — reads/sets `indexNavbarType` to open/close the Where modal

---

## WidthContext

**File**: `src/shared/context/WidthContext.tsx`

Tracks browser window width for responsive behavior.

```ts
interface WidthContextType {
  width: number
}
```

**Hook**: `useWidth()` — returns current window width

**Status**: Partially implemented — resize logic is in place but not actively consumed by any component yet. Will be used when the navbar collapses on mobile.

---

## External Provider — ThemeProvider

**Source**: `next-themes`

Enables light/dark mode. Applied via `class` on `<html>` (`dark` or `light`), used by Tailwind's `darkMode: "class"` config.

**Consumed by**:
- `DarkThemeButton.tsx` — calls `useTheme()` to toggle

---

## Provider Stack (layout.tsx)

```
<ThemeProvider attribute="class">
  <NavbarProvider>
    <WidthProvider>
      {children}
    </WidthProvider>
  </NavbarProvider>
</ThemeProvider>
```

---

## Adding a New Context

1. Create `src/shared/context/<Name>Context.tsx`
2. Export a named hook `useXxx()` with a null-guard
3. Export `<XxxProvider>`
4. Add to the provider stack in `src/app/layout.tsx`
5. Document it here

---

## Planned Improvements

| ID | Priority | Task |
|----|----------|------|
| CTX-T01 | Medium | Add `SearchContext` to hold selected search params (country, dates, guests) — shared between Search fields and SearchButton |
| CTX-T02 | Low | Fully implement `WidthContext` resize listener and use it to collapse the navbar on mobile |
