# Structure — Styling

## Purpose

Hybrid styling approach: **SCSS modules** for component-level styles and **Tailwind CSS** for layout utilities. Global tokens in `globals.scss` ensure visual consistency across features.

---

## Styling Stack

| Tool | Version | Role |
|------|---------|------|
| SCSS (Sass) | 1.77.8 | Component-scoped styles, BEM-like selectors, animations |
| Tailwind CSS | 3.4.1 | Layout, spacing, responsive grid, dark mode utilities |
| Bootstrap Icons | 1.11.3 | Icon set (`<i className="bi bi-xxx" />`) |

---

## File Map (current)

```
src/
  app/
    globals.scss                → Global resets, CSS custom properties (design tokens)
  tailwind.config.ts            → Dark mode: "class", content paths
  postcss.config.mjs            → Required by Tailwind
  shared/components/*.scss      → Per shared component (co-located)
  features/<name>/components/
    *.scss                      → Per feature component (co-located)
  types/
    declarations.d.ts           → declare module "*.scss" — SCSS type safety
```

---

## Design Tokens (globals.scss)

```scss
:root {
  --color-primary:       #FF385C;
  --color-primary-hover: #E31C5F;
  --color-text:          #222222;
  --color-text-muted:    #717171;
  --color-border:        #DDDDDD;
  --color-bg:            #FFFFFF;
  --color-bg-secondary:  #F7F7F7;
  --shadow-card:         0 2px 16px rgba(0, 0, 0, 0.12);
  --shadow-card-hover:   0 6px 24px rgba(0, 0, 0, 0.18);
  --radius-card:         12px;
  --radius-input:        32px;
  --transition-fast:     150ms ease-out;
  --transition-card:     200ms ease;
}

.dark {
  --color-text:          #EBEBEB;
  --color-text-muted:    #A0A0A0;
  --color-border:        #3D3D3D;
  --color-bg:            #1A1A2E;
  --color-bg-secondary:  #222236;
}
```

---

## Responsive Breakpoints (listings grid)

| Breakpoint | Min-width | Listing columns |
|-----------|-----------|----------------|
| default (mobile) | — | 1 column |
| `sm` | 640px | 1 column |
| `md` | 768px | 2 columns |
| `lg` | 1024px | 3 columns |
| `xl` | 1280px | 4 columns |
| `2xl` | 1536px | 5 columns |

---

## Tailwind Config (must match current folder structure)

```ts
{
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/shared/**/*.{ts,tsx}",
  ]
}
```

> **Note:** The default Tailwind config currently lists `./src/components/**` and `./src/pages/**` — these paths no longer exist. Update `tailwind.config.ts` to match the above.

---

## Animation Guidelines

| Use case | Animation |
|----------|-----------|
| Card hover | `transform: translateY(-2px)` + shadow, 200ms ease |
| Image carousel | Slide transition, 300ms ease |
| Modal / dropdown open | Fade-in + slide-down, 150ms ease-out |
| Loading skeleton | Shimmer gradient sweep (keyframe in `globals.scss`) |
| Button press | Scale to 0.97, 100ms |

---

## Rules

- Co-locate `.scss` files next to the component — never in `globals.scss`
- Use SCSS for structure, states (hover, focus, active), and animations
- Use Tailwind for layout (flex, grid), spacing (p-, m-), and responsive prefixes
- Never hardcode hex/rgb color values in component SCSS — always use CSS custom properties
- Always add `dark:` Tailwind variants for bg and text color classes
- Never use inline `style={{}}` unless the value is dynamic (e.g., calculated pixel width)

---

## Planned Improvements

| ID | Priority | Task |
|----|----------|------|
| STY-T01 | High | Define all design tokens as CSS custom properties in `globals.scss` |
| STY-T02 | High | Fix `tailwind.config.ts` content paths (currently points to old `components/` path) |
| STY-T03 | High | Add `@keyframes shimmer` to `globals.scss` for reuse by all skeleton loaders |
| STY-T04 | High | Audit and fix dark mode: all card backgrounds, text, borders need `dark:` variants |
| STY-T05 | Medium | Add card hover animation (translateY + shadow) to `rooms.scss` |
| STY-T06 | Medium | Define SCSS mixin `skeleton-block` for consistent loading placeholders |
| STY-T07 | Low | Establish spacing scale (`--space-xs` → `--space-2xl`) in CSS custom properties |
