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
import { GridBgFrame, sectionPaddingClasses } from '../elements/grid-bg'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
import { PlainButtonLink } from '../elements/button'
import { Link } from '../elements/link'
import { CloseIcon } from '../icons/close-icon'
import { ArrowNarrowRightIcon } from '../icons/arrow-narrow-right-icon'

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

// Card dimensions - fixed height for smooth horizontal-only expansion
const CARD_WIDTH = 260
const CARD_HEIGHT = 420
const CARD_GAP = 20
const EXPANDED_WIDTH = 640
const IMAGE_WIDTH_EXPANDED = 240

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

  // Animate expansion/collapse - horizontal only
  useEffect(() => {
    const card = cardRef.current
    const content = contentRef.current
    const bio = bioRef.current
    if (!card) return

    if (isExpanded) {
      gsap.killTweensOf([card, content])
      
      // Smooth horizontal expansion
      gsap.to(card, {
        width: EXPANDED_WIDTH,
        duration: 0.5,
        ease: 'power3.out',
      })
      
      // Content fades in
      if (content) {
        gsap.fromTo(
          content,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            delay: 0.15,
            ease: 'power2.out',
          }
        )
      }
      
      // Bio content stagger
      if (bio) {
        gsap.fromTo(
          bio.children,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.05,
            delay: 0.25,
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
      if (content) {
        gsap.to(content, {
          opacity: 0,
          x: 10,
          duration: 0.2,
          ease: 'power2.in',
        })
      }
    }
  }, [isExpanded])

  return (
    <div
      ref={cardRef}
      className={clsx(
        'group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-xl transition-shadow duration-300',
        isExpanded
          ? 'z-20 bg-white shadow-2xl shadow-oxblood/15 ring-1 ring-oxblood/10'
          : 'bg-white shadow-md shadow-oxblood/5 hover:shadow-lg hover:shadow-oxblood/10'
      )}
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      onClick={(e) => {
        e.stopPropagation()
        if (!isExpanded) onExpand()
      }}
    >
      {/* Ember accent bar - elegant highlight when expanded */}
      <div 
        className={clsx(
          'absolute left-0 top-0 bottom-0 w-1 bg-ember transition-opacity duration-300',
          isExpanded ? 'opacity-100' : 'opacity-0'
        )} 
      />
      
      <div className="flex h-full flex-row">
        {/* Image container - fixed size */}
        <div
          className={clsx(
            'relative flex-shrink-0 overflow-hidden transition-all duration-500',
            isExpanded ? 'w-[240px]' : 'w-full'
          )}
          style={{ height: CARD_HEIGHT }}
        >
          <Image
            src={member.image?.asset?.url || '/img/placeholder.webp'}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          
          {/* Name/role overlay when collapsed */}
          <div 
            className={clsx(
              'absolute inset-x-0 bottom-0 bg-gradient-to-t from-oxblood/80 via-oxblood/40 to-transparent p-5 pt-16 transition-opacity duration-300',
              isExpanded ? 'opacity-0' : 'opacity-100'
            )}
          >
            <p className="text-lg font-semibold text-white">
              {member.name}
            </p>
            <p className="mt-0.5 text-sm text-white/70">{member.role}</p>
          </div>
        </div>

        {/* Expanded content panel */}
        <div
          ref={contentRef}
          className={clsx(
            'flex flex-col overflow-hidden',
            isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
          )}
          style={{ width: EXPANDED_WIDTH - IMAGE_WIDTH_EXPANDED }}
        >
          <div className="flex h-full flex-col p-5">
            {/* Header with close button */}
            <div className="mb-3 flex items-start justify-between">
              <div>
                <p className="text-[11px] font-semibold tracking-wider text-ember uppercase">
                  {member.role}
                </p>
                <h3 className="mt-1 text-xl font-bold tracking-tight text-oxblood">
                  {member.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onCollapse()
                }}
                className="flex size-7 items-center justify-center rounded-full text-basalt/40 transition-colors hover:bg-opal hover:text-oxblood"
                aria-label="Close"
              >
                <CloseIcon className="size-3.5" />
              </button>
            </div>
            
            {/* Divider */}
            <div className="mb-4 h-px w-10 bg-ember/30" />

            {/* Bio */}
            <div
              ref={bioRef}
              className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-opal"
            >
              <div className="space-y-2.5 text-[13px]/[1.65] text-basalt/70">
                {member.bio ? (
                  <PortableText value={member.bio} />
                ) : (
                  <p className="text-basalt/40 italic">No bio available.</p>
                )}
              </div>
            </div>
            
            {/* Footer link */}
            <div className="mt-4 pt-3 border-t border-opal">
              <Link 
                href={`/team/${member.slug?.current || ''}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                Full profile
                <ArrowNarrowRightIcon className="size-3" />
              </Link>
            </div>
          </div>
        </div>
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

    // Create infinite scroll animation - slower pace (8 seconds per card)
    animationRef.current = gsap.to(track, {
      x: -singleSetWidth,
      duration: members.length * 8,
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
      className="relative overflow-hidden py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient masks for smooth fade at edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-snow to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-snow to-transparent" />

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
  ctaHref = '/team',
  ctaLabel = 'Meet the full team',
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline?: ReactNode
  subheadline?: ReactNode
  members: TeamCarouselMember[]
  ctaHref?: string
  ctaLabel?: string
} & ComponentProps<'section'>) {
  // Don't render section if no team members
  if (!members || members.length === 0) {
    return null
  }

  return (
    <GridBgFrame showBottomBorder showSideBorders={false}>
      <section className={clsx(sectionPaddingClasses, 'overflow-hidden', className)} {...props}>
        {/* Header - matching standard Section structure */}
        <Container className="mb-10 sm:mb-16">
          <div className="flex max-w-2xl flex-col gap-6">
            <div className="flex flex-col gap-2">
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {headline && <Subheading>{headline}</Subheading>}
            </div>
            {subheadline && <Text className="text-pretty">{subheadline}</Text>}
            {ctaHref && (
              <div className="mt-2">
                <PlainButtonLink href={ctaHref}>
                  {ctaLabel}
                  <ArrowNarrowRightIcon className="size-4" />
                </PlainButtonLink>
              </div>
            )}
          </div>
        </Container>

        {/* Full-width carousel */}
        <TeamCarousel members={members} />
      </section>
    </GridBgFrame>
  )
}

