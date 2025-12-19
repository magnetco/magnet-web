'use client'

import { clsx } from 'clsx/lite'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { Container } from '@/components/elements/container'
import type { ComponentProps, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
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
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    const gradient = gradientRef.current
    const button = buttonRef.current
    const buttonFill = buttonFillRef.current

    if (!card || !gradient || !button || !buttonFill) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Update gradient position with smooth easing
      gsap.to(gradient, {
        x: x,
        y: y,
        duration: 0.6,
        ease: 'power2.out',
      })
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
      // Animate button fill from bottom
      gsap.fromTo(
        buttonFill,
        {
          scaleY: 0,
          transformOrigin: 'bottom center',
        },
        {
          scaleY: 1,
          duration: 0.5,
          ease: 'power2.out',
        }
      )
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      // Animate button fill out
      gsap.to(buttonFill, {
        scaleY: 0,
        duration: 0.4,
        ease: 'power2.in',
      })
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

  const content = (
    <div
      ref={cardRef}
      className={clsx(
        'group relative overflow-hidden rounded-xl bg-olive-950/2.5 p-6 transition-all duration-300',
        'hover:bg-olive-950/5',
        className
      )}
      {...props}
    >
      {/* Radial gradient that follows cursor */}
      <div
        ref={gradientRef}
        className="pointer-events-none absolute -left-1/2 -top-1/2 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(circle 400px at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        {icon && <div className="mb-4 text-oxblood">{icon}</div>}
        {description && <div className="mb-6 flex-1 text-sm/7 text-oxblood">{description}</div>}
        <div className="flex items-center justify-between">
          <h3 className="text-base/8 font-medium text-oxblood">{title}</h3>
          {/* Circular button with fill animation */}
          <div
            ref={buttonRef}
            className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-purple-500/10 transition-colors duration-300 group-hover:bg-purple-500/20"
          >
            {/* Fill circle that grows from bottom */}
            <div
              ref={buttonFillRef}
              className="absolute inset-0 rounded-full bg-purple-500"
              style={{
                transform: 'scaleY(0)',
                transformOrigin: 'bottom center',
              }}
            />
            {/* Icon on top of fill */}
            <ArrowNarrowRightIcon className="relative z-10 size-5 text-purple-600" />
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
      <Container className="flex flex-col gap-12">
        {(eyebrow || headline || subheadline) && (
          <div className="flex max-w-3xl flex-col gap-4 text-center">
            {eyebrow && <div className="text-sm/7 font-medium text-oxblood">{eyebrow}</div>}
            {headline && <h2 className="text-4xl/10 font-display tracking-tight text-oxblood">{headline}</h2>}
            {subheadline && <div className="text-base/7 text-oxblood">{subheadline}</div>}
          </div>
        )}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <InteractiveCard key={index} {...card} />
          ))}
        </div>
      </Container>
    </section>
  )
}

