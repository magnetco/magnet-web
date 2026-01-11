---
name: Eyebrow Alignment Fix
overview: Simplify the eyebrow component by removing the dot, shortening the line, and ensuring the text aligns vertically with the headline below. Then audit all sections to ensure consistent Eyebrow usage.
todos:
  - id: simplify-eyebrow
    content: Remove dot, shorten line, and adjust alignment in Eyebrow component
    status: completed
---

# Eyebrow Alignment and Consistency

## Design Change

From the screenshot, the desired layout is:

```
────● CASE STUDIES     (current - line extends far left, has dot)
        ↓
──── CASE STUDIES      (new - short line, no dot, text aligns with title)
     Real results...
```

The "C" in "CASE STUDIES" should align with the "R" in "Real results" below it.

## Changes to Eyebrow Component

In [`website/src/components/elements/eyebrow.tsx`](website/src/components/elements/eyebrow.tsx):

**1. Remove the dot entirely:**

- Delete the `dotRef` and all dot-related code (lines 14, 20, 22, 26, 42-48, 106-109)
- Remove `dot` from colorStyles objects (lines 66, 71)

**2. Shorten the line significantly:**

- Change from `-ml-4 w-12 / md:-ml-6 md:w-16 / lg:-ml-10 lg:w-20` 
- To something like `-ml-6 w-6` (a fixed short 24px line with 24px negative margin)
- This creates a compact marker that sits just to the left

**3. Simplify the animation:**

- Remove dot animation logic
- Keep only the line draw-in animation

**Result:** A short horizontal line to the left of the eyebrow text, with the text itself starting at the same position as content below it.

## Section Component Audit

Currently 13 section components import and use `Eyebrow`:

- features-bento-grid.tsx
- interactive-cards-grid.tsx  
- careers-listing.tsx
- team-carousel.tsx
- faqs-with-chat.tsx
- call-to-action-with-email.tsx
- job-detail.tsx
- call-to-action-simple.tsx
- team-with-bios.tsx
- testimonials-animated-grid.tsx
- contact-form.tsx
- team-card-grid.tsx

No changes needed to these - they already use the Eyebrow component correctly.

Other sections without eyebrows either:

- Don't have an eyebrow prop in their interface
- Are navbars/footers/stats (don't need eyebrows)
- Use different intro patterns appropriate to their design