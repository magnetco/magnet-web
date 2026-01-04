import { client } from '@/lib/sanity/client'
import { jobsQuery, departmentsQuery, jobLocationsQuery } from '@/lib/sanity/queries'
import type { JobListing, Department, JobLocation } from '@/lib/sanity/types'
import { CareersListing } from '@/components/sections/careers-listing'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function Page() {
  const [jobs, departments, locations] = await Promise.all([
    client.fetch<JobListing[]>(jobsQuery),
    client.fetch<Department[]>(departmentsQuery),
    client.fetch<JobLocation[]>(jobLocationsQuery),
  ])

  // Transform departments for the filter dropdown
  const departmentOptions = [
    { value: 'All', label: 'All' },
    ...departments.map((dept) => ({
      value: dept.title,
      label: dept.title,
    })),
  ]

  // Transform locations for the filter dropdown
  const locationOptions = [
    { value: 'Anywhere', label: 'Anywhere' },
    ...locations.map((loc) => ({
      value: loc.title,
      label: loc.title,
    })),
  ]

  return (
    <CareersListing
      id="careers"
      eyebrow="Open positions"
      headline="Explore open roles across teams at Magnet."
      jobs={jobs}
      departments={departmentOptions}
      locations={locationOptions}
    />
  )
}
