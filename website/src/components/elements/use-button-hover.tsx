'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export function useButtonHover<T extends HTMLElement>() {
  const elementRef = useRef<T>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    const fill = fillRef.current
    const outline = outlineRef.current
    const shine = shineRef.current

    if (!element || !fill || !outline) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Position shine centered on cursor (if shine exists)
      if (shine) {
        gsap.to(shine, {
          x: x,
          y: y,
          xPercent: -50,
          yPercent: -50,
          duration: 0.6,
          ease: 'power1.out',
        })
      }
    }

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
      // Outline fades in quickly
      gsap.to(outline, {
        opacity: 1,
        duration: 0.2,
        ease: 'power2.out',
      })
      if (shine) {
        gsap.to(shine, {
          opacity: 1,
          duration: 0.2,
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
      gsap.to(outline, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      })
      if (shine) {
        gsap.to(shine, {
          opacity: 0,
          duration: 0.2,
        })
      }
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return { elementRef, fillRef, outlineRef, shineRef }
}

