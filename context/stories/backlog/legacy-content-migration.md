---
name: Legacy Content Migration
overview: Extract all legacy Webflow content from CSV files and fully rewrite it into markdown files following Magnet's new brand voice, methodology structure, and strategic positioning. Individual files for case studies, consolidated files for everything else.
todos:
  - id: parse-csvs
    content: Parse all CSV files and extract structured data
    status: completed
  - id: case-studies
    content: Create 26 individual case study markdown files with full rewrites
    status: completed
  - id: testimonials
    content: Create consolidated TESTIMONIALS.md organized by theme
    status: completed
  - id: team
    content: Create TEAM.md with rewritten bios
    status: completed
  - id: services
    content: Create SERVICES.md mapping legacy expertise to new methodology
    status: completed
  - id: industries
    content: Create INDUSTRIES.md with industry focus areas
    status: completed
  - id: technologies
    content: Create TECHNOLOGIES.md with tech capabilities
    status: completed
  - id: clients
    content: Create CLIENTS.md as reference list
    status: completed
  - id: faqs
    content: Create FAQS.md with curated Q&A pairs
    status: completed
---

# Legacy Content Migration

Migrate ~800 records of legacy Webflow content into a new `context/content/` folder with full rewrites following the brand voice in [`BRAND.md`](context/BRAND.md) and methodology in [`METHOD.md`](context/METHOD.md).

## Output Structure

```
context/content/
├── case-studies/
│   ├── court-listener.md
│   ├── enthusiast-auto.md
│   └── ... (26 files total)
├── TESTIMONIALS.md
├── TEAM.md
├── SERVICES.md
├── INDUSTRIES.md
├── TECHNOLOGIES.md
├── CLIENTS.md
└── FAQS.md
```

## Rewrite Guidelines

All content will be rewritten to follow these principles from your strategy docs:

- **Voice**: Clear, confident, direct, strategic (not salesy or generic)
- **Structure**: Map work to the 4-phase methodology where applicable (Foundation, Activation, Acceleration, Retention)
- **Outcomes over features**: Lead with results, not activities
- **No "20 years of experience" language**: Show expertise through specificity, not claims
- **No vague agency-speak**: Replace "cutting-edge solutions" with concrete outcomes

## Phase 1: Case Studies (26 files)

Each case study gets its own file with this structure:

```markdown
# [Client Name]
> One-line summary of the outcome

## Context
What the client needed and why

## Approach  
What we did (mapped to methodology phases)

## Outcome
Specific results and metrics

## Testimonial
Client quote (if available)
```

## Phase 2: Consolidated Files

- **TESTIMONIALS.md**: All 37 testimonials organized by theme (Results, Process, Partnership)
- **TEAM.md**: 16 team bios rewritten in new voice
- **SERVICES.md**: 40 expertise areas mapped to the new METHOD.md structure (many will consolidate)
- **INDUSTRIES.md**: 10 industry focuses with key differentiators
- **TECHNOLOGIES.md**: 41 technologies organized by category
- **CLIENTS.md**: 54 clients as a reference list with industry tags
- **FAQS.md**: Curated selection from 246 FAQs (eliminate redundant/outdated)

## What Gets Dropped

- **Articles (353)**: Too large and likely outdated SEO content. Will not migrate.
- **Redundant FAQs**: Many are duplicates or no longer relevant.
- **Generic service copy**: Will be replaced with methodology-aligned content.