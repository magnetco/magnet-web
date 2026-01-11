---
name: Sanity Studio Menu Reorganization
overview: "Add a custom desk structure to Sanity Studio that organizes content into three top-level groups: Pages (placeholder), Posts (with Categories nested), and Jobs (with Departments, Locations, Types nested)."
todos:
  - id: structure
    content: Add custom desk structure to sanity.config.ts with Pages/Posts/Jobs hierarchy
    status: completed
---

# Reorganize Sanity Studio Menu Structure

## Current State
The studio uses default `structureTool()` which lists all 6 document types flat in the sidebar.

## Proposed Structure

```
Pages (placeholder - coming soon)
Posts
  └── All Posts
  └── Categories
Jobs
  └── All Jobs
  └── Departments
  └── Locations
  └── Job Types
```

## Implementation

Modify [`studio/sanity.config.ts`](studio/sanity.config.ts) to pass a custom structure to `structureTool()`:

```typescript
import { structureTool } from 'sanity/structure'

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
        
        // Jobs with related types nested
        S.listItem()
          .title('Jobs')
          .child(
            S.list()
              .title('Jobs')
              .items([
                S.documentTypeListItem('job').title('All Jobs'),
                S.documentTypeListItem('department').title('Departments'),
                S.documentTypeListItem('jobLocation').title('Locations'),
                S.documentTypeListItem('jobType').title('Job Types'),
              ])
          ),
      ]),
})
```

This is a single-file change that keeps all existing schemas intact.