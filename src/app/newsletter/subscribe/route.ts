import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const email = typeof body === 'object' && body !== null && 'email' in body
    ? String((body as { email: unknown }).email)
    : ''

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
  }

  const apiKey = process.env.BREVO_API_KEY
  const listId = process.env.BREVO_LIST_ID ? Number(process.env.BREVO_LIST_ID) : undefined

  if (!apiKey) {
    console.error('[subscribe] BREVO_API_KEY not set')
    return NextResponse.json({ error: 'Service unavailable. Please try again later.' }, { status: 503 })
  }

  const payload: Record<string, unknown> = {
    email,
    updateEnabled: true,
  }
  if (listId) {
    payload.listIds = [listId]
  }

  let brevoRes: Response
  try {
    brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch (err) {
    console.error('[subscribe] Brevo fetch error:', err)
    return NextResponse.json({ error: 'Network error. Please try again.' }, { status: 502 })
  }

  if (brevoRes.status === 204 || brevoRes.status === 201 || brevoRes.status === 200) {
    return NextResponse.json({ ok: true })
  }

  const brevoBody = await brevoRes.json().catch(() => ({}))
  console.error('[subscribe] Brevo error:', brevoRes.status, brevoBody)
  return NextResponse.json({ error: 'Subscription failed. Please try again.' }, { status: 500 })
}
