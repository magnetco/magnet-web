---
name: Harvest Invoice Integration
overview: Add Harvest API integration to the Data app that syncs invoices to a local database, auto-matches them to existing clients by name, and displays them with a manual refresh trigger showing last sync time.
todos:
  - id: db-schema
    content: Create invoices and harvest_sync tables, add harvest_client_id to clients
    status: completed
  - id: harvest-service
    content: Create Harvest API client service for fetching invoices and clients
    status: completed
  - id: harvest-routes
    content: Create /api/harvest routes for sync trigger and status
    status: completed
  - id: invoices-routes
    content: Create /api/invoices routes for querying stored invoices
    status: completed
  - id: frontend-tab
    content: Add Invoices tab with sync button and table view
    status: completed
  - id: client-invoices
    content: Show related invoices in client detail view
    status: completed
---

# Harvest Invoice Integration



## Architecture Overview

```mermaid
flowchart LR
    subgraph Frontend
        SyncBtn[Sync Button]
        InvoicesTab[Invoices Tab]
        ClientView[Client Detail]
    end
    
    subgraph Backend
        HarvestRoute[/api/harvest/sync]
        InvoicesRoute[/api/invoices]
        HarvestService[Harvest API Client]
    end
    
    subgraph External
        HarvestAPI[Harvest API v2]
    end
    
    subgraph Database
        InvoicesTable[invoices table]
        SyncMeta[harvest_sync table]
        ClientsTable[clients table]
    end
    
    SyncBtn --> HarvestRoute
    HarvestRoute --> HarvestService
    HarvestService --> HarvestAPI
    HarvestService --> InvoicesTable
    HarvestService --> SyncMeta
    InvoicesTab --> InvoicesRoute
    InvoicesRoute --> InvoicesTable
    ClientView --> InvoicesRoute
    InvoicesTable -.-> ClientsTable
```



## Implementation Steps

### 1. Environment Setup

Add Harvest API credentials to `.env`:

- `HARVEST_ACCESS_TOKEN` - Personal Access Token from Harvest
- `HARVEST_ACCOUNT_ID` - Your Harvest account ID

You can generate these at https://id.getharvest.com/developers

### 2. Database Schema

Create two new tables:**`invoices`** - stores synced invoice data

- `id`, `harvest_id`, `client_id` (FK to clients), `harvest_client_name`
- `number`, `amount`, `due_amount`, `status` (draft/open/paid/closed)
- `issue_date`, `due_date`, `paid_date`, `subject`, `notes`
- `created_at`, `updated_at`

**`harvest_sync`** - tracks sync metadata

- `id`, `entity_type`, `last_synced_at`, `status`, `error_message`

Add to clients table:

- `harvest_client_id` - for caching the matched Harvest client ID

### 3. Backend Implementation

Create new files:

- [`server/services/harvest.ts`](server/services/harvest.ts) - Harvest API client with methods for fetching invoices and clients
- [`server/routes/harvest.ts`](server/routes/harvest.ts) - Sync endpoint with auto-matching logic
- [`server/routes/invoices.ts`](server/routes/invoices.ts) - CRUD for local invoice data

Auto-matching logic:

1. Fetch all Harvest clients and invoices
2. For each Harvest client, find matching client in DB by normalized name comparison
3. Link invoices to matched clients, store `harvest_client_id` on client record
4. Store unmatched invoices with `client_id = null` (can be manually linked later)

### 4. Frontend Implementation

Modify existing files:

- [`src/App.tsx`](src/App.tsx) - Add "Invoices" to Tab type
- [`src/components/TabNav.tsx`](src/components/TabNav.tsx) - Add Invoices tab
- [`src/components/TableView.tsx`](src/components/TableView.tsx) - Handle invoices table with sync button
- [`src/lib/api.ts`](src/lib/api.ts) - Add invoice and sync API calls

The invoices tab will show:

- "Sync from Harvest" button with last sync timestamp
- Table with columns: Invoice #, Client, Amount, Due Amount, Status, Issue Date, Due Date
- Status displayed as colored badge (green=paid, yellow=open, gray=draft, etc.)

### 5. Client Detail Enhancement

Show related invoices in the client RecordView with summary stats (total invoiced, total paid, outstanding).

## Key API Endpoints

| Endpoint | Method | Description ||----------|--------|-------------|| `/api/harvest/sync` | POST | Trigger full sync from Harvest || `/api/harvest/status` | GET | Get last sync time and status || `/api/invoices` | GET | List all invoices (with client filter) || `/api/invoices/:id` | GET | Get single invoice |

## Notes

- Harvest API v2 uses Bearer token auth with Personal Access Tokens
- Rate limit: 100 requests per 15 seconds (plenty for batch sync)