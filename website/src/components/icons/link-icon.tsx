import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function LinkIcon({ className, ...props }: ComponentProps<'svg'>) {
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
        d="M6.879 9.12a3 3 0 004.243 4.243l3-3a3 3 0 000-4.243l-1.5-1.5m-4.243 4.243L4.879 6.879m1.757 2.242L6.88 9.12m0 0L4.88 7.12m1.757 2.242L6.88 9.12"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

