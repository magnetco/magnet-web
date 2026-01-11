---
name: Improve Feature Sections Consistency
overview: "Enhance the Feature component in the websites page to add consistent subcopy with icons and bullets under each section's body copy, making all three features (Responsive Design, SEO Optimized, Conversion Focused) follow the same structure: title > body copy > subcopy bullets with icons > button."
todos: []
---

# Improve Feature Sections with Consistent Subcopy

## Overview

Update the `Feature` component in `features-stacked-alternating-with-demos.tsx` to support subcopy bullets with icons, and update all three feature sections on the websites page to use this new structure consistently.

## Changes Required

### 1. Update Feature Component

**File**: `website/src/components/sections/features-stacked-alternating-with-demos.tsx`

- Add optional `subcopy` prop to the `Feature` component that accepts an array of items with text and optional icons
- Update the component layout to display: headline → subheadline → subcopy bullets → cta

- Style the subcopy bullets consistently with proper spacing and icon alignment

### 2. Update Websites Page Features

**File**: `website/src/app/websites/page.tsx`

- **Responsive Design**: Add subcopy bullets:

- "Desktop, tablet, and mobile optimized" (with device/responsive icon)
- "No additional work required" (with checkmark icon)

- **SEO Optimized**: Add subcopy bullets:
- "Clean, semantic HTML" (with code icon)
- "Fast loading times" (with speed/performance icon)
- "Search engine friendly" (with search icon)
- **Conversion Focused**: Add subcopy bullets:
- "Tested layouts" (with target/checkmark icon)
- "Clear CTAs" (with arrow/action icon)
- "Conversion-optimized forms" (with form/document icon)

### 3. Icon Selection

Use appropriate icons from the existing icon library:

- `CheckmarkIcon` for completion/validation items
- `TargetIcon` for conversion-focused items

- `CodeSquareIcon` for technical items
- `MagnifyingGlassIcon` for search/SEO items

- `LightingBoltIcon` or `RocketIcon` for performance items

## Implementation Details

The subcopy will be displayed as a list with:

- Icons aligned to the left
- Bullet points with consistent spacing

- Proper typography matching the existing design system
- Responsive layout that works on all screen sizes

The structure will be:

```javascript
Title (headline)
Body copy (subheadline)
  • Icon + Bullet point 1
  • Icon + Bullet point 2
  • Icon + Bullet point 3
Button (cta)

```