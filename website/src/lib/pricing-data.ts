/**
 * Centralized pricing data for Magnet services
 * This file is the single source of truth for all pricing across the site
 */

// Retainer pricing
export const RETAINER_MONTHLY = 25000
export const RETAINER_YEARLY = Math.round(RETAINER_MONTHLY * 12 * 0.9 / 12) // 10% discount
export const RETAINER_YEARLY_TOTAL = RETAINER_YEARLY * 12
export const RETAINER_YEARLY_SAVINGS = (RETAINER_MONTHLY * 12) - RETAINER_YEARLY_TOTAL

export const RETAINER_FEATURES = [
  'Brand strategy & positioning',
  'Website design & development',
  'Paid advertising campaigns',
  'Search marketing program',
  'Content strategy & creation',
  'Conversion optimization',
  'Advanced analytics & attribution',
  'Dedicated account team',
  'Monthly strategy reviews',
  'Priority support',
]

// Branding sub-options
export const BRANDING_OPTIONS = [
  {
    id: 'brand-essentials',
    name: 'Brand Essentials',
    price: 18000,
    priceFormatted: '$18,000',
    priceNote: 'fixed price',
    timeline: '4-6 weeks',
    description: 'Core brand identity for startups and growing companies ready to establish their market presence.',
    features: [
      'Brand discovery workshop',
      'Positioning statement',
      'Logo design (primary + secondary)',
      'Color palette & typography',
      'Basic brand guidelines',
      'Business card design',
    ],
    popular: false,
  },
  {
    id: 'brand-comprehensive',
    name: 'Brand Comprehensive',
    price: 35000,
    priceFormatted: '$35,000',
    priceNote: 'fixed price',
    timeline: '8-12 weeks',
    description: 'Complete brand system for established companies seeking a strategic rebrand or market repositioning.',
    features: [
      'Everything in Essentials',
      'Competitive & market analysis',
      'Brand architecture',
      'Messaging framework',
      'Extended visual system',
      'Comprehensive guidelines',
      'Collateral templates',
      'Brand launch support',
    ],
    popular: true,
  },
] as const

// Websites sub-options
export const WEBSITE_OPTIONS = [
  {
    id: 'marketing-website',
    name: 'Marketing Website',
    price: 35000,
    priceFormatted: '$35,000',
    priceNote: 'starting price',
    description: 'Built on Webflow or Next.js with Sanity Headless CMS',
    features: [
      'Custom design & UX strategy',
      'Responsive development',
      'CMS integration & training',
      'SEO foundation',
      'Analytics setup',
      '60-day support',
    ],
    popular: true,
  },
  {
    id: 'ecommerce-website',
    name: 'Ecommerce Website',
    price: 48000,
    priceFormatted: '$48,000',
    priceNote: 'starting price',
    description: 'Built on Next.js with Shopify Commerce layer and Sanity Headless CMS',
    features: [
      'Everything in Marketing',
      'Shopify integration',
      'Product catalog setup',
      'Checkout optimization',
      'Inventory management',
      'Payment processing',
    ],
    popular: false,
  },
  {
    id: 'custom-software',
    name: 'Custom Software',
    price: 200,
    priceFormatted: '$200',
    priceNote: 'per hour',
    description: 'Sprint-based full-stack web development in JS, PHP, Python, or any modern language',
    features: [
      'Dedicated dev team',
      'Agile methodology',
      'Weekly sprints & demos',
      'Code reviews & QA',
      'Documentation',
      'Ongoing maintenance',
    ],
    popular: false,
  },
] as const

// Paid Media sub-options
export const PAID_MEDIA_OPTIONS = [
  {
    id: 'google-ads',
    name: 'Google Ads',
    price: 3500,
    priceFormatted: '$3,500',
    priceNote: '/month',
    description: 'Search, Display, Shopping, and YouTube campaigns',
    features: [
      'Campaign strategy & setup',
      'Keyword research & bidding',
      'Ad copy & creative',
      'Landing page optimization',
      'Conversion tracking',
      'Weekly optimization',
    ],
    popular: true,
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    price: 3000,
    priceFormatted: '$3,000',
    priceNote: '/month',
    description: 'Facebook and Instagram advertising across all placements',
    features: [
      'Audience research & targeting',
      'Creative strategy & production',
      'A/B testing framework',
      'Retargeting campaigns',
      'Pixel & event setup',
      'Performance reporting',
    ],
    popular: false,
  },
  {
    id: 'linkedin-ads',
    name: 'LinkedIn Ads',
    price: 4000,
    priceFormatted: '$4,000',
    priceNote: '/month',
    description: 'B2B targeting for demand generation and ABM',
    features: [
      'Account-based targeting',
      'Sponsored content & InMail',
      'Lead gen form campaigns',
      'Company & job targeting',
      'LinkedIn Insight Tag',
      'Pipeline attribution',
    ],
    popular: false,
  },
  {
    id: 'youtube-ads',
    name: 'YouTube Ads',
    price: 3000,
    priceFormatted: '$3,000',
    priceNote: '/month',
    description: 'Video advertising across YouTube and Google Video Partners',
    features: [
      'Video campaign strategy',
      'Audience targeting & remarketing',
      'Ad creative production',
      'TrueView & bumper ads',
      'Performance optimization',
      'View-through tracking',
    ],
    popular: false,
  },
] as const

// Search Marketing sub-options
export const SEARCH_OPTIONS = [
  {
    id: 'technical-seo',
    name: 'Technical SEO',
    price: 3000,
    priceFormatted: '$3,000',
    priceNote: '/month',
    description: 'Foundation-level technical optimization for search visibility',
    features: [
      'Site architecture audit',
      'Core Web Vitals optimization',
      'Schema markup implementation',
      'Crawlability improvements',
      'Monthly technical reporting',
    ],
    combinable: true,
  },
  {
    id: 'content-marketing',
    name: 'Content Marketing',
    price: 4500,
    priceFormatted: '$4,500',
    priceNote: '/month',
    description: 'Strategic content creation targeting high-value search intent',
    features: [
      'Keyword & intent research',
      '4 long-form articles/month',
      'Content optimization',
      'Internal linking strategy',
      'Performance tracking',
    ],
    combinable: true,
    popular: true,
  },
  {
    id: 'link-building',
    name: 'Link Building',
    price: 3500,
    priceFormatted: '$3,500',
    priceNote: '/month',
    description: 'Authority building through quality backlink acquisition',
    features: [
      'Link opportunity research',
      'Outreach campaigns',
      'Guest posting strategy',
      'Digital PR support',
      'Link quality monitoring',
    ],
    combinable: true,
  },
  {
    id: 'local-seo',
    name: 'Local SEO',
    price: 2000,
    priceFormatted: '$2,000',
    priceNote: '/month',
    description: 'Dominate local search results and Google Maps',
    features: [
      'Google Business optimization',
      'Local citation building',
      'Review management',
      'Local content strategy',
      'Competitor monitoring',
    ],
    combinable: true,
  },
] as const

// Summary data for forms and compact displays
export const INDIVIDUAL_SERVICES = [
  {
    id: 'branding',
    label: 'Branding',
    price: 'From $18K',
    minPrice: 18000,
    href: '/branding',
    phase: 'Foundation' as const,
    subOptions: BRANDING_OPTIONS,
  },
  {
    id: 'websites',
    label: 'Websites',
    price: 'From $35K',
    minPrice: 35000,
    href: '/websites',
    phase: 'Foundation' as const,
    subOptions: WEBSITE_OPTIONS,
  },
  {
    id: 'paid-media',
    label: 'Paid Media',
    price: 'From $3K/mo',
    minPrice: 3000,
    href: '/ads',
    phase: 'Activation' as const,
    subOptions: PAID_MEDIA_OPTIONS,
  },
  {
    id: 'search-marketing',
    label: 'Search Marketing',
    price: 'From $2K/mo',
    minPrice: 2000,
    href: '/search',
    phase: 'Activation' as const,
    subOptions: SEARCH_OPTIONS,
  },
] as const

// Type exports
export type BrandingOption = typeof BRANDING_OPTIONS[number]
export type WebsiteOption = typeof WEBSITE_OPTIONS[number]
export type PaidMediaOption = typeof PAID_MEDIA_OPTIONS[number]
export type SearchOption = typeof SEARCH_OPTIONS[number]
export type IndividualService = typeof INDIVIDUAL_SERVICES[number]

