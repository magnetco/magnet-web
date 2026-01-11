import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Container({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={clsx('mx-auto w-full max-w-[calc(100%-16px)] px-4 md:max-w-[calc(100%-32px)] md:px-6 lg:max-w-7xl lg:px-10', className)} {...props}>
      {children}
    </div>
  )
}
