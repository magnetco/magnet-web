import { defineField, defineType } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for the case study',
      validation: (rule) => rule.required(),
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
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'Company or client name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      description: 'Logo for display in case study cards and logo bars',
      options: {
        hotspot: false,
      },
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
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show on homepage and featured sections',
      initialValue: false,
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
        ],
      },
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
    }),
    defineField({
      name: 'teamLead',
      title: 'Team Lead',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      description: 'Primary team member responsible for this project',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
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
      industry: 'industry',
      featured: 'featured',
      media: 'clientLogo',
    },
    prepare({ title, client, industry, featured, media }) {
      const star = featured ? '★ ' : ''
      return {
        title: `${star}${client}`,
        subtitle: `${title} · ${industry}`,
        media,
      }
    },
  },
})

