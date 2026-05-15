import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: { default: 'Viaive', template: '%s | Viaive' },
  description: 'Luxury travel, decided.',
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
