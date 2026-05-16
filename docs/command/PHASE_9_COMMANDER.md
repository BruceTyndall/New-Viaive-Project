# Phase 9 Commander — Launch QA

**Paste this entire file as the first message of a new Claude Code session.**
**Model: Opus 4.7 (single agent — this phase requires judgment, not volume)**

---

## Your role

You are the Phase 9 QA agent for the Viaive project. This is the final phase before launch. Your job is to perform a comprehensive audit across all 18 routes and all systems, produce a signed-off QA report, and either clear the project for launch or produce a prioritized punch list.

You do NOT spawn sub-agents for this phase. You do the audit yourself.

---

## Pre-flight

```bash
git checkout main && git pull
git tag | grep green   # must show phase-8-seo-green (and all prior phases)
pnpm drift:check       # exit 0
npx tsc --noEmit       # 0 errors
pnpm dev:doppler &     # keep running throughout
```

---

## Audit sequence (run in this order, document each)

### 1. Route health — all 18 routes return 200

```bash
for r in \
  / /start-planning /concierge \
  /desks/hotel /desks/family /desks/safari /desks/asia \
  /destinations/thailand /destinations/tokyo /destinations/paris /destinations/dubai \
  /best/tokyo-hotels /best/paris-hotels \
  /compare/villa-vs-hotel /compare/direct-vs-advisor-vs-portal \
  /privacy /terms /affiliate-disclosure; do
  printf '%s → %s\n' "$r" "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:3000$r")"
done
```

Document: any non-200 is a P0 blocker.

### 2. TypeScript — zero errors

```bash
npx tsc --noEmit 2>&1 | tail -5
```

### 3. Drift check — zero violations, zero info

```bash
pnpm drift:check
```

Info items at 0 = all 18 routes exist. Any block or high = P0 blocker.

### 4. Design compliance — manual spot-check on 5 representative routes

Check these routes in the browser (or use curl to grep for violations):
- `/` (homepage — most complex)
- `/destinations/tokyo` (destination archetype)
- `/best/paris-hotels` (best-of archetype)
- `/compare/villa-vs-hotel` (compare archetype)
- `/affiliate-disclosure` (legal archetype)

For each, verify:
- No `border-radius` on primary surfaces (square corners)
- No `blur` in shadows or backdrop-filter
- No `#fff` / `#FFFFFF` background values
- Gold not on body copy
- Headlines above 24px use font-display (Fraunces)

```bash
# Quick token scan — grep for banned values in component output
for route in / /destinations/tokyo /best/paris-hotels /compare/villa-vs-hotel /affiliate-disclosure; do
  html=$(curl -s "http://localhost:3000$route")
  echo "=== $route ==="
  echo "$html" | grep -c "border-radius" && echo "  WARNING: border-radius found" || echo "  ✓ no border-radius"
  echo "$html" | grep -c "backdrop-filter" && echo "  WARNING: backdrop-filter found" || echo "  ✓ no backdrop-filter"
done
```

### 5. Affiliate compliance — every Stay22 link correct

```bash
# Check that all external hotel links contain stay22.com and rel attributes
for route in /desks/hotel /destinations/tokyo /best/tokyo-hotels; do
  html=$(curl -s "http://localhost:3000$route")
  echo "=== $route ==="
  echo "$html" | grep -c 'stay22.com' && echo "  stay22 links present" || echo "  WARNING: no stay22 links"
  echo "$html" | grep -c 'rel="sponsored' && echo "  ✓ sponsored rel present" || echo "  WARNING: missing sponsored rel"
  echo "$html" | grep -c 'data-analytics-id' && echo "  ✓ analytics-id present" || echo "  WARNING: missing analytics-id"
done
```

### 6. Sitemap + robots audit

```bash
curl http://localhost:3000/sitemap.xml | grep -c '<url>'   # should be 17
curl http://localhost:3000/robots.txt                        # should block /admin /api
```

### 7. JSON-LD audit

```bash
# Destination pages should have TouristDestination + FAQPage
curl -s http://localhost:3000/destinations/tokyo | grep -o '"@type":"[^"]*"' | sort | uniq

# Homepage should have Organization/TravelAgency
curl -s http://localhost:3000/ | grep -o '"@type":"[^"]*"' | sort | uniq

# Best-of should have ItemList
curl -s http://localhost:3000/best/tokyo-hotels | grep -o '"@type":"[^"]*"' | sort | uniq
```

### 8. Form submission flows — test Brief and EmailCapture

```bash
# EmailCapture
curl -s -X POST http://localhost:3000/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"qa-test-1@viaive.com"}' | jq .

# Brief (server action — test via form submit in browser or playwright)
# Navigate to /start-planning and submit a test brief
# Confirm it appears in Payload admin at http://localhost:3000/admin/collections/briefs
```

### 9. Mobile responsiveness — quick visual check

If a browser is available, check these at 375px width:
- Homepage hero collapses correctly
- Nav becomes hamburger
- DestinationsRail scrolls horizontally

If no browser available, document as "manual sign-off required".

### 10. Accessibility — automated check

Run the accessibility checker skill if available, or:
```bash
# Check for missing alt text on images
curl -s http://localhost:3000/ | grep -c '<img' 
curl -s http://localhost:3000/ | grep '<img' | grep -v 'alt=' | wc -l
# Target: 0 images without alt attribute
```

### 11. Performance budget

```bash
# Page weight check — homepage HTML should be under 150KB
curl -s http://localhost:3000/ | wc -c
```

---

## QA report — write to docs/qa/LAUNCH_QA_REPORT.md

Write a structured report with this format:

```markdown
# Launch QA Report

**Date:** [today]
**Agent:** Opus 4.7
**Phase:** 9

## Overall verdict: [LAUNCH READY / CONDITIONAL / BLOCKED]

## Checks

| Check | Result | Notes |
|-------|--------|-------|
| Route health (18/18 routes → 200) | ✅ / ❌ | ... |
| TypeScript (0 errors) | ✅ / ❌ | ... |
| Drift check (0 violations) | ✅ / ❌ | ... |
| Design tokens (no banned values) | ✅ / ❌ | ... |
| Affiliate compliance | ✅ / ❌ | ... |
| Sitemap (17 URLs) | ✅ / ❌ | ... |
| Robots.txt | ✅ / ❌ | ... |
| JSON-LD (all required schemas) | ✅ / ❌ | ... |
| Form flows (Brief + EmailCapture) | ✅ / ❌ | ... |
| Mobile responsiveness | ✅ / ❌ / Manual required | ... |
| Accessibility (no missing alts) | ✅ / ❌ | ... |

## P0 blockers (must fix before launch)
[list or "None"]

## P1 recommendations (should fix, not blocking)
[list or "None"]

## Sign-off
This project is [ready / not ready] to launch pending the items above.
```

---

## If P0 blockers are found

Fix them directly (you have full write access). Do not spawn sub-agents — just fix and re-verify.

After fixing all P0 blockers, re-run the full audit sequence and update the QA report.

---

## Tagging — only after zero P0 blockers

There is no phase-9 tag. Instead, create the launch tag:

```bash
git checkout main && git pull
git tag launch-ready-v1 main
git push origin launch-ready-v1
```

---

## Session close — tell Bruce

```
Phase 9 QA complete.

Verdict: [LAUNCH READY / CONDITIONAL / BLOCKED]

Full report: docs/qa/LAUNCH_QA_REPORT.md

Summary:
• Routes: 18/18 → 200
• TypeScript: 0 errors
• Drift: 0 violations
• P0 blockers: [N]
• P1 recommendations: [N]

[If LAUNCH READY]:
Tagged launch-ready-v1. The project is clear for production deployment.

Deployment checklist:
1. Set production Doppler config (DATABASE_URL, PAYLOAD_SECRET, all R2/Brevo/Stay22 keys)
2. Run pnpm build:doppler — must succeed
3. Deploy to hosting platform
4. Verify https://viaive.com/sitemap.xml
5. Submit sitemap to Google Search Console
6. Monitor Brevo dashboard for first email signups

[If BLOCKED]:
See P0 blockers in the QA report. Fix each, re-run the audit, and re-tag.
```

**This is the final phase. There is no next commander prompt.**
The chain is complete: 5b → 6 → 7 → 8 → 9 (launch).
