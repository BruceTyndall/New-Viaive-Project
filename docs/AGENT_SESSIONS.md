# Viaive — Agent Session Launcher

Each phase of the Viaive build runs as a separate Claude Code session.
Start each one from the **+** button in the Claude Code mobile app, or from
a fresh terminal window with `claude`.

Paste the prompt exactly as written. The first line becomes the session title
in the mobile app. The agent reads the handover, builds the phase, opens a PR,
and then asks for your review — which puts the session into **Needs input** so
you get a notification on your phone.

---

## How to start a session (mobile)

1. Open Claude Code app → tap **+** (top right)
2. Select the **New-Viaive-Project** repo
3. Paste the full prompt for the phase below
4. The session appears in your list as **Connected** while the agent works
5. When it needs approval it flips to **Needs input** — tap to respond
6. When the PR is open and you have merged it, reply `merged — start next phase`

---

## Phase 5 — Pages & Routing

**Session title (first line of prompt):**
```
Phase 5: Pages & Routing — Viaive
```

**Full prompt to paste:**
```
Phase 5: Pages & Routing — Viaive

You are Agent 5 in the Viaive sequential build. Phase 4 (components) is merged
and tagged phase-4-components-green on main.

Read these files before writing a single line of code:
- docs/figma/source/docs/PAGE_ARCHETYPE_SPECS.md
- docs/figma/source/docs/ROUTE_TO_TEMPLATE_MAP.md
- docs/figma/source/docs/IMPLEMENTATION_HANDOFF.md
- docs/AGENT_SESSIONS.md (this file — for workflow context)

Then run:
  git checkout main && git pull
  git tag | grep phase-4-components-green   # must exist before proceeding
  git checkout -b phase-5-pages
  pnpm dev:doppler

Your job:
1. Create all 18 launch routes as Next.js 15 App Router pages under src/app/(site)/
2. Wire Nav and Footer to fetch from Payload globals (navigation, footer) with
   static fallbacks when globals are empty
3. Every page gets correct Metadata / generateMetadata
4. All pages return 200 — verify with curl after each batch
5. npx tsc --noEmit must pass at 0 errors before you open the PR

All pages go inside src/app/(site)/. Use the Payload local API (getPayload +
payload.find / payload.findGlobal) — not REST. Components already exist in
src/components/ — import them, do not rewrite them.

Key constraint: any API route you add must NOT be under /api/ — Payload's
catch-all owns that namespace. Use /newsletter/*, /actions/*, etc.

When the PR is open, stop and ask Bruce to review it. Do not merge yourself.
Branch: phase-5-pages → PR target: main
```

**Status flow you'll see in the app:**
- **Connected** while the agent is building routes
- **Needs input** when it asks for PR review approval
- **Ready for review** once PR is open and agent is idle

---

## Phase 6 — Content & CMS Seeding

**Session title:** `Phase 6: Content & CMS Seeding — Viaive`

**Full prompt:**
```
Phase 6: Content & CMS Seeding — Viaive

You are Agent 6. Phase 5 (pages) is merged and tagged phase-5-pages-green.

Read docs/figma/source/docs/CMS_FIELD_MAPPING.md before starting.

Run:
  git checkout main && git pull
  git tag | grep phase-5-pages-green   # must exist
  git checkout -b phase-6-content
  pnpm dev:doppler

Your job (use Haiku 4.5 — content tasks, preserve credits):
1. Populate Payload globals via the admin UI or local API scripts:
   - navigation: brand, primaryLinks[], ctaLabel, ctaHref
   - footer: columns[], legalLinks[], disclosure
   - newsletter: title, lede, placeholder, consentText, successText
   - viaiveStandard: intro, criteria[]
   - proof: metrics[], quotes[]
2. Seed 3 destination documents (Tokyo, Maldives, Bangkok) using
   docs/figma/source/data/ as the source of truth
3. Seed 5 desk documents (hotel, family, safari, asia-intelligence, concierge)
4. Upload placeholder media to Cloudflare R2 for each seeded record
5. Verify every seeded record renders on its route (200 + content visible)

Do not touch src/components/ or src/app/(site)/ layout files.
Branch: phase-6-content → PR target: main
When PR is open, stop and ask Bruce to review.
```

---

## Phase 7 — Integrations

**Session title:** `Phase 7: Integrations — Viaive`

**Full prompt:**
```
Phase 7: Integrations — Viaive

You are Agent 7. Phase 6 (content) is merged and tagged phase-6-content-green.

Read:
- docs/figma/source/docs/AFFILIATE_MODULE_DESIGN_SPEC.md
- src/lib/stay22.ts (do not modify — just use it)

Run:
  git checkout main && git pull
  git tag | grep phase-6-content-green   # must exist
  git checkout -b phase-7-integrations
  pnpm dev:doppler

Your job:
1. Wire Stay22 embed into DestinationGuide sidebar (use lib/stay22.ts —
   never hand-write affiliate URLs)
2. Add affiliate disclosure on every Stay22 surface per AFFILIATE_MODULE_DESIGN_SPEC.md
3. Verify BREVO_API_KEY + BREVO_LIST_ID are in Doppler stg, then test
   /newsletter/subscribe end-to-end with a real email
4. Verify Cloudflare R2 image URLs resolve on all seeded destination pages
5. rel="sponsored nofollow" on every affiliate anchor — grep to confirm
6. NovaExitIntent component from docs/figma/source/src/app/components/NovaExitIntent.tsx
   — port it to src/components/NovaExitIntent.tsx using production patterns

Branch: phase-7-integrations → PR target: main
When PR is open, stop and ask Bruce to review.
```

---

## Phase 8 — SEO & Performance

**Session title:** `Phase 8: SEO & Performance — Viaive`

**Full prompt:**
```
Phase 8: SEO & Performance — Viaive

You are Agent 8. Phase 7 (integrations) is merged and tagged phase-7-integrations-green.

Read docs/figma/source/docs/SEO_GEO_CONTENT_BLOCK_SPEC.md before starting.

Run:
  git checkout main && git pull
  git tag | grep phase-7-integrations-green   # must exist
  git checkout -b phase-8-seo
  pnpm dev:doppler

Your job (use Haiku 4.5 — structured output tasks):
1. Verify every page has correct Metadata (title template, description, OG)
2. Add Organization + TravelAgency JSON-LD to the homepage
3. Add TouristDestination + FAQPage JSON-LD to every /destinations/[slug] page
4. Add ItemList JSON-LD to every /best/[slug] page
5. Generate sitemap.xml at src/app/sitemap.ts
6. Generate robots.txt at src/app/robots.ts
7. Add scroll-margin-top: 96px to all anchor target sections (nav clearance)
8. Run Lighthouse via CLI on / and one destination page — report scores

Acceptance gates: Lighthouse SEO ≥ 95, a11y ≥ 95 on every route.
Branch: phase-8-seo → PR target: main
When PR is open, stop and ask Bruce to review.
```

---

## Phase 9 — Launch QA

**Session title:** `Phase 9: Launch QA — Viaive`

**Full prompt:**
```
Phase 9: Launch QA — Viaive

You are Agent 9 (final QA gate). Phase 8 (SEO) is merged and tagged
phase-8-seo-green. Use Claude Opus 4.7 for this phase — nuanced judgment required.

Run:
  git checkout main && git pull
  git tag | grep phase-8-seo-green   # must exist
  git checkout -b phase-9-qa
  pnpm dev:doppler

Your job:
1. Run npx tsc --noEmit — must be 0 errors
2. Run pnpm build:doppler — must succeed with no warnings
3. Curl every one of the 18 launch routes — all must return 200
4. Run the Playwright smoke suite: pnpm playwright test
5. Check every page for:
   - No border-radius on primary surfaces
   - No blur in shadows
   - No #fff / #ffffff backgrounds (only --paper)
   - Gold never used on body copy
   - rel="sponsored nofollow" on all Stay22 links
   - Affiliate disclosure visible on every Stay22 surface
6. Check Payload admin /admin still renders (CSS isolation)
7. Verify NovaExitIntent fires once per session, dismissible via Esc
8. Submit a test brief via /concierge — confirm it writes to briefs collection
9. Produce a final QA report as a comment on this session

If any gate fails, fix it before marking complete.
When all gates pass, output: PHASE 9 COMPLETE — READY FOR LAUNCH.
Then ask Bruce for go/no-go on production deployment.
```

---

## Phase status at a glance

| Phase | Branch | Tag | Status |
|---|---|---|---|
| 1 — Bootstrap | — | — | ✅ Frozen |
| 2 — Schema | `phase-2-schema` | `phase-2-schema-green` | ✅ Frozen |
| 3 — CSS Tokens | `phase-3-tokens` | `phase-3-tokens-green` | ✅ Frozen |
| 4 — Components | `phase-4-components` | pending merge | 🔜 PR #3 open |
| 5 — Pages | `phase-5-pages` | — | ⬜ Not started |
| 6 — Content | `phase-6-content` | — | ⬜ Not started |
| 7 — Integrations | `phase-7-integrations` | — | ⬜ Not started |
| 8 — SEO | `phase-8-seo` | — | ⬜ Not started |
| 9 — Launch QA | `phase-9-qa` | — | ⬜ Not started |

---

## Rules every agent must follow

- Check the phase tag exists before starting — never build on an unreviewed phase
- `git checkout main && git pull` before creating the branch
- `npx tsc --noEmit` at 0 errors before opening a PR
- No `border-radius` · No `blur` in shadows · No `#fff` backgrounds
- Gold (`--gold`) never on body copy
- All public pages under `src/app/(site)/` — never in root `src/app/`
- Any API route outside `/api/` — Payload owns that namespace
- Do not merge your own PR — stop and ask Bruce
