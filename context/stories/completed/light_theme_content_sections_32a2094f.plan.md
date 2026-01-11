---
name: Light Theme Content Sections
overview: Create a reusable light-theme wrapper that content sections can inherit from, keeping Header, Hero sections, and Footer in dark mode while all other content sections use light backgrounds with dark text.
todos:
  - id: css-light-section
    content: Add .light-section CSS class with light theme variable overrides
    status: completed
  - id: section-component
    content: Update Section component with dark prop, apply light-section by default
    status: completed
  - id: service-hero-dark
    content: Update ServiceHero to explicitly use dark theme
    status: completed
  - id: services-page
    content: Update services page sections to use light theme
    status: completed
  - id: update-pages
    content: Update remaining pages (about, contact, vehicles, blog, etc.)
    status: completed
  - id: footer-dark
    content: Ensure Footer remains dark themed
    status: completed
  - id: test-styling
    content: Test the styling changes across all affected pages
    status: completed
---

# Light Theme for Content Sections

## Current State

The site has `dark` class on `<html>` globally, making everything use dark theme variables. Some homepage sections already use hardcoded light colors (`bg-white`, `text-neutral-900`), but other pages use theme-aware classes (`bg-card`, `text-foreground`) which render dark.

## Solution: Light Theme Wrapper

Add a CSS class that resets to light theme variables, then apply it to content sections site-wide.

### 1. Add Light Theme Class to CSS

In [`website/app/globals.css`](website/app/globals.css), add a `.light-section` class that overrides the dark theme variables with light values:

```css
/* Light section override - use inside dark mode for light content areas */
.light-section {
  --background: #ffffff;
  --foreground: #282a30;
  --card: #f8f8f8;
  --card-foreground: #282a30;
  --muted: #f0f0f0;
  --muted-foreground: #6f6e77;
  --border: #eaeaeb;
  /* ... other light mode variables */
  
  background-color: var(--background);
  color: var(--foreground);
}
```

### 2. Update Section Component

Modify [`website/components/layout/section.tsx`](website/components/layout/section.tsx) to apply light theme by default, with an optional `dark` prop for dark sections:

```tsx
export default function Section({
  dark = false,
  // ... existing props
}: SectionProps) {
  return (
    <Tag className={cn(!dark && "light-section", "px-page-x", className)} {...props}>
      ...
    </Tag>
  );
}
```

### 3. Update Pages Using Section Component

Apply the light-section styling to content sections on these pages:
- [`website/app/services/page.tsx`](website/app/services/page.tsx) - Services overview, request form, contact info
- [`website/app/vehicles/page.tsx`](website/app/vehicles/page.tsx) - Vehicle inventory
- [`website/app/about/page.tsx`](website/app/about/page.tsx) - About content
- [`website/app/contact/page.tsx`](website/app/contact/page.tsx) - Contact form and info
- [`website/app/blog/page.tsx`](website/app/blog/page.tsx) - Blog listing
- [`website/app/terms/page.tsx`](website/app/terms/page.tsx) - Terms content
- [`website/app/privacy/page.tsx`](website/app/privacy/page.tsx) - Privacy content
- [`website/app/merchandise/page.tsx`](website/app/merchandise/page.tsx) - Merch listing
- [`website/app/sell/page.tsx`](website/app/sell/page.tsx) - Sell your car page
- [`website/app/product/[handle]/page.tsx`](website/app/product/[handle]/page.tsx) - Product detail
- [`website/app/vehicles/[slug]/page.tsx`](website/app/vehicles/[slug]/page.tsx) - Vehicle detail
- [`website/app/search/*`](website/app/search/) - Search/parts pages
- [`website/app/account/*`](website/app/account/) - Account pages

### 4. Keep Dark Mode For

These components should remain dark (no changes needed):
- [`website/components/shared/Header.tsx`](website/components/shared/Header.tsx) - Already has explicit `bg-[#0a0a0a]`
- [`website/components/shared/HeroSection.tsx`](website/components/shared/HeroSection.tsx) - Already has `bg-black`
- [`website/components/services/ServiceHero.tsx`](website/components/services/ServiceHero.tsx) - Uses `bg-background` (should stay dark)
- [`website/components/layout/footer.tsx`](website/components/layout/footer.tsx) - Uses theme tokens (keep dark)

### 5. Update TextHero Component

[`website/components/shared/TextHero.tsx`](website/components/shared/TextHero.tsx) will automatically inherit light styling from parent Section, so no changes needed.

### 6. Standardize Card and UI Component Colors

The [`website/components/ui/card.tsx`](website/components/ui/card.tsx) uses `bg-card text-card-foreground` which will automatically pick up the light values when inside `.light-section`.

## Files to Modify

| File | Change |
|------|--------|
| `globals.css` | Add `.light-section` class with light theme variables |
| `section.tsx` | Add `dark` prop, apply light-section by default |
| ~15 page files | Ensure content uses Section component properly |
| `ServiceHero.tsx` | Add explicit dark background to keep it dark |