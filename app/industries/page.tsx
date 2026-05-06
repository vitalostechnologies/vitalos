import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Users, Truck, ShoppingBag, Building2, Rocket } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/sections/SectionHeader'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Industries',
  description:
    'Technology partners for healthcare, care, logistics, retail, public sector, and growing businesses.',
}

// ─── Industries data ──────────────────────────────────────────────────────────

const industries = [
  {
    id: 'healthcare-wellbeing',
    name: 'Healthcare & Wellbeing',
    Icon: Heart,
    value:
      'Technology that improves care quality, reduces administrative load, and keeps sensitive data safe.',
    solutions: [
      'Patient data platforms',
      'Clinical workflow automation',
      'AI-assisted triage and assessment',
      'Remote monitoring integrations',
      'NHS-compatible system design',
    ],
    contactType: 'healthcare',
  },
  {
    id: 'care-social-support',
    name: 'Care & Social Support',
    Icon: Users,
    value:
      'Digital tools that help care providers coordinate more effectively and demonstrate compliance.',
    solutions: [
      'Care management platforms',
      'Referral and handoff workflows',
      'Workforce scheduling systems',
      'Outcome tracking and reporting',
      'CQC-aligned data architecture',
    ],
    contactType: 'care',
  },
  {
    id: 'logistics-operations',
    name: 'Logistics & Operations',
    Icon: Truck,
    value:
      'Operational intelligence that reduces cost, improves reliability, and scales with demand.',
    solutions: [
      'Route optimisation systems',
      'Fleet and asset tracking',
      'Warehouse management integrations',
      'Supply chain visibility platforms',
      'Demand forecasting models',
    ],
    contactType: 'other',
  },
  {
    id: 'retail-ecommerce',
    name: 'Retail & E-commerce',
    Icon: ShoppingBag,
    value:
      'Connected systems and data tools that support growth without adding operational complexity.',
    solutions: [
      'E-commerce platform development',
      'Inventory and order management integrations',
      'Customer data platforms',
      'Personalisation and recommendation engines',
      'Business intelligence dashboards',
    ],
    contactType: 'other',
  },
  {
    id: 'public-sector-nonprofits',
    name: 'Public Sector & Nonprofits',
    Icon: Building2,
    value:
      'Accessible, secure, and compliant digital services within real procurement and governance constraints.',
    solutions: [
      'Citizen-facing web applications',
      'Legacy system modernisation',
      'Data sharing frameworks',
      'Accessibility compliance',
      'Cloud migration with security clearance support',
    ],
    contactType: 'other',
  },
  {
    id: 'startups-growing-businesses',
    name: 'Startups & Growing Businesses',
    Icon: Rocket,
    value:
      'Engineering and product help to build faster without the overhead of a full in-house team.',
    solutions: [
      'MVP development',
      'Technical architecture review',
      'Investor-ready system design',
      'Team augmentation',
      'Development process setup',
    ],
    contactType: 'other',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IndustriesPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <div className="pt-32 pb-16 bg-bg border-b border-border">
        <Container>
          <SectionHeader
            eyebrow="Industries"
            heading="Technology that fits the realities of your sector."
            lede="We work across six industries — each with its own constraints, compliance requirements, and operational priorities."
          />
        </Container>
      </div>

      <main>
        {industries.map((industry, index) => {
          const { Icon } = industry
          const isEven = index % 2 === 0

          return (
            <section
              key={industry.id}
              id={industry.id}
              className={`py-20 border-b border-border${isEven ? '' : ' bg-surface'}`}
            >
              <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
                  {/* Content */}
                  <div className={isEven ? 'md:order-1' : 'md:order-2'}>
                    <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-4">
                      {industry.name}
                    </h2>
                    <p className="text-lg text-text-muted leading-relaxed mb-8">
                      {industry.value}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {industry.solutions.map((solution) => (
                        <li key={solution} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                          <span className="text-text-muted">{solution}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/contact?type=${industry.contactType}`}
                      className="text-accent font-medium hover:underline underline-offset-4 transition-all"
                    >
                      Talk to us about {industry.name} &rarr;
                    </Link>
                  </div>

                  {/* Icon / visual */}
                  <div
                    className={`flex items-center justify-center${isEven ? ' md:order-2' : ' md:order-1'}`}
                  >
                    <div className="w-32 h-32 rounded-3xl bg-surface-2 border border-border flex items-center justify-center">
                      <Icon className="w-12 h-12 text-accent" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </Container>
            </section>
          )
        })}

        {/* CTA */}
        <CTASection />
      </main>
    </PageLayout>
  )
}
