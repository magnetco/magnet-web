'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useSyncExternalStore } from 'react'

gsap.registerPlugin(ScrollTrigger)

// Hydration-safe mounted check
const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

export function ScrollDotTracker() {
  const dotRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  useGSAP(
    () => {
      if (!mounted || !dotRef.current || !lineRef.current) return

      const dot = dotRef.current
      const line = lineRef.current
      const eyebrows = gsap.utils.toArray<HTMLElement>('[data-eyebrow]')

      // Set initial position
      gsap.set(dot, { top: '10vh' })

      // Main scroll tracking - dot moves from 10vh to 90vh as you scroll
      gsap.to(dot, {
        top: '90vh',
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })

      // The line grows as you scroll
      gsap.to(line, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      })

      // Create expansion triggers for each eyebrow
      eyebrows.forEach((eyebrow) => {
        ScrollTrigger.create({
          trigger: eyebrow,
          start: 'top 70%',
          end: 'top 30%',
          onEnter: () => {
            gsap.to(dot, {
              width: 40,
              borderRadius: 4,
              backgroundColor: '#a8a29e', // stone-400
              duration: 0.25,
              ease: 'power2.out',
            })
          },
          onLeave: () => {
            gsap.to(dot, {
              width: 6,
              borderRadius: 3,
              backgroundColor: '#a8a29e',
              duration: 0.25,
              ease: 'power2.out',
            })
          },
          onEnterBack: () => {
            gsap.to(dot, {
              width: 40,
              borderRadius: 4,
              backgroundColor: '#a8a29e',
              duration: 0.25,
              ease: 'power2.out',
            })
          },
          onLeaveBack: () => {
            gsap.to(dot, {
              width: 6,
              borderRadius: 3,
              backgroundColor: '#a8a29e',
              duration: 0.25,
              ease: 'power2.out',
            })
          },
        })
      })

      // Refresh on resize
      const handleResize = () => {
        ScrollTrigger.refresh()
      }
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    },
    { dependencies: [mounted] }
  )

  if (!mounted) return null

  return (
    <div className="pointer-events-none fixed inset-y-0 left-0 z-50 hidden w-16 lg:block" aria-hidden="true">
      {/* Vertical track line */}
      <div
        ref={lineRef}
        className="absolute left-[27px] top-[10vh] h-[80vh] w-px origin-top bg-stone-300/30"
        style={{ transform: 'scaleY(0)' }}
      />
      {/* The tracker dot */}
      <div
        ref={dotRef}
        className="absolute left-6 rounded-full bg-stone-400 shadow-sm will-change-transform"
        style={{
          width: 6,
          height: 6,
          top: '10vh',
        }}
      />
    </div>
  )
}
