import { clsx } from 'clsx/lite'
import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'

export function FooterCategory({ title, children, ...props }: { title: ReactNode } & ComponentProps<'div'>) {
  return (
    <div {...props}>
      <h3>{title}</h3>
      <ul role="list" className="mt-2 flex flex-col gap-2">
        {children}
      </ul>
    </div>
  )
}

export function FooterLink({ href, className, ...props }: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <li className={clsx('text-oxblood dark:text-coral', className)}>
      <Link
        href={href}
        className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100 hover:text-frost transition-colors duration-200"
        {...props}
      />
    </li>
  )
}

export function FooterWithLinkCategories({
  links,
  fineprint,
  className,
  ...props
}: {
  links: ReactNode
  fineprint: ReactNode
} & ComponentProps<'footer'>) {
  return (
    <footer className={clsx('pt-16', className)} {...props}>
      <div className="bg-olive-950/2.5 py-16 text-oxblood">
        <Container className="flex flex-col gap-16">
          <nav className="grid grid-cols-2 gap-6 text-sm/7 sm:has-[>:last-child:nth-child(3)]:grid-cols-3 sm:has-[>:nth-child(5)]:grid-cols-3 md:has-[>:last-child:nth-child(4)]:grid-cols-4 lg:has-[>:nth-child(5)]:grid-cols-5">
            {links}
          </nav>
          <div className="text-sm/7 text-olive-600 dark:text-olive-500">{fineprint}</div>
        </Container>
      </div>
    </footer>
  )
}
