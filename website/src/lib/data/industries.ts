import type { CaseStudyIndustry } from '@/lib/sanity/types'

export interface Industry {
  slug: string
  name: string
  headline: string
  description: string
  expertise: string[]
  platforms?: string
  notableClients?: string[]
  sanityIndustryKey: CaseStudyIndustry
}

export const industries: Industry[] = [
  {
    slug: 'ecommerce',
    name: 'Ecommerce',
    headline: 'Online retail, DTC brands, and marketplace sellers',
    description:
      'We build stores that convert and scale. From purchase psychology to multi-channel selling, we understand what drives online retail success.',
    expertise: [
      'Purchase psychology and conversion optimization',
      'Product discovery and search',
      'Inventory, fulfillment, and operations integration',
      'Subscription and loyalty programs',
      'Multi-channel selling',
    ],
    platforms: 'Shopify, custom headless commerce, WooCommerce',
    sanityIndustryKey: 'retail-ecommerce',
  },
  {
    slug: 'education-technology',
    name: 'Education Technology',
    headline: 'Learning platforms, educational publishers, and academic institutions',
    description:
      'We design experiences that support how people actually learn. From instructor dashboards to student progress tracking, we build tools educators love.',
    expertise: [
      'Instructor and student user journeys',
      'Content management for educational materials',
      'Assessment and progress tracking',
      'Accessibility requirements (WCAG, Section 508)',
      'Integration with LMS and institutional systems',
    ],
    notableClients: ['UCLA', 'McGraw Hill Education'],
    sanityIndustryKey: 'education',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    headline: 'Health systems, medical practices, and health tech companies',
    description:
      'We build compliant, accessible experiences that serve patients and providers. Trust, privacy, and clarity drive every decision.',
    expertise: [
      'HIPAA compliance and data security',
      'Patient journey complexity',
      'Provider credentialing and search',
      'Appointment scheduling systems',
      'Accessibility requirements',
    ],
    notableClients: ['St. Elizabeth Healthcare'],
    sanityIndustryKey: 'healthcare',
  },
  {
    slug: 'manufacturing',
    name: 'Manufacturing',
    headline: 'Industrial companies, B2B suppliers, and technical products',
    description:
      'We translate technical complexity into clear digital experiences. Extended sales cycles and technical buyer psychology are our specialty.',
    expertise: [
      'Extended B2B sales cycles',
      'Technical buyer psychology',
      'Product catalog complexity',
      'Distributor and channel relationships',
      'Integration with ERP and inventory systems',
    ],
    notableClients: ['Commercial Vehicle Group', 'Voltic', 'First Source Electric'],
    sanityIndustryKey: 'manufacturing',
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    headline: 'Law firms, consulting practices, and service businesses',
    description:
      'We build credibility and convert qualified leads. Trust-building in high-consideration decisions is what we do best.',
    expertise: [
      'Trust-building in high-consideration decisions',
      'Practice area organization and attorney profiles',
      'Thought leadership and content strategy',
      'Lead qualification workflows',
      'Referral and reputation dynamics',
    ],
    notableClients: ['Katz Teller', 'Brandience'],
    sanityIndustryKey: 'professional-services',
  },
  {
    slug: 'nonprofits',
    name: 'Nonprofits & Philanthropy',
    headline: 'Foundations, charities, and mission-driven organizations',
    description:
      'We help you communicate impact and inspire action. Donor psychology and impact storytelling drive everything we build.',
    expertise: [
      'Donor psychology and giving journeys',
      'Impact storytelling and measurement',
      'Volunteer and supporter engagement',
      'Grant and institutional communication',
      'Campaign and event platforms',
    ],
    notableClients: ['Explore.org (Annenberg Foundation)', 'Luxottica Foundation'],
    sanityIndustryKey: 'nonprofit',
  },
  {
    slug: 'sports-recreation',
    name: 'Sports & Recreation',
    headline: 'Teams, leagues, and recreational organizations',
    description:
      'We capture energy and build community. Fan engagement and real-time updates keep your audience connected.',
    expertise: [
      'Fan engagement and community building',
      'Ticketing and merchandise integration',
      'Schedule and roster management',
      'Real-time updates and results',
      'Membership and registration systems',
    ],
    notableClients: ["Florence Y'alls", 'Gotham Soccer', 'Bendu Academy'],
    sanityIndustryKey: 'sports-entertainment',
  },
  {
    slug: 'entertainment',
    name: 'Entertainment',
    headline: 'Media companies, content creators, and entertainment brands',
    description:
      'We build experiences as engaging as the content. Visual storytelling and audience engagement metrics are our focus.',
    expertise: [
      'Visual storytelling and immersive design',
      'Video and media delivery',
      'Social integration and sharing',
      'Content management at scale',
      'Audience engagement metrics',
    ],
    sanityIndustryKey: 'media-entertainment',
  },
  {
    slug: 'financial-services',
    name: 'Financial Services',
    headline: 'Banks, fintech, and financial service providers',
    description:
      'We build trust and handle complexity. Regulatory compliance and secure application flows are table stakes.',
    expertise: [
      'Regulatory compliance and security requirements',
      'Product comparison and selection journeys',
      'Application and onboarding flows',
      'Trust signals and credibility markers',
      'Integration with core systems',
    ],
    notableClients: ['Windward Bank'],
    sanityIndustryKey: 'financial-services',
  },
  {
    slug: 'hospitality',
    name: 'Hospitality & Senior Living',
    headline: 'Hotels, restaurants, and care facilities',
    description:
      'We communicate quality and drive bookings. Visual-first decision making and booking flows are our specialty.',
    expertise: [
      'Visual-first decision making',
      'Amenity and service presentation',
      'Booking and inquiry flows',
      'Location and accessibility information',
      'Family decision-making dynamics',
    ],
    notableClients: ['Serene Suites'],
    sanityIndustryKey: 'travel-hospitality',
  },
]

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug)
}

export function getIndustrySlugs(): string[] {
  return industries.map((i) => i.slug)
}
