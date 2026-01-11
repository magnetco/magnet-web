---
name: Eyebrow Line Refinement
overview: Adjust the eyebrow line to match the section divider color (bg-oxblood/10) and extend it to meet the container edge for visual continuity with the grid system.
todos:
  - id: refine-eyebrow-line
    content: Update eyebrow line color to bg-oxblood/10 and extend to container edge with responsive margins
    status: completed
---

# Eyebrow Line Refinement

## Issues

1. **Line color is too prominent** - Currently `bg-ember/60` which stands out too much
2. **Line doesn't reach container edge** - Currently `-ml-9 w-6` doesn't align with the grid system

## Target Appearance

The line should:
- Match the section divider/border lines which use `bg-oxblood/10` (from [`grid-bg.tsx`](website/src/components/elements/grid-bg.tsx) line 126)
- Extend from the container edge (the vertical border line) to just before the text
- Feel like part of the grid system, not a separate decorative element

## Changes to Eyebrow Component

In [`website/src/components/elements/eyebrow.tsx`](website/src/components/elements/eyebrow.tsx):

**1. Update line colors to match section dividers:**

```typescript
const colorStyles = {
  dark: {
    text: 'text-ember',
    line: 'bg-oxblood/10',  // was 'bg-ember/60'
  },
  light: {
    text: 'text-white/70',
    line: 'bg-white/15',    // was 'bg-white/50'
  },
}
```

**2. Extend line to container edge (responsive):**

The Container component uses `px-4 md:px-6 lg:px-10`. The line needs matching negative margins to reach the edge:

```typescript
// Change from: 'block h-px w-6 -ml-9'
// To responsive values that reach container edge:
'-ml-4 w-7',        // Mobile: 16px margin, 28px width
'md:-ml-6 md:w-9',  // Tablet: 24px margin, 36px width  
'lg:-ml-10 lg:w-13' // Desktop: 40px margin, 52px width
```

This ensures the line starts at the container border and extends to just before the text (with the `gap-3` providing spacing).