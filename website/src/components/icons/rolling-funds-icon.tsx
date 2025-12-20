import type { ComponentProps } from 'react'

export function RollingFundsIcon({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className} {...props}>
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <circle cx="28" cy="12" r="3" fill="currentColor" />
      <circle cx="12" cy="28" r="3" fill="currentColor" />
      <circle cx="28" cy="28" r="3" fill="currentColor" />
      <path
        d="M12 12 L28 12 M12 28 L28 28 M12 12 L12 28 M28 12 L28 28"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

