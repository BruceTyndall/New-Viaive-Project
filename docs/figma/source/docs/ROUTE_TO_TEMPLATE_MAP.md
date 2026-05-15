# Route → Template Map

**Companion file:** `docs/routes.json`

Each route is bound to one **archetype** (`PAGE_ARCHETYPE_SPECS.md`), one **Payload collection or page**, and an ordered list of **components**.

| # | Route | Archetype | Payload | Components (in order) | Affiliate |
|---|---|---|---|---|---|
| 1 | `/` | homepage | `pages:home` | Nav · Hero · TrustBar · IntentRouter · Desks · Atlas · DestinationsRail · DestinationGuide×N · Standard · Editorial · StayModule · Proof · Brief · EmailCapture · FAQ · Footer · NovaExitIntent | ✓ |
| 2 | `/start-planning` | intake | `pages:start-planning` | Nav · Hero · IntentRouter · Brief · Proof · FAQ · Footer | — |
| 3 | `/concierge` | intake | `pages:concierge` | Nav · Hero · TrustBar · Brief · Standard · Proof · FAQ · Footer | — |
| 4 | `/desks/hotel` | desk | `desks:hotel` | Nav · Hero · StayModule · Editorial · Proof · FAQ · Brief · Footer | ✓ |
| 5 | `/desks/family` | desk | `desks:family` | Nav · Hero · Editorial · Proof · FAQ · Brief · Footer | — |
| 6 | `/desks/safari` | desk | `desks:safari` | Nav · Hero · Editorial · Proof · FAQ · Brief · Footer | — |
| 7 | `/desks/asia` | desk | `desks:asia` | Nav · Hero · DestinationsRail · Editorial · Proof · FAQ · Brief · Footer | ✓ |
| 8 | `/destinations/thailand` | destination | `destinations:bangkok` | Nav · DestinationGuide · StayModule · EmailCapture · FAQ · Footer · NovaExitIntent | ✓ |
| 9 | `/destinations/tokyo` | destination | `destinations:tokyo` | same as 8 | ✓ |
| 10 | `/destinations/paris` | destination | `destinations:paris` | same as 8 | ✓ |
| 11 | `/destinations/dubai` | destination | `destinations:dubai` | same as 8 | ✓ |
| 12 | `/best/tokyo-hotels` | best-of | `bestOf:tokyo-hotels` | Nav · Hero · Editorial · StayModule · FAQ · Footer · NovaExitIntent | ✓ |
| 13 | `/best/paris-hotels` | best-of | `bestOf:paris-hotels` | same as 12 | ✓ |
| 14 | `/compare/villa-vs-hotel` | compare | `compares:villa-vs-hotel` | Nav · Hero · FAQ · Brief · Footer | — |
| 15 | `/compare/direct-vs-advisor-vs-portal` | compare | `compares:direct-vs-advisor-vs-portal` | same as 14 | — |
| 16 | `/privacy` | legal | `legal:privacy` | Nav · Footer | — |
| 17 | `/terms` | legal | `legal:terms` | same | — |
| 18 | `/affiliate-disclosure` | legal | `legal:affiliate-disclosure` | same | — |

## Internal link graph (high-traffic edges)

```
/                   ←→ /destinations/* ←→ /best/* (same city)
/                    →  /concierge       →  Brief submit
/desks/asia          →  /destinations/tokyo, /destinations/thailand
/desks/hotel         →  /best/* + /compare/direct-vs-advisor-vs-portal
/destinations/*      →  /desks/<matching desk>
/affiliate-disclosure ← every footer
```

## Canonical / hreflang

- All routes canonical to themselves. No hreflang in Phase 1 (English only).
- `/best/*` pages set `<link rel="canonical">` to themselves, not to `/destinations/*` — they target distinct queries.
