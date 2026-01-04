import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
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
      name: 'phase',
      title: 'Phase',
      type: 'string',
      description: 'Which METHOD phase this category belongs to',
      options: {
        list: [
          { title: 'Foundation', value: 'foundation' },
          { title: 'Activation', value: 'activation' },
          { title: 'Acceleration', value: 'acceleration' },
          { title: 'Retention', value: 'retention' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      phase: 'phase',
    },
    prepare({ title, phase }) {
      const phaseLabels: Record<string, string> = {
        foundation: '1. Foundation',
        activation: '2. Activation',
        acceleration: '3. Acceleration',
        retention: '4. Retention',
      }
      return {
        title,
        subtitle: phaseLabels[phase] || phase,
      }
    },
  },
})

