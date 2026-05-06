import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import Container from '@/components/ui/Container'
import SectionHeader from '@/components/sections/SectionHeader'
import CTASection from '@/components/sections/CTASection'
import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Consulting and engineering across digital transformation, AI, cloud, software, data, security, and managed services.',
}

// ─── Structured data ──────────────────────────────────────────────────────────

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  provider: { '@type': 'Organization', name: 'Vitalos Technologies', url: 'https://vitalos.co.uk' },
  serviceType: 'Technology Consulting',
  areaServed: 'GB',
}

// ─── Services data ────────────────────────────────────────────────────────────

const serviceNames = [
  'Digital Transformation',
  'AI & Automation',
  'Cloud Engineering',
  'Software Engineering',
  'Data & Analytics',
  'Cybersecurity',
  'Enterprise Integration',
  'Managed Services',
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <PageLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero */}
      <div className="pt-32 pb-16 bg-bg border-b border-border">
        <Container>
          <SectionHeader
            eyebrow="Services"
            heading="Technology services for organisations that need results, not reports."
            lede="Eight practice areas. Each one combining strategy with engineering delivery."
          />
        </Container>
      </div>

      {/* Service name strip */}
      <div className="py-6 bg-surface border-b border-border overflow-x-auto">
        <Container>
          <div className="flex flex-wrap gap-3">
            {serviceNames.map((name) => (
              <Tag key={name} variant="default">
                <span className="font-mono">{name}</span>
              </Tag>
            ))}
          </div>
        </Container>
      </div>

      <main>
        {/* ── SERVICE 1: Digital Transformation ── */}
        <section id="digital-transformation" className="py-16 md:py-20 border-b border-border">
          <Container>
            <div className="max-w-3xl">
              <Tag variant="accent" className="mb-6">
                <span className="font-mono">01</span>
              </Tag>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-6">
                Digital Transformation Consulting
              </h2>

              <div className="bg-surface border border-border rounded-2xl p-6 mb-8">
                <p className="text-text-muted text-sm font-mono uppercase tracking-wide mb-3">
                  The scenario
                </p>
                <p className="text-text text-lg leading-relaxed">
                  &ldquo;You&rsquo;ve inherited a patchwork of legacy systems. Some are decades old,
                  some were bolted on during the pandemic, and none of them talk to each other
                  properly.&rdquo;
                </p>
              </div>

              <div className="mb-8">
                <h3 className="font-display font-semibold text-xl text-text mb-3">What we do</h3>
                <p className="text-text-muted leading-relaxed">
                  Help organisations assess, plan, and execute modernisation — from architecture
                  review through delivery.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="font-display font-semibold text-xl text-text mb-4">Deliverables</h3>
                <Card>
                  <ul className="p-6 space-y-2">
                    {[
                      'Technology assessment',
                      'Modernisation roadmap',
                      'Delivery plan',
                      'Governance model',
                      'Stakeholder communications',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <Link
                href="/contact?type=digital-transformation"
                className="text-accent font-medium hover:underline underline-offset-4 transition-all"
              >
                Talk to us about this &rarr;
              </Link>
            </div>
          </Container>
        </section>

        {/* ── SERVICE 2: AI & Automation ── */}
        <section id="ai-automation" className="py-16 md:py-20 border-b border-border bg-surface">
          <Container>
            <div className="max-w-3xl">
              <Tag variant="accent" className="mb-6">
                <span className="font-mono">02</span>
              </Tag>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-6">
                AI &amp; Automation
              </h2>

              <div className="bg-bg border border-border rounded-2xl p-6 mb-8">
                <p className="text-text-muted text-sm font-mono uppercase tracking-wide mb-3">
                  The scenario
                </p>
                <p className="text-text text-lg leading-relaxed">
                  &ldquo;You want AI to make your operations faster or smarter — but you don&rsquo;t
                  want a science experiment. You want something that works in production.&rdquo;
                </p>
              </div>

              <div className="mb-8">
                <h3 className="font-display font-semibold text-xl text-text mb-3">What we do</h3>
                <p className="text-text-muted leading-relaxed">
                  Design and build AI integrations, automation pipelines, and intelligent workflows
                  that fit your existing operations.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="font-display font-semibold text-xl text-text mb-4">Deliverables</h3>
                <Card>
                  <ul className="p-6 space-y-2">
                    {[
                      'AI/ML strategy',
                      'Proof of concept',
                      'Production deployment',
                      'Monitoring',
                      'Documentation',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <Link
                href="/contact?type=ai-automation"
                className="text-accent font-medium hover:underline underline-offset-4 transition-all"
              >
                Talk to us about this &rarr;
              </Link>
            </div>
          </Container>
        </section>

        {/* ── SERVICE 3: Cloud Engineering ── */}
        <section id="cloud-engineering" className="py-16 md:py-20 border-b border-border">
          <Container>
            <div className="max-w-3xl">
              <Tag variant="accent" className="mb-6">
                <span className="font-mono">03</span>
              </Tag>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-6">
                Cloud Engineering &amp; DevOps
              </h2>

              <p className="text-lg text-text-muted leading-relaxed mb-8">
                Cloud infrastructure shouldn&rsquo;t be a liability. We design, build, and run cloud
                environments that are reliable, cost-efficient, and secure from day one.
              </p>

              <div className="mb-8">
                <h3 className="font-display font-semibold text-xl text-text mb-4">
                  What we ship
                </h3>
                <Card>
                  <ul className="p-6 space-y-2">
                    {[
                      'Cloud architecture design',
                      'Migration planning and execution',
                      'CI/CD pipeline setup',
                      'Kubernetes and container orchestration',
                      'Infrastructure as code (Terraform/Pulumi)',
                      'Cost optimisation review',
                      'SRE and monitoring setup',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <Link
                href="/contact?type=cloud-engineering"
                className="text-accent font-medium hover:underline underline-offset-4 transition-all"
              >
                Talk to us about this &rarr;
              </Link>
            </div>
          </Container>
        </section>

        {/* ── SERVICE 4: Software Engineering ── */}
        <section
          id="software-engineering"
          className="py-16 md:py-20 border-b border-border bg-surface"
        >
          <Container>
            <div className="max-w-3xl">
              <Tag variant="accent" className="mb-6">
                <span className="font-mono">04</span>
              </Tag>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-6">
                Software Engineering &amp; Product Development
              </h2>

              <p className="text-lg text-text-muted leading-relaxed mb-8">
                We build software that ships. From greenfield platforms to complex integrations —
                TypeScript, Python, Go, whatever the problem needs.
              </p>

              <div className="mb-8">
                <h3 className="font-display font-semibold text-xl text-text mb-4">
                  What we ship
                </h3>
                <Card>
                  <ul className="p-6 space-y-2">
                    {[
                      'Web and mobile applications',
                      'APIs and microservices',
                      'Internal tooling',
                      'Developer platforms',
                      'Integration middleware',
                      'Technical due diligence',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <Link
                href="/contact?type=software-development"
                className="text-accent font-medium hover:underline underline-offset-4 transition-all"
              >
                Talk to us about this &rarr;
              </Link>
            </div>
          </Container>
        </section>

        {/* ── SERVICE 5: Data Analytics ── */}
        <section id="data-analytics" className="py-16 md:py-20 border-b border-border">
          <Container>
            <div className="max-w-3xl">
              <Tag variant="accent" className="mb-6">
                <span className="font-mono">05</span>
              </Tag>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-6">
                Data Analytics &amp; BI
              </h2>

              <p className="text-lg text-text-muted leading-relaxed mb-4">
                Most organisations are drowning in data and starved of insight. We build the
                infrastructure, pipelines, and dashboards that turn operational data into decisions
                — without requiring a data science team to interpret the output.
              </p>

              <div className="mb-8">
                <h3 className="font-display font-semibold text-xl text-text mb-4">Use cases</h3>
                <Card>
                  <ul className="p-6 space-y-2">
                    {[
                      'Operational dashboards',
                      'Predictive analytics',
                      'Data warehouse design',
                      'ETL pipeline engineering',
                      'Self-service BI tooling',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <Link
                href="/contact?type=data-analytics"
                className="text-accent font-medium hover:underline underline-offset-4 transition-all"
              >
                Talk to us about this &rarr;
              </Link>
            </div>
          </Container>
        </section>

        {/* ── SERVICE 6: Cybersecurity ── */}
        <section
          id="cybersecurity"
          className="py-16 md:py-20 border-b border-border bg-surface"
        >
          <Container>
            <div className="max-w-3xl">
              <Tag variant="accent" className="mb-6">
                <span className="font-mono">06</span>
              </Tag>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-6">
                Cybersecurity &amp; Risk
              </h2>

              <p className="text-lg text-text-muted leading-relaxed mb-4">
                Security isn&rsquo;t a checkbox. It&rsquo;s a practice. We help organisations
                understand their real exposure, fix what matters, and build the habits that keep
                systems safe over time.
              </p>

              <div className="mb-8">
                <h3 className="font-display font-semibold text-xl text-text mb-4">Use cases</h3>
                <Card>
                  <ul className="p-6 space-y-2">
                    {[
                      'Security assessment and penetration testing',
                      'Cyber Essentials and ISO 27001 preparation',
                      'Cloud security architecture review',
                      'Incident response planning',
                      'Ongoing managed security monitoring',
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              <Link
                href="/contact?type=cybersecurity"
                className="text-accent font-medium hover:underline underline-offset-4 transition-all"
              >
                Talk to us about this &rarr;
              </Link>
            </div>
          </Container>
        </section>

        {/* ── SERVICE 7: Enterprise Integration ── */}
        <section id="enterprise-integration" className="py-16 md:py-20 border-b border-border">
          <Container>
            <div className="max-w-3xl">
              <Tag variant="accent" className="mb-6">
                <span className="font-mono">07</span>
              </Tag>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-6">
                Enterprise Systems &amp; Integration
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <div className="p-6">
                    <p className="text-text-muted text-sm font-mono uppercase tracking-wide mb-3">
                      The problem
                    </p>
                    <p className="text-text leading-relaxed">
                      Systems that don&rsquo;t connect create manual work, errors, and operational
                      drag. Every workaround is a liability.
                    </p>
                  </div>
                </Card>
                <Card>
                  <div className="p-6">
                    <p className="text-text-muted text-sm font-mono uppercase tracking-wide mb-3">
                      Our solution
                    </p>
                    <p className="text-text leading-relaxed">
                      We connect ERP, CRM, supply chain, HR, and custom applications using modern
                      integration patterns — event-driven, API-first, and maintainable.
                    </p>
                  </div>
                </Card>
              </div>

              <Link
                href="/contact?type=enterprise-integration"
                className="text-accent font-medium hover:underline underline-offset-4 transition-all"
              >
                Talk to us about this &rarr;
              </Link>
            </div>
          </Container>
        </section>

        {/* ── SERVICE 8: Managed Services ── */}
        <section
          id="managed-services"
          className="py-16 md:py-20 border-b border-border bg-surface"
        >
          <Container>
            <div className="max-w-3xl">
              <Tag variant="accent" className="mb-6">
                <span className="font-mono">08</span>
              </Tag>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-text mb-6">
                Managed Technology Services
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <div className="p-6">
                    <p className="text-text-muted text-sm font-mono uppercase tracking-wide mb-3">
                      The problem
                    </p>
                    <p className="text-text leading-relaxed">
                      You&rsquo;ve built or inherited technology that needs to keep running. But
                      your team&rsquo;s time is better spent on new work than keeping the lights on.
                    </p>
                  </div>
                </Card>
                <Card>
                  <div className="p-6">
                    <p className="text-text-muted text-sm font-mono uppercase tracking-wide mb-3">
                      Our solution
                    </p>
                    <p className="text-text leading-relaxed">
                      We provide ongoing monitoring, support, and evolution for systems — including
                      those we didn&rsquo;t build. Clear SLAs, human escalation paths, and regular
                      improvement cycles.
                    </p>
                  </div>
                </Card>
              </div>

              <Link
                href="/contact?type=managed-services"
                className="text-accent font-medium hover:underline underline-offset-4 transition-all"
              >
                Talk to us about this &rarr;
              </Link>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <CTASection
          heading="Ready to get started?"
          subheading="Tell us about your project and we'll respond within one business day."
          primaryLabel="Book a discovery call"
          primaryHref="/contact"
        />
      </main>
    </PageLayout>
  )
}
