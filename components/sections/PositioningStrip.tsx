import React from 'react'
import { Container } from '@/components/ui/Container'
import { Tag } from '@/components/ui/Tag'

const services = [
  'AI & Automation',
  'Cloud Engineering',
  'Software Development',
  'Data & BI',
  'Cybersecurity',
  'Integration',
]

export function PositioningStrip() {
  return (
    <div className="bg-surface border-y border-border py-5">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {services.map((service, index) => (
            <React.Fragment key={service}>
              <Tag variant="default" className="font-mono">
                {service}
              </Tag>
              {index < services.length - 1 && (
                <span className="text-text-muted select-none" aria-hidden="true">
                  ·
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default PositioningStrip
