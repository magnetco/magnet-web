---
name: Mobile menu polish
overview: Polish the mobile menu with consistent Coral theming, card-style block sections, proper underline behavior, and improved touch targets for a refined, premium experience.
todos:
  - id: fix-logo-color
    content: Change logo from text-frost to text-coral
    status: completed
  - id: fix-underlines
    content: Change MobileMenuLink from block to inline-block for proper underline width
    status: completed
  - id: add-card-sections
    content: Wrap nav groups in card-style containers with subtle borders
    status: completed
  - id: add-section-labels
    content: Add eyebrow labels (Services, Company, Contact) to each card
    status: completed
  - id: fix-button-color
    content: Change CTA button to solid Coral background with dark text
    status: completed
  - id: improve-touch-targets
    content: Add generous padding to all interactive elements (py-3 for nav links)
    status: completed
---

# Mobile Menu Polish and Improvements

## Issues to Fix

1. **Color inconsistency**: Logo is white, button is oxblood - both should use Coral
2. **Underlines span full viewport**: Should only span text width
3. **Layout feels sparse**: Need card-style block sections
4. **Touch targets**: Need appropriate sizing for easy mobile interaction

## Design Changes

### Color Corrections

- **Logo**: Change from `text-frost` to `text-coral`
- **CTA Button**: Solid Coral background (`bg-coral`) with dark text (`text-juniper`)
- All interactive elements consistently use Coral/Frost color system

### Layout: Card-Style Blocks

New structure with three distinct card sections:

```
+------------------------------------------+
|  [Logo]                    [Search] [X]  |   <- Header (Coral icons)
+------------------------------------------+
|                                          |
|  +------------------------------------+  |
|  |  Services                          |  |   <- Card 1: Primary Nav
|  |                                    |  |      Subtle border
|  |  Branding                          |  |      Generous padding
|  |  Websites                          |  |
|  |  Paid Ads                          |  |
|  |  Search Marketing                  |  |
|  +------------------------------------+  |
|                                          |
|  +------------------------------------+  |
|  |  Company                           |  |   <- Card 2: Secondary Nav
|  |                                    |  |
|  |  Method  Team  Pricing  Careers    |  |
|  +------------------------------------+  |
|                                          |
|  +------------------------------------+  |
|  |  hello@magnet.co                   |  |   <- Card 3: Contact
|  |  San Francisco, CA                 |  |
|  |                                    |  |
|  |  [    Get started    ]             |  |      Coral solid button
|  |                                    |  |
|  |  [LinkedIn]                        |  |
|  +------------------------------------+  |
|                                          |
+------------------------------------------+
```

### Card Styling

```css
/* Card block style */
border: 1px solid rgba(255, 181, 171, 0.15);  /* coral/15 */
border-radius: 12px;
padding: 24px;
background: rgba(255, 181, 171, 0.03);  /* subtle coral tint */
```

### Underline Fix

Current (broken):

```tsx
'after:w-full'  /* Spans full container width */
```

Fixed:

```tsx
'after:w-[var(--text-width)]'  /* OR */
'inline-block'  /* Make link inline-block so after spans text only */
```

The simplest fix: Change from `block` to `inline-block` for the link, and ensure the underline pseudo-element uses `w-full` on an inline-block parent - this naturally constrains width to text.

### Touch Target Improvements

- Nav links: Increase vertical padding (`py-3` minimum, ~48px touch target)
- Secondary links: Add padding wrapper (`py-2 px-3`)
- Search/Close buttons: Ensure minimum 44x44px tap area
- CTA button: Full width with generous padding

### Section Labels

Add subtle eyebrow labels to each card:
- "Services" for primary nav
- "Company" for secondary nav  
- "Contact" for footer section

Use mono font, small caps, coral/50 color.

## Files to Modify

- [`website/src/components/sections/navbar-with-links-actions-and-centered-logo.tsx`](website/src/components/sections/navbar-with-links-actions-and-centered-logo.tsx)
  - Logo color: `text-frost` → `text-coral`
  - Add card wrapper components with border styling
  - Fix MobileMenuLink to use `inline-block` for proper underline width
  - Add section labels
  - Increase touch target padding
  - Update ButtonLink to use Coral styling (may need custom classes or inline style)

- [`website/src/app/globals.css`](website/src/app/globals.css)
  - No changes needed if Tailwind classes suffice
  - Could add `.mobile-menu-card` utility class if helpful

## Implementation Details

### Card Component

```tsx
function MobileMenuCard({ 
  label, 
  children 
}: { 
  label?: string
  children: ReactNode 
}) {
  return (
    <div className="rounded-xl border border-coral/15 bg-coral/[0.03] p-6">
      {label && (
        <p className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-coral/50">
          {label}
        </p>
      )}
      {children}
    </div>
  )
}
```

### Fixed Nav Link

```tsx
<Link
  href={href}
  className={clsx(
    'mobile-menu-link relative inline-block py-3 text-4xl/tight font-medium',
    'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full',
    'after:origin-left after:scale-x-0 after:bg-frost',
    'after:transition-transform after:duration-300',
    'hover:text-frost hover:after:scale-x-100',
    isActive ? 'text-ember' : 'text-coral',
  )}
>
```

Key change: `inline-block` instead of `block` - underline now only spans text width.

### CTA Button Override

```tsx
<a
  href="/contact"
  onClick={closeMenu}
  className="flex w-full items-center justify-center rounded-full bg-coral py-3 text-sm font-medium text-juniper transition-colors hover:bg-coral/90"
>
  Get started
</a>
```

Or use existing ButtonLink with custom color prop if supported.