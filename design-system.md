# The DALF Dojo — Design System

> A living reference for colours, typography, spacing, components, and iconography across the application.

---

## 1. Principles

- **Clean, focused, professional** — no visual clutter, every element has a purpose.
- **Warm neutrals + French blue accent** — inspired by the DALF exam's French heritage without being tricolour-gimmicky in the app shell.
- **No emojis — SVG icons only** — inline SVG components ensure crisp rendering at any size and a cohesive visual language.
- **Server-rendered JSX** — zero client-side frameworks; components are pure Hono JSX with inline CSS custom properties.

---

## 2. Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--accent` | `#0055A4` | Primary actions, links, active nav states, focus rings |
| `--accent-dark` | `#003d7a` | Primary hover, pressed states |
| `--accent-light` | `#0066cc` | Focus borders, subtle emphasis |
| `--accent-bg` | `#e0ebf5` | Active nav background, selected table rows |
| `--accent-bg-light` | `#f0f5fa` | Hover fills, subtle highlights |
| `--base-bg` | `#fafaf9` | Page background (warm off-white) |
| `--base-surface` | `#ffffff` | Cards, modals, sidebar, input backgrounds |
| `--base-text` | `#1c1917` | Headings, body text, primary content |
| `--base-text-secondary` | `#78716c` | Labels, captions, secondary info |
| `--base-text-muted` | `#a8a29e` | Placeholders, disabled text, hints |
| `--base-border` | `#e7e5e4` | Card borders, dividers |
| `--base-border-strong` | `#d6d3d1` | Input borders, strong dividers |
| `--success` | `#16a34a` | Pass states, positive feedback, success alerts |
| `--error` | `#dc2626` | Fail states, errors, danger actions |
| `--warning` | `#d97706` | Warnings, quotas, attention needed |
| `--dashboard-bg` | `#f0f7ff` | Dashboard shell background only |
| `--dashboard-sidebar-border` | `#e2e8f0` | Sidebar separator |

### Semantic Pairings
- **Pass / Success**: `background: #f0fdf4`, `color: #166534`
- **Fail / Danger**: `background: #fef2f2`, `color: #991b1b`
- **Warning**: `background: #fffbeb`, `color: #92400e`
- **Info**: `background: #e0f2fe`, `color: #0369a1`

---

## 3. Typography

| Role | Font | Weights | Fallback |
|------|------|---------|----------|
| Body | Inter | 400, 500, 600 | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` |
| Headings & Buttons | Lexend | 500, 600, 700 | same stack |
| Accent / Fun | Patrick Hand | 400 | `cursive` |

### Scale
| Element | Size | Weight | Line-height |
|---------|------|--------|-------------|
| Page title (H1) | `1.75rem` | 700 | 1.2 |
| Card heading (H2) | `1.5rem` | 600 | 1.2 |
| Section heading (H3) | `1.125rem` | 600 | 1.3 |
| Body | `1rem` (16px) | 400 | 1.6 |
| Label | `0.875rem` | 500 | 1.4 |
| Caption / Small | `0.85rem` | 400 | 1.5 |
| Badge | `0.8rem` | 600 | 1 |

---

## 4. Spacing Scale

| Token | Value | Pixels |
|-------|-------|--------|
| `--space-1` | `0.25rem` | 4px |
| `--space-2` | `0.5rem` | 8px |
| `--space-3` | `0.75rem` | 12px |
| `--space-4` | `1rem` | 16px |
| `--space-6` | `1.5rem` | 24px |
| `--space-8` | `2rem` | 32px |
| `--space-10` | `2.5rem` | 40px |
| `--space-12` | `3rem` | 48px |
| `--space-16` | `4rem` | 64px |

### Common Patterns
- Card internal padding: `--space-6`
- Card gap (grid): `--space-4`
- Dashboard page padding: `--space-8` horizontal & vertical
- Form field gap: `--space-4`
- Button internal padding: `0.5rem 1rem`

---

## 5. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `6px` | Small badges, tags, progress bars |
| `--radius-md` | `12px` | Inputs, alerts, sidebar links, status badges |
| `--radius-lg` | `16px` | Cards, buttons, tables, MCQ options |
| `--radius-xl` | `24px` | Auth card |
| `--radius-full` | `999px` | Pills, auth inputs, user-pill, circular buttons |

---

## 6. Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)` | Cards, dropdowns |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)` | Card hover, popovers |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)` | Auth card, modals |
| `--shadow-accent` | `0 4px 14px rgba(0, 85, 164, 0.2)` | Primary buttons |

---

## 7. Buttons

### Base
```
display: inline-flex
align-items: center
justify-content: center
gap: 0.5rem
font-family: var(--font-heading)
font-weight: 500
border-radius: var(--radius-lg)
padding: 0.5rem 1rem
font-size: 1rem
transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)
cursor: pointer
border: none
outline: none
text-decoration: none
```

### Variants
| Class | Background | Text | Border | Shadow | Hover |
|-------|------------|------|--------|--------|-------|
| `.btn-primary` | `--accent` | white | none | `--shadow-accent` | darken + `translateY(-1px)` |
| `.btn-secondary` | `--base-text-secondary` | white | none | none | darken |
| `.btn-outline` | transparent | `--accent` | `1.5px solid --accent` | none | `--accent-bg-light` fill |
| `.btn-success` | `--success` | white | none | none | darken |
| `.btn-danger` | `--error` | white | none | none | darken |

### Sizes
- `.btn-sm` — smaller padding + font-size (e.g. table actions, card footers)
- `.btn-lg` — larger padding (e.g. auth submit)
- Default — standard padding `0.5rem 1rem`

### With Icons
- Leading icon: `18px`, inherits button text colour via `currentColor`
- Icon-only (`.icon-btn`): square aspect, centred, `--radius-md` or `--radius-lg`

---

## 8. Icons

### Source
All icons are **inline SVG components** in `src/components/Icons.tsx`. No icon font, no emoji, no external sprite sheet.

### Style Spec
- **Size**: `24×24` viewBox
- **Stroke**: `2px`
- **Stroke-linecap**: `round`
- **Stroke-linejoin**: `round`
- **Fill**: `none`
- **Colour**: `currentColor` (inherits from parent text colour)

### Icon Sizes in Context
| Context | Size |
|---------|------|
| Sidebar nav | `20px` |
| Button leading | `18px` |
| Small button / inline | `16px` |
| Card heading | `20px` |
| Large feature | `24px` |

### Available Icons
`Home`, `FileText`, `BarChart3`, `Settings`, `CirclePlay`, `Square`, `SquareStop`, `CheckCircle`, `XCircle`, `Headphones`, `BookOpen`, `PenTool`, `Mic`, `Zap`, `Landmark`, `ChevronLeft`, `ChevronRight`, `Menu`, `LogOut`, `User`, `CreditCard`, `TrendingUp`, `TrendingDown`, `Minus`, `Check`, `Sparkles`, `Flame`, `RefreshCw`, `ArrowRight`

---

## 9. Cards

```
background: var(--base-surface)
border: 1px solid var(--base-border)
border-radius: var(--radius-lg)
padding: var(--space-6)
box-shadow: var(--shadow-sm)
```

### Hover State (`.card-hover`)
```
transform: translateY(-2px)
box-shadow: var(--shadow-md)
```

---

## 10. Forms / Inputs

```
width: 100%
padding: 0.75rem 1rem
border: 1.5px solid var(--base-border-strong)
border-radius: var(--radius-lg)
font-size: 1rem
font-family: var(--font-body)
background: var(--base-surface)
color: var(--base-text)
```

### Focus State
```
outline: none
border-color: var(--accent)
box-shadow: 0 0 0 4px rgba(0, 85, 164, 0.1)
```

### Auth Variant (Pill)
```
border-radius: var(--radius-full)
padding: 0.85rem 1.25rem
```

---

## 11. Alerts & Badges

### Alerts
| Variant | Background | Text | Border |
|---------|------------|------|--------|
| `.alert-danger` | `#fef2f2` | `#991b1b` | `#fecaca` |
| `.alert-success` | `#f0fdf4` | `#166534` | `#bbf7d0` |
| `.alert-warning` | `#fffbeb` | `#92400e` | `#fde68a` |

### Status Badges (`.status-badge`)
- Pill shape, `0.8rem` font, `600` weight, capitalised
- `.status-info` — blue
- `.status-warning` — amber
- `.status-success` — green
- `.status-danger` — red

### Score Badges (`.score-badge`)
- `radius-md`, `0.9rem` font, `600` weight
- `.score-pass` — green fill
- `.score-fail` — red fill

---

## 12. Layout Patterns

### Container
- Marketing pages: `max-width: 960px`, centred
- Dashboard pages: `max-width: 1200px`, centred

### Grid
- `.grid-2`: `2-column`, `1rem` gap, collapses to `1-column` at `640px`
- `.grid-3`: `3-column`, `1rem` gap, collapses to `2-column` at `768px`, `1-column` at `640px`

### Dashboard Shell
- Fixed sidebar: `240px` width, white background, right border
- Collapsed sidebar: `72px` width, icons only
- Main content: `margin-left: 240px`, `padding: 2rem`
- Mobile: sidebar hidden off-canvas, toggled via hamburger

### Centering
- Auth pages: `min-height: 100vh`, `flex` column, `items-center`, `justify-center`
- Empty states: `text-align: center`, `padding: 3rem`, icon `24px` above text

---

## 13. Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| `768px` | Dashboard sidebar collapses to off-canvas |
| `640px` | `.grid-2` becomes single column, auth card padding reduces |

---

## 14. Animation Tokens

| Name | Duration | Easing | Properties |
|------|----------|--------|------------|
| Button press | `0.2s` | `cubic-bezier(0.4, 0, 0.2, 1)` | `transform: scale(0.97)` |
| Card lift | `0.3s` | `ease` | `transform`, `box-shadow` |
| Fade in | `0.4s` | `cubic-bezier(0.4, 0, 0.2, 1)` | `opacity`, `translateY` |
| Sidebar toggle | `0.3s` | `ease` | `transform`, `width` |
| Focus ring | `0.2s` | `ease` | `border-color`, `box-shadow` |
