'use client'

import { ElDisclosure } from '@tailwindplus/elements/react'
import { clsx } from 'clsx/lite'
import { gsap } from 'gsap'
import { useEffect, useRef, type ComponentProps, type ReactNode, useId } from 'react'
import { Container } from '../elements/container'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
import { MinusIcon } from '../icons/minus-icon'
import { PlusIcon } from '../icons/plus-icon'

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

  useEffect(() => {
    const disclosure = disclosureRef.current
    const content = contentRef.current
    const button = buttonRef.current
    if (!disclosure || !content) return

    // Disable CSS transitions and set initial state
    gsap.set(disclosure, {
      height: 0,
      opacity: 0,
      overflow: 'hidden',
      maxHeight: 'none', // Override CSS max-height
      transition: 'none', // Disable CSS transitions
    })

    const updateAriaExpanded = (isOpen: boolean) => {
      if (button) {
        button.setAttribute('aria-expanded', String(isOpen))
      }
    }

    const animateToggle = () => {
      const isOpen = disclosure.hasAttribute('open') && !disclosure.hasAttribute('hidden')
      updateAriaExpanded(isOpen)
      
      if (isOpen) {
        // Opening: temporarily set to auto to measure, then animate
        gsap.set(disclosure, { height: 'auto' })
        const height = disclosure.offsetHeight
        gsap.set(disclosure, { height: 0 })
        
        gsap.to(disclosure, {
          height: height,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        })
      } else {
        // Closing: get current height first, then animate to 0
        const currentHeight = disclosure.offsetHeight
        if (currentHeight > 0) {
          gsap.to(disclosure, {
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
          })
        }
      }
    }

    // Use MutationObserver to watch for attribute changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'open' || mutation.attributeName === 'hidden')) {
          // Small delay to ensure DOM has updated
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
      gsap.set(disclosure, { height: 'auto' })
      const height = disclosure.offsetHeight
      gsap.set(disclosure, { height: height, opacity: 1, maxHeight: 'none', transition: 'none' })
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div id={id} {...props}>
      <button
        ref={buttonRef}
        type="button"
        id={`${id}-question`}
        command="--toggle"
        commandfor={`${id}-answer`}
        aria-expanded="false"
        className="flex w-full items-start justify-between gap-6 py-4 text-left text-base/7 text-oxblood dark:text-ember"
      >
        {question}
        <div className="relative h-lh w-lh shrink-0">
          <PlusIcon className="h-lh w-lh transition-transform duration-300 ease-in-out in-aria-expanded:rotate-90 in-aria-expanded:opacity-0" />
          <MinusIcon className="absolute inset-0 h-lh w-lh transition-opacity duration-300 ease-in-out not-in-aria-expanded:opacity-0" />
        </div>
      </button>
      <ElDisclosure
        ref={disclosureRef}
        id={`${id}-answer`}
        hidden
        className="-mt-2 flex flex-col gap-2 pr-12 pb-4 text-sm/7 text-oxblood dark:text-coral"
        style={{ maxHeight: 'none', transition: 'none' }}
      >
        <div ref={contentRef}>{answer}</div>
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
  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container className="grid grid-cols-1 gap-x-2 gap-y-8 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Subheading>{headline}</Subheading>
          {subheadline && <Text className="flex flex-col gap-4 text-pretty">{subheadline}</Text>}
        </div>
        <div className="divide-y divide-olive-950/10 border-y border-olive-950/10 dark:divide-white/10 dark:border-white/10">
          {children}
        </div>
      </Container>
    </section>
  )
}
