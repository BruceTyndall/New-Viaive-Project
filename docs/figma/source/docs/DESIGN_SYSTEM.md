# Viaive Design System — Digital Stone & Paper

**Version:** 1.0.0
**Last reviewed:** 2026-05-14
**Source of truth:** `docs/design-tokens.json`

---

## 1. Aesthetic Principles

Viaive's surface language treats every page as **engraved stationery for serious travelers**. The system is built on five non-negotiable rules:

1. **Paper, not glass.** Backgrounds are warm, slightly off-white (`#F9F7F2`). We never use pure white as a primary surface.
2. **Stone, not gradient.** Borders are 2px solid `#1a1a1a`. Shadows are solid color offsets, never blurs.
3. **Gold is a flag, not a fill.** `#c8a96a` is reserved for accents, hover-state signatures, and affiliate disclosure markers. It never fills more than ~5% of any composition.
4. **Type does the work.** Fraunces (display) and Inter (body) carry the brand. Imagery is supportive, never decorative.
5. **Square corners always.** No radius tokens on primary surfaces. Editorial weight comes from typography and structure, not softness.

---

## 2. Color

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F9F7F2` | Primary background |
| `--paper-alt` | `#F4F1EA` | Inset surfaces, map background |
| `--stone` | `#1a1a1a` | Ink, primary border, dark sections |
| `--stone-alt` | `#0b0b0c` | Deep tile interior on dark rails |
| `--stone-mid` | `#4A4A4A` | Secondary text on paper |
| `--gold` | `#c8a96a` | Accent, hover signature, affiliate flag |
| `--gold-soft` | `rgba(200,169,106,0.40)` | Dividers, low-emphasis borders |
| `--muted` | `#9aa3b2` | Refurb / neutral status |

**Contrast contract:** all body type meets WCAG AA 4.5:1 on paper. Stone-mid (`#4A4A4A`) on paper measures 7.4:1. Gold on paper measures 3.1:1 — gold is therefore **never used for body copy**, only for ≥14pt SemiBold labels, icons, or borders.

---

## 3. Typography

### Families

- **Display:** Fraunces (variable, opsz 9–144, weights 300/400/500/600, italic 400)
- **Body:** Inter (weights 300/400/500/600)

Loaded once via `src/styles/fonts.css`. Never add font imports elsewhere.

### Type scale

| Step | Family | Size | Line | Tracking | Use |
|---|---|---|---|---|---|
| Eyebrow | Inter 500 | 11px | 1.2 | 0.32em | Section eyebrows |
| Meta | Inter 500 | 10px | 1.2 | 0.30em | Tier labels, status flags |
| Small | Inter 400 | 13px | 1.55 | normal | Captions, disclosures |
| Body | Inter 400 | 18px | 1.7 | normal | Long-form editorial |
| Lead | Fraunces 400 | 20px | 1.45 | normal | GEO answer box |
| H3 | Fraunces 400 | 30px | 1.1 | -0.01em | Section heads |
| H2 | Fraunces 400 | clamp(34px,4.2vw,56px) | 1.02 | -0.02em | Rail / module heads |
| H1 | Fraunces 400 | clamp(40px,5.4vw,72px) | 1 | -0.025em | Page leads |
| Display Italic | Fraunces 300 italic | inherits H size | inherits | inherits | Second half of split headlines |

**Measure rule:** body content is capped at **70ch** (≈68 characters). Sidebars and meta strips ignore this rule but never exceed 360px wide.

---

## 4. Space & Layout

- **Container:** `max-w-[1280px]` centered.
- **Gutters:** `px-6` mobile, `lg:px-12` desktop.
- **Section rhythm:** `py-20 lg:py-24` for rails, `py-24 lg:py-32` for editorial sections.
- **Sidebar:** 360px fixed; `lg:sticky lg:top-28`.

---

## 5. Borders & Shadows

| Pattern | Spec |
|---|---|
| Card resting | `border-2 border-[#1a1a1a]` + `shadow-[6px_6px_0_0_#1a1a1a]` |
| Card highlight | `shadow-[6px_6px_0_0_#c8a96a]` |
| Hero CTA | `shadow-[8px_8px_0_0_#c8a96a]` |
| Exit-intent modal | `shadow-[12px_12px_0_0_#1a1a1a]` |
| Hover (press) | `hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[0_0_0_0]` |

**No drop-shadow blurs. Anywhere.** If a surface needs more lift, increase the offset, never the blur radius.

---

## 6. Motion

- **Easing:** `cubic-bezier(0.2, 0.7, 0.2, 1)` for stone (decisive), `cubic-bezier(0.4, 0, 0.2, 1)` for paper (settle).
- **Durations:** 150ms (micro), 200ms (default), 300ms (rails), 600ms (scroll snaps).
- **Press pattern:** any interactive Stone surface offsets `+2px/+2px` and collapses its shadow to zero on hover.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` disables translate and shadow transitions; color transitions remain.

---

## 7. Texture

A single SVG turbulence noise texture overlays editorial sections at **4% opacity, multiply blend**. Never above 6%. Never on dark sections. Never on interactive surfaces.

```html
<div class="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply"
     style="background-image: url('data:image/svg+xml;utf8,<svg xmlns=...>')" />
```

---

## 8. Affiliate Visual Contract

Every Stay22 surface carries the disclosure `Affiliate · We may earn from bookings at no cost to you.` in 10px Inter, stone-mid, with the gold accent dot or rule above it. Disclosures are **never collapsed, never tooltipped**. See `AFFILIATE_MODULE_DESIGN_SPEC.md`.

---

## 9. Don'ts

- ❌ Rounded corners on primary surfaces
- ❌ Drop-shadow blur values > 0
- ❌ Gold body copy
- ❌ Pure white backgrounds
- ❌ Sans-serif headlines above 24px
- ❌ Decorative emoji or icon-only CTAs
- ❌ More than one italic phrase per headline
