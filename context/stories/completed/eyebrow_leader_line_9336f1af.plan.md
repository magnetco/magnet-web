---
name: Eyebrow Leader Line
overview: Transform the eyebrow component from a static dot to an animated leader line that draws in from the container edge when scrolling into view, creating a sophisticated "read from here" visual anchor.
todos:
  - id: implement-eyebrow
    content: Rewrite Eyebrow component with leader line structure and GSAP scroll animation
    status: completed
---

# Animated Leader Line Eyebrow

## Current State

The eyebrow in [`website/src/components/elements/eyebrow.tsx`](website/src/components/elements/eyebrow.tsx) is a simple static dot:

```14:14:website/src/components/elements/eyebrow.tsx
      <span className="h-1.5 w-1.5 rounded-full bg-stone-300" aria-hidden="true" />
```

## Implementation

### Structure

Replace the single dot with a leader line structure:
- A horizontal line that extends from the left edge of the container
- Terminates in a dot adjacent to the text
- Uses absolute positioning relative to the container

```
[Container edge]─────────────────● EYEBROW TEXT
                  ^leader line^  ^dot
```

### Animation

Use GSAP (already in the project) with Intersection Observer to:
1. Start with line width at 0 and dot scaled down / transparent
2. When eyebrow enters viewport, animate the line drawing from left to right
3. Pop the dot at the end of the line animation

### Key Decisions

- **Line length**: Use negative left margin to extend to container edge (~-32px to -48px depending on container padding)
- **Line style**: 1px height, muted color (stone-300 or basalt/50), transitions to ember on the dot
- **Timing**: ~400-600ms draw duration with ease-out, slight delay on dot pop
- **Replay**: Animation plays once per page load (not on every scroll)

### Files to Modify

1. [`website/src/components/elements/eyebrow.tsx`](website/src/components/elements/eyebrow.tsx) - Main component rewrite
2. May need to add `'use client'` directive for the GSAP animation

### Dark Mode Consideration

The line/dot colors should respect dark mode variants using existing brand colors (ember, coral, basalt, opal).