'use client'

import { clsx } from 'clsx/lite'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { gsap } from 'gsap'
import { PortableText } from 'next-sanity'
import type { PortableTextBlock } from 'next-sanity'
import { Container } from '../elements/container'
import { Eyebrow } from '../elements/eyebrow'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
import { CloseIcon } from '../icons/close-icon'

export type TeamCarouselMember = {
  _id: string
  name: string
  slug: { current: string }
  role: string
  image: {
    asset: {
      _id: string
      url: string
    }
  }
  bio?: PortableTextBlock[]
}

// Card width constants
const CARD_WIDTH = 280
const CARD_GAP = 24
const EXPANDED_WIDTH = 640

function TeamCarouselCard({
  member,
  isExpanded,
  onExpand,
  onCollapse,
}: {
  member: TeamCarouselMember
  isExpanded: boolean
  onExpand: () => void
  onCollapse: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)

  // Handle escape key to close
  useEffect(() => {
    if (!isExpanded) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCollapse()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isExpanded, onCollapse])

  // Animate expansion/collapse
  useEffect(() => {
    const card = cardRef.current
    const content = contentRef.current
    const bio = bioRef.current
    if (!card || !content) return

    if (isExpanded) {
      // Expand animation
      gsap.to(card, {
        width: EXPANDED_WIDTH,
        duration: 0.5,
        ease: 'power3.out',
      })
      gsap.to(content, {
        opacity: 1,
        duration: 0.3,
        delay: 0.2,
        ease: 'power2.out',
      })
      if (bio) {
        gsap.fromTo(
          bio.children,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.08,
            delay: 0.3,
            ease: 'power2.out',
          }
        )
      }
    } else {
      // Collapse animation
      gsap.to(card, {
        width: CARD_WIDTH,
        duration: 0.4,
        ease: 'power3.inOut',
      })
      gsap.to(content, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      })
    }
  }, [isExpanded])

  return (
    <div
      ref={cardRef}
      className={clsx(
        'group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-lg transition-shadow duration-300',
        isExpanded
          ? 'z-20 bg-basalt/80 shadow-2xl ring-1 ring-white/10'
          : 'hover:shadow-xl'
      )}
      style={{ width: CARD_WIDTH }}
      onClick={(e) => {
        e.stopPropagation()
        if (!isExpanded) onExpand()
      }}
    >
      <div className={clsx('flex h-full', isExpanded ? 'flex-row' : 'flex-col')}>
        {/* Image container */}
        <div
          className={clsx(
            'relative overflow-hidden',
            isExpanded
              ? 'h-[360px] w-[240px] flex-shrink-0'
              : 'aspect-[3/4] w-full'
          )}
        >
          <Image
            src={member.image?.asset?.url || '/img/placeholder.webp'}
            alt={member.name}
            fill
            className={clsx(
              'object-cover transition-transform duration-500',
              !isExpanded && 'group-hover:scale-105'
            )}
          />
          {/* Gradient overlay on hover (collapsed state) */}
          {!isExpanded && (
            <div className="absolute inset-0 bg-gradient-to-t from-juniper/90 via-juniper/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
          )}
        </div>

        {/* Info overlay (collapsed state) */}
        {!isExpanded && (
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="text-lg font-semibold text-frost transition-colors duration-200 group-hover:text-ember">
              {member.name}
            </p>
            <p className="mt-1 text-sm text-frost/70">{member.role}</p>
          </div>
        )}

        {/* Expanded content */}
        {isExpanded && (
          <div
            ref={contentRef}
            className="flex flex-1 flex-col p-6 opacity-0"
            style={{ width: EXPANDED_WIDTH - 240 }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onCollapse()
              }}
              className="absolute top-3 right-3 z-10 rounded-full p-2 text-frost/60 transition-colors hover:bg-white/10 hover:text-frost"
              aria-label="Close"
            >
              <CloseIcon className="size-5" />
            </button>

            {/* Name and role */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-ember">{member.name}</h3>
              <p className="mt-1 text-sm text-frost/70">{member.role}</p>
            </div>

            {/* Bio */}
            <div
              ref={bioRef}
              className="flex-1 space-y-3 overflow-y-auto text-sm/6 text-frost/90 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20"
            >
              {member.bio ? (
                <PortableText value={member.bio} />
              ) : (
                <p className="text-frost/60 italic">No bio available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function TeamCarousel({
  members,
}: {
  members: TeamCarouselMember[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  // Duplicate members for seamless loop (need at least 2x for smooth looping)
  const duplicatedMembers = [...members, ...members]

  // Calculate total width of one set
  const singleSetWidth = members.length * (CARD_WIDTH + CARD_GAP)

  // Setup auto-scroll animation
  useEffect(() => {
    const track = trackRef.current
    if (!track || members.length === 0) return

    // Set initial position
    gsap.set(track, { x: 0 })

    // Create infinite scroll animation
    animationRef.current = gsap.to(track, {
      x: -singleSetWidth,
      duration: members.length * 4, // 4 seconds per card
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => {
          // When we've scrolled past one full set, reset to beginning
          return parseFloat(x) % singleSetWidth
        }),
      },
    })

    return () => {
      animationRef.current?.kill()
    }
  }, [members.length, singleSetWidth])

  // Handle pause/resume
  useEffect(() => {
    if (!animationRef.current) return

    if (isPaused || expandedId) {
      animationRef.current.pause()
    } else {
      animationRef.current.resume()
    }
  }, [isPaused, expandedId])

  const handleExpand = useCallback((id: string) => {
    setExpandedId(id)
  }, [])

  const handleCollapse = useCallback(() => {
    setExpandedId(null)
  }, [])

  // Close expanded card when clicking outside
  useEffect(() => {
    if (!expandedId) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('[data-carousel-card]')) {
        handleCollapse()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [expandedId, handleCollapse])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient masks for smooth fade at edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-juniper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-juniper to-transparent" />

      {/* Carousel track */}
      <div
        ref={trackRef}
        className="flex"
        style={{ gap: CARD_GAP }}
      >
        {duplicatedMembers.map((member, index) => (
          <div key={`${member._id}-${index}`} data-carousel-card>
            <TeamCarouselCard
              member={member}
              isExpanded={expandedId === `${member._id}-${index}`}
              onExpand={() => handleExpand(`${member._id}-${index}`)}
              onCollapse={handleCollapse}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export function TeamCarouselSection({
  eyebrow = 'Team',
  headline,
  subheadline,
  members,
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline?: ReactNode
  subheadline?: ReactNode
  members: TeamCarouselMember[]
} & ComponentProps<'section'>) {
  // Don't render section if no team members
  if (!members || members.length === 0) {
    return null
  }

  return (
    <section className={clsx('bg-juniper py-20', className)} {...props}>
      {/* Header */}
      <Container className="mb-12">
        <div className="flex max-w-2xl flex-col gap-6">
          <div className="flex flex-col gap-2">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {headline && (
              <Subheading className="text-frost">{headline}</Subheading>
            )}
          </div>
          {subheadline && (
            <Text className="text-frost/80">{subheadline}</Text>
          )}
        </div>
      </Container>

      {/* Full-width carousel */}
      <TeamCarousel members={members} />
    </section>
  )
}

