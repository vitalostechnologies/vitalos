import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '@/components/ui/Button'

// Mock next/link — Vitest/jsdom doesn't provide routing context
vi.mock('next/link', () => ({
  default: ({ children, href, ...rest }: { children: React.ReactNode; href: string; [key: string]: unknown }) => (
    <a href={href} {...rest}>{children}</a>
  ),
}))

describe('Button', () => {
  it('renders as a <button> by default', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('renders as an <a> when href is provided', () => {
    render(<Button href="/contact">Contact</Button>)
    const link = screen.getByRole('link', { name: 'Contact' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const fn = vi.fn()
    render(<Button onClick={fn}>Go</Button>)
    await user.click(screen.getByRole('button', { name: 'Go' }))
    expect(fn).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const fn = vi.fn()
    render(<Button onClick={fn} disabled>Go</Button>)
    await user.click(screen.getByRole('button', { name: 'Go' }))
    expect(fn).not.toHaveBeenCalled()
  })

  it('applies the primary variant class by default', () => {
    render(<Button>Primary</Button>)
    const btn = screen.getByRole('button', { name: 'Primary' })
    expect(btn.className).toMatch(/bg-accent/)
  })

  it('applies secondary variant classes', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const btn = screen.getByRole('button', { name: 'Secondary' })
    expect(btn.className).toMatch(/border/)
  })

  it('renders with type="submit" when specified', () => {
    render(<Button type="submit">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })
})
