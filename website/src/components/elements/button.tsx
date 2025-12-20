'use client'

import { clsx } from 'clsx/lite'
import Link from 'next/link'
import { type ComponentProps } from 'react'
import { useButtonHover } from './use-button-hover'

const sizes = {
  md: 'px-6 py-1',
  lg: 'px-6 py-2',
}

export function Button({
  size = 'md',
  type = 'button',
  color = 'dark/light',
  className,
  ...props
}: {
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light'
} & ComponentProps<'button'>) {
  const { elementRef, fillRef, outlineRef, shineRef } = useButtonHover<HTMLButtonElement>()

  const { children, ...buttonProps } = props

  return (
    <button
      ref={elementRef}
      type={type}
      className={clsx(
        'group relative inline-flex shrink-0 items-center justify-center gap-1 rounded-full text-sm/7 font-medium overflow-hidden',
        color === 'dark/light' &&
          'bg-olive-950 text-white dark:bg-olive-300 dark:text-olive-950',
        color === 'light' && 'bg-white text-olive-950 dark:bg-olive-100',
        sizes[size],
        className,
      )}
      {...buttonProps}
    >
      {/* Fill pill that slides from bottom */}
      <div
        ref={fillRef}
        className={clsx(
          'absolute inset-0 rounded-full',
          color === 'dark/light' && 'bg-[var(--color-ember)] dark:bg-olive-200',
          color === 'light' && 'bg-olive-100 dark:bg-white',
        )}
        style={{
          clipPath: 'inset(100% 0% 0% 0%)',
          zIndex: 1,
        }}
      />
      {/* Radial shine with coral, centered on cursor - 200px circular, clipped to button */}
      <div
        ref={shineRef}
        className="pointer-events-none absolute h-[200px] w-[200px] rounded-full opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 181, 171, 0.6) 0%, rgba(255, 181, 171, 0.4) 20%, rgba(255, 181, 171, 0.2) 40%, rgba(255, 181, 171, 0.1) 60%, rgba(255, 181, 171, 0) 100%)',
          zIndex: 2,
          clipPath: 'inset(0 round 9999px)',
        }}
      />
      {/* Content on top */}
      <span className="relative z-10 transition-colors duration-300">{children}</span>
      {/* Outline that sits 3px outside, 2px wide, ember colored */}
      <div
        ref={outlineRef}
        className="absolute inset-[-3px] rounded-full border-2 border-[var(--color-ember)] opacity-0 pointer-events-none"
        style={{ zIndex: -1 }}
      />
    </button>
  )
}

export function ButtonLink({
  size = 'md',
  color = 'dark/light',
  className,
  href,
  ...props
}: {
  href: string
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light'
} & Omit<ComponentProps<'a'>, 'href'>) {
  const { elementRef, fillRef, outlineRef, shineRef } = useButtonHover<HTMLAnchorElement>()

  const { children, ...linkProps } = props

  return (
    <Link
      ref={elementRef}
      href={href}
      className={clsx(
        'group relative inline-flex shrink-0 items-center justify-center gap-1 rounded-full text-sm/7 font-medium overflow-hidden',
        color === 'dark/light' &&
          'bg-olive-950 text-white dark:bg-olive-300 dark:text-olive-950',
        color === 'light' && 'bg-white text-olive-950 dark:bg-olive-100',
        sizes[size],
        className,
      )}
      {...linkProps}
    >
      {/* Fill pill that slides from bottom */}
      <div
        ref={fillRef}
        className={clsx(
          'absolute inset-0 rounded-full',
          color === 'dark/light' && 'bg-[var(--color-ember)] dark:bg-olive-200',
          color === 'light' && 'bg-olive-100 dark:bg-white',
        )}
        style={{
          clipPath: 'inset(100% 0% 0% 0%)',
          zIndex: 1,
        }}
      />
      {/* Radial shine with coral, centered on cursor - 200px circular, clipped to button */}
      <div
        ref={shineRef}
        className="pointer-events-none absolute h-[200px] w-[200px] rounded-full opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 181, 171, 0.6) 0%, rgba(255, 181, 171, 0.4) 20%, rgba(255, 181, 171, 0.2) 40%, rgba(255, 181, 171, 0.1) 60%, rgba(255, 181, 171, 0) 100%)',
          zIndex: 2,
          clipPath: 'inset(0 round 9999px)',
        }}
      />
      {/* Content on top */}
      <span className="relative z-10 transition-colors duration-300">{children}</span>
      {/* Outline that sits 3px outside, 2px wide, ember colored */}
      <div
        ref={outlineRef}
        className="absolute inset-[-3px] rounded-full border-2 border-[var(--color-ember)] opacity-0 pointer-events-none"
        style={{ zIndex: -1 }}
      />
    </Link>
  )
}

export function SoftButton({
  size = 'md',
  type = 'button',
  className,
  ...props
}: {
  size?: keyof typeof sizes
} & ComponentProps<'button'>) {
  const { elementRef, fillRef, outlineRef, shineRef } = useButtonHover<HTMLButtonElement>()
  const { children, ...buttonProps } = props

  return (
    <button
      ref={elementRef}
      type={type}
      className={clsx(
        'group relative inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-oxblood/10 text-sm/7 font-medium text-oxblood transition-colors duration-300 group-hover:text-[var(--color-ember)] dark:bg-white/10 dark:text-coral overflow-visible',
        sizes[size],
        className,
      )}
      {...buttonProps}
    >
      {/* Fill pill that slides from bottom */}
      <div
        ref={fillRef}
        className="absolute inset-0 rounded-full bg-[var(--color-snow)] dark:bg-white/20"
        style={{
          clipPath: 'inset(100% 0% 0% 0%)',
          zIndex: 1,
        }}
      />
      {/* Content on top */}
      <span className="relative z-10 transition-colors duration-300">{children}</span>
      {/* Outline that sits 3px outside, 2px wide, opal colored */}
      <div
        ref={outlineRef}
        className="absolute inset-[-3px] rounded-full border-2 border-[var(--color-opal)] opacity-0 pointer-events-none"
        style={{ zIndex: -1 }}
      />
    </button>
  )
}

export function SoftButtonLink({
  size = 'md',
  href,
  className,
  ...props
}: {
  href: string
  size?: keyof typeof sizes
} & Omit<ComponentProps<'a'>, 'href'>) {
  const { elementRef, fillRef, outlineRef, shineRef } = useButtonHover<HTMLAnchorElement>()
  const { children, ...linkProps } = props

  return (
    <Link
      ref={elementRef}
      href={href}
      className={clsx(
        'group relative inline-flex shrink-0 items-center justify-center gap-1 rounded-full bg-oxblood/10 text-sm/7 font-medium text-oxblood transition-colors duration-300 group-hover:text-[var(--color-ember)] dark:bg-white/10 dark:text-coral overflow-visible',
        sizes[size],
        className,
      )}
      {...linkProps}
    >
      {/* Fill pill that slides from bottom */}
      <div
        ref={fillRef}
        className="absolute inset-0 rounded-full bg-[var(--color-snow)] dark:bg-white/20"
        style={{
          clipPath: 'inset(100% 0% 0% 0%)',
          zIndex: 1,
        }}
      />
      {/* Content on top */}
      <span className="relative z-10 transition-colors duration-300">{children}</span>
      {/* Outline that sits 3px outside, 2px wide, opal colored */}
      <div
        ref={outlineRef}
        className="absolute inset-[-3px] rounded-full border-2 border-[var(--color-opal)] opacity-0 pointer-events-none"
        style={{ zIndex: -1 }}
      />
    </Link>
  )
}

export function PlainButton({
  size = 'md',
  color = 'dark/light',
  type = 'button',
  className,
  ...props
}: {
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light'
} & ComponentProps<'button'>) {
  const { elementRef, fillRef, outlineRef, shineRef } = useButtonHover<HTMLButtonElement>()
  const { children, ...buttonProps } = props

  return (
    <button
      ref={elementRef}
      type={type}
      className={clsx(
        'group relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm/7 font-medium overflow-visible',
        color === 'dark/light' && 'text-oxblood transition-colors duration-300 group-hover:text-[var(--color-ember)] dark:text-coral',
        color === 'light' && 'text-white',
        sizes[size],
        className,
      )}
      {...buttonProps}
    >
      {/* Fill pill that slides from bottom */}
      <div
        ref={fillRef}
        className={clsx(
          'absolute inset-0 rounded-full',
          color === 'dark/light' && 'bg-[var(--color-snow)] dark:bg-white/10',
          color === 'light' && 'bg-white/15 dark:bg-white/10',
        )}
        style={{
          clipPath: 'inset(100% 0% 0% 0%)',
          zIndex: 1,
        }}
      />
      {/* Content on top */}
      <span className="relative z-10 transition-colors duration-300">{children}</span>
      {/* Outline that sits 3px outside, 2px wide, opal colored */}
      <div
        ref={outlineRef}
        className="absolute inset-[-3px] rounded-full border-2 border-[var(--color-opal)] opacity-0 pointer-events-none"
        style={{ zIndex: -1 }}
      />
    </button>
  )
}

export function PlainButtonLink({
  size = 'md',
  color = 'dark/light',
  href,
  className,
  ...props
}: {
  href: string
  size?: keyof typeof sizes
  color?: 'dark/light' | 'light'
} & Omit<ComponentProps<'a'>, 'href'>) {
  const { elementRef, fillRef, outlineRef, shineRef } = useButtonHover<HTMLAnchorElement>()
  const { children, ...linkProps } = props

  return (
    <Link
      ref={elementRef}
      href={href}
      className={clsx(
        'group relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm/7 font-medium overflow-visible',
        color === 'dark/light' && 'text-oxblood transition-colors duration-300 group-hover:text-[var(--color-ember)] dark:text-coral',
        color === 'light' && 'text-white',
        sizes[size],
        className,
      )}
      {...linkProps}
    >
      {/* Fill pill that slides from bottom */}
      <div
        ref={fillRef}
        className={clsx(
          'absolute inset-0 rounded-full',
          color === 'dark/light' && 'bg-[var(--color-snow)] dark:bg-white/10',
          color === 'light' && 'bg-white/15 dark:bg-white/10',
        )}
        style={{
          clipPath: 'inset(100% 0% 0% 0%)',
          zIndex: 1,
        }}
      />
      {/* Content on top */}
      <span className="relative z-10 transition-colors duration-300">{children}</span>
      {/* Outline that sits 3px outside, 2px wide, opal colored */}
      <div
        ref={outlineRef}
        className="absolute inset-[-3px] rounded-full border-2 border-[var(--color-opal)] opacity-0 pointer-events-none"
        style={{ zIndex: -1 }}
      />
    </Link>
  )
}
