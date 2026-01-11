'use client'

import { clsx } from 'clsx/lite'
import { gsap } from 'gsap'
import { useEffect, useRef, type ComponentProps, type ReactNode } from 'react'
import { Container } from '../elements/container'
import { Eyebrow } from '../elements/eyebrow'
import { GridBgSection, sectionPaddingClasses } from '../elements/grid-bg'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
import { ArrowNarrowRightIcon } from '../icons/arrow-narrow-right-icon'

interface FeatureBentoCardProps {
  number: string
  title: string
  description: ReactNode
  href: string
  demo: ReactNode
  accent?: 'ember' | 'powder' | 'coral' | 'basalt' | 'juniper'
  variant?: 'default' | 'featured' | 'compact' | 'highlight'
  className?: string
}

function FeatureBentoCard({
  number,
  title,
  description,
  href,
  demo,
  accent = 'ember',
  variant = 'default',
  className,
}: FeatureBentoCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const demoRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const glow = glowRef.current
    const demoEl = demoRef.current
    const numberEl = numberRef.current

    if (!card || !glow || !demoEl) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(glow, {
        x: x,
        y: y,
        xPercent: -50,
        yPercent: -50,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    const handleMouseEnter = () => {
      gsap.to(glow, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' })
      gsap.to(demoEl, { y: -6, scale: 1.015, duration: 0.5, ease: 'power2.out' })
      if (numberEl) {
        gsap.to(numberEl, { scale: 1.08, duration: 0.3, ease: 'back.out(2)' })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(glow, { opacity: 0, scale: 0.8, duration: 0.3, ease: 'power2.in' })
      gsap.to(demoEl, { y: 0, scale: 1, duration: 0.4, ease: 'power2.out' })
      if (numberEl) {
        gsap.to(numberEl, { scale: 1, duration: 0.2, ease: 'power2.out' })
      }
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const accentStyles = {
    ember: {
      glow: 'radial-gradient(circle 350px at center, rgba(249, 67, 43, 0.25) 0%, rgba(249, 67, 43, 0.08) 50%, transparent 70%)',
      cardBg: 'bg-gradient-to-br from-white/80 via-white/60 to-coral/5 dark:from-juniper/60 dark:via-juniper/40 dark:to-ember/5',
      number: 'text-frost bg-ember shadow-lg shadow-ember/20',
      border: 'border-ember/10 hover:border-ember/30',
      pattern: 'from-ember/[0.03] via-transparent to-transparent',
    },
    coral: {
      glow: 'radial-gradient(circle 350px at center, rgba(255, 181, 171, 0.3) 0%, rgba(255, 181, 171, 0.1) 50%, transparent 70%)',
      cardBg: 'bg-gradient-to-br from-coral/10 via-white/70 to-white/60 dark:from-coral/10 dark:via-juniper/50 dark:to-juniper/40',
      number: 'text-oxblood bg-coral shadow-lg shadow-coral/30',
      border: 'border-coral/20 hover:border-coral/40',
      pattern: 'from-coral/[0.05] via-transparent to-transparent',
    },
    powder: {
      glow: 'radial-gradient(circle 350px at center, rgba(186, 217, 220, 0.4) 0%, rgba(186, 217, 220, 0.15) 50%, transparent 70%)',
      cardBg: 'bg-gradient-to-br from-powder/30 via-white/70 to-white/60 dark:from-powder/15 dark:via-juniper/50 dark:to-juniper/40',
      number: 'text-juniper bg-powder shadow-lg shadow-powder/40',
      border: 'border-powder/30 hover:border-powder/50',
      pattern: 'from-powder/[0.08] via-transparent to-transparent',
    },
    basalt: {
      glow: 'radial-gradient(circle 350px at center, rgba(42, 65, 68, 0.25) 0%, rgba(42, 65, 68, 0.08) 50%, transparent 70%)',
      cardBg: 'bg-gradient-to-br from-basalt/5 via-white/70 to-white/60 dark:from-basalt/20 dark:via-juniper/50 dark:to-juniper/40',
      number: 'text-frost bg-basalt shadow-lg shadow-basalt/20',
      border: 'border-basalt/15 hover:border-basalt/30',
      pattern: 'from-basalt/[0.04] via-transparent to-transparent',
    },
    juniper: {
      glow: 'radial-gradient(circle 350px at center, rgba(0, 29, 34, 0.3) 0%, rgba(0, 29, 34, 0.1) 50%, transparent 70%)',
      cardBg: 'bg-gradient-to-br from-juniper via-juniper/95 to-juniper/90 dark:from-juniper dark:via-juniper/95 dark:to-basalt/50',
      number: 'text-juniper bg-powder shadow-lg shadow-powder/30',
      border: 'border-white/10 hover:border-white/20',
      pattern: 'from-white/[0.02] via-transparent to-transparent',
    },
  }

  const variantStyles = {
    default: '',
    featured: 'sm:col-span-2 lg:col-span-1 lg:row-span-2',
    compact: '',
    highlight: 'lg:row-span-2',
  }

  const styles = accentStyles[accent]
  const isJuniper = accent === 'juniper'
  const isFeatured = variant === 'featured'
  const isHighlight = variant === 'highlight'

  return (
    <a
      ref={cardRef}
      href={href}
      className={clsx(
        'group relative flex overflow-hidden rounded-2xl',
        'border backdrop-blur-sm',
        'transition-all duration-500 ease-out',
        'hover:shadow-2xl hover:shadow-black/5',
        styles.cardBg,
        styles.border,
        variantStyles[variant],
        'flex-col',
        className
      )}
    >
      {/* Animated gradient background */}
      <div
        className={clsx(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-700 group-hover:opacity-100',
          styles.pattern
        )}
      />

      {/* Decorative geometric pattern */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 opacity-[0.03] transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Cursor-following glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute z-0 h-[200%] w-[200%] rounded-full opacity-0"
        style={{ background: styles.glow }}
      />

      {/* Content area */}
      <div className={clsx(
        'relative z-10 flex flex-col p-6 sm:p-8',
        isFeatured && 'lg:flex-none',
        !isFeatured && !isHighlight && 'flex-1'
      )}>
        {/* Header with number and arrow */}
        <div className="flex items-start justify-between gap-4">
          <span
            ref={numberRef}
            className={clsx(
              'inline-flex items-center justify-center',
              'h-12 w-12 rounded-2xl',
              'text-sm font-bold tabular-nums tracking-tight',
              styles.number,
              'transition-all duration-300'
            )}
          >
            {number}
          </span>
          <div
            className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-full',
              isJuniper ? 'bg-powder text-juniper' : 'bg-ember text-frost',
              'opacity-0 -translate-x-3 transition-all duration-300',
              'group-hover:opacity-100 group-hover:translate-x-0'
            )}
          >
            <ArrowNarrowRightIcon className="h-5 w-5" />
          </div>
        </div>

        {/* Title and description */}
        <div className="mt-4 space-y-2">
          <h3 className={clsx(
            'text-lg font-semibold transition-colors duration-300 sm:text-xl',
            isJuniper 
              ? 'text-frost group-hover:text-powder' 
              : 'text-oxblood group-hover:text-ember dark:text-frost dark:group-hover:text-ember'
          )}>
            {title}
          </h3>
          <p className={clsx(
            'text-sm leading-relaxed',
            isJuniper 
              ? 'text-opal/80' 
              : 'text-oxblood/60 dark:text-opal/70'
          )}>
            {description}
          </p>
        </div>
      </div>

      {/* Demo area */}
      <div
        ref={demoRef}
        className={clsx(
          'relative z-10 flex-1 overflow-hidden transition-all duration-500 ease-out',
          'mx-4 mb-4 rounded-xl sm:mx-6 sm:mb-6'
        )}
      >
        <div className={clsx(
          'absolute inset-0 rounded-xl ring-1 ring-inset transition-all duration-300',
          isJuniper 
            ? 'ring-white/10 group-hover:ring-white/20' 
            : 'ring-black/5 group-hover:ring-black/10 dark:ring-white/5 dark:group-hover:ring-white/10'
        )} />
        {demo}
      </div>

      {/* Subtle shine effect on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
      </div>
    </a>
  )
}

export interface BentoFeature {
  title: string
  description: ReactNode
  href: string
  demo: ReactNode
  accent?: 'ember' | 'powder' | 'coral' | 'basalt' | 'juniper'
}

interface FeaturesBentoGridProps {
  eyebrow?: ReactNode
  headline: ReactNode
  subheadline?: ReactNode
  features: BentoFeature[]
  withGridBg?: boolean
}

// Auto-layout configurations for different card counts
// Each layout specifies the variant and accent for each position
const layoutConfigs: Record<number, Array<{ variant: 'default' | 'featured' | 'compact' | 'highlight'; accent: 'ember' | 'powder' | 'coral' | 'basalt' | 'juniper' }>> = {
  2: [
    { variant: 'featured', accent: 'ember' },
    { variant: 'highlight', accent: 'juniper' },
  ],
  3: [
    { variant: 'featured', accent: 'ember' },
    { variant: 'default', accent: 'coral' },
    { variant: 'default', accent: 'powder' },
  ],
  4: [
    { variant: 'featured', accent: 'ember' },
    { variant: 'highlight', accent: 'coral' },
    { variant: 'default', accent: 'juniper' },
    { variant: 'default', accent: 'powder' },
  ],
  5: [
    { variant: 'featured', accent: 'ember' },
    { variant: 'highlight', accent: 'coral' },
    { variant: 'default', accent: 'juniper' },
    { variant: 'default', accent: 'powder' },
    { variant: 'default', accent: 'basalt' },
  ],
}

// Grid class configurations for different card counts
const gridConfigs: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2 lg:grid-rows-[280px_280px]',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr] lg:grid-rows-[280px_280px]',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[280px_280px]',
  5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[260px_260px]',
}

export function FeaturesBentoGrid({
  eyebrow,
  headline,
  subheadline,
  features,
  withGridBg = false,
  ...props
}: FeaturesBentoGridProps & Omit<ComponentProps<'section'>, 'children'>) {
  const gridRef = useRef<HTMLDivElement>(null)
  const cardCount = Math.min(Math.max(features.length, 2), 5) as 2 | 3 | 4 | 5
  const layout = layoutConfigs[cardCount]
  const gridClass = gridConfigs[cardCount]

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = grid.querySelectorAll('.bento-card')
    gsap.set(cards, { y: 50, opacity: 0, scale: 0.95 })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(cards, {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.9,
              stagger: 0.1,
              ease: 'power3.out',
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.05 }
    )

    observer.observe(grid)
    return () => observer.disconnect()
  }, [])

  const content = (
    <Container className="flex flex-col gap-12 sm:gap-16">
      {/* Header */}
      <div className="flex max-w-3xl flex-col gap-6">
        <div className="flex flex-col gap-3">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {typeof headline === 'string' ? (
            <Subheading>{headline}</Subheading>
          ) : (
            headline
          )}
        </div>
        {subheadline && (
          <Text className="text-pretty text-lg">{subheadline}</Text>
        )}
      </div>

      {/* Bento Grid - auto-adapting mosaic layout */}
      <div
        ref={gridRef}
        className={clsx('grid gap-4 sm:gap-5', gridClass)}
      >
        {features.map((feature, index) => {
          const config = layout[index] || { variant: 'default' as const, accent: 'basalt' as const }
          const number = String(index + 1).padStart(2, '0')
          
          return (
            <FeatureBentoCard
              key={index}
              number={number}
              title={feature.title}
              description={feature.description}
              href={feature.href}
              demo={feature.demo}
              accent={feature.accent || config.accent}
              variant={config.variant}
              className="bento-card"
            />
          )
        })}
      </div>
    </Container>
  )

  if (withGridBg) {
    return (
      <section {...props}>
        <GridBgSection showBottomBorder={true} withPadding>
          {content}
        </GridBgSection>
      </section>
    )
  }

  return (
    <section className={sectionPaddingClasses} {...props}>
      {content}
    </section>
  )
}

