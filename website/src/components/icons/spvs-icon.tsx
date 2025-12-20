import type { ComponentProps } from 'react'

export function SPVsIcon({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className} {...props}>
      <circle cx="20" cy="20" r="3" fill="currentColor" />
      <circle cx="12" cy="15" r="2" fill="currentColor" />
      <circle cx="28" cy="15" r="2" fill="currentColor" />
      <circle cx="12" cy="25" r="2" fill="currentColor" />
      <circle cx="28" cy="25" r="2" fill="currentColor" />
    </svg>
  )
}

