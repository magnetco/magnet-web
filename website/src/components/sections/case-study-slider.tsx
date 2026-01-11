'use client'

import { clsx } from 'clsx/lite'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { ComponentProps, ReactNode } from 'react'
import { gsap } from 'gsap'
import { Container } from '../elements/container'
import { Eyebrow } from '../elements/eyebrow'
import { GridBgFrame, sectionPaddingClasses } from '../elements/grid-bg'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
import { PlainButtonLink } from '../elements/button'
import { Link } from '../elements/link'
import { CloseIcon } from '../icons/close-icon'
import { ArrowNarrowRightIcon } from '../icons/arrow-narrow-right-icon'
import { PlusIcon } from '../icons/plus-icon'
import { ChevronLeftIcon } from '../icons/chevron-left-icon'
import { ChevronRightIcon } from '../icons/chevron-right-icon'
import type { CaseStudy } from '@/lib/sanity/types'

// Card dimensions
const CARD_WIDTH = 420
const CARD_HEIGHT = 560
const CARD_GAP = 24
const EXPANDED_WIDTH = 780
const IMAGE_WIDTH_EXPANDED = 320

// =============================================================================
// Skeleton Loading Component
// =============================================================================

function ImageSkeleton() {
  return (
    <div className="absolute inset-0 bg-gray-200">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
    </div>
  )
}

// =============================================================================
// CaseStudySliderCard
// =============================================================================

function CaseStudySliderCard({
  caseStudy,
  isExpanded,
  onExpand,
  onCollapse,
}: {
  caseStudy: CaseStudy
  isExpanded: boolean
  onExpand: () => void
  onCollapse: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
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

  // Animate expansion/collapse
  useEffect(() => {
    const card = cardRef.current
    const content = contentRef.current
    const details = detailsRef.current
    if (!card) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isExpanded) {
      gsap.killTweensOf([card, content])

      gsap.to(card, {
        width: EXPANDED_WIDTH,
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: 'power3.out',
      })

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

      if (details) {
        gsap.fromTo(
          details.children,
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

  const heroImage = caseStudy.heroImage?.asset?.url || '/img/placeholder.webp'
  const websiteUrl = `https://${caseStudy.client.toLowerCase().replace(/\s+/g, '')}.com`
  const slug = caseStudy.slug?.current || ''

  const industryDisplay = caseStudy.industry
    ? caseStudy.industry.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : ''

  return (
    <div
      ref={cardRef}
      className={clsx(
        'group relative shrink-0 overflow-hidden rounded-xl transition-shadow duration-300',
        'bg-white border border-gray-200',
        isExpanded
          ? 'z-20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]'
          : 'shadow-sm hover:shadow-md'
      )}
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
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
            src={heroImage}
            alt={`${caseStudy.client} case study`}
            fill
            className={clsx(
              'object-cover transition-all duration-500',
              isExpanded ? 'scale-100' : 'group-hover:scale-[1.02]',
              imageLoaded ? 'opacity-100' : 'opacity-0'
            )}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Gradient overlay */}
          <div
            className={clsx(
              'absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300',
              isExpanded ? 'opacity-70' : 'opacity-100'
            )}
          />

          {/* Plus button overlay - MOVED TO BOTTOM-RIGHT */}
          <button
            type="button"
            className={clsx(
              'absolute bottom-20 right-4 flex size-10 items-center justify-center rounded-full',
              'bg-white/20 text-white backdrop-blur-sm',
              'transition-all duration-300 hover:bg-white hover:text-gray-900',
              isExpanded && 'pointer-events-none opacity-0'
            )}
            onClick={(e) => {
              e.stopPropagation()
              onExpand()
            }}
            aria-label={`Expand ${caseStudy.client} case study`}
          >
            <PlusIcon className="size-4" />
          </button>

          {/* Content overlay when collapsed */}
          <div
            className={clsx(
              'absolute inset-x-0 bottom-0 p-6 transition-opacity duration-300',
              isExpanded ? 'pointer-events-none opacity-0' : 'opacity-100'
            )}
          >
            {/* Accent line */}
            <div className="mb-3 h-0.5 w-10 bg-amber-500" />

            {/* Client name */}
            <h3 className="mb-2 text-xl font-semibold text-white">{caseStudy.client}</h3>

            {/* Description */}
            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-white/80">
              {caseStudy.description}
            </p>

            {/* Links */}
            <div className="flex flex-col gap-1.5 text-sm">
              <button
                type="button"
                className="flex items-center gap-1 font-medium text-amber-400 transition-colors hover:text-amber-300"
                onClick={(e) => {
                  e.stopPropagation()
                  onExpand()
                }}
              >
                Read case study
              </button>
              <span className="text-xs text-white/50">
                Visit {caseStudy.client.toLowerCase().replace(/\s+/g, '')}.com
              </span>
            </div>
          </div>
        </div>

        {/* Expanded content panel */}
        <div
          ref={contentRef}
          className={clsx(
            'relative flex flex-col overflow-hidden border-l border-gray-100',
            isExpanded ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
          style={{ width: EXPANDED_WIDTH - IMAGE_WIDTH_EXPANDED }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onCollapse()
            }}
            className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all hover:bg-amber-500 hover:text-white"
            aria-label="Close"
          >
            <CloseIcon className="size-4" />
          </button>

          <div ref={detailsRef} className="flex h-full flex-col p-6 pr-14">
            {/* Header */}
            <div className="mb-5">
              <div className="mb-3 h-0.5 w-10 bg-amber-500" />
              <h3 className="text-xl font-bold text-gray-900">{caseStudy.client}</h3>
              {industryDisplay && (
                <p className="mt-1.5 text-xs font-medium uppercase tracking-wide text-amber-600">
                  {industryDisplay}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mb-5 flex-1 overflow-y-auto">
              <p className="text-sm leading-relaxed text-gray-600">
                {caseStudy.headline || caseStudy.description}
              </p>
            </div>

            {/* Results */}
            {caseStudy.results && caseStudy.results.length > 0 && (
              <div className="mb-5 border-t border-gray-100 pt-5">
                <div className="grid grid-cols-2 gap-4">
                  {caseStudy.results.slice(0, 2).map((result, idx) => (
                    <div key={idx}>
                      <div className="font-mono text-xl font-semibold text-gray-900">
                        {result.metric}
                      </div>
                      <div className="text-xs text-gray-500">{result.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            {caseStudy.testimonial?.quote && (
              <div className="mb-5 border-l-2 border-amber-500 pl-4">
                <p className="line-clamp-3 text-sm italic text-gray-600">
                  "{caseStudy.testimonial.quote}"
                </p>
                {caseStudy.testimonial.author && (
                  <p className="mt-2 text-xs font-medium text-gray-900">
                    — {caseStudy.testimonial.author}
                  </p>
                )}
              </div>
            )}

            {/* Footer links */}
            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5">
              <Link
                href={`/work/${slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-amber-600"
                onClick={(e) => e.stopPropagation()}
              >
                Read case study
                <ArrowNarrowRightIcon className="size-4" />
              </Link>
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 transition-colors hover:text-amber-600"
                onClick={(e) => e.stopPropagation()}
              >
                Visit website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// =============================================================================
// Desktop Carousel with Drag, Scrollbar, Keyboard Nav, Infinite Loop
// =============================================================================

function CaseStudyCarouselDesktop({
  caseStudies,
}: {
  caseStudies: CaseStudy[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const scrollbarRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isScrollbarDragging, setIsScrollbarDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const dragStartX = useRef(0)
  const dragStartScroll = useRef(0)
  const scrollbarStartX = useRef(0)
  const velocityRef = useRef(0)
  const lastMoveTime = useRef(0)
  const lastMoveX = useRef(0)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  // Calculate dimensions
  const totalWidth = caseStudies.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP
  const containerWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  const maxScroll = Math.max(0, totalWidth - containerWidth + 200)
  const thumbWidth = Math.max(60, (containerWidth / totalWidth) * 100)

  // Scroll by a certain amount with animation
  const scrollBy = useCallback((delta: number) => {
    const newScroll = scrollPosition + delta
    // Infinite loop wrap-around
    let wrappedScroll = newScroll
    if (newScroll > maxScroll) {
      wrappedScroll = 0
    } else if (newScroll < 0) {
      wrappedScroll = maxScroll
    }
    setScrollPosition(wrappedScroll)
  }, [scrollPosition, maxScroll])

  // Update track position with smooth animation
  useEffect(() => {
    if (trackRef.current) {
      if (animationRef.current) {
        animationRef.current.kill()
      }
      animationRef.current = gsap.to(trackRef.current, {
        x: -scrollPosition,
        duration: isDragging || isScrollbarDragging ? 0 : 0.4,
        ease: 'power3.out',
      })
    }
  }, [scrollPosition, isDragging, isScrollbarDragging])

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (expandedId) return
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollBy(-(CARD_WIDTH + CARD_GAP))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollBy(CARD_WIDTH + CARD_GAP)
    }
  }, [expandedId, scrollBy])

  // Mouse drag handlers for carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    if (expandedId) return
    setIsDragging(true)
    dragStartX.current = e.clientX
    dragStartScroll.current = scrollPosition
    lastMoveX.current = e.clientX
    lastMoveTime.current = Date.now()
    velocityRef.current = 0
    e.preventDefault()
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    
    const now = Date.now()
    const dt = now - lastMoveTime.current
    const dx = e.clientX - lastMoveX.current
    
    if (dt > 0) {
      velocityRef.current = dx / dt * 15 // Scale velocity
    }
    
    lastMoveX.current = e.clientX
    lastMoveTime.current = now
    
    const diff = dragStartX.current - e.clientX
    let newScroll = dragStartScroll.current + diff
    
    // Allow some overscroll for bounce effect
    if (newScroll < -50) newScroll = -50
    if (newScroll > maxScroll + 50) newScroll = maxScroll + 50
    
    setScrollPosition(newScroll)
  }, [isDragging, maxScroll])

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)
    
    // Apply momentum
    const velocity = velocityRef.current
    let targetScroll = scrollPosition - velocity * 10
    
    // Snap back if overscrolled or wrap around
    if (targetScroll < 0) {
      targetScroll = maxScroll // Wrap to end
    } else if (targetScroll > maxScroll) {
      targetScroll = 0 // Wrap to start
    }
    
    // Animate to target with momentum
    if (trackRef.current) {
      gsap.to({ value: scrollPosition }, {
        value: targetScroll,
        duration: 0.8,
        ease: 'power3.out',
        onUpdate: function() {
          setScrollPosition(this.targets()[0].value)
        }
      })
    }
  }, [isDragging, scrollPosition, maxScroll])

  // Scrollbar drag handlers
  const handleScrollbarMouseDown = (e: React.MouseEvent) => {
    setIsScrollbarDragging(true)
    scrollbarStartX.current = e.clientX
    dragStartScroll.current = scrollPosition
    e.preventDefault()
    e.stopPropagation()
  }

  const handleScrollbarMouseMove = useCallback((e: MouseEvent) => {
    if (!isScrollbarDragging || !scrollbarRef.current) return
    const scrollbarWidth = scrollbarRef.current.offsetWidth
    const diff = e.clientX - scrollbarStartX.current
    const scrollRatio = diff / (scrollbarWidth - (thumbWidth / 100 * scrollbarWidth))
    let newScroll = dragStartScroll.current + scrollRatio * maxScroll
    
    // Clamp within bounds during scrollbar drag
    newScroll = Math.max(0, Math.min(maxScroll, newScroll))
    setScrollPosition(newScroll)
  }, [isScrollbarDragging, maxScroll, thumbWidth])

  const handleScrollbarMouseUp = useCallback(() => {
    setIsScrollbarDragging(false)
  }, [])

  // Click on scrollbar track to jump
  const handleScrollbarTrackClick = (e: React.MouseEvent) => {
    if (!scrollbarRef.current || isScrollbarDragging) return
    const rect = scrollbarRef.current.getBoundingClientRect()
    const clickPosition = (e.clientX - rect.left) / rect.width
    const newScroll = Math.max(0, Math.min(maxScroll, clickPosition * maxScroll))
    setScrollPosition(newScroll)
  }

  // Wheel scroll handler with infinite loop
  const handleWheel = useCallback((e: WheelEvent) => {
    if (expandedId) return
    e.preventDefault()
    const delta = e.deltaX || e.deltaY
    let newScroll = scrollPosition + delta
    
    // Infinite loop wrap-around
    if (newScroll > maxScroll) {
      newScroll = 0
    } else if (newScroll < 0) {
      newScroll = maxScroll
    }
    
    setScrollPosition(newScroll)
  }, [scrollPosition, maxScroll, expandedId])

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
      if (!target.closest('[data-case-study-card]')) {
        handleCollapse()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [expandedId, handleCollapse])

  // Calculate thumb position (clamped)
  const clampedScroll = Math.max(0, Math.min(maxScroll, scrollPosition))
  const thumbPosition = maxScroll > 0 ? (clampedScroll / maxScroll) * (100 - thumbWidth) : 0

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main carousel area */}
      <div
        ref={containerRef}
        className={clsx(
          'relative overflow-hidden py-4 outline-none',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
          expandedId && 'cursor-default'
        )}
        onMouseDown={handleMouseDown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Case studies carousel. Use left and right arrow keys to navigate."
      >
        {/* Gradient masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-white to-transparent" />

        {/* Carousel track */}
        <div
          ref={trackRef}
          className="flex pl-8"
          style={{ gap: CARD_GAP }}
        >
          {caseStudies.map((caseStudy, index) => (
            <div
              key={`${caseStudy.slug?.current || caseStudy._id}-${index}`}
              data-case-study-card
              onClick={(e) => {
                if (!isDragging && !expandedId) {
                  e.stopPropagation()
                }
              }}
            >
              <CaseStudySliderCard
                caseStudy={caseStudy}
                isExpanded={expandedId === `${caseStudy._id}-${index}`}
                onExpand={() => handleExpand(`${caseStudy._id}-${index}`)}
                onCollapse={handleCollapse}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Minimal Scrollbar */}
      <Container className="mt-6">
        <div 
          className={clsx(
            'transition-opacity duration-300',
            isHovered || isDragging || isScrollbarDragging ? 'opacity-100' : 'opacity-40'
          )}
        >
          {/* Progress bar - thinner and more minimal */}
          <div
            ref={scrollbarRef}
            className="relative h-0.5 cursor-pointer rounded-full bg-gray-200"
            onClick={handleScrollbarTrackClick}
          >
            {/* Thumb - pill shaped */}
            <div
              ref={thumbRef}
              className={clsx(
                'absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full transition-all duration-150',
                isScrollbarDragging 
                  ? 'h-2 bg-amber-500 cursor-grabbing' 
                  : 'bg-gray-400 hover:bg-gray-500 hover:h-2 cursor-grab'
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

// =============================================================================
// Mobile Carousel with Touch Drag
// =============================================================================

function CaseStudyCarouselMobile({
  caseStudies,
}: {
  caseStudies: CaseStudy[]
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  
  const touchStartX = useRef(0)
  const touchStartTime = useRef(0)
  const lastTouchX = useRef(0)
  const velocityRef = useRef(0)

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1))
    setExpandedId(null)
  }, [caseStudies.length])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1))
    setExpandedId(null)
  }, [caseStudies.length])

  // Touch drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (expandedId) return
    setIsDragging(true)
    touchStartX.current = e.targetTouches[0].clientX
    lastTouchX.current = e.targetTouches[0].clientX
    touchStartTime.current = Date.now()
    velocityRef.current = 0
    setDragOffset(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || expandedId) return
    
    const currentX = e.targetTouches[0].clientX
    const now = Date.now()
    const dt = now - touchStartTime.current
    
    if (dt > 0) {
      velocityRef.current = (currentX - lastTouchX.current) / dt * 10
    }
    
    lastTouchX.current = currentX
    touchStartTime.current = now
    
    const diff = currentX - touchStartX.current
    setDragOffset(diff)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    const threshold = 50
    const velocity = velocityRef.current
    
    // Determine direction based on drag offset and velocity
    if (dragOffset < -threshold || velocity < -2) {
      goToNext()
    } else if (dragOffset > threshold || velocity > 2) {
      goToPrevious()
    }
    
    // Animate back to center
    setDragOffset(0)
  }

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (expandedId) return
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goToPrevious()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      goToNext()
    }
  }, [expandedId, goToPrevious, goToNext])

  const currentCaseStudy = caseStudies[currentIndex]

  return (
    <div 
      className="relative px-4 py-8 outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Case studies carousel. Use left and right arrow keys to navigate."
    >
      {/* Navigation arrows */}
      <button
        type="button"
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-gray-50 active:scale-95"
        aria-label="Previous case study"
      >
        <ChevronLeftIcon className="size-5 text-gray-700" />
      </button>

      <button
        type="button"
        onClick={goToNext}
        className="absolute right-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-gray-50 active:scale-95"
        aria-label="Next case study"
      >
        <ChevronRightIcon className="size-5 text-gray-700" />
      </button>

      {/* Card container with touch drag */}
      <div
        ref={trackRef}
        className={clsx(
          'mx-auto max-w-sm transition-transform',
          isDragging ? 'duration-0' : 'duration-300 ease-out'
        )}
        style={{
          transform: `translateX(${dragOffset}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <CaseStudySliderCard
          caseStudy={currentCaseStudy}
          isExpanded={expandedId === currentCaseStudy._id}
          onExpand={() => setExpandedId(currentCaseStudy._id)}
          onCollapse={() => setExpandedId(null)}
        />
      </div>

      {/* Pagination dots */}
      <div className="mt-6 flex justify-center gap-2">
        {caseStudies.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              setCurrentIndex(index)
              setExpandedId(null)
            }}
            className={clsx(
              'h-1.5 rounded-full transition-all',
              index === currentIndex ? 'w-6 bg-amber-500' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
            )}
            aria-label={`Go to case study ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// CaseStudySliderSection
// =============================================================================

export function CaseStudySliderSection({
  eyebrow = 'Case Studies',
  headline,
  subheadline,
  caseStudies,
  ctaHref = '/work',
  ctaLabel = 'View all work',
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline?: ReactNode
  subheadline?: ReactNode
  caseStudies: CaseStudy[]
  ctaHref?: string
  ctaLabel?: string
} & ComponentProps<'section'>) {
  if (!caseStudies || caseStudies.length === 0) {
    return null
  }

  return (
    <div className="bg-white">
      <GridBgFrame showBottomBorder showSideBorders={false}>
        <section className={clsx(sectionPaddingClasses, 'overflow-hidden', className)} {...props}>
          {/* Header */}
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

          {/* Desktop carousel */}
          <div className="hidden md:block">
            <CaseStudyCarouselDesktop caseStudies={caseStudies} />
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden">
            <CaseStudyCarouselMobile caseStudies={caseStudies} />
          </div>
        </section>
      </GridBgFrame>
    </div>
  )
}
