'use client'

import { clsx } from 'clsx/lite'
import { gsap } from 'gsap'
import Image from 'next/image'
import { useEffect, useRef, type ComponentProps, type ReactNode } from 'react'
import { Container } from '../elements/container'
import { Eyebrow } from '../elements/eyebrow'
import { GridBgSection } from '../elements/grid-bg'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'

interface TestimonialData {
  quote: string
  name: string
  role: string
  company: string
  image: string
}

const testimonials: TestimonialData[] = [
  {
    quote: "Magnet completely transformed our brand positioning and website. Our conversion rate increased by 240% in the first quarter, and we're finally standing out in a crowded market.",
    name: "Jordan Rogers",
    role: "Founder",
    company: "Anomaly",
    image: "/img/avatars/10-size-160.webp",
  },
  {
    quote: "Their search marketing strategy tripled our organic traffic in six months. Magnet understands how to build sustainable growth, not just quick wins.",
    name: "Lynn Marshall",
    role: "Founder",
    company: "Pine Labs",
    image: "/img/avatars/15-size-160.webp",
  },
  {
    quote: "Working with Magnet freed up our team to focus on product development. Their paid ads campaigns are driving qualified leads at a fraction of our previous cost per acquisition.",
    name: "Rajat Singh",
    role: "Head of Marketing",
    company: "Concise",
    image: "/img/avatars/13-size-160.webp",
  },
  {
    quote: "Magnet's branding work gave us clarity we didn't know we needed. Our messaging is now consistent across every touchpoint, and it shows in our customer engagement metrics.",
    name: "John Walters",
    role: "CPO",
    company: "Orbital",
    image: "/img/avatars/12-size-160.webp",
  },
  {
    quote: "As a solo founder, Magnet made it possible to compete with much larger companies. Their website and marketing systems give us the credibility and reach we needed to scale.",
    name: "Noah Gold",
    role: "CEO",
    company: "Looply",
    image: "/img/avatars/11-size-160.webp",
  },
  {
    quote: "We've doubled our marketing ROI since partnering with Magnet. Their data-driven approach and strategic thinking have transformed how we think about growth.",
    name: "Mark Levinson",
    role: "CMO",
    company: "Quirk",
    image: "/img/avatars/14-size-160.webp",
  },
  {
    quote: "The strategic clarity Magnet brought to our brand was game-changing. Within weeks of launch, our inbound leads increased by 180%.",
    name: "Priya Sharma",
    role: "VP of Growth",
    company: "Nexus",
    image: "/img/avatars/10-size-160.webp",
  },
  {
    quote: "Magnet doesn't just build websites—they build revenue machines. Our e-commerce conversion jumped from 1.2% to 4.8% in three months.",
    name: "David Chen",
    role: "Director",
    company: "Forma",
    image: "/img/avatars/13-size-160.webp",
  },
  {
    quote: "The level of strategic thinking Magnet brings is rare. They see the full picture and execute flawlessly across every channel.",
    name: "Sarah Mitchell",
    role: "CEO",
    company: "Craft",
    image: "/img/avatars/15-size-160.webp",
  },
]

function TestimonialCard({
  testimonial,
  className,
  onRef,
}: {
  testimonial: TestimonialData
  className?: string
  onRef?: (el: HTMLDivElement | null) => void
}) {
  return (
    <div
      ref={onRef}
      className={clsx(
        'group relative flex flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 sm:p-8',
        'bg-white/60 dark:bg-juniper/40',
        'border border-oxblood/5 dark:border-white/5',
        'transition-all duration-300 ease-out',
        'hover:bg-white hover:shadow-lg hover:shadow-oxblood/5',
        'dark:hover:bg-juniper/60 dark:hover:shadow-ember/5',
        className,
      )}
    >
      {/* Quote */}
      <blockquote className="text-base/7 text-oxblood/80 dark:text-opal/80">
        {testimonial.quote}
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="relative size-11 overflow-hidden rounded-full ring-1 ring-oxblood/10 dark:ring-white/10">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-oxblood dark:text-white">{testimonial.name}</p>
          <p className="text-sm text-oxblood/50 dark:text-opal/50">
            {testimonial.role}, <span className="text-ember">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export function TestimonialsAnimatedGrid({
  eyebrow = 'Kind Words',
  headline,
  subheadline,
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline?: ReactNode
  subheadline?: ReactNode
} & ComponentProps<'section'>) {
  const gridRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const currentIndicesRef = useRef<number[]>([0, 1, 2])
  const isAnimatingRef = useRef<boolean[]>(Array(3).fill(false))

  // Get a random testimonial index that's not currently displayed
  const getRandomTestimonialIndex = (excludeIndices: number[]): number => {
    const available = testimonials
      .map((_, i) => i)
      .filter((i) => !excludeIndices.includes(i))
    return available[Math.floor(Math.random() * available.length)]
  }

  useEffect(() => {
    if (!gridRef.current) return

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[]
    
    // Initial animation - staggered fade in
    gsap.set(cards, { opacity: 0, y: 20 })
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
    })

    // Continuous random swap animation
    const swapCard = () => {
      // Pick a random card position to swap
      const cardIndex = Math.floor(Math.random() * 3)
      
      // Skip if this card is already animating
      if (isAnimatingRef.current[cardIndex]) {
        return
      }
      
      const card = cardsRef.current[cardIndex]
      if (!card) return

      isAnimatingRef.current[cardIndex] = true
      
      // Get new testimonial
      const newTestimonialIndex = getRandomTestimonialIndex(currentIndicesRef.current)
      const newTestimonial = testimonials[newTestimonialIndex]

      // Animate out
      gsap.to(card, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          // Update content
          const quoteEl = card.querySelector('blockquote')
          const nameEl = card.querySelector('p.font-semibold')
          const roleEl = card.querySelector('p.text-sm')
          const imgEl = card.querySelector('img')

          if (quoteEl) quoteEl.textContent = newTestimonial.quote
          if (nameEl) nameEl.textContent = newTestimonial.name
          if (roleEl) {
            roleEl.innerHTML = `${newTestimonial.role}, <span class="text-ember">${newTestimonial.company}</span>`
          }
          if (imgEl) imgEl.src = newTestimonial.image

          // Update tracking
          currentIndicesRef.current[cardIndex] = newTestimonialIndex

          // Animate in
          gsap.fromTo(card, 
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              onComplete: () => {
                isAnimatingRef.current[cardIndex] = false
              },
            }
          )
        },
      })
    }

    // Start random swaps with varying intervals
    const intervals: NodeJS.Timeout[] = []
    
    const scheduleSwap = () => {
      const delay = 3000 + Math.random() * 4000 // 3-7 seconds
      const timeout = setTimeout(() => {
        swapCard()
        scheduleSwap()
      }, delay)
      intervals.push(timeout)
    }

    // Start swap timer after initial load
    setTimeout(() => scheduleSwap(), 4000)

    return () => {
      intervals.forEach(clearTimeout)
      gsap.killTweensOf(cards)
    }
  }, [])

  const headlineElement =
    headline && typeof headline === 'string' ? <Subheading>{headline}</Subheading> : headline

  return (
    <section className={className} {...props}>
      <GridBgSection showBottomBorder withPadding>
        <Container className="flex flex-col gap-12 sm:gap-16">
          {/* Header - Left aligned */}
          <div className="flex max-w-xl flex-col gap-4">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {headlineElement}
            {subheadline && <Text className="text-pretty">{subheadline}</Text>}
          </div>

          {/* Testimonials - Single row of 3 */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {[0, 1, 2].map((i) => (
              <TestimonialCard
                key={i}
                testimonial={testimonials[i]}
                onRef={(el) => {
                  cardsRef.current[i] = el
                }}
              />
            ))}
          </div>
        </Container>
      </GridBgSection>
    </section>
  )
}
