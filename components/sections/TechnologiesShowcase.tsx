import React from 'react'
import Link from 'next/link'
import { Activity, LineChart, Network, ShieldCheck, type LucideIcon } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Tag } from '@/components/ui/Tag'
import { SectionHeader } from '@/components/sections/SectionHeader'

interface Technology {
  name: string
  tag: string
  description: string
  status: string
  icon: LucideIcon
}

const technologies: Technology[] = [
  {
    name: 'VitaFlow',
    tag: 'AI Platform',
    description:
      'An AI-powered workflow automation platform for healthcare and care providers. Handles intake, routing, assessment, and longitudinal tracking.',
    status: 'In development',
    icon: Activity,
  },
  {
    name: 'VitaInsight',
    tag: 'Analytics',
    description:
      'A data analytics and BI accelerator that connects operational data to clear dashboards and predictive models.',
    status: 'In development',
    icon: LineChart,
  },
  {
    name: 'VitaConnect',
    tag: 'Integration',
    description:
      'A reusable integration framework for connecting ERP, CRM, and legacy systems via API and event-driven patterns.',
    status: 'In development',
    icon: Network,
  },
  {
    name: 'VitaSecure',
    tag: 'Security',
    description:
      'A security and compliance toolkit for organisations navigating Cyber Essentials, ISO 27001, and UK GDPR requirements.',
    status: 'In development',
    icon: ShieldCheck,
  },
]

export function TechnologiesShowcase() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Proprietary Technologies"
            heading="We don't only advise. We build."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {technologies.map((tech) => {
            const Icon = tech.icon
            return (
              <div
                key={tech.name}
                className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <Tag variant="accent">{tech.tag}</Tag>
                  <Tag variant="default">{tech.status}</Tag>
                </div>

                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Icon size={22} className="text-accent" aria-hidden="true" />
                </div>

                <p className="font-display font-bold text-xl text-text">{tech.name}</p>

                <p className="text-sm text-text-muted leading-relaxed flex-1">
                  {tech.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/technologies"
            className="inline-flex items-center gap-1 text-accent text-sm font-medium hover:underline underline-offset-4 transition-colors"
          >
            Explore all technologies →
          </Link>
        </div>
      </Container>
    </section>
  )
}

export default TechnologiesShowcase
