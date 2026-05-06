import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/sections/SectionHeader'
import HeroSection from '@/components/sections/HeroSection'
import PositioningStrip from '@/components/sections/PositioningStrip'
import ServicesGrid from '@/components/sections/ServicesGrid'
import TechnologiesShowcase from '@/components/sections/TechnologiesShowcase'
import IndustriesGrid from '@/components/sections/IndustriesGrid'
import WhyVitalos from '@/components/sections/WhyVitalos'
import ProcessSection from '@/components/sections/ProcessSection'
import CTASection from '@/components/sections/CTASection'
import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'

export const metadata: Metadata = {
  title: 'Vitalos Technologies — AI, Cloud & Digital Transformation Consulting',
  description:
    'Vitalos helps organisations design, build, and modernise digital systems across AI, cloud, software, data, and security.',
}

// ─── Featured solutions data (first 3) ────────────────────────────────────────

const featuredSolutions = [
  {
    name: 'Integrated Care Coordination Platform',
    problem:
      'Care providers and NHS teams using separate systems with no shared view of the patient journey.',
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'FHIR APIs', 'Redis'],
    where: 'Healthcare providers, NHS integrated care systems, social care organisations.',
    href: '/solutions#integrated-care-coordination-platform',
  },
  {
    name: 'Logistics Intelligence Hub',
    problem:
      'Logistics operators making routing and staffing decisions on incomplete, delayed, or siloed data.',
    stack: ['Python (FastAPI)', 'React', 'PostgreSQL', 'Redis', 'scikit-learn'],
    where: '3PL operators, last-mile delivery, distribution centres.',
    href: '/solutions#logistics-intelligence-hub',
  },
  {
    name: 'AI-Assisted Regulatory Compliance Tool',
    problem:
      'Compliance teams spending disproportionate time on evidence collection, gap analysis, and audit preparation.',
    stack: ['Next.js', 'Python', 'Vector database', 'LLM integration', 'PostgreSQL'],
    where: 'Financial services, healthcare, public sector, ISO/Cyber Essentials preparation.',
    href: '/solutions#ai-assisted-regulatory-compliance-tool',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <PageLayout>
      <main>
        {/* Hero */}
        <HeroSection />

        {/* Positioning strip */}
        <PositioningStrip />

        {/* Services overview */}
        <section className="py-24 md:py-32">
          <Container>
            <SectionHeader
              eyebrow="Services"
              heading="What we do"
              lede="Eight practice areas spanning strategy through hands-on engineering delivery."
              className="mb-12"
            />
            <ServicesGrid />
            <div className="mt-10 text-center">
              <Link
                href="/services"
                className="text-accent font-medium hover:underline underline-offset-4 transition-all"
              >
                View all services &rarr;
              </Link>
            </div>
          </Container>
        </section>

        {/* Technologies showcase */}
        <TechnologiesShowcase />

        {/* Industries */}
        <section className="py-24 md:py-32 bg-surface">
          <Container>
            <SectionHeader
              eyebrow="Industries"
              heading="Sectors we serve"
              className="mb-12"
            />
            <IndustriesGrid />
            <div className="mt-10 text-center">
              <Link
                href="/industries"
                className="text-accent font-medium hover:underline underline-offset-4 transition-all"
              >
                All industries &rarr;
              </Link>
            </div>
          </Container>
        </section>

        {/* Why Vitalos */}
        <WhyVitalos />

        {/* Process */}
        <ProcessSection />

        {/* Featured solutions */}
        <section className="py-24 md:py-32 bg-surface">
          <Container>
            <SectionHeader
              eyebrow="Solutions"
              heading="Solution concepts and demonstrators"
              lede="Reference architectures we've designed — illustrating how we approach common problems."
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredSolutions.map((solution) => (
                <Card key={solution.name} hover>
                  <div className="p-6 flex flex-col gap-4 h-full">
                    <h3 className="font-display font-semibold text-xl text-text leading-snug">
                      {solution.name}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed flex-1">
                      {solution.problem}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {solution.stack.slice(0, 3).map((tech) => (
                        <Tag key={tech} variant="default">
                          {tech}
                        </Tag>
                      ))}
                    </div>
                    <Link
                      href={solution.href}
                      className="text-accent text-sm font-medium hover:underline underline-offset-4 transition-all mt-auto"
                    >
                      View approach &rarr;
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/solutions"
                className="text-accent font-medium hover:underline underline-offset-4 transition-all"
              >
                Explore all solutions &rarr;
              </Link>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <CTASection />
      </main>
    </PageLayout>
  )
}
