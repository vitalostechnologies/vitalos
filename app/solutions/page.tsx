import type { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import Container from '@/components/ui/Container'
import CTASection from '@/components/sections/CTASection'
import Tag from '@/components/ui/Tag'

export const metadata: Metadata = {
  title: 'Solution Concepts',
  description:
    'Reference architectures and capability demonstrators across health, care, logistics, AI, and BI.',
}

// ─── Solutions data ───────────────────────────────────────────────────────────

const solutions = [
  {
    id: 'integrated-care-coordination-platform',
    name: 'Integrated Care Coordination Platform',
    problem:
      'Care providers and NHS teams using separate systems with no shared view of the patient journey.',
    approach:
      'A unified coordination layer that aggregates data from multiple systems, surfaces priority cases, and coordinates handoffs between teams.',
    features: [
      'Multi-system patient view',
      'Priority scoring',
      'Handoff workflow',
      'Audit trail',
      'Mobile-accessible',
    ],
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'FHIR APIs', 'Redis'],
    whereFits:
      'Healthcare providers, NHS integrated care systems, social care organisations.',
  },
  {
    id: 'logistics-intelligence-hub',
    name: 'Logistics Intelligence Hub',
    problem:
      'Logistics operators making routing and staffing decisions on incomplete, delayed, or siloed data.',
    approach:
      'A real-time intelligence layer connecting fleet, order, and warehouse data into a single operational view with predictive alerts.',
    features: [
      'Real-time vehicle tracking',
      'Demand forecasting',
      'Route optimisation suggestions',
      'Warehouse throughput dashboards',
      'Exception alerting',
    ],
    stack: ['Python (FastAPI)', 'React', 'PostgreSQL', 'Redis', 'ML models (scikit-learn)'],
    whereFits: '3PL operators, last-mile delivery, distribution centres.',
  },
  {
    id: 'ai-assisted-regulatory-compliance-tool',
    name: 'AI-Assisted Regulatory Compliance Tool',
    problem:
      'Compliance teams spending disproportionate time on evidence collection, gap analysis, and audit preparation.',
    approach:
      'An AI-assisted tool that maps compliance requirements to evidence artefacts, tracks progress, and generates audit-ready documentation.',
    features: [
      'Requirement mapping',
      'Evidence linking',
      'Gap visualisation',
      'AI-generated draft responses',
      'Export to PDF/Excel',
    ],
    stack: ['Next.js', 'Python', 'Vector database', 'LLM integration (via API)', 'PostgreSQL'],
    whereFits:
      'Financial services, healthcare, public sector, ISO/Cyber Essentials preparation.',
  },
  {
    id: 'retail-data-personalisation-platform',
    name: 'Retail Data & Personalisation Platform',
    problem:
      'Online retailers with fragmented customer data unable to personalise effectively or understand cohort behaviour.',
    approach:
      'A customer data platform that unifies event data, builds profiles, and powers segmentation, personalisation, and analytics.',
    features: [
      'Event ingestion',
      'Customer profile unification',
      'Segment builder',
      'A/B test integration',
      'BI dashboards',
    ],
    stack: ['Next.js', 'Python', 'ClickHouse', 'Kafka', 'PostgreSQL'],
    whereFits: 'E-commerce retailers, subscription businesses, marketplace platforms.',
  },
  {
    id: 'internal-developer-platform',
    name: 'Internal Developer Platform',
    problem:
      'Engineering teams spending more time on infrastructure, deployment, and toolchain management than on shipping product.',
    approach:
      'A standardised internal developer platform providing self-service environment provisioning, CI/CD templates, and observability out of the box.',
    features: [
      'Self-service environment creation',
      'CI/CD pipeline templates',
      'Secrets management',
      'Cost dashboards',
      'Developer documentation hub',
    ],
    stack: ['Terraform', 'Kubernetes', 'GitHub Actions', 'Grafana', 'Backstage'],
    whereFits:
      'Scale-ups building an engineering platform, enterprises modernising developer experience.',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SolutionsPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <div className="pt-32 pb-16 bg-bg border-b border-border">
        <Container>
          <div className="max-w-3xl">
            {/* Disclaimer */}
            <blockquote className="border-l-2 border-accent pl-6 mb-10">
              <p className="text-text-muted leading-relaxed">
                These are reference architectures and capability demonstrators built by Vitalos.
                They illustrate how we approach common problems — they are not branded as client
                deployments.
              </p>
            </blockquote>

            <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">
              Solutions
            </p>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-text leading-tight">
              Solution concepts and technology demonstrators.
            </h1>
          </div>
        </Container>
      </div>

      <main>
        {solutions.map((solution, index) => {
          const isEven = index % 2 === 0
          return (
            <section
              key={solution.id}
              id={solution.id}
              className={`border-b border-border py-16${isEven ? '' : ' bg-surface'}`}
            >
              <Container>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-16">
                  {/* Main content — 3 cols */}
                  <div className="lg:col-span-3">
                    <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-8">
                      {solution.name}
                    </h2>

                    <div className="space-y-8">
                      <div>
                        <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-2">
                          The problem
                        </p>
                        <p className="text-text leading-relaxed">{solution.problem}</p>
                      </div>

                      <div>
                        <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-2">
                          Our approach
                        </p>
                        <p className="text-text leading-relaxed">{solution.approach}</p>
                      </div>

                      <div>
                        <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-3">
                          Key features
                        </p>
                        <ul className="space-y-2">
                          {solution.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                              <span className="text-text-muted">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Metadata sidebar — 1 col */}
                  <div className="lg:col-span-1">
                    <div className="lg:sticky lg:top-28 space-y-6">
                      <div>
                        <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-3">
                          Stack
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {solution.stack.map((tech) => (
                            <Tag key={tech} variant="default">
                              <span className="font-mono text-xs">{tech}</span>
                            </Tag>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-mono uppercase tracking-widest text-text-muted mb-2">
                          Where this fits
                        </p>
                        <p className="text-text-muted text-sm leading-relaxed">
                          {solution.whereFits}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </section>
          )
        })}

        {/* CTA */}
        <CTASection
          heading="Interested in a solution like this?"
          subheading="These concepts can be scoped and adapted. Tell us which resonates."
        />
      </main>
    </PageLayout>
  )
}
