import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { FAQ } from '@/components/FAQ'
import { Brief } from '@/components/Brief'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Direct Booking vs. Advisor vs. OTA Portal | Viaive',
  description: 'Compare booking luxury travel directly with hotels, through an advisor, or via online travel agencies',
  openGraph: {
    title: 'Direct Booking vs. Advisor vs. OTA Portal | Viaive',
    description: 'Compare booking luxury travel directly with hotels, through an advisor, or via online travel agencies',
    type: 'website',
  },
}

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main-content" className="space-y-8 sm:space-y-12">
        <Hero
          headline="Direct Booking vs. Advisor vs. OTA Portal"
          lede="Compare booking luxury travel directly with hotels, through an advisor, or via online travel agencies"
        />
        <FAQ />
        <Brief source="compare-direct-vs-advisor-vs-portal" />
      </main>
      <Footer />
    </>
  )
}
