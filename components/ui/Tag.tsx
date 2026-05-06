import React from 'react'

interface TagProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'accent' | 'accent-2'
}

const variantClasses: Record<NonNullable<TagProps['variant']>, string> = {
  default: 'bg-surface text-text-muted border border-border',
  accent: 'bg-accent/10 text-accent border border-accent/20',
  'accent-2': 'bg-accent-2/10 text-accent-2 border border-accent-2/20',
}

const base = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-medium'

export function Tag({ children, className = '', variant = 'default' }: TagProps) {
  return (
    <span className={[base, variantClasses[variant], className].filter(Boolean).join(' ')}>
      {children}
    </span>
  )
}

export default Tag
