#!/usr/bin/env node
/**
 * Viaive drift check.
 *
 * MANDATORY at session start AND session end.
 * Exit 0 = no drift. Exit 1 = drift detected.
 * Writes a timestamped report to docs/qa/drift-check-YYYY-MM-DD-HHMM.json
 *
 * Checks:
 *  1. Frozen-area integrity (diff vs latest green tag in each phase)
 *  2. Off-plan routes (any page.tsx whose route is not in MASTER_ROUTES)
 *  3. Off-plan components (any tsx in src/components not in MASTER_COMPONENTS)
 *  4. Banned tokens in (site) and components (border-radius, blur, hard-coded hex whites/blacks)
 *  5. Stay22 affiliate compliance (every external hotel link goes through lib/stay22.ts)
 *  6. Font import compliance (no font imports outside src/styles/fonts.css)
 */

import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs'
import { readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const REPO = process.cwd()
const REPORT_DIR = join(REPO, 'docs/qa')

// ─── MASTER PLAN ─────────────────────────────────────────────────────────────
// If a route or component is not in these lists, it is drift.
// To change scope you must update both this file AND CLAUDE.md in the same commit.

const MASTER_ROUTES = new Set([
  '/',
  '/start-planning',
  '/concierge',
  '/desks/hotel',
  '/desks/family',
  '/desks/safari',
  '/desks/asia',
  '/destinations/thailand',
  '/destinations/tokyo',
  '/destinations/paris',
  '/destinations/dubai',
  '/best/tokyo-hotels',
  '/best/paris-hotels',
  '/compare/villa-vs-hotel',
  '/compare/direct-vs-advisor-vs-portal',
  '/privacy',
  '/terms',
  '/affiliate-disclosure',
])

// Internal-only routes that are not in the public 18 but are allowed.
const ALLOWED_INTERNAL_ROUTES = new Set([
  '/style-guide',
])

const MASTER_COMPONENTS = new Set([
  'Nav', 'Hero', 'TrustBar', 'IntentRouter', 'Desks', 'EmailCapture', 'Footer',
  'Atlas', 'Brief', 'DestinationGuide', 'DestinationsRail', 'Editorial', 'FAQ',
  'NovaExitIntent', 'Proof', 'Standard', 'StayModule',
])

// Frozen areas keyed by the green tag that froze them.
const FROZEN = [
  { tag: 'phase-2-schema-green',     paths: ['src/collections', 'src/globals', 'src/migrations', 'src/payload', 'src/blocks', 'src/fields', 'src/access'] },
  { tag: 'phase-3-tokens-green',     paths: ['src/styles'] },
  { tag: 'phase-4-components-green', paths: ['src/components'] },
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function sh(cmd) {
  try { return execSync(cmd, { cwd: REPO, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim() }
  catch (e) { return null }
}

function tagExists(tag) {
  return sh(`git tag --list ${tag}`) === tag
}

function walk(dir, predicate) {
  const out = []
  if (!existsSync(dir)) return out
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full, predicate))
    else if (predicate(full)) out.push(full)
  }
  return out
}

// Convert a Next.js (site) page.tsx absolute path to its route string.
function pageToRoute(absPath) {
  const rel = relative(join(REPO, 'src/app/(site)'), absPath).replace(/\\/g, '/')
  // e.g. "page.tsx" → "/"
  // e.g. "concierge/page.tsx" → "/concierge"
  // e.g. "desks/hotel/page.tsx" → "/desks/hotel"
  // e.g. "(internal)/style-guide/page.tsx" → "/style-guide"
  const noFile = rel.replace(/\/page\.tsx$/, '').replace(/^page\.tsx$/, '')
  if (noFile === '') return '/'
  // Strip Next.js route groups (parenthesised segments).
  const segments = noFile.split('/').filter(s => !s.startsWith('('))
  return '/' + segments.join('/')
}

// ─── CHECKS ──────────────────────────────────────────────────────────────────

const findings = []

function flag(severity, type, where, issue, fix) {
  findings.push({ severity, type, where, issue, fix })
}

// Check 1 — Frozen-area integrity
for (const { tag, paths } of FROZEN) {
  if (!tagExists(tag)) {
    flag('block', 'missing_tag', tag, `Green tag ${tag} does not exist — phase has not closed.`, `Tag the phase before building on top.`)
    continue
  }
  const diff = sh(`git diff ${tag}..HEAD -- ${paths.map(p => `"${p}"`).join(' ')}`)
  if (diff && diff.length > 0) {
    // Allowed: the Phase 4 Nav blur fix re-tag in flight. Otherwise any mod is drift.
    flag('high', 'frozen_area_modified', paths.join(', '),
      `Files under ${paths.join(', ')} differ from ${tag}.`,
      `Either revert the changes or, if the change is approved, re-tag ${tag} to the new head.`)
  }
}

// Check 2 — Off-plan routes
const pageFiles = walk(join(REPO, 'src/app/(site)'), p => p.endsWith('/page.tsx'))
for (const file of pageFiles) {
  const route = pageToRoute(file)
  if (MASTER_ROUTES.has(route)) continue
  if (ALLOWED_INTERNAL_ROUTES.has(route)) continue
  // Dynamic segments like /desks/[slug] are drift unless the master plan is updated.
  if (route.includes('[') && route.includes(']')) {
    flag('high', 'dynamic_route_not_in_plan', relative(REPO, file),
      `Dynamic route ${route} found. Master plan lists 18 explicit routes — dynamic segments need explicit approval and a CLAUDE.md update.`,
      `Replace with the explicit per-slug page.tsx files from the master plan, or update CLAUDE.md + this script.`)
    continue
  }
  flag('high', 'off_plan_route', relative(REPO, file),
    `Route ${route} is not in the 18-route master plan.`,
    `Delete the page or add ${route} to CLAUDE.md + MASTER_ROUTES in this script.`)
}

// Check 3 — Missing planned routes (informational)
const presentRoutes = new Set(pageFiles.map(pageToRoute))
for (const planned of MASTER_ROUTES) {
  if (!presentRoutes.has(planned)) {
    flag('info', 'planned_route_not_built', planned, `Route ${planned} is in the master plan but not yet implemented.`, `Build it in the assigned phase.`)
  }
}

// Check 4 — Off-plan components
const componentFiles = walk(join(REPO, 'src/components'), p => /\/[A-Z][a-zA-Z]+\.tsx$/.test(p))
for (const file of componentFiles) {
  const name = file.split('/').pop().replace(/\.tsx$/, '')
  if (!MASTER_COMPONENTS.has(name)) {
    flag('high', 'off_plan_component', relative(REPO, file),
      `Component ${name} is not in the 17-component master plan.`,
      `Delete or add ${name} to CLAUDE.md + MASTER_COMPONENTS in this script.`)
  }
}

// Check 5 — Banned tokens in non-frozen areas (frozen areas use git-diff check above)
// Internal route group (site)/(internal)/* is documentation — exempt from token rules.
const tokenTargets = walk(join(REPO, 'src/app/(site)'), p =>
  /\.(tsx|ts|css)$/.test(p) && !p.includes('/(internal)/')
)
const TOKEN_RULES = [
  { rx: /border-radius\s*:/i,        rule: 'border-radius — primary surfaces must use square corners' },
  { rx: /\bblur\(/i,                  rule: 'blur(...) — solid offsets only, no blurred shadows' },
  { rx: /#fff(?:fff)?\b/i,            rule: '#fff / #ffffff — use var(--paper) or var(--paper-alt)' },
  { rx: /backdrop-?filter\s*:/i,      rule: 'backdrop-filter — solid backgrounds only' },
]
for (const file of tokenTargets) {
  const text = readFileSync(file, 'utf8')
  for (const { rx, rule } of TOKEN_RULES) {
    if (rx.test(text)) {
      flag('high', 'banned_token', relative(REPO, file),
        `Banned design token used: ${rule}.`,
        `Replace with CSS variable from src/styles/tokens.css.`)
    }
  }
}

// Check 6 — Font import compliance
const fontImportTargets = walk(join(REPO, 'src'), p => /\.(tsx|ts|css|scss)$/.test(p) && !p.endsWith('src/styles/fonts.css'))
for (const file of fontImportTargets) {
  const text = readFileSync(file, 'utf8')
  if (/@import\s+url\([^)]*fonts\.googleapis\.com/i.test(text)
      || /next\/font/.test(text)
      || /@font-face/i.test(text)) {
    flag('high', 'off_font_import', relative(REPO, file),
      `Font imported outside src/styles/fonts.css.`,
      `Move the font import to src/styles/fonts.css — one import, one place.`)
  }
}

// Check 7 — Stay22 compliance (every external booking.com / agoda / hotels.com link must go through lib/stay22.ts)
const stay22Targets = walk(join(REPO, 'src'), p => /\.(tsx|ts)$/.test(p) && !p.endsWith('lib/stay22.ts'))
const RAW_AFFILIATE_HOSTS = /https?:\/\/(?:www\.)?(?:booking\.com|agoda\.com|hotels\.com|expedia\.com|stay22\.com)/i
for (const file of stay22Targets) {
  const text = readFileSync(file, 'utf8')
  if (RAW_AFFILIATE_HOSTS.test(text)) {
    flag('high', 'raw_affiliate_url', relative(REPO, file),
      `Raw affiliate URL found. All affiliate links must be generated via lib/stay22.ts.`,
      `Import buildStay22Url from '@/lib/stay22' and use it to construct the href.`)
  }
}

// ─── REPORT ──────────────────────────────────────────────────────────────────

const now = new Date()
const stamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 16)
if (!existsSync(REPORT_DIR)) mkdirSync(REPORT_DIR, { recursive: true })
const reportPath = join(REPORT_DIR, `drift-check-${stamp}.json`)

const counts = findings.reduce((acc, f) => { acc[f.severity] = (acc[f.severity] || 0) + 1; return acc }, {})
const report = {
  ran_at: now.toISOString(),
  branch: sh('git rev-parse --abbrev-ref HEAD'),
  head:   sh('git rev-parse --short HEAD'),
  counts,
  findings,
}
writeFileSync(reportPath, JSON.stringify(report, null, 2))

const blockers = findings.filter(f => f.severity === 'block' || f.severity === 'high')

console.log(`drift-check report → ${relative(REPO, reportPath)}`)
console.log(`  block: ${counts.block || 0}   high: ${counts.high || 0}   info: ${counts.info || 0}`)

if (blockers.length > 0) {
  console.log('')
  console.log('DRIFT DETECTED:')
  for (const f of blockers) {
    console.log(`  [${f.severity}] ${f.type} — ${f.where}`)
    console.log(`            ${f.issue}`)
    console.log(`        fix: ${f.fix}`)
  }
  process.exit(1)
}

console.log('clean — no drift.')
process.exit(0)
