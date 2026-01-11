---
name: Link Case Studies to Services
overview: Create a new Engineering service page, add it to navigation, and add case study sections to all service pages (Websites, Branding, Paid Ads, Search Marketing, Engineering) that link to the appropriate case studies.
todos:
  - id: case-studies-component
    content: Create reusable CaseStudiesPreview section component
    status: completed
  - id: data-helpers
    content: Add getCaseStudiesByService helper function to data.ts
    status: completed
  - id: engineering-page
    content: Create new /engineering service page with full structure
    status: completed
  - id: service-process
    content: Add engineering service type to ServiceProcess component
    status: completed
  - id: update-nav
    content: Add Engineering to header nav and footer
    status: completed
  - id: websites-case-studies
    content: Add case studies section to /websites page
    status: completed
  - id: branding-case-studies
    content: Add case studies section to /branding page
    status: completed
  - id: ads-case-studies
    content: Add case studies section to /ads page
    status: completed
  - id: search-case-studies
    content: Add case studies section to /search page
    status: completed
---

# Link Case Studies to Service Pages

## Overview

Add case study sections to all service pages and create a new standalone Engineering service page. Users will discover case studies through the service pages they're interested in, with "Work" remaining in the header as a secondary hub.

---

## Navigation Changes

Update [website/src/app/layout.tsx](website/src/app/layout.tsx):

**Header Nav** (add Engineering):
```tsx
<NavbarLink href="/work">Work</NavbarLink>
<NavbarLink href="/engineering">Engineering</NavbarLink>  // NEW
<NavbarLink href="/branding">Branding</NavbarLink>
<NavbarLink href="/websites">Websites</NavbarLink>
<NavbarLink href="/ads">Paid Ads</NavbarLink>
<NavbarLink href="/search">Search Marketing</NavbarLink>
```

**Footer** (add Engineering to Services):
```tsx
<FooterCategory title="Services">
  <FooterLink href="/engineering">Engineering</FooterLink>
  <FooterLink href="/websites">Websites</FooterLink>
  <FooterLink href="/branding">Branding</FooterLink>
  <FooterLink href="/search">Search Marketing</FooterLink>
  <FooterLink href="/ads">Paid Ads</FooterLink>
</FooterCategory>
```

---

## New Engineering Service Page

Create [website/src/app/engineering/page.tsx](website/src/app/engineering/page.tsx):

A dedicated service page for full-stack engineering work, following the same structure as other service pages:

**Sections:**
1. Hero with TabbedLogoGallery (McGraw Hill, HGTV, IKEA, Expedia, UCLA)
2. Capabilities (FeaturesBentoGrid) - Platform Engineering, Full-Stack Dev, API Design, etc.
3. Pricing section (create new `PricingEngineering` component or inline)
4. Process section (`ServiceProcess` with service="engineering")
5. Stats section
6. **Case Studies section** - Featured engineering projects with links to `/work/mcgraw-hill`, etc.
7. Testimonial
8. FAQs
9. CTA

---

## Create Reusable Case Studies Section Component

Create [website/src/components/sections/case-studies-preview.tsx](website/src/components/sections/case-studies-preview.tsx):

A reusable section component that displays 2-3 featured case studies with a "View all" link:

```tsx
interface CaseStudiesPreviewProps {
  eyebrow?: string
  headline: string
  subheadline?: ReactNode
  caseStudies: CaseStudy[]
  viewAllHref: string
  viewAllText?: string
}
```

This component will be used on all service pages.

---

## Add Case Studies to Each Service Page

### 1. Websites Page ([website/src/app/websites/page.tsx](website/src/app/websites/page.tsx))
- Add `CaseStudiesPreview` section after Process, before Stats
- Filter case studies that include "Website" or "E-commerce Platform" in services
- Link to `/work` or `/work/ecommerce`

### 2. Branding Page ([website/src/app/branding/page.tsx](website/src/app/branding/page.tsx))
- Add `CaseStudiesPreview` section after Process, before Stats
- Filter case studies that include "Brand Strategy" in services
- Link to `/work/full-funnel`

### 3. Paid Ads Page ([website/src/app/ads/page.tsx](website/src/app/ads/page.tsx))
- Add `CaseStudiesPreview` section after Process, before Stats
- Filter case studies that include "Paid Media" in services
- Link to `/work/full-funnel`

### 4. Search Marketing Page ([website/src/app/search/page.tsx](website/src/app/search/page.tsx))
- Add `CaseStudiesPreview` section after Process, before Stats
- Filter case studies that include "Search Marketing" in services
- Link to `/work/full-funnel`

### 5. Engineering Page (new)
- Add `CaseStudiesPreview` section with engineering case studies
- Link to `/work/engineering`

---

## Update Case Studies Data

Add service tags to [website/src/lib/case-studies/data.ts](website/src/lib/case-studies/data.ts) to enable filtering:

```typescript
// Add helper function to get case studies by service
export function getCaseStudiesByService(service: string): CaseStudy[] {
  return allCaseStudies.filter((cs) => 
    cs.services.some(s => s.toLowerCase().includes(service.toLowerCase()))
  )
}
```

---

## File Changes Summary

| File | Action |
|------|--------|
| `website/src/app/layout.tsx` | Add Engineering to nav |
| `website/src/app/engineering/page.tsx` | Create new page |
| `website/src/components/sections/case-studies-preview.tsx` | Create new component |
| `website/src/components/sections/service-process.tsx` | Add "engineering" service type |
| `website/src/app/websites/page.tsx` | Add case studies section |
| `website/src/app/branding/page.tsx` | Add case studies section |
| `website/src/app/ads/page.tsx` | Add case studies section |
| `website/src/app/search/page.tsx` | Add case studies section |
| `website/src/lib/case-studies/data.ts` | Add service filter helper |

---

## Page Flow Diagram

```mermaid
graph TD
    subgraph HeaderNav [Header Navigation]
        Work[Work]
        Eng[Engineering]
        Brand[Branding]
        Web[Websites]
        Ads[Paid Ads]
        Search[Search Marketing]
    end

    subgraph ServicePages [Service Pages]
        EngPage["/engineering"]
        BrandPage["/branding"]
        WebPage["/websites"]
        AdsPage["/ads"]
        SearchPage["/search"]
    end

    subgraph CaseStudyHub [Case Studies Hub]
        WorkMain["/work"]
        WorkEng["/work/engineering"]
        WorkFunnel["/work/full-funnel"]
        WorkEcom["/work/ecommerce"]
    end

    subgraph Individual [Individual Case Studies]
        McGraw["/work/mcgraw-hill"]
        Others["Other case studies..."]
    end

    Eng --> EngPage
    Brand --> BrandPage
    Web --> WebPage
    Ads --> AdsPage
    Search --> SearchPage
    Work --> WorkMain

    EngPage -->|"Case Studies Section"| WorkEng
    BrandPage -->|"Case Studies Section"| WorkFunnel
    WebPage -->|"Case Studies Section"| WorkEcom
    AdsPage -->|"Case Studies Section"| WorkFunnel
    SearchPage -->|"Case Studies Section"| WorkFunnel

    WorkEng --> McGraw
    WorkFunnel --> Others
    WorkEcom --> Others
```