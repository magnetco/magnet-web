---
name: User Experience Features
overview: "Implement five UX enhancements: cookie consent banner, external link warnings, skeleton loading screens, error boundaries, and basic offline support. All features will follow existing shadcn/CVA patterns and use design tokens from the Tailwind config."
todos:
  - id: cookie-consent
    content: Create CookieConsent.tsx component with localStorage persistence and integrate into layout.tsx
    status: completed
  - id: external-link-warning
    content: Create ExternalLinkWarning dialog and context provider, add Sanity toggle setting
    status: completed
  - id: skeleton-components
    content: Create skeleton.tsx base component and route-level loading.tsx files
    status: completed
  - id: error-boundaries
    content: Create error.tsx, global-error.tsx, and not-found.tsx with fallback UI
    status: completed
  - id: offline-support
    content: Create service worker, offline page, and registration component
    status: completed
---

# User Experience Features Implementation

## 1. Cookie Consent Banner (GDPR/CCPA)

A fixed-position banner at the bottom of the viewport with accept/reject functionality.

**New files:**
- [`website/app/components/CookieConsent.tsx`](website/app/components/CookieConsent.tsx) - Client component with localStorage persistence

**Key implementation:**
- Uses `useState` and `useEffect` to check localStorage for prior consent
- Three options: Accept All, Reject Non-Essential, Manage Preferences
- Stores preference in `localStorage` with key `cookie-consent`
- Animates in with existing `animate-slide-up-fade` from Tailwind config
- Respects user's prior choice and doesn't re-show after acceptance

**Integration:**
- Add to [`website/app/layout.tsx`](website/app/layout.tsx) alongside existing ChatWidget

```tsx
// CookieConsent.tsx structure
'use client'
export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  // Check localStorage on mount, render banner if no consent stored
}
```

---

## 2. External Link Warnings (Configurable)

A dialog that warns users when clicking links that leave the site.

**New files:**
- [`website/app/components/ExternalLinkWarning.tsx`](website/app/components/ExternalLinkWarning.tsx) - Modal dialog component
- [`website/lib/external-link-context.tsx`](website/lib/external-link-context.tsx) - Context provider for managing state

**Key implementation:**
- Uses existing `@radix-ui/react-alert-dialog` (already installed)
- Context provider wraps app to intercept external link clicks
- Configurable via Sanity settings (add `enableExternalLinkWarning` boolean to settings schema)
- Excludes whitelisted domains (e.g., known partner sites)

**Integration:**
- Modify [`studio/src/schemaTypes/singletons/settings.ts`](studio/src/schemaTypes/singletons/settings.ts) to add toggle
- Wrap layout in ExternalLinkProvider

---

## 3. Loading States with Skeleton Screens

Reusable skeleton components plus route-level loading files.

**New files:**
- [`website/components/ui/skeleton.tsx`](website/components/ui/skeleton.tsx) - Base skeleton component (shadcn pattern)
- [`website/app/loading.tsx`](website/app/loading.tsx) - Root loading screen
- [`website/app/[...path]/loading.tsx`](website/app/[...path]/loading.tsx) - Dynamic routes loading
- [`website/app/posts/[slug]/loading.tsx`](website/app/posts/[slug]/loading.tsx) - Blog post loading

**Key implementation:**
- Base skeleton uses `animate-pulse` with `bg-sand` color
- Composable skeletons: `SkeletonText`, `SkeletonCard`, `SkeletonHero`
- Uses existing shimmer animation from Tailwind config for premium feel

```tsx
// skeleton.tsx
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse bg-sand rounded-md', className)} />
}
```

---

## 4. Error Boundaries with Fallback UI

Global and route-level error handling with graceful recovery.

**New files:**
- [`website/app/error.tsx`](website/app/error.tsx) - Root error boundary
- [`website/app/[...path]/error.tsx`](website/app/[...path]/error.tsx) - Dynamic routes error
- [`website/app/global-error.tsx`](website/app/global-error.tsx) - Catches errors in root layout
- [`website/app/not-found.tsx`](website/app/not-found.tsx) - Custom 404 page (if not exists)

**Key implementation:**
- All error components are client components (`'use client'`)
- Include "Try Again" button that calls `reset()` function
- Log errors to console (can extend to error reporting service later)
- Consistent styling with existing design system

```tsx
// error.tsx pattern
'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container py-section-default text-center">
      <h1>Something went wrong</h1>
      <Button onClick={reset}>Try Again</Button>
    </div>
  )
}
```

---

## 5. Offline Support Basics

Service worker for caching static assets and a basic offline fallback page.

**New files:**
- [`website/public/sw.js`](website/public/sw.js) - Service worker file
- [`website/app/offline/page.tsx`](website/app/offline/page.tsx) - Offline fallback page
- [`website/app/components/ServiceWorkerRegistration.tsx`](website/app/components/ServiceWorkerRegistration.tsx) - Registration component

**Key implementation:**
- Manual service worker (simpler than next-pwa for basic caching)
- Cache strategy: Cache First for static assets, Network First for pages
- Pre-cache: fonts, critical CSS, logo, offline page
- Offline page shows friendly message with retry button

```js
// sw.js caching strategy
const CACHE_NAME = 'dfcu-v1'
const STATIC_ASSETS = ['/offline', '/fonts/Aeonik-Regular.woff2', ...]
```

**Integration:**
- Register service worker in [`website/app/layout.tsx`](website/app/layout.tsx)
- Only registers in production (`process.env.NODE_ENV === 'production'`)

---

## File Summary

| Feature | Files to Create |
|---------|-----------------|
| Cookie Consent | 1 component |
| External Links | 2 files (component + context) |
| Skeletons | 4 files (component + 3 loading pages) |
| Error Boundaries | 4 files |
| Offline Support | 3 files |

**Total:** 14 new files, 2-3 modified files