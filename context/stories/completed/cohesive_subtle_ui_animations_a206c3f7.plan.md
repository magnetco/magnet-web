---
name: Cohesive Subtle UI Animations
overview: Refine button hover states and add subtle, cohesive animations across text links, cards, alerts, navigation, search, images, FAQ reveals, and toasts - all with a consistent aesthetic.
todos:
  - id: fix-button-hover
    content: Remove lift/opacity from button hover, use color/border transitions only
    status: completed
  - id: animated-links
    content: Add animated underline CSS utility and apply to footer/header links
    status: completed
  - id: glass-shimmer
    content: Add subtle shimmer effect to GlassButtonWrapper
    status: completed
  - id: image-zoom
    content: Add contained image zoom to SubnavCard, DropdownArticleCard, CoverImage
    status: completed
  - id: alert-animation
    content: Add slide-down entry and exit animation to Alert
    status: completed
  - id: mobile-nav-refinement
    content: Refine Header mobile navigation animations
    status: completed
  - id: search-dropdown
    content: Add slide-down-fade animation to SearchBox suggestions
    status: completed
  - id: faq-stagger
    content: Add staggered reveal to FAQ items
    status: completed
  - id: toast-animation
    content: Add slide-down-fade to DraftModeToast
    status: completed
---

# Cohesive Subtle UI Animations

## 1. Fix Button Hover (Remove Lift/Opacity)

**File:** [components/ui/button.tsx](components/ui/button.tsx)

Remove `hover:-translate-y-0.5`, `hover:scale-[1.02]`, and opacity-based hover. Replace with color/border transitions only:

```tsx
// Before (current - problematic)
'hover:bg-jade/90 hover:shadow-lg hover:shadow-jade/25 motion-safe:hover:scale-[1.02] motion-safe:hover:-translate-y-0.5'

// After (color shift, no movement)
'hover:bg-jade-dark hover:border-jade-dark'
```

For each variant:

- `jade`: hover to darker jade
- `skyline`: hover to darker skyline  
- `lightest-blue`: hover to slightly darker tint
- `sunset`: hover to deeper sunset
- `irreantum`: hover to midnight
- `sapphire`: hover to darker sapphire
- `white`: hover border darkens
- `outline`: hover fill with light background
- `ghost`: hover background tint

---

## 2. Animated Text Links

**File:** [website/app/globals.css](website/app/globals.css)

Add reusable animated underline utility:

```css
.link-underline {
  position: relative;
  text-decoration: none;
}
.link-underline::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.link-underline:hover::after {
  width: 100%;
}
```

Apply to:

- [layout/Footer.tsx](website/app/components/layout/Footer.tsx) - footer links
- [layout/Header.tsx](website/app/components/layout/Header.tsx) - dropdown category links

---

## 3. GlassButtonWrapper - Subtle Shimmer

**File:** [components/ui/glass-button-wrapper.tsx](website/components/ui/glass-button-wrapper.tsx)

Add subtle shimmer overlay on hover (no border glow):

```tsx
// Add shimmer pseudo-element via Tailwind
'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700'
```

---

## 4. Image Zoom Within Container (Parallax-style)

**Files:**

- [elements/SubnavCard.tsx](website/app/components/elements/SubnavCard.tsx)
- [elements/DropdownArticleCard.tsx](website/app/components/elements/DropdownArticleCard.tsx)
- [elements/CoverImage.tsx](website/app/components/elements/CoverImage.tsx)

Add subtle scale on image only, container clips overflow:

```tsx
// Container
'overflow-hidden'

// Image
'transition-transform duration-500 ease-out group-hover:scale-[1.03]'
```

---

## 5. Alert Banner Animations

**File:** [layout/Alert.tsx](website/app/components/layout/Alert.tsx)

- Entry: Slide down from `translateY(-100%)` to `translateY(0)` with opacity
- Exit: Reverse animation on dismiss
```tsx
// Add state-based classes
className={`transform transition-all duration-300 ease-out ${
  isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
}`}
```


---

## 6. Header Mobile Navigation Refinements

**File:** [layout/Header.tsx](website/app/components/layout/Header.tsx)

- Refine hamburger animation timing to `ease-out-expo`
- Mobile menu items: staggered fade-in using CSS animation-delay
- Panel slide: smoother easing

---

## 7. SearchBox Suggestions Animation

**File:** [elements/SearchBox.tsx](website/app/components/elements/SearchBox.tsx)

Dropdown appears with slide-down + fade:

```tsx
'animate-slide-down-fade' // Uses keyframe from tailwind config
```

---

## 8. FAQ Staggered Reveal

**File:** [sections/FAQSection.tsx](website/app/components/sections/FAQSection.tsx)

Wrap FAQ items with `AnimatedTitle` using staggered delays:

```tsx
{filteredFaqs.map((faq, index) => (
  <AnimatedTitle animation="fadeUp" delay={index * 0.05}>
    {/* FAQ item */}
  </AnimatedTitle>
))}
```

---

## 9. Toast Slide-Down Animation

**File:** [elements/DraftModeToast.tsx](website/app/components/elements/DraftModeToast.tsx)

Entry from opacity 0, slight translateY(-8px) to final position:

```tsx
'animate-slide-down-fade' // Slides down subtly into view
```

---

## Shared Aesthetic Principles

All animations will use:

- **Duration:** 200-300ms for micro-interactions, 400-500ms for larger reveals
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (smooth) or `ease-out-expo` for snappier
- **No position shifts** on buttons/badges
- **Image zoom contained** within parent (no overflow)
- **Color transitions** preferred over opacity changes on interactive elements