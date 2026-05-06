import React from 'react'
import Link from 'next/link'

/** Props for the Button component. */
interface ButtonProps {
  /** Visual style of the button. */
  variant?: 'primary' | 'secondary' | 'ghost'
  /** Size of the button. */
  size?: 'sm' | 'md' | 'lg'
  /** When provided, renders the button as an anchor tag via next/link. */
  href?: string
  /** Additional CSS classes to merge onto the root element. */
  className?: string
  children: React.ReactNode
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-accent text-white hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-accent',
  secondary:
    'border border-border text-text hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent',
  ghost:
    'text-text-muted hover:text-text hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-accent',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

const base =
  'inline-flex items-center gap-2 font-medium rounded-lg transition-colors duration-200 focus-visible:outline focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  children,
  disabled,
  type = 'button',
  onClick,
}: ButtonProps) {
  const classes = [base, variantClasses[variant], sizeClasses[size], className]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
