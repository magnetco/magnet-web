# AGENTS.md

Instructions for AI assistants working on this codebase.

## Start Here

```bash
cd website && pnpm dev    # Website at localhost:3000
cd studio && pnpm dev     # Sanity Studio at localhost:3333
```

## Before You Code

Read the relevant doc for your task:

| Task | Read |
|------|------|
| Writing copy or content | [`docs/BRAND.md`](docs/BRAND.md) — voice, tone, what to say |
| UI or visual changes | [`docs/DESIGN.md`](docs/DESIGN.md) — colors, typography, spacing |
| Understanding the business | [`docs/CONTEXT.md`](docs/CONTEXT.md) — ICP, problem, approach |
| Client types & technologies | [`docs/ICP.md`](docs/ICP.md) — B2B, B2C, enterprise, platforms |
| Strategy or methodology pages | [`docs/STRATEGY.md`](docs/STRATEGY.md) — four phases, positioning |
| Service capabilities or offers | [`docs/METHOD.md`](docs/METHOD.md) — complete offer architecture |
| What's shipped or planned | [`docs/ROADMAP.md`](docs/ROADMAP.md) — completed, in progress, next |

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
website/src/
├── app/              # Pages (App Router)
│   ├── api/          # API routes (leads, applicants, chat, dev)
│   ├── apply/        # Job application page
│   ├── careers/      # Job listings
│   ├── method/       # Methodology pages (foundation, activation, etc.)
│   └── posts/        # Blog posts (Sanity CMS)
├── components/
│   ├── elements/     # Primitives: Button, Heading, Container, ChatWidget
│   ├── icons/        # Icon components
│   └── sections/     # Page sections
├── lib/
│   ├── db/           # Neon database utilities
│   ├── email/        # Resend email templates
│   └── sanity/       # Sanity CMS client
└── data/             # Static data (jobs, approach)

studio/               # Sanity CMS Studio
├── schemaTypes/      # Content schemas (post, category)
└── sanity.config.ts  # Studio configuration
```

## Code Style

**Formatting:**
- No semicolons
- Single quotes
- 120 char line width

**Classes:** Use `clsx/lite`, not template literals.

```tsx
// ✅ Good
className={clsx('base', isActive && 'active')}

// ❌ Bad
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

Full palette and usage in [`docs/DESIGN.md`](docs/DESIGN.md).

## Key Components

**Typography:** `Heading`, `Subheading`, `Text`, `Eyebrow`

**Buttons:** `Button`, `ButtonLink`, `SoftButton`, `SoftButtonLink`, `PlainButton`, `PlainButtonLink`

**Layout:** `Container`, `Section`, `Main`

**Forms:** `Input`, `Select`, `Label`

**Interactive:** `ChatWidget` (AI assistant), `DevBar` (development tools)

All in `@/components/elements/`.

## Decision Rules

When making tradeoffs:

1. **Strategy over aesthetics** — see [`docs/STRATEGY.md`](docs/STRATEGY.md)
2. **Clarity over novelty** — see [`docs/BRAND.md`](docs/BRAND.md)
3. **Existing patterns over new abstractions** — check existing code first

## Don't

- Add semicolons
- Use className template literals
- Add packages without asking
- Create abstractions for one-time use
- Write clever code when clear code works
