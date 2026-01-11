---
name: Remove monorepo workspaces
overview: Convert the monorepo with npm workspaces into isolated projects within a single git repo. Each project (website, studio) will have independent dependencies with no hoisting or shared node_modules.
todos:
  - id: check-shared-deps
    content: Check root package.json for dependencies that need to move to website
    status: completed
  - id: delete-root-pkg
    content: Delete root package.json, package-lock.json, and node_modules
    status: completed
  - id: update-website-deps
    content: Add missing dependencies to website/package.json and npm install
    status: completed
  - id: update-studio
    content: Run npm install in studio to generate its own lockfile
    status: completed
  - id: update-gitignore
    content: Update .gitignore for new structure
    status: in_progress
  - id: update-readme
    content: Update root README.md with new project structure and commands
    status: pending
---

# Remove npm Workspaces - Isolate Projects

## Target Structure

```
/
├── context/           # Documentation (unchanged)
├── website/           # Next.js app (independent)
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/
├── studio/            # Sanity Studio (independent)
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/
├── data/              # Future CRUD app
├── .gitignore
└── README.md          # Root readme explaining the structure
```

## Changes Required

### 1. Delete root package management files

- Delete `/package.json` (contains workspaces config)
- Delete `/package-lock.json`
- Delete `/node_modules/` (the hoisted modules)

### 2. Update website to be standalone

- Remove workspace-specific references
- Move any shared root dependencies (`clsx`, `gsap`, `three`) into `website/package.json`
- Generate fresh `package-lock.json` with `npm install`

### 3. Update studio to be standalone  

- Already mostly independent
- Generate fresh `package-lock.json` with `npm install`

### 4. Update .gitignore

- Ensure each project's `node_modules/` is ignored
- Remove workspace-specific ignores

### 5. Update root README.md

- Document the new structure
- Add instructions for running each project independently

### 6. Update Vercel configuration

- Root directory stays `website` (already configured)
- No changes needed for deployment

## Commands to Run Each Project

After this change:

- **Website:** `cd website && npm install && npm run dev`
- **Studio:** `cd studio && npm install && npm run dev`
- **Both:** Run in separate terminals (no shared `npm run dev` command)