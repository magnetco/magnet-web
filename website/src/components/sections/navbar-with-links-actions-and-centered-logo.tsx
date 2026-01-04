'use client'

import { ElDialog, ElDialogPanel } from '@tailwindplus/elements/react'
import { clsx } from 'clsx/lite'
import Link from 'next/link'
import { useState, type ComponentProps, type ReactNode } from 'react'
import { ChevronDownIcon } from '../icons/chevron-down-icon'

export function NavbarLink({
  children,
  href,
  className,
  ...props
}: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Link
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
    </Link>
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
    <Link
      href={href}
      className={clsx(
        'group flex flex-col gap-2 rounded-lg border border-transparent p-4 transition-all hover:border-oxblood/20 hover:bg-oxblood/5 dark:hover:border-white/20 dark:hover:bg-white/5',
        className,
      )}
      {...props}
    >
      <h3 className="text-base/8 font-medium text-oxblood dark:text-ember">{title}</h3>
      <p className="text-sm/7 text-olive-500">{subcopy}</p>
    </Link>
  )
}

export function NavbarDropdownLink({
  children,
  href,
  className,
  ...props
}: { href: string } & Omit<ComponentProps<'a'>, 'href'>) {
  return (
    <Link
      href={href}
      className={clsx(
        'block px-4 py-2 text-sm/7 text-oxblood transition-colors hover:bg-oxblood/5 hover:text-ember dark:text-coral dark:hover:bg-white/5 dark:hover:text-ember',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

export function NavbarWithLinksActionsAndCenteredLogo({
  links,
  logo,
  actions,
  className,
  ...props
}: {
  links: ReactNode
  logo: ReactNode
  actions: ReactNode
} & ComponentProps<'header'>) {
  return (
    <header
      className={clsx('sticky top-0 z-10', className)}
      style={{
        backgroundColor: 'var(--navbar-bg)',
      }}
      {...props}
    >
      <style>{`:root { --scroll-padding-top: 5.25rem }`}</style>
      <nav>
        <div className="mx-auto flex h-(--scroll-padding-top) w-full max-w-2xl items-center gap-4 px-6 md:max-w-3xl lg:max-w-7xl lg:px-10">
          <div className="flex flex-1 gap-8 max-lg:hidden">{links}</div>
          <div className="flex items-center">{logo}</div>
          <div className="flex flex-1 items-center justify-end gap-4">
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
            <ElDialogPanel
              className="fixed inset-0 px-6 py-6 lg:px-10"
              style={{ backgroundColor: 'var(--navbar-bg)' }}
            >
              <div className="flex justify-end">
                <button
                  command="close"
                  commandfor="mobile-menu"
                  aria-label="Toggle menu"
                  className="inline-flex cursor-pointer rounded-full p-1.5 text-oxblood hover:bg-oxblood/10"
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
              <div className="mt-6 flex flex-col gap-6">{links}</div>
            </ElDialogPanel>
          </dialog>
        </ElDialog>
      </nav>
    </header>
  )
}
