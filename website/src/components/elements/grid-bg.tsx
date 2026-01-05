import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

/**
 * Grid BG Effect Components
 * 
 * Creates a decorative background with diagonal stripes and a "cutout" effect
 * where the content container sits. Includes optional border lines on the
 * container edges.
 */

// Container width classes to match the site's container component
const containerWidthClasses = 'max-w-2xl md:max-w-3xl lg:max-w-7xl'

// Standardized section padding - consistent vertical rhythm across all sections
export const sectionPaddingClasses = 'py-12 sm:py-16 lg:py-20 xl:py-24'

export function GridBgSection({
  children,
  className,
  showBottomBorder = true,
  showTopBorder = false,
  withPadding = false,
  ...props
}: {
  children: ReactNode
  showBottomBorder?: boolean
  showTopBorder?: boolean
  withPadding?: boolean
} & ComponentProps<'div'>) {
  return (
    <div className={clsx('relative', className)} {...props}>
      {/* Diagonal stripe backgrounds - only visible on lg+ where there's margin space */}
      <GridBgStripes />

      {/* Border lines */}
      <GridBgBorderLine position="left" />
      <GridBgBorderLine position="right" />
      {showTopBorder && <GridBgBorderLine position="top" />}
      {showBottomBorder && <GridBgBorderLine position="bottom" />}

      {/* Content area */}
      <div className={clsx('relative', withPadding && sectionPaddingClasses)}>
        {children}
      </div>
    </div>
  )
}

// Stripe color variants
const stripeColors = {
  oxblood: 'rgba(34, 0, 2, 0.04)',
  coral: 'rgba(237, 176, 161, 0.10)',
} as const

/**
 * GridBgStripes - Renders diagonal stripes in the margin areas outside the container
 * Only visible on lg+ breakpoints where there's actual margin space
 */
export function GridBgStripes({ 
  className,
  color = 'oxblood',
}: { 
  className?: string
  color?: keyof typeof stripeColors
}) {
  const stripeColor = stripeColors[color]
  
  return (
    <>
      {/* Left stripe area - positioned from left edge to container left edge */}
      <div
        className={clsx(
          'pointer-events-none absolute inset-y-0 left-0 hidden overflow-hidden lg:block',
          className
        )}
        style={{ 
          width: 'calc((100% - min(100%, 80rem)) / 2)',
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 5px,
              ${stripeColor} 5px,
              ${stripeColor} 6px
            )`,
          }}
        />
      </div>

      {/* Right stripe area - positioned from container right edge to right edge */}
      <div
        className={clsx(
          'pointer-events-none absolute inset-y-0 right-0 hidden overflow-hidden lg:block',
          className
        )}
        style={{ 
          width: 'calc((100% - min(100%, 80rem)) / 2)',
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 5px,
              ${stripeColor} 5px,
              ${stripeColor} 6px
            )`,
          }}
        />
      </div>
    </>
  )
}

// Border color classes
const borderColors = {
  oxblood: 'bg-oxblood/10',
  coral: 'bg-coral/10',
} as const

export function GridBgBorderLine({
  position,
  className,
  color = 'oxblood',
}: {
  position: 'left' | 'right' | 'bottom' | 'top'
  className?: string
  color?: keyof typeof borderColors
}) {
  const borderColor = borderColors[color]
  
  // Horizontal borders (top/bottom) - span full screen width
  if (position === 'bottom' || position === 'top') {
    return (
      <div
        className={clsx(
          'pointer-events-none absolute left-0 right-0 z-10 h-px',
          borderColor,
          position === 'bottom' ? 'bottom-0' : 'top-0',
          className
        )}
        aria-hidden="true"
      />
    )
  }

  // Vertical borders (left/right) - span full height, aligned to container outer edges
  return (
    <div
      className={clsx(
        'pointer-events-none absolute inset-y-0 left-1/2 z-10 mx-auto w-full -translate-x-1/2',
        containerWidthClasses,
        className
      )}
      aria-hidden="true"
    >
      <div
        className={clsx(
          'absolute inset-y-0 w-px',
          borderColor,
          position === 'left' ? 'left-0' : 'right-0'
        )}
      />
    </div>
  )
}

/**
 * GridBgFrame - A simpler wrapper that just adds the border lines
 * without the diagonal stripe background. Useful for sections that
 * need continuity with the grid effect but clean backgrounds.
 */
export function GridBgFrame({
  children,
  className,
  showBottomBorder = true,
  showSideBorders = true,
  ...props
}: {
  children: ReactNode
  showBottomBorder?: boolean
  showSideBorders?: boolean
} & ComponentProps<'div'>) {
  return (
    <div className={clsx('relative', className)} {...props}>
      {showSideBorders && (
        <>
          <GridBgBorderLine position="left" />
          <GridBgBorderLine position="right" />
        </>
      )}
      {children}
      {showBottomBorder && <GridBgBorderLine position="bottom" />}
    </div>
  )
}

