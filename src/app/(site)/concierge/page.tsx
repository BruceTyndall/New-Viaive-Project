import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { TrustBar } from '@/components/TrustBar'
import { Brief } from '@/components/Brief'
import { Standard } from '@/components/Standard'
import { Proof } from '@/components/Proof'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Private Concierge — Viaive',
  description:
    'Our concierge desk reads every brief personally. No routing, no chatbot — a senior advisor returns a written placement within 18 hours.',
  openGraph: {
    title: 'Private Concierge — Viaive',
    description: 'A senior advisor reads every brief personally. Written placement within 18 hours.',
    type: 'website',
  },
}

export default function ConciergePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <Brief source="concierge" />
        <Standard />
        <Proof />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
