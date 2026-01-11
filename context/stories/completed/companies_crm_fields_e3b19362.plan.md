---
name: Companies CRM Fields
overview: Add Annual Revenue and other CRM-useful enrichable fields to the Companies table, update the API routes and enrichment logic to support them.
todos:
  - id: migration
    content: Create migration 010_add_company_crm_fields.sql with ALTER TABLE statements
    status: completed
  - id: companies-route
    content: Update companies.ts allowedFields and INSERT to include new fields
    status: completed
  - id: enrich-route
    content: Update enrich.ts prompt and field mapping for new CRM data
    status: completed
---

# Add CRM Fields to Companies Table

## New Fields

| Field | Type | Description |
|-------|------|-------------|
| `annual_revenue` | TEXT | Revenue range like "$10M-$50M" |
| `headquarters` | TEXT | City, Country |
| `founded_year` | INTEGER | Year founded |
| `description` | TEXT | Company description (separate from notes) |
| `linkedin_url` | TEXT | Company LinkedIn profile |
| `funding_stage` | TEXT | e.g. "Series B", "Public", "Bootstrapped" |
| `total_funding` | TEXT | e.g. "$50M" |
| `employee_count` | INTEGER | Specific count if known |
| `phone` | TEXT | Main company phone |
| `technologies` | TEXT | Comma-separated tech stack |

## Files to Modify

1. **New migration** - Create `010_add_company_crm_fields.sql` in [`website/src/lib/db/migrations/`](website/src/lib/db/migrations/)

2. **[`data/server/routes/companies.ts`](data/server/routes/companies.ts)** - Add new fields to `allowedFields` array and update INSERT statement

3. **[`data/server/routes/enrich.ts`](data/server/routes/enrich.ts)** - Expand Perplexity prompt to fetch new fields and store them (headquarters/founded are already fetched but not saved)