---
name: Monorepo Restructure
overview: "Reorganize the enthusiastauto project into a clean monorepo structure matching magnet-web: Next.js app in /website, Sanity Studio in /studio, documentation in /context, with a placeholder for a future /data admin app."
todos:
  - id: workspace-setup
    content: Create pnpm-workspace.yaml and root package.json
    status: completed
  - id: move-nextjs
    content: Move all Next.js files to /website directory
    status: completed
    dependencies:
      - workspace-setup
  - id: separate-studio
    content: Create standalone /studio with own package.json and configs
    status: completed
    dependencies:
      - move-nextjs
  - id: context-docs
    content: Expand /context with OVERVIEW.md, STACK.md, ROADMAP.md
    status: completed
    dependencies:
      - workspace-setup
  - id: root-readme
    content: Create new root README.md following magnet-web pattern
    status: completed
    dependencies:
      - context-docs
  - id: verify
    content: Test dev servers, build, and Prisma commands work
    status: completed
    dependencies:
      - move-nextjs
      - separate-studio
---

# Monorepo Restructure Plan

Reorganize enthusiastauto from a flat Next.js project into a clean monorepo with separated concerns, better documentation, and room to grow.

## Target Structure

```javascript
enthusiastauto/
├── context/                 # Documentation (human + AI readable)
│   ├── OVERVIEW.md          # What Enthusiast Auto is
│   ├── ARCHITECTURE.md      # Technical architecture (existing, renamed)
│   ├── STACK.md             # Tech stack details
│   └── ROADMAP.md           # What's shipped, planned
├── studio/                  # Sanity CMS Studio (standalone)
│   ├── package.json
│   ├── sanity.config.ts
│   ├── sanity.cli.ts
│   └── schemas/
├── website/                 # Next.js application
│   ├── package.json
│   ├── next.config.ts
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── prisma/
│   └── ...
├── data/                    # (Future) Admin CRUD app
│   └── .gitkeep
├── README.md                # Root README with quick start
├── package.json             # Root package.json (workspace scripts)
├── pnpm-workspace.yaml      # pnpm workspace config
└── .env.local               # Shared env (or per-project)
```



## Phase 1: Create Root Monorepo Structure

1. Create `pnpm-workspace.yaml` at root to define workspaces
2. Create root `package.json` with workspace scripts
3. Create placeholder `data/.gitkeep` for future admin app

## Phase 2: Move Next.js App to /website

1. Create `/website` directory
2. Move all Next.js files into `/website`:

- `app/`, `components/`, `lib/`, `contexts/`, `types/`, `emails/`
- `prisma/`, `fonts/`, `scripts/`
- Config files: `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `vitest.config.mts`, `vitest.setup.ts`, `prisma.config.ts`, `components.json`
- `package.json` (becomes website's package.json)

3. Update import paths if needed (should work with `@/` alias)
4. Update `tsconfig.json` paths

## Phase 3: Separate Sanity Studio to /studio

1. Create `/studio` directory with its own `package.json`
2. Move Sanity-specific files:

- `sanity.config.ts` → `/studio/sanity.config.ts`
- `sanity.cli.ts` → `/studio/sanity.cli.ts`
- `sanity/` folder → `/studio/` (schemas, lib, env, structure)

3. Remove embedded studio from Next.js (`app/studio/` route)
4. Keep a read-only Sanity client in `/website/lib/sanity/` for data fetching
5. Studio will run on its own port (e.g., `localhost:3333`)

## Phase 4: Expand /context Documentation

1. Rename `context/architecture.md` → `context/ARCHITECTURE.md`
2. Create new documentation files:

- `context/OVERVIEW.md` - What Enthusiast Auto is, the business
- `context/STACK.md` - Detailed tech stack reference
- `context/ROADMAP.md` - Features shipped and planned

## Phase 5: Update Root README

1. Create new root `README.md` following magnet-web pattern:

- Quick start commands for both website and studio
- Context file reference table
- Tech stack summary
- Project layout diagram
- Development guidelines

## Phase 6: Update Configuration and Scripts

1. Update root `package.json` with workspace scripts:
   ```json
      {
        "scripts": {
          "dev": "pnpm --filter website dev",
          "dev:studio": "pnpm --filter studio dev",
          "build": "pnpm --filter website build",
          "install:all": "pnpm install"
        }
      }
   ```

2. Update `.env.local` handling (stays at root, referenced by both)
3. Update any hardcoded paths in scripts

## Key Files to Modify

| Current Location | New Location |

|------------------|--------------|

| `app/` | `website/app/` |

| `components/` | `website/components/` |

| `lib/` | `website/lib/` |

| `prisma/` | `website/prisma/` |

| `sanity.config.ts` | `studio/sanity.config.ts` |

| `sanity/` | `studio/` (merged) |

| `app/studio/` | Removed (studio is standalone) |

| `context/architecture.md` | `context/ARCHITECTURE.md` |

| `package.json` | `website/package.json` + root `package.json` |

## Risks and Mitigations

- **Vercel deployment**: Will need to update Vercel project settings to point to `/website` as the root directory
- **Import paths**: The `@/` alias should continue working since it's relative to tsconfig
- **Environment variables**: Keep `.env.local` at root, configure both apps to read from parent

## Post-Migration Verification

1. `pnpm install` from root works
2. `cd website && pnpm dev` starts Next.js on :3000
3. `cd studio && pnpm dev` starts Sanity on :3333
4. Build succeeds: `cd website && pnpm build`