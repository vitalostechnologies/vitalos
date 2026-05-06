import React from 'react'

interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  lede?: string
  className?: string
  centered?: boolean
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export function SectionHeader({
  eyebrow,
  heading,
  lede,
  className,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered ? 'text-center' : undefined, className)}>
      {eyebrow && (
        <p className="text-accent font-mono text-sm uppercase tracking-widest mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-text leading-tight mb-4">
        {heading}
      </h2>
      {lede && (
        <p
          className={cn(
            'text-text-muted text-lg leading-relaxed max-w-2xl',
            centered ? 'mx-auto' : undefined,
          )}
        >
          {lede}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
