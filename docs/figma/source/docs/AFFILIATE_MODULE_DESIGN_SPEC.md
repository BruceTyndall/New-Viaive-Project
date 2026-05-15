# Affiliate Module Design Specification

**Active partner:** Stay22 (LMA ID `STAY22_PARTNER_ID_PLACEHOLDER`, AID `STAY22_AID_PLACEHOLDER`).
**Features used:** Spark (auto-linking), Nova (exit-intent), LinkSwap (deep-linking), LMA script (map embeds).
**Placeholder partners:** TBD — Capella Hotels direct API, Mandarin Oriental partner program, NetJets, Symphony Yachts. All are visually scaffolded but inactive until contracts close.

---

## 1. Three Affiliate Surfaces

### A. Inline Deep Link (in-body)
Hotel names inside destination guide `sections[].body` use `{{Hotel Name}}` markers. At render, `renderBody()` substitutes:

```html
<a href="https://www.stay22.com/allez/booking?aid=viaive&q=Aman%20Tokyo,%20Tokyo"
   rel="sponsored nofollow"
   data-analytics-id="dest-tokyo:link:aman-tokyo"
   class="underline decoration-[#c8a96a] decoration-2 underline-offset-4 hover:text-[#c8a96a]">
  Aman Tokyo
</a>
```

**Disclosure:** Carried by the parent destination page footer disclosure — every page with inline affiliate anchors must include a visible disclosure within 100vh of the first link.

### B. Sticky Sidebar (DestinationGuide)
Sidebar carries:
1. **Stay22 Map Widget** — iframe embedded via `stay22MapEmbedUrl({lat,lng,zoom,city})`, lazy-loaded, `title` attribute set, 4:5 aspect ratio.
2. **Audited hotel list** — 8 rows of hotel cards, each a Stay22 deep link.

Sidebar carries its own footer disclosure: "Affiliate · We may earn from bookings at no cost to you."

### C. StayModule (search surface)
Standalone block with destination/dates/guests/tier inputs that POSTs to Stay22's search endpoint with AID prefilled. Disclosure rendered as the final field-row caption.

---

## 2. Disclosure Rules (FTC)

- **Visibility:** Disclosure text is ≥10px, contrast ≥4.5:1, in normal flow — never tooltip, never overlay, never `display:none` until hover.
- **Proximity:** A disclosure must appear within the same component as the affiliate link, OR within 100vh on long pages.
- **Plain language:** "Affiliate · We may earn from bookings at no cost to you." This exact string. No "ads", no "sponsored content", no asterisks.
- **Linkability:** Every disclosure includes a passive link to `/affiliate-disclosure` (achieved via the always-visible footer disclosure).
- **rel attribute:** All affiliate anchors carry `rel="sponsored nofollow"`. Never just `nofollow`. Never `sponsored` alone.

---

## 3. Stay22 Configuration

**Script load:** Once globally via `loadStay22Script()` in `App.tsx` `useEffect`. Idempotent.

```ts
export const STAY22_LMA_ID = "STAY22_PARTNER_ID_PLACEHOLDER";
export const STAY22_AID = "STAY22_AID_PLACEHOLDER";

export function loadStay22Script() {
  if (document.getElementById("stay22-lma")) return;
  const s = document.createElement("script");
  s.id = "stay22-lma";
  s.async = true;
  s.src = `https://scripts.stay22.com/letmeallez.js?lmaID=${STAY22_LMA_ID}`;
  document.head.appendChild(s);
}
```

**Deep link generator:** `stay22DeepLink(hotel: string, city: string)` returns the AID-prefixed `/allez/booking` URL with `q=` URL-encoded "Hotel, City".

**Map embed:** `stay22MapEmbedUrl({lat,lng,zoom,city})` returns iframe URL with AID parameter for revenue attribution on map-originated bookings.

---

## 4. Placement Strategy (by archetype)

| Archetype | Surface A (inline) | Surface B (sidebar) | Surface C (module) | Nova |
|---|---|---|---|---|
| Homepage | ✓ (in embedded DestinationGuides) | ✓ (same) | ✓ | ✓ |
| Destination | ✓ (heavy) | ✓ | — | ✓ |
| Best-of | ✓ (per ranked row) | — | ✓ | ✓ |
| Desk (Hotel, Asia) | — | — | ✓ | ✓ |
| Desk (Family, Safari, Concierge) | — | — | — | — |
| Intake / Compare / Legal | — | — | — | — |

Concierge and Brief flows are **affiliate-free**. We never compete with ourselves at the moment of conversion.

---

## 5. Analytics Instrumentation

Every affiliate click fires:

```
data-analytics-id="<route>:<surface>:<intent>"
```

Examples:
- `dest-tokyo:link:aman-tokyo` (inline deep link)
- `dest-tokyo:sidebar:aman-tokyo` (sidebar)
- `home:rail:destination-tokyo` (rail card)
- `best-tokyo-hotels:rank-1:aman-tokyo` (best-of row)
- `nova-exit:cta:start-planning` (Nova CTA)

This is the only event taxonomy we attribute revenue against. The 14-day revenue test plan (in `IMPLEMENTATION_HANDOFF.md`) reads from this.

---

## 6. Placeholder (Inactive) Partners

Inactive partner blocks render as **visual scaffolds with a disabled state**:

- Opacity 60%
- Hover signature suppressed
- Click is a no-op
- Tooltip on hover: "Partner integration pending — book directly via Concierge"
- An admin badge in Payload Admin reads "Inactive — placeholder only"

Editors swap these to `active=true` in the partner record once contracts close; the visual switches to a fully styled card automatically.

---

## 7. Anti-patterns

- ❌ Cloaked URLs (we always show the destination domain)
- ❌ Pop-under windows
- ❌ Auto-redirect on page load
- ❌ Multiple stacked disclosures (looks performative)
- ❌ Affiliate links inside FAQ answers — FAQs feed AI Overviews and affiliate links there look spammy
- ❌ Affiliate links inside Brief intake forms or legal pages
