# Responsive Behavior

**Breakpoints (Tailwind v4 defaults):**

| Token | Min | Use |
|---|---|---|
| (base) | 0 | Mobile portrait |
| `sm` | 640px | Mobile landscape, small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops (container ceiling) |
| `2xl` | 1536px | Wide desktops (no new layout — extra gutter only) |

---

## Container & Gutter

- Container: `max-w-[1280px] mx-auto`.
- Gutter: `px-6` mobile, `lg:px-12` desktop.
- Never exceed 1280px content width. Wide displays gain horizontal whitespace, never additional columns.

---

## Layout Patterns

### Two-column with sticky sidebar (DestinationGuide)
- `≥lg`: `grid grid-cols-[1fr_360px] gap-16`, sidebar `lg:sticky lg:top-28`.
- `<lg`: single column; sidebar drops below body; map iframe renders at 4:5.

### 3-up card rail (DestinationsRail, Editorial)
- `≥md`: `md:grid-cols-3 gap-5`.
- `<md`: single column; cards full-bleed within gutter.

### 4-up router (IntentRouter)
- `≥lg`: 4 columns.
- `md`: 2×2.
- `<md`: 1-up.

### Service desk rail (Desks)
- `≥lg`: 5 columns with stone dividers.
- `<lg`: vertical stack with 2px stone rules.

### Brief form
- `≥md`: two-col (form left, reassurance right).
- `<md`: single column wizard.

### Footer
- `≥md`: 4 columns + legal row.
- `<md`: accordion sections.

---

## Mobile-First Rules

1. **Tap targets ≥44×44px.** All disclosure buttons, accordion triggers, CTAs.
2. **Typography clamps.** All display sizes use `clamp(min, vw, max)` so headings shrink on small viewports without media queries.
3. **Sticky elements unstick.** Anything `lg:sticky` falls back to static positioning below the breakpoint.
4. **No horizontal scroll except by design.** Only TrustBar and Editorial carousel scroll horizontally on mobile, both with snap.
5. **Iframes go 4:5.** Stay22 maps render at `aspect-[4/5]` on mobile, `aspect-[4/5]` on desktop sidebar (same — already tuned).
6. **Nav collapses.** Below `md`, primary links move into a slide-in sheet activated by the hamburger.
7. **Sidebar order.** On stacked layouts, sidebar content (map + hotel list) moves **after** the body, never before.

---

## Image Behavior

- Hero images: `object-cover` always; aspect ratio set via wrapper (`aspect-[4/3]` desktop, `aspect-[4/5]` mobile).
- Destination tiles: fixed `aspect-[4/5]` at all breakpoints — keeps the rail rhythm consistent.
- All images use `loading="lazy"` except hero (which uses `loading="eager"` + `fetchpriority="high"`).

---

## Reduced Motion

`@media (prefers-reduced-motion: reduce)` disables:
- 2px-shift hover translates
- Shadow transitions
- Carousel auto-advance
- NovaExitIntent slide-in (it fades instead)

Color and opacity transitions remain — they don't trigger motion sensitivity.

---

## Print

Print stylesheet:
- Strip nav, footer, Stay22 map iframes, EmailCapture, FAQ accordion (expand all).
- Convert affiliate anchors to footnoted URLs.
- Force paper background to `white`, stone to `black`.
- Preserve typography (Fraunces + Inter both have print-quality variants).
