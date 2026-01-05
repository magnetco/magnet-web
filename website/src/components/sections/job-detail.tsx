'use client'

import { clsx } from 'clsx/lite'
import Link from 'next/link'
import type { ComponentProps } from 'react'
import { PortableText } from 'next-sanity'
import { ButtonLink, IconButton } from '../elements/button'
import { Container } from '../elements/container'
import { Eyebrow } from '../elements/eyebrow'
import { GridBgSection } from '../elements/grid-bg'
import { LinkIcon } from '../icons/link-icon'
import type { JobDetail as JobDetailType } from '@/lib/sanity/types'

export function JobDetail({
  job,
  className,
  ...props
}: {
  job: JobDetailType
} & ComponentProps<'section'>) {
  const applyUrl = `/apply?job=${job.slug.current}`

  return (
    <section className={clsx('min-h-screen', className)} {...props}>
      <GridBgSection showBottomBorder showTopBorder={false} withPadding>
        <Container>
          {/* Back link - full width above content */}
          <div className="mb-12 lg:mb-16">
            <Link 
              href="/careers" 
              className="group inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-basalt/70 transition-colors hover:text-ember dark:text-coral/60 dark:hover:text-coral"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
              Back to careers
            </Link>
          </div>

          {/* Two-column layout */}
          <div className="lg:grid lg:grid-cols-[160px_1fr] lg:gap-12 xl:grid-cols-[180px_1fr] xl:gap-16 2xl:gap-24">
            {/* Left Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-32 space-y-8">
                {/* Apply section */}
                <div className="space-y-3">
                  <Eyebrow>Apply</Eyebrow>
                  <div className="flex items-center gap-2">
                    <ButtonLink href={applyUrl} size="sm">
                      Apply now
                    </ButtonLink>
                    <IconButton
                      size="sm"
                      variant="plain"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          navigator.clipboard.writeText(window.location.href)
                        }
                      }}
                      aria-label="Copy link"
                    >
                      <LinkIcon className="h-4 w-4" />
                    </IconButton>
                  </div>
                </div>

                {/* Job Type */}
                <div className="space-y-2">
                  <Eyebrow>Type</Eyebrow>
                  <span className="inline-block rounded-full bg-ember/10 px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.03em] text-ember">
                    {job.jobType.title}
                  </span>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Eyebrow>Location</Eyebrow>
                  <div className="flex flex-col gap-1">
                    {job.locations.map((location) => (
                      <span key={location._id} className="font-mono text-sm text-oxblood dark:text-coral">
                        {location.title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <Eyebrow>Department</Eyebrow>
                  <span className="font-mono text-sm text-oxblood dark:text-coral">{job.department.title}</span>
                </div>
              </div>
            </aside>

          {/* Main content */}
          <article className="max-w-[38rem]">
            <header className="mb-16 lg:mb-20">
              {/* Mobile-only meta info */}
              <div className="mb-8 flex flex-wrap items-center gap-3 lg:hidden">
                <span className="inline-block rounded-full bg-ember/10 px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.03em] text-ember">
                  {job.jobType.title}
                </span>
                <span className="text-opal dark:text-basalt">•</span>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.03em] text-ember">
                  {job.locations.map(l => l.title).join(', ')}
                </span>
              </div>

              <h1 className="font-display text-[2.5rem]/[1.15] font-medium tracking-[-0.02em] text-oxblood sm:text-5xl/[1.15] lg:text-[3.25rem]/[1.1] dark:text-frost">
                {job.title}
              </h1>

              {job.headline && (
                <p className="mt-8 max-w-xl text-lg/relaxed text-oxblood/80 dark:text-coral/80">
                  {job.headline}
                </p>
              )}

              {/* Decorative divider */}
              <div className="mt-12 flex items-center gap-3 lg:mt-16">
                <div className="h-px flex-1 bg-gradient-to-r from-opal to-transparent dark:from-basalt" />
                <div className="h-1.5 w-1.5 rounded-full bg-ember/50" />
              </div>
            </header>

            {job.intro && (
              <div className="mb-12">
                <div className="prose prose-oxblood dark:prose-invert max-w-none [&>p]:mb-6 [&>p]:text-[1.0625rem]/[1.8] [&>p]:text-oxblood/90 dark:[&>p]:text-coral/90">
                  <PortableText value={job.intro} />
                </div>
              </div>
            )}

            {job.aboutRole && (
              <div className="mb-12">
                <h2 className="mb-5 font-display text-[1.75rem]/[1.25] font-medium tracking-tight text-oxblood dark:text-frost">
                  About the Role
                </h2>
                <div className="prose prose-oxblood dark:prose-invert max-w-none [&>p]:mb-6 [&>p]:text-[1.0625rem]/[1.8] [&>p]:text-oxblood/90 dark:[&>p]:text-coral/90">
                  <PortableText value={job.aboutRole} />
                </div>
              </div>
            )}

            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="mb-12">
                <h2 className="mb-5 font-display text-[1.75rem]/[1.25] font-medium tracking-tight text-oxblood dark:text-frost">
                  Responsibilities
                </h2>
                <ul className="space-y-2.5 pl-5 text-oxblood/90 marker:text-ember dark:text-coral/90 dark:marker:text-coral">
                  {job.responsibilities.map((block, index) => (
                    <li key={block._key || index} className="pl-1.5 text-[1.0625rem]/[1.7]">
                      <PortableText value={[block]} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.qualifications && job.qualifications.length > 0 && (
              <div className="mb-12">
                <h2 className="mb-5 font-display text-[1.75rem]/[1.25] font-medium tracking-tight text-oxblood dark:text-frost">
                  Qualifications
                </h2>
                <ul className="space-y-2.5 pl-5 text-oxblood/90 marker:text-ember dark:text-coral/90 dark:marker:text-coral">
                  {job.qualifications.map((block, index) => (
                    <li key={block._key || index} className="pl-1.5 text-[1.0625rem]/[1.7]">
                      <PortableText value={[block]} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.whyJoinUs && (
              <div className="mb-12">
                <h2 className="mb-5 font-display text-[1.75rem]/[1.25] font-medium tracking-tight text-oxblood dark:text-frost">
                  Why Join Us
                </h2>
                <div className="prose prose-oxblood dark:prose-invert max-w-none [&>p]:mb-6 [&>p]:text-[1.0625rem]/[1.8] [&>p]:text-oxblood/90 dark:[&>p]:text-coral/90">
                  <PortableText value={job.whyJoinUs} />
                </div>
              </div>
            )}

            {/* Mobile apply section */}
            <div className="mt-16 border-t border-opal pt-8 lg:hidden dark:border-basalt">
              <Eyebrow className="mb-3">Apply</Eyebrow>
              <div className="flex items-center gap-2">
                <ButtonLink href={applyUrl} size="sm">
                  Apply now
                </ButtonLink>
                <IconButton
                  size="sm"
                  variant="plain"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      navigator.clipboard.writeText(window.location.href)
                    }
                  }}
                  aria-label="Copy link"
                >
                  <LinkIcon className="h-4 w-4" />
                </IconButton>
              </div>
            </div>

            <footer className="mt-16 border-t border-opal/60 pt-10 dark:border-basalt/60">
              <Link 
                href="/careers" 
                className="group inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-basalt/70 transition-colors hover:text-ember dark:text-coral/60"
              >
                <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
                Back to all positions
              </Link>
            </footer>
          </article>
        </div>
        </Container>
      </GridBgSection>
    </section>
  )
}
