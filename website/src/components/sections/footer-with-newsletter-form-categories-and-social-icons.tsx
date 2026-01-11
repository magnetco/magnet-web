'use client'

import { clsx } from 'clsx/lite'
import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { GridBgStripes, GridBgBorderLine } from '../elements/grid-bg'
import { ArrowNarrowRightIcon } from '../icons/arrow-narrow-right-icon'
import { TransitionLink } from '../transitions'

export function FooterCategory({ title, children, ...props }: { title: ReactNode } & ComponentProps<'div'>) {
  return (
    <div {...props}>
      <h3 className="font-mono text-xs font-bold uppercase tracking-[0.03em] text-coral mb-[16px]">{title}</h3>
      <ul role="list" className="mt-2 flex flex-col gap-2">
        {children}
      </ul>
    </div>
  )
}

export function FooterLink({ href, className, ...props }: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <li className={clsx('text-coral', className)}>
      <TransitionLink
        href={href}
        className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100 hover:text-frost transition-colors duration-200"
        {...props}
      />
    </li>
  )
}

export function SocialLink({
  href,
  name,
  className,
  ...props
}: {
  href: string
  name: string
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Link
      href={href}
      target="_blank"
      aria-label={name}
      className={clsx('text-coral', className)}
      {...props}
    />
  )
}

export function NewsletterForm({
  headline,
  subheadline,
  className,
  ...props
}: {
  headline: ReactNode
  subheadline: ReactNode
} & ComponentProps<'form'>) {
  return (
    <form className={clsx('flex max-w-sm flex-col gap-2', className)} {...props}>
      <p className="text-coral">{headline}</p>
      <div className="flex flex-col gap-4 text-coral">{subheadline}</div>
      <div className="flex items-center border-b border-coral/20 py-2 has-[input:focus]:border-coral">
        <input
          type="email"
          placeholder="Email"
          aria-label="Email"
          className="flex-1 text-coral placeholder:text-coral/60"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="relative inline-flex size-7 cursor-pointer items-center justify-center rounded-full after:absolute after:-inset-2 hover:bg-coral/10 after:pointer-fine:hidden text-coral"
        >
          <ArrowNarrowRightIcon />
        </button>
      </div>
    </form>
  )
}

export function FooterWithNewsletterFormCategoriesAndSocialIcons({
  cta,
  links,
  fineprint,
  socialLinks,
  className,
  ...props
}: {
  cta: ReactNode
  links: ReactNode
  fineprint: ReactNode
  socialLinks?: ReactNode
} & ComponentProps<'footer'>) {
  return (
    <footer className={clsx('relative pt-0', className)} {...props}>
      {/* Grid BG effect for footer */}
      <GridBgStripes color="coral" />
      <GridBgBorderLine position="left" color="coral" />
      <GridBgBorderLine position="right" color="coral" />
      <GridBgBorderLine position="top" color="coral" />
      
      <div
        className="relative py-20 text-coral"
        style={{ backgroundColor: 'var(--color-oxblood)' }}
      >
        <Container className="flex flex-col gap-16">
          <div className="grid grid-cols-1 gap-x-6 gap-y-16 text-sm/7 lg:grid-cols-2">
            {cta}
            <nav className="grid grid-cols-2 gap-x-12 gap-y-6 sm:has-[>:last-child:nth-child(3)]:grid-cols-3 sm:has-[>:nth-child(5)]:grid-cols-3 md:has-[>:last-child:nth-child(4)]:grid-cols-4 md:justify-between lg:max-xl:has-[>:last-child:nth-child(4)]:grid-cols-2">
              {links}
            </nav>
          </div>
          <div className="flex items-center justify-between gap-10 text-sm/7">
            <div className="text-coral/80">{fineprint}</div>
            {socialLinks && <div className="flex items-center gap-4 sm:gap-10">{socialLinks}</div>}
          </div>
        </Container>
      </div>
    </footer>
  )
}
