'use client'

import { clsx } from 'clsx/lite'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import type { ComponentProps, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

export interface Stat {
  value: string
  label: string
}

export interface Testimonial {
  quote: ReactNode
  name: string
  title: string
  company: string
  logo?: ReactNode
  image: string
}

function CountingStat({ value, label, delay = 0 }: Stat & { delay?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          setTimeout(() => animateValue(), delay * 1000)
        }
      },
      { threshold: 0.5 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [isVisible, delay])

  const animateValue = () => {
    if (!containerRef.current) return

    // Parse the value to extract number and suffix
    const match = value.match(/^([$]?)([\d.]+)([KMB+]?)$/)
    if (!match) {
      containerRef.current.textContent = value
      return
    }

    const prefix = match[1] // $ or empty
    const numStr = match[2] // number part
    const suffix = match[3] // K, M, B, + or empty

    // Convert to actual number for animation
    let targetNumber = parseFloat(numStr)
    if (suffix === 'K') targetNumber = targetNumber * 1000
    else if (suffix === 'M') targetNumber = targetNumber * 1000000
    else if (suffix === 'B') targetNumber = targetNumber * 1000000000

    const duration = 2
    const hasDecimal = numStr.includes('.')

    // Create character spans for individual animation
    containerRef.current.innerHTML = ''
    if (prefix) {
      const span = document.createElement('span')
      span.textContent = prefix
      containerRef.current.appendChild(span)
    }

    const numChars = numStr.split('')
    const digitSpans: Array<{ span: HTMLSpanElement; target: number; isDecimal: boolean }> = []

    numChars.forEach((char) => {
      const span = document.createElement('span')
      span.style.display = 'inline-block'
      if (char === '.') {
        span.textContent = '.'
        span.style.display = 'inline'
        digitSpans.push({ span, target: -1, isDecimal: true })
      } else {
        span.textContent = '0'
        digitSpans.push({ span, target: parseInt(char), isDecimal: false })
      }
      containerRef.current!.appendChild(span)
    })

    if (suffix) {
      const span = document.createElement('span')
      span.textContent = suffix
      containerRef.current.appendChild(span)
    }

    // Find the last digit index
    let lastDigitIndex = -1
    for (let i = digitSpans.length - 1; i >= 0; i--) {
      if (!digitSpans[i].isDecimal) {
        lastDigitIndex = i
        break
      }
    }

    // Animate each digit with offset - last digit finishes last
    digitSpans.forEach(({ span, target, isDecimal }, index) => {
      if (isDecimal) return

      const isLastDigit = index === lastDigitIndex
      
      // Last digit gets more delay
      const delay = isLastDigit ? duration * 0.4 : index * 0.1
      const digitDuration = duration - delay

      gsap.fromTo(
        { value: 0 },
        {
          value: target,
          duration: digitDuration,
          delay: delay,
          ease: 'power2.out',
          onUpdate: function () {
            const current = Math.floor(this.targets()[0].value)
            span.textContent = current.toString()
          },
          onComplete: function () {
            span.textContent = target.toString()
          },
        }
      )
    })
  }

  return (
    <div ref={containerRef} className="text-5xl/10 font-display tracking-tight text-oxblood">
      {value}
    </div>
  )
}

export function PerformanceStat({ stat, text, delay }: { stat: string; text: ReactNode; delay?: number } & ComponentProps<'div'>) {
  return (
    <div className="flex flex-col gap-2">
      <CountingStat value={stat} label="" delay={delay} />
      <p className="text-base/7 text-oxblood">{text}</p>
    </div>
  )
}

export function PerformanceTestimonial({
  quote,
  name,
  title,
  company,
  logo,
  image,
  isActive,
  className,
  ...props
}: Testimonial & { isActive: boolean } & ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'relative flex flex-col gap-8 rounded-xl p-8 transition-all duration-500 lg:flex-row lg:items-center lg:gap-12',
        isActive ? 'bg-gradient-to-br from-juniper to-basalt text-white' : 'bg-ember/10 text-oxblood',
        className
      )}
      {...props}
    >
      {/* Left side - quote and info */}
      <div className="flex flex-1 flex-col gap-8">
        <blockquote className="relative flex flex-col gap-4 text-lg/8 lg:text-xl/8">
          {quote}
        </blockquote>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="font-semibold">{name}</p>
            <p className={clsx('text-sm/6', isActive ? 'opacity-80' : 'text-oxblood/70')}>
              {title}, {company}
            </p>
          </div>
          {logo && <div className="flex items-center">{logo}</div>}
        </div>
      </div>

      {/* Right side - image */}
      {image && (
        <div className="relative hidden h-40 w-40 shrink-0 overflow-hidden rounded-full lg:block">
          <Image src={image} alt={name} width={160} height={160} className="h-full w-full object-cover" />
        </div>
      )}
    </div>
  )
}

export function PerformanceWithStatsAndTestimonials({
  eyebrow,
  headline,
  subheadline,
  stats,
  testimonials,
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline: ReactNode
  subheadline?: ReactNode
  stats: Stat[]
  testimonials: Testimonial[]
} & ComponentProps<'section'>) {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container className="flex flex-col gap-10 sm:gap-16">
        {/* Header */}
        {headline && (
          <div className="flex max-w-2xl flex-col gap-6">
            <div className="flex flex-col gap-2">
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              <Subheading>{headline}</Subheading>
            </div>
            {subheadline && <Text className="text-pretty">{subheadline}</Text>}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <PerformanceStat key={index} stat={stat.value} text={stat.label} delay={index * 0.2} />
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full flex-shrink-0">
                  <PerformanceTestimonial {...testimonial} isActive={index === activeIndex} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={clsx(
                    'h-2 w-2 rounded-full transition-all duration-300',
                    index === activeIndex ? 'w-8 bg-basalt' : 'bg-olive-950/20'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevTestimonial}
                className="flex size-10 items-center justify-center rounded-full bg-olive-950/10 transition-colors hover:bg-olive-950/20"
                aria-label="Previous testimonial"
              >
                <ChevronIcon className="size-5 rotate-90 text-oxblood" />
              </button>
              <button
                onClick={nextTestimonial}
                className="flex size-10 items-center justify-center rounded-full bg-olive-950/10 transition-colors hover:bg-olive-950/20"
                aria-label="Next testimonial"
              >
                <ChevronIcon className="size-5 -rotate-90 text-oxblood" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

