---
name: Hero Headline Animations
overview: Five premium GSAP-based headline animation effects for the homepage hero, ranging from elegant text reveals to dramatic 3D transformations.
todos: []
---

# Hero Headline Animation Effects

The homepage hero uses `HeroLeftAlignedWithDemo` with the headline **"Digital marketing that resonates with your audience"**. GSAP is already installed. Here are 5 stunning animation options:

---

## Option 1: Staggered Character Wave with Blur

Each character animates in from below with a wave-like stagger, starting blurred and slightly scaled up, then sharpening into focus. The wave creates a fluid, cinematic reveal.

**Effect Details:**
- Characters slide up from `y: 100%` with `opacity: 0` and `filter: blur(8px)`
- Stagger of 0.02s per character creates liquid-like motion
- Custom elastic ease for organic feel
- Total duration: ~1.2s

---

## Option 2: Perspective 3D Flip Reveal

Words rotate in from behind the screen in 3D space, like cards flipping from a stack. Uses CSS 3D transforms with GSAP.

**Effect Details:**
- Words start at `rotateX: -90deg` and `translateZ: -200px`
- Each word flips into view with staggered timing (0.15s between words)
- Subtle motion blur via transform-style: preserve-3d
- Optional slight scale overshoot on landing

---

## Option 3: Scramble Decode Effect (GSAP TextPlugin)

Text "decodes" from random glitchy characters/symbols into the final headline, like a terminal or cipher breaking. Very premium tech aesthetic.

**Effect Details:**
- Uses GSAP ScrambleTextPlugin (included in GSAP)
- Characters cycle through random symbols: `"!<>-_\\/[]{}—=+*^?#________"`
- Progressive reveal left-to-right with scramble decay
- Clean landing with slight scale pulse

---

## Option 4: Kinetic Line Drawing with Fill

Each word appears with an animated stroke outline that draws on SVG-style, then fills in with color. Very editorial/high-fashion feel.

**Effect Details:**
- Text initially transparent with visible stroke only
- Stroke animates via `stroke-dashoffset` → 0
- Color fills in with `clipPath` reveal or opacity fade
- Staggered per-word with overlap

---

## Option 5: Elastic Bounce with Mask Wipe

A horizontal mask reveals the text left-to-right while characters bounce in with physics-based elastic easing. Combines motion and reveal.

**Effect Details:**
- Horizontal `clipPath` or mask animates from 0% to 100% width
- Characters have `y: 40` with `elastic.out(1, 0.5)` ease
- Slight rotation per character (-5deg to 0deg)
- Creates playful but sophisticated energy

---

## Recommended Library Additions

All effects use GSAP core (already installed). For **Option 3**, we'd use GSAP's **ScrambleTextPlugin** (available with GSAP Club membership). For a free alternative, we can build a custom scramble effect.

For text splitting (Options 1, 2, 4, 5), we'll create a reusable `SplitText` utility or use a library like **splitting.js**.

---

## Implementation Approach

1. Create an `AnimatedHeadline` client component in [`website/src/components/elements/`](website/src/components/elements/)
2. Accept `variant` prop to switch between effects
3. Use `useGSAP` hook from `@gsap/react` for proper cleanup
4. Split text into spans (words/characters) for individual animation
5. Trigger animation on mount with optional scroll-trigger support

---

**Which effect(s) would you like me to implement?** I can build one or all five as selectable variants.