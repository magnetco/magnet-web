import { Router, Request, Response } from 'express'
import { sql } from '../db.js'
import { logVersion } from './versions.js'

const router = Router()

// Get all clients with company name
router.get('/', async (_req: Request, res: Response) => {
  try {
    const clients = await sql`
      SELECT c.*, co.name as company_name 
      FROM clients c
      LEFT JOIN companies co ON c.company_id = co.id
      ORDER BY c.id DESC
    `
    res.json(clients)
  } catch (error) {
    console.error('Error fetching clients:', error)
    res.status(500).json({ error: 'Failed to fetch clients' })
  }
})

// Create a new client
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, company, email, phone, status, contract_start, contract_value, industry, notes, lead_id } = req.body
    
    const result = await sql`
      INSERT INTO clients (name, company, email, phone, status, contract_start, contract_value, industry, notes, lead_id)
      VALUES (${name}, ${company || null}, ${email}, ${phone || null}, ${status || 'lead'}, ${contract_start || null}, ${contract_value || null}, ${industry || null}, ${notes || null}, ${lead_id || null})
      RETURNING *
    `
    res.status(201).json(result[0])
  } catch (error) {
    console.error('Error creating client:', error)
    res.status(500).json({ error: 'Failed to create client' })
  }
})

// Update a client field
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { field, value } = req.body

    // Validate field name to prevent SQL injection
    const allowedFields = ['name', 'company', 'company_id', 'email', 'phone', 'status', 'contract_start', 'contract_value', 'lifetime_value', 'avg_annual_revenue', 'services', 'industry', 'notes', 'lead_id', 'person_id']
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ error: 'Invalid field' })
    }

    // Get old value for version tracking
    const oldRecord = await sql`SELECT * FROM clients WHERE id = ${id}`
    if (oldRecord.length === 0) {
      return res.status(404).json({ error: 'Client not found' })
    }
    
    const oldValue = oldRecord[0][field]

    // Update the field dynamically
    const query = `UPDATE clients SET ${field} = $1, updated_at = NOW() WHERE id = $2 RETURNING *`
    const result = await sql(query, [value, id])

    // Log the version change
    await logVersion('clients', parseInt(id), field, oldValue, value)

    res.json(result[0])
  } catch (error) {
    console.error('Error updating client:', error)
    res.status(500).json({ error: 'Failed to update client' })
  }
})

// Delete a client
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await sql`DELETE FROM clients WHERE id = ${id}`
    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting client:', error)
    res.status(500).json({ error: 'Failed to delete client' })
  }
})

// Export as CSV
router.get('/export', async (_req: Request, res: Response) => {
  try {
    const clients = await sql`SELECT * FROM clients ORDER BY id`
    
    if (clients.length === 0) {
      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', 'attachment; filename=clients.csv')
      return res.send('id,name,company,email,phone,status,contract_start,contract_value,industry,notes,lead_id,created_at,updated_at')
    }

    const headers = Object.keys(clients[0])
    const csv = [
      headers.join(','),
      ...clients.map(row => 
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
    res.setHeader('Content-Disposition', 'attachment; filename=clients.csv')
    res.send(csv)
  } catch (error) {
    console.error('Error exporting clients:', error)
    res.status(500).json({ error: 'Failed to export clients' })
  }
})

export default router

