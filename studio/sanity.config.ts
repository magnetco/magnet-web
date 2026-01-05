import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'magnet-website',
  title: 'Magnet Website',

  projectId: 'o28dq6x5',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Pages - placeholder
            S.listItem()
              .title('Pages')
              .child(S.list().title('Pages').items([])),

            // Posts with Categories nested
            S.listItem()
              .title('Posts')
              .child(
                S.list()
                  .title('Posts')
                  .items([
                    S.documentTypeListItem('post').title('All Posts'),
                    S.documentTypeListItem('category').title('Categories'),
                  ])
              ),

            // Case Studies
            S.listItem()
              .title('Case Studies')
              .child(S.documentTypeList('caseStudy').title('All Case Studies')),

            // Jobs with related types nested
            S.listItem()
              .title('Jobs')
              .child(
                S.list()
                  .title('Jobs')
                  .items([
                    S.documentTypeListItem('job').title('All Jobs'),
                    S.documentTypeListItem('jobLocation').title('Locations'),
                    S.documentTypeListItem('jobType').title('Job Types'),
                  ])
              ),

            // Team
            S.listItem()
              .title('Team')
              .child(S.documentTypeList('teamMember').title('All Members')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})

