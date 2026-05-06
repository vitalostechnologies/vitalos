'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Technologies', href: '/technologies' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'About', href: '/about' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={[
        'z-50 fixed top-0 left-0 right-0 transition-all duration-300',
        scrolled ? 'backdrop-blur-md bg-bg/80 border-b border-border' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Container>
        <nav aria-label="Main navigation" className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" aria-label="Vitalos Technologies home">
            <Image
              src="/vitalos_logo_white.png"
              alt="Vitalos Technologies"
              width={120}
              height={32}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                    pathname === item.href
                      ? 'text-accent'
                      : 'text-text-muted hover:text-text hover:bg-surface-2',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="/contact" variant="primary" size="sm">
              Book a discovery call
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-text-muted hover:text-text hover:bg-surface-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-border bg-bg/95 backdrop-blur-md"
        >
          <Container>
            <ul className="flex flex-col py-4 gap-1" role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={[
                      'block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200',
                      pathname === item.href
                        ? 'text-accent bg-accent/10'
                        : 'text-text-muted hover:text-text hover:bg-surface-2',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button href="/contact" variant="primary" size="sm" className="w-full justify-center">
                  Book a discovery call
                </Button>
              </li>
            </ul>
          </Container>
        </div>
      )}
    </header>
  )
}

export default Header
