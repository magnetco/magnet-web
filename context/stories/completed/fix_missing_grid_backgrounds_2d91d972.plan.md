---
name: Fix Missing Grid Backgrounds
overview: Many sections across the site are missing the diagonal grid background pattern because they don't pass `withGridBg` prop. The fix involves either changing the default to `true` in the Section component, or adding `withGridBg` to each affected section.
todos:
  - id: change-default
    content: Change `withGridBg` default from `false` to `true` in Section component
    status: completed
  - id: verify-sections
    content: Verify all sections render correctly with new default
    status: completed
  - id: opt-out-if-needed
    content: Add `withGridBg={false}` to any sections that shouldn't have the grid (if any)
    status: completed
---

# Fix Missing Diagonal Grid Backgrounds

## Problem Summary

The diagonal grid background (`GridBgSection`) should appear on most sections, but many pages are missing it because:
1. Sections use the `Section` component which has `withGridBg` defaulting to `false`
2. Pages aren't consistently passing `withGridBg={true}` to their sections

## Affected Components

These section components use the `Section` element (supporting `withGridBg`):
- `StatsWithGraph` - used on 20+ pages, only homepage passes `withGridBg`
- `FeaturesThreeColumn` - used on contact page without `withGridBg`
- `TestimonialThreeColumnGrid` - used on 15+ method pages without `withGridBg`
- `FeaturesTwoColumnWithDemos`
- `FeaturesThreeColumnWithDemos`
- `FeaturesStackedAlternatingWithDemos`
- And others

## Pages Missing Grid Background

Key pages with missing grid bg on sections:

- [website/src/app/contact/page.tsx](website/src/app/contact/page.tsx): `StatsWithGraph`, `FeaturesThreeColumn`, `TestimonialThreeColumnGrid`
- [website/src/app/branding/page.tsx](website/src/app/branding/page.tsx): `StatsWithGraph`
- [website/src/app/ads/page.tsx](website/src/app/ads/page.tsx): `StatsWithGraph`
- [website/src/app/search/page.tsx](website/src/app/search/page.tsx): `StatsWithGraph`
- [website/src/app/method/page.tsx](website/src/app/method/page.tsx): `StatsWithGraph`, `TestimonialThreeColumnGrid`
- All `/method/*/` subpages: `StatsWithGraph`, `TestimonialThreeColumnGrid`

## Recommended Fix

**Option A (Recommended): Change default to `withGridBg={true}`**

Edit [website/src/components/elements/section.tsx](website/src/components/elements/section.tsx) line 17:

```tsx
// Change from:
withGridBg = false,
// To:
withGridBg = true,
```

This makes grid bg the default behavior, matching the homepage design intent. Pages that explicitly need NO grid can pass `withGridBg={false}`.

**Option B: Add `withGridBg` to all affected pages**

Manually add `withGridBg` prop to every section on every page. This is more work but allows granular control.

## Verification

After fix, all sections should show:
- Diagonal stripe pattern in left/right margins
- Vertical border lines on container edges
- Horizontal border line at bottom

## Components Already Correct

These handle grid bg internally (no changes needed):
- `TestimonialsAnimatedGrid` - uses `GridBgSection` directly
- `TeamCarouselSection` - uses `GridBgFrame` (borders only, intentional for full-bleed)
- `CallToActionWithEmail` - uses `GridBgStripes` manually
- All hero components with `withGridBg` prop