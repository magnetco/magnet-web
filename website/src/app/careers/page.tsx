import { CareersListing, type Job } from '@/components/sections/careers-listing'

// Sample jobs data
const jobs: Job[] = [
  {
    id: 'head-of-operations-retail-funds',
    title: 'Head of Operations, Retail Funds',
    type: 'Hybrid / Full Time',
    locations: ['New York City, NY', 'San Francisco, CA'],
    department: 'Asset Management',
  },
  {
    id: 'gtm-lead',
    title: 'GTM Lead',
    type: 'Hybrid / Full Time',
    locations: ['New York City, NY', 'San Francisco, CA'],
    department: 'Asset Management',
  },
  {
    id: 'investment-associate-retail-funds',
    title: 'Investment Associate, Retail Funds',
    type: 'Hybrid / Full Time',
    locations: ['New York City, NY', 'San Francisco, CA'],
    department: 'Asset Management',
  },
  {
    id: 'venture-relations-lead',
    title: 'Venture Relations Lead',
    type: 'Hybrid / Full Time',
    locations: ['New York City, NY'],
    department: 'Customer Success & Operations',
  },
  {
    id: 'venture-relations-associate',
    title: 'Venture Relations Associate',
    type: 'Hybrid / Full Time',
    locations: ['New York City, NY'],
    department: 'Customer Success & Operations',
  },
  {
    id: 'senior-data-engineer',
    title: 'Senior Data Engineer',
    type: 'Hybrid / Full Time',
    locations: ['San Francisco, CA'],
    department: 'Data',
  },
]

const departments = [
  { value: 'All', label: 'All' },
  { value: 'Asset Management', label: 'Asset Management' },
  { value: 'Customer Success & Operations', label: 'Customer Success & Operations' },
  { value: 'Data', label: 'Data' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Product & Design', label: 'Product & Design' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Security & IT Operations', label: 'Security & IT Operations' },
]

const locations = [
  { value: 'Anywhere', label: 'Anywhere' },
  { value: 'New York City, NY', label: 'New York City, NY' },
  { value: 'San Francisco, CA', label: 'San Francisco, CA' },
]

export default function Page() {
  return (
    <CareersListing
      id="careers"
      eyebrow="Open positions"
      headline="Explore open roles across teams at AngelList."
      jobs={jobs}
      departments={departments}
      locations={locations}
    />
  )
}

