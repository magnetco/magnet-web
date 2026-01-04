import { defineField, defineType } from 'sanity'

export const jobLocation = defineType({
  name: 'jobLocation',
  title: 'Job Location',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Full location name (e.g., "Cincinnati, Ohio")',
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
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which locations appear in dropdowns (lower numbers first)',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      city: 'city',
      state: 'state',
    },
    prepare({ title, city, state }) {
      const subtitle = [city, state].filter(Boolean).join(', ')
      return {
        title,
        subtitle: subtitle || undefined,
      }
    },
  },
})

