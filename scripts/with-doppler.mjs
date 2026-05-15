import { spawn, spawnSync } from 'node:child_process'

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error('Usage: node scripts/with-doppler.mjs <command> [...args]')
  process.exit(1)
}

const inDopplerShell = Boolean(
  process.env.DOPPLER_CONFIG || process.env.DOPPLER_ENVIRONMENT || process.env.DOPPLER_PROJECT,
)
const hasBootstrapEnv = Boolean((process.env.DATABASE_URL || process.env.DATABASE_URI) && process.env.PAYLOAD_SECRET)

let command = args

if (!inDopplerShell && !hasBootstrapEnv) {
  const dopplerVersion = spawnSync('doppler', ['--version'], { stdio: 'ignore' })

  if (dopplerVersion.error || dopplerVersion.status !== 0) {
    console.error('Doppler CLI is not available and required bootstrap env vars are not present.')
    process.exit(1)
  }

  command = ['doppler', 'run', '--', ...args]
}

const child = spawn(command[0], command.slice(1), {
  env: process.env,
  stdio: 'inherit',
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 1)
})
