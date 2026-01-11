---
name: Team Section Redesign
overview: Replace the current team page with an editorial-style layout featuring a unified team (no department divisions). Featured members get large cards with full bios visible; others appear in a varied grid. Content fetched from Sanity.
todos:
  - id: sanity-schema
    content: Add 'featured' boolean field to teamMember Sanity schema to control which members get prominent display
    status: completed
  - id: sanity-queries
    content: Simplify queries - use single teamMembersQuery ordered by 'order' field
    status: completed
  - id: editorial-component
    content: Create team-editorial.tsx component with featured cards (full bio) + varied grid for others
    status: completed
  - id: team-page
    content: Rewrite team page to fetch from Sanity and use new editorial component
    status: completed
---

# Team Section Redesign

## Current State

The team page at [`website/src/app/team/page.tsx`](website/src/app/team/page.tsx) uses hardcoded team member data with a `TeamCardGrid` component. Data is not from Sanity, and the page artificially separates "Leadership" from "Extended Team".

## Design Direction

**Editorial mix layout** - inspired by the varied card sizes in the screenshot:
- **Featured members**: Large, full-width or half-width cards with photo + full bio displayed inline
- **Other members**: Varied grid layout (like screenshot) with smaller cards, bio shown on click/hover
- **No department divisions**: Team feels unified and intertwined
- **Order controlled via Sanity**: `order` field determines sequence, `featured` boolean controls prominence

## Changes Required

### 1. Update Sanity Schema

Add a `featured` field to [`studio/schemaTypes/teamMember.ts`](studio/schemaTypes/teamMember.ts):

```typescript
defineField({
  name: 'featured',
  title: 'Featured',
  type: 'boolean',
  description: 'Featured members get large cards with full bio on the team page',
  initialValue: false,
}),
```

### 2. Simplify Sanity Queries

Update [`website/src/lib/sanity/queries.ts`](website/src/lib/sanity/queries.ts):
- Remove the `leadershipTeamQuery` and `extendedTeamQuery` (department-based)
- Keep/update `teamMembersQuery` to fetch all active members ordered by `order` field
- Include the new `featured` field in the query response

### 3. Create Editorial Team Component

Create new component at `website/src/components/sections/team-editorial.tsx`:

**Featured Section** (top):
- Team members where `featured: true`
- Large cards: photo on one side, name/role/full bio on the other
- Alternating left/right photo placement for visual rhythm
- Uses `PortableText` to render Sanity bio content

**Grid Section** (below):
- Remaining team members (`featured: false`)
- Varied card sizes similar to screenshot (masonry-like)
- Smaller photos with name/role visible
- Click or hover to expand and show bio (reuse animation pattern from `team-carousel.tsx`)

### 4. Rewrite Team Page

Update [`website/src/app/team/page.tsx`](website/src/app/team/page.tsx):
- Remove all hardcoded team data (300+ lines)
- Fetch team members from Sanity using `teamMembersQuery`
- Split into featured vs non-featured in the component
- Keep hero section and careers CTA
