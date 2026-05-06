import React from 'react'

interface CardProps {
  className?: string
  children: React.ReactNode
  /** When true, adds hover background and border transition styles. */
  hover?: boolean
}

export function Card({ className = '', children, hover = false }: CardProps) {
  const classes = [
    'bg-surface border border-border rounded-2xl',
    hover ? 'transition-colors duration-200 hover:bg-surface-2 hover:border-border' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes}>{children}</div>
}

export default Card
