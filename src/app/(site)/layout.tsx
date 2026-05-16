import type { Metadata } from 'next'
import '@/styles/globals.css'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import type { Footer as FooterGlobal } from '@/payload-types'

export const metadata: Metadata = {
  title: { default: 'Viaive', template: '%s | Viaive' },
  description: 'Luxury travel, decided.',
}

function mapFooter(data: FooterGlobal) {
  return {
    columns: data.columns?.map((col) => ({
      heading: col.title ?? '',
      links:
        col.links
          ?.filter((l) => l.label && l.href)
          .map((l) => ({ label: l.label!, href: l.href! })) ?? [],
    })),
    legalLinks: data.legalLinks
      ?.filter((l) => l.label && l.href)
      .map((l) => ({ label: l.label!, href: l.href! })),
  }
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  let footerProps: ReturnType<typeof mapFooter> | Record<string, never> = {}
  try {
    const payload = await getPayload({ config })
    const footerData = await payload.findGlobal({ slug: 'footer' })
    if (footerData.columns?.length) {
      footerProps = mapFooter(footerData)
    }
  } catch {
    // first-run safe — Footer renders with its built-in defaults
  }

  return (
    <>
      <Nav />
      {children}
      <Footer {...footerProps} />
    </>
  )
}
