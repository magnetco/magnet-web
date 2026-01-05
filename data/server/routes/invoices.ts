import { Router, Request, Response } from 'express'
import { sql } from '../db.js'

const router = Router()

/**
 * GET /api/invoices
 * Get all invoices with optional client filter
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { client_id, status } = req.query
    
    let invoices
    
    if (client_id) {
      invoices = await sql`
        SELECT i.*, c.name as client_name, co.name as company_name
        FROM invoices i
        LEFT JOIN clients c ON i.client_id = c.id
        LEFT JOIN companies co ON c.company_id = co.id
        WHERE i.client_id = ${client_id}
        ORDER BY i.issue_date DESC
      `
    } else if (status) {
      invoices = await sql`
        SELECT i.*, c.name as client_name, co.name as company_name
        FROM invoices i
        LEFT JOIN clients c ON i.client_id = c.id
        LEFT JOIN companies co ON c.company_id = co.id
        WHERE i.status = ${status}
        ORDER BY i.issue_date DESC
      `
    } else {
      invoices = await sql`
        SELECT i.*, c.name as client_name, co.name as company_name
        FROM invoices i
        LEFT JOIN clients c ON i.client_id = c.id
        LEFT JOIN companies co ON c.company_id = co.id
        ORDER BY i.issue_date DESC
      `
    }
    
    res.json(invoices)
  } catch (error) {
    console.error('Error fetching invoices:', error)
    res.status(500).json({ error: 'Failed to fetch invoices' })
  }
})

/**
 * GET /api/invoices/summary
 * Get invoice summary stats
 */
router.get('/summary', async (_req: Request, res: Response) => {
  try {
    const summary = await sql`
      SELECT 
        COUNT(*) as total_count,
        COUNT(CASE WHEN status = 'paid' THEN 1 END) as paid_count,
        COUNT(CASE WHEN status = 'open' THEN 1 END) as open_count,
        COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_count,
        COUNT(CASE WHEN status = 'closed' THEN 1 END) as closed_count,
        COALESCE(SUM(amount), 0) as total_amount,
        COALESCE(SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END), 0) as paid_amount,
        COALESCE(SUM(due_amount), 0) as outstanding_amount
      FROM invoices
    `
    res.json(summary[0])
  } catch (error) {
    console.error('Error fetching invoice summary:', error)
    res.status(500).json({ error: 'Failed to fetch invoice summary' })
  }
})

/**
 * GET /api/invoices/by-client/:clientId
 * Get invoices for a specific client with summary
 */
router.get('/by-client/:clientId', async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params
    
    const invoices = await sql`
      SELECT *
      FROM invoices
      WHERE client_id = ${clientId}
      ORDER BY issue_date DESC
    `
    
    const summary = await sql`
      SELECT 
        COUNT(*) as total_count,
        COALESCE(SUM(amount), 0) as total_invoiced,
        COALESCE(SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END), 0) as total_paid,
        COALESCE(SUM(due_amount), 0) as outstanding
      FROM invoices
      WHERE client_id = ${clientId}
    `
    
    res.json({
      invoices,
      summary: summary[0]
    })
  } catch (error) {
    console.error('Error fetching client invoices:', error)
    res.status(500).json({ error: 'Failed to fetch client invoices' })
  }
})

/**
 * GET /api/invoices/unmatched-clients
 * Get list of Harvest clients that aren't matched to a local client
 */
router.get('/unmatched-clients', async (_req: Request, res: Response) => {
  try {
    const unmatched = await sql`
      SELECT DISTINCT harvest_client_id, harvest_client_name, 
             COUNT(*) as invoice_count,
             SUM(amount) as total_amount
      FROM invoices
      WHERE client_id IS NULL AND harvest_client_id IS NOT NULL
      GROUP BY harvest_client_id, harvest_client_name
      ORDER BY total_amount DESC
    `
    res.json(unmatched)
  } catch (error) {
    console.error('Error fetching unmatched clients:', error)
    res.status(500).json({ error: 'Failed to fetch unmatched clients' })
  }
})

/**
 * POST /api/invoices/link-harvest-client
 * Manually link a Harvest client to a local client
 */
router.post('/link-harvest-client', async (req: Request, res: Response) => {
  try {
    const { harvest_client_id, client_id } = req.body
    
    if (!harvest_client_id || !client_id) {
      return res.status(400).json({ error: 'harvest_client_id and client_id are required' })
    }
    
    // Update all invoices with this harvest_client_id
    const updated = await sql`
      UPDATE invoices 
      SET client_id = ${client_id}, updated_at = NOW()
      WHERE harvest_client_id = ${harvest_client_id}
      RETURNING id
    `
    
    // Also update the client's harvest_client_id for future syncs
    await sql`
      UPDATE clients 
      SET harvest_client_id = ${harvest_client_id}
      WHERE id = ${client_id}
    `
    
    res.json({ 
      success: true, 
      invoicesUpdated: updated.length 
    })
  } catch (error) {
    console.error('Error linking harvest client:', error)
    res.status(500).json({ error: 'Failed to link harvest client' })
  }
})

/**
 * GET /api/invoices/export
 * Export invoices as CSV
 */
router.get('/export', async (_req: Request, res: Response) => {
  try {
    const invoices = await sql`
      SELECT 
        i.id, i.number, i.harvest_client_name, c.name as matched_client,
        i.amount, i.due_amount, i.status, i.issue_date, i.due_date, i.paid_date,
        i.subject, i.currency
      FROM invoices i
      LEFT JOIN clients c ON i.client_id = c.id
      ORDER BY i.issue_date DESC
    `
    
    if (invoices.length === 0) {
      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', 'attachment; filename=invoices.csv')
      return res.send('id,number,harvest_client,matched_client,amount,due_amount,status,issue_date,due_date,paid_date,subject,currency')
    }

    const headers = Object.keys(invoices[0])
    const csv = [
      headers.join(','),
      ...invoices.map(row => 
        headers.map(h => {
          const val = row[h]
          if (val === null) return ''
          if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
            return `"${val.replace(/"/g, '""')}"`
          }
          return val
        }).join(',')
      )
    ].join('\n')

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename=invoices.csv')
    res.send(csv)
  } catch (error) {
    console.error('Error exporting invoices:', error)
    res.status(500).json({ error: 'Failed to export invoices' })
  }
})

/**
 * GET /api/invoices/:id
 * Get single invoice by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    const invoices = await sql`
      SELECT i.*, c.name as client_name, co.name as company_name
      FROM invoices i
      LEFT JOIN clients c ON i.client_id = c.id
      LEFT JOIN companies co ON c.company_id = co.id
      WHERE i.id = ${id}
    `
    
    if (invoices.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' })
    }
    
    res.json(invoices[0])
  } catch (error) {
    console.error('Error fetching invoice:', error)
    res.status(500).json({ error: 'Failed to fetch invoice' })
  }
})

/**
 * PATCH /api/invoices/:id/link
 * Manually link an invoice to a client
 */
router.patch('/:id/link', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { client_id } = req.body
    
    const result = await sql`
      UPDATE invoices 
      SET client_id = ${client_id}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' })
    }
    
    // Also update the client's harvest_client_id if not set
    if (client_id && result[0].harvest_client_id) {
      await sql`
        UPDATE clients 
        SET harvest_client_id = ${result[0].harvest_client_id}
        WHERE id = ${client_id} AND harvest_client_id IS NULL
      `
    }
    
    res.json(result[0])
  } catch (error) {
    console.error('Error linking invoice:', error)
    res.status(500).json({ error: 'Failed to link invoice' })
  }
})

export default router

