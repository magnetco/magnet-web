# Magnet Data

A minimalist CRUD app for managing Neon database tables (Clients, Leads, Applicants).

## Features

- **Tab Navigation** - Switch between Clients, Leads, and Applicants tables
- **Sortable Columns** - Click column headers to sort ascending/descending
- **Inline Editing** - Click any cell to edit, press Enter or blur to save
- **Version Tracking** - Every edit is logged with old/new values and timestamp
- **Version History** - Click the clock icon on any cell to view change history
- **Revert Changes** - Revert any field to a previous value
- **CSV Export** - One-click export of any table to CSV
- **Lead → Client Conversion** - Convert leads to clients with linked FK

## Setup

1. Copy the `DATABASE_URL` from `../website/.env.local` to a `.env` file:
   ```bash
   cp ../website/.env.local .env
   # Edit .env to keep only DATABASE_URL
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run migrations (if needed):
   ```bash
   # See ../website/src/lib/db/migrations/ for SQL files
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

5. Open http://localhost:4000

## Architecture

- **Frontend:** React 18 + Vite + TypeScript + TailwindCSS (port 4000)
- **Backend:** Express.js API (port 4001)
- **Database:** Neon PostgreSQL

## API Endpoints

### Clients
- `GET /api/clients` - List all clients
- `POST /api/clients` - Create a client
- `PATCH /api/clients/:id` - Update a client field
- `DELETE /api/clients/:id` - Delete a client
- `GET /api/clients/export` - Export clients to CSV

### Leads
- `GET /api/leads` - List all leads
- `POST /api/leads` - Create a lead
- `PATCH /api/leads/:id` - Update a lead field
- `DELETE /api/leads/:id` - Delete a lead
- `POST /api/leads/:id/convert` - Convert lead to client
- `GET /api/leads/export` - Export leads to CSV

### Applicants
- `GET /api/applicants` - List all applicants
- `POST /api/applicants` - Create an applicant
- `PATCH /api/applicants/:id` - Update an applicant field
- `DELETE /api/applicants/:id` - Delete an applicant
- `GET /api/applicants/export` - Export applicants to CSV

### Versions
- `GET /api/versions/:table/:recordId` - Get version history for a record
- `POST /api/versions/:versionId/revert` - Revert to a specific version

## Brand Colors

Uses the same Magnet brand colors as the main website:
- Oxblood: `#220002`
- Snow: `#F5F7F7`
- Ember: `#F9432B`
- Basalt: `#2A4144`

