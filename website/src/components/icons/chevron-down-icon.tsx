import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function ChevronDownIcon({ className, ...props }: ComponentProps<'svg'>) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      role="image"
      className={clsx('inline-block', className)}
      {...props}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

