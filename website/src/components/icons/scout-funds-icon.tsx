import type { ComponentProps } from 'react'

export function ScoutFundsIcon({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className} {...props}>
      <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M20 12 L20 8 M20 32 L20 28 M12 20 L8 20 M32 20 L28 20 M26.828 13.172 L28.485 11.515 M11.515 28.485 L13.172 26.828 M26.828 26.828 L28.485 28.485 M11.515 11.515 L13.172 13.172"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

