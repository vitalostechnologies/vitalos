import type { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Privacy Notice',
  description: 'How Vitalos Technologies collects, uses, and protects your data.',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PrivacyPage() {
  return (
    <PageLayout>
      <div className="pt-32 pb-12 bg-bg border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">Legal</p>
            <h1 className="font-display font-bold text-4xl text-text mb-4">Privacy Notice</h1>
            <p className="text-text-muted text-sm">Last updated: May 2026</p>
          </div>
        </Container>
      </div>

      <main className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Template notice */}
            <div className="bg-surface border border-border rounded-2xl p-6 mb-12">
              <p className="text-text-muted text-sm leading-relaxed">
                <strong className="text-text font-semibold">Note:</strong> This is a template
                privacy notice. Vitalos Technologies should review and finalise this with a
                qualified solicitor before relying on it.
              </p>
            </div>

            <div className="prose-container space-y-10">
              {/* 1. Who we are */}
              <section>
                <h2 className="font-display font-bold text-2xl text-text mb-4">1. Who we are</h2>
                <p className="text-text-muted text-base leading-relaxed">
                  Vitalos Technologies Ltd, registered in England and Wales. We operate the website
                  at vitalos.co.uk. If you have any questions about this privacy notice or how we
                  handle your data, please contact us at{' '}
                  <a
                    href="mailto:hello@vitalos.co.uk"
                    className="text-accent hover:underline underline-offset-4"
                  >
                    hello@vitalos.co.uk
                  </a>
                  .
                </p>
              </section>

              {/* 2. What data we collect */}
              <section>
                <h2 className="font-display font-bold text-2xl text-text mb-4">
                  2. What data we collect
                </h2>
                <div className="space-y-4 text-text-muted text-base leading-relaxed">
                  <p>We may collect the following types of data:</p>
                  <ul className="space-y-3 pl-4">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                      <span>
                        <strong className="text-text font-medium">Contact information</strong>{' '}
                        submitted via our website forms — name, email address, organisation, phone
                        number, and message content.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                      <span>
                        <strong className="text-text font-medium">Server logs</strong> — IP
                        addresses and browser information, retained for security and operational
                        purposes.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                      <span>
                        <strong className="text-text font-medium">Analytics data</strong> via
                        Plausible Analytics — privacy-preserving, no cookies, no personal data
                        stored by Plausible. Aggregated page view and referral data only.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 3. How we use it */}
              <section>
                <h2 className="font-display font-bold text-2xl text-text mb-4">
                  3. How we use your data
                </h2>
                <div className="space-y-3 text-text-muted text-base leading-relaxed">
                  <p>We use the data we collect to:</p>
                  <ul className="space-y-2 pl-4">
                    {[
                      'Respond to enquiries you submit via our contact form.',
                      'Provide services where a contract is in place.',
                      'Improve our website and understand how it is being used.',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>We do not sell your data or share it with third parties for marketing.</p>
                </div>
              </section>

              {/* 4. Legal basis */}
              <section>
                <h2 className="font-display font-bold text-2xl text-text mb-4">
                  4. Legal basis for processing
                </h2>
                <div className="space-y-3 text-text-muted text-base leading-relaxed">
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                      <span>
                        <strong className="text-text font-medium">Legitimate interests</strong> —
                        responding to enquiries submitted via our contact form.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                      <span>
                        <strong className="text-text font-medium">Contract performance</strong> —
                        processing data necessary to deliver services where we have an agreement in
                        place.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 5. Data retention */}
              <section>
                <h2 className="font-display font-bold text-2xl text-text mb-4">
                  5. Data retention
                </h2>
                <div className="space-y-3 text-text-muted text-base leading-relaxed">
                  <ul className="space-y-2 pl-4">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                      <span>
                        <strong className="text-text font-medium">Enquiry data:</strong> retained
                        for 2 years from the date of last contact.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                      <span>
                        <strong className="text-text font-medium">Analytics:</strong> aggregated
                        data only — no personal data is retained by our analytics provider.
                      </span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* 6. Your rights */}
              <section>
                <h2 className="font-display font-bold text-2xl text-text mb-4">6. Your rights</h2>
                <div className="space-y-3 text-text-muted text-base leading-relaxed">
                  <p>
                    Under UK data protection law, you have the right to: access the data we hold
                    about you, request rectification or erasure, restrict or object to processing,
                    and request portability of your data.
                  </p>
                  <p>
                    To exercise any of these rights, contact us at{' '}
                    <a
                      href="mailto:hello@vitalos.co.uk"
                      className="text-accent hover:underline underline-offset-4"
                    >
                      hello@vitalos.co.uk
                    </a>
                    .
                  </p>
                  <p>
                    You also have the right to lodge a complaint with the Information
                    Commissioner&rsquo;s Office (ICO) at{' '}
                    <a
                      href="https://ico.org.uk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline underline-offset-4"
                    >
                      ico.org.uk
                    </a>
                    .
                  </p>
                </div>
              </section>

              {/* 7. Cookies */}
              <section>
                <h2 className="font-display font-bold text-2xl text-text mb-4">7. Cookies</h2>
                <p className="text-text-muted text-base leading-relaxed">
                  We do not use cookies. Our analytics provider, Plausible Analytics, is
                  privacy-preserving and does not use cookies or track individuals. No cookie banner
                  or consent is required.
                </p>
              </section>

              {/* 8. Changes */}
              <section>
                <h2 className="font-display font-bold text-2xl text-text mb-4">
                  8. Changes to this notice
                </h2>
                <p className="text-text-muted text-base leading-relaxed">
                  We may update this privacy notice from time to time. The date at the top of this
                  page reflects the most recent revision. We will notify you of any significant
                  changes where we are able to do so. Last updated: May 2026.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  )
}
