import { notFound } from 'next/navigation'
import { JobDetail } from '@/components/sections/job-detail'
import { getJobDetailBySlug, getAllJobSlugs } from '@/data/jobs'

export async function generateStaticParams() {
  const slugs = getAllJobSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const job = getJobDetailBySlug(slug)

  if (!job) {
    notFound()
  }

  return <JobDetail job={job} />
}

