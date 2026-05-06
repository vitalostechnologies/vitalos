import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Tag from '@/components/ui/Tag'

describe('Tag', () => {
  it('renders its text content', () => {
    render(<Tag>AI & Automation</Tag>)
    expect(screen.getByText('AI & Automation')).toBeInTheDocument()
  })

  it('applies default variant styles', () => {
    render(<Tag>Default</Tag>)
    const el = screen.getByText('Default')
    expect(el.className).toMatch(/rounded-full/)
  })

  it('applies accent variant styles', () => {
    render(<Tag variant="accent">Accent</Tag>)
    const el = screen.getByText('Accent')
    expect(el.className).toMatch(/text-accent/)
  })

  it('applies accent-2 variant styles', () => {
    render(<Tag variant="accent-2">Accent 2</Tag>)
    const el = screen.getByText('Accent 2')
    expect(el.className).toMatch(/text-accent-2/)
  })

  it('merges a custom className', () => {
    render(<Tag className="custom-cls">Test</Tag>)
    expect(screen.getByText('Test').className).toMatch(/custom-cls/)
  })
})
