import React from 'react'

interface ContainerProps {
  className?: string
  children: React.ReactNode
  /** HTML element or component to render as the container root. Defaults to div. */
  as?: React.ElementType
}

export function Container({ className = '', children, as: Tag = 'div' }: ContainerProps) {
  return (
    <Tag className={['mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  )
}

export default Container
