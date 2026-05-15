# Accessibility Specification

**Target:** WCAG 2.2 AA. The standard is **non-negotiable** — accessibility failures are P1 bugs.

---

## 1. Color & Contrast

| Pair | Ratio | Use |
|---|---|---|
| `#1a1a1a` on `#F9F7F2` | 16.6:1 | Body type |
| `#4A4A4A` on `#F9F7F2` | 7.4:1 | Secondary type |
| `#FFFFFF` on `#1a1a1a` | 16.6:1 | Type on dark sections |
| `#c8a96a` on `#1a1a1a` | 7.3:1 | Gold on stone (eyebrows, accents) |
| `#c8a96a` on `#F9F7F2` | 3.1:1 | **Display only ≥18.66pt regular / ≥14pt bold** — never body |

Gold body text is forbidden. Gold may be used for: ≥14pt SemiBold labels, icons (which carry their own a11y rules), borders, and focus rings.

---

## 2. Keyboard

- All interactive surfaces are operable by keyboard.
- Tab order follows visual order.
- `Esc` closes Nav sheet (mobile), NovaExitIntent modal, any open accordion in single-open mode (not applicable in our default).
- `Enter` and `Space` activate buttons; `Enter` activates links.
- Focus visible at all times — `outline: 2px solid #c8a96a; outline-offset: 4px;`. Never `outline: none` without replacement.
- Skip-to-content link at top of page, visible on focus.

---

## 3. Screen Readers

- Landmarks: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer role="contentinfo">`.
- One `<h1>` per page.
- Decorative SVGs have `aria-hidden="true"`.
- Meaningful icons paired with text are `aria-hidden` on the icon; icon-only buttons require `aria-label`.
- Iframes (Stay22 maps) carry `title="Stay22 [City] Map"`.
- Form errors announced via `aria-live="polite"` region.
- Brief submission success announced via `aria-live="polite"`.

---

## 4. Forms

- Every input has an associated `<label>` (not placeholder-only).
- Required fields marked with `aria-required="true"` and a visible "Required" hint, not just an asterisk.
- Error states use `aria-invalid="true"` + `aria-describedby` pointing to the error message id.
- `autocomplete` attributes set: `name`, `email`, `tel`, `country-name`, etc.
- Submit button is enabled by default; client-side validation only blocks on actual errors.

---

## 5. NovaExitIntent Modal

- `role="dialog" aria-modal="true"`.
- Focus moves to dismiss button on open.
- Focus trap implemented (Tab cycles inside modal).
- Esc dismisses.
- Background scroll locked while open.
- Returning focus to the trigger element is not applicable (this is mouseleave-triggered) — instead, focus returns to `<body>` on dismiss.

---

## 6. Animation

- `@media (prefers-reduced-motion: reduce)` disables: 2px-shift hover, shadow transitions, modal slide-ins, carousel auto-advance, smooth scroll.
- Opacity and color transitions are preserved (they don't trigger motion sensitivity).
- No content flashes more than 3 times per second.

---

## 7. Images & Media

- Every `<img>` has non-empty `alt` (or `alt=""` for decorative only — see `IMAGE_ASSET_DIRECTION.md`).
- No `<img>` with `alt="image"` or filename-as-alt.
- Stay22 iframes have descriptive `title`.
- No auto-playing audio. Period.

---

## 8. Typography

- Base body 18px. Never below 14px for any reader-facing copy except the 10–12px metadata strip, which carries higher contrast (7.4:1+) to compensate.
- Line height ≥1.6 on body.
- Measure ≤70ch on body.
- `letter-spacing` never set below `-0.025em` on display, never below `0` on body.
- Users can zoom to 200% without horizontal scroll or content loss.

---

## 9. Touch

- Minimum touch target 44×44px on mobile.
- Tap delay disabled (`touch-action: manipulation` on interactive surfaces).
- Hover-only states have keyboard + focus parity (already covered above).

---

## 10. Testing Cadence

- Automated: axe-core run in Playwright on every PR against the 18 launch routes.
- Manual: keyboard-only walkthrough of `/`, `/destinations/tokyo`, `/concierge`, `/best/tokyo-hotels` once per release.
- Screen reader spot-check: VoiceOver (Mac) on `/destinations/tokyo` once per release.
- Lighthouse a11y score must be ≥95 on every route before promotion to `live`.
