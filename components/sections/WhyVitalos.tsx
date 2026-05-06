import React from 'react'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/sections/SectionHeader'
import {
  Layers,
  BrainCircuit,
  TrendingUp,
  Zap,
  Package,
  UserCheck,
  type LucideIcon,
} from 'lucide-react'

interface Reason {
  title: string
  body: string
  icon: LucideIcon
}

const reasons: Reason[] = [
  {
    title: 'Strategy plus engineering',
    body: 'We define the direction and ship the system.',
    icon: Layers,
  },
  {
    title: 'AI used where it earns its place',
    body: 'Designed into workflows where it creates real value, not pasted on top.',
    icon: BrainCircuit,
  },
  {
    title: 'Practical and commercial',
    body: 'Solutions that improve operations, reduce cost, raise service quality, or open new digital revenue.',
    icon: TrendingUp,
  },
  {
    title: 'Faster than traditional consulting',
    body: 'Lean, hands-on, focused on outcomes over decks.',
    icon: Zap,
  },
  {
    title: 'We build product, not just projects',
    body: 'Proprietary platforms and reusable accelerators that compound over time.',
    icon: Package,
  },
  {
    title: 'Human-centred',
    body: 'Designed around the people who actually use the system.',
    icon: UserCheck,
  },
]

function padNumber(n: number): string {
  return String(n).padStart(2, '0')
}

export function WhyVitalos() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeader
          eyebrow="Why Vitalos"
          heading="Built to deliver, not just advise."
          className="mb-14"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div
                key={reason.title}
                className="p-6 rounded-2xl bg-surface border border-border"
              >
                <p className="text-4xl font-display font-bold text-accent/20 mb-3">
                  {padNumber(index + 1)}
                </p>
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-accent" aria-hidden="true" />
                </div>
                <p className="font-display font-semibold text-text mb-2">{reason.title}</p>
                <p className="text-text-muted text-sm leading-relaxed">{reason.body}</p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

export default WhyVitalos
