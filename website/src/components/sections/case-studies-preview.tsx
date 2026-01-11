'use client'

import { clsx } from 'clsx/lite'
import Image from 'next/image'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { GridBgSection } from '@/components/elements/grid-bg'
import { ImageSkeleton } from '@/components/elements/image-skeleton'
import { Link } from '@/components/elements/link'
import { Screenshot } from '@/components/elements/screenshot'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import type { CaseStudy } from '@/lib/sanity/types'

export interface CaseStudiesPreviewProps {
  id?: string
  eyebrow?: string
  headline: string
  subheadline?: ReactNode
  caseStudies: CaseStudy[]
  viewAllHref: string
  viewAllText?: string
  withGridBg?: boolean
}

export function CaseStudiesPreview({
  id,
  eyebrow = 'Case Studies',
  headline,
  subheadline,
  caseStudies,
  viewAllHref,
  viewAllText = 'View all case studies',
  withGridBg = true,
}: CaseStudiesPreviewProps) {
  // Only show up to 3 case studies
  const displayedCaseStudies = caseStudies.slice(0, 3)

  const content = (
    <Container>
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          {eyebrow && <Eyebrow className="mb-2">{eyebrow}</Eyebrow>}
          <Subheading>{headline}</Subheading>
          {subheadline && <Text className="mt-4">{subheadline}</Text>}
        </div>
        <Link href={viewAllHref} className="hidden shrink-0 items-center gap-2 font-medium text-ember sm:inline-flex">
          {viewAllText} <ArrowNarrowRightIcon className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedCaseStudies.map((cs) => (
          <CaseStudyPreviewCard key={cs.slug.current} caseStudy={cs} />
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Link href={viewAllHref} className="inline-flex items-center gap-2 font-medium text-ember">
          {viewAllText} <ArrowNarrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </Container>
  )

  if (withGridBg) {
    return (
      <GridBgSection id={id} showBottomBorder withPadding>
        {content}
      </GridBgSection>
    )
  }

  return (
    <section id={id} className="py-16 sm:py-24">
      {content}
    </section>
  )
}

function CaseStudyPreviewCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const [heroLoaded, setHeroLoaded] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(false)

  const wallpapers = ['purple', 'blue', 'green', 'brown'] as const
  const wallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)]

  const slug = caseStudy.slug.current
  const logoUrl = caseStudy.clientLogo?.asset?.url
  const heroImageUrl = caseStudy.heroImage?.asset?.url || '/img/screenshots/1-left-1300-top-1300.webp'
  const firstResult = caseStudy.results?.[0]

  return (
    <Link
      href={`/work/${slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-opal bg-frost transition-all duration-300 hover:border-ember/30 hover:shadow-sm dark:border-basalt dark:bg-juniper/50 dark:hover:border-coral/30"
    >
      {/* Screenshot */}
      <div className="relative aspect-16/10 overflow-hidden">
        <Screenshot wallpaper={wallpaper} placement="bottom" className="h-full w-full">
          {/* Skeleton for hero image */}
          {!heroLoaded && <ImageSkeleton />}

          <Image
            src={heroImageUrl}
            alt={`${caseStudy.client} project`}
            className={clsx(
              'bg-white/75 object-cover transition-opacity duration-300 dark:hidden',
              heroLoaded ? 'opacity-100' : 'opacity-0'
            )}
            fill
            onLoad={() => setHeroLoaded(true)}
          />
          <Image
            src="/img/screenshots/1-color-olive-left-1300-top-1300.webp"
            alt={`${caseStudy.client} project`}
            className="bg-black/75 object-cover not-dark:hidden"
            fill
          />
        </Screenshot>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Logo */}
        {logoUrl && (
          <div className="relative mb-3 flex h-8 items-center">
            {/* Skeleton for logo */}
            {!logoLoaded && (
              <div className="h-6 w-20 overflow-hidden rounded">
                <ImageSkeleton className="h-full w-full" />
              </div>
            )}
            <Image
              src={logoUrl}
              alt={caseStudy.client}
              width={100}
              height={32}
              className={clsx(
                'h-6 w-auto object-contain transition-opacity duration-300',
                logoLoaded ? 'opacity-100' : 'absolute opacity-0'
              )}
              onLoad={() => setLogoLoaded(true)}
            />
          </div>
        )}

        {/* Headline */}
        <h3 className="mb-2 line-clamp-2 font-medium text-oxblood transition-colors group-hover:text-ember dark:text-frost dark:group-hover:text-coral">
          {caseStudy.headline || caseStudy.client}
        </h3>

        {/* Key Result */}
        {firstResult && (
          <div className="mt-auto pt-4">
            <span className="font-mono text-lg font-semibold text-ember">{firstResult.metric}</span>
            <span className="ml-2 text-sm text-basalt dark:text-coral/60">{firstResult.label.toLowerCase()}</span>
          </div>
        )}
      </div>
    </Link>
  )
}

// Compact variant for inline use
export function CaseStudiesPreviewCompact({
  caseStudies,
  viewAllHref,
  viewAllText = 'View all',
}: {
  caseStudies: CaseStudy[]
  viewAllHref: string
  viewAllText?: string
}) {
  const displayedCaseStudies = caseStudies.slice(0, 2)

  return (
    <div className="rounded-xl border border-opal bg-frost p-6 dark:border-basalt dark:bg-juniper/50">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-medium text-oxblood dark:text-frost">Featured Work</h3>
        <Link href={viewAllHref} className="text-sm font-medium text-ember">
          {viewAllText} <ArrowNarrowRightIcon className="inline h-3 w-3" />
        </Link>
      </div>

      <div className="space-y-4">
        {displayedCaseStudies.map((cs) => (
          <CompactCaseStudyItem key={cs.slug.current} caseStudy={cs} />
        ))}
      </div>
    </div>
  )
}

function CompactCaseStudyItem({ caseStudy }: { caseStudy: CaseStudy }) {
  const [logoLoaded, setLogoLoaded] = useState(false)
  const slug = caseStudy.slug.current
  const logoUrl = caseStudy.clientLogo?.asset?.url
  const firstResult = caseStudy.results?.[0]

  return (
    <Link href={`/work/${slug}`} className="group flex items-center gap-4">
      {logoUrl && (
        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-opal dark:bg-basalt/50">
          {!logoLoaded && <ImageSkeleton />}
          <Image
            src={logoUrl}
            alt={caseStudy.client}
            width={32}
            height={32}
            className={clsx('h-5 w-auto object-contain transition-opacity duration-300', logoLoaded ? 'opacity-100' : 'opacity-0')}
            onLoad={() => setLogoLoaded(true)}
          />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-oxblood transition-colors group-hover:text-ember dark:text-frost dark:group-hover:text-coral">
          {caseStudy.client}
        </p>
        {firstResult && (
          <p className="truncate text-xs text-basalt dark:text-coral/60">
            {firstResult.metric} {firstResult.label.toLowerCase()}
          </p>
        )}
      </div>
    </Link>
  )
}
