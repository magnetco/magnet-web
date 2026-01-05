'use client'

import { clsx } from 'clsx/lite'
import Link from 'next/link'
import { useState, type ComponentProps, type ReactNode } from 'react'
import { Container } from '../elements/container'
import { Eyebrow } from '../elements/eyebrow'
import { GridBgSection, sectionPaddingClasses } from '../elements/grid-bg'
import { Subheading } from '../elements/subheading'
import { ChevronIcon } from '../icons/chevron-icon'
import type { JobListing as JobListingType } from '@/lib/sanity/types'

export function JobListing({ job, href }: { job: JobListingType; href: string }) {
  const locationNames = job.locations.map((loc) => loc.title).join(' / ')
  
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-4 border-b border-oxblood/10 py-4 transition-colors hover:bg-oxblood/5"
    >
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-3">
          <h3 className="text-lg/7 font-semibold text-oxblood group-hover:text-ember dark:text-coral">
            {job.title}
          </h3>
          <span className="rounded-full bg-oxblood/10 px-3 py-0.5 text-xs/6 text-oxblood dark:bg-white/10 dark:text-coral">
            {job.jobType.title}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm/6 text-oxblood/70 dark:text-coral/70">
          <span>{locationNames}</span>
        </div>
      </div>
      <ChevronIcon className="h-5 w-5 rotate-[-90deg] text-oxblood/40 transition-transform group-hover:translate-x-1 dark:text-coral/40" />
    </Link>
  )
}

export function FilterDropdown({
  label,
  value,
  options,
  onChange,
  className,
  ...props
}: {
  label: string
  value: string
  options: Array<{ value: string; label: string }>
  onChange: (value: string) => void
} & Omit<ComponentProps<'div'>, 'onChange'>) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={clsx('relative', className)} {...props}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg border px-4 py-3 text-left transition-colors',
          isOpen
            ? 'border-oxblood dark:border-ember'
            : 'border-oxblood/20 dark:border-white/20',
        )}
      >
        <div className="flex flex-col gap-0.5">
          <span className="text-xs/6 text-oxblood/60 dark:text-coral/60">{label}</span>
          <span className="text-sm/7 text-oxblood dark:text-coral">{value}</span>
        </div>
        <ChevronIcon
          className={clsx(
            'h-4 w-4 rotate-90 text-oxblood/40 transition-transform dark:text-coral/40',
            isOpen && 'rotate-[-90deg]',
          )}
        />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full z-20 mt-2 w-full rounded-lg border border-oxblood/20 bg-white shadow-lg dark:border-white/20 dark:bg-olive-950">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={clsx(
                  'w-full cursor-pointer px-4 py-2 text-left text-sm/7 transition-colors first:rounded-t-lg last:rounded-b-lg',
                  option.value === value
                    ? 'bg-oxblood/10 text-oxblood dark:bg-white/10 dark:text-coral'
                    : 'text-oxblood hover:bg-oxblood/5 dark:text-coral dark:hover:bg-white/5',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function CareersListing({
  eyebrow,
  headline,
  subheadline,
  jobs,
  departments,
  locations,
  className,
  withGridBg = false,
  ...props
}: {
  eyebrow?: ReactNode
  headline: ReactNode
  subheadline?: ReactNode
  jobs: JobListingType[]
  departments: Array<{ value: string; label: string }>
  locations: Array<{ value: string; label: string }>
  withGridBg?: boolean
} & ComponentProps<'section'>) {
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [selectedLocation, setSelectedLocation] = useState('Anywhere')

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    if (selectedDepartment !== 'All' && job.department.title !== selectedDepartment) return false
    if (selectedLocation !== 'Anywhere' && !job.locations.some((loc) => loc.title.includes(selectedLocation))) return false
    return true
  })

  // Group jobs by department
  const jobsByDepartment = filteredJobs.reduce((acc, job) => {
    const deptTitle = job.department.title
    if (!acc[deptTitle]) {
      acc[deptTitle] = []
    }
    acc[deptTitle].push(job)
    return acc
  }, {} as Record<string, JobListingType[]>)

  const content = (
    <Container className="flex flex-col gap-10 sm:gap-16">
      {/* Header */}
      <div className="flex max-w-2xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {typeof headline === 'string' ? <Subheading>{headline}</Subheading> : headline}
          {subheadline && <p className="text-base/7 text-oxblood dark:text-coral">{subheadline}</p>}
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <FilterDropdown
          label="Department"
          value={selectedDepartment}
          options={departments}
          onChange={setSelectedDepartment}
        />
        <FilterDropdown
          label="Location"
          value={selectedLocation}
          options={locations}
          onChange={setSelectedLocation}
        />
      </div>

      {/* Job Listings */}
      <div className="flex flex-col gap-12">
        {Object.entries(jobsByDepartment).map(([department, departmentJobs]) => (
          <div key={department} className="flex flex-col gap-6">
            <h2 className="text-xl/8 font-semibold text-oxblood dark:text-coral">{department}</h2>
            <div className="flex flex-col">
              {departmentJobs.map((job) => (
                <JobListing key={job._id} job={job} href={`/careers/${job.slug.current}`} />
              ))}
            </div>
          </div>
        ))}
        {filteredJobs.length === 0 && (
          <p className="text-base/7 text-oxblood/70 dark:text-coral/70">No jobs found matching your filters.</p>
        )}
      </div>
    </Container>
  )

  if (withGridBg) {
    return (
      <section className={className} {...props}>
        <GridBgSection showBottomBorder={true} withPadding>
          {content}
        </GridBgSection>
      </section>
    )
  }

  return (
    <section className={clsx(sectionPaddingClasses, className)} {...props}>
      {content}
    </section>
  )
}

