'use client'

import { clsx } from 'clsx/lite'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import type { ComponentProps, ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export interface InteractiveCard {
  title: string
  icon?: ReactNode
  description?: ReactNode
  href?: string
}

export function InteractiveCard({
  title,
  icon,
  description,
  href,
  className,
  ...props
}: InteractiveCard & ComponentProps<'div'>) {
  const cardRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const buttonFillRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const gradient = gradientRef.current
    const button = buttonRef.current
    const buttonFill = buttonFillRef.current
    const description = descriptionRef.current

    if (!card || !gradient || !button || !buttonFill) return

    // Measure description height on mount
    let descriptionHeight = 0
    const measureDescription = () => {
      if (description) {
        // Temporarily show to measure actual height
        const originalHeight = description.style.height
        const originalOpacity = description.style.opacity
        const originalMarginBottom = description.style.marginBottom
        
        description.style.display = 'block'
        description.style.height = 'auto'
        description.style.opacity = '1'
        description.style.marginBottom = '24px'
        
        // Force reflow
        void description.offsetHeight
        
        descriptionHeight = description.scrollHeight
        
        // Restore hidden state
        description.style.display = 'block' // Keep display block, just hide with height/opacity
        description.style.height = originalHeight || '0px'
        description.style.opacity = originalOpacity || '0'
        description.style.marginBottom = originalMarginBottom || '0px'
      }
    }
    
    // Measure after DOM is ready
    if (description) {
      // Use requestAnimationFrame to ensure layout is complete
      requestAnimationFrame(() => {
        requestAnimationFrame(measureDescription)
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Update gradient position with smooth easing - center it exactly on cursor
      gsap.to(gradient, {
        x: x,
        y: y,
        xPercent: -50,
        yPercent: -50,
        duration: 0.8,
        ease: 'power1.out',
      })
    }

    const handleMouseEnter = () => {
      // Animate button fill from bottom using clip-path to maintain circle shape
      gsap.fromTo(
        buttonFill,
        {
          clipPath: 'inset(100% 0% 0% 0%)',
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.6,
          ease: 'power2.out',
        }
      )
      // Animate description in
      if (description) {
        // Re-measure if needed (fallback)
        if (descriptionHeight === 0) {
          measureDescription()
        }
        // Ensure element is visible before animating
        description.style.visibility = 'visible'
        description.style.display = 'block'
        // Use a small delay to ensure styles are applied
        requestAnimationFrame(() => {
          gsap.to(description, {
            opacity: 1,
            height: descriptionHeight > 0 ? descriptionHeight : 'auto',
            marginBottom: 24,
            duration: 0.4,
            ease: 'power2.out',
          })
        })
      }
    }

    const handleMouseLeave = () => {
      // Animate button fill out
      gsap.to(buttonFill, {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 0.4,
        ease: 'power2.in',
      })
      // Animate description out
      if (description) {
        gsap.to(description, {
          opacity: 0,
          height: 0,
          marginBottom: 0,
          duration: 0.3,
          ease: 'power2.in',
        })
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
  }, [description])

  const content = (
    <div
      ref={cardRef}
      className={clsx(
        'group relative overflow-hidden rounded-xl bg-olive-950/2.5 p-8 transition-all duration-300',
        'hover:bg-olive-950/5',
        'min-h-[400px] flex flex-col',
        'items-start justify-start',
        className
      )}
      {...props}
    >
      {/* Radial gradient that follows cursor - smaller and fully rounded circle */}
      <div
        ref={gradientRef}
        className="pointer-events-none absolute h-[150%] w-[150%] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(circle 300px at center, rgba(249, 67, 43, 0.2) 0%, rgba(249, 67, 43, 0.1) 30%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Icon at top */}
        {icon && <div className="mb-4 text-oxblood">{icon}</div>}
        {/* Description only shows on hover - positioned after icon */}
        {description && (
          <div
            ref={descriptionRef}
            className="mb-6 min-h-0 overflow-hidden text-sm/7 text-oxblood"
            style={{ 
              opacity: 0, 
              height: '0px', 
              marginBottom: '0px',
              display: 'block',
            }}
          >
            {description}
          </div>
        )}
        {/* Title and button at bottom - always at bottom */}
        <div className="mt-auto flex items-center justify-between pt-6">
          <h3 className="text-base/8 font-medium text-oxblood">{title}</h3>
          {/* Circular button with fill animation - monotone by default */}
          <div
            ref={buttonRef}
            className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-olive-950/10 transition-colors duration-300 group-hover:bg-ember/10"
          >
            {/* Fill circle that grows from bottom - using clip-path to maintain circle shape */}
            <div
              ref={buttonFillRef}
              className="absolute inset-0 rounded-full bg-ember"
              style={{
                clipPath: 'inset(100% 0% 0% 0%)',
                zIndex: 1,
              }}
            />
            {/* Icon on top of fill - monotone by default, ember on hover */}
            <ArrowNarrowRightIcon className="relative size-5 text-oxblood transition-colors duration-300 group-hover:text-ember" style={{ zIndex: 20, position: 'relative' }} />
          </div>
        </div>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    )
  }

  return content
}

export function InteractiveCardsGrid({
  eyebrow,
  headline,
  subheadline,
  cards,
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline: ReactNode
  subheadline?: ReactNode
  cards: InteractiveCard[]
} & ComponentProps<'section'>) {
  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container className="flex flex-col gap-10 sm:gap-16">
        {headline && (
          <div className="flex max-w-2xl flex-col gap-6">
            <div className="flex flex-col gap-2">
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              <Subheading>{headline}</Subheading>
            </div>
            {subheadline && <Text className="text-pretty">{subheadline}</Text>}
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {cards.map((card, index) => (
            <InteractiveCard key={index} {...card} />
          ))}
        </div>
      </Container>
    </section>
  )
}

