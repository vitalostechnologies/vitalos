import type { Metadata } from 'next'
import { CheckCircle } from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import Container from '@/components/ui/Container'
import CTASection from '@/components/sections/CTASection'
import Tag from '@/components/ui/Tag'

export const metadata: Metadata = {
  title: 'Proprietary Technologies',
  description: 'AI-powered platforms and reusable frameworks built by Vitalos.',
}

// ─── Technologies data ────────────────────────────────────────────────────────

const technologies = [
  {
    id: 'vitaflow',
    name: 'VitaFlow',
    subtitle: 'AI Workflow Platform',
    status: 'In development',
    category: 'Healthcare & Care',
    description:
      'An AI-powered workflow automation platform for healthcare and care providers.',
    detail: [
      'VitaFlow handles intake, routing, clinical assessment support, and longitudinal patient tracking. It is designed to sit alongside existing systems rather than replace them — connecting to EHRs, referral portals, and communication platforms via FHIR-compatible APIs.',
      'The core engine routes work based on configurable rules and ML-scored priority signals, with human-in-the-loop checkpoints at critical decisions.',
    ],
    capabilities: [
      'Adaptive intake and triage',
      'Configurable routing rules',
      'Longitudinal tracking',
      'FHIR-compatible APIs',
      'Audit trails',
      'Role-based access',
    ],
  },
  {
    id: 'vitainsight',
    name: 'VitaInsight',
    subtitle: 'Analytics Accelerator',
    status: 'In development',
    category: 'Data & Analytics',
    description:
      'A data analytics and BI accelerator for connecting operational data to decisions.',
    detail: [
      'VitaInsight provides a pre-built data warehouse schema, ETL pipeline templates, and dashboard component library that reduces the time from raw data to usable insight. It supports multiple source systems out of the box and can be extended for custom data models.',
      'Dashboards are designed for operational users, not data analysts — clear metrics, plain-language labels, and mobile-ready layouts.',
    ],
    capabilities: [
      'Pre-built data model templates',
      'ETL pipeline library',
      'Self-service dashboard builder',
      'Anomaly detection',
      'Scheduled reporting',
      'Access controls',
    ],
  },
  {
    id: 'vitaconnect',
    name: 'VitaConnect',
    subtitle: 'Integration Framework',
    status: 'In development',
    category: 'Enterprise Integration',
    description:
      'A reusable integration framework for connecting disparate enterprise systems.',
    detail: [
      'VitaConnect provides a set of tested integration connectors, event-driven messaging patterns, and transformation utilities that cut integration delivery time significantly. Rather than rebuilding API clients and transformation logic for every engagement, VitaConnect provides tested building blocks.',
      'Supports REST, GraphQL, webhooks, and message queues.',
    ],
    capabilities: [
      'Pre-built connectors',
      'Event-driven messaging',
      'Transformation library',
      'Retry and dead-letter handling',
      'Observability integration',
      'Documentation generator',
    ],
  },
  {
    id: 'vitasecure',
    name: 'VitaSecure',
    subtitle: 'Security Toolkit',
    status: 'In development',
    category: 'Cybersecurity',
    description:
      'A security and compliance toolkit for UK regulatory frameworks.',
    detail: [
      'VitaSecure packages the assessment criteria, policy templates, evidence collection workflows, and remediation guidance for Cyber Essentials, Cyber Essentials Plus, and ISO 27001.',
      'It is not a scanner or penetration testing tool — it is a structured framework for getting organisations to a defensible security posture efficiently.',
    ],
    capabilities: [
      'Cyber Essentials self-assessment toolkit',
      'ISO 27001 gap analysis templates',
      'Policy library',
      'Evidence management',
      'Remediation tracker',
    ],
  },
  {
    id: 'vitaops',
    name: 'VitaOps',
    subtitle: 'Observability Stack',
    status: 'Concept',
    category: 'Cloud & DevOps',
    description:
      'An observability and monitoring stack pre-configured for cloud-native applications.',
    detail: [
      'VitaOps assembles best-practice observability tooling — metrics, logs, traces, and alerting — into a deployable stack with pre-built dashboards for common application patterns.',
      'It reduces the time to "we know what&rsquo;s happening in production" from weeks to days for new systems.',
    ],
    capabilities: [
      'Metrics aggregation',
      'Structured logging',
      'Distributed tracing',
      'Alert runbook templates',
      'Cost monitoring',
    ],
  },
  {
    id: 'vitadata',
    name: 'VitaData',
    subtitle: 'Data Governance Layer',
    status: 'Concept',
    category: 'Data & Compliance',
    description:
      'A data governance and lineage layer for organisations managing sensitive data.',
    detail: [
      'VitaData provides tooling for cataloguing data assets, tracking lineage, managing access policies, and generating GDPR-relevant audit evidence.',
      'Designed for organisations that need to demonstrate data stewardship to regulators and auditors without a dedicated data governance team.',
    ],
    capabilities: [
      'Data asset catalogue',
      'Lineage tracking',
      'Access policy management',
      'GDPR audit trails',
      'Data quality monitoring',
    ],
  },
  {
    id: 'vitaml',
    name: 'VitaML',
    subtitle: 'Machine Learning Infrastructure',
    status: 'Concept',
    category: 'AI & Machine Learning',
    description:
      'Reusable ML infrastructure components for production model deployment.',
    detail: [
      'VitaML packages feature engineering utilities, model serving infrastructure, experiment tracking configuration, and monitoring hooks that reduce the path from trained model to production deployment.',
      'Built to work with standard Python ML frameworks (scikit-learn, PyTorch, Hugging Face) without locking into a specific cloud vendor.',
    ],
    capabilities: [
      'Feature store templates',
      'Model serving (FastAPI/BentoML)',
      'Experiment tracking',
      'Drift monitoring',
      'A/B testing infrastructure',
    ],
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TechnologiesPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <div className="pt-32 pb-16 bg-bg border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">
              Proprietary Technologies
            </p>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-text mb-6 leading-tight">
              We don&rsquo;t only advise. We build.
            </h1>
            <p className="text-lg text-text-muted leading-relaxed">
              Vitalos develops proprietary AI-powered platforms and reusable engineering frameworks.
              They let us deliver faster, reduce risk, and give clients working systems instead of
              starting from zero.
            </p>
          </div>
        </Container>
      </div>

      <main>
        {technologies.map((tech, index) => {
          const isEven = index % 2 === 0
          return (
            <section
              key={tech.id}
              id={tech.id}
              className={`border-b border-border py-16 md:py-20${isEven ? '' : ' bg-surface'}`}
            >
              <Container>
                <div className="max-w-3xl">
                  {/* Name and tags */}
                  <div className="mb-6">
                    <h2 className="font-display font-bold text-3xl text-text mb-2">
                      {tech.name}
                      <span className="text-text-muted font-normal text-2xl ml-3">
                        — {tech.subtitle}
                      </span>
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Tag variant="accent">{tech.category}</Tag>
                      <Tag variant="default">Status: {tech.status}</Tag>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-text-muted mb-6">{tech.description}</p>

                  {/* Detail paragraphs */}
                  <div className="space-y-4 mb-8">
                    {tech.detail.map((para, i) => (
                      <p
                        key={i}
                        className="text-text-muted leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: para }}
                      />
                    ))}
                  </div>

                  {/* Capabilities */}
                  <div>
                    <h3 className="font-display font-semibold text-lg text-text mb-4">
                      Key capabilities
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {tech.capabilities.map((cap) => (
                        <li key={cap} className="flex items-start gap-3">
                          <CheckCircle
                            className="w-5 h-5 text-accent shrink-0 mt-0.5"
                            strokeWidth={1.5}
                          />
                          <span className="text-text-muted text-sm">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Container>
            </section>
          )
        })}

        {/* CTA */}
        <CTASection
          heading="Interested in using these platforms?"
          subheading="These tools are deployed as part of client engagements. Get in touch to discuss how they could apply to your project."
          primaryLabel="Talk to us"
          primaryHref="/contact"
          secondaryLabel="View our services"
          secondaryHref="/services"
        />
      </main>
    </PageLayout>
  )
}
