---
name: Enrich People Fields
overview: ""
todos:
  - id: migration
    content: Create SQL migration adding 5 new columns to people table
    status: completed
  - id: routes-people
    content: Add new fields to allowedFields in people.ts
    status: completed
    dependencies:
      - migration
  - id: routes-enrich
    content: Update enrich prompt and save logic for new fields
    status: completed
    dependencies:
      - migration
  - id: ui-recordview
    content: Display new fields in RecordView component
    status: completed
    dependencies:
      - routes-people
---

# Add Enrichable Fields to People Table

Add 5 new fields to the People table that can be populated via Perplexity enrichment: location, seniority_level, department, twitter_url, and previous_companies.

## Changes

### 1. Database Migration
Create [`website/src/lib/db/migrations/0009_add_people_enrichment_fields.sql`](website/src/lib/db/migrations/0009_add_people_enrichment_fields.sql):
- `location` (text) - City, State/Country
- `seniority_level` (text) - Entry, Mid, Senior, Director, VP, C-Level
- `department` (text) - Marketing, Engineering, Sales, etc.
- `twitter_url` (text) - Twitter/X profile URL
- `previous_companies` (text) - Comma-separated list of prior employers

### 2. Update Backend Routes
- [`data/server/routes/people.ts`](data/server/routes/people.ts): Add new fields to `allowedFields` array
- [`data/server/routes/enrich.ts`](data/server/routes/enrich.ts): Expand Perplexity prompt and save new fields

### 3. Update UI
- [`data/src/components/RecordView.tsx`](data/src/components/RecordView.tsx): Display new fields in person detail view