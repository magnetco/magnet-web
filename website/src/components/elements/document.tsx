import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Document({ children, className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'space-y-4 text-sm/7 text-oxblood dark:text-coral [&_a]:font-semibold [&_a]:text-oxblood [&_a]:underline [&_a]:underline-offset-4 dark:[&_a]:text-coral [&_h2]:text-base/8 [&_h2]:font-medium [&_h2]:text-oxblood [&_h2]:not-first:mt-8 dark:[&_h2]:text-ember [&_li]:pl-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_strong]:font-semibold [&_strong]:text-oxblood dark:[&_strong]:text-ember [&_ul]:list-[square] [&_ul]:pl-6 [&_ul]:marker:text-basalt dark:[&_ul]:marker:text-basalt',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
