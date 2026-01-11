---
name: Rename nextjs-app to website
overview: Rename the `nextjs-app` folder to `website` and update all references across the codebase, including npm workspaces, scripts, and documentation.
todos:
  - id: rename-folder
    content: Rename nextjs-app folder to website
    status: completed
  - id: update-root-package
    content: Update root package.json workspaces and scripts
    status: completed
  - id: update-website-package
    content: Update website/package.json name field
    status: completed
  - id: regenerate-lockfile
    content: Delete and regenerate package-lock.json
    status: completed
  - id: update-seed-script
    content: Update comments in seed-rates.ts
    status: completed
  - id: update-docs
    content: Find/replace nextjs-app → website in all documentation files
    status: completed
---

# Rename nextjs-app to website

## Code Changes (Required)

### 1. Rename the folder
```bash
mv nextjs-app website
```

### 2. Update root [package.json](package.json)
- Line 6: `"dev:next": "npm run dev --workspace=nextjs-app"` → `--workspace=website`
- Line 9: `"seed-rates": "npx tsx nextjs-app/scripts/seed-rates.ts"` → `website/scripts/seed-rates.ts`
- Line 27: workspaces array: `"nextjs-app"` → `"website"`

### 3. Update [website/package.json](nextjs-app/package.json)
- Line 2: `"name": "nextjs-app"` → `"name": "website"`

### 4. Regenerate package-lock.json
```bash
rm package-lock.json && npm install
```
This will update all the internal workspace references automatically.

### 5. Update [nextjs-app/scripts/seed-rates.ts](nextjs-app/scripts/seed-rates.ts)
- Line 4 comment: references `nextjs-app directory`
- Line 11 comment: references `nextjs-app/.env.local`

---

## Documentation Updates (110+ references)

The following files contain `nextjs-app` references in documentation/comments:

- [README.md](README.md) - 9 references
- [context/ARCHITECTURE.md](context/ARCHITECTURE.md) - 15 references
- [context/STANDARDS.md](context/STANDARDS.md) - 1 reference
- [docs/COMPONENT_ARCHITECTURE.md](docs/COMPONENT_ARCHITECTURE.md) - 16 references
- [docs/COMPONENT_MIGRATION_GUIDE.md](docs/COMPONENT_MIGRATION_GUIDE.md) - 12 references
- [docs/RULES.md](docs/RULES.md) - 7 references
- [docs/ONBOARDING.md](docs/ONBOARDING.md) - 21 references
- [docs/QUICK_START.md](docs/QUICK_START.md) - 6 references
- [docs/RATES_PORTAL_SETUP.md](docs/RATES_PORTAL_SETUP.md) - 7 references
- [docs/RATES_PORTAL_IMPLEMENTATION.md](docs/RATES_PORTAL_IMPLEMENTATION.md) - 14 references
- [docs/manual-installation.md](docs/manual-installation.md) - 3 references
- [nextjs-app/app/admin/README.md](nextjs-app/app/admin/README.md) - 1 reference

---

## Summary

- **Critical (will break build):** root package.json, website/package.json, package-lock.json
- **Functional (scripts):** seed-rates.ts comments
- **Documentation:** 12 files with path references
- **You're handling:** Vercel root directory setting