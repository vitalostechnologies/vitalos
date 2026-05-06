import React from 'react'
import Link from 'next/link'
import {
  Compass,
  Cpu,
  Cloud,
  Code2,
  BarChart3,
  Shield,
  GitMerge,
  Settings,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'

interface Service {
  id: string
  icon: LucideIcon
  title: string
  description: string
  href: string
}

const services: Service[] = [
  {
    id: 'digital-transformation',
    icon: Compass,
    title: 'Digital Transformation',
    description:
      'Strategy, roadmap, and delivery for organisations modernising systems and ways of working.',
    href: '/services',
  },
  {
    id: 'ai-automation',
    icon: Cpu,
    title: 'AI & Automation',
    description:
      'Practical AI built into real workflows — from intelligent automation to custom model deployment.',
    href: '/services',
  },
  {
    id: 'cloud-engineering',
    icon: Cloud,
    title: 'Cloud Engineering & DevOps',
    description:
      'Cloud architecture, migration, and platform engineering built for reliability and scale.',
    href: '/services',
  },
  {
    id: 'software-engineering',
    icon: Code2,
    title: 'Software Engineering',
    description:
      'Custom software, APIs, and product development from design through to production.',
    href: '/services',
  },
  {
    id: 'data-analytics',
    icon: BarChart3,
    title: 'Data Analytics & BI',
    description:
      'Data platforms, pipelines, dashboards, and analytics that make data usable across the organisation.',
    href: '/services',
  },
  {
    id: 'cybersecurity',
    icon: Shield,
    title: 'Cybersecurity & Risk',
    description:
      'Security assessments, architecture review, compliance guidance, and managed security services.',
    href: '/services',
  },
  {
    id: 'enterprise-integration',
    icon: GitMerge,
    title: 'Enterprise Integration',
    description:
      'Connect disparate systems — ERP, CRM, APIs, and legacy platforms — into coherent workflows.',
    href: '/services',
  },
  {
    id: 'managed-services',
    icon: Settings,
    title: 'Managed Technology Services',
    description:
      'Ongoing technology support, monitoring, and evolution for systems we build and inherit.',
    href: '/services',
  },
]

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {services.map((service) => {
        const Icon = service.icon
        return (
          <Link
            key={service.id}
            href={service.href}
            className="bg-surface border border-border rounded-2xl p-6 flex flex-col gap-3 hover:bg-surface-2 hover:border-border transition-colors duration-200 group"
          >
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-2">
              <Icon size={24} className="text-accent" aria-hidden="true" />
            </div>
            <p className="font-display font-semibold text-base text-text group-hover:text-accent transition-colors">
              {service.title}
            </p>
            <p className="text-sm text-text-muted leading-relaxed flex-1">
              {service.description}
            </p>
            <ArrowRight
              size={14}
              className="text-text-muted group-hover:text-accent transition-colors mt-auto self-start"
              aria-hidden="true"
            />
          </Link>
        )
      })}
    </div>
  )
}

export default ServicesGrid
