'use client'

import React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  id: string
}

export function Textarea({ label, error, id, className = '', rows = 5, ...rest }: TextareaProps) {
  const errorId = `${id}-error`

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-text-muted mb-1.5">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className={[
          'w-full rounded-lg bg-surface-2 border border-border px-4 py-3 text-text placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-none',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        {...rest}
      />
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default Textarea
