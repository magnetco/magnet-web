import { groq } from 'next-sanity'

// Get all posts ordered by publish date
export const postsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    postType,
    externalUrl,
    summary,
    publishedAt,
    "category": category->{
      _id,
      title,
      slug,
      phase
    }
  }
`

// Get posts filtered by category
export const postsByCategoryQuery = groq`
  *[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    postType,
    externalUrl,
    summary,
    publishedAt,
    "category": category->{
      _id,
      title,
      slug,
      phase
    }
  }
`

// Get a single post by slug (for article detail pages)
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    postType,
    externalUrl,
    summary,
    body,
    publishedAt,
    "category": category->{
      _id,
      title,
      slug,
      phase
    }
  }
`

// Get all categories grouped by phase
export const categoriesQuery = groq`
  *[_type == "category"] | order(phase asc, title asc) {
    _id,
    title,
    slug,
    phase,
    description
  }
`

// Get all post slugs (for static generation)
export const postSlugsQuery = groq`
  *[_type == "post" && postType == "article" && defined(slug.current)][].slug.current
`

// Job queries

// Get all active jobs for listings
export const jobsQuery = groq`
  *[_type == "job" && isActive == true] | order(department->order asc, title asc) {
    _id,
    title,
    slug,
    isActive,
    "department": department->{
      _id,
      title,
      slug,
      order
    },
    "jobType": jobType->{
      _id,
      title,
      slug
    },
    "locations": locations[]->{
      _id,
      title,
      slug,
      city,
      state,
      order
    }
  }
`

// Get a single job by slug for detail page
export const jobBySlugQuery = groq`
  *[_type == "job" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    isActive,
    headline,
    intro,
    aboutRole,
    responsibilities,
    qualifications,
    whyJoinUs,
    publishedAt,
    "department": department->{
      _id,
      title,
      slug,
      order
    },
    "jobType": jobType->{
      _id,
      title,
      slug
    },
    "locations": locations[]->{
      _id,
      title,
      slug,
      city,
      state,
      order
    }
  }
`

// Get all job slugs for static generation
export const jobSlugsQuery = groq`
  *[_type == "job" && isActive == true && defined(slug.current)][].slug.current
`

// Get all departments for filtering
export const departmentsQuery = groq`
  *[_type == "department"] | order(order asc, title asc) {
    _id,
    title,
    slug,
    order
  }
`

// Get all job locations for filtering
export const jobLocationsQuery = groq`
  *[_type == "jobLocation"] | order(order asc, title asc) {
    _id,
    title,
    slug,
    city,
    state,
    order
  }
`

// Get all job types
export const jobTypesQuery = groq`
  *[_type == "jobType"] | order(title asc) {
    _id,
    title,
    slug
  }
`

// Get jobs for application form (minimal data needed for the form)
export const jobsForApplyQuery = groq`
  *[_type == "job" && isActive == true] | order(title asc) {
    _id,
    title,
    slug,
    "department": department->{
      _id,
      title
    },
    "jobType": jobType->{
      _id,
      title
    },
    "locations": locations[]->{
      _id,
      title
    }
  }
`

