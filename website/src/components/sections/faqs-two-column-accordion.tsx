'use client'

import { ElDisclosure } from '@tailwindplus/elements/react'
import { clsx } from 'clsx/lite'
import { gsap } from 'gsap'
import { useEffect, useRef, useState, type ComponentProps, type ReactNode, useId } from 'react'
import { Container } from '../elements/container'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'

export function Faq({
  id,
  question,
  answer,
  ...props
}: { question: ReactNode; answer: ReactNode } & ComponentProps<'div'>) {
  const autoId = useId()
  id = id || autoId
  const disclosureRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const disclosure = disclosureRef.current
    const content = contentRef.current
    const button = buttonRef.current
    const icon = iconRef.current
    if (!disclosure || !content || !icon) return

    // Initialize closed state
    disclosure.style.height = '0px'
    disclosure.style.overflow = 'hidden'
    gsap.set(content, { opacity: 0, y: 12 })

    const updateAriaExpanded = (open: boolean) => {
      if (button) {
        button.setAttribute('aria-expanded', String(open))
      }
      setIsOpen(open)
    }

    const animateOpen = () => {
      // Kill any running animations
      gsap.killTweensOf([disclosure, content, icon])

      // Measure target height
      disclosure.style.height = 'auto'
      const targetHeight = disclosure.offsetHeight
      disclosure.style.height = '0px'

      // Create timeline for orchestrated animation
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      // Animate icon rotation
      tl.to(
        icon,
        {
          rotation: 180,
          duration: 0.4,
          ease: 'back.out(1.7)',
        },
        0
      )

      // Expand container with slight overshoot
      tl.to(
        disclosure,
        {
          height: targetHeight,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            disclosure.style.height = 'auto'
          },
        },
        0
      )

      // Content fades up with slight delay
      tl.to(
        content,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        },
        0.1
      )
    }

    const animateClose = () => {
      // Kill any running animations
      gsap.killTweensOf([disclosure, content, icon])

      const currentHeight = disclosure.offsetHeight
      disclosure.style.height = `${currentHeight}px`

      // Create timeline for orchestrated animation
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
      })

      // Animate icon back
      tl.to(
        icon,
        {
          rotation: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        },
        0
      )

      // Content fades down first
      tl.to(
        content,
        {
          opacity: 0,
          y: 8,
          duration: 0.25,
        },
        0
      )

      // Then collapse container
      tl.to(
        disclosure,
        {
          height: 0,
          duration: 0.35,
          ease: 'power3.inOut',
        },
        0.05
      )
    }

    const animateToggle = () => {
      const open = disclosure.hasAttribute('open') && !disclosure.hasAttribute('hidden')
      updateAriaExpanded(open)

      if (open) {
        animateOpen()
      } else {
        animateClose()
      }
    }

    // Watch for attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'open' || mutation.attributeName === 'hidden')) {
          requestAnimationFrame(() => {
            animateToggle()
          })
        }
      })
    })

    observer.observe(disclosure, {
      attributes: true,
      attributeFilter: ['open', 'hidden'],
    })

    // Check initial state
    const isInitiallyOpen = disclosure.hasAttribute('open') && !disclosure.hasAttribute('hidden')
    updateAriaExpanded(isInitiallyOpen)
    if (isInitiallyOpen) {
      disclosure.style.height = 'auto'
      gsap.set(content, { opacity: 1, y: 0 })
      gsap.set(icon, { rotation: 180 })
    }

    return () => {
      observer.disconnect()
      gsap.killTweensOf([disclosure, content, icon])
    }
  }, [])

  return (
    <div
      id={id}
      className={clsx(
        'group transition-colors duration-200',
        isOpen && 'bg-olive-950/2 dark:bg-white/2'
      )}
      {...props}
    >
      <button
        ref={buttonRef}
        type="button"
        id={`${id}-question`}
        command="--toggle"
        commandfor={`${id}-answer`}
        aria-expanded={isOpen}
        className={clsx(
          'flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left',
          'text-base/7 font-medium text-oxblood transition-colors duration-200',
          'hover:text-ember dark:text-coral dark:hover:text-ember'
        )}
      >
        <span className="text-pretty">{question}</span>
        <div
          ref={iconRef}
          className={clsx(
            'relative flex size-6 shrink-0 items-center justify-center rounded-full',
            'bg-olive-950/5 transition-colors duration-200',
            'group-hover:bg-ember/10 dark:bg-white/10 dark:group-hover:bg-ember/20',
            isOpen && 'bg-ember/10 dark:bg-ember/20'
          )}
        >
          <svg
            className="size-3 text-oxblood dark:text-coral"
            fill="none"
            viewBox="0 0 12 12"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            <path d="M6 1v10" className={clsx('origin-center transition-opacity duration-200', isOpen && 'opacity-0')} />
            <path d="M1 6h10" />
          </svg>
        </div>
      </button>
      <ElDisclosure
        ref={disclosureRef}
        id={`${id}-answer`}
        hidden
        className="overflow-hidden"
      >
        <div ref={contentRef} className="pb-5 pr-12">
          <div className="text-sm/7 text-olive-700 dark:text-opal">{answer}</div>
        </div>
      </ElDisclosure>
    </div>
  )
}

export function FAQsTwoColumnAccordion({
  headline,
  subheadline,
  className,
  children,
  ...props
}: {
  headline?: ReactNode
  subheadline?: ReactNode
} & ComponentProps<'section'>) {
  // If headline is a string, wrap in Subheading. Otherwise, render as-is (for AnimatedSubheading etc.)
  const headlineElement =
    headline && typeof headline === 'string' ? <Subheading>{headline}</Subheading> : headline

  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container className="grid grid-cols-1 gap-x-2 gap-y-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          {headlineElement}
          {subheadline && <Text className="flex flex-col gap-4 text-pretty">{subheadline}</Text>}
        </div>
        <div className="divide-y divide-olive-950/10 border-y border-olive-950/10 dark:divide-white/10 dark:border-white/10">
          {children}
        </div>
      </Container>
    </section>
  )
}
