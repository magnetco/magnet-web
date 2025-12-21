import { CareersListing } from '@/components/sections/careers-listing'
import { jobs } from '@/data/jobs'

const departments = [
  { value: 'All', label: 'All' },
  { value: 'Design', label: 'Design' },
  { value: 'Development', label: 'Development' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Client Services', label: 'Client Services' },
]

const locations = [
  { value: 'Anywhere', label: 'Anywhere' },
  { value: 'Cincinnati, Ohio', label: 'Cincinnati, Ohio' },
  { value: 'Salt Lake City, Utah', label: 'Salt Lake City, Utah' },
  { value: 'Irvine, California', label: 'Irvine, California' },
]

export default function Page() {
  return (
    <CareersListing
      id="careers"
      eyebrow="Open positions"
      headline="Explore open roles across teams at Magnet."
      jobs={jobs}
      departments={departments}
      locations={locations}
    />
  )
}

