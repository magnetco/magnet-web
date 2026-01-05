import { Router, Request, Response } from 'express'
import { sql } from '../db.js'
import { logVersion } from './versions.js'

const router = Router()

// Get all leads
router.get('/', async (_req: Request, res: Response) => {
  try {
    const leads = await sql`SELECT * FROM leads ORDER BY id DESC`
    res.json(leads)
  } catch (error) {
    console.error('Error fetching leads:', error)
    res.status(500).json({ error: 'Failed to fetch leads' })
  }
})

// Create a new lead
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, company, email, message, intent, services, sub_options, status } = req.body
    
    const result = await sql`
      INSERT INTO leads (name, company, email, message, intent, services, sub_options, status)
      VALUES (
        ${name}, 
        ${company || null}, 
        ${email}, 
        ${message || ''},
        ${intent || null},
        ${JSON.stringify(services || [])},
        ${JSON.stringify(sub_options || {})},
        ${status || 'new'}
      )
      RETURNING *
    `
    res.status(201).json(result[0])
  } catch (error) {
    console.error('Error creating lead:', error)
    res.status(500).json({ error: 'Failed to create lead' })
  }
})

// Update a lead field
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { field, value } = req.body

    // Validate field name to prevent SQL injection
    const allowedFields = ['name', 'company', 'email', 'message', 'intent', 'services', 'sub_options', 'status']
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ error: 'Invalid field' })
    }

    // Get old value for version tracking
    const oldRecord = await sql`SELECT * FROM leads WHERE id = ${id}`
    if (oldRecord.length === 0) {
      return res.status(404).json({ error: 'Lead not found' })
    }
    
    const oldValue = oldRecord[0][field]

    // Update the field dynamically
    const query = `UPDATE leads SET ${field} = $1, updated_at = NOW() WHERE id = $2 RETURNING *`
    const result = await sql(query, [value, id])

    // Log the version change
    await logVersion('leads', parseInt(id), field, oldValue, value)

    res.json(result[0])
  } catch (error) {
    console.error('Error updating lead:', error)
    res.status(500).json({ error: 'Failed to update lead' })
  }
})

// Delete a lead
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await sql`DELETE FROM leads WHERE id = ${id}`
    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting lead:', error)
    res.status(500).json({ error: 'Failed to delete lead' })
  }
})

// Convert lead to client
router.post('/:id/convert', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    // Get the lead
    const leads = await sql`SELECT * FROM leads WHERE id = ${id}`
    if (leads.length === 0) {
      return res.status(404).json({ error: 'Lead not found' })
    }
    
    const lead = leads[0]
    
    // Create a new client linked to this lead
    const result = await sql`
      INSERT INTO clients (name, company, email, status, lead_id, notes)
      VALUES (${lead.name}, ${lead.company}, ${lead.email}, 'active', ${lead.id}, ${`Converted from lead. Original message: ${lead.message}`})
      RETURNING *
    `
    
    res.status(201).json(result[0])
  } catch (error) {
    console.error('Error converting lead:', error)
    res.status(500).json({ error: 'Failed to convert lead' })
  }
})

// Export as CSV
router.get('/export', async (_req: Request, res: Response) => {
  try {
    const leads = await sql`SELECT * FROM leads ORDER BY id`
    
    if (leads.length === 0) {
      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', 'attachment; filename=leads.csv')
      return res.send('id,name,company,email,message,created_at,updated_at')
    }

    const headers = Object.keys(leads[0])
    const csv = [
      headers.join(','),
      ...leads.map(row => 
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
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv')
    res.send(csv)
  } catch (error) {
    console.error('Error exporting leads:', error)
    res.status(500).json({ error: 'Failed to export leads' })
  }
})

export default router

