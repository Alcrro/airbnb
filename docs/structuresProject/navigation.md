# Structure — Navigation & Layout

## Purpose

The navigation layer provides the global page shell: the main navbar, the auxiliary filter bar, and the root layout. These are structural/shared components not owned by any single feature.

---

## File Map (current)

```
src/
  app/
    layout.tsx                        → Root layout — providers + Navbar + AuxNavbar + children
    globals.scss                      → Global CSS resets and base styles
  shared/
    components/
      Navbar.tsx                      → Main navbar — Logo + SearchBy + Search + Menu
      Logo.tsx                        → Airbnb wordmark, links to "/"
      Menu.tsx                        → Right side: DarkThemeButton + DropdownMenu + Profile
      DarkThemeButton.tsx             → Light/dark theme toggle (next-themes)
      DropdownMenu.tsx                → User dropdown (stub — needs full implementation)
      SearchBy.tsx                    → "Stays" / "Experience" mode tabs
      SearchButton.tsx                → Red circular search submit button
    context/
      NavbarContext.tsx               → isActive, indexNavbarType state
      WidthContext.tsx                → Window width (partially used)
  features/
    property-filter/
      components/
        AuxNavbar.tsx                 → Secondary bar: property type filter (Server Component)
    search/
      components/
        Search.tsx                    → Search fields bar (Server Component)
```

---

## Component Responsibilities

| Component | Responsibility |
|-----------|---------------|
| `layout.tsx` | Wraps every page with `ThemeProvider`, `NavbarProvider`, `WidthProvider`; renders `<Navbar>` + `<AuxNavbar>` above all content |
| `Navbar.tsx` | Composes Logo (left), SearchBy + Search (center), Menu (right) |
| `Logo.tsx` | Airbnb logo/wordmark, always links to `/` |
| `Menu.tsx` | Hamburger, DropdownMenu, dark mode toggle, Profile avatar |
| `DarkThemeButton.tsx` | Calls `useTheme()` from next-themes to toggle dark/light |
| `DropdownMenu.tsx` | Dropdown: login, signup, host, help links (currently a stub) |
| `SearchBy.tsx` | Client Component — reads/sets `isActive` in NavbarContext |
| `SearchButton.tsx` | Red search button — will trigger search on click |

---

## Layout Provider Stack

```
<html lang="en" suppressHydrationWarning>
  <body>
    <ThemeProvider attribute="class">        ← next-themes dark/light
      <NavbarProvider>                       ← NavbarContext (mode + active field)
        <WidthProvider>                      ← WidthContext (viewport width)
          <Navbar />
          <AuxNavbar />                      ← from features/property-filter
          <div className="main">{children}</div>
        </WidthProvider>
      </NavbarProvider>
    </ThemeProvider>
  </body>
</html>
```

---

## Planned Improvements

| ID | Priority | Task |
|----|----------|------|
| NAV-T01 | High | Mobile responsive: collapse full search bar to a compact pill on `< md` screens |
| NAV-T02 | High | Implement `DropdownMenu` — login, sign up, host your home, help links |
| NAV-T03 | Medium | Sticky navbar: shrink height + compact search on scroll past 80px |
| NAV-T04 | Medium | Show active underline on "Stays" / "Experience" based on `NavbarContext.isActive` |
| NAV-T05 | Medium | Add border/shadow to navbar on scroll (currently no visual separation) |
| NAV-T06 | Low | Animate search bar expand/collapse with CSS transition |
| NAV-T07 | Low | Keyboard navigation: tab through search fields, Escape closes modal |
