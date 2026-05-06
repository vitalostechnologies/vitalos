'use client'

import React, { Suspense, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'

// ---------------------------------------------------------------------------
// Zod schema
// ---------------------------------------------------------------------------

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  organisation: z.string().optional(),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(20, 'Please describe your project (at least 20 characters)'),
  website: z.string().optional(), // honeypot
})

type FormValues = z.infer<typeof schema>

// ---------------------------------------------------------------------------
// Options
// ---------------------------------------------------------------------------

const projectTypeOptions = [
  { value: 'digital-transformation', label: 'Digital Transformation' },
  { value: 'ai-automation', label: 'AI & Automation' },
  { value: 'cloud-engineering', label: 'Cloud Engineering & DevOps' },
  { value: 'software-development', label: 'Software Development' },
  { value: 'data-analytics', label: 'Data Analytics & BI' },
  { value: 'cybersecurity', label: 'Cybersecurity & Risk' },
  { value: 'enterprise-integration', label: 'Enterprise Integration' },
  { value: 'managed-services', label: 'Managed Technology Services' },
  { value: 'other', label: 'Something else' },
]

const budgetOptions = [
  { value: 'under-10k', label: 'Under £10k' },
  { value: '10k-25k', label: '£10k–£25k' },
  { value: '25k-75k', label: '£25k–£75k' },
  { value: '75k-200k', label: '£75k–£200k' },
  { value: '200k-plus', label: '£200k+' },
  { value: 'not-sure', label: 'Not sure yet' },
]

// ---------------------------------------------------------------------------
// Inner form — reads search params (must be inside Suspense boundary)
// ---------------------------------------------------------------------------

interface ContactFormInnerProps {
  defaultProjectType?: string
  className?: string
}

function ContactFormInner({ defaultProjectType, className = '' }: ContactFormInnerProps) {
  const searchParams = useSearchParams()
  const typeParam = searchParams.get('type') ?? defaultProjectType ?? ''

  const [submitted, setSubmitted] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      organisation: '',
      email: '',
      phone: '',
      projectType: typeParam,
      budget: '',
      message: '',
      website: '',
    },
  })

  // Sync query param → form field after mount
  useEffect(() => {
    if (typeParam) {
      setValue('projectType', typeParam)
    }
  }, [typeParam, setValue])

  async function onSubmit(data: FormValues) {
    setSubmitError(null)

    // Honeypot check — silently succeed without sending
    if (data.website) {
      setSubmitted(true)
      return
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(
          (body as { message?: string }).message ?? 'Something went wrong. Please try again.',
        )
      }

      setSubmitted(true)
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      )
    }
  }

  // -------------------------------------------------------------------------
  // Success state
  // -------------------------------------------------------------------------

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-4 py-16 px-6 bg-surface border border-border rounded-2xl">
        <CheckCircle size={48} className="text-success" aria-hidden="true" />
        <div>
          <h3 className="font-display font-semibold text-xl text-text mb-2">Message sent</h3>
          <p className="text-text-muted text-base leading-relaxed">
            Thank you for reaching out. We&apos;ll be in touch shortly.
          </p>
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------------------
  // Form
  // -------------------------------------------------------------------------

  const disabled = isSubmitting

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={['flex flex-col gap-6', className].filter(Boolean).join(' ')}
    >
      {/* Honeypot — visually hidden */}
      <div className="sr-only" aria-hidden="true">
        <Input
          label="Website"
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      {/* Row 1: Name / Organisation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Name *"
          id="name"
          placeholder="Jane Smith"
          autoComplete="name"
          disabled={disabled}
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Organisation"
          id="organisation"
          placeholder="Acme Ltd"
          autoComplete="organization"
          disabled={disabled}
          error={errors.organisation?.message}
          {...register('organisation')}
        />
      </div>

      {/* Row 2: Email / Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email *"
          id="email"
          type="email"
          placeholder="jane@example.com"
          autoComplete="email"
          disabled={disabled}
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Phone"
          id="phone"
          type="tel"
          placeholder="+44 7700 000000"
          autoComplete="tel"
          disabled={disabled}
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      {/* Row 3: Project type / Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Project type *"
          id="projectType"
          placeholder="Select a project type"
          options={projectTypeOptions}
          disabled={disabled}
          error={errors.projectType?.message}
          {...register('projectType')}
        />
        <Select
          label="Budget range *"
          id="budget"
          placeholder="Select a budget range"
          options={budgetOptions}
          disabled={disabled}
          error={errors.budget?.message}
          {...register('budget')}
        />
      </div>

      {/* Message — full width */}
      <Textarea
        label="Tell us about your project *"
        id="message"
        rows={6}
        placeholder="Describe what you're trying to build or solve, and any relevant context…"
        disabled={disabled}
        error={errors.message?.message}
        {...register('message')}
      />

      {/* Error banner */}
      {submitError && (
        <p className="text-danger text-sm" role="alert">
          {submitError}
        </p>
      )}

      {/* Submit — right-aligned */}
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={disabled}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            'Send enquiry'
          )}
        </Button>
      </div>
    </form>
  )
}

// ---------------------------------------------------------------------------
// Public export — wraps inner form in Suspense for useSearchParams
// ---------------------------------------------------------------------------

interface ContactFormProps {
  defaultProjectType?: string
  className?: string
}

export function ContactForm({ defaultProjectType, className }: ContactFormProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-16 text-text-muted text-sm">
          <Loader2 size={20} className="animate-spin mr-2" aria-hidden="true" />
          Loading form…
        </div>
      }
    >
      <ContactFormInner defaultProjectType={defaultProjectType} className={className} />
    </Suspense>
  )
}

export default ContactForm
