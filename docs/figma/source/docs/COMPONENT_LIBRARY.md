# Viaive Component Library

**Companion file:** `docs/components.json` (machine-readable)
**Source:** `src/app/components/*.tsx`

Every component below maps to a Payload collection, global, or block. Components are the **only** place visual decisions live — pages compose components, they never style.

---

## Conventions

- **Naming:** PascalCase file, PascalCase export. One component per file.
- **Props:** typed via `interface XProps { ... }` immediately above the component.
- **Payload mapping:** every prop must round-trip from a Payload field. No "magic strings" baked in components.
- **Analytics:** any interactive element must carry `data-analytics-id="<route>:<slot>:<intent>"`.
- **Affiliate:** any outbound to Stay22 carries `rel="sponsored nofollow"` and is generated via `lib/stay22.ts`. Never hand-write affiliate URLs.

---

## Catalog

### Nav
- **Purpose:** Global top nav.
- **Payload:** global `navigation` → `brand`, `primaryLinks[]`, `ctaLabel`, `ctaHref`.
- **Desktop:** Fixed; paper bg; 2px stone bottom border once scrolled past hero.
- **Mobile:** Hamburger right; full-height sheet; Esc closes.
- **States:** resting · scrolled · open(mobile).
- **A11y:** `<nav>` landmark; `aria-expanded` on toggle; trap focus inside open sheet.
- **Routes:** all.

### Hero
- **Purpose:** Opening editorial lockup with primary + secondary CTA.
- **Payload:** block `HeroBlock` → `eyebrow`, `headline`, `italicHeadline`, `lede`, `primaryCta{label,href}`, `secondaryCta{label,href}`, `image`.
- **Desktop:** 1fr:520px two-col; image right, square corners.
- **Mobile:** Stack; image at 4:5 below copy.
- **States:** resting.
- **A11y:** one `<h1>` per page; image `alt` required.
- **Routes:** `/`, `/desks/*`, `/destinations/*`.

### TrustBar
- **Purpose:** Press / partner logo strip.
- **Payload:** block `TrustBarBlock` → `items[]{label,logo,href}`.
- **Desktop:** Single row, 6–8 items.
- **Mobile:** Horizontal scroll with snap.
- **States:** resting.
- **A11y:** `role="list"`; logo alt = publication name.
- **Routes:** `/`, `/concierge`.

### IntentRouter
- **Purpose:** Four-card "what brought you" router.
- **Payload:** block `IntentRouterBlock` → `cards[]{eyebrow,title,blurb,href}`.
- **Desktop:** 4-up grid.
- **Mobile:** 2×2, then 1-up <480px.
- **States:** resting · hover(press).
- **A11y:** each card a single `<a>` with descriptive text.
- **Routes:** `/`, `/start-planning`.

### Desks
- **Purpose:** Service desk rail (Hotel, Family, Safari, Concierge, Asia Intelligence).
- **Payload:** collection `desks` → `{slug,name,eyebrow,lede,specialties[],leadTime,priceFloor,ctaHref}`.
- **Desktop:** 5-col rail with stone dividers.
- **Mobile:** Vertical stack, 2px rules between.
- **States:** resting · hover.
- **A11y:** each desk `<h3>`; list semantics.
- **Routes:** `/`, `/desks/*`.

### Atlas
- **Purpose:** Regional hub map / index (7 regions).
- **Payload:** collection `regions` → `{slug,name,lead,destinations[]}`.
- **Desktop:** 3-col grid.
- **Mobile:** Stack with sticky region label.
- **States:** resting.
- **A11y:** `<h2>` + nested `<h3>` per region.
- **Routes:** `/`, `/atlas`.

### DestinationsRail
- **Purpose:** Dark stone rail of highest-revenue destinations, anchor-scrolls to in-page guides.
- **Payload:** collection `destinations` (filtered `featured=true`).
- **Desktop:** 3-up dark tiles, gold offset on hover.
- **Mobile:** 1-up stack.
- **States:** resting · hover(gold).
- **A11y:** each tile `<a href="#destination-{slug}">`.
- **Routes:** `/`.

### DestinationGuide ⭐ flagship
- **Purpose:** Long-form destination editorial with sticky Stay22 map + audited hotel list.
- **Payload:** collection `destinations` (full record). All copy fields are `richText` with `{{Hotel Name}}` markers that resolve to Stay22 deep-link anchors at render time.
- **Desktop:** 1fr + 360px sidebar; sidebar `lg:sticky lg:top-28`.
- **Mobile:** Stack; sidebar drops below body; map renders at 4:5.
- **States:** resting; map iframe lazy-loads.
- **A11y:** `<section itemtype="https://schema.org/TouristDestination">`; iframe `title`; every affiliate anchor carries `rel="sponsored nofollow"` and analytics id `dest-{slug}:link:{hotel-slug}`.
- **Routes:** `/` (embedded), `/destinations/:slug` (standalone).

### Standard
- **Purpose:** "The Viaive Standard" — 7 audit criteria.
- **Payload:** global `viaiveStandard` → `{intro,criteria[]{title,body,icon}}`.
- **Desktop:** Two-col with offset numbering.
- **Mobile:** Stack with sticky number column.
- **States:** resting.
- **A11y:** ordered list semantics.
- **Routes:** `/`, `/about/standard`.

### Editorial
- **Purpose:** Field Notes / Letters preview rail.
- **Payload:** collection `posts` → `{slug,title,dek,author,publishedAt,cover,readMinutes}`.
- **Desktop:** 3-up cards.
- **Mobile:** 1-up swipe carousel.
- **States:** resting · hover.
- **A11y:** `<article>` per card; `<time>` for date.
- **Routes:** `/`, `/journal`.

### StayModule
- **Purpose:** Stay22 search surface (destination, dates, guests, tier).
- **Payload:** block `StayModuleBlock` → `{title,lede,defaultDestination,disclosureText}`.
- **Desktop:** Inline 4-field + CTA row.
- **Mobile:** Stack, full-bleed inputs.
- **States:** resting · loading · error.
- **A11y:** inputs labeled; disclosure linked via `aria-describedby`.
- **Routes:** `/`, `/destinations/*`, `/best/*`.

### Proof
- **Purpose:** Metrics + testimonial strip.
- **Payload:** global `proof` → `{metrics[]{value,label},quotes[]{body,attribution,role}}`.
- **Desktop:** Metrics row + 2-col quotes.
- **Mobile:** Metrics stack; quotes carousel.
- **States:** resting.
- **A11y:** `<blockquote>` + `<cite>`.
- **Routes:** `/`, `/concierge`.

### Brief
- **Purpose:** Concierge intake form (preview or live).
- **Payload:** block `BriefBlock` → `{title,lede,fields[],submitLabel}`.
- **Desktop:** Two-col, form left.
- **Mobile:** Stack.
- **States:** resting · submitting · submitted · error.
- **A11y:** every input labeled; error in `aria-live="polite"`.
- **Routes:** `/`, `/concierge`, `/start-planning`.

### EmailCapture
- **Purpose:** Inline newsletter signup — "The Quiet Letter."
- **Payload:** global `newsletter` → `{title,lede,placeholder,consentText,successText}`.
- **Desktop:** Centered, 640px max.
- **Mobile:** Full-bleed.
- **States:** resting · submitting · success · error.
- **A11y:** `type="email"` + `autocomplete="email"`.
- **Routes:** `/`, `/journal`, `/destinations/*`.

### FAQ
- **Purpose:** Accordion FAQ + FAQPage JSON-LD.
- **Payload:** block `FAQBlock` → `{title,items[]{question,answer}}`.
- **Desktop:** Single col, 70ch.
- **Mobile:** Same; touch targets ≥44px.
- **States:** closed · open.
- **A11y:** `aria-expanded` on each disclosure button; JSON-LD emitted server-side.
- **Routes:** `/`, `/concierge`, `/destinations/*`.

### Footer
- **Purpose:** Sitemap + legal + affiliate disclosure + social.
- **Payload:** global `footer` → `{columns[],legalLinks[],disclosure,socialLinks[]}`.
- **Desktop:** 4 cols + legal row.
- **Mobile:** Accordion sections.
- **States:** resting.
- **A11y:** `<footer role="contentinfo">`.
- **Routes:** all.

### NovaExitIntent
- **Purpose:** Stay22 Nova exit-intent surface.
- **Payload:** global `novaExitIntent` → `{headline,italicHeadline,body,ctaLabel,ctaHref,dismissLabel,minDwellSec}`.
- **Trigger:** `mouseleave` with `clientY ≤ 0` after `minDwellSec` (default 8s); one fire per session via sessionStorage.
- **Desktop:** Center modal, 12px stone shadow.
- **Mobile:** Bottom sheet variant.
- **States:** hidden · shown · dismissed.
- **A11y:** `role="dialog" aria-modal="true"`; focus trap; Esc dismisses.
- **Routes:** `/`, `/destinations/*`, `/best/*`.

### ImageWithFallback
- **Purpose:** Required wrapper for all images.
- **Payload:** `MediaRef` → R2 URL + alt text.
- **States:** loading · loaded · error→fallback.
- **A11y:** `alt` required; decorative images pass `alt=""`.
- **Routes:** all.
