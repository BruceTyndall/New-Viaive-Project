# Image & Asset Direction

**Companion file:** `docs/assets-manifest.json`

Photography is supportive, never decorative. Every image must do one of three jobs: **establish place**, **show service**, or **prove credibility**. Mood boards and stock-style hero photography are out.

---

## 1. Aesthetic

- **Color:** muted, slightly warm, never oversaturated. Lift shadows; recover highlights; no HDR look.
- **Composition:** quiet, asymmetric. Generous negative space — images need room to breathe inside the 2px stone border.
- **People:** rarely. When present, never staring at the camera; never posed at-resort. Treat people as scale, not subject.
- **Time of day:** golden hour or overcast. Midday harsh light is banned.
- **Crops:** 4:5 portrait for tiles and hotel covers; 3:2 landscape for editorial; 4:3 desktop hero; 4:5 mobile hero.

---

## 2. Slot Specifications

| Slot | Aspect | Source | Max served | Format | Loading |
|---|---|---|---|---|---|
| hero.desktop | 4:3 | 2400×1800 | 180KB | AVIF (WebP fallback) | eager + fetchpriority=high |
| hero.mobile | 4:5 | 1600×2000 | 120KB | AVIF | eager |
| destinationTile | 4:5 | 1600×2000 | 90KB | AVIF | lazy |
| hotelCover | 4:5 | 1200×1500 | 70KB | AVIF | lazy |
| editorialCover | 3:2 | 1800×1200 | 90KB | AVIF | lazy |
| ogImage | 1.91:1 | 1200×630 | 120KB | AVIF | n/a |
| trustLogo | auto | SVG | 8KB inline | SVG | inline |

---

## 3. Rights & Sourcing

Three license tiers, stored in `media.license`:

- **owned** — Viaive-commissioned photography. Preferred.
- **licensed** — Paid stock from Stocksy, Trunk, or hotel partner kits with written usage grant. Stored alongside the file in Payload `media.credit` field.
- **editorial** — Press/PR images used under editorial fair-use. Permitted on `posts` and `bestOf` only. Never on commercial pages (`destinations`, `desks`, `compares`).

A nightly audit script flags any `media` record where `license=editorial` is referenced from a non-editorial route.

---

## 4. Alt Text

**Pattern:** `[subject] — [location], [year]`

Examples:
- "Suite verandah looking onto the lagoon — Soneva Jani, Maldives, 2026"
- "Lobby reading room in afternoon light — Aman Tokyo, 2026"
- "View from Pavilion Suite balcony — Mandarin Oriental Bangkok, 2025"

**Banned phrases:** "luxury hotel room", "beautiful resort", "vacation", "amazing", "stunning", "breathtaking", "world-class". Payload validation rejects these on save.

Decorative images pass `alt=""` only when the surrounding text fully conveys meaning. Pattern: never use `alt=""` on hero, hotel cover, or editorial cover slots.

---

## 5. OG Image Generation

OG images are generated on publish via Payload `afterChange` hook:

1. Take the destination/post `cover` image at its native size.
2. Crop to 1200×630 (1.91:1), gravity center.
3. Overlay the Viaive wordmark at 20% width, bottom-left, with 24px padding.
4. Apply a subtle 0–40% black gradient from bottom for text legibility.
5. Write to `media/og/{collection}/{slug}.avif` in R2.

The OG generator is reusable across all collections; pass `{collection, slug, sourceMediaId}`.

---

## 6. SVG Discipline

- Vector assets only for: wordmark, mark, icons (`lucide-react` covers this), trust-bar logos.
- All SVGs run through SVGO before commit.
- Inline SVGs (≤8KB) where they appear above the fold; sprite-bundle below.
- No SVG animations except for the focus-ring affordance.

---

## 7. R2 Path Convention

```
media/
  brand/
    wordmark.svg
    mark.svg
    og-default.avif
    fallback.avif
  destinations/{slug}/
    hero.avif
    hotels/{hotel-slug}.avif
  desks/{slug}/
    hero.avif
  best-of/{slug}/
    rank-{n}.avif
  editorial/{slug}/
    cover.avif
    inline-{n}.avif
  og/{collection}/{slug}.avif
```

Filenames are kebab-case, lowercase, no version suffix. Cache-busting handled by R2's etag, not filename.

---

## 8. Performance Budget

| Metric | Target |
|---|---|
| Hero image transfer | ≤180KB |
| Above-fold image total | ≤350KB |
| LCP image element | rendered ≤2.0s on 4G mobile |
| Total page weight (homepage) | ≤1.4MB |
| Total page weight (destination) | ≤1.8MB (sticky map iframe excluded) |

Vercel image optimization handles automatic AVIF generation, srcset, and dimension-aware delivery.
