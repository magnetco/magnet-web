import type { PortableTextBlock } from 'next-sanity'

export type Phase = 'foundation' | 'activation' | 'acceleration' | 'retention'

export type Category = {
  _id: string
  title: string
  slug: { current: string }
  phase: Phase
  description?: string
}

export type PostType = 'link' | 'article'

export type Post = {
  _id: string
  title: string
  slug: { current: string }
  postType: PostType
  externalUrl?: string
  summary?: string
  body?: PortableTextBlock[]
  publishedAt: string
  category?: Category
}

// Job-related types

export type Department = {
  _id: string
  title: string
  slug: { current: string }
  order?: number
}

export type JobLocation = {
  _id: string
  title: string
  slug: { current: string }
  city?: string
  state?: string
  order?: number
}

export type JobType = {
  _id: string
  title: string
  slug: { current: string }
}

export type JobListing = {
  _id: string
  title: string
  slug: { current: string }
  department: Department
  jobType: JobType
  locations: JobLocation[]
  isActive: boolean
}

export type JobDetail = {
  _id: string
  title: string
  slug: { current: string }
  department: Department
  jobType: JobType
  locations: JobLocation[]
  isActive: boolean
  headline: string
  intro?: PortableTextBlock[]
  aboutRole?: PortableTextBlock[]
  responsibilities?: PortableTextBlock[]
  qualifications?: PortableTextBlock[]
  whyJoinUs?: PortableTextBlock[]
  publishedAt?: string
}

