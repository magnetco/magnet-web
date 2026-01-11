---
name: Section Standardization Audit
overview: Audit all 61 section components and 45 pages to ensure consistent use of GridBg diagonal lines and Eyebrow components, standardizing on the Section wrapper element where appropriate.
todos:
  - id: audit-tier2
    content: Audit Tier 2 components (have GridBg) for Eyebrow consistency
    status: pending
  - id: audit-tier3
    content: Add GridBgSection to Tier 3 components missing diagonal lines
    status: pending
  - id: verify-eyebrow-props
    content: Ensure all content sections have eyebrow prop and use Eyebrow component
    status: pending
---

# Section Standardization Audit

## Current State

The codebase has a `Section` wrapper element ([`website/src/components/elements/section.tsx`](website/src/components/elements/section.tsx)) that provides:

- GridBgSection with diagonal stripes (via `withGridBg` prop, default true)
- Eyebrow component support
- Consistent header pattern (eyebrow, headline, subheadline, cta)

**Current usage:**

- 13 section components use the `Section` wrapper (already standardized)
- 19 section components import GridBg directly (partial standardization)
- 12 section components import Eyebrow directly
- 20 section components have an `eyebrow` prop in their interface

## Exclusions (no changes needed)

These component types have specialized layouts that should NOT use the standard Section wrapper:

- **Navbars (3):** navbar-with-logo-actions-and-centered-links, navbar-with-logo-actions-and-left-aligned-links, navbar-with-links-actions-and-centered-logo
- **Footers (3):** footer-with-link-categories, footer-with-links-and-social-icons, footer-with-newsletter-form-categories-and-social-icons  
- **Heroes (9):** All hero-* components have full-width specialized layouts
- **Case Study Hero (1):** Specialized layout

## Components to Audit

### Tier 1: Already use Section wrapper (13 components - no changes)

- stats-four-columns, pricing-multi-tier, testimonials-three-column-grid, approach, stats-with-graph, features-three-column-with-demos, team-four-column-grid, features-with-large-demo, team-three-column-grid, features-two-column-with-demos, features-three-column, features-stacked-alternating-with-demos, brands-cards-multi-column

### Tier 2: Have GridBg but custom implementation (review for Eyebrow)

- testimonials-animated-grid
- team-carousel
- job-detail
- call-to-action-simple
- careers-listing
- document-centered
- interactive-cards-grid
- pricing-compact
- faqs-with-chat
- features-bento-grid
- pricing-retainer-hero
- call-to-action-with-email

### Tier 3: Missing GridBg entirely (need GridBgSection added)

- testimonial-two-column-with-large-photo
- testimonial-with-large-quote
- stats-three-column-with-description
- faqs-accordion
- faqs-two-column-accordion
- call-to-action-simple-centered
- pricing-ads
- pricing-branding
- pricing-search
- pricing-service-with-retainer
- pricing-services-grid
- pricing-single-tier-two-column
- pricing-websites
- plan-comparison-table
- contact-form
- document-left-aligned
- service-process
- team-card-grid
- team-with-bios

### Tier 4: Pages with inline sections (none found - good!)

## Implementation Approach

For each Tier 2/3 component, evaluate:

1. **Can it use the Section wrapper?** If the component has a simple header pattern (eyebrow + headline + subheadline), refactor to use Section.

2. **If not, add GridBgSection manually:** For complex layouts, wrap content in GridBgSection and add Eyebrow where an eyebrow prop exists.

3. **Add eyebrow prop if missing:** If the component doesn't have an eyebrow prop but could benefit from one, add it.

## Estimated Scope

- ~19 components in Tier 3 need GridBg added
- ~12 components in Tier 2 need review for Eyebrow consistency
- Total: ~31 components to review/modify