import React from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

interface CTASectionProps {
  heading?: string
  subheading?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export function CTASection({
  heading = "Tell us what you're trying to build.",
  subheading = "Whether you're modernising legacy systems, exploring AI, or building a product from scratch — we'd like to hear about it.",
  primaryLabel = 'Book a discovery call',
  primaryHref = '/contact',
  secondaryLabel = 'See our services',
  secondaryHref = '/services',
}: CTASectionProps) {
  return (
    <section
      className="bg-surface border-y border-border py-24 md:py-32"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at center, #3B82F615 0%, transparent 70%)',
      }}
    >
      <Container>
        <div className="flex flex-col items-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-text text-center max-w-3xl mx-auto mb-6">
            {heading}
          </h2>
          <p className="text-text-muted text-lg text-center max-w-xl mx-auto mb-10">
            {subheading}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={primaryHref} variant="primary" size="lg">
              {primaryLabel}
            </Button>
            <Button href={secondaryHref} variant="secondary" size="lg">
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CTASection
