---
name: Dark mobile menu redesign
overview: Redesign the mobile menu as an immersive dark full-screen experience with cinematic reveal animation, pure Juniper background letting typography be the hero, and refined underline hover interactions that match the site's established patterns.
todos:
  - id: update-dialog-styling
    content: Update ElDialogPanel with Juniper background and dark theme styling
    status: completed
  - id: add-logo-header
    content: Add logo to mobile menu header row alongside close button
    status: completed
  - id: style-nav-links
    content: Update NavbarLink styles for Coral/Frost colors with animated underline on dark, Ember for active page
    status: completed
  - id: add-secondary-links
    content: Add secondary navigation links (Method, Team, Pricing, Careers) in smaller size
    status: completed
  - id: add-search
    content: Add search trigger button that opens the existing search modal
    status: completed
  - id: add-contact-section
    content: Add contact info section with email, location, and icons
    status: completed
  - id: add-cta-button
    content: Add prominent 'Get started' CTA button at bottom
    status: completed
  - id: cinematic-animation
    content: Implement cinematic reveal animation - background wipes in, then content sequence
    status: completed
---

# Dark Full-Screen Mobile Menu Redesign

## Current State

The mobile menu ([`navbar-with-links-actions-and-centered-logo.tsx`](website/src/components/sections/navbar-with-links-actions-and-centered-logo.tsx)) is a simple light panel that slides in from the right with basic nav links. It uses the page background color (`--navbar-bg`: Snow #F5F7F7).

```191:217:website/src/components/sections/navbar-with-links-actions-and-centered-logo.tsx
<ElDialog className="lg:hidden">
  <dialog id="mobile-menu" className="backdrop:bg-transparent">
    <ElDialogPanel
      className="fixed inset-0 px-6 py-6 lg:px-10"
      style={{ backgroundColor: 'var(--navbar-bg)' }}
    >
      <div className="flex justify-end">...</div>
      <div className="mt-6 flex flex-col gap-6">{links}</div>
    </ElDialogPanel>
  </dialog>
</ElDialog>
```

## Design Vision

A premium, immersive dark experience that demonstrates creative excellence while maintaining minimalist restraint:

- **Pure Juniper (#001D22)** solid background - typography is the hero
- **Coral (#FFB5AB)** for nav link text on dark
- **Frost (#FFFFFF)** for high-emphasis text and hover states
- **Ember (#F9432B)** for CTA and **active page indicator**
- **Cinematic reveal** entrance animation - background wipes in, content follows
- **Animated underline** hovers matching site-wide pattern

## Layout Structure

```
+----------------------------------------+
|  [Magnet Logo]          [Search] [X]   |  <- Header row
|                                        |
|                                        |
|    Branding                            |  <- Primary nav (large)
|    ─────────                           |     Ember color if active
|    Websites                            |     Animated underline hover
|    Paid Ads                            |
|    Search Marketing                    |
|                                        |
|    ································    |  <- Visual separator
|                                        |
|    Method · Team · Pricing · Careers   |  <- Secondary nav (smaller)
|                                        |
+----------------------------------------+
|                                        |
|    hello@magnet.co                     |  <- Contact section
|    San Francisco, CA                   |     Mono font
|                                        |
|    [      Get started      ]           |  <- Primary CTA (Ember)
|                                        |
|    [in]                                |  <- Social icon
|                                        |
+----------------------------------------+
```

## Animation Choreography

The cinematic reveal creates a theatrical moment:

**Phase 1: Background Reveal (0-300ms)**

- Juniper background wipes in from top to bottom using `clip-path`
- Creates a curtain-opening effect

**Phase 2: Content Fade (200-600ms)**

- Header (logo + search + close) fades in first
- Primary nav links fade in with subtle upward movement, staggered 50ms apart
- Secondary nav fades in
- Contact section and CTA fade in last

**Phase 3: Exit**

- Reverse sequence: content fades, then background wipes out

CSS Implementation:

```css
/* Background wipe reveal */
dialog#mobile-menu[open] el-dialog-panel {
  animation: revealBackground 300ms ease-out forwards;
}

@keyframes revealBackground {
  from { clip-path: inset(0 0 100% 0); }
  to { clip-path: inset(0 0 0 0); }
}

/* Content stagger - using animation-delay on children */
dialog#mobile-menu[open] .mobile-menu-content {
  opacity: 0;
  animation: fadeInUp 300ms ease-out forwards;
  animation-delay: 200ms;
}

/* Primary nav links stagger */
dialog#mobile-menu[open] .mobile-menu-link:nth-child(1) { animation-delay: 250ms; }
dialog#mobile-menu[open] .mobile-menu-link:nth-child(2) { animation-delay: 300ms; }
dialog#mobile-menu[open] .mobile-menu-link:nth-child(3) { animation-delay: 350ms; }
dialog#mobile-menu[open] .mobile-menu-link:nth-child(4) { animation-delay: 400ms; }

/* Secondary nav */
dialog#mobile-menu[open] .mobile-menu-secondary { animation-delay: 450ms; }

/* Footer content */
dialog#mobile-menu[open] .mobile-menu-footer { animation-delay: 500ms; }

@keyframes fadeInUp {
  from { 
    opacity: 0; 
    transform: translateY(12px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}
```

## Navigation Link Styling

### Primary Links (Services)

```tsx
// Active page gets Ember color, others Coral
className={clsx(
  "mobile-menu-link relative text-4xl/tight font-medium",
  "after:absolute after:bottom-0 after:left-0",
  "after:h-[2px] after:w-full after:origin-left",
  "after:scale-x-0 after:bg-frost",
  "after:transition-transform after:duration-300",
  "hover:text-frost hover:after:scale-x-100",
  isActive ? "text-ember" : "text-coral"
)}
```

### Secondary Links (Company)

```tsx
// Smaller, inline, separated by dots
className="text-base font-medium text-coral/70 hover:text-frost transition-colors"
```

## Active Page Detection

Use `usePathname()` from Next.js to determine active state:

```tsx
const pathname = usePathname()
const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')
```

## Search Integration

Add a search trigger button in the header that opens the existing `SearchModal`:

```tsx
// In mobile menu header
<button
  onClick={() => {
    // Close mobile menu first, then open search
    document.getElementById('mobile-menu')?.close()
    // Small delay to let menu close animation start
    setTimeout(() => setSearchOpen(true), 100)
  }}
  className="mobile-menu-content text-coral hover:text-frost transition-colors"
  aria-label="Search"
>
  <MagnifyingGlassIcon className="h-5 w-5" />
</button>
```

## Component Structure

```tsx
<ElDialogPanel className="fixed inset-0 flex flex-col bg-juniper">
  {/* Header */}
  <div className="mobile-menu-content flex items-center justify-between px-6 py-6">
    <Link href="/" onClick={closeMenu}>
      <MagnetLogoWhite />
    </Link>
    <div className="flex items-center gap-4">
      <button onClick={openSearch} className="text-coral hover:text-frost">
        <MagnifyingGlassIcon />
      </button>
      <button onClick={closeMenu} className="text-coral hover:text-frost">
        <CloseIcon />
      </button>
    </div>
  </div>
  
  {/* Primary Navigation */}
  <nav className="flex-1 flex flex-col justify-center px-6">
    <div className="space-y-4">
      <MobileMenuLink href="/branding" isActive={isActive('/branding')}>Branding</MobileMenuLink>
      <MobileMenuLink href="/websites" isActive={isActive('/websites')}>Websites</MobileMenuLink>
      <MobileMenuLink href="/ads" isActive={isActive('/ads')}>Paid Ads</MobileMenuLink>
      <MobileMenuLink href="/search" isActive={isActive('/search')}>Search Marketing</MobileMenuLink>
    </div>
    
    {/* Secondary Navigation */}
    <div className="mobile-menu-secondary mt-10 flex flex-wrap gap-x-4 gap-y-2">
      <Link href="/method" className="text-base text-coral/70 hover:text-frost">Method</Link>
      <span className="text-coral/30">·</span>
      <Link href="/team" className="text-base text-coral/70 hover:text-frost">Team</Link>
      <span className="text-coral/30">·</span>
      <Link href="/pricing" className="text-base text-coral/70 hover:text-frost">Pricing</Link>
      <span className="text-coral/30">·</span>
      <Link href="/careers" className="text-base text-coral/70 hover:text-frost">Careers</Link>
    </div>
  </nav>
  
  {/* Footer */}
  <div className="mobile-menu-footer px-6 pb-8 space-y-6">
    {/* Contact */}
    <div className="space-y-1">
      <a href="mailto:hello@magnet.co" className="block font-mono text-sm text-coral/80 hover:text-frost">
        hello@magnet.co
      </a>
      <p className="font-mono text-sm text-coral/50">San Francisco, CA</p>
    </div>
    
    {/* CTA */}
    <ButtonLink href="/contact" size="lg" className="w-full justify-center" onClick={closeMenu}>
      Get started
    </ButtonLink>
    
    {/* Social */}
    <a href="https://linkedin.com/company/magnet-co" className="inline-flex text-coral hover:text-frost">
      <LinkedInIcon />
    </a>
  </div>
</ElDialogPanel>
```

## Files to Modify

- [`website/src/components/sections/navbar-with-links-actions-and-centered-logo.tsx`](website/src/components/sections/navbar-with-links-actions-and-centered-logo.tsx) - Menu structure, content, dark styling, active states
- [`website/src/app/globals.css`](website/src/app/globals.css) - Cinematic reveal animations and stagger effects

## Implementation Notes

- Use `usePathname()` from `next/navigation` for active page detection
- The Magnet logo needs a white variant for dark background (may need to create or use existing)
- When clicking nav links, close the menu using `document.getElementById('mobile-menu')?.close()`
- Search button closes menu first, then opens search modal after brief delay
- The `ButtonLink` component should work as-is since Ember on dark works well
- Test animation timing - should feel cinematic but not slow (~500-600ms total)
- Add `will-change: clip-path, opacity, transform` for smooth animations