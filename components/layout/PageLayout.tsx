import React from 'react'

interface PageLayoutProps {
  children: React.ReactNode
  className?: string
}

export function PageLayout({ children, className = '' }: PageLayoutProps) {
  // pt-20 offsets the fixed header height so page content is never obscured
  return (
    <main className={['pt-20', className].filter(Boolean).join(' ')}>
      {children}
    </main>
  )
}

export default PageLayout
