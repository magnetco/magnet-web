# Magnet Web

The Magnet agency website.

## Quick Start

```bash
# Website (Next.js)
cd website && pnpm install && pnpm dev
```

Open [localhost:3000](http://localhost:3000).

```bash
# Sanity Studio (CMS)
cd studio && pnpm install && pnpm dev
```

Open [localhost:3333](http://localhost:3333).

## Documentation

| File | Purpose |
|------|---------|
| [`docs/CONTEXT.md`](docs/CONTEXT.md) | Business background, ICP, what Magnet does |
| [`docs/BRAND.md`](docs/BRAND.md) | Voice, tone, messaging guidelines |
| [`docs/DESIGN.md`](docs/DESIGN.md) | Colors, typography, visual system |
| [`docs/STRATEGY.md`](docs/STRATEGY.md) | Business strategy, competitive position |
| [`docs/METHOD.md`](docs/METHOD.md) | Complete offer architecture and methodology |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | What's shipped, in progress, and planned |
| [`AGENTS.md`](AGENTS.md) | AI assistant instructions |

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Neon (Postgres)
- Resend (email)
- Vercel AI SDK + Groq (chat)
- Sanity CMS (content)

## Structure

```
magnet-web/
├── docs/             # Documentation
├── studio/           # Sanity CMS Studio
├── website/          # Next.js application
│   ├── src/
│   │   ├── app/      # Pages and API routes
│   │   ├── components/
│   │   ├── lib/      # Utilities (db, email, sanity)
│   │   └── data/     # Static data
│   └── public/       # Static assets
├── AGENTS.md         # AI instructions
└── README.md         # This file
```

## Environment

Create `website/.env.local`:

```bash
# Database
DATABASE_URL=your_neon_url

# Email
RESEND_API_KEY=your_resend_key

# AI Chat
GROQ_API_KEY=your_groq_key

# Sanity CMS
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
