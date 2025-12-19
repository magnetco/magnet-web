import type { ComponentProps } from 'react'

export function VentureFundsIcon({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className} {...props}>
      <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="26" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M20 20 L28 28 M28 20 L20 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

