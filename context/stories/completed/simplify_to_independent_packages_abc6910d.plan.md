---
name: Simplify to Independent Packages
overview: Remove pnpm workspace configuration and duplicate files to match magnet-web's simpler structure, making website and studio completely independent packages.
todos:
  - id: delete-duplicates
    content: "Delete duplicate folders: prisma/, prisma.config.ts, lib/, contexts/, data/"
    status: completed
  - id: delete-workspace
    content: "Delete workspace files: package.json, pnpm-workspace.yaml, pnpm-lock.yaml"
    status: completed
  - id: delete-node-modules
    content: Delete root node_modules/
    status: completed
  - id: generate-studio-lockfile
    content: Run pnpm install in studio/ to generate its own lockfile
    status: completed
  - id: update-readme
    content: Update README.md to reflect simpler structure
    status: completed
---

# Simplify Repository Structure

Convert from pnpm workspace monorepo to independent packages like magnet-web.

## Current vs Target Structure

```mermaid
flowchart LR
    subgraph current [Current - Cluttered]
        direction TB
        R1[root package.json]
        R2[pnpm-workspace.yaml]
        R3[pnpm-lock.yaml]
        R4[prisma/]
        R5[prisma.config.ts]
        R6[lib/]
        R7[contexts/]
        R8[data/]
    end
    
    subgraph target [Target - Clean]
        direction TB
        T1[context/]
        T2[studio/]
        T3[website/]
        T4[README.md]
        T5[.gitignore]
    end
    
    current -->|cleanup| target
```

## Files to Delete

| Path | Reason |
|------|--------|
| [`prisma/`](prisma/) | Duplicate of website's, no migrations |
| [`prisma.config.ts`](prisma.config.ts) | Duplicate with merge conflicts |
| [`lib/`](lib/) | Duplicate with debug logging code |
| [`contexts/`](contexts/) | Duplicate with debug logging code |
| [`data/`](data/) | Empty, unused workspace package |
| [`package.json`](package.json) | Workspace root config |
| [`pnpm-workspace.yaml`](pnpm-workspace.yaml) | Workspace definition |
| `pnpm-lock.yaml` | Workspace lockfile |
| `node_modules/` | Will regenerate per-package |

## Post-Cleanup: Generate Studio Lockfile

The [`studio/`](studio/) package currently has no lockfile (was using root's). After cleanup:

```bash
cd studio && pnpm install
```

This generates `studio/pnpm-lock.yaml`.

## Final Structure

```
enthusiastauto/
├── context/          # Documentation
├── studio/           # Sanity CMS (independent)
│   ├── package.json
│   └── pnpm-lock.yaml  # NEW
├── website/          # Next.js app (independent)
│   ├── package.json
│   └── pnpm-lock.yaml  # Already exists
├── .gitignore
└── README.md
```

## Update README

Update [`README.md`](README.md) to reflect the new structure - remove any references to workspace commands and update Quick Start to match magnet-web's style:

```bash
cd website && pnpm dev    # Website at localhost:3000
cd studio && pnpm dev     # Sanity Studio at localhost:3333
```