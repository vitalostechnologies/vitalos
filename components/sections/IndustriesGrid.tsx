import React from 'react'
import Link from 'next/link'
import {
  Heart,
  Users,
  Truck,
  ShoppingBag,
  Building2,
  Rocket,
  type LucideIcon,
} from 'lucide-react'

interface Industry {
  icon: LucideIcon
  title: string
  description: string
  value: string
}

const industries: Industry[] = [
  {
    icon: Heart,
    title: 'Healthcare & Wellbeing',
    description:
      'Digital tools and AI for healthcare providers, clinics, and wellness services.',
    value: 'Faster pathways, better patient outcomes, reduced administrative burden.',
  },
  {
    icon: Users,
    title: 'Care & Social Support',
    description: 'Technology for care providers, local authorities, and social care teams.',
    value: 'Better coordination, compliance, and visibility across care networks.',
  },
  {
    icon: Truck,
    title: 'Logistics & Operations',
    description:
      'Route optimisation, fleet management, warehouse automation, and supply chain visibility.',
    value: 'Lower costs, faster fulfilment, real-time operational intelligence.',
  },
  {
    icon: ShoppingBag,
    title: 'Retail & E-commerce',
    description: 'Platforms, integrations, and data tools for retail and online merchants.',
    value: 'Better customer experience, inventory intelligence, and growth at scale.',
  },
  {
    icon: Building2,
    title: 'Public Sector & Nonprofits',
    description:
      'Accessible, secure, and compliant digital services for public bodies and charities.',
    value:
      'Modern services that work for everyone, within procurement and security constraints.',
  },
  {
    icon: Rocket,
    title: 'Startups & Growing Businesses',
    description: 'Engineering and product help for ambitious startups and scale-ups.',
    value:
      'From MVP to production — without building an in-house engineering team from day one.',
  },
]

export function IndustriesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {industries.map((industry) => {
        const Icon = industry.icon
        return (
          <Link
            key={industry.title}
            href="/industries"
            className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-3 hover:bg-surface-2 transition-colors duration-200"
          >
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Icon size={24} className="text-accent" aria-hidden="true" />
            </div>
            <p className="font-display font-semibold text-lg text-text">{industry.title}</p>
            <p className="text-text-muted text-sm leading-relaxed flex-1">
              {industry.description}
            </p>
            <p className="text-sm text-text-muted border-t border-border pt-3 mt-auto">
              {industry.value}
            </p>
          </Link>
        )
      })}
    </div>
  )
}

export default IndustriesGrid
