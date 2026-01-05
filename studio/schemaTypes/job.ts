import { defineField, defineType } from 'sanity'

export const job = defineType({
  name: 'job',
  title: 'Job',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Job title (e.g., "Senior UI/UX Designer")',
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
      name: 'jobType',
      title: 'Job Type',
      type: 'reference',
      to: [{ type: 'jobType' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'jobLocation' }] }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this job is currently accepting applications',
      initialValue: true,
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main headline for the job detail page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
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
      description: 'Introduction paragraphs for the job posting',
    }),
    defineField({
      name: 'aboutRole',
      title: 'About the Role',
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
      description: 'Description of what the role involves',
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities',
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
      description: 'List of job responsibilities (each block will be a bullet point)',
    }),
    defineField({
      name: 'qualifications',
      title: 'Qualifications',
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
      description: 'List of required qualifications (each block will be a bullet point)',
    }),
    defineField({
      name: 'whyJoinUs',
      title: 'Why Join Us',
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
      description: 'Why candidates should join the company',
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
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      jobType: 'jobType.title',
      isActive: 'isActive',
    },
    prepare({ title, jobType, isActive }) {
      const status = isActive === false ? '🔴' : '🟢'
      return {
        title: `${status} ${title}`,
        subtitle: jobType || '',
      }
    },
  },
})

