'use client'

import { ElDisclosure } from '@tailwindplus/elements/react'
import { clsx } from 'clsx/lite'
import { gsap } from 'gsap'
import { useEffect, useRef, useState, type ComponentProps, type ReactNode, useId } from 'react'
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
    if (!disclosure || !content || !button || !icon) return

    // Initialize closed state
    disclosure.style.height = '0px'
    disclosure.style.overflow = 'hidden'
    gsap.set(content, { opacity: 0, y: 16 })

    const updateAriaExpanded = (open: boolean) => {
      button.setAttribute('aria-expanded', String(open))
      setIsOpen(open)
    }

    const animateOpen = () => {
      gsap.killTweensOf([disclosure, content, icon])

      // Measure target height
      disclosure.style.height = 'auto'
      const targetHeight = disclosure.offsetHeight
      disclosure.style.height = '0px'

      const tl = gsap.timeline()

      // Icon morphs from plus to minus with rotation
      tl.to(
        icon,
        {
          rotation: 180,
          scale: 1.1,
          duration: 0.35,
          ease: 'back.out(2)',
        },
        0
      )
      
      tl.to(
        icon,
        {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        },
        0.35
      )

      // Container expands with spring-like motion
      tl.to(
        disclosure,
        {
          height: targetHeight,
          duration: 0.45,
          ease: 'power2.out',
          onComplete: () => {
            disclosure.style.height = 'auto'
          },
        },
        0
      )

      // Content slides up and fades in
      tl.to(
        content,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
        },
        0.1
      )
    }

    const animateClose = () => {
      gsap.killTweensOf([disclosure, content, icon])

      const currentHeight = disclosure.offsetHeight
      disclosure.style.height = `${currentHeight}px`

      const tl = gsap.timeline()

      // Icon rotates back
      tl.to(
        icon,
        {
          rotation: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        },
        0
      )

      // Content fades down
      tl.to(
        content,
        {
          opacity: 0,
          y: 12,
          duration: 0.2,
          ease: 'power2.in',
        },
        0
      )

      // Container collapses
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

    // Set initial state
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
        'group relative overflow-hidden rounded-xl border transition-all duration-300',
        'border-olive-950/5 bg-white/50 hover:border-olive-950/10 hover:bg-white/80',
        'dark:border-white/5 dark:bg-juniper/30 dark:hover:border-white/10 dark:hover:bg-juniper/40',
        isOpen && 'border-ember/20 bg-white dark:border-ember/30 dark:bg-juniper/50'
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
        aria-controls={`${id}-answer`}
        className="flex w-full cursor-pointer items-start justify-between gap-6 px-6 py-5 text-left transition-colors duration-200 hover:text-ember dark:hover:text-ember"
      >
        <span className="flex-1 text-lg font-semibold leading-7 text-oxblood dark:text-ember">{question}</span>
        <div
          ref={iconRef}
          className={clsx(
            'relative flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200',
            'bg-olive-950/5 group-hover:bg-ember/10',
            'dark:bg-white/5 dark:group-hover:bg-ember/20',
            isOpen && 'bg-ember/10 dark:bg-ember/20'
          )}
        >
          <svg
            className="size-4 text-oxblood dark:text-ember"
            fill="none"
            viewBox="0 0 16 16"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            <path
              d="M8 2v12"
              className={clsx('origin-center transition-opacity duration-200', isOpen && 'opacity-0')}
            />
            <path d="M2 8h12" />
          </svg>
        </div>
      </button>
      <ElDisclosure
        ref={disclosureRef}
        id={`${id}-answer`}
        hidden
        className="overflow-hidden"
      >
        <div ref={contentRef} className="px-6 pb-6">
          <div className="text-base leading-7 text-olive-700 dark:text-opal">{answer}</div>
        </div>
      </ElDisclosure>
    </div>
  )
}

export function FAQsAccordion({
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
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 lg:max-w-5xl lg:px-10">
        <div className="flex flex-col gap-6">
          {headlineElement}
          {subheadline && <Text className="flex flex-col gap-4 text-pretty">{subheadline}</Text>}
        </div>
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </section>
  )
}
