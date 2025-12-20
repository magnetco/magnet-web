import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Bullet({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={clsx('inline-block size-[6px] shrink-0 rounded-[2px] transition-opacity', className)}
      style={{ backgroundColor: 'var(--color-ember)' }}
      aria-hidden="true"
      {...props}
    />
  )
}

