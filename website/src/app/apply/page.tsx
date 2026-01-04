import { client } from '@/lib/sanity/client'
import { jobsForApplyQuery } from '@/lib/sanity/queries'
import { ApplyForm } from './apply-form'

export const revalidate = 60 // Revalidate every 60 seconds

export type ApplyJob = {
  _id: string
  title: string
  slug: { current: string }
  department: { _id: string; title: string }
  jobType: { _id: string; title: string }
  locations: Array<{ _id: string; title: string }>
}

export default async function ApplyPage() {
  const jobs = await client.fetch<ApplyJob[]>(jobsForApplyQuery)

  return <ApplyForm jobs={jobs} />
}
