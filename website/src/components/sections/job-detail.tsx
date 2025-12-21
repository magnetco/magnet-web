'use client'

import { clsx } from 'clsx/lite'
import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { ButtonLink } from '../elements/button'
import { Container } from '../elements/container'
import { LinkIcon } from '../icons/link-icon'

export interface JobDetail {
  id: string
  title: string
  type: string
  locations: string[]
  department: string
  content: {
    headline: ReactNode
    intro: ReactNode
    aboutRole: ReactNode
    responsibilities: Array<ReactNode>
    qualifications: Array<ReactNode>
    whyJoinUs: ReactNode
  }
  applyUrl?: string
}

export function JobDetail({
  job,
  className,
  ...props
}: {
  job: JobDetail
} & ComponentProps<'section'>) {
  return (
    <section className={clsx('min-h-screen py-16', className)} {...props}>
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
          {/* Left Sidebar - Fixed */}
          <aside className="flex flex-col gap-8 lg:sticky lg:top-24 lg:h-fit">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded bg-oxblood dark:bg-ember" />
              <Link href="/careers" className="text-sm/7 text-oxblood hover:text-ember dark:text-coral">
                Careers
              </Link>
            </div>

            <div className="flex flex-col gap-6">
              <span className="rounded-full bg-oxblood/10 px-3 py-1 text-xs/6 text-oxblood dark:bg-white/10 dark:text-coral">
                {job.type}
              </span>

              <div className="flex flex-col gap-1">
                <h1 className="text-3xl/10 font-semibold text-oxblood dark:text-coral">{job.title}</h1>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs/6 font-semibold uppercase tracking-wide text-oxblood/60 dark:text-coral/60">
                    Location
                  </span>
                  <div className="flex flex-col gap-1">
                    {job.locations.map((location, index) => (
                      <span key={index} className="text-sm/7 text-oxblood dark:text-coral">
                        {location}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs/6 font-semibold uppercase tracking-wide text-oxblood/60 dark:text-coral/60">
                    Department
                  </span>
                  <span className="text-sm/7 text-oxblood dark:text-coral">{job.department}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <ButtonLink href={job.applyUrl || '#'} size="lg" className="w-full">
                  Apply now
                </ButtonLink>
                <button
                  type="button"
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-oxblood/20 p-3 text-oxblood transition-colors hover:bg-oxblood/5 dark:border-white/20 dark:text-coral dark:hover:bg-white/5"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      navigator.clipboard.writeText(window.location.href)
                    }
                  }}
                >
                  <LinkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* Right Content - Scrollable */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl/9 font-semibold text-oxblood dark:text-coral">{job.content.headline}</h2>
              <div className="flex flex-col gap-4 text-base/7 text-oxblood dark:text-coral">
                {job.content.intro}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-xl/8 font-semibold text-oxblood dark:text-coral">About the Role</h3>
              <div className="flex flex-col gap-4 text-base/7 text-oxblood dark:text-coral">
                {job.content.aboutRole}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-xl/8 font-semibold text-oxblood dark:text-coral">Job Responsibilities</h3>
              <ul className="flex flex-col gap-3 text-base/7 text-oxblood dark:text-coral">
                {job.content.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-oxblood dark:bg-ember" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-xl/8 font-semibold text-oxblood dark:text-coral">Qualifications</h3>
              <ul className="flex flex-col gap-3 text-base/7 text-oxblood dark:text-coral">
                {job.content.qualifications.map((qualification, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-oxblood dark:bg-ember" />
                    <span>{qualification}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h3 className="text-xl/8 font-semibold text-oxblood dark:text-coral">Why Join Us</h3>
              <div className="flex flex-col gap-4 text-base/7 text-oxblood dark:text-coral">
                {job.content.whyJoinUs}
              </div>
            </div>

            <div className="pt-8">
              <ButtonLink href={job.applyUrl || '#'} size="lg">
                Apply now
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

