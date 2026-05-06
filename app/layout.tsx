import type { Metadata, Viewport } from 'next'
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// ─── Fonts ────────────────────────────────────────────────────────────────────

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  weight: ['500', '600', '700'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: 'Vitalos Technologies — AI, Cloud & Digital Transformation Consulting',
    template: '%s — Vitalos Technologies',
  },
  description:
    'Vitalos helps organisations design, build, and modernise digital systems across AI, cloud, software, data, and security.',
  keywords: [
    'technology consulting',
    'AI',
    'cloud engineering',
    'digital transformation',
    'software development',
    'cybersecurity',
    'UK',
  ],
  authors: [{ name: 'Vitalos Technologies' }],
  metadataBase: new URL('https://vitalos.co.uk'),
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://vitalos.co.uk',
    siteName: 'Vitalos Technologies',
    title: 'Vitalos Technologies — AI, Cloud & Digital Transformation Consulting',
    description:
      'Vitalos helps organisations design, build, and modernise digital systems across AI, cloud, software, data, and security.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Vitalos Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vitalos Technologies — AI, Cloud & Digital Transformation Consulting',
    description:
      'Vitalos helps organisations design, build, and modernise digital systems across AI, cloud, software, data, and security.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
}

// ─── JSON-LD structured data ───────────────────────────────────────────────────

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://vitalos.co.uk/#organization',
      name: 'Vitalos Technologies',
      url: 'https://vitalos.co.uk',
      email: 'hello@vitalos.co.uk',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'GB',
      },
      sameAs: [],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://vitalos.co.uk/#website',
      url: 'https://vitalos.co.uk',
      name: 'Vitalos Technologies',
      publisher: { '@id': 'https://vitalos.co.uk/#organization' },
    },
  ],
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        inter.variable,
        interTight.variable,
        jetbrainsMono.variable,
        'antialiased',
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          defer
          data-domain="vitalos.co.uk"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className="bg-bg text-text font-sans">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
