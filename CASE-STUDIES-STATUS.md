# Case Studies Import Status

## Summary

Successfully scraped 8 case studies from magnet.co and prepared them for import into Sanity CMS. The case studies are in the database but need category corrections to display properly on the website.

## What Was Completed

### ✅ Scraped Case Studies from magnet.co

Successfully scraped the following case studies with full content:

1. **BSI Engineering** - Modernizing a Midwestern Engineering Leader's Website
   - Results: 27% reduction in CPL, 56% increase in enquiries
   - Testimonial from Monica Prather

2. **Commonwealth Inc** - A 200% ROI just 3 days after website relaunch
   - Results: 200% ROI in 3 days
   - Testimonial from Brent Collins

3. **O'Keeffe's** - Revitalizing a household brand's digital presence
   - Results: 30% increase in engagement, 20% conversion uplift, 40% faster load times
   - Testimonial from Barry Williams

4. **Directions Group** - An engaging visual rebrand for a leading Cincinnati based research company
   - Results: 23% increase in decision stage conversions, 2.8x increase in ad CTR

5. **The Grocery Runners** - Exciting organic curves and shapes for a growing grocery delivery company

6. **Katz Teller** - A fresh look for an established Cincinnati law firm

7. **TruBlue House Care** - A franchise website platform for a professional services company
   - Results: 30% increase in users, 58% increase in pageviews, 9% growth in session duration
   - Testimonial from Sean Fitzgerald

8. **Wanamakers** - A bespoke auction platform for a thoroughbred horse trading startup
   - Testimonial from Jack Carlino

### ✅ Created Import Scripts

- `studio/seed-case-studies.ts` - Main import script with all case study data
- `studio/test-query.ts` - Query testing script
- `studio/test-category-query.ts` - Category-specific query testing
- `studio/delete-imported.ts` - Cleanup script

### ✅ Verified Sanity Database

Total case studies in Sanity: **32**

**By Category:**
- Engineering: 10 case studies (IKEA ⭐, HGTV ⭐, McGraw Hill ⭐, etc.)
- Full-Funnel: 5 case studies (Directions Group ⭐, Voltic, Vitis Tech, TruBlue House Care, Brandience)
- Websites: **0 case studies** ⚠️
- Ecommerce: 7 case studies (Gorilla Glue ⭐, Kroger ⭐, O'Keeffe's, etc.)
- Other: 10 case studies (BSI Engineering, Commonwealth Inc, Windward Bank, etc.)

## What Needs Manual Correction

### ⚠️ Category Mismatches

The following case studies are categorized as "other" but should be "websites":

1. BSI Engineering
2. Commonwealth Inc
3. Windward Bank
4. Katz Teller
5. Wanamakers
6. Enthusiast Auto
7. Florence Y'alls
8. Gotham Soccer
9. Luxottica
10. Serene Suites

### ⚠️ Ecommerce Category Issue

The Sanity schema only defines 4 categories:
- `engineering`
- `full-funnel`
- `websites`
- `other`

However, 7 case studies use "ecommerce" category which isn't in the schema. These should be recategorized to either "websites" or kept as a new category if the schema is updated.

## How to Fix

### Option 1: Manual Update via Sanity Studio (Recommended)

1. Open Sanity Studio: http://localhost:3333
2. Navigate to "Case Studies"
3. For each case study that needs updating:
   - Click on the case study
   - Change the "Category" field to the correct value
   - Click "Publish"

**Case studies to update to "websites" category:**
- BSI Engineering
- Commonwealth Inc
- Windward Bank
- Katz Teller
- Wanamakers

### Option 2: Update Sanity Token Permissions

The current API token (`SANITY_WRITE_TOKEN`) only has "create" permissions. To enable programmatic updates:

1. Go to https://www.sanity.io/manage
2. Select project "o28dq6x5"
3. Go to API settings
4. Create a new token with "Editor" permissions
5. Update `.env.local` with the new token
6. Run the update script

### Option 3: Add "ecommerce" to Schema

If you want to keep "ecommerce" as a separate category:

1. Edit `studio/schemaTypes/caseStudy.ts`
2. Add to the category options:
   ```typescript
   { title: 'E-commerce', value: 'ecommerce' },
   ```
3. Update frontend pages to query and display ecommerce case studies

## Current Website Status

### Pages Working
- `/work` - Main work landing page (shows engineering and full-funnel case studies)
- `/work/engineering` - Shows 10 engineering case studies
- `/work/full-funnel` - Shows 5 full-funnel case studies

### Pages Empty
- `/work/websites` - **Shows 0 case studies** because none are categorized as "websites"

### Homepage
- Currently uses hardcoded placeholder data instead of dynamic Sanity data
- Needs to be updated to fetch featured case studies from Sanity

## Next Steps

1. **Fix Category Assignments** (Manual via Sanity Studio)
   - Update BSI Engineering → websites
   - Update Commonwealth Inc → websites
   - Update Windward Bank → websites
   - Update Katz Teller → websites
   - Update Wanamakers → websites

2. **Update Homepage** (Code Change)
   - Replace hardcoded `galleryItems` in `website/src/app/page.tsx`
   - Fetch featured case studies from Sanity
   - Display dynamically

3. **Add Client Logos** (Asset Upload)
   - Download logos from magnet.co CDN
   - Upload to Sanity for each case study
   - URLs are in the import script

4. **Test All Pages**
   - Verify `/work` shows all categories
   - Verify `/work/websites` shows case studies
   - Verify `/work/[slug]` pages load correctly
   - Verify homepage displays featured case studies

## Files Created

- `/Users/gavin/Projects/magnet-web/studio/seed-case-studies.ts`
- `/Users/gavin/Projects/magnet-web/studio/test-query.ts`
- `/Users/gavin/Projects/magnet-web/studio/test-category-query.ts`
- `/Users/gavin/Projects/magnet-web/studio/delete-imported.ts`
- `/Users/gavin/Projects/magnet-web/context/PLAN-CASE-STUDIES.md`
- `/Users/gavin/Projects/magnet-web/CASE-STUDIES-STATUS.md` (this file)

## Case Study Data

All scraped case study data is preserved in `studio/seed-case-studies.ts` including:
- Full challenge/solution/implementation text
- Results with metrics
- Testimonials with author names
- Service tags
- Hero image URLs
- Publication dates

This data can be re-imported or used as reference for manual entry.
