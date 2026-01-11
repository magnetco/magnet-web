'use client'

import { clsx } from 'clsx/lite'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { ComponentProps } from 'react'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { ImageSkeleton } from '@/components/elements/image-skeleton'
import type { CaseStudy } from '@/lib/sanity/types'

export function CaseStudyCard({
  caseStudy,
  showMetric = true,
  className,
  ...props
}: {
  caseStudy: CaseStudy
  showMetric?: boolean
} & Omit<ComponentProps<typeof Link>, 'href'>) {
  const [logoLoaded, setLogoLoaded] = useState(false)
  const slug = caseStudy.slug.current
  const logoUrl = caseStudy.clientLogo?.asset?.url
  const firstResult = caseStudy.results?.[0]

  return (
    <Link
      href={`/work/${slug}`}
      className={clsx(
        'group rounded-xl border border-opal bg-frost p-6 transition-all duration-300',
        'hover:border-ember/30 hover:shadow-sm',
        'dark:border-basalt dark:bg-juniper/50 dark:hover:border-coral/30',
        className
      )}
      {...props}
    >
      {/* Logo */}
      {logoUrl && (
        <div className="relative mb-4 flex h-10 items-center">
          {/* Skeleton for logo */}
          {!logoLoaded && (
            <div className="h-8 w-24 overflow-hidden rounded">
              <ImageSkeleton className="h-full w-full" />
            </div>
          )}
          <Image
            src={logoUrl}
            alt={caseStudy.client}
            width={120}
            height={48}
            className={clsx(
              'h-8 w-auto object-contain transition-opacity duration-300',
              logoLoaded ? 'opacity-100' : 'absolute opacity-0'
            )}
            onLoad={() => setLogoLoaded(true)}
          />
        </div>
      )}

      {/* Client Name */}
      <h3 className="mb-2 font-medium text-oxblood transition-colors group-hover:text-ember dark:text-frost dark:group-hover:text-coral">
        {caseStudy.client}
      </h3>

      {/* Headline/Description */}
      <p className="line-clamp-2 text-sm text-basalt dark:text-coral/80">
        {caseStudy.headline || caseStudy.description}
      </p>

      {/* Key Metric */}
      {showMetric && firstResult && (
        <div className="mt-3 font-mono text-sm font-medium text-ember">
          {firstResult.metric}{' '}
          <span className="font-sans font-normal text-basalt dark:text-coral/60">
            {firstResult.label.toLowerCase()}
          </span>
        </div>
      )}

      {/* CTA */}
      <div className="mt-4 flex items-center gap-2 text-xs font-medium text-ember">
        View case study <ArrowNarrowRightIcon className="h-3 w-3" />
      </div>
    </Link>
  )
}

export function CaseStudyCardGrid({
  caseStudies,
  columns = 3,
  showMetric = true,
  className,
}: {
  caseStudies: CaseStudy[]
  columns?: 2 | 3 | 4
  showMetric?: boolean
  className?: string
}) {
  return (
    <div
      className={clsx(
        'grid gap-6',
        columns === 2 && 'md:grid-cols-2',
        columns === 3 && 'md:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'md:grid-cols-2 lg:grid-cols-4',
        className
      )}
    >
      {caseStudies.map((cs) => (
        <CaseStudyCard key={cs.slug.current} caseStudy={cs} showMetric={showMetric} />
      ))}
    </div>
  )
}
