# Case Studies Section - Implementation Plan

## Current Status

The case studies infrastructure is **mostly complete** but needs content population and minor enhancements.

### What Exists

**Backend (Complete)**
- Sanity CMS schema: [`studio/schemaTypes/caseStudy.ts`](../studio/schemaTypes/caseStudy.ts)
- TypeScript types: [`website/src/lib/sanity/types.ts`](../website/src/lib/sanity/types.ts)
- Sanity queries: [`website/src/lib/sanity/queries.ts`](../website/src/lib/sanity/queries.ts)

**Frontend Pages (Complete)**
- Main work landing: [`website/src/app/work/page.tsx`](../website/src/app/work/page.tsx)
- Individual case studies: [`website/src/app/work/[slug]/page.tsx`](../website/src/app/work/[slug]/page.tsx)
- Category pages:
  - [`website/src/app/work/engineering/page.tsx`](../website/src/app/work/engineering/page.tsx)
  - [`website/src/app/work/full-funnel/page.tsx`](../website/src/app/work/full-funnel/page.tsx)
  - [`website/src/app/work/websites/page.tsx`](../website/src/app/work/websites/page.tsx)

### What's Missing

1. **Content Population** - Case studies exist as placeholder data, need real client stories
2. **Homepage Integration** - Homepage references case studies but uses placeholder screenshots instead of dynamic Sanity data
3. **Navigation Links** - Main nav may not include "Work" link
4. **Industry Filtering** - Industry grid exists but may need case study connections

## Content Source: magnet.co

**Available case studies to import from magnet.co/case-studies:**

1. **BSI Engineering** - Engineering firm website redesign
   - Results: 27% reduction in CPL, 56% increase in enquiries
   - Services: Website strategy, UI/UX, Webflow development, SEO
   - Category: Websites
   - Industry: Professional Services

2. **Commonwealth Inc** - Logistics provider website
   - Results: 200% ROI in 3 days after launch
   - Services: UI/UX, Custom development, SEO, Mobile optimization
   - Category: Websites
   - Industry: Professional Services

3. **O'Keeffe's** - Household brand digital presence
   - Results: 30% increase in engagement, 20% conversion uplift, 40% faster load times
   - Services: Brand alignment, Custom landing pages, Performance optimization
   - Category: Websites / Ecommerce
   - Industry: Consumer Products

4. **Bendu BJJ Academy** - Startup gym with integrated memberships
5. **Windward Bank** - Digital banking platform
6. **Voltic** - Electrical automotive company
7. **Directions Group** - Research company rebrand
8. **The Grocery Runners** - Grocery delivery company
9. **Katz Teller** - Law firm website
10. **TruBlue House Care** - Franchise website platform
11. **Wanamakers** - Thoroughbred horse auction platform

## Implementation Strategy

### Phase 1: Content Import & Population (Priority)

Import case studies from magnet.co into Sanity Studio.

**Approach:**
1. **Scrape remaining case study pages** from magnet.co to gather full content
2. **Map content to Sanity schema** - Transform scraped data into Sanity format
3. **Download and upload images** - Client logos and hero images from Webflow CDN
4. **Create case studies in Sanity** - Use Sanity Studio or API to bulk import
5. **Set featured flags** - Mark top 3-5 for homepage display

**Content structure per case study:**
- Client name and logo (from scraped data)
- Industry classification (infer from content)
- Category (websites, full-funnel, engineering, ecommerce)
- Headline/description (from listing page)
- Challenge section (from "Assignment" section)
- Solution section (from "Approach" section)
- Results (extract metrics from results section)
- Testimonial (from "Kind words" section)
- Services provided (from "Scope" section)
- Images (hero image, additional screenshots)

### Phase 2: Homepage Integration

Update homepage to dynamically pull featured case studies from Sanity instead of hardcoded placeholders.

**Files to modify:**
- [`website/src/app/page.tsx`](../website/src/app/page.tsx) - Line 367 has "Case studies" section with placeholder links

**Changes:**
- Replace hardcoded `galleryItems` with dynamic fetch from `featuredCaseStudiesQuery`
- Update placeholder links (`href="#"`) to actual case study URLs (`/work/[slug]`)
- Ensure featured case studies have the `featured: true` flag in Sanity

### Phase 3: Navigation Enhancement

Ensure "Work" link is prominent in main navigation.

**Files to check:**
- Navigation component (likely in `website/src/components/`)
- Add "Work" to main nav if not present
- Consider dropdown showing: Engineering, Full-Funnel, Websites

### Phase 4: Industry Filtering

Connect industry grid to actual case studies.

**Files to modify:**
- [`website/src/app/work/page.tsx`](../website/src/app/work/page.tsx) - IndustriesGrid component
- Create industry landing pages if needed (`/work/industry/[slug]`)
- Filter case studies by industry tag

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Sanity Studio                          │
│  Content editors create case studies with:                  │
│  - Client info, logo, industry                              │
│  - Challenge, solution, results                             │
│  - Category (engineering/full-funnel/websites)              │
│  - Featured flag                                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Sanity Queries                            │
│  - caseStudiesQuery (all)                                   │
│  - featuredCaseStudiesQuery (homepage)                      │
│  - caseStudiesByCategoryQuery (category pages)              │
│  - caseStudyBySlugQuery (detail page)                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Pages                           │
│  /work                  - Main landing with all categories  │
│  /work/engineering      - Engineering case studies          │
│  /work/full-funnel      - Full-funnel case studies          │
│  /work/websites         - Website case studies              │
│  /work/[slug]           - Individual case study detail      │
│  /                      - Homepage featured case studies    │
└─────────────────────────────────────────────────────────────┘
```

## Data Model Reference

From [`studio/schemaTypes/caseStudy.ts`](../studio/schemaTypes/caseStudy.ts):

**Core Fields:**
- `title` - Internal title
- `slug` - URL slug
- `client` - Company name
- `clientLogo` - Logo image
- `industry` - Industry classification
- `category` - Work type (engineering, full-funnel, ecommerce, other)
- `featured` - Show on homepage

**Content Fields:**
- `challenge` - Rich text describing client problem
- `solution` - Rich text describing approach
- `results` - Array of `{metric, label}` objects
- `testimonial` - Object with `{quote, author, authorRole}`

**Metadata:**
- `services` - Array of service tags
- `phases` - Methodology phases applied
- `teamLead` - Reference to team member
- `publishedAt` - Publication date

## Success Criteria

- [ ] At least 5 case studies published in Sanity with complete content
- [ ] Homepage dynamically displays featured case studies (no placeholder links)
- [ ] All category pages (/work/engineering, /work/full-funnel, /work/websites) show real case studies
- [ ] Individual case study pages render with full content, images, and testimonials
- [ ] "Work" link visible in main navigation
- [ ] Industry filtering functional (if implemented)

## Estimated Effort

- **Content import script**: 2-3 hours (scrape all case studies, transform data)
- **Image download/upload**: 1-2 hours (download from CDN, upload to Sanity)
- **Sanity bulk import**: 1-2 hours (create case studies via Studio or API)
- **Content review/cleanup**: 2-3 hours (verify formatting, fix issues)
- **Homepage integration**: 1-2 hours
- **Navigation updates**: 30 minutes
- **Industry filtering**: 2-3 hours (if implementing new pages)
- **Testing and polish**: 1-2 hours

**Total**: 11-18 hours (significantly reduced due to existing content on magnet.co)

## Notes

The technical foundation is solid. The main work is **content creation** - gathering client logos, writing compelling case study narratives, collecting testimonials, and documenting results. Consider:

1. **Client approval process** - Some clients may require approval before publishing
2. **Asset collection** - High-quality logos, screenshots, and photos
3. **Results validation** - Ensure metrics are accurate and approved
4. **Testimonial gathering** - Reach out to clients for quotes if not already collected

This is primarily a **content and marketing task** rather than a development task.
