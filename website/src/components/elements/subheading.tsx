import { clsx } from 'clsx/lite'
import { type ComponentProps } from 'react'

export function Subheading({ children, className, ...props }: ComponentProps<'h2'>) {
  return (
    <h2
      className={clsx(
        'font-display text-[2rem]/[100%] tracking-tight text-pretty text-oxblood sm:text-5xl/[100%] dark:text-ember',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}
