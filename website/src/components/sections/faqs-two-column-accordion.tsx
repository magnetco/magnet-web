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

    // Disable CSS transitions via inline style to override CSS
    // Use height instead of max-height to avoid CSS conflicts
    disclosure.style.transition = 'none'
    disclosure.style.height = '0px'
    disclosure.style.maxHeight = 'none' // Override CSS max-height
    disclosure.style.opacity = '0'
    disclosure.style.overflow = 'hidden'

    const updateAriaExpanded = (isOpen: boolean) => {
      if (button) {
        button.setAttribute('aria-expanded', String(isOpen))
      }
    }

    const animateToggle = () => {
      const isOpen = disclosure.hasAttribute('open') && !disclosure.hasAttribute('hidden')
      updateAriaExpanded(isOpen)
      
      // Always disable CSS transitions during animation
      disclosure.style.transition = 'none'
      
      if (isOpen) {
        // Opening: immediately set to 0 to prevent CSS from showing it
        disclosure.style.height = '0px'
        disclosure.style.maxHeight = 'none' // Override CSS
        disclosure.style.opacity = '0'
        disclosure.style.overflow = 'hidden'
        
        // Force reflow to ensure 0px is applied
        void disclosure.offsetHeight
        
        // Temporarily set height to auto to measure natural height
        disclosure.style.height = 'auto'
        void disclosure.offsetHeight
        
        // Measure the natural height
        const targetHeight = disclosure.offsetHeight
        
        // Reset to 0 before animating
        disclosure.style.height = '0px'
        
        // Force another reflow to ensure 0px is applied
        void disclosure.offsetHeight
        
        // Animate to target height using height (not max-height to avoid CSS conflicts)
        gsap.to(disclosure, {
          height: `${targetHeight}px`,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            // After animation, set to auto to allow content changes
            disclosure.style.height = 'auto'
          }
        })
      } else {
        // Closing: get current height first, then animate to 0
        const currentHeight = disclosure.offsetHeight
        if (currentHeight > 0) {
          // Ensure we're using height, not max-height
          disclosure.style.height = `${currentHeight}px`
          disclosure.style.maxHeight = 'none'
          void disclosure.offsetHeight
          
          gsap.to(disclosure, {
            height: '0px',
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
          // Immediately disable CSS transitions to prevent CSS from applying
          disclosure.style.transition = 'none'
          
          // Use double RAF to ensure we catch it before CSS applies
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              animateToggle()
            })
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
      disclosure.style.maxHeight = 'none'
      disclosure.style.opacity = '1'
      disclosure.style.transition = 'none'
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
        className="flex w-full cursor-pointer items-start justify-between gap-6 py-4 text-left text-base/7 text-oxblood dark:text-ember"
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
        style={{ maxHeight: 'none', transition: 'none', height: 'auto' }}
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
