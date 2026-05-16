# Viaive Repo Audit — 2026-05-15

**Scope:** Full structural inventory against the master plan in `CLAUDE.md`.
**Branch audited:** `claude/distracted-clarke-edcffb`
**Auditor:** repo-auditor skill

---

## TL;DR — Where we are in the total plan

| Phase | Plan model | Branch | Tag | State |
|---|---|---|---|---|
| 1 Bootstrap | — | — | — | ✅ FROZEN (commit `123925b`) |
| 2 Schema (10 collections, 6 globals, Stay22) | — | `phase-2-schema` | `phase-2-schema-green` | ✅ FROZEN |
| 3 CSS tokens (Tailwind v4) | — | `phase-3-tokens` | `phase-3-tokens-green` | ✅ FROZEN |
| 4 Components (7 of 17) | — | `phase-4-components` | `phase-4-components-green` | ✅ FROZEN |
| **5a Pages: arch + 7 unique routes** | **Sonnet 4.6** | **`phase-5a-pages-arch`** | **❌ no green tag** | **🟡 IN PROGRESS — scope drift, see below** |
| 5b Pages: pattern routes | Haiku 4.5 | `phase-5b-pages-patterns` | — | ⬜ NOT STARTED (and partially poached by 5a branch) |
| 6 Content & CMS seeding | Haiku 4.5 | `phase-6-content` | — | ⬜ NOT STARTED |
| 7 Integrations (Stay22, Brevo, R2) | Sonnet 4.6 | `phase-7-integrations` | — | ⬜ NOT STARTED |
| 8 SEO & performance | Sonnet 4.6 | `phase-8-seo` | — | ⬜ NOT STARTED |
| 9 Launch QA | Opus 4.7 | `phase-9-qa` | — | ⬜ NOT STARTED |

**Plan progress: 4 of 9 phases tagged green. Phase 5a is built on a branch but not green-tagged and has drift that must be resolved before merging.**

---

## Phase 5a drift findings (HIGH severity)

Branch `phase-5a-pages-arch` (commit `836d8c2`, by you on Fri May 15 18:26) added 13 files / 1,686 lines. Three problems:

### 1. Scope overrun — 5a built routes that belong to 5b

Master plan Phase 5a is exactly these 7 routes:
- `/` (extend to full spine)
- `/start-planning`
- `/concierge`
- `/desks/hotel`
- `/desks/family`
- `/desks/safari`
- `/desks/asia`

What `phase-5a-pages-arch` actually built:

| Route | In Phase 5a plan? | Verdict |
|---|---|---|
| `/start-planning` | ✅ yes | on-plan |
| `/concierge` | ✅ yes | on-plan |
| `/desks/[slug]` | ✅ yes (covers 4 specific desks via dynamic) | on-plan, but dynamic vs static — confirm OK |
| `/destinations` (index) | ❌ no | **5b territory** |
| `/destinations/[slug]` | ❌ no | **5b territory** |
| `/privacy` | ❌ no | **5b territory** |
| `/about` | ❌ no | **NOT IN MASTER PLAN AT ALL** |

### 2. Scope omission — the homepage was not extended

Master plan and `ROUTE_TO_TEMPLATE_MAP.md` require the homepage spine:
```
Nav → Hero → TrustBar → IntentRouter → Desks → Atlas → DestinationsRail
→ DestinationGuide×N → Standard → Editorial → StayModule → Proof
→ Brief → EmailCapture → FAQ → Footer → NovaExitIntent
```

The branch still renders only the 7-component Phase 4 shell:
```
Nav → Hero → TrustBar → IntentRouter → Desks → EmailCapture → Footer
```

10 components are missing (see #3).

### 3. Missing component layer — pages bypass the component contract

Phase 4 froze 7 components in `src/components/`. The master plan calls for **17 total** components (the full homepage spine). Phase 5a was meant to either port the remaining 10 from `docs/figma/source/src/app/components/` or treat them as a Phase 5a deliverable.

Instead, the branch wrote pages with **inline styles** (e.g. `src/app/(site)/about/page.tsx` is 137 lines of hand-written styled JSX, not a composition of shared components). This creates:
- Token drift risk (each page invents its own styling)
- Duplication across the 7 pages already built
- A larger, harder cleanup before tagging Phase 4 component contract intact

**Missing components (10):** Atlas, Brief, DestinationGuide, DestinationsRail, Editorial, FAQ, NovaExitIntent, Proof, Standard, StayModule

---

## Other findings

### Frozen-area integrity ✅

`git diff phase-4-components-green..HEAD` on `src/components/`, `src/styles/`, `src/payload/`, `src/collections/`, `src/globals/`, `src/migrations/` returns empty. No frozen files modified.

### Pre-existing design violation in frozen Phase 4 ⚠️

`src/components/Nav.tsx` contains:
```js
backdropFilter: scrolled ? 'blur(20px)' : 'none',
```
Violates the "No blur in shadows" non-negotiable rule. Shipped in Phase 4, now frozen. Needs your explicit approval to fix.

### Stale worktree branches (low severity housekeeping)

5 `claude/*` worktree branches exist; 4 are stale (0 commits ahead of main) and represent abandoned Claude sessions:
- `claude/brave-shirley-655916`
- `claude/fervent-goldwasser-cfce82`
- `claude/infallible-haslett-e076bd`
- `claude/jolly-pasteur-06d53d`

Safe to prune after confirming nothing uncommitted lives in their worktrees.

---

## Full inventory (counts)

| Category | Count |
|---|---|
| Total `.ts` / `.tsx` files | 42 |
| Components built (Phase 4) | 7 |
| Components still to port | 10 |
| Payload collections | 10 |
| Payload globals | 6 |
| Payload migrations | 3 |
| Payload blocks | 6 |
| Routes in master plan | 18 |
| Routes implemented on `main` | 1 (shell) |
| Routes implemented on `phase-5a-pages-arch` | 7 |
| Routes remaining for 5b after merge | 7 (best×2, compare×2, terms, affiliate-disclosure, plus possible spec gaps) |
| Design docs (markdown) | 24 |
| Spec JSON files | 5 |
| Screen captures (4 viewports × 18 routes) | 72 |
| Doppler env keys declared | 12 |

### Stack — all match `CLAUDE.md` ✅
Next 15.4.11 · React 19.2.6 · Payload 3.84.1 · Tailwind 4.3.0 · TypeScript 5.7.3

### Worktrees
| Path | Branch | Commit | Role |
|---|---|---|---|
| `/.../New Viaive Project` (primary repo) | `phase-5a-pages-arch` | `836d8c2` | Phase 5a work |
| `/.../.claude/worktrees/distracted-clarke-edcffb` | `claude/distracted-clarke-edcffb` | `cebdfa1` | this audit session |

---

## Recommended next actions (decisions for Bruce)

These are your calls. The audit can't make them.

1. **Decide on the 5a/5b overrun.** Two clean options:
   - **(A) Accept the overrun.** Treat `/destinations`, `/destinations/[slug]`, `/privacy` as already-done in 5a. Shrink Phase 5b scope to: best×2, compare×2, terms, affiliate-disclosure. Update `CLAUDE.md` to reflect.
   - **(B) Revert the overrun.** Strip those 4 routes from the 5a branch and rebuild them properly in 5b.
2. **Decide on `/about`.** Add to master plan or remove the page.
3. **Decide on dynamic vs static desks.** Branch uses `/desks/[slug]`. Plan calls for 4 named routes. Dynamic is more maintainable; confirm it's acceptable.
4. **Decide on the missing 10 components.** Three options:
   - **(C1) Port them as part of Phase 5a** — extends 5a scope, but produces a clean component contract before 5a closes.
   - **(C2) Refactor pages to use them in a new Phase 5a.5** — cleanest split.
   - **(C3) Ship 5a with inline styles, port components in Phase 6** — riskiest; carries token drift forward.
5. **Decide on Nav.tsx blur fix.** Approve a patch to the frozen file, or accept the violation.
6. **Prune stale claude/* branches.** One-line clean-up.

Once those six decisions are made, the next agent has a clean Phase 5a closeout brief.

---

## Artifacts produced by this audit

- `docs/qa/AUDIT_REPORT_2026-05-15.md` (this file)
- `docs/qa/repo_inventory.json` (structured machine-readable counts and findings)
