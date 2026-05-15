# Page Archetype Specifications

Seven archetypes cover all 18 launch routes. Adding a new route should always be a question of *which archetype*, never *invent a new layout*.

---

## 1. Homepage

**Purpose:** Surface every value prop in one scroll. Funnel to Concierge or Stay22.

**Spine:** Hero → TrustBar → IntentRouter → Desks → Atlas → DestinationsRail → embedded DestinationGuides (Maldives, Tokyo, Bangkok) → Standard → Editorial → StayModule → Proof → Brief → EmailCapture → FAQ.

**SEO/GEO role:** Brand HQ. Carries Organization + TravelAgency JSON-LD. Below-fold FAQ feeds AI Overviews.

**CTA strategy:** Primary "Start Planning" in Hero + Brief. Stay22 deep links inside embedded DestinationGuides.

**Mobile:** Every rail collapses to 1-up; sticky sidebars unstick; nav becomes hamburger.

---

## 2. Intake (Start Planning / Concierge)

**Purpose:** Capture qualified leads.

**Spine:** Hero → optional IntentRouter (Start Planning only) → Brief → Standard or Proof → FAQ.

**Rules:**
- One primary CTA (the form submit). No competing rails.
- TrustBar appears on `/concierge` only (post-decision reassurance).
- Brief writes to Payload collection `briefs` with `intent`, `desk`, `dates`, `budget`, `notes`.

**SEO/GEO role:** Bottom-funnel; not optimized for discovery but must answer "how does this work" FAQ.

**Mobile:** Brief becomes single-column wizard with `step/of` chrome.

---

## 3. Desk

**Purpose:** Position one of five service desks; convert to Brief.

**Spine:** Hero → optional StayModule (Hotel/Asia) or DestinationsRail (Asia) → Editorial → Proof → FAQ → Brief.

**Rules:**
- Desk hero includes `leadTime`, `priceFloor`, `specialties[]` as a meta strip.
- Sample briefs surface in Editorial component (3 anonymized case studies).
- Brief at bottom prefills `desk` field.

**SEO/GEO role:** Mid-funnel category landing. FAQ answers "why an advisor vs direct."

**Mobile:** Standard stack; meta strip wraps to two rows.

---

## 4. Destination

**Purpose:** Long-form editorial that drives Stay22 deep links + Concierge briefs.

**Spine:** DestinationGuide (full) → StayModule → EmailCapture → FAQ.

**Rules:**
- Body content uses `{{Hotel Name}}` markers that resolve to Stay22 deep links.
- Sticky sidebar carries Stay22 map iframe + 8 audited hotels.
- 2026 Watchlist block (Opening/Refurb/Watch) is the GEO advantage — fresh-data signal that AI Overviews favor.
- TouristDestination + FAQPage JSON-LD emitted.

**SEO/GEO role:** Pillar page. Targets "where to stay [city] luxury" + "best hotels [city] 2026."

**Mobile:** Sidebar drops below body; map renders at 4:5.

---

## 5. Best-of

**Purpose:** Capture comparison-stage traffic; aggressive Stay22 affiliate.

**Spine:** Hero → Intro paragraph → ranked list (8 items) → Methodology → StayModule → FAQ.

**Rules:**
- Each ranking row: rank chip · hotel name · verdict · 1-sentence note · "Check rates" Stay22 deep link.
- Methodology section is required for trust (and AI Overview citations).
- ItemList JSON-LD emitted with each rank.

**SEO/GEO role:** "Best hotels [city] 2026" SERP.

**Mobile:** Rows stack with sticky rank chip.

---

## 6. Compare

**Purpose:** Convert indecisive buyers to Concierge brief.

**Spine:** Hero → Comparison table → Verdict block → FAQ → Brief.

**Rules:**
- Comparison table renders as side-by-side on desktop, stacked pros/cons on mobile.
- Verdict block contains a single recommendation (no fence-sitting).
- No affiliate placements — these pages exist to drive Brief.

**SEO/GEO role:** "X vs Y" SERP.

**Mobile:** Table → stacked pros/cons.

---

## 7. Legal

**Purpose:** Compliance + FTC affiliate disclosure.

**Spine:** Nav → richText body → Footer.

**Rules:**
- Body capped at 70ch.
- `lastUpdated` field renders at top.
- Affiliate disclosure page additionally renders a `partners[]` table.
- All legal pages link to each other in footer.

**SEO/GEO role:** Affiliate disclosure is frequently cited by AI Overviews — keep canonical and crawlable.

**Mobile:** Single column.
