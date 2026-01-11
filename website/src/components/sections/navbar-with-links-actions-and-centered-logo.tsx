'use client'

import { ElDialog, ElDialogPanel } from '@tailwindplus/elements/react'
import { clsx } from 'clsx/lite'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ComponentProps, type ReactNode } from 'react'
import { ChevronDownIcon } from '../icons/chevron-down-icon'
import { MagnifyingGlassIcon } from '../icons/magnifying-glass-icon'
import { LinkedInIcon } from '../icons/social/linkedin-icon'
import { GridBgBorderLine, GridBgStripes } from '../elements/grid-bg'
import { TransitionLink } from '../transitions'

export function NavbarLink({
  children,
  href,
  className,
  ...props
}: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <TransitionLink
      href={href}
      className={clsx(
        'group relative inline-flex items-center justify-between gap-2 text-3xl/10 font-medium text-oxblood lg:text-sm/7 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100 hover:text-ember transition-colors duration-200',
        className,
      )}
      {...props}
    >
      {children}
      <span className="inline-flex p-1.5 opacity-0 group-hover:opacity-100 lg:hidden" aria-hidden="true">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </span>
    </TransitionLink>
  )
}

export function NavbarLogo({ className, href, ...props }: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return <Link href={href} {...props} className={clsx('inline-flex items-stretch', className)} />
}

export function NavbarDropdown({
  label,
  children,
  className,
  ...props
}: {
  label: ReactNode
  children: ReactNode
} & Omit<ComponentProps<'div'>, 'children'>) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={clsx('relative', className)} {...props}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className={clsx(
          'group relative inline-flex items-center gap-1.5 text-3xl/10 font-medium text-oxblood lg:text-sm/7 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 after:ease-in-out hover:after:scale-x-100 hover:text-ember transition-colors duration-200',
        )}
      >
        {label}
        <ChevronDownIcon
          className={clsx(
            'h-3 w-3 transition-transform duration-200 lg:h-3.5 lg:w-3.5',
            isOpen && 'rotate-180',
          )}
        />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute top-full left-1/2 z-20 mt-2 w-[calc(100vw-3rem)] max-w-7xl -translate-x-1/2 lg:mt-1">
            <div className="rounded-lg border border-oxblood/10 bg-olive-100 p-6 shadow-xl dark:border-white/10 dark:bg-olive-950">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {children}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export function NavbarDropdownItem({
  title,
  subcopy,
  href,
  className,
  ...props
}: {
  title: string
  subcopy: string
  href: string
} & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <TransitionLink
      href={href}
      className={clsx(
        'group flex flex-col gap-2 rounded-lg border border-transparent p-4 transition-all hover:border-oxblood/20 hover:bg-oxblood/5 dark:hover:border-white/20 dark:hover:bg-white/5',
        className,
      )}
      {...props}
    >
      <h3 className="text-base/8 font-medium text-oxblood dark:text-ember">{title}</h3>
      <p className="text-sm/7 text-olive-500">{subcopy}</p>
    </TransitionLink>
  )
}

export function NavbarDropdownLink({
  children,
  href,
  className,
  ...props
}: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <TransitionLink
      href={href}
      className={clsx(
        'block px-4 py-2 text-sm/7 text-oxblood transition-colors hover:bg-oxblood/5 hover:text-ember dark:text-coral dark:hover:bg-white/5 dark:hover:text-ember',
        className,
      )}
      {...props}
    >
      {children}
    </TransitionLink>
  )
}

function MobileMenuCard({
  label,
  children,
  className,
}: {
  label?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={clsx('rounded-xl border border-coral/15 bg-coral/5 p-6', className)}>
      {label && (
        <p className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-coral/50">
          {label}
        </p>
      )}
      {children}
    </div>
  )
}

function MobileMenuLink({
  children,
  href,
  isActive,
  className,
  ...props
}: { href: string; isActive?: boolean } & Omit<ComponentProps<'a'>, 'href'>) {
  const closeMenu = () => {
    const dialog = document.getElementById('mobile-menu') as HTMLDialogElement | null
    dialog?.close()
  }

  return (
    <TransitionLink
      href={href}
      onClick={closeMenu}
      className={clsx(
        'mobile-menu-link relative inline-block py-3 text-3xl/tight font-medium transition-colors duration-300',
        'after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-frost after:transition-transform after:duration-300 after:ease-out',
        'hover:text-frost hover:after:scale-x-100',
        isActive ? 'text-ember' : 'text-coral',
        className,
      )}
      {...props}
    >
      {children}
    </TransitionLink>
  )
}

function MobileMenuSecondaryLink({
  children,
  href,
  className,
  ...props
}: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  const closeMenu = () => {
    const dialog = document.getElementById('mobile-menu') as HTMLDialogElement | null
    dialog?.close()
  }

  return (
    <TransitionLink
      href={href}
      onClick={closeMenu}
      className={clsx(
        'inline-block py-2 text-base font-medium text-coral transition-colors duration-200 hover:text-frost',
        className,
      )}
      {...props}
    >
      {children}
    </TransitionLink>
  )
}

export function NavbarWithLinksActionsAndCenteredLogo({
  links,
  logo,
  actions,
  className,
  withGridBg = false,
  ...props
}: {
  links: ReactNode
  logo: ReactNode
  actions: ReactNode
  withGridBg?: boolean
} & ComponentProps<'header'>) {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  const closeMenu = () => {
    const dialog = document.getElementById('mobile-menu') as HTMLDialogElement | null
    dialog?.close()
  }

  const openSearch = () => {
    closeMenu()
    // Small delay to let menu close animation start
    setTimeout(() => {
      // Trigger the global search by dispatching Cmd+K
      const event = new KeyboardEvent('keydown', {
        key: 'k',
        metaKey: true,
        bubbles: true,
      })
      document.dispatchEvent(event)
    }, 150)
  }

  return (
    <header
      className={clsx('sticky top-0 z-10', className)}
      style={{
        backgroundColor: 'var(--navbar-bg)',
      }}
      {...props}
    >
      <style>{`:root { --scroll-padding-top: 5.25rem }`}</style>

      {/* Grid BG decorations */}
      {withGridBg && (
        <>
          <GridBgStripes />
          <GridBgBorderLine position="left" />
          <GridBgBorderLine position="right" />
          <GridBgBorderLine position="bottom" />
        </>
      )}

      <nav className="relative">
        <div className="mx-auto flex h-(--scroll-padding-top) w-full max-w-[calc(100%-16px)] items-center gap-4 px-4 md:max-w-[calc(100%-32px)] md:px-6 lg:max-w-7xl lg:px-10">
          <div className="flex items-center">{logo}</div>
          <div className="flex flex-1 items-center justify-end gap-8">
            <div className="flex gap-8 max-lg:hidden">{links}</div>
            <div className="flex shrink-0 items-center gap-5">{actions}</div>

            <button
              command="show-modal"
              commandfor="mobile-menu"
              aria-label="Toggle menu"
              className="inline-flex cursor-pointer rounded-full p-1.5 text-oxblood hover:bg-oxblood/10 lg:hidden"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path
                  fillRule="evenodd"
                  d="M3.748 8.248a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75ZM3.748 15.75a.75.75 0 0 1 .75-.751h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <ElDialog className="lg:hidden">
          <dialog id="mobile-menu" className="backdrop:bg-transparent">
            <ElDialogPanel className="mobile-menu-panel fixed inset-0 flex flex-col overflow-y-auto bg-juniper">
              {/* Header */}
              <div className="mobile-menu-content flex items-center justify-between px-6 py-5">
                {/* Logo - coral on dark */}
                <Link href="/" onClick={closeMenu} className="text-coral">
                  <svg width="99" height="27" viewBox="0 0 99 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.48 21L9.51 20.37L18.21 0H21.54V0.630001L12.84 21H9.48ZM0 21V0H3.45V21H0ZM9.51 21L0.78 0.630001V0H4.14L12.84 20.37V21H9.51ZM18.87 21V0H22.32V21H18.87Z" fill="currentColor"/>
                    <path d="M30.2058 21.45C29.1658 21.45 28.2358 21.25 27.4158 20.85C26.6158 20.45 25.9858 19.89 25.5258 19.17C25.0658 18.45 24.8358 17.63 24.8358 16.71C24.8358 15.29 25.3258 14.16 26.3058 13.32C27.2858 12.46 28.6958 11.96 30.5358 11.82L36.4158 11.34V14.19L31.0458 14.64C30.0858 14.72 29.3958 14.92 28.9758 15.24C28.5558 15.56 28.3458 15.99 28.3458 16.53C28.3458 17.07 28.5858 17.51 29.0658 17.85C29.5458 18.19 30.1558 18.36 30.8958 18.36C31.6758 18.36 32.3758 18.17 32.9958 17.79C33.6358 17.39 34.1458 16.88 34.5258 16.26C34.9058 15.64 35.0958 14.97 35.0958 14.25V11.76C35.0958 10.8 34.7758 10.01 34.1358 9.39C33.4958 8.75 32.6558 8.43 31.6158 8.43C30.7358 8.43 30.0058 8.65 29.4258 9.09C28.8658 9.51 28.5058 10.04 28.3458 10.68H28.0158L25.0758 9.96C25.4358 8.6 26.1858 7.5 27.3258 6.66C28.4858 5.82 29.9258 5.4 31.6458 5.4C33.7858 5.4 35.4558 6.02 36.6558 7.26C37.8558 8.48 38.4558 10.21 38.4558 12.45V21H35.3958V16.59L36.6258 16.77C36.3858 17.63 35.9558 18.42 35.3358 19.14C34.7158 19.84 33.9658 20.4 33.0858 20.82C32.2258 21.24 31.2658 21.45 30.2058 21.45Z" fill="currentColor"/>
                    <path d="M46.5548 27C44.5148 27 42.9148 26.6 41.7548 25.8C40.5948 25.02 40.0148 23.93 40.0148 22.53C40.0148 21.63 40.2548 20.84 40.7348 20.16C41.2348 19.48 41.9448 18.95 42.8648 18.57L44.5448 20.01C44.1248 20.19 43.7948 20.46 43.5548 20.82C43.3348 21.18 43.2248 21.57 43.2248 21.99C43.2248 22.57 43.4448 23.08 43.8848 23.52C44.3448 23.96 45.0848 24.18 46.1048 24.18H48.2048C49.2848 24.18 50.0948 24.02 50.6348 23.7C51.1748 23.4 51.4448 22.95 51.4448 22.35C51.4448 21.87 51.2448 21.5 50.8448 21.24C50.4648 20.98 49.9348 20.85 49.2548 20.85H45.5048C44.6248 20.85 43.8348 20.7 43.1348 20.4C42.4548 20.1 41.9148 19.69 41.5148 19.17C41.1148 18.63 40.9148 18.02 40.9148 17.34C40.9148 16.58 41.1448 15.91 41.6048 15.33C42.0848 14.73 42.7648 14.25 43.6448 13.89L45.5048 15.39C45.0248 15.43 44.6548 15.6 44.3948 15.9C44.1348 16.18 44.0048 16.48 44.0048 16.8C44.0048 17.2 44.1648 17.52 44.4848 17.76C44.8048 17.98 45.2948 18.09 45.9548 18.09H49.6148C51.1348 18.09 52.3448 18.47 53.2448 19.23C54.1648 19.99 54.6248 21 54.6248 22.26C54.6248 23.7 54.0448 24.85 52.8848 25.71C51.7248 26.57 50.1548 27 48.1748 27H46.5548ZM47.4548 16.17C46.2148 16.17 45.1248 15.94 44.1848 15.48C43.2448 15.02 42.5048 14.39 41.9648 13.59C41.4448 12.77 41.1848 11.83 41.1848 10.77C41.1848 9.71 41.4448 8.78 41.9648 7.98C42.5048 7.18 43.2448 6.55 44.1848 6.09C45.1248 5.63 46.2148 5.4 47.4548 5.4C48.6948 5.4 49.7748 5.63 50.6948 6.09C51.6348 6.55 52.3648 7.18 52.8848 7.98C53.4248 8.78 53.6948 9.71 53.6948 10.77C53.6948 11.83 53.4248 12.77 52.8848 13.59C52.3648 14.39 51.6348 15.02 50.6948 15.48C49.7748 15.94 48.6948 16.17 47.4548 16.17ZM47.4548 13.41C48.3548 13.41 49.0848 13.17 49.6448 12.69C50.2048 12.19 50.4848 11.55 50.4848 10.77C50.4848 9.99 50.2048 9.36 49.6448 8.88C49.0848 8.4 48.3548 8.16 47.4548 8.16C46.5348 8.16 45.7948 8.4 45.2348 8.88C44.6948 9.36 44.4248 9.99 44.4248 10.77C44.4248 11.55 44.6948 12.19 45.2348 12.69C45.7948 13.17 46.5348 13.41 47.4548 13.41ZM51.8348 8.07L49.6748 7.02C49.6748 6.14 49.8448 5.36 50.1848 4.68C50.5248 4 50.9848 3.47 51.5648 3.09C52.1648 2.69 52.8348 2.49 53.5748 2.49C53.7948 2.49 54.0048 2.5 54.2048 2.52C54.4048 2.52 54.5548 2.54 54.6548 2.58V5.49L54.5048 5.79C54.3048 5.73 54.0548 5.7 53.7548 5.7C53.1148 5.7 52.6348 5.92 52.3148 6.36C51.9948 6.8 51.8348 7.37 51.8348 8.07Z" fill="currentColor"/>
                    <path d="M56.4352 21V5.85H59.6752V9.72L58.8052 9.66C59.1252 8.78 59.5852 8.03 60.1852 7.41C60.7852 6.77 61.4852 6.28 62.2852 5.94C63.0852 5.58 63.9552 5.4 64.8952 5.4C65.9752 5.4 66.9452 5.64 67.8052 6.12C68.6852 6.58 69.3752 7.27 69.8752 8.19C70.3952 9.09 70.6552 10.22 70.6552 11.58V21H67.2052V12.63C67.2052 11.67 67.0752 10.89 66.8152 10.29C66.5552 9.69 66.1752 9.25 65.6752 8.97C65.1952 8.69 64.6352 8.55 63.9952 8.55C63.3952 8.55 62.7752 8.7 62.1352 9C61.5152 9.3 60.9852 9.8 60.5452 10.5C60.1052 11.2 59.8852 12.15 59.8852 13.35V21H56.4352Z" fill="currentColor"/>
                    <path d="M80.7262 21.45C79.1862 21.45 77.8262 21.11 76.6462 20.43C75.4862 19.75 74.5762 18.81 73.9162 17.61C73.2562 16.41 72.9262 15.01 72.9262 13.41C72.9262 11.83 73.2462 10.44 73.8862 9.24C74.5462 8.02 75.4463 7.08 76.5863 6.42C77.7463 5.74 79.0762 5.4 80.5762 5.4C82.0762 5.4 83.3762 5.75 84.4762 6.45C85.5962 7.13 86.4663 8.09 87.0863 9.33C87.7263 10.57 88.0462 12.02 88.0462 13.68V14.25L87.5963 14.7H74.5462V11.82H86.4863L84.6562 12.51C84.6362 11.67 84.4363 10.95 84.0563 10.35C83.6963 9.73 83.2162 9.26 82.6162 8.94C82.0362 8.6 81.3762 8.43 80.6362 8.43C79.8362 8.43 79.1063 8.62 78.4463 9C77.7863 9.36 77.2763 9.87 76.9163 10.53C76.5563 11.17 76.3763 11.92 76.3763 12.78V13.98C76.3763 14.8 76.5663 15.55 76.9463 16.23C77.3463 16.89 77.8762 17.42 78.5362 17.82C79.1962 18.22 79.9262 18.42 80.7262 18.42C81.4862 18.42 82.1762 18.22 82.7962 17.82C83.4362 17.4 83.9362 16.84 84.2962 16.14H84.6562L87.4463 17.34C86.8463 18.64 85.9562 19.65 84.7762 20.37C83.6162 21.09 82.2662 21.45 80.7262 21.45Z" fill="currentColor"/>
                    <path d="M96.0448 21C94.5648 21 93.3848 20.54 92.5048 19.62C91.6248 18.68 91.1848 17.42 91.1848 15.84V1.92H94.6348V15.48C94.6348 16.28 94.8348 16.88 95.2348 17.28C95.6548 17.68 96.2548 17.88 97.0348 17.88H98.5948L98.7448 18.21V21H96.0448ZM88.6048 8.94V5.85H98.7448V8.94H88.6048Z" fill="currentColor"/>
                  </svg>
                </Link>

                <div className="flex items-center gap-2">
                  <button
                    onClick={openSearch}
                    aria-label="Search"
                    className="mobile-menu-content inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-coral transition-colors duration-200 hover:bg-coral/10 hover:text-frost"
                  >
                    <MagnifyingGlassIcon className="size-5" />
                  </button>
                  <button
                    command="close"
                    commandfor="mobile-menu"
                    aria-label="Close menu"
                    className="mobile-menu-content inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-coral transition-colors duration-200 hover:bg-coral/10 hover:text-frost"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Card Sections */}
              <div className="flex flex-1 flex-col gap-4 px-5 pb-6">
                {/* Services Card */}
                <MobileMenuCard label="Services" className="mobile-menu-content">
                  <div className="flex flex-col">
                    <MobileMenuLink href="/branding" isActive={isActive('/branding')}>
                      Branding
                    </MobileMenuLink>
                    <MobileMenuLink href="/websites" isActive={isActive('/websites')}>
                      Websites
                    </MobileMenuLink>
                    <MobileMenuLink href="/ads" isActive={isActive('/ads')}>
                      Paid Ads
                    </MobileMenuLink>
                    <MobileMenuLink href="/search" isActive={isActive('/search')}>
                      Search Marketing
                    </MobileMenuLink>
                  </div>
                </MobileMenuCard>

                {/* Industries Card */}
                <MobileMenuCard label="Industries" className="mobile-menu-secondary">
                  <div className="flex flex-wrap gap-x-1 gap-y-1">
                    <MobileMenuSecondaryLink href="/industries/healthcare">Healthcare</MobileMenuSecondaryLink>
                    <span className="py-2 text-coral/30">·</span>
                    <MobileMenuSecondaryLink href="/industries/manufacturing">Manufacturing</MobileMenuSecondaryLink>
                    <span className="py-2 text-coral/30">·</span>
                    <MobileMenuSecondaryLink href="/industries/ecommerce">Ecommerce</MobileMenuSecondaryLink>
                    <span className="py-2 text-coral/30">·</span>
                    <MobileMenuSecondaryLink href="/industries">All Industries</MobileMenuSecondaryLink>
                  </div>
                </MobileMenuCard>

                {/* Company Card */}
                <MobileMenuCard label="Company" className="mobile-menu-secondary">
                  <div className="flex flex-wrap gap-x-1 gap-y-1">
                    <MobileMenuSecondaryLink href="/method">Method</MobileMenuSecondaryLink>
                    <span className="py-2 text-coral/30">·</span>
                    <MobileMenuSecondaryLink href="/team">Team</MobileMenuSecondaryLink>
                    <span className="py-2 text-coral/30">·</span>
                    <MobileMenuSecondaryLink href="/pricing">Pricing</MobileMenuSecondaryLink>
                    <span className="py-2 text-coral/30">·</span>
                    <MobileMenuSecondaryLink href="/careers">Careers</MobileMenuSecondaryLink>
                  </div>
                </MobileMenuCard>

                {/* Contact Card */}
                <MobileMenuCard label="Contact" className="mobile-menu-footer mt-auto">
                  <div className="space-y-5">
                    {/* Contact Info */}
                    <div className="space-y-1">
                      <a
                        href="mailto:hello@magnet.co"
                        className="block py-1 font-mono text-sm text-coral transition-colors duration-200 hover:text-frost"
                      >
                        hello@magnet.co
                      </a>
                      <p className="font-mono text-sm text-coral/50">San Francisco, CA</p>
                    </div>

                    {/* CTA - Coral solid button */}
                    <Link
                      href="/contact"
                      onClick={closeMenu}
                      className="flex w-full items-center justify-center rounded-full bg-coral py-3.5 text-sm font-medium text-juniper transition-colors duration-200 hover:bg-coral/90"
                    >
                      Get started
                    </Link>

                    {/* Social */}
                    <a
                      href="https://www.linkedin.com/company/magnet-co"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex size-11 items-center justify-center rounded-full text-coral transition-colors duration-200 hover:bg-coral/10 hover:text-frost"
                      aria-label="LinkedIn"
                    >
                      <LinkedInIcon className="size-5" />
                    </a>
                  </div>
                </MobileMenuCard>
              </div>
            </ElDialogPanel>
          </dialog>
        </ElDialog>
      </nav>
    </header>
  )
}
