import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { IntentRouter } from '@/components/IntentRouter'
import { Brief } from '@/components/Brief'
import { Proof } from '@/components/Proof'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Start Planning — Viaive',
  description:
    'Tell us about your trip. A senior Viaive advisor reads every brief personally and returns a written placement within 18 hours.',
  openGraph: {
    title: 'Start Planning — Viaive',
    description: 'A senior advisor reads every brief personally. Written placement within 18 hours.',
    type: 'website',
  },
}

export default function StartPlanningPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <IntentRouter />
        <Brief source="start-planning" />
        <Proof />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
