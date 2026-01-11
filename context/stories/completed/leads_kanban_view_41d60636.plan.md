---
name: Leads Kanban View
overview: Add a Kanban view to the Leads page with drag-and-drop status management using a CRM sales pipeline (New, Contacted, Qualified, Proposal, Negotiation, Won, Lost).
todos:
  - id: db-migration
    content: Add status column to leads table via migration script
    status: completed
  - id: backend-routes
    content: Update leads.ts routes to handle status field
    status: completed
  - id: frontend-types
    content: Add status to Lead interface in api.ts
    status: completed
  - id: kanban-component
    content: Create LeadsKanbanView.tsx with 7 pipeline columns
    status: completed
  - id: leads-view
    content: Create LeadsView.tsx with table/kanban toggle
    status: completed
  - id: app-integration
    content: Update App.tsx to use LeadsView for leads tab
    status: completed
  - id: table-record-update
    content: Add status field to TableView and RecordView for leads
    status: completed
---

# Leads Kanban View Implementation

Add a Kanban board to the Leads tab, matching the existing Clients Kanban pattern, with sales pipeline statuses for CRM workflow.

## Pipeline Stages

- **New** - Fresh leads, not yet contacted
- **Contacted** - Initial outreach made
- **Qualified** - Confirmed as good fit
- **Proposal** - Proposal/quote sent
- **Negotiation** - In active discussion
- **Won** - Converted to client
- **Lost** - Did not convert

## Changes Required

### 1. Database: Add status field to leads table

- Create migration to add `status` column with default `'new'`
- Valid values: `new`, `contacted`, `qualified`, `proposal`, `negotiation`, `won`, `lost`

### 2. Backend: Update leads routes

- Update [`server/routes/leads.ts`](data/server/routes/leads.ts) to include `status` in allowed fields for PATCH
- Add status to default value in POST if not provided

### 3. Frontend Types: Update Lead interface

- Add `status` field to Lead interface in [`src/lib/api.ts`](data/src/lib/api.ts)

### 4. Create LeadsKanbanView component

- New file: `src/components/LeadsKanbanView.tsx`
- Follow pattern from [`KanbanView.tsx`](data/src/components/KanbanView.tsx)
- 7 columns with appropriate colors for each pipeline stage
- Drag-and-drop to change status
- Show lead name, company, and email on cards

### 5. Create LeadsView wrapper component

- New file: `src/components/LeadsView.tsx`
- Follow pattern from [`ClientsView.tsx`](data/src/components/ClientsView.tsx)
- Table/Kanban toggle buttons
- Pass through `onRecordClick` prop

### 6. Update App.tsx

- Import and use `LeadsView` instead of `TableView` for leads tab
- Similar to how `ClientsView` is handled

### 7. Update TableView and RecordView

- Add `status` column to leads in [`TableView.tsx`](data/src/components/TableView.tsx) column definitions