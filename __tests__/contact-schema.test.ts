import { describe, it, expect } from 'vitest'
import { z } from 'zod'

// Mirror of the schema in ContactForm.tsx and app/api/contact/route.ts
const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  organisation: z.string().optional(),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(20, 'Please describe your project (at least 20 characters)'),
  website: z.string().optional(),
})

const validPayload = {
  name: 'Jane Smith',
  organisation: 'Acme Ltd',
  email: 'jane@acme.co.uk',
  phone: '+44 7700 900123',
  projectType: 'cloud-engineering',
  budget: '£25k–£75k',
  message: 'We need help migrating our legacy infrastructure to AWS.',
}

describe('Contact form schema', () => {
  it('passes with a complete valid payload', () => {
    const result = schema.safeParse(validPayload)
    expect(result.success).toBe(true)
  })

  it('passes with only required fields', () => {
    const result = schema.safeParse({
      name: 'Jo',
      email: 'jo@example.com',
      projectType: 'other',
      budget: 'Not sure yet',
      message: 'This is a message with at least twenty characters.',
    })
    expect(result.success).toBe(true)
  })

  describe('name validation', () => {
    it('rejects a name shorter than 2 characters', () => {
      const result = schema.safeParse({ ...validPayload, name: 'J' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('name')
      }
    })

    it('accepts a 2-character name', () => {
      const result = schema.safeParse({ ...validPayload, name: 'Jo' })
      expect(result.success).toBe(true)
    })
  })

  describe('email validation', () => {
    it('rejects an email without @', () => {
      const result = schema.safeParse({ ...validPayload, email: 'notanemail' })
      expect(result.success).toBe(false)
    })

    it('rejects an email without a domain', () => {
      const result = schema.safeParse({ ...validPayload, email: 'user@' })
      expect(result.success).toBe(false)
    })

    it('accepts a valid email', () => {
      const result = schema.safeParse({ ...validPayload, email: 'hello@vitalos.co.uk' })
      expect(result.success).toBe(true)
    })
  })

  describe('message validation', () => {
    it('rejects a message shorter than 20 characters', () => {
      const result = schema.safeParse({ ...validPayload, message: 'Too short.' })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('message')
      }
    })

    it('accepts a message of exactly 20 characters', () => {
      const result = schema.safeParse({ ...validPayload, message: '12345678901234567890' })
      expect(result.success).toBe(true)
    })
  })

  describe('projectType validation', () => {
    it('rejects an empty projectType', () => {
      const result = schema.safeParse({ ...validPayload, projectType: '' })
      expect(result.success).toBe(false)
    })
  })

  describe('budget validation', () => {
    it('rejects an empty budget', () => {
      const result = schema.safeParse({ ...validPayload, budget: '' })
      expect(result.success).toBe(false)
    })
  })

  describe('optional fields', () => {
    it('accepts a missing organisation', () => {
      const { organisation: _, ...rest } = validPayload
      const result = schema.safeParse(rest)
      expect(result.success).toBe(true)
    })

    it('accepts a missing phone', () => {
      const { phone: _, ...rest } = validPayload
      const result = schema.safeParse(rest)
      expect(result.success).toBe(true)
    })
  })

  describe('honeypot field', () => {
    it('parses successfully even when website is present (server checks separately)', () => {
      const result = schema.safeParse({ ...validPayload, website: 'http://bot.example.com' })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.website).toBe('http://bot.example.com')
      }
    })
  })
})
