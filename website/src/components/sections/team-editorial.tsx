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
import { Section } from '../elements/section'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
import { CloseIcon } from '../icons/close-icon'

export type TeamEditorialMember = {
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
  featured?: boolean
}

// Featured member - large card with full bio visible
function FeaturedMemberCard({
  member,
  imagePosition = 'left',
}: {
  member: TeamEditorialMember
  imagePosition?: 'left' | 'right'
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    // Subtle entrance animation
    gsap.fromTo(
      card,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
      }
    )
  }, [])

  return (
    <article
      ref={cardRef}
      className={clsx(
        'grid gap-8 lg:gap-12',
        imagePosition === 'left'
          ? 'lg:grid-cols-[minmax(280px,360px)_1fr]'
          : 'lg:grid-cols-[1fr_minmax(280px,360px)]'
      )}
    >
      {/* Image */}
      <div
        className={clsx(
          'relative aspect-3/4 w-full max-w-[360px] overflow-hidden rounded-lg shadow-lg',
          imagePosition === 'right' && 'lg:order-2'
        )}
      >
        <Image
          src={member.image?.asset?.url || '/img/placeholder.webp'}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className={clsx('flex flex-col justify-center', imagePosition === 'right' && 'lg:order-1')}>
        <div className="mb-4">
          <h3 className="text-2xl font-bold tracking-tight text-oxblood lg:text-3xl">{member.name}</h3>
          <p className="mt-1 text-sm font-medium uppercase tracking-wide text-ember">{member.role}</p>
        </div>

        <div className="space-y-4 text-base/7 text-basalt/80 [&>p:first-child]:text-basalt [&>p:first-child]:font-medium">
          {member.bio ? (
            <PortableText value={member.bio} />
          ) : (
            <p className="text-basalt/50 italic">No bio available.</p>
          )}
        </div>
      </div>
    </article>
  )
}

// Grid member card - smaller card with expandable bio
function GridMemberCard({
  member,
  isExpanded,
  onExpand,
  onCollapse,
  size = 'medium',
}: {
  member: TeamEditorialMember
  isExpanded: boolean
  onExpand: () => void
  onCollapse: () => void
  size?: 'small' | 'medium' | 'large'
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

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
    const overlay = overlayRef.current
    if (!overlay) return

    if (isExpanded) {
      gsap.fromTo(
        overlay,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      )
    } else {
      gsap.to(overlay, { opacity: 0, y: 10, duration: 0.2, ease: 'power2.in' })
    }
  }, [isExpanded])

  const sizeClasses = {
    small: 'aspect-square',
    medium: 'aspect-[3/4]',
    large: 'aspect-[4/5]',
  }

  return (
    <div className="relative">
      <button
        type="button"
        ref={cardRef}
        onClick={() => (isExpanded ? onCollapse() : onExpand())}
        className={clsx(
          'group relative w-full overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300',
          'hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/50',
          sizeClasses[size]
        )}
      >
        <Image
          src={member.image?.asset?.url || '/img/placeholder.webp'}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Name/role overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-oxblood/90 via-oxblood/50 to-transparent p-4 pt-16">
          <p className="text-base font-semibold leading-tight text-white">{member.name}</p>
          <p className="mt-1 text-xs text-white/70">{member.role}</p>
        </div>

        {/* Hover hint */}
        <div className="absolute inset-0 flex items-center justify-center bg-oxblood/0 transition-all duration-300 group-hover:bg-oxblood/20">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-oxblood opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100">
            View bio
          </span>
        </div>
      </button>

      {/* Expanded bio overlay */}
      {isExpanded && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={onCollapse} />

          {/* Bio panel */}
          <div
            ref={overlayRef}
            className="fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-white shadow-2xl"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onCollapse}
              className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-white/90 text-basalt/60 shadow-sm transition-all hover:bg-ember hover:text-white"
              aria-label="Close"
            >
              <CloseIcon className="size-4" />
            </button>

            {/* Image */}
            <div className="relative aspect-4/3 w-full">
              <Image
                src={member.image?.asset?.url || '/img/placeholder.webp'}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold tracking-tight text-oxblood">{member.name}</h3>
              <p className="mt-1 text-sm font-medium uppercase tracking-wide text-ember">{member.role}</p>

              <div className="mt-4 max-h-[40vh] space-y-3 overflow-y-auto text-sm/6 text-basalt/80">
                {member.bio ? (
                  <PortableText value={member.bio} />
                ) : (
                  <p className="text-basalt/50 italic">No bio available.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Grid section with varied card sizes
function TeamGrid({ members }: { members: TeamEditorialMember[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleExpand = useCallback((id: string) => {
    setExpandedId(id)
  }, [])

  const handleCollapse = useCallback(() => {
    setExpandedId(null)
  }, [])

  // Create varied size pattern for visual interest
  const getSizeForIndex = (index: number): 'small' | 'medium' | 'large' => {
    const pattern = ['large', 'medium', 'medium', 'small', 'medium', 'large', 'small', 'medium'] as const
    return pattern[index % pattern.length]
  }

  // Disable body scroll when modal is open
  useEffect(() => {
    if (expandedId) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [expandedId])

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
      {members.map((member, index) => (
        <GridMemberCard
          key={member._id}
          member={member}
          size={getSizeForIndex(index)}
          isExpanded={expandedId === member._id}
          onExpand={() => handleExpand(member._id)}
          onCollapse={handleCollapse}
        />
      ))}
    </div>
  )
}

export function TeamEditorial({
  id,
  eyebrow,
  headline,
  subheadline,
  members,
  className,
  ...props
}: {
  id?: string
  eyebrow?: ReactNode
  headline?: ReactNode
  subheadline?: ReactNode
  members: TeamEditorialMember[]
} & ComponentProps<'section'>) {
  // Split members into featured and grid
  const featuredMembers = members.filter((m) => m.featured)
  const gridMembers = members.filter((m) => !m.featured)

  // Don't render if no members
  if (!members || members.length === 0) {
    return null
  }

  return (
    <Section id={id} className={className} {...props}>
      <Container>
        {/* Header */}
        {(eyebrow || headline || subheadline) && (
          <div className="mb-12 flex max-w-2xl flex-col gap-6 lg:mb-16">
            <div className="flex flex-col gap-2">
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {headline && <Subheading>{headline}</Subheading>}
            </div>
            {subheadline && <Text className="text-pretty">{subheadline}</Text>}
          </div>
        )}

        {/* Featured members - large cards with full bios */}
        {featuredMembers.length > 0 && (
          <div className="mb-16 space-y-16 lg:mb-24 lg:space-y-24">
            {featuredMembers.map((member, index) => (
              <FeaturedMemberCard
                key={member._id}
                member={member}
                imagePosition={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        )}

        {/* Grid members - varied sizes with expandable bios */}
        {gridMembers.length > 0 && <TeamGrid members={gridMembers} />}
      </Container>
    </Section>
  )
}
