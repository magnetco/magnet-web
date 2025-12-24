'use client'

import { ElDisclosure } from '@tailwindplus/elements/react'
import { clsx } from 'clsx/lite'
import { useEffect, useRef, useState, type ComponentProps, type ReactNode, useId } from 'react'
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
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const disclosure = disclosureRef.current
    const content = contentRef.current
    const button = buttonRef.current
    if (!disclosure || !content || !button) return

    const updateAriaExpanded = (isOpen: boolean) => {
      button.setAttribute('aria-expanded', String(isOpen))
      setIsOpen(isOpen)
    }

    const animateToggle = () => {
      const isOpen = disclosure.hasAttribute('open') && !disclosure.hasAttribute('hidden')
      updateAriaExpanded(isOpen)

      if (isOpen) {
        // Opening animation
        const height = content.offsetHeight
        disclosure.style.height = '0px'
        disclosure.style.opacity = '0'
        disclosure.style.overflow = 'hidden'
        
        requestAnimationFrame(() => {
          disclosure.style.transition = 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          disclosure.style.height = `${height}px`
          disclosure.style.opacity = '1'
        })

        // Clean up after animation
        setTimeout(() => {
          disclosure.style.height = 'auto'
          disclosure.style.transition = ''
        }, 400)
      } else {
        // Closing animation
        const height = disclosure.offsetHeight
        disclosure.style.height = `${height}px`
        disclosure.style.overflow = 'hidden'
        
        requestAnimationFrame(() => {
          disclosure.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          disclosure.style.height = '0px'
          disclosure.style.opacity = '0'
        })
      }
    }

    const observer = new MutationObserver(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          animateToggle()
        })
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
      disclosure.style.opacity = '1'
    } else {
      disclosure.style.height = '0px'
      disclosure.style.opacity = '0'
      disclosure.style.overflow = 'hidden'
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div 
      id={id} 
      className={clsx(
        "group relative overflow-hidden rounded-xl border transition-all duration-300",
        "border-olive-950/5 bg-white/50 hover:border-olive-950/10 hover:bg-white/80",
        "dark:border-white/5 dark:bg-juniper/30 dark:hover:border-white/10 dark:hover:bg-juniper/40",
        isOpen && "border-ember/20 bg-white dark:border-ember/30 dark:bg-juniper/50"
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
        <span className="flex-1 text-lg font-semibold leading-7 text-oxblood dark:text-ember">
          {question}
        </span>
        <div className={clsx(
          "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
          "bg-olive-950/5 group-hover:bg-ember/10",
          "dark:bg-white/5 dark:group-hover:bg-ember/20",
          isOpen && "bg-ember/10 dark:bg-ember/20"
        )}>
          <PlusIcon className={clsx(
            "absolute h-4 w-4 text-oxblood transition-all duration-300 ease-out dark:text-ember",
            isOpen && "rotate-90 scale-0 opacity-0"
          )} />
          <MinusIcon className={clsx(
            "absolute h-4 w-4 text-oxblood transition-all duration-300 ease-out dark:text-ember",
            !isOpen && "scale-0 opacity-0"
          )} />
        </div>
      </button>
      <ElDisclosure
        ref={disclosureRef}
        id={`${id}-answer`}
        hidden
        className="overflow-hidden"
        style={{ height: '0px', opacity: '0' }}
      >
        <div ref={contentRef} className="px-6 pb-6">
          <div className="text-base leading-7 text-olive-700 dark:text-opal">
            {answer}
          </div>
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
  return (
    <section className={clsx('py-16', className)} {...props}>
      <div className="mx-auto flex max-w-3xl flex-col gap-8 px-6 lg:max-w-5xl lg:px-10">
        <div className="flex flex-col gap-6">
          <Subheading>{headline}</Subheading>
          {subheadline && <Text className="flex flex-col gap-4 text-pretty">{subheadline}</Text>}
        </div>
        <div className="flex flex-col gap-4">
          {children}
        </div>
      </div>
    </section>
  )
}
