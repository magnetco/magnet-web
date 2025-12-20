'use client'

import { clsx } from 'clsx/lite'
import { useEffect, useRef, type ComponentProps, type ReactNode } from 'react'
import { gsap } from 'gsap'

export function HoverGradient({ children, className, ...props }: { children: ReactNode } & ComponentProps<'div'>) {
  const gradientRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const gradient = gradientRef.current

    if (!container || !gradient) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
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

    container.addEventListener('mousemove', handleMouseMove)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className={clsx('group relative overflow-hidden', className)} {...props}>
      {/* Radial gradient that follows cursor */}
      <div
        ref={gradientRef}
        className="pointer-events-none absolute h-[150%] w-[150%] rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(circle 300px at center, rgba(249, 67, 43, 0.2) 0%, rgba(249, 67, 43, 0.1) 30%, transparent 70%)',
        }}
      />
      {children}
    </div>
  )
}

