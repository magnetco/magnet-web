import { Router, Request, Response } from 'express'
import { sql } from '../db.js'
import { harvestAPI, HarvestInvoice } from '../services/harvest.js'

const router = Router()

/**
 * Normalize a name for fuzzy matching
 * - Lowercase
 * - Remove common suffixes (LLC, Inc, Corp, etc.)
 * - Remove extra whitespace and punctuation
 */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\b(llc|inc|corp|corporation|company|co|ltd|limited|llp|pllc|pc|p\.c\.|l\.l\.c\.|the)\b/gi, '')
    .replace(/[.,'"]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Find matching client in database by name
 */
async function findMatchingClient(harvestClientName: string): Promise<{ id: number; name: string } | null> {
  const normalizedHarvestName = normalizeName(harvestClientName)
  
  // First check if we have an exact harvest_client_id match
  const exactMatch = await sql`
    SELECT id, name FROM clients 
    WHERE harvest_client_id IS NOT NULL
    ORDER BY id
  `
  
  // Get all clients to do fuzzy matching
  const clients = await sql`
    SELECT c.id, c.name, co.name as company_name
    FROM clients c
    LEFT JOIN companies co ON c.company_id = co.id
  `
  
  for (const client of clients) {
    // Try matching on client name
    if (normalizeName(client.name) === normalizedHarvestName) {
      return { id: client.id, name: client.name }
    }
    // Try matching on company name
    if (client.company_name && normalizeName(client.company_name) === normalizedHarvestName) {
      return { id: client.id, name: client.name }
    }
  }
  
  return null
}

/**
 * GET /api/harvest/status
 * Get sync status and last sync time
 */
router.get('/status', async (_req: Request, res: Response) => {
  try {
    const syncStatus = await sql`
      SELECT entity_type, last_synced_at, status, error_message, records_synced
      FROM harvest_sync
      WHERE entity_type = 'invoices'
    `
    
    if (syncStatus.length === 0) {
      return res.json({
        lastSyncedAt: null,
        status: 'never',
        recordsSynced: 0,
        errorMessage: null
      })
    }
    
    res.json({
      lastSyncedAt: syncStatus[0].last_synced_at,
      status: syncStatus[0].status,
      recordsSynced: syncStatus[0].records_synced,
      errorMessage: syncStatus[0].error_message
    })
  } catch (error) {
    console.error('Error fetching sync status:', error)
    res.status(500).json({ error: 'Failed to fetch sync status' })
  }
})

/**
 * POST /api/harvest/sync
 * Trigger a full sync from Harvest
 */
router.post('/sync', async (_req: Request, res: Response) => {
  try {
    // Update status to syncing
    await sql`
      UPDATE harvest_sync 
      SET status = 'syncing', error_message = NULL, updated_at = NOW()
      WHERE entity_type = 'invoices'
    `
    
    console.log('🔄 Starting Harvest sync...')
    
    // Fetch all invoices from Harvest
    const harvestInvoices = await harvestAPI.getAllInvoices()
    console.log(`📥 Fetched ${harvestInvoices.length} invoices from Harvest`)
    
    // Build a map of Harvest client IDs to matched local client IDs
    const clientMatchCache = new Map<number, number | null>()
    let matchedCount = 0
    let unmatchedCount = 0
    
    // Process each invoice
    for (const invoice of harvestInvoices) {
      // Check cache or find matching client
      let clientId: number | null = null
      
      if (clientMatchCache.has(invoice.client.id)) {
        clientId = clientMatchCache.get(invoice.client.id) ?? null
      } else {
        const match = await findMatchingClient(invoice.client.name)
        clientId = match?.id ?? null
        clientMatchCache.set(invoice.client.id, clientId)
        
        // If we found a match, update the client's harvest_client_id
        if (clientId) {
          await sql`
            UPDATE clients SET harvest_client_id = ${invoice.client.id}
            WHERE id = ${clientId} AND (harvest_client_id IS NULL OR harvest_client_id != ${invoice.client.id})
          `
          matchedCount++
        } else {
          unmatchedCount++
        }
      }
      
      // Upsert the invoice
      await sql`
        INSERT INTO invoices (
          harvest_id, harvest_client_id, harvest_client_name, client_id,
          number, amount, due_amount, status,
          issue_date, due_date, paid_date, subject, notes, currency,
          updated_at
        ) VALUES (
          ${invoice.id}, ${invoice.client.id}, ${invoice.client.name}, ${clientId},
          ${invoice.number}, ${invoice.amount}, ${invoice.due_amount}, ${invoice.state},
          ${invoice.issue_date}, ${invoice.due_date}, ${invoice.paid_date}, 
          ${invoice.subject}, ${invoice.notes}, ${invoice.currency},
          NOW()
        )
        ON CONFLICT (harvest_id) DO UPDATE SET
          harvest_client_id = EXCLUDED.harvest_client_id,
          harvest_client_name = EXCLUDED.harvest_client_name,
          client_id = EXCLUDED.client_id,
          number = EXCLUDED.number,
          amount = EXCLUDED.amount,
          due_amount = EXCLUDED.due_amount,
          status = EXCLUDED.status,
          issue_date = EXCLUDED.issue_date,
          due_date = EXCLUDED.due_date,
          paid_date = EXCLUDED.paid_date,
          subject = EXCLUDED.subject,
          notes = EXCLUDED.notes,
          currency = EXCLUDED.currency,
          updated_at = NOW()
      `
    }
    
    // Update sync status
    await sql`
      UPDATE harvest_sync 
      SET status = 'success', 
          last_synced_at = NOW(), 
          records_synced = ${harvestInvoices.length},
          error_message = NULL,
          updated_at = NOW()
      WHERE entity_type = 'invoices'
    `
    
    console.log(`✅ Sync complete: ${harvestInvoices.length} invoices, ${matchedCount} clients matched, ${unmatchedCount} clients unmatched`)
    
    res.json({
      success: true,
      invoicesSynced: harvestInvoices.length,
      clientsMatched: matchedCount,
      clientsUnmatched: unmatchedCount
    })
  } catch (error: any) {
    console.error('Error syncing from Harvest:', error)
    
    // Update sync status to error
    await sql`
      UPDATE harvest_sync 
      SET status = 'error', error_message = ${error.message}, updated_at = NOW()
      WHERE entity_type = 'invoices'
    `
    
    res.status(500).json({ error: error.message || 'Failed to sync from Harvest' })
  }
})

/**
 * GET /api/harvest/test
 * Test the Harvest API connection
 */
router.get('/test', async (_req: Request, res: Response) => {
  try {
    const result = await harvestAPI.testConnection()
    res.json(result)
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router

