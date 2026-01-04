import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity/client'
import { jobBySlugQuery, jobSlugsQuery } from '@/lib/sanity/queries'
import type { JobDetail as JobDetailType } from '@/lib/sanity/types'
import { JobDetail } from '@/components/sections/job-detail'

export const revalidate = 60 // Revalidate every 60 seconds

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(jobSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = await client.fetch<JobDetailType | null>(jobBySlugQuery, { slug })

  if (!job) {
    notFound()
  }

  return <JobDetail job={job} />
}
