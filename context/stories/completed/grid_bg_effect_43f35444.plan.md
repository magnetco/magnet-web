---
name: Grid BG Effect
overview: Create reusable Grid BG effect components that add diagonal striped backgrounds with container cutouts and border decorations, starting with the header and hero on the homepage.
todos:
  - id: create-grid-bg-component
    content: Create GridBgSection component with diagonal stripes, cutout, and borders
    status: completed
  - id: integrate-hero
    content: Apply Grid BG effect to homepage hero section
    status: completed
  - id: integrate-header
    content: Apply Grid BG effect to site header/navbar
    status: completed
---

# Grid BG Effect Implementation

## Overview

Create a set of reusable decoration components that produce the visual effect from the Figma design:
- Diagonal striped background pattern
- "Cutout" effect where the container sits (clean area)
- Solid border lines on container side edges and section bottoms

## Component Architecture

Create a new file [`website/src/components/elements/grid-bg.tsx`](website/src/components/elements/grid-bg.tsx) with:

### 1. `GridBgSection` - Main wrapper component
A section wrapper that handles the full visual effect:
- Renders diagonal stripes in the background using CSS `repeating-linear-gradient`
- Creates a centered "cutout" that matches the site's container width
- Adds vertical border lines on the left/right edges of the cutout
- Optional bottom border line

```tsx
<GridBgSection>
  {/* Content renders in the clean "cutout" area */}
</GridBgSection>
```

### 2. CSS Implementation
- **Diagonal stripes**: `repeating-linear-gradient` at ~45deg with subtle line pattern
- **Cutout**: Absolute-positioned overlay matching container width with solid background
- **Borders**: Pseudo-elements or separate divs for the side + bottom lines
- Use CSS variables for stripe color/spacing to allow customization

## Integration Points

### Header (Navbar)
Modify [`navbar-with-links-actions-and-centered-logo.tsx`](website/src/components/sections/navbar-with-links-actions-and-centered-logo.tsx):
- Wrap or augment the header with the grid bg pattern
- Add vertical border lines extending down from navbar edges

### Hero Section
Modify [`hero-left-aligned-with-demo.tsx`](website/src/components/sections/hero-left-aligned-with-demo.tsx):
- Add Grid BG effect as a prop or wrapper
- Apply bottom border line at section end

### Homepage Integration
Update [`website/src/app/page.tsx`](website/src/app/page.tsx) to use the Grid BG decorated hero.

## Visual Details (from Figma)
- Stripe pattern: Fine diagonal lines, likely ~1px width with ~8-12px spacing
- Stripe color: Subtle gray/muted tone (matches the opal/snow palette)
- Border color: Likely `oxblood` or muted variant
- Container matches existing `max-w-2xl md:max-w-3xl lg:max-w-7xl` breakpoints