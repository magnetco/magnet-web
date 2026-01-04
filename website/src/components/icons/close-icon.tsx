import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function CloseIcon({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      role="image"
      className={clsx('inline-block', className)}
      {...props}
    >
      <path d="M18 6L6 18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6L18 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

