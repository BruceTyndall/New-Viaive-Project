# Handover — Phase 5a

**Generated:** 2026-05-15 (audit + drift-fix session)
**For the next agent picking up Phase 5a**

---

## ⚠️ Model to use for this phase: **Sonnet 4.6**

Per the phase table in [CLAUDE.md](../CLAUDE.md). Do not start this work on Haiku — the component-port work touches enough files that Sonnet's larger context and stronger reasoning matter.

---

## What just happened

The previous Phase 5a attempt (commit `836d8c2` on branch `phase-5a-pages-arch`) **drifted from the master plan** in three ways:

1. Built routes that belong to Phase 5b (`/destinations`, `/destinations/[slug]`, `/privacy`)
2. Built `/about`, which is not in the master plan at all
3. Skipped the 10-component port and wrote pages with inline styles instead

Per Bruce's directive ("no drift, 100%"), that branch is being abandoned. You start clean from main.

A separate fix landed in **this** session:
- `src/components/Nav.tsx` — removed `backdropFilter: blur(20px)` (design rule violation), fixed off-plan link targets, restructured the dropdowns to map only to the 18 planned routes.
- Added `scripts/drift-check.mjs` + `pnpm drift:check` — the gate you must pass at session start and session end.
- Rewrote [CLAUDE.md](../CLAUDE.md) with the zero-drift policy and per-phase model assignments.

---

## Before you do ANYTHING

```bash
# 1. Pick up the merged main with the Nav fix + drift check tooling
git checkout main && git pull

# 2. Confirm Phase 4 was re-tagged after the Nav blur fix
git tag --contains $(git rev-parse main) | grep phase-4-components-green
#   → must print "phase-4-components-green"
#   If not: the Nav-fix PR has not been re-tagged yet. Stop and tell Bruce.

# 3. Confirm zero drift on main
pnpm drift:check
#   → must exit 0 ("clean — no drift.")
#   If it doesn't, stop and tell Bruce.

# 4. Confirm the abandoned 5a branch is gone
git branch -a | grep phase-5a-pages-arch
#   → should print nothing. If it still exists, ask Bruce whether to delete:
#   git branch -D phase-5a-pages-arch
#   git push origin --delete phase-5a-pages-arch

# 5. Start fresh
git checkout -b phase-5a-pages
pnpm dev:doppler
```

---

## Phase 5a — exact scope

Two deliverables. Do them in this order.

### Deliverable 1 — Port the 10 missing components (prerequisite)

The master plan has 17 components. Phase 4 built 7. Build the remaining 10 first, **before** any page work. Source files live in `docs/figma/source/src/app/components/`.

Each component must:
- Use `var(--paper)`, `var(--stone)`, `var(--gold)` etc. — no hard-coded hex
- Use solid offset shadows from `src/styles/tokens.css` — no `blur(...)` or `backdrop-filter`
- Square corners — no `border-radius` on primary surfaces
- Be a **presentational** component — props in, JSX out. No Payload fetches inside the component.
- Carry `data-analytics-id="<route-or-slot>:<intent>"` on every interactive element

| # | Component | Source | Notes |
|---|---|---|---|
| 1 | `Atlas` | `docs/figma/source/src/app/components/Atlas.tsx` | Homepage destination grid |
| 2 | `Brief` | `docs/figma/source/src/app/components/Brief.tsx` | Lead-capture form. Submit handler → server action that writes to `briefs` collection |
| 3 | `DestinationGuide` | `docs/figma/source/src/app/components/DestinationGuide.tsx` | Pillar destination page body. Uses `{{Hotel Name}}` markers resolved via `lib/stay22.ts` |
| 4 | `DestinationsRail` | `docs/figma/source/src/app/components/DestinationsRail.tsx` | Horizontal rail of destination cards |
| 5 | `Editorial` | `docs/figma/source/src/app/components/Editorial.tsx` | Anonymised case-study blocks |
| 6 | `FAQ` | `docs/figma/source/src/app/components/FAQ.tsx` | Accordion. Emits FAQPage JSON-LD |
| 7 | `NovaExitIntent` | `docs/figma/source/src/app/components/NovaExitIntent.tsx` | Exit-intent modal, z-index `--z-exit-intent` (90) |
| 8 | `Proof` | `docs/figma/source/src/app/components/Proof.tsx` | Social proof / testimonials block |
| 9 | `Standard` | `docs/figma/source/src/app/components/Standard.tsx` | "The Viaive Standard" content block |
| 10 | `StayModule` | `docs/figma/source/src/app/components/StayModule.tsx` | Stay22 hotel module with audited list. All hrefs via `lib/stay22.ts` |

Each one lands at `src/components/<Name>.tsx`. After each, run `pnpm drift:check` — it should still exit 0 because the component name is in the master list.

### Deliverable 2 — Build the 7 Phase 5a routes

In this order, one PR each is fine if you prefer, or one bundled. Bruce will tell you on the first AskUserQuestion.

| # | Route file | Archetype | Spine (per ROUTE_TO_TEMPLATE_MAP.md) |
|---|---|---|---|
| 1 | `src/app/(site)/page.tsx` (extend existing) | homepage | Nav · Hero · TrustBar · IntentRouter · Desks · Atlas · DestinationsRail · DestinationGuide×3 · Standard · Editorial · StayModule · Proof · Brief · EmailCapture · FAQ · Footer · NovaExitIntent |
| 2 | `src/app/(site)/start-planning/page.tsx` | intake | Nav · Hero · IntentRouter · Brief · Proof · FAQ · Footer |
| 3 | `src/app/(site)/concierge/page.tsx` | intake | Nav · Hero · TrustBar · Brief · Standard · Proof · FAQ · Footer |
| 4 | `src/app/(site)/desks/hotel/page.tsx` | desk | Nav · Hero · StayModule · Editorial · Proof · FAQ · Brief · Footer |
| 5 | `src/app/(site)/desks/family/page.tsx` | desk | Nav · Hero · Editorial · Proof · FAQ · Brief · Footer |
| 6 | `src/app/(site)/desks/safari/page.tsx` | desk | Nav · Hero · Editorial · Proof · FAQ · Brief · Footer |
| 7 | `src/app/(site)/desks/asia/page.tsx` | desk | Nav · Hero · DestinationsRail · Editorial · Proof · FAQ · Brief · Footer |

**No dynamic segments.** Each desk gets its own folder. The master plan and drift check enforce this.

**Each page is a server component** that fetches via the Payload local API and passes data as props:
```ts
import { getPayload } from 'payload'
import config from '@payload-config'
const payload = await getPayload({ config })
const desk = await payload.find({ collection: 'desks', where: { slug: { equals: 'hotel' } }, limit: 1 })
```

**Cherry-pick the briefs server-action pattern from the abandoned branch:**
```bash
git show 836d8c2 -- 'src/app/(site)/_actions/brief.ts' > src/app/\(site\)/_actions/brief.ts
```
That file is the one piece of the previous attempt worth keeping. Review it before committing — it's ~30 lines.

---

## Verification before opening the PR

```bash
pnpm drift:check                   # exit 0 required
npx tsc --noEmit                   # 0 errors required
for r in / /start-planning /concierge /desks/hotel /desks/family /desks/safari /desks/asia; do
  printf '%s → %s\n' "$r" "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000$r")"
done
# Every route must print 200
```

---

## Reference files (read these first, in this order)

1. [CLAUDE.md](../CLAUDE.md) — zero-drift policy + phase model assignments
2. [docs/qa/AUDIT_REPORT_2026-05-15.md](qa/AUDIT_REPORT_2026-05-15.md) — what drifted and why
3. [docs/figma/source/docs/PAGE_ARCHETYPE_SPECS.md](figma/source/docs/PAGE_ARCHETYPE_SPECS.md) — the 7 archetypes
4. [docs/figma/source/docs/ROUTE_TO_TEMPLATE_MAP.md](figma/source/docs/ROUTE_TO_TEMPLATE_MAP.md) — route ↔ component mapping
5. [docs/figma/source/docs/CMS_FIELD_MAPPING.md](figma/source/docs/CMS_FIELD_MAPPING.md) — Payload field shapes
6. [docs/figma/source/docs/design-tokens.json](figma/source/docs/design-tokens.json) — the source of truth for tokens
7. `docs/screens/<route>-{320,768,1280,1920}.png` — Figma screen references per route

---

## When you finish Phase 5a

After Bruce replies "approved and merged" to your PR:

```bash
git checkout main && git pull
git tag phase-5a-pages-green main
git push origin phase-5a-pages-green
pnpm drift:check        # must exit 0 — confirms green state
```

Then rewrite **this file** for the next agent with:
- Header: `## ⚠️ Model to use for this phase: Haiku 4.5` (Phase 5b)
- The exact route folders to create for the 11 Phase 5b routes
- Any Phase 5a learnings worth carrying forward

The chain continues: 5b (Haiku) → 6 (Haiku) → 7 (Sonnet) → 8 (Sonnet) → 9 (Opus). Each handover names the next model.

---

## What NOT to do

- Do **not** build `/about` — not in the plan
- Do **not** build `/destinations/*` or `/best/*` or `/compare/*` — those are Phase 5b
- Do **not** build `/privacy`, `/terms`, `/affiliate-disclosure` — those are Phase 5b
- Do **not** use dynamic `[slug]` route segments — every route is a discrete folder
- Do **not** fetch data inside components — server pages fetch, components receive props
- Do **not** modify any Phase 2/3/4 frozen file without telling Bruce first
- Do **not** import a font outside `src/styles/fonts.css`
- Do **not** construct an affiliate URL outside `lib/stay22.ts`
- Do **not** skip `pnpm drift:check` at session start or session end
