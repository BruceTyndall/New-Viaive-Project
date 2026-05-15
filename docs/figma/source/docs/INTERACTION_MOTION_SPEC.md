# Interaction & Motion Specification

The Stone & Paper aesthetic is **decisive but quiet**. Motion exists to confirm action, never to entertain.

---

## 1. Easing & Duration

| Token | Curve | Use |
|---|---|---|
| `ease-stone` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | Decisive in/out — buttons, links, press patterns |
| `ease-paper` | `cubic-bezier(0.4, 0, 0.2, 1)` | Settle — modals, sidebars, drawers |

| Duration | ms | Use |
|---|---|---|
| `fast` | 150 | Micro hover, focus ring |
| `base` | 200 | Press, color, border |
| `slow` | 300 | Rail tile hover signature, accordion expand |
| `scroll` | 600 | Anchor scrolls (DestinationsRail → DestinationGuide) |

---

## 2. The Press Pattern (signature)

Every interactive Stone surface uses **the press**: on hover, it translates +2px/+2px and collapses its solid shadow to zero. On release it springs back.

```tsx
className="
  shadow-[6px_6px_0_0_#1a1a1a]
  hover:translate-x-[2px] hover:translate-y-[2px]
  hover:shadow-[0_0_0_0]
  transition-all duration-200
"
```

**When to use:** Cards in IntentRouter, DestinationsRail tiles, hero CTA, exit-intent CTA, every primary button.

**When NOT to use:** Inline text links, FAQ accordion triggers, form inputs, anything inside a scrolling list (causes jitter).

---

## 3. Hover States

| Surface | Hover signature |
|---|---|
| Affiliate anchor (text) | Color → `#c8a96a`; underline thickens to 2px decoration |
| Stone tile (dark) | Border `white/20` → `#c8a96a`; shadow appears `6px 6px 0 #c8a96a` |
| Paper card (light) | Press pattern (above) |
| Primary CTA | Background `#1a1a1a` → `#c8a96a`; press pattern |
| Nav link | Underline extends from 0 → 100% over 200ms |
| Hotel list row | Background `transparent` → `#F9F7F2` (already on paper, subtle) |

All hover states must also fire on `focus-visible` for keyboard parity.

---

## 4. Focus

Focus ring: `outline: 2px solid #c8a96a; outline-offset: 4px;` — gold, offset enough to clear stone borders. Never `outline: none` without a replacement focus indicator.

Form inputs: focus shifts border from `#1a1a1a` to `#c8a96a` and adds inner gold rule.

---

## 5. Scroll Behavior

- **Anchor scroll:** `scroll-behavior: smooth` globally. DestinationsRail tiles scroll to `#destination-{slug}` over 600ms.
- **Scroll offset:** Sections that are anchor targets carry `scroll-margin-top: 96px` to clear the fixed nav.
- **Nav border:** Below 80px scroll, nav has no bottom border. After 80px, 2px stone border slides in over 200ms.

---

## 6. Accordion (FAQ)

- Closed → Open: 300ms `ease-paper` height transition + 200ms `ease-stone` chevron rotation 0→90°.
- One open at a time is **not** enforced — readers may want to compare answers.

---

## 7. NovaExitIntent

- **Trigger:** `mouseleave` event where `e.clientY ≤ 0`, after `minDwellSec` (default 8s).
- **Suppression:** Fires once per session via `sessionStorage["nova:fired"]="1"`. Also suppressed if user has already submitted a Brief.
- **Entry:** Desktop — fade-in over 200ms + scale 0.96→1 over 300ms `ease-paper`. Mobile — slide from bottom over 300ms.
- **Exit:** Reverse on click of dismiss button or Esc.
- **Focus:** Moves to dismiss button on open; trapped within modal until close.

---

## 8. Form Submission

- **Submitting:** Submit button background → `#4A4A4A`, label → "Sending…"; disabled.
- **Success:** Button → `#5f7a5b` (success editorial) for 1.2s; success text appears below; form fields reset.
- **Error:** Border + label → `#a06a2c`; error text in `aria-live="polite"` region below the offending field.

---

## 9. Image Loading

- Hero: eager + `fetchpriority="high"`.
- Below-fold: lazy.
- On load: fade from `opacity-0` to `opacity-100` over 200ms; no slide, no scale.
- On error: `ImageWithFallback` swaps to brand placeholder; no flash of broken icon.

---

## 10. Don'ts

- ❌ Spring physics or bounce
- ❌ Parallax
- ❌ Auto-playing video or carousels longer than 3 items
- ❌ Marquee
- ❌ "Reveal on scroll" fade-ups (we already write declaratively — extra fade just delays content)
- ❌ Sound
- ❌ Any animation > 600ms outside of anchor scroll
