import type { ComponentProps } from 'react'

export function Bullet({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className="inline-block size-[6px] shrink-0 rounded-[2px]"
      style={{ backgroundColor: 'var(--color-ember)' }}
      aria-hidden="true"
      {...props}
    />
  )
}

