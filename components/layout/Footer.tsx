import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'

const serviceLinks = [
  'Digital Transformation',
  'AI & Automation',
  'Cloud Engineering',
  'Software Engineering',
  'Data & BI',
  'Cybersecurity',
  'Enterprise Integration',
  'Managed Services',
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Industries', href: '/industries' },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Insights', href: '/insights' },
]

const legalLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Contact', href: '/contact' },
]

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-text mb-4">{title}</h3>
      <ul className="space-y-2.5" role="list">
        {children}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="bg-bg border-t border-border">
      <Container>
        <div className="py-16 grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label="Vitalos Technologies home">
              <Image
                src="/vitalos_logo_white.png"
                alt="Vitalos Technologies"
                width={120}
                height={32}
              />
            </Link>
            <p className="mt-4 text-sm text-text-muted leading-relaxed max-w-xs">
              A practical technology partner for organisations building the future.
            </p>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <FooterColumn title="Services">
              {serviceLinks.map((name) => (
                <li key={name}>
                  <Link
                    href="/services"
                    className="text-sm text-text-muted hover:text-text transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Company">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Legal">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-text transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </FooterColumn>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            &copy; 2026 Vitalos Technologies Ltd. Registered in England and Wales.
          </p>
          <a
            href="mailto:hello@vitalos.co.uk"
            className="text-xs text-text-muted hover:text-text transition-colors duration-200 font-mono"
          >
            hello@vitalos.co.uk
          </a>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
