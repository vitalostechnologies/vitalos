import React from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/sections/SectionHeader'

interface Step {
  number: string
  title: string
  body: string
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Discover',
    body: 'We understand the organisation, users, workflows, risks, and goals.',
  },
  {
    number: '02',
    title: 'Design',
    body: 'We define the solution, architecture, roadmap, and delivery plan.',
  },
  {
    number: '03',
    title: 'Build',
    body: 'We engineer the platform, automation, integration, or product.',
  },
  {
    number: '04',
    title: 'Deploy',
    body: 'We launch with testing, monitoring, documentation, and support.',
  },
  {
    number: '05',
    title: 'Improve',
    body: 'We keep iterating based on data, feedback, and business needs.',
  },
]

export function ProcessSection() {
  return (
    <section className="bg-surface border-y border-border py-24 md:py-32">
      <Container>
        <SectionHeader
          eyebrow="How we work"
          heading="A structured approach. Real outcomes."
          className="mb-0"
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mt-16 relative">
          {/* Connecting line across desktop */}
          <div
            className="hidden md:block absolute top-8 left-0 right-0 border-t border-border"
            aria-hidden="true"
          />

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col">
              {/* Number — sits on top of the line on desktop */}
              <p className="font-mono text-5xl font-bold text-accent/20 mb-4 relative z-10 bg-surface leading-none md:pr-4">
                {step.number}
              </p>
              <p className="font-display font-semibold text-lg text-text mb-2">
                {step.title}
              </p>
              <p className="text-sm text-text-muted leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default ProcessSection
