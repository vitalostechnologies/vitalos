import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  organisation: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  projectType: z.string().min(1),
  budget: z.string().min(1),
  message: z.string().min(20),
  website: z.string().optional(), // honeypot
})

// In-memory rate limiter: IP → { count, resetAt }
// Resets every hour, max 3 submissions per IP
const rateMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 3600_000 })
    return true
  }

  if (entry.count >= 3) return false

  entry.count += 1
  return true
}

const resend = new Resend(process.env.RESEND_API_KEY)

const PROJECT_TYPE_LABELS: Record<string, string> = {
  'digital-transformation': 'Digital Transformation',
  'ai-automation': 'AI & Automation',
  'cloud-engineering': 'Cloud Engineering & DevOps',
  'software-development': 'Software Development',
  'data-analytics': 'Data Analytics & BI',
  'cybersecurity': 'Cybersecurity & Risk',
  'enterprise-integration': 'Enterprise Integration',
  'managed-services': 'Managed Technology Services',
  'other': 'Something else',
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid submission.', issues: parsed.error.issues },
      { status: 422 }
    )
  }

  const { name, organisation, email, phone, projectType, budget, message, website } =
    parsed.data

  // Honeypot check — discard silently
  if (website) {
    return NextResponse.json({ ok: true })
  }

  const to = process.env.CONTACT_TO ?? process.env.MAIL_TO ?? 'hello@vitalos.co.uk'
  const projectLabel = PROJECT_TYPE_LABELS[projectType] ?? projectType

  try {
    await resend.emails.send({
      from: 'Vitalos Contact <noreply@vitalos.co.uk>',
      to,
      replyTo: email,
      subject: `New enquiry: ${projectLabel} from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 12px;">
            New enquiry via vitalos.co.uk
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 140px; vertical-align: top;"><strong>Name</strong></td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            ${organisation ? `<tr><td style="padding: 8px 0; color: #64748b; vertical-align: top;"><strong>Organisation</strong></td><td style="padding: 8px 0;">${organisation}</td></tr>` : ''}
            <tr>
              <td style="padding: 8px 0; color: #64748b; vertical-align: top;"><strong>Email</strong></td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #64748b; vertical-align: top;"><strong>Phone</strong></td><td style="padding: 8px 0;">${phone}</td></tr>` : ''}
            <tr>
              <td style="padding: 8px 0; color: #64748b; vertical-align: top;"><strong>Project type</strong></td>
              <td style="padding: 8px 0;">${projectLabel}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; vertical-align: top;"><strong>Budget</strong></td>
              <td style="padding: 8px 0;">${budget}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; vertical-align: top; padding-top: 16px;"><strong>Message</strong></td>
              <td style="padding: 8px 0; padding-top: 16px; white-space: pre-wrap;">${message}</td>
            </tr>
          </table>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form send error:', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
