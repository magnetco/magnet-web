'use client'

import { clsx } from 'clsx/lite'
import Link from 'next/link'
import { type ComponentProps, type ReactNode } from 'react'
import { useButtonHover } from './use-button-hover'

const sizes = {
  md: 'px-6 py-1',
  lg: 'px-6 py-2',
}

type ButtonVariant = 'solid' | 'soft' | 'plain'
type ButtonColor = 'dark/light' | 'light'
type ButtonSize = keyof typeof sizes

interface ButtonStyleProps {
  variant: ButtonVariant
  color: ButtonColor
  size: ButtonSize
}

function getButtonStyles({ variant, color, size }: ButtonStyleProps) {
  const baseClasses =
    'group relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full text-sm/7 font-medium overflow-visible'

  const variantClasses = {
    solid: clsx(
      'gap-1',
      color === 'dark/light' && 'bg-olive-950 text-white dark:bg-olive-300 dark:text-olive-950',
      color === 'light' && 'bg-white text-olive-950 dark:bg-olive-100'
    ),
    soft: 'gap-1 bg-oxblood/10 text-oxblood transition-colors duration-300 group-hover:text-ember dark:bg-white/10 dark:text-coral',
    plain: clsx(
      'gap-2',
      color === 'dark/light' && 'text-oxblood transition-colors duration-300 group-hover:text-ember dark:text-coral',
      color === 'light' && 'text-white'
    ),
  }

  return clsx(baseClasses, variantClasses[variant], sizes[size])
}

function getFillStyles({ variant, color }: Omit<ButtonStyleProps, 'size'>) {
  const baseClasses = 'absolute inset-0 rounded-full'

  const variantClasses = {
    solid: clsx(
      color === 'dark/light' && 'bg-ember dark:bg-olive-200',
      color === 'light' && 'bg-olive-100 dark:bg-white'
    ),
    soft: 'bg-snow dark:bg-white/20',
    plain: clsx(
      color === 'dark/light' && 'bg-opal/70 dark:bg-white/10',
      color === 'light' && 'bg-white/15 dark:bg-white/10'
    ),
  }

  return clsx(baseClasses, variantClasses[variant])
}

function getOutlineStyles({ variant }: Pick<ButtonStyleProps, 'variant'>) {
  const baseClasses = 'absolute inset-[-3px] rounded-full border-2 opacity-0 pointer-events-none'

  const variantClasses = {
    solid: 'border-ember',
    soft: 'border-opal',
    plain: 'border-opal',
  }

  return clsx(baseClasses, variantClasses[variant])
}

interface ButtonInnerProps {
  children: ReactNode
  fillRef: React.RefObject<HTMLDivElement | null>
  outlineRef: React.RefObject<HTMLDivElement | null>
  variant: ButtonVariant
  color: ButtonColor
}

function ButtonInner({ children, fillRef, outlineRef, variant, color }: ButtonInnerProps) {
  return (
    <>
      <div
        ref={fillRef}
        className={getFillStyles({ variant, color })}
        style={{ clipPath: 'inset(100% 0% 0% 0%)', zIndex: 1 }}
      />
      <span className="relative z-10 transition-colors duration-300">{children}</span>
      <div ref={outlineRef} className={getOutlineStyles({ variant })} style={{ zIndex: -1 }} />
    </>
  )
}

// Solid Button
export function Button({
  size = 'md',
  type = 'button',
  color = 'dark/light',
  className,
  children,
  ...props
}: {
  size?: ButtonSize
  color?: ButtonColor
} & ComponentProps<'button'>) {
  const { elementRef, fillRef, outlineRef } = useButtonHover<HTMLButtonElement>()

  return (
    <button
      ref={elementRef}
      type={type}
      className={clsx(getButtonStyles({ variant: 'solid', color, size }), className)}
      {...props}
    >
      <ButtonInner fillRef={fillRef} outlineRef={outlineRef} variant="solid" color={color}>
        {children}
      </ButtonInner>
    </button>
  )
}

export function ButtonLink({
  size = 'md',
  color = 'dark/light',
  className,
  href,
  children,
  ...props
}: {
  href: string
  size?: ButtonSize
  color?: ButtonColor
} & Omit<ComponentProps<'a'>, 'href'>) {
  const { elementRef, fillRef, outlineRef } = useButtonHover<HTMLAnchorElement>()

  return (
    <Link
      ref={elementRef}
      href={href}
      className={clsx(getButtonStyles({ variant: 'solid', color, size }), className)}
      {...props}
    >
      <ButtonInner fillRef={fillRef} outlineRef={outlineRef} variant="solid" color={color}>
        {children}
      </ButtonInner>
    </Link>
  )
}

// Soft Button
export function SoftButton({
  size = 'md',
  type = 'button',
  className,
  children,
  ...props
}: {
  size?: ButtonSize
} & ComponentProps<'button'>) {
  const { elementRef, fillRef, outlineRef } = useButtonHover<HTMLButtonElement>()

  return (
    <button
      ref={elementRef}
      type={type}
      className={clsx(getButtonStyles({ variant: 'soft', color: 'dark/light', size }), className)}
      {...props}
    >
      <ButtonInner fillRef={fillRef} outlineRef={outlineRef} variant="soft" color="dark/light">
        {children}
      </ButtonInner>
    </button>
  )
}

export function SoftButtonLink({
  size = 'md',
  href,
  className,
  children,
  ...props
}: {
  href: string
  size?: ButtonSize
} & Omit<ComponentProps<'a'>, 'href'>) {
  const { elementRef, fillRef, outlineRef } = useButtonHover<HTMLAnchorElement>()

  return (
    <Link
      ref={elementRef}
      href={href}
      className={clsx(getButtonStyles({ variant: 'soft', color: 'dark/light', size }), className)}
      {...props}
    >
      <ButtonInner fillRef={fillRef} outlineRef={outlineRef} variant="soft" color="dark/light">
        {children}
      </ButtonInner>
    </Link>
  )
}

// Plain Button
export function PlainButton({
  size = 'md',
  color = 'dark/light',
  type = 'button',
  className,
  children,
  ...props
}: {
  size?: ButtonSize
  color?: ButtonColor
} & ComponentProps<'button'>) {
  const { elementRef, fillRef, outlineRef } = useButtonHover<HTMLButtonElement>()

  return (
    <button
      ref={elementRef}
      type={type}
      className={clsx(getButtonStyles({ variant: 'plain', color, size }), className)}
      {...props}
    >
      <ButtonInner fillRef={fillRef} outlineRef={outlineRef} variant="plain" color={color}>
        {children}
      </ButtonInner>
    </button>
  )
}

export function PlainButtonLink({
  size = 'md',
  color = 'dark/light',
  href,
  className,
  children,
  ...props
}: {
  href: string
  size?: ButtonSize
  color?: ButtonColor
} & Omit<ComponentProps<'a'>, 'href'>) {
  const { elementRef, fillRef, outlineRef } = useButtonHover<HTMLAnchorElement>()

  return (
    <Link
      ref={elementRef}
      href={href}
      className={clsx(getButtonStyles({ variant: 'plain', color, size }), className)}
      {...props}
    >
      <ButtonInner fillRef={fillRef} outlineRef={outlineRef} variant="plain" color={color}>
        {children}
      </ButtonInner>
    </Link>
  )
}
