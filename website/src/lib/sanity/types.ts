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

// Team Member types

export type TeamMemberDepartment = 'leadership' | 'team'

export type TeamMember = {
  _id: string
  name: string
  slug: { current: string }
  role: string
  image: {
    asset: {
      _id: string
      url: string
    }
  }
  bio?: PortableTextBlock[]
  department: TeamMemberDepartment
  order?: number
  isActive: boolean
}

// Case Study types

export type CaseStudyResult = {
  metric: string
  label: string
}

export type CaseStudyTestimonial = {
  quote?: string
  author?: string
  authorRole?: string
}

export type CaseStudyIndustry =
  | 'saas'
  | 'healthcare'
  | 'manufacturing'
  | 'financial-services'
  | 'professional-services'
  | 'technology'
  | 'education'
  | 'retail-ecommerce'
  | 'other'

export type CaseStudyService =
  | 'branding'
  | 'website'
  | 'paid-media'
  | 'search-marketing'
  | 'content'
  | 'crm-automation'
  | 'analytics'

export type CaseStudy = {
  _id: string
  title: string
  slug: { current: string }
  client: string
  clientLogo?: {
    asset: {
      _id: string
      url: string
    }
  }
  industry: CaseStudyIndustry
  featured: boolean
  challenge?: PortableTextBlock[]
  solution?: PortableTextBlock[]
  results?: CaseStudyResult[]
  testimonial?: CaseStudyTestimonial
  services?: CaseStudyService[]
  phases?: Phase[]
  teamLead?: TeamMember
  publishedAt?: string
}

