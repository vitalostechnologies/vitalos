import type { Metadata } from 'next'
import {
  Zap,
  Heart,
  ShieldCheck,
  Handshake,
  MessageSquare,
  Target,
  Brain,
} from 'lucide-react'
import PageLayout from '@/components/layout/PageLayout'
import Container from '@/components/ui/Container'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'About',
  description: 'A practical technology partner for organisations building the future.',
}

// ─── Values data ──────────────────────────────────────────────────────────────

const values = [
  {
    Icon: Zap,
    name: 'Practical execution',
    description:
      'Good technology serves a purpose. We measure ourselves by whether things work in the real world, not whether they look good in a presentation.',
  },
  {
    Icon: Heart,
    name: 'Human-centred technology',
    description:
      'The best systems are designed around the people who use them — not the other way around.',
  },
  {
    Icon: Brain,
    name: 'Responsible AI',
    description:
      'AI should be used where it earns its place — with transparency, oversight, and honest assessment of limitations.',
  },
  {
    Icon: ShieldCheck,
    name: 'Security and trust',
    description:
      'Security is not an add-on. It is part of every architecture decision from day one.',
  },
  {
    Icon: Handshake,
    name: 'Long-term partnership',
    description:
      'We want to be the team you call when something important needs to be built — not a supplier you rotate through every 18 months.',
  },
  {
    Icon: MessageSquare,
    name: 'Clear communication',
    description:
      'No jargon. No hidden complexity. We explain things plainly and flag problems early.',
  },
  {
    Icon: Target,
    name: 'Measurable outcomes',
    description:
      'We define success in concrete terms — time saved, costs reduced, systems that actually get used.',
  },
]

// ─── Why clients work with us ─────────────────────────────────────────────────

const whyReasons = [
  'Senior people on every engagement — not juniors managed from afar',
  'Strategy and delivery under one roof — no handoff between advisory and engineering',
  'Honest scoping — we will tell you if something is bigger, smaller, or different from what you expect',
  'Practical security posture built in from the start',
  'Transparent communication throughout — including when things are hard',
  'Long-term thinking — we design for systems that are maintainable, not just shippable',
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <div className="pt-32 pb-16 bg-bg border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">About</p>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-text leading-tight">
              A practical technology partner for organisations building the future.
            </h1>
          </div>
        </Container>
      </div>

      <main>
        {/* ── Who we are ── */}
        <section className="py-16 md:py-20 border-b border-border">
          <Container>
            <div className="max-w-3xl">
              <h2 className="font-display font-bold text-3xl text-text mb-6">Who we are</h2>
              <p className="text-lg text-text-muted leading-relaxed">
                Vitalos Technologies is a UK-based technology consultancy and product company. We
                combine advisory work with engineering delivery — helping organisations design
                systems, build software, and modernise their technology without the overhead of a
                large consulting firm. We are founder-led and deliberately small. That means the
                people who scope your project are the people who deliver it.
              </p>
            </div>
          </Container>
        </section>

        {/* ── What we believe ── */}
        <section className="py-16 md:py-20 border-b border-border bg-surface">
          <Container>
            <div className="max-w-3xl mb-12">
              <h2 className="font-display font-bold text-3xl text-text mb-4">What we believe</h2>
              <p className="text-text-muted leading-relaxed">
                These are the principles that shape how we work and what we build.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
              {values.map(({ Icon, name, description }) => (
                <div key={name} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-text mb-1">{name}</h3>
                    <p className="text-text-muted text-sm leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ── How we work ── */}
        <section className="py-16 md:py-20 border-b border-border">
          <Container>
            <div className="max-w-3xl">
              <h2 className="font-display font-bold text-3xl text-text mb-8">How we work</h2>

              <div className="space-y-6 text-text-muted leading-relaxed">
                <p>
                  Every engagement starts with a discovery phase. We take time to understand the
                  problem — the technical reality, the organisational constraints, and the outcome
                  that actually matters. We ask uncomfortable questions early, so we are not
                  discovering fundamental issues halfway through delivery.
                </p>
                <p>
                  Design comes next. We work with clients to define the right architecture, the
                  right technology choices, and a realistic delivery plan. This is a collaborative
                  stage — we bring technical knowledge, clients bring domain knowledge and
                  operational context.
                </p>
                <p>
                  Build is where the work happens. We write code, configure infrastructure, test
                  thoroughly, and communicate progress clearly. We favour shipping working software
                  incrementally over long release cycles.
                </p>
                <p>
                  Deploy is not the end. We treat launch as a milestone, not a handoff. We support
                  clients through go-live, handle the inevitable edge cases that emerge in
                  production, and ensure the team is ready to maintain what we have built.
                </p>
                <p>
                  After launch, we focus on improvement. Technology needs to evolve. We help
                  organisations build the habits, monitoring, and feedback loops that keep systems
                  healthy and aligned with changing needs.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ── Why clients work with us ── */}
        <section className="py-16 md:py-20 border-b border-border bg-surface">
          <Container>
            <div className="max-w-3xl">
              <h2 className="font-display font-bold text-3xl text-text mb-8">
                Why clients work with us
              </h2>

              <ul className="space-y-4">
                {whyReasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2.5" />
                    <span className="text-text-muted leading-relaxed">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>

        {/* ── Founder ── */}
        <section className="py-16 md:py-20 border-b border-border">
          <Container>
            <div className="max-w-3xl">
              <h2 className="font-display font-bold text-3xl text-text mb-8">The team</h2>

              {/* Placeholder card */}
              <div className="border border-dashed border-border rounded-2xl p-8 text-center">
                <p className="text-text-muted text-sm leading-relaxed">
                  Founder profile coming soon.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <CTASection
          heading="Want to work with us?"
          primaryLabel="Get in touch"
          primaryHref="/contact"
          secondaryLabel="See our services"
          secondaryHref="/services"
        />
      </main>
    </PageLayout>
  )
}
