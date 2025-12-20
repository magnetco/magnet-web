'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function useButtonHover<T extends HTMLElement>() {
  const elementRef = useRef<T>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    const fill = fillRef.current
    const outline = outlineRef.current

    if (!element || !fill) return

    const handleMouseEnter = () => {
      // Fill slides from bottom
      gsap.fromTo(
        fill,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.5,
          ease: 'power2.out',
        }
      )
      // Outline fades in
      if (outline) {
        gsap.to(outline, {
          opacity: 1,
          duration: 0.2,
          ease: 'power2.out',
        })
      }
    }

    const handleMouseLeave = () => {
      // Fill slides out
      gsap.to(fill, {
        clipPath: 'inset(100% 0% 0% 0%)',
        duration: 0.4,
        ease: 'power2.in',
      })
      // Outline fades out
      if (outline) {
        gsap.to(outline, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
        })
      }
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return { elementRef, fillRef, outlineRef }
}

