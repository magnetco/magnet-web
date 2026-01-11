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
import { ImageSkeleton } from '../elements/image-skeleton'

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
const CARD_WIDTH = 240
const CARD_HEIGHT = 380
const CARD_GAP = 16
const EXPANDED_WIDTH = 560
const IMAGE_WIDTH_EXPANDED = 200

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
  const [imageLoaded, setImageLoaded] = useState(false)

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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isExpanded) {
      gsap.killTweensOf([card, content])

      // Smooth horizontal expansion
      gsap.to(card, {
        width: EXPANDED_WIDTH,
        duration: prefersReducedMotion ? 0 : 0.5,
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
            duration: prefersReducedMotion ? 0 : 0.4,
            delay: prefersReducedMotion ? 0 : 0.15,
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
            duration: prefersReducedMotion ? 0 : 0.3,
            stagger: prefersReducedMotion ? 0 : 0.05,
            delay: prefersReducedMotion ? 0 : 0.25,
            ease: 'power2.out',
          }
        )
      }
    } else {
      // Collapse animation
      gsap.to(card, {
        width: CARD_WIDTH,
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: 'power3.inOut',
      })
      if (content) {
        gsap.to(content, {
          opacity: 0,
          x: 10,
          duration: prefersReducedMotion ? 0 : 0.2,
          ease: 'power2.in',
        })
      }
    }
  }, [isExpanded])

  return (
    <div
      ref={cardRef}
      className={clsx(
        'group relative shrink-0 cursor-pointer overflow-hidden rounded-lg transition-all duration-300',
        isExpanded
          ? 'z-20 bg-white shadow-[0_20px_50px_-12px_rgba(34,0,2,0.25)]'
          : 'bg-white shadow-sm hover:shadow-md'
      )}
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      onClick={(e) => {
        e.stopPropagation()
        if (!isExpanded) onExpand()
      }}
      role="article"
      aria-expanded={isExpanded}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          if (!isExpanded) onExpand()
        }
      }}
    >
      <div className="flex h-full flex-row">
        {/* Image container */}
        <div
          className="relative shrink-0 overflow-hidden transition-all duration-500"
          style={{
            height: CARD_HEIGHT,
            width: isExpanded ? IMAGE_WIDTH_EXPANDED : CARD_WIDTH,
          }}
        >
          {/* Skeleton loader */}
          {!imageLoaded && <ImageSkeleton />}

          <Image
            src={member.image?.asset?.url || '/img/placeholder.webp'}
            alt={member.name}
            fill
            className={clsx(
              'object-cover transition-all duration-500',
              isExpanded ? 'scale-100' : 'group-hover:scale-[1.03]',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Subtle overlay when expanded */}
          <div
            className={clsx(
              'absolute inset-0 bg-linear-to-r from-transparent to-white/10 transition-opacity duration-300',
              isExpanded ? 'opacity-100' : 'opacity-0'
            )}
          />

          {/* Name/role overlay when collapsed */}
          <div
            className={clsx(
              'absolute inset-x-0 bottom-0 bg-linear-to-t from-oxblood/90 via-oxblood/50 to-transparent p-4 pt-20 transition-opacity duration-300',
              isExpanded ? 'pointer-events-none opacity-0' : 'opacity-100'
            )}
          >
            <p className="text-base font-semibold leading-tight text-white">{member.name}</p>
            <p className="mt-1 text-xs text-white/60">{member.role}</p>
          </div>

          {/* Click hint on hover when collapsed */}
          <div
            className={clsx(
              'absolute inset-0 flex items-center justify-center bg-oxblood/0 transition-all duration-300',
              isExpanded ? 'opacity-0' : 'group-hover:bg-oxblood/20'
            )}
          >
            <span
              className={clsx(
                'rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-oxblood opacity-0 shadow-lg transition-all duration-300',
                !isExpanded && 'group-hover:opacity-100'
              )}
            >
              View bio
            </span>
          </div>
        </div>

        {/* Expanded content panel */}
        <div
          ref={contentRef}
          className={clsx(
            'relative flex flex-col overflow-hidden border-l border-opal/50',
            isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
          style={{ width: EXPANDED_WIDTH - IMAGE_WIDTH_EXPANDED }}
        >
          {/* Close button - top right corner */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onCollapse()
            }}
            className="absolute right-3 top-3 z-10 flex size-6 items-center justify-center rounded-full bg-opal/60 text-basalt/50 transition-all hover:bg-ember hover:text-white"
            aria-label="Close"
          >
            <CloseIcon className="size-3" />
          </button>

          <div className="flex h-full flex-col p-5 pr-4">
            {/* Header */}
            <div className="mb-4 pr-6">
              <div className="mb-1.5 flex items-center gap-2">
                <div className="h-px flex-1 bg-linear-to-r from-ember/40 to-transparent" />
              </div>
              <h3 className="text-lg font-bold leading-snug tracking-tight text-oxblood">{member.name}</h3>
              <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-ember/80">{member.role}</p>
            </div>

            {/* Bio */}
            <div
              ref={bioRef}
              className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-opal/60"
            >
              <div className="space-y-3 text-[13px]/[1.7] text-basalt/65 [&>p:first-child]:font-medium [&>p:first-child]:text-basalt/80">
                {member.bio ? (
                  <PortableText value={member.bio} />
                ) : (
                  <p className="italic text-basalt/40">No bio available.</p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between border-t border-opal/40 pt-3">
              <Link
                href={`/team/${member.slug?.current || ''}`}
                className="group/link inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-oxblood transition-colors hover:text-ember"
                onClick={(e) => e.stopPropagation()}
              >
                Full profile
                <ArrowNarrowRightIcon className="size-3 transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TeamCarousel({ members }: { members: TeamCarouselMember[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollbarRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  const [isPaused, setIsPaused] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isScrollbarDragging, setIsScrollbarDragging] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const dragStartX = useRef(0)
  const dragStartScroll = useRef(0)
  const scrollbarStartX = useRef(0)
  const velocityRef = useRef(0)
  const lastMoveTime = useRef(0)
  const lastMoveX = useRef(0)

  // Calculate dimensions
  const totalWidth = members.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP
  const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  const maxScroll = Math.max(0, totalWidth - containerWidth + 200)
  const thumbWidth = Math.max(60, (containerWidth / totalWidth) * 100)

  // Scroll by a certain amount
  const scrollBy = useCallback(
    (delta: number) => {
      let newScroll = scrollPosition + delta
      // Wrap around
      if (newScroll > maxScroll) newScroll = 0
      else if (newScroll < 0) newScroll = maxScroll
      setScrollPosition(newScroll)
    },
    [scrollPosition, maxScroll]
  )

  // Update track position
  useEffect(() => {
    if (trackRef.current && !animationRef.current?.isActive()) {
      gsap.to(trackRef.current, {
        x: -scrollPosition,
        duration: isDragging || isScrollbarDragging ? 0 : 0.4,
        ease: 'power3.out',
      })
    }
  }, [scrollPosition, isDragging, isScrollbarDragging])

  // Auto-scroll animation (only when not dragging or paused)
  useEffect(() => {
    const track = trackRef.current
    if (!track || members.length === 0 || isDragging || expandedId || isPaused) {
      animationRef.current?.pause()
      return
    }

    // Resume or create auto-scroll
    if (animationRef.current) {
      animationRef.current.resume()
    } else {
      animationRef.current = gsap.to(
        { value: 0 },
        {
          value: maxScroll,
          duration: members.length * 8,
          ease: 'none',
          repeat: -1,
          onUpdate: function () {
            if (!isDragging && !isScrollbarDragging) {
              setScrollPosition(this.targets()[0].value % maxScroll)
            }
          },
        }
      )
    }

    return () => {
      animationRef.current?.pause()
    }
  }, [members.length, maxScroll, isDragging, expandedId, isPaused, isScrollbarDragging])

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (expandedId) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        scrollBy(-(CARD_WIDTH + CARD_GAP))
        setIsPaused(true)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        scrollBy(CARD_WIDTH + CARD_GAP)
        setIsPaused(true)
      }
    },
    [expandedId, scrollBy]
  )

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (expandedId) return
    setIsDragging(true)
    setIsPaused(true)
    dragStartX.current = e.clientX
    dragStartScroll.current = scrollPosition
    lastMoveX.current = e.clientX
    lastMoveTime.current = Date.now()
    velocityRef.current = 0
    animationRef.current?.pause()
    e.preventDefault()
  }

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return

      const now = Date.now()
      const dt = now - lastMoveTime.current
      const dx = e.clientX - lastMoveX.current

      if (dt > 0) {
        velocityRef.current = (dx / dt) * 15
      }

      lastMoveX.current = e.clientX
      lastMoveTime.current = now

      const diff = dragStartX.current - e.clientX
      let newScroll = dragStartScroll.current + diff
      if (newScroll < -50) newScroll = -50
      if (newScroll > maxScroll + 50) newScroll = maxScroll + 50
      setScrollPosition(newScroll)
    },
    [isDragging, maxScroll]
  )

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)

    // Apply momentum
    const velocity = velocityRef.current
    let targetScroll = scrollPosition - velocity * 10
    if (targetScroll < 0) targetScroll = maxScroll
    else if (targetScroll > maxScroll) targetScroll = 0

    gsap.to(
      { value: scrollPosition },
      {
        value: targetScroll,
        duration: 0.8,
        ease: 'power3.out',
        onUpdate: function () {
          setScrollPosition(this.targets()[0].value)
        },
        onComplete: () => {
          // Resume auto-scroll after a delay
          setTimeout(() => setIsPaused(false), 2000)
        },
      }
    )
  }, [isDragging, scrollPosition, maxScroll])

  // Scrollbar handlers
  const handleScrollbarMouseDown = (e: React.MouseEvent) => {
    setIsScrollbarDragging(true)
    setIsPaused(true)
    scrollbarStartX.current = e.clientX
    dragStartScroll.current = scrollPosition
    animationRef.current?.pause()
    e.preventDefault()
    e.stopPropagation()
  }

  const handleScrollbarMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isScrollbarDragging || !scrollbarRef.current) return
      const scrollbarWidth = scrollbarRef.current.offsetWidth
      const diff = e.clientX - scrollbarStartX.current
      const scrollRatio = diff / (scrollbarWidth - (thumbWidth / 100) * scrollbarWidth)
      let newScroll = dragStartScroll.current + scrollRatio * maxScroll
      newScroll = Math.max(0, Math.min(maxScroll, newScroll))
      setScrollPosition(newScroll)
    },
    [isScrollbarDragging, maxScroll, thumbWidth]
  )

  const handleScrollbarMouseUp = useCallback(() => {
    setIsScrollbarDragging(false)
    setTimeout(() => setIsPaused(false), 2000)
  }, [])

  const handleScrollbarTrackClick = (e: React.MouseEvent) => {
    if (!scrollbarRef.current || isScrollbarDragging) return
    const rect = scrollbarRef.current.getBoundingClientRect()
    const clickPosition = (e.clientX - rect.left) / rect.width
    const newScroll = Math.max(0, Math.min(maxScroll, clickPosition * maxScroll))
    setScrollPosition(newScroll)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 2000)
  }

  // Wheel handler
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (expandedId) return
      e.preventDefault()
      const delta = e.deltaX || e.deltaY
      let newScroll = scrollPosition + delta
      if (newScroll > maxScroll) newScroll = 0
      else if (newScroll < 0) newScroll = maxScroll
      setScrollPosition(newScroll)
      setIsPaused(true)
    },
    [scrollPosition, maxScroll, expandedId]
  )

  // Event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  useEffect(() => {
    if (isScrollbarDragging) {
      document.addEventListener('mousemove', handleScrollbarMouseMove)
      document.addEventListener('mouseup', handleScrollbarMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleScrollbarMouseMove)
        document.removeEventListener('mouseup', handleScrollbarMouseUp)
      }
    }
  }, [isScrollbarDragging, handleScrollbarMouseMove, handleScrollbarMouseUp])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

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

  // Calculate thumb position
  const clampedScroll = Math.max(0, Math.min(maxScroll, scrollPosition))
  const thumbPosition = maxScroll > 0 ? (clampedScroll / maxScroll) * (100 - thumbWidth) : 0

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        if (!isDragging && !isScrollbarDragging) setIsPaused(false)
      }}
    >
      {/* Main carousel area */}
      <div
        ref={containerRef}
        className={clsx(
          'relative overflow-hidden py-8 outline-none',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
          expandedId && 'cursor-default'
        )}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Team members carousel. Use left and right arrow keys to navigate."
      >
        {/* Gradient masks for smooth fade at edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-linear-to-r from-snow to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-linear-to-l from-snow to-transparent" />

        {/* Carousel track */}
        <div ref={trackRef} className="flex" style={{ gap: CARD_GAP }}>
          {members.map((member, index) => (
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

      {/* Minimal Scrollbar */}
      <Container className="mt-4">
        <div
          className={clsx(
            'transition-opacity duration-300',
            isHovered || isDragging || isScrollbarDragging ? 'opacity-100' : 'opacity-30'
          )}
        >
          <div
            ref={scrollbarRef}
            className="relative h-0.5 cursor-pointer rounded-full bg-opal/40"
            onClick={handleScrollbarTrackClick}
          >
            <div
              ref={thumbRef}
              className={clsx(
                'absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full transition-all duration-150',
                isScrollbarDragging
                  ? 'h-2 cursor-grabbing bg-ember'
                  : 'cursor-grab bg-basalt/40 hover:h-2 hover:bg-basalt/60'
              )}
              style={{
                width: `${thumbWidth}%`,
                left: `${thumbPosition}%`,
              }}
              onMouseDown={handleScrollbarMouseDown}
            />
          </div>
        </div>
      </Container>
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
