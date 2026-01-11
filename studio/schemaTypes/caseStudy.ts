import { defineField, defineType } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'media', title: 'Media' },
    { name: 'metadata', title: 'Metadata' },
  ],
  fields: [
    // Basic Info
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for the case study',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'Company or client name',
      validation: (rule) => rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Short tagline for display on cards (e.g., "Built a cutting-edge digital banking platform")',
      validation: (rule) => rule.max(150),
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Summary paragraph for the case study overview',
      group: 'content',
    }),

    // Media
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      description: 'Logo for display in case study cards and logo bars',
      options: {
        hotspot: false,
      },
      group: 'media',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Main screenshot for the case study hero section',
      options: {
        hotspot: true,
      },
      group: 'media',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      description: 'Additional screenshots for the case study detail page',
      group: 'media',
    }),

    // Categorization
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Engineering', value: 'engineering' },
          { title: 'Full-Funnel Marketing', value: 'full-funnel' },
          { title: 'Websites', value: 'websites' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'radio',
      },
      description: 'Primary category for filtering on the work page',
      group: 'metadata',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          { title: 'SaaS', value: 'saas' },
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Manufacturing', value: 'manufacturing' },
          { title: 'Financial Services', value: 'financial-services' },
          { title: 'Professional Services', value: 'professional-services' },
          { title: 'Technology', value: 'technology' },
          { title: 'Education', value: 'education' },
          { title: 'Retail & Ecommerce', value: 'retail-ecommerce' },
          { title: 'Media & Entertainment', value: 'media-entertainment' },
          { title: 'Travel & Hospitality', value: 'travel-hospitality' },
          { title: 'Consumer Products', value: 'consumer-products' },
          { title: 'Nonprofit', value: 'nonprofit' },
          { title: 'Legal', value: 'legal' },
          { title: 'Automotive', value: 'automotive' },
          { title: 'Sports & Entertainment', value: 'sports-entertainment' },
          { title: 'Venture Capital', value: 'venture-capital' },
          { title: 'AI / Technology', value: 'ai-technology' },
          { title: 'Home & Furniture', value: 'home-furniture' },
          { title: 'Grocery & Retail', value: 'grocery-retail' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (rule) => rule.required(),
      group: 'metadata',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage and featured sections',
      initialValue: false,
      group: 'metadata',
    }),

    // The Story
    defineField({
      name: 'challenge',
      title: 'The Challenge',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
      description: 'What problem did the client face?',
      group: 'content',
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
      ],
      description: 'How did we solve it?',
      group: 'content',
    }),

    // Results
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'metric',
              title: 'Metric',
              type: 'string',
              description: 'The number or percentage (e.g., "300%", "$2.5M", "47")',
              validation: (rule) => rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'What the metric represents (e.g., "Revenue Growth", "Pipeline Generated")',
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              metric: 'metric',
              label: 'label',
            },
            prepare({ metric, label }) {
              return {
                title: `${metric} ${label}`,
              }
            },
          },
        },
      ],
      description: 'Key metrics and results achieved',
      group: 'content',
    }),

    // Testimonial
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        {
          name: 'quote',
          title: 'Quote',
          type: 'text',
          rows: 4,
        },
        {
          name: 'author',
          title: 'Author Name',
          type: 'string',
        },
        {
          name: 'authorRole',
          title: 'Author Role',
          type: 'string',
          description: 'Job title and company (e.g., "VP of Marketing, ACME Corp")',
        },
      ],
      group: 'content',
    }),

    // Metadata
    defineField({
      name: 'services',
      title: 'Services Provided',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Branding', value: 'branding' },
          { title: 'Website', value: 'website' },
          { title: 'Paid Media', value: 'paid-media' },
          { title: 'Search Marketing', value: 'search-marketing' },
          { title: 'Content', value: 'content' },
          { title: 'CRM & Automation', value: 'crm-automation' },
          { title: 'Analytics', value: 'analytics' },
          { title: 'Platform Engineering', value: 'platform-engineering' },
          { title: 'Full-Stack Development', value: 'full-stack-development' },
          { title: 'API Design', value: 'api-design' },
          { title: 'Data Architecture', value: 'data-architecture' },
          { title: 'E-commerce Platform', value: 'ecommerce-platform' },
          { title: 'Email Marketing', value: 'email-marketing' },
        ],
      },
      group: 'metadata',
    }),
    defineField({
      name: 'phases',
      title: 'Methodology Phases',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Foundation', value: 'foundation' },
          { title: 'Activation', value: 'activation' },
          { title: 'Acceleration', value: 'acceleration' },
          { title: 'Retention', value: 'retention' },
        ],
      },
      description: 'Which phases of the METHOD were applied',
      group: 'metadata',
    }),
    defineField({
      name: 'teamLead',
      title: 'Team Lead',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      description: 'Primary team member responsible for this project',
      group: 'metadata',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'metadata',
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Client Name',
      name: 'clientAsc',
      by: [{ field: 'client', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      client: 'client',
      category: 'category',
      industry: 'industry',
      featured: 'featured',
      media: 'clientLogo',
    },
    prepare({ title, client, category, industry, featured, media }) {
      const star = featured ? '★ ' : ''
      const categoryLabel = category ? `[${category}]` : ''
      return {
        title: `${star}${client}`,
        subtitle: `${categoryLabel} ${title} · ${industry || 'No industry'}`,
        media,
      }
    },
  },
})

