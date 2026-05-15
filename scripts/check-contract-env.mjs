const expectedSupabaseProjectRef = 'pjsketbxfuuxdoqojals'
const expectedDatabases = new Set(['payload_prod', 'payload_staging'])

function resolveEnv(name, aliases = []) {
  for (const key of [name, ...aliases]) {
    if (process.env[key]) {
      return { name, source: key, value: process.env[key] }
    }
  }

  return { name, source: null, value: '' }
}

const database = resolveEnv('DATABASE_URL', ['DATABASE_URI'])
const payloadSecret = resolveEnv('PAYLOAD_SECRET')
const r2AccountId = resolveEnv('R2_ACCOUNT_ID')
const r2AccessKey = resolveEnv('R2_ACCESS_KEY_ID')
const r2Secret = resolveEnv('R2_SECRET_ACCESS_KEY')
const r2Bucket = resolveEnv('R2_BUCKET')
const r2PublicURL = resolveEnv('NEXT_PUBLIC_R2_PUBLIC_URL', ['R2_PUBLIC_URL'])
const stay22Lma = resolveEnv('STAY22_LMA_ID')
const stay22Aid = resolveEnv('STAY22_AID')
const siteURL = resolveEnv('NEXT_PUBLIC_SITE_URL')
const posthogKey = resolveEnv('POSTHOG_KEY')
const sentryDsn = resolveEnv('SENTRY_DSN')

const derivedR2Endpoint = process.env.R2_ENDPOINT
  ? { source: 'R2_ENDPOINT', value: process.env.R2_ENDPOINT }
  : r2AccountId.value
    ? {
        source: 'derived:R2_ACCOUNT_ID',
        value: `https://${r2AccountId.value}.r2.cloudflarestorage.com`,
      }
    : null

const required = [
  database,
  payloadSecret,
  r2AccountId,
  r2AccessKey,
  r2Secret,
  r2Bucket,
  r2PublicURL,
  stay22Lma,
  stay22Aid,
  siteURL,
]

const optionalPhase5 = [posthogKey, sentryDsn]

let databaseHost = 'n/a'
let databaseName = 'n/a'
let databaseProjectMatches = false
let databaseNameMatches = false

if (database.value) {
  try {
    const parsed = new URL(database.value)
    databaseHost = parsed.hostname
    databaseName = parsed.pathname.replace(/^\//, '') || 'n/a'
    databaseProjectMatches = databaseHost.includes(expectedSupabaseProjectRef)
    databaseNameMatches = expectedDatabases.has(databaseName)
  } catch (error) {
    databaseHost = `invalid (${error instanceof Error ? error.message : 'parse failed'})`
  }
}

let hasFailures = false

console.log('Viaive bootstrap env check')
console.log('-------------------------')

for (const item of required) {
  const ok = Boolean(item.value)
  hasFailures ||= !ok
  console.log(`${ok ? 'PASS' : 'FAIL'} ${item.name}${item.source ? ` <- ${item.source}` : ''}`)
}

for (const item of optionalPhase5) {
  const status = item.value ? 'INFO' : 'SKIP'
  console.log(`${status} ${item.name}${item.source ? ` <- ${item.source}` : ''} (Phase 5 optional)`)
}

console.log(
  `${derivedR2Endpoint ? 'PASS' : 'FAIL'} R2 endpoint${derivedR2Endpoint ? ` <- ${derivedR2Endpoint.source}` : ''}`,
)

if (!derivedR2Endpoint) {
  hasFailures = true
}

console.log('')
console.log(`Supabase host: ${databaseHost}`)
console.log(`Supabase database: ${databaseName}`)
console.log(
  `${databaseProjectMatches ? 'PASS' : 'FAIL'} DATABASE_URL project ref matches ${expectedSupabaseProjectRef}`,
)
console.log(
  `${databaseNameMatches ? 'PASS' : 'FAIL'} DATABASE_URL database name is one of ${Array.from(expectedDatabases).join(', ')}`,
)

if (!databaseProjectMatches || !databaseNameMatches) {
  hasFailures = true
}

process.exit(hasFailures ? 1 : 0)
