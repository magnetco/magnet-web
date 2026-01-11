---
name: Homepage UI Redesign
overview: Transform the homepage to match the reference designs with dark header, light background, enhanced hero section, redesigned inventory/services sections with BMW M branding, and updated navigation structure.
todos: []
---

# Homepage UI Redesign - UI Edits Story

## Overview

Transform the homepage from current design to match reference designs with dark header, light background, full-height hero section, and redesigned inventory/services sections featuring BMW M branding elements.

## Key Design Changes

### 1. Header/Navigation Redesign

**File:** `website/components/shared/Navigation.tsx` or `website/components/layout/navbar/index.tsx`

- **Dark Theme Header**: Change header background from light (`bg-background/80`) to dark (`bg-foreground` or `bg-[#1a1a1a]`)

- **White Text**: Update all navigation text to white/light colors

- **BMW M Logo Icon**: Add three diagonal stripe icon (red, dark blue, light blue) before section headings

- **Expanded Inventory Menu**: Add dropdown for Inventory with:

- General categories: "New arrivals", "Current inventory", "Previous inventory", "Sell your car"

- Model breakdown: M1, M2 (F87, G87), M3 (E30, E36, E46, E9X, FBX), M5 (E24, E34, E39, E60), Z3/Z4 (Z3 M, Z4 M, Z8)

- **Mobile Navigation**: Update mobile menu to match desktop structure with expandable Inventory section

### 2. Hero Section Transformation

**File:** `website/components/shared/HeroSection.tsx`

- **Full-Height Hero**: Change from current padding-based height to viewport height (70-90vh)

- **New Headline**: Replace "Your BMW Enthusiast Destination" with "THE LEADING BMW PRESERVATION FACILITY"

- **Background Image**: Use high-quality BMW vehicle image (white E36 M3 with checkered flag livery from reference)

- **Background Opacity**: Increase opacity from 20% to 30-40% for more dramatic effect

- **Typography Scale**: Increase heading size to match reference (larger, bolder)

- **Light Background**: Ensure hero section sits on light background (not dark)
- **Remove/Simplify CTAs**: May need to adjust CTA buttons to match reference design

### 3. Inventory Section Redesign

**File:** `website/components/shared/FeaturedVehicles.tsx`

- **Section Heading**: 

- Add BMW M logo icon (three diagonal stripes) before "INVENTORY"

- Change heading to "// INVENTORY" with red color (`text-red-600` or similar)
- Use uppercase, bold typography

- **Description Text**: Update to: "This is our carefully curated selection of cars available to purchase right now. Pin your favorites or ask a question."

- **Grid Layout**: Ensure 2x3 grid (6 vehicles) on desktop, responsive on mobile
- **Vehicle Cards**: Verify cards show:
- High-quality vehicle image
- Model/Year (e.g., "2013 BMW E92 M3")
- Price (e.g., "$89,990")
- Color/Interior text with colored circle indicator
- Heart icon for favorites

- **CTA Button**: Change "Browse All Vehicles" to "See all cars →" with arrow icon, black border style

### 4. Services Section for Homepage

**File:** Create new `website/components/shared/HomepageServices.tsx` or update existing

- **Section Heading**: 

- Add BMW M logo icon before "SERVICES"

- Change to "// SERVICES" with red color

- Uppercase, bold typography

- **Description Text**: "We are highly specialized on high performance BMW M-series only. The best of Bavaria. Take your dirty Supra down the road."

- **CTA Button**: Add "Get an estimate →" button with arrow, positioned to the right of description (desktop)

- **Service Offerings**: Display four numbered services:

- **01 REJUVENATION**: Image of car polishing, description about comprehensive restoration

- **02 MECHANICAL**: Image of engine bay, description about mechanical services

- **03 COSMETIC**: Image of paint/bodywork, description about cosmetic repairs

- **04 CONDITIONING**: Image of clean BMW, description about detailing and preservation
- **Layout**: Services displayed in grid (2x2 on desktop, stacked on mobile) with large images and numbered headings

### 5. Homepage Layout Updates

**File:** `website/app/page.tsx`

- **Remove AboutSection**: Remove or replace with services section

- **Add HomepageServices**: Include new services section component

- **Light Background**: Ensure entire page has light background (`bg-background` or `bg-white`)

- **Section Spacing**: Adjust spacing between sections to match reference

### 6. BMW M Logo Icon Component

**File:** Create `website/components/icons/BMWMIcon.tsx`

- Create reusable SVG component for BMW M logo (three diagonal stripes: red, dark blue, light blue)

- Use in section headings (Inventory, Services)

- Responsive sizing

### 7. Typography & Color Updates

**Files:** `website/app/globals.css` or design tokens

- **Red Accent Color**: Ensure red color for section headings matches reference (`#DC2626` or similar)
- **Section Heading Style**: Create utility class for "// SECTION" style headings

- **Button Styles**: Update button variants to match reference (black border, white background)

## Implementation Tasks

1. **Header Dark Theme**

- Update Navigation component background and text colors

- Test logged in/out states

- Ensure mobile menu matches dark theme

2. **Hero Section**

- Update HeroSection component with new headline, full-height, background image

- Adjust typography scale and spacing

- Test responsive behavior

3. **Inventory Section**

- Add BMW M icon component

- Update FeaturedVehicles heading and description

- Verify vehicle card layout matches reference

- Update CTA button text and style

4. **Services Section**

- Create HomepageServices component

- Add four service offerings with images and descriptions

- Implement numbered headings (01-04)

- Add "Get an estimate" CTA

5. **BMW M Icon**

- Create reusable icon component

- Use in section headings

6. **Homepage Integration**

- Update page.tsx to include new services section

- Remove/replace AboutSection

- Verify light background throughout

7. **Responsive Design**

- Test all sections on mobile, tablet, desktop
- Ensure navigation dropdowns work on all breakpoints
- Verify grid layouts are responsive

8. **Design Token Updates**

- Add red accent color if not present

- Update button variants

- Ensure consistent spacing

## Files to Modify

- `website/app/page.tsx` - Homepage layout

- `website/components/shared/HeroSection.tsx` - Hero redesign

- `website/components/shared/FeaturedVehicles.tsx` - Inventory section updates

- `website/components/shared/Navigation.tsx` or `website/components/layout/navbar/index.tsx` - Dark header

- `website/components/shared/MobileMenu.tsx` - Mobile navigation updates

- `website/components/icons/BMWMIcon.tsx` - New icon component (create)
- `website/components/shared/HomepageServices.tsx` - New services section (create)
- `website/app/globals.css` - Color and typography updates

## Acceptance Criteria

1. Header displays with dark background and white text
2. Hero section is full-height (70-90vh) with "THE LEADING BMW PRESERVATION FACILITY" headline
3. Inventory section shows "// INVENTORY" with BMW M icon, description, 6-vehicle grid, "See all cars →" button

4. Services section shows "// SERVICES" with BMW M icon, description, "Get an estimate →" button, and four numbered service offerings

5. Entire homepage has light background

6. All sections are responsive across breakpoints

7. Navigation includes expanded Inventory dropdown with model breakdowns

8. BMW M icon appears consistently in section headings

## Updated ROADMAP.md Structure

Add new section:

### Phase 8: Homepage UI Redesign

- [ ] UI Edits: Homepage redesign to match reference designs

- Dark header with white text

- Full-height hero section