import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Eyebrow({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={clsx('mb-8 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.03em] text-ember', className)} {...props}>
      <span className="h-1.5 w-1.5 rounded-full bg-stone-300" aria-hidden="true" />
      {children}
    </div>
  )
}
