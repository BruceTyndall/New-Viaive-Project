import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { TrustBar } from '@/components/TrustBar'
import { IntentRouter } from '@/components/IntentRouter'
import { Desks } from '@/components/Desks'
import { EmailCapture } from '@/components/EmailCapture'

export const metadata: Metadata = {
  title: 'Viaive — Luxury travel, decided.',
  description:
    'An editorial travel advisory for people who treat every booking as a decision. Audited hotels, named relationships, and a standard you can feel before you arrive.',
  openGraph: {
    title: 'Viaive — Luxury travel, decided.',
    description:
      'An editorial travel advisory for people who treat every booking as a decision.',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <TrustBar />
      <IntentRouter />
      <Desks />
      <EmailCapture />
    </main>
  )
}
