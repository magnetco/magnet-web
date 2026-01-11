---
name: GSAP Title Scroll Animations
overview: Create a reusable GSAP scroll-triggered animation system for hero titles and section titles with 8 animation presets to choose from, ensuring robust initialization and no stalling.
todos:
  - id: create-animated-title
    content: Create AnimatedTitle.tsx component with all 8 animation presets
    status: completed
  - id: integrate-hero
    content: Add animation to HeroSection title
    status: completed
  - id: integrate-sections
    content: Add animation to section headings (FeaturesSection, FAQSection, PostsSection, etc.)
    status: completed
---

# GSAP Title Scroll Animations

## Architecture

Create a new `AnimatedTitle` wrapper component that:
- Uses GSAP's `ScrollTrigger` for scroll-based animations
- Wraps existing `StyledHeading` component or raw title elements
- Handles SSR safely with `useLayoutEffect` and client-side checks
- Includes proper cleanup to prevent memory leaks
- Falls back gracefully if GSAP fails to load

## Files to Create/Modify

- **Create**: `website/app/components/elements/AnimatedTitle.tsx` - Reusable animation wrapper
- **Modify**: `website/app/components/sections/HeroSection.tsx` - Apply to hero title
- **Modify**: `website/app/components/elements/StyledHeading.tsx` - Optional animation prop
- **Modify**: Various section components as needed

## 8 Animation Options

### Option 1: Fade Up (Classic)
Text fades in while translating upward. Clean, professional, widely used.

```tsx
// Initial: opacity: 0, y: 60
// Animate to: opacity: 1, y: 0
// Duration: 0.8s, ease: "power3.out"
```

### Option 2: Reveal Wipe
A clip-path mask wipes from bottom to top, revealing the text. Elegant cinematic feel.

```tsx
// Initial: clipPath: "inset(100% 0 0 0)"
// Animate to: clipPath: "inset(0% 0 0 0)"
// Duration: 1s, ease: "power4.out"
```

### Option 3: Character Stagger
Each character animates individually with a slight delay. Playful and dynamic.

```tsx
// Split text into spans per character
// Initial: opacity: 0, y: 30
// Stagger: 0.02s between each character
// Duration: 0.5s per char, ease: "power2.out"
```

### Option 4: Word Cascade
Each word slides up and fades in with staggered timing. Readable and impactful.

```tsx
// Split text into spans per word
// Initial: opacity: 0, y: 40
// Stagger: 0.1s between each word
// Duration: 0.6s per word, ease: "power3.out"
```

### Option 5: Split Lines Reveal
Each line reveals from behind a mask with staggered timing. Editorial and sophisticated.

```tsx
// Wrap each line in overflow:hidden container
// Initial: y: "100%"
// Stagger: 0.15s between lines
// Duration: 0.8s, ease: "power4.out"
```

### Option 6: Scale Emerge
Text scales up from 80% to 100% while fading in. Subtle and modern.

```tsx
// Initial: opacity: 0, scale: 0.8, transformOrigin: "left center"
// Animate to: opacity: 1, scale: 1
// Duration: 0.9s, ease: "power2.out"
```

### Option 7: Blur Unveil
Text transitions from blurred to sharp while fading in. Smooth and premium.

```tsx
// Initial: opacity: 0, filter: "blur(12px)"
// Animate to: opacity: 1, filter: "blur(0px)"
// Duration: 1s, ease: "power2.out"
```

### Option 8: Slide Curtain
Text slides in from the left with a trailing edge effect. Dynamic and energetic.

```tsx
// Initial: opacity: 0, x: -80, clipPath: "inset(0 100% 0 0)"
// Animate to: opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)"
// Duration: 0.9s, ease: "power3.out"
```

## Implementation Details

### AnimatedTitle Component Structure

```tsx
'use client'
import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type AnimationType = 
  | 'fadeUp' 
  | 'revealWipe' 
  | 'characterStagger' 
  | 'wordCascade' 
  | 'splitLines' 
  | 'scaleEmerge' 
  | 'blurUnveil' 
  | 'slideCurtain'

type Props = {
  children: React.ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  triggerStart?: string // e.g., "top 80%"
}
```

### Robustness Features

- **SSR Safety**: Use `useLayoutEffect` with `typeof window` check
- **Cleanup**: Return cleanup function in useEffect to kill animations/triggers
- **Lazy Registration**: Register `ScrollTrigger` plugin only once
- **Reduced Motion**: Respect `prefers-reduced-motion` media query
- **Error Boundaries**: Wrap in try/catch, fall back to static render

### Usage Example

```tsx
// In HeroSection.tsx
<AnimatedTitle animation="fadeUp" delay={0.2}>
  <StyledHeading value={block.heading} as="h1" className="..." />
</AnimatedTitle>

// In FeaturesSection.tsx  
<AnimatedTitle animation="wordCascade">
  <StyledHeading value={block.heading} as="h3" className="..." />
</AnimatedTitle>
```