---
name: Case Studies and Team Members
overview: Add Sanity schemas for Team Members and Case Studies with proper desk structure organization, TypeScript types, and GROQ queries.
todos:
  - id: schema-team
    content: Create teamMember.ts schema with name, role, image, bio, department, order
    status: completed
  - id: schema-case-study
    content: Create caseStudy.ts schema with client, challenge, solution, results, testimonial
    status: completed
  - id: register-schemas
    content: Add new schemas to schemaTypes/index.ts exports
    status: completed
  - id: desk-structure
    content: Update sanity.config.ts desk structure with Case Studies and Team sections
    status: completed
  - id: types
    content: Add TeamMember and CaseStudy TypeScript types to types.ts
    status: completed
  - id: queries
    content: Add GROQ queries for fetching team members and case studies
    status: completed
---

# Add Case Studies and Team Members to Sanity

## New Schema Files

### Team Member Schema ([`studio/schemaTypes/teamMember.ts`](studio/schemaTypes/teamMember.ts))

```typescript
// Fields based on current team page structure
{
  name: string              // "Gavin Hall"
  slug: slug                // "gavin-hall"
  role: string              // "CEO & Creative Director"
  image: image              // Sanity image with hotspot
  bio: portableText         // Rich text bio paragraphs
  department: string        // "leadership" | "team" (for grouping)
  order: number             // Display order within department
  isActive: boolean         // Show/hide on site
}
```

### Case Study Schema ([`studio/schemaTypes/caseStudy.ts`](studio/schemaTypes/caseStudy.ts))

```typescript
{
  title: string             // "How We Helped ACME Grow 300%"
  slug: slug
  client: string            // "ACME Corporation"
  clientLogo: image         // For logo bar display
  industry: string          // "SaaS" | "Healthcare" | "Manufacturing" etc.
  featured: boolean         // Show on homepage
  
  // The story
  challenge: portableText   // What problem they faced
  solution: portableText    // How we solved it
  
  // Results with metrics
  results: array of {
    metric: string          // "300%"
    label: string           // "Revenue Growth"
  }
  
  // Social proof
  testimonial: {
    quote: text
    author: string
    authorRole: string
  }
  
  // Metadata
  services: string[]        // ["Branding", "Website", "Paid Media"]
  phases: string[]          // ["foundation", "activation"]
  publishedAt: datetime
  teamLead: reference       // Link to team member
}
```

## File Changes

| File | Change |
|------|--------|
| [`studio/schemaTypes/teamMember.ts`](studio/schemaTypes/teamMember.ts) | Create new schema |
| [`studio/schemaTypes/caseStudy.ts`](studio/schemaTypes/caseStudy.ts) | Create new schema |
| [`studio/schemaTypes/index.ts`](studio/schemaTypes/index.ts) | Add new exports |
| [`studio/sanity.config.ts`](studio/sanity.config.ts) | Add to desk structure under Posts and new Case Studies section |
| [`website/src/lib/sanity/types.ts`](website/src/lib/sanity/types.ts) | Add TypeScript types |
| [`website/src/lib/sanity/queries.ts`](website/src/lib/sanity/queries.ts) | Add GROQ queries |

## Updated Desk Structure

```
Pages (placeholder)
Posts
  └── All Posts
  └── Categories
Case Studies
  └── All Case Studies
Jobs
  └── All Jobs
  └── Departments
  └── Locations
  └── Job Types
Team
  └── All Members
```

## Migration Path

Once schemas are in place, you can migrate the 14 hardcoded team members from [`website/src/app/team/page.tsx`](website/src/app/team/page.tsx) into Sanity and update that page to fetch from CMS.