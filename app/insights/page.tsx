import type { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Articles, perspectives, and technical writing from the Vitalos team.',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InsightsPage() {
  return (
    <PageLayout>
      <main>
        {/* MDX blog architecture: add files to app/insights/[slug]/page.tsx when ready */}
        <Container>
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-24">
            <p className="text-accent font-mono text-sm uppercase tracking-widest mb-6">
              Insights
            </p>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-text mb-6 max-w-xl">
              Articles and writing coming soon.
            </h1>
            <p className="text-text-muted text-lg leading-relaxed max-w-md">
              We&rsquo;re putting together perspectives on technology, engineering, and building
              digital systems. Check back soon.
            </p>
          </div>
        </Container>
      </main>
    </PageLayout>
  )
}
