import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Eyebrow({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={clsx('font-mono text-xs font-bold uppercase tracking-[0.03em] text-ember', className)} {...props}>
      {children}
    </div>
  )
}
