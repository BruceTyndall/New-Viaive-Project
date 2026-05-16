import type { Metadata } from 'next'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Editorial } from '@/components/Editorial'
import { StayModule } from '@/components/StayModule'
import { FAQ } from '@/components/FAQ'
import { NovaExitIntent } from '@/components/NovaExitIntent'
import { Footer } from '@/components/Footer'
import { getDestination } from '@/data/destinations'

export async function generateMetadata(): Promise<Metadata> {
  const destination = await Promise.resolve(getDestination('tokyo'))
  return {
    title: `Best Tokyo hotels | Viaive`,
    description: destination.geoAnswer,
    openGraph: {
      title: `Best Tokyo hotels | Viaive`,
      description: destination.geoAnswer,
      type: 'website',
    },
  }
}

export default async function Page() {
  const destination = await Promise.resolve(getDestination('tokyo'))

  return (
    <>
      <Nav />
      <main id="main-content" className="space-y-8 sm:space-y-12">
        <Hero
          eyebrow={destination.heroEyebrow}
          headline={destination.h1}
          italicHeadline={destination.h1Italic}
          lede={destination.geoAnswer}
        />
        <Editorial />
        <StayModule destination={destination} />
        <FAQ />
      </main>
      <NovaExitIntent />
      <Footer />
    </>
  )
}
