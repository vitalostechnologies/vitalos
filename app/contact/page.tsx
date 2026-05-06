import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import Container from '@/components/ui/Container'
import ContactForm from '@/components/forms/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Tell us what you're trying to build.",
}

// ─── Contact cards data ───────────────────────────────────────────────────────

const contactOptions = [
  {
    heading: 'Book a discovery call',
    description:
      'A 30-minute conversation to understand your project and whether we&rsquo;re a good fit.',
    href: '/contact?type=digital-transformation',
    label: 'Open enquiry form',
  },
  {
    heading: 'Request a proposal',
    description:
      'Tell us about your project and we&rsquo;ll put together a scoped proposal within five working days.',
    href: '/contact?type=software-development',
    label: 'Open enquiry form',
  },
  {
    heading: 'Discuss a partnership',
    description:
      'Agency, system integrator, or public sector framework? Let&rsquo;s talk about how we can work together.',
    href: '/contact?type=other',
    label: 'Open enquiry form',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <div className="pt-32 pb-12 bg-bg border-b border-border">
        <Container>
          <div className="max-w-2xl">
            <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">Contact</p>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-text leading-tight">
              Let&rsquo;s build the right technology for your next stage.
            </h1>
          </div>
        </Container>
      </div>

      <main className="py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Form — 2/3 width */}
            <div className="lg:col-span-2">
              <Suspense fallback={<div className="text-text-muted">Loading form…</div>}>
                <ContactForm />
              </Suspense>
            </div>

            {/* Right column — 1/3 width */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact option cards */}
              {contactOptions.map((option) => (
                <div
                  key={option.heading}
                  className="bg-surface border border-border rounded-2xl p-6"
                >
                  <h3 className="font-display font-semibold text-text mb-2">{option.heading}</h3>
                  <p
                    className="text-text-muted text-sm leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: option.description }}
                  />
                  <Link
                    href={option.href}
                    className="text-accent text-sm font-medium hover:underline underline-offset-4 transition-all"
                  >
                    {option.label} &rarr;
                  </Link>
                </div>
              ))}

              {/* Direct contact */}
              <div className="pt-2">
                <p className="text-text-muted text-sm mb-1">
                  Or email us directly:{' '}
                  <a
                    href="mailto:hello@vitalos.co.uk"
                    className="text-accent hover:underline underline-offset-4 transition-all"
                  >
                    hello@vitalos.co.uk
                  </a>
                </p>
                <p className="text-text-muted text-xs leading-relaxed">
                  We respond to all enquiries within one business day.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  )
}
