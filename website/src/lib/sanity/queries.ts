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

// Get posts filtered by industry
export const postsByIndustryQuery = groq`
  *[_type == "post" && industry == $industry] | order(publishedAt desc) {
    _id,
    title,
    slug,
    postType,
    externalUrl,
    summary,
    industry,
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

// Team Member queries

// Get all active team members ordered by display order
export const teamMembersQuery = groq`
  *[_type == "teamMember" && isActive == true] | order(order asc) {
    _id,
    name,
    slug,
    role,
    "image": image{
      asset->{
        _id,
        url
      }
    },
    bio,
    featured,
    order,
    isActive
  }
`

// Get featured team members only (for editorial display)
export const featuredTeamMembersQuery = groq`
  *[_type == "teamMember" && isActive == true && featured == true] | order(order asc) {
    _id,
    name,
    slug,
    role,
    "image": image{
      asset->{
        _id,
        url
      }
    },
    bio,
    featured,
    order,
    isActive
  }
`

// Get non-featured team members (for grid display)
export const gridTeamMembersQuery = groq`
  *[_type == "teamMember" && isActive == true && featured != true] | order(order asc) {
    _id,
    name,
    slug,
    role,
    "image": image{
      asset->{
        _id,
        url
      }
    },
    bio,
    featured,
    order,
    isActive
  }
`

// Get a single team member by slug
export const teamMemberBySlugQuery = groq`
  *[_type == "teamMember" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    role,
    "image": image{
      asset->{
        _id,
        url
      }
    },
    bio,
    featured,
    order,
    isActive
  }
`

// Case Study queries

// Get all case studies ordered by publish date
export const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    client,
    headline,
    description,
    category,
    "clientLogo": clientLogo{
      asset->{
        _id,
        url
      }
    },
    "heroImage": heroImage{
      asset->{
        _id,
        url
      }
    },
    industry,
    featured,
    results,
    testimonial,
    services,
    phases,
    publishedAt
  }
`

// Get featured case studies
export const featuredCaseStudiesQuery = groq`
  *[_type == "caseStudy" && featured == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    client,
    headline,
    description,
    category,
    "clientLogo": clientLogo{
      asset->{
        _id,
        url
      }
    },
    "heroImage": heroImage{
      asset->{
        _id,
        url
      }
    },
    industry,
    results,
    testimonial,
    services,
    phases,
    publishedAt
  }
`

// Get case studies by category
export const caseStudiesByCategoryQuery = groq`
  *[_type == "caseStudy" && category == $category] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    client,
    headline,
    description,
    category,
    "clientLogo": clientLogo{
      asset->{
        _id,
        url
      }
    },
    "heroImage": heroImage{
      asset->{
        _id,
        url
      }
    },
    industry,
    featured,
    results,
    testimonial,
    services,
    phases,
    publishedAt
  }
`

// Get case studies by service
export const caseStudiesByServiceQuery = groq`
  *[_type == "caseStudy" && $service in services] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    client,
    headline,
    description,
    category,
    "clientLogo": clientLogo{
      asset->{
        _id,
        url
      }
    },
    "heroImage": heroImage{
      asset->{
        _id,
        url
      }
    },
    industry,
    featured,
    results,
    testimonial,
    services,
    phases,
    publishedAt
  }
`

// Get a single case study by slug (full detail)
export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    client,
    headline,
    description,
    category,
    "clientLogo": clientLogo{
      asset->{
        _id,
        url
      }
    },
    "heroImage": heroImage{
      asset->{
        _id,
        url
      }
    },
    "galleryImages": galleryImages[]{
      asset->{
        _id,
        url
      }
    },
    industry,
    featured,
    challenge,
    solution,
    results,
    testimonial,
    services,
    phases,
    "teamLead": teamLead->{
      _id,
      name,
      slug,
      role,
      "image": image{
        asset->{
          _id,
          url
        }
      }
    },
    publishedAt
  }
`

// Get all case study slugs for static generation
export const caseStudySlugsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current)][].slug.current
`

// Get case studies by industry
export const caseStudiesByIndustryQuery = groq`
  *[_type == "caseStudy" && industry == $industry] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    client,
    headline,
    description,
    category,
    "clientLogo": clientLogo{
      asset->{
        _id,
        url
      }
    },
    "heroImage": heroImage{
      asset->{
        _id,
        url
      }
    },
    industry,
    featured,
    results,
    testimonial,
    services,
    phases,
    publishedAt
  }
`

