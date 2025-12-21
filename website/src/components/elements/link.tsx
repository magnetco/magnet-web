import { clsx } from 'clsx/lite'
import NextLink from 'next/link'
import type { ComponentProps } from 'react'

export function Link({
  href,
  className,
  ...props
}: {
  href: string
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <NextLink
      href={href}
      className={clsx(
        'relative inline-block text-sm/7 font-medium text-oxblood dark:text-coral after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100 hover:text-ember transition-colors duration-200',
        className
      )}
      {...props}
    />
  )
}
