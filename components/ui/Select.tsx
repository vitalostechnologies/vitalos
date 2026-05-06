'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  id: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export function Select({
  label,
  error,
  id,
  options,
  placeholder = 'Select an option',
  className = '',
  ...rest
}: SelectProps) {
  const errorId = `${id}-error`

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-text-muted mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className={[
            'w-full rounded-lg bg-surface-2 border border-border px-4 py-3 text-text focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors appearance-none cursor-pointer',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Chevron is decorative; the native select handles interaction */}
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
          size={18}
          aria-hidden="true"
        />
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-sm text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export default Select
