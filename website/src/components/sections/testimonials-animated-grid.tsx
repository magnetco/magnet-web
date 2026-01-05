'use client'

import { clsx } from 'clsx/lite'
import { gsap } from 'gsap'
import Image from 'next/image'
import { useEffect, useRef, type ComponentProps, type ReactNode } from 'react'
import { Container } from '../elements/container'
import { Eyebrow } from '../elements/eyebrow'
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
  {
    quote: "Before Magnet, our marketing felt scattered. Now every piece works together like a well-oiled machine. Our CAC dropped 62% in the first quarter.",
    name: "Alex Rivera",
    role: "Head of Growth",
    company: "Beacon",
    image: "/img/avatars/11-size-160.webp",
  },
  {
    quote: "Magnet reimagined our entire customer journey. The result? A 340% increase in qualified demo requests and a sales team that actually has time to sell.",
    name: "Michael Torres",
    role: "CRO",
    company: "Pulse",
    image: "/img/avatars/12-size-160.webp",
  },
  {
    quote: "Their approach to content strategy transformed how we think about thought leadership. We went from unknown to industry authority in under a year.",
    name: "Emily Zhang",
    role: "Marketing Lead",
    company: "Clarity",
    image: "/img/avatars/14-size-160.webp",
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
        'group relative flex flex-col justify-between gap-8 overflow-hidden rounded-2xl p-6 sm:p-8',
        'bg-gradient-to-br from-oxblood/[0.03] via-transparent to-ember/[0.02]',
        'border border-oxblood/[0.06] dark:border-white/[0.08]',
        'dark:from-white/[0.03] dark:to-ember/[0.02]',
        'transition-all duration-500 ease-out',
        'hover:border-ember/20 hover:shadow-[0_8px_40px_-12px_rgba(249,67,43,0.15)]',
        'dark:hover:border-ember/30 dark:hover:shadow-[0_8px_40px_-12px_rgba(249,67,43,0.25)]',
        className,
      )}
    >
      {/* Animated gradient orb */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-ember/10 to-transparent opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
      
      {/* Quote */}
      <blockquote className="relative text-sm/7 text-oxblood/90 dark:text-opal/90 sm:text-base/7">
        <span className="absolute -left-1 -top-2 font-serif text-4xl text-ember/30">"</span>
        <p className="pl-4">{testimonial.quote}</p>
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-ember/50 to-ember/20 opacity-0 blur transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative size-12 overflow-hidden rounded-full ring-2 ring-oxblood/10 ring-offset-2 ring-offset-snow dark:ring-white/10 dark:ring-offset-juniper">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <p className="font-semibold text-oxblood dark:text-white">{testimonial.name}</p>
          <p className="text-sm text-oxblood/60 dark:text-opal/60">
            {testimonial.role} at <span className="text-ember">{testimonial.company}</span>
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
  const currentIndicesRef = useRef<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8])
  const isAnimatingRef = useRef<boolean[]>(Array(9).fill(false))

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
    gsap.set(cards, { opacity: 0, y: 30 })
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: {
        each: 0.1,
        from: 'random',
      },
      ease: 'power3.out',
    })

    // Continuous random swap animation
    const swapCard = () => {
      // Pick a random card position to swap
      const cardIndex = Math.floor(Math.random() * 9)
      
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
        scale: 0.95,
        filter: 'blur(4px)',
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          // Update content
          const quoteEl = card.querySelector('blockquote p')
          const nameEl = card.querySelector('p.font-semibold')
          const roleEl = card.querySelector('p.text-sm')
          const imgEl = card.querySelector('img')

          if (quoteEl) quoteEl.textContent = newTestimonial.quote
          if (nameEl) nameEl.textContent = newTestimonial.name
          if (roleEl) {
            roleEl.innerHTML = `${newTestimonial.role} at <span class="text-ember">${newTestimonial.company}</span>`
          }
          if (imgEl) imgEl.src = newTestimonial.image

          // Update tracking
          currentIndicesRef.current[cardIndex] = newTestimonialIndex

          // Animate in
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
              isAnimatingRef.current[cardIndex] = false
            },
          })
        },
      })
    }

    // Start random swaps with varying intervals
    const intervals: NodeJS.Timeout[] = []
    
    const scheduleSwap = () => {
      const delay = 2500 + Math.random() * 3500 // 2.5-6 seconds
      const timeout = setTimeout(() => {
        swapCard()
        scheduleSwap()
      }, delay)
      intervals.push(timeout)
    }

    // Start multiple swap timers for more organic feel
    setTimeout(() => scheduleSwap(), 3000)
    setTimeout(() => scheduleSwap(), 4500)
    setTimeout(() => scheduleSwap(), 6000)

    return () => {
      intervals.forEach(clearTimeout)
      gsap.killTweensOf(cards)
    }
  }, [])

  const headlineElement =
    headline && typeof headline === 'string' ? <Subheading>{headline}</Subheading> : headline

  return (
    <section className={clsx('relative overflow-hidden', className)} {...props}>
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(249,67,43,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_100%_50%,rgba(186,217,220,0.1),transparent)]" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <Container className="py-24 sm:py-32 lg:py-40">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center sm:mb-20 lg:mb-24">
          {eyebrow && (
            <Eyebrow className="mb-4 inline-flex items-center gap-2">
              <span className="inline-block h-px w-8 bg-ember" />
              {eyebrow}
              <span className="inline-block h-px w-8 bg-ember" />
            </Eyebrow>
          )}
          {headlineElement}
          {subheadline && <Text className="mt-6 text-pretty">{subheadline}</Text>}
        </div>

        {/* Testimonials Grid - 3x3 */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8"
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <TestimonialCard
              key={i}
              testimonial={testimonials[i]}
              onRef={(el) => {
                cardsRef.current[i] = el
              }}
            />
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="mx-auto mt-16 flex items-center justify-center gap-3 sm:mt-20">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-ember/30" />
          <div className="size-1.5 rounded-full bg-ember/40" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-ember/30" />
        </div>
      </Container>
    </section>
  )
}

