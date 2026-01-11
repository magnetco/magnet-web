---
name: Homepage Design Alignment
overview: Align the homepage hero and header with approved Figma designs by updating the promo banner, header, navigation, hero content, and login card styling.
todos:
  - id: promo-banner
    content: Update alerts schema default to true, verify Alert component position and styling
    status: completed
  - id: header-transparent
    content: Change header background from bg-sand-light to bg-transparent
    status: completed
  - id: nav-reorder
    content: Reorder navDropdowns array and add Branches link
    status: completed
  - id: need-help-button
    content: Replace APPLY NOW with NEED HELP? button with icon and outline variant
    status: completed
  - id: hero-tagline
    content: Add FAITH MATTERS. FINANCES MATTER. eyebrow text above headline
    status: completed
  - id: headline-white
    content: Update hero headline from gold to white using correct token
    status: completed
  - id: button-audit
    content: Verify single Button component usage and lightest-blue variant
    status: completed
  - id: login-card-styling
    content: "Update login card: input borders, card transparency, spacing, all subtleties"
    status: completed
---

# Homepage Design Alignment Plan

## Summary of Changes

Based on user feedback on the 8 proposed changes, here is the implementation plan:

---

## 1. Promo Banner - Use Existing Alerts System

**Finding:** An alerts system already exists in Sanity ([studio/src/schemaTypes/singletons/alerts.tsx](studio/src/schemaTypes/singletons/alerts.tsx)) with a corresponding [Alert.tsx](website/app/components/layout/Alert.tsx) component.

**Current Issue:** `isEnabled` defaults to `false`. User wants it ON by default.

**Changes:**
- Update `alerts.tsx` schema: change `initialValue: false` to `initialValue: true`
- Verify Alert component renders in the correct position (above header)
- Ensure the "normal" alert type uses the dark teal/irreantum styling to match Figma

---

## 2. Header Background - Transparent (Not White)

**File:** [website/app/components/layout/Header.tsx](website/app/components/layout/Header.tsx)

**Current:** `bg-sand-light` on the header element (line 358)

**Change:** Update to `bg-transparent` (or remove background entirely)

**Note:** Also check the dropdown background layer behavior with transparent header.

---

## 3. Navigation - Reorder + Add "Branches"

**File:** [website/app/components/layout/Header.tsx](website/app/components/layout/Header.tsx)

**Current order:** Accounts, Loans, Cards, Business, Services

**Target order:** Services, Business, Cards, Loans, Accounts, Branches

**Changes:**
- Reorder `navDropdowns` array
- Add new "Branches" nav item linking to `/locator` (no dropdown needed - direct link)

---

## 4. Replace "APPLY NOW" with "NEED HELP?" Button

**File:** [website/app/components/layout/Header.tsx](website/app/components/layout/Header.tsx) (lines 482-493)

**Changes:**
- Update button text from "Apply now" to "NEED HELP?"
- Add question mark icon (use Heroicons `QuestionMarkCircleIcon` or similar)
- Update variant to `outline` for outlined style per Figma
- Verify correct design token usage

---

## 5. Add Tagline Above Hero Headline

**File:** [website/app/components/sections/HeroSection.tsx](website/app/components/sections/HeroSection.tsx)

**Add eyebrow text:** "FAITH MATTERS. FINANCES MATTER." above the main headline

**Implementation:**
- Add before `StyledHeading` (around line 128)
- Use small caps styling: `text-sm uppercase tracking-widest text-white/80`
- Consider making this CMS-editable via `block.tagline` field

---

## 6. Hero Headline Color - White Text

**File:** [website/app/components/sections/HeroSection.tsx](website/app/components/sections/HeroSection.tsx) or [StyledHeading.tsx](website/app/components/elements/StyledHeading.tsx)

**Current:** Yellow/gold gradient styling

**Change:** Update to white using `text-white` token (not arbitrary hex)

**Note:** May need to modify StyledHeading component or override for hero context.

---

## 7. "Open an Account" Button - Verify Single Button Component

**Finding:** Website uses a single master Button component at [website/components/ui/button.tsx](website/components/ui/button.tsx). The `data/` app has its own copy for the admin panel (acceptable separation).

**Current usage in Hero:** `variant="lightest-blue"` for "Open an Account"

**Verify:**
- `lightest-blue` variant matches Figma (light teal filled button)
- No duplicate/shadow button components exist in website codebase
- All hero CTAs use the master Button component

---

## 8. Login Card - Full Styling Audit

**File:** [website/app/components/sections/HeroSection.tsx](website/app/components/sections/HeroSection.tsx) (lines 175-236)

**Current vs Figma differences to address:**

| Element | Current | Target (Figma) |
|---------|---------|----------------|
| Card background | `glass` class with blur | May need adjusted transparency |
| Card border | `border-2 border-white/5` | Review border visibility |
| Input borders | `border-0` (no border) | Add subtle white/light border |
| Input background | `bg-white` solid | May need transparency |
| Spacing between inputs | `space-y-4` | Verify padding values |
| "Forgot password?" position | Left aligned | Verify alignment |
| "SIGN IN" button | `variant="jade"` | Verify correct variant |
| Input placeholder text | Current styling | Verify color token |
| Overall card padding | `p-6` | Verify against Figma |

**Detailed changes needed:**
- Add `border border-white/20` or similar to input fields
- Review glass card CSS variables for transparency
- Verify all spacing matches Figma measurements
- Ensure password toggle icon styling is correct

---

## Implementation Order

1. **Header changes** (transparent bg, nav reorder, NEED HELP button) - low risk
2. **Promo banner** (alerts default) - low risk
3. **Hero tagline** - low risk
4. **Hero headline color** - medium risk (may affect StyledHeading globally)
5. **Login card styling** - medium risk (multiple subtle changes)
6. **Button audit** - verification only

---

## Files to Modify

- `studio/src/schemaTypes/singletons/alerts.tsx` - Default value change
- `website/app/components/layout/Header.tsx` - Background, nav, button
- `website/app/components/sections/HeroSection.tsx` - Tagline, headline, login card
- `website/app/components/elements/StyledHeading.tsx` - Headline color (if needed)
- `website/components/ui/input.tsx` - Input border styling (if global change needed)