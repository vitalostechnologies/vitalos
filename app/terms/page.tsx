import type { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms governing use of the Vitalos Technologies website.',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TermsPage() {
  return (
    <PageLayout>
      <div className="pt-32 pb-12 bg-bg border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <p className="text-accent font-mono text-sm uppercase tracking-widest mb-4">Legal</p>
            <h1 className="font-display font-bold text-4xl text-text mb-4">Terms of Service</h1>
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
                <strong className="text-text font-semibold">Note:</strong> This is a template terms
                of service. Vitalos Technologies should review and finalise this with a qualified
                solicitor.
              </p>
            </div>

            <div className="space-y-10">
              {/* 1. Acceptance */}
              <section>
                <h2 className="font-display font-bold text-2xl text-text mb-4">1. Acceptance</h2>
                <p className="text-text-muted text-base leading-relaxed">
                  By accessing and using this website (vitalos.co.uk), you accept and agree to be
                  bound by these terms of service. If you do not agree to these terms, please do not
                  use this website.
                </p>
              </section>

              {/* 2. Use of website */}
              <section>
                <h2 className="font-display font-bold text-2xl text-text mb-4">
                  2. Use of website
                </h2>
                <div className="space-y-3 text-text-muted text-base leading-relaxed">
                  <p>You may use this website for lawful purposes only. You must not:</p>
                  <ul className="space-y-2 pl-4">
                    {[
                      'Use this website in any way that is unlawful or fraudulent.',
                      'Scrape, crawl, or systematically extract data from this website without our prior written permission.',
                      'Use automated tools or bots to access this website without permission.',
                      'Attempt to gain unauthorised access to any part of this website or its supporting infrastructure.',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 3. Intellectual property */}
              <section>
                <h2 className="font-display font-bold text-2xl text-text mb-4">
                  3. Intellectual property
                </h2>
                <p className="text-text-muted text-base leading-relaxed">
                  All content on this website — including text, design, code, graphics, and brand
                  elements — is the property of Vitalos Technologies Ltd and is protected by
                  copyright. All rights reserved. Nothing on this website grants you a licence to
                  reproduce, distribute, or create derivative works from our content without our
                  express written consent.
                </p>
              </section>

              {/* 4. Disclaimer */}
              <section>
                <h2 className="font-display font-bold text-2xl text-text mb-4">4. Disclaimer</h2>
                <p className="text-text-muted text-base leading-relaxed">
                  This website is provided on an &ldquo;as is&rdquo; basis. Vitalos Technologies
                  makes no warranties, express or implied, regarding the accuracy, completeness, or
                  availability of the content on this website. We reserve the right to modify,
                  update, or remove content at any time without notice.
                </p>
              </section>

              {/* 5. Limitation of liability */}
              <section>
                <h2 className="font-display font-bold text-2xl text-text mb-4">
                  5. Limitation of liability
                </h2>
                <p className="text-text-muted text-base leading-relaxed">
                  To the fullest extent permitted by law, Vitalos Technologies Ltd shall not be
                  liable for any indirect, incidental, special, consequential, or punitive loss or
                  damage arising from your use of this website or reliance on any information
                  contained within it. This includes, without limitation, loss of profits, loss of
                  data, or business interruption.
                </p>
              </section>

              {/* 6. Governing law */}
              <section>
                <h2 className="font-display font-bold text-2xl text-text mb-4">
                  6. Governing law
                </h2>
                <p className="text-text-muted text-base leading-relaxed">
                  These terms are governed by and construed in accordance with the laws of England
                  and Wales. Any disputes arising in connection with these terms shall be subject to
                  the exclusive jurisdiction of the courts of England and Wales.
                </p>
              </section>

              {/* 7. Contact */}
              <section>
                <h2 className="font-display font-bold text-2xl text-text mb-4">7. Contact</h2>
                <p className="text-text-muted text-base leading-relaxed">
                  If you have any questions about these terms, please contact us at{' '}
                  <a
                    href="mailto:hello@vitalos.co.uk"
                    className="text-accent hover:underline underline-offset-4"
                  >
                    hello@vitalos.co.uk
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  )
}
