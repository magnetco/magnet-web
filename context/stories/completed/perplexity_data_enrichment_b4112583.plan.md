---
name: Perplexity Data Enrichment
overview: Add a per-row "Enrich" button to companies and people tables that calls Perplexity's Sonar API to automatically populate missing fields like industry, size, job title, and notes.
todos:
  - id: enrich-route
    content: Create data/server/routes/enrich.ts with Perplexity API integration
    status: completed
  - id: register-route
    content: Register enrichment router in data/server/index.ts
    status: completed
    dependencies:
      - enrich-route
  - id: api-client
    content: Add enrichRecord() function to data/src/lib/api.ts
    status: completed
  - id: ui-button
    content: Add enrich button with loading state to TableView.tsx
    status: completed
    dependencies:
      - api-client
---

# Perplexity Data Enrichment Feature

## Architecture

```mermaid
sequenceDiagram
    participant UI as TableView
    participant API as api.ts
    participant Server as enrich.ts
    participant Perplexity as Perplexity API
    participant DB as Neon DB

    UI->>API: enrichRecord("companies", id)
    API->>Server: POST /api/enrich/companies/:id
    Server->>DB: SELECT current record
    Server->>Perplexity: Chat completion with research prompt
    Perplexity-->>Server: JSON with enriched fields
    Server->>DB: UPDATE empty fields + log versions
    Server-->>API: { enriched, fieldsUpdated, record }
    API-->>UI: Show result, reload table
```

## Implementation

### 1. Create enrichment route

Create [`data/server/routes/enrich.ts`](data/server/routes/enrich.ts) with:
- `queryPerplexity()` helper that calls the Sonar API
- `POST /companies/:id` - researches company, updates industry/size/notes
- `POST /people/:id` - researches person, updates title/notes
- Only updates fields that are currently empty (preserves manual data)
- Logs all changes via existing `logVersion()` for audit trail

### 2. Register route in server

Update [`data/server/index.ts`](data/server/index.ts) to import and mount the enrichment router at `/api/enrich`.

### 3. Add API client function

Add `enrichRecord()` function to [`data/src/lib/api.ts`](data/src/lib/api.ts) that POSTs to the enrichment endpoint and returns the result.

### 4. Add enrich button to table rows

Update [`data/src/components/TableView.tsx`](data/src/components/TableView.tsx):
- Add `enriching` state to track which row is being enriched
- Add `handleEnrich()` handler that calls the API and reloads data
- Render lightning bolt button (with spinner when loading) for companies/people rows