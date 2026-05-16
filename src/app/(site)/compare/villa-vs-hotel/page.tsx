import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { FAQ } from '@/components/FAQ'
import { Brief } from '@/components/Brief'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Villa vs. Hotel: What\'s Right For You? | Viaive',
  description: 'The key differences between private villa rentals and luxury hotels, and how to choose for your travel style',
  openGraph: {
    title: 'Villa vs. Hotel: What\'s Right For You? | Viaive',
    description: 'The key differences between private villa rentals and luxury hotels, and how to choose for your travel style',
    type: 'website',
  },
}

export default function Page() {
  return (
    <>
      <Nav />
      <main id="main-content" className="space-y-8 sm:space-y-12">
        <Hero
          headline="Villa vs. Hotel: What's Right For You?"
          lede="The key differences between private villa rentals and luxury hotels, and how to choose for your travel style"
        />
        <FAQ />
        <Brief source="compare-villa-vs-hotel" />
      </main>
      <Footer />
    </>
  )
}
