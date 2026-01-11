'use client'

import { clsx } from 'clsx/lite'
import type { ReactNode } from 'react'
import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { GridBgSection } from '@/components/elements/grid-bg'
import { Link } from '@/components/elements/link'
import { Subheading } from '@/components/elements/subheading'
import { Text } from '@/components/elements/text'
import { ArrowNarrowRightIcon } from '@/components/icons/arrow-narrow-right-icon'
import { BuildingStorefrontIcon } from '@/components/icons/building-storefront-icon'
import { BookOpenIcon } from '@/components/icons/book-open-icon'
import { HeartPulseIcon } from '@/components/icons/heart-pulse-icon'
import { CogIcon } from '@/components/icons/cog-icon'
import { BriefcaseIcon } from '@/components/icons/briefcase-icon'
import { HeartIcon } from '@/components/icons/heart-icon'
import { TicketIcon } from '@/components/icons/ticket-icon'
import { CameraVideoIcon } from '@/components/icons/camera-video-icon'
import { BanknotesIcon } from '@/components/icons/banknotes-icon'
import { Building2Icon } from '@/components/icons/building-2-icon'

export interface IndustryItem {
  slug: string
  name: string
  icon: ReactNode
}

// Default industries with icons
export const defaultIndustries: IndustryItem[] = [
  { slug: 'ecommerce', name: 'Ecommerce', icon: <BuildingStorefrontIcon className="size-5" /> },
  { slug: 'education-technology', name: 'Education', icon: <BookOpenIcon className="size-5" /> },
  { slug: 'healthcare', name: 'Healthcare', icon: <HeartPulseIcon className="size-5" /> },
  { slug: 'manufacturing', name: 'Manufacturing', icon: <CogIcon className="size-5" /> },
  { slug: 'professional-services', name: 'Professional Services', icon: <BriefcaseIcon className="size-5" /> },
  { slug: 'nonprofits', name: 'Nonprofits', icon: <HeartIcon className="size-5" /> },
  { slug: 'sports-recreation', name: 'Sports', icon: <TicketIcon className="size-5" /> },
  { slug: 'entertainment', name: 'Entertainment', icon: <CameraVideoIcon className="size-5" /> },
  { slug: 'financial-services', name: 'Financial Services', icon: <BanknotesIcon className="size-5" /> },
  { slug: 'hospitality', name: 'Hospitality', icon: <Building2Icon className="size-5" /> },
]

export interface IndustriesGridProps {
  id?: string
  eyebrow?: string
  headline?: ReactNode
  subheadline?: ReactNode
  industries?: IndustryItem[]
  withGridBg?: boolean
  className?: string
}

export function IndustriesGrid({
  id,
  eyebrow = 'Industries We Serve',
  headline = 'Deep expertise across sectors',
  subheadline,
  industries = defaultIndustries,
  withGridBg = true,
  className,
}: IndustriesGridProps) {
  const content = (
    <Container className={clsx('flex flex-col gap-10', className)}>
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          {eyebrow && <Eyebrow className="mb-2">{eyebrow}</Eyebrow>}
          {typeof headline === 'string' ? <Subheading>{headline}</Subheading> : headline}
          {subheadline && <Text className="mt-4">{subheadline}</Text>}
        </div>
        <Link
          href="/industries"
          className="hidden shrink-0 items-center gap-2 font-medium text-ember sm:inline-flex"
        >
          View all industries <ArrowNarrowRightIcon className="h-4 w-4" />
        </Link>
      </div>

      {/* Industry Pills Grid */}
      <div className="flex flex-wrap gap-3">
        {industries.map((industry) => (
          <Link
            key={industry.slug}
            href={`/industries/${industry.slug}`}
            className="group flex items-center gap-2.5 rounded-full border border-opal bg-frost px-4 py-2.5 transition-all duration-200 hover:border-ember/30 hover:bg-ember/5 hover:shadow-sm dark:border-basalt dark:bg-juniper/50 dark:hover:border-coral/30 dark:hover:bg-coral/5"
          >
            <span className="text-basalt transition-colors group-hover:text-ember dark:text-coral/60 dark:group-hover:text-coral">
              {industry.icon}
            </span>
            <span className="text-sm font-medium text-oxblood transition-colors group-hover:text-ember dark:text-frost dark:group-hover:text-coral">
              {industry.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile view all link */}
      <Link
        href="/industries"
        className="inline-flex items-center gap-2 font-medium text-ember sm:hidden"
      >
        View all industries <ArrowNarrowRightIcon className="h-4 w-4" />
      </Link>
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
