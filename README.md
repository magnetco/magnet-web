# Magnet Web

The Magnet agency website. This README serves both humans and AI assistants.

## Quick Start

```bash
cd website && pnpm dev    # Website at localhost:3000
cd studio && pnpm dev     # Sanity Studio at localhost:3333
```

## Context

Read these files in order. Start with OVERVIEW, then read what's relevant to your task.

| Order | File | Purpose |
|-------|------|---------|
| 1 | [`context/OVERVIEW.md`](context/OVERVIEW.md) | Start here — what Magnet is, who we serve, the problem we solve |
| 2 | [`context/STRATEGY.md`](context/STRATEGY.md) | Business strategy, competitive positioning, four lifecycle phases |
| 3 | [`context/ICP.md`](context/ICP.md) | Client types, technologies, B2B vs B2C, enterprise vs SMB |
| 4 | [`context/METHOD.md`](context/METHOD.md) | Complete offer architecture, service capabilities, deliverables |
| 5 | [`context/BRAND.md`](context/BRAND.md) | Voice, tone, messaging guidelines, what to say |
| 6 | [`context/DESIGN.md`](context/DESIGN.md) | Colors, typography, spacing, visual system |
| 7 | [`context/PRICING.md`](context/PRICING.md) | Pricing structure and packaging |
| 8 | [`context/ROADMAP.md`](context/ROADMAP.md) | What's shipped, in progress, and planned |

## Tech Stack

- **Next.js 16** (App Router) — server components by default
- **React 19** — UI
- **TypeScript** — strict types
- **Tailwind CSS v4** — styling via `globals.css` theme
- **Neon** — Postgres database
- **Resend** — transactional email
- **Vercel AI SDK + Groq** — AI chat widget (Llama 3.1 70B)
- **Sanity CMS** — content management for blog posts

## Project Layout

```
magnet-web/
├── context/          # Business context and guidelines (read first)
├── studio/           # Sanity CMS Studio
├── website/          # Next.js application
│   ├── src/
│   │   ├── app/      # Pages and API routes
│   │   ├── components/
│   │   │   ├── elements/   # Primitives: Button, Heading, Container
│   │   │   ├── icons/      # Icon components
│   │   │   └── sections/   # Page sections
│   │   ├── lib/      # Utilities (db, email, sanity)
│   │   └── data/     # Static data
│   └── public/       # Static assets
└── README.md         # This file
```

## Code Style

**Formatting:**
- No semicolons
- Single quotes
- 120 char line width

**Classes:** Use `clsx/lite`, not template literals.

```tsx
// Good
className={clsx('base', isActive && 'active')}

// Bad
className={`base ${isActive ? 'active' : ''}`}
```

**Exports:** Named exports for components, not default.

**Client components:** Only add `'use client'` when using hooks, events, or browser APIs.

**Naming:**

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `ButtonLink` |
| Files | kebab-case | `button-link.tsx` |
| Functions | camelCase | `handleSubmit` |

**Imports:** Order by external → internal → types.

```tsx
import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

import { Button } from '@/components/elements/button'
```

## Component Pattern

```tsx
import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

export function Example({
  variant = 'default',
  className,
  children,
  ...props
}: {
  variant?: 'default' | 'alternate'
} & ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'base-classes',
        variant === 'default' && 'default-styles',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

## Colors

| Name | Hex | Usage |
|------|-----|-------|
| `ember` | `#F9432B` | Primary accent, CTAs |
| `oxblood` | `#220002` | Text, headings |
| `snow` | `#F5F7F7` | Page background |
| `coral` | `#FFB5AB` | Dark mode accent |

Full palette in [`context/DESIGN.md`](context/DESIGN.md).

## Key Components

**Typography:** `Heading`, `Subheading`, `Text`, `Eyebrow`

**Buttons:** `Button`, `ButtonLink`, `SoftButton`, `SoftButtonLink`, `PlainButton`, `PlainButtonLink`

**Layout:** `Container`, `Section`, `Main`

**Forms:** `Input`, `Select`, `Label`

**Interactive:** `ChatWidget` (AI assistant), `DevBar` (development tools)

All in `@/components/elements/`.

## Decision Rules

When making tradeoffs:

1. **Strategy over aesthetics** — see [`context/STRATEGY.md`](context/STRATEGY.md)
2. **Clarity over novelty** — see [`context/BRAND.md`](context/BRAND.md)
3. **Existing patterns over new abstractions** — check existing code first

## Don't

- Add semicolons
- Use className template literals
- Add packages without asking
- Create abstractions for one-time use
- Write clever code when clear code works

## Environment

Create `website/.env.local`:

```bash
DATABASE_URL=your_neon_url
RESEND_API_KEY=your_resend_key
GROQ_API_KEY=your_groq_key
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
```

## Build

```bash
cd website
pnpm build
pnpm start
```

Deployed on Vercel.
