import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'postType',
      title: 'Post Type',
      type: 'string',
      description: 'Link posts redirect to external URLs. Article posts have full content.',
      options: {
        list: [
          { title: 'External Link', value: 'link' },
          { title: 'Article', value: 'article' },
        ],
        layout: 'radio',
      },
      initialValue: 'article',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      description: 'Required for link posts',
      hidden: ({ parent }) => parent?.postType !== 'link',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { postType?: string }
          if (parent?.postType === 'link' && !value) {
            return 'External URL is required for link posts'
          }
          return true
        }),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Brief description shown in post listings',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) =>
                      rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      hidden: ({ parent }) => parent?.postType !== 'article',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      description: 'Tag posts with an industry to show on industry landing pages',
      options: {
        list: [
          { title: 'Healthcare', value: 'healthcare' },
          { title: 'Manufacturing', value: 'manufacturing' },
          { title: 'Financial Services', value: 'financial-services' },
          { title: 'Professional Services', value: 'professional-services' },
          { title: 'Education', value: 'education' },
          { title: 'Retail & Ecommerce', value: 'retail-ecommerce' },
          { title: 'Media & Entertainment', value: 'media-entertainment' },
          { title: 'Travel & Hospitality', value: 'travel-hospitality' },
          { title: 'Nonprofit', value: 'nonprofit' },
          { title: 'Sports & Entertainment', value: 'sports-entertainment' },
          { title: 'Technology', value: 'technology' },
          { title: 'SaaS', value: 'saas' },
        ],
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      postType: 'postType',
      category: 'category.title',
      industry: 'industry',
      date: 'publishedAt',
    },
    prepare({ title, postType, category, industry, date }) {
      const typeLabel = postType === 'link' ? '🔗' : '📝'
      const dateStr = date ? new Date(date).toLocaleDateString() : ''
      return {
        title: `${typeLabel} ${title}`,
        subtitle: [category, industry, dateStr].filter(Boolean).join(' · '),
      }
    },
  },
})

