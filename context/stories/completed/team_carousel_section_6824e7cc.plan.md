---
name: Team Carousel Section
overview: Create an auto-rotating team carousel component for the homepage that fetches team members from Sanity, pauses on hover, and expands cards inline with GSAP animations when clicked.
todos:
  - id: create-carousel-component
    content: Create TeamCarouselSection component with auto-rotating carousel and GSAP animations
    status: completed
  - id: add-to-homepage
    content: Add Team section to homepage with server-side Sanity data fetching
    status: completed
    dependencies:
      - create-carousel-component
---

# Team Carousel Section

Create a visually stunning auto-rotating team carousel for the homepage with inline card expansion and GSAP-powered animations.

## Architecture

```mermaid
flowchart LR
    Sanity[(Sanity CMS)] -->|teamMembersQuery| TeamCarouselSection
    TeamCarouselSection --> CarouselTrack
    CarouselTrack --> TeamCarouselCard
    TeamCarouselCard -->|onClick| ExpandedCard
```

## Key Design Decisions

**Data Flow**
- Fetch team members server-side using existing `teamMembersQuery` from [`website/src/lib/sanity/queries.ts`](website/src/lib/sanity/queries.ts)
- Use existing `TeamMember` type from [`website/src/lib/sanity/types.ts`](website/src/lib/sanity/types.ts)
- Render Portable Text bio using `@portabletext/react`

**Carousel Behavior**
- Continuous auto-scroll using GSAP (seamless infinite loop via duplicated track)
- Pause on hover over entire carousel container
- Resume auto-scroll when mouse leaves

**Card Expansion (inline, not drawer)**
- On click: selected card expands horizontally (image left, bio right)
- Other cards animate aside using GSAP `Flip` plugin for layout transitions
- Expanded state: ~600px wide showing photo + bio side-by-side
- Close on: click outside, click close button, or press Escape
- Only one card expanded at a time

**Visual Styling**
- Dark section background: `bg-juniper` (consistent with screenshot aesthetic but using your colors)
- Card photos with subtle `rounded-sm` and `outline-black/5` border
- Ember accent for names on hover and expanded state
- Smooth GSAP easing throughout

## Files to Create/Modify

1. **New:** [`website/src/components/sections/team-carousel.tsx`](website/src/components/sections/team-carousel.tsx)
   - `TeamCarouselSection` - Server component wrapper with header
   - `TeamCarousel` - Client component with auto-scroll logic
   - `TeamCarouselCard` - Individual card with expand/collapse animations

2. **Modify:** [`website/src/app/page.tsx`](website/src/app/page.tsx)
   - Import and add `TeamCarouselSection` between existing sections
   - Fetch team data server-side and pass to component

## GSAP Animation Details

- **Auto-scroll**: `gsap.to(track, { x: -width, duration, ease: 'none', repeat: -1 })`
- **Expand card**: `gsap.to(card, { width: expandedWidth, duration: 0.5, ease: 'power2.out' })`
- **Shift siblings**: Use GSAP `Flip.from()` for smooth layout recalculation
- **Bio reveal**: Fade in with `opacity: 0 -> 1` and `x: 20 -> 0` stagger