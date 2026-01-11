---
name: Companies & People Tables
overview: Create a normalized data model with Companies and People tables. People belong to Companies, and both Leads and Clients reference a Person.
todos:
  - id: create-companies-table
    content: Create companies table migration
    status: completed
  - id: create-people-table
    content: Create people table with company_id FK
    status: completed
    dependencies:
      - create-companies-table
  - id: add-person-id-fk
    content: Add person_id FK to leads and clients tables
    status: completed
    dependencies:
      - create-people-table
  - id: migrate-existing-data
    content: Migrate existing lead/client data to people and companies
    status: completed
    dependencies:
      - add-person-id-fk
  - id: companies-people-api
    content: Add CRUD routes for companies and people in Data app
    status: completed
    dependencies:
      - create-people-table
  - id: update-leads-api
    content: Update website leads API to find-or-create person/company
    status: completed
    dependencies:
      - add-person-id-fk
  - id: update-data-ui
    content: Add Companies and People tabs to Data app UI
    status: completed
    dependencies:
      - companies-people-api
---

# Companies & People Integration

## Overview

Create a normalized data model with **Companies** and **People** tables. People belong to Companies, and both Leads and Clients reference a Person.

```
Companies
    └── People (belong to a company)
            ├── Leads (reference a person)
            └── Clients (reference a person)
```

## Database Changes

**New `companies` table:**
- `id`, `name`, `website`, `industry`, `size`, `notes`
- `created_at`, `updated_at`

**New `people` table:**
- `id`, `name`, `email`, `phone`, `title`, `linkedin_url`, `notes`
- `company_id` FK (references companies, nullable)
- `created_at`, `updated_at`

**Modify `leads` table:**
- Add `person_id` FK (references people)
- Keep existing `name`, `email`, `company` temporarily for migration

**Modify `clients` table:**
- Add `person_id` FK (references people)
- Keep existing `name`, `email`, `company` temporarily for migration

## Data Migration Strategy

1. Create companies table
2. Create people table with `company_id` FK
3. Add `person_id` columns to leads and clients
4. Migrate existing data:
   - Create company records from unique company names in leads/clients
   - Create people records from lead/client name+email, link to companies
   - Set `person_id` FKs on leads and clients
5. (Later) Drop old denormalized columns

## API Changes

- Add CRUD routes for `/api/companies` and `/api/people`
- Update website leads POST to find-or-create person (and company), set `person_id`
- Update clients to use `person_id`

## UI Changes

- Add "Companies" and "People" tabs to Magnet Data app
- Leads/Clients tables show person name + company name (resolved from FKs)

## Key Files

- [`website/src/lib/db/migrations/`](website/src/lib/db/migrations/) - 005_create_companies.sql, 006_create_people.sql, 007_add_person_id.sql
- [`website/src/app/api/leads/route.ts`](website/src/app/api/leads/route.ts) - find-or-create person/company
- [`data/server/routes/`](data/server/routes/) - add companies.ts, people.ts
- [`data/src/lib/api.ts`](data/src/lib/api.ts) - add Company, Person types