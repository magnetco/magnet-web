'use client'

import { clsx } from 'clsx/lite'
import { gsap } from 'gsap'
import { useEffect, useRef, type ComponentProps } from 'react'

interface EyebrowProps extends ComponentProps<'div'> {
  color?: 'dark' | 'light'
}

export function Eyebrow({ children, className, color = 'dark', ...props }: EyebrowProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    const line = lineRef.current

    if (!container || !line) return

    // Set initial state
    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            // Animate line drawing from left to right
            gsap.to(line, {
              scaleX: 1,
              duration: 0.5,
              ease: 'power2.out',
            })

            observer.disconnect()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  const colorStyles = {
    dark: {
      text: 'text-ember',
      line: 'bg-oxblood/10',
    },
    light: {
      text: 'text-white/70',
      line: 'bg-white/15',
    },
  }

  const styles = colorStyles[color]

  return (
    <div
      ref={containerRef}
      data-eyebrow
      className={clsx(
        'mb-8 flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.03em]',
        styles.text,
        className
      )}
      {...props}
    >
      {/* Leader line - short line from edge with gap before text */}
      <span
        ref={lineRef}
        className={clsx(
          'block h-px',
          '-ml-4 w-3',
          'md:-ml-6 md:w-4',
          'lg:-ml-10 lg:w-6',
          styles.line
        )}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
