---
name: Create STANDARDS.md
overview: Create a lightweight, portable STANDARDS.md document covering design, components, tokens, Next.js, Sanity, Neon DB, and production launch testing standards that can be reused across projects.
todos:
  - id: create-standards
    content: Create context/STANDARDS.md with all seven sections
    status: completed
---

# STANDARDS.md Creation Plan

Create a new file at [`context/STANDARDS.md`](context/STANDARDS.md) that serves as a portable reference document for project-wide standards.

## Document Structure

The file will be organized into seven main sections:

### 1. Design Standards
- Color system approach (semantic tokens, light/dark mode)
- Typography scale with paired line-height/letter-spacing
- Spacing system (4px/8px grid)
- Shadow elevations
- Animation/motion guidelines
- Accessibility requirements (WCAG 2.1 AA, reduced motion support)

### 2. Component Standards
- Server Components by default, `'use client'` only when needed
- Composition over props drilling
- TypeScript strict mode required
- Component organization pattern (`components/ui/`, `components/[feature]/`, `components/shared/`)
- ShadCN UI usage guidelines
- Naming conventions (PascalCase files, exports)

### 3. Token Standards
- CSS custom properties structure in `globals.css` via `@theme inline`
- ShadCN theme variables pattern (`:root` and `.dark`)
- Token naming conventions (color-[category]-[variant], radius-[size])
- Layout tokens (page padding, container max-width, header height)

### 4. Next.js Standards
- App Router patterns (page.tsx, layout.tsx, loading.tsx, error.tsx)
- Rendering strategy guidelines (when to use SSG/ISR/SSR/CSR)
- Data fetching patterns (server components, fetch caching)
- API route structure
- Metadata and SEO patterns
- Image optimization requirements

### 5. Sanity Standards
- Schema naming conventions
- Document structure patterns
- GROQ query best practices
- Webhook/revalidation integration
- Preview mode setup

### 6. Neon DB / Prisma Standards
- Schema conventions (cuid IDs, timestamps, indexes)
- Relation patterns (onDelete: Cascade)
- Migration workflow
- Connection pooling requirements (POSTGRES_PRISMA_URL vs DATABASE_URL)
- Query patterns with Prisma

### 7. Production Launch Testing Standards
- Pre-launch checklist categories
- Core functionality verification
- Performance benchmarks (Core Web Vitals)
- SEO validation
- Security audit checklist
- Cross-browser/device testing
- Error monitoring setup

## Design Decisions

- **Lightweight**: Concise rules, not exhaustive documentation
- **Portable**: No project-specific values; uses generic examples
- **Actionable**: Each section contains clear do/don't guidance
- **Reference-oriented**: Quick lookup format, not tutorial-style