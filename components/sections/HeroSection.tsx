import React from 'react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section
      className="min-h-[90vh] flex flex-col justify-center bg-bg border-b border-border pt-32 pb-24 md:pt-40 md:pb-32"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at top left, #3B82F620 0%, transparent 50%), radial-gradient(ellipse at bottom right, #06B6D420 0%, transparent 50%)',
      }}
    >
      <Container>
        <div className="max-w-4xl">
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-text leading-[1.05] tracking-tight mb-8">
            Technology consulting and engineering for organisations ready to modernise.
          </h1>

          <p className="text-text-muted text-lg sm:text-xl leading-relaxed mb-4 max-w-3xl">
            Vitalos Technologies helps businesses, healthcare and care providers, logistics
            operators, and public-sector teams design, build, and modernise digital systems —
            across AI, cloud, software, data, and security.
          </p>

          <p className="text-text-muted text-base leading-relaxed mb-12 max-w-2xl">
            We combine consulting with hands-on engineering. We don&apos;t just write strategy
            decks — we ship working systems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact" variant="primary" size="lg">
              Book a discovery call
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              See what we do
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default HeroSection
