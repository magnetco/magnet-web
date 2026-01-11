'use client'

import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

type OutlineType = 'section' | 'component' | 'unstandardized'
type DataSource = 'props' | 'sanity' | 'api' | 'static' | 'context' | string

interface DevOutlineProps extends Omit<ComponentProps<'div'>, 'children'> {
  children: ReactNode
  name: string
  type?: OutlineType
  source?: DataSource
  /** Optional additional info to display */
  info?: string
}

/**
 * DevOutline wraps components to show debug information in dev mode.
 * The outlines and labels are controlled via CSS using data attributes.
 *
 * @example
 * <DevOutline name="TeamCarousel" type="component" source="sanity">
 *   <TeamCarouselSection members={members} />
 * </DevOutline>
 */
export function DevOutline({
  children,
  name,
  type = 'component',
  source,
  info,
  className,
  ...props
}: DevOutlineProps) {
  // Build label text
  const labelParts = [name]
  if (source) labelParts.push(`[${source}]`)
  if (info) labelParts.push(`(${info})`)
  const label = labelParts.join(' ')

  const labelBgColor = type === 'unstandardized' ? 'bg-orange-500/90' : 'bg-blue-600/90'

  return (
    <div
      className={clsx('dev-outline relative', className)}
      data-dev-outline={type}
      data-dev-name={name}
      data-dev-source={source}
      {...props}
    >
      {/* Label - shown when dev mode labels are enabled */}
      <div
        className={clsx(
          'dev-outline-label pointer-events-none absolute -top-5 left-1 z-[9998] hidden whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[9px] text-white shadow-sm',
          labelBgColor
        )}
        aria-hidden="true"
      >
        {label}
      </div>
      {children}
    </div>
  )
}

/**
 * DevSection is a convenience wrapper for section-level outlines.
 * Use this to wrap major page sections.
 */
export function DevSection({
  children,
  name,
  source,
  info,
  ...props
}: Omit<DevOutlineProps, 'type'>) {
  return (
    <DevOutline name={name} type="section" source={source} info={info} {...props}>
      {children}
    </DevOutline>
  )
}

/**
 * DevComponent is a convenience wrapper for component-level outlines.
 * Use this to wrap individual UI components within sections.
 */
export function DevComponent({
  children,
  name,
  source,
  info,
  ...props
}: Omit<DevOutlineProps, 'type'>) {
  return (
    <DevOutline name={name} type="component" source={source} info={info} {...props}>
      {children}
    </DevOutline>
  )
}

/**
 * DevUnstandardized marks elements that should probably be standardized components.
 * Shows orange outline to flag areas needing refactoring.
 */
export function DevUnstandardized({
  children,
  name,
  source,
  info,
  ...props
}: Omit<DevOutlineProps, 'type'>) {
  return (
    <DevOutline name={name} type="unstandardized" source={source} info={info} {...props}>
      {children}
    </DevOutline>
  )
}
