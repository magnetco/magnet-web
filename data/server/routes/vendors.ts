import { Router, Request, Response } from 'express'
import { sql } from '../db.js'
import { logVersion } from './versions.js'

const router = Router()

// Get all vendors with their client associations
router.get('/', async (_req: Request, res: Response) => {
  try {
    const vendors = await sql`
      SELECT v.*, 
        (SELECT string_agg(c.name, ', ') 
         FROM vendor_clients vc 
         JOIN clients c ON vc.client_id = c.id 
         WHERE vc.vendor_id = v.id) as clients_served
      FROM vendors v
      ORDER BY v.id DESC
    `
    res.json(vendors)
  } catch (error) {
    console.error('Error fetching vendors:', error)
    res.status(500).json({ error: 'Failed to fetch vendors' })
  }
})

// Create a new vendor
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, contact_name, email, phone, website, service_type, notes, status } = req.body
    
    const result = await sql`
      INSERT INTO vendors (name, contact_name, email, phone, website, service_type, notes, status)
      VALUES (${name}, ${contact_name || null}, ${email || null}, ${phone || null}, ${website || null}, ${service_type || null}, ${notes || null}, ${status || 'prospect'})
      RETURNING *
    `
    res.status(201).json(result[0])
  } catch (error) {
    console.error('Error creating vendor:', error)
    res.status(500).json({ error: 'Failed to create vendor' })
  }
})

// Update a vendor field
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { field, value } = req.body

    // Validate field name to prevent SQL injection
    const allowedFields = ['name', 'contact_name', 'email', 'phone', 'website', 'service_type', 'notes', 'status']
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ error: 'Invalid field' })
    }

    // Get old value for version tracking
    const oldRecord = await sql`SELECT * FROM vendors WHERE id = ${id}`
    if (oldRecord.length === 0) {
      return res.status(404).json({ error: 'Vendor not found' })
    }
    
    const oldValue = oldRecord[0][field]

    // Update the field dynamically
    const query = `UPDATE vendors SET ${field} = $1, updated_at = NOW() WHERE id = $2 RETURNING *`
    const result = await sql(query, [value, id])

    // Log the version change
    await logVersion('vendors', parseInt(id), field, oldValue, value)

    res.json(result[0])
  } catch (error) {
    console.error('Error updating vendor:', error)
    res.status(500).json({ error: 'Failed to update vendor' })
  }
})

// Delete a vendor
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await sql`DELETE FROM vendors WHERE id = ${id}`
    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting vendor:', error)
    res.status(500).json({ error: 'Failed to delete vendor' })
  }
})

// Export as CSV
router.get('/export', async (_req: Request, res: Response) => {
  try {
    const vendors = await sql`SELECT * FROM vendors ORDER BY id`
    
    if (vendors.length === 0) {
      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', 'attachment; filename=vendors.csv')
      return res.send('id,name,contact_name,email,phone,website,service_type,notes,created_at,updated_at')
    }

    const headers = Object.keys(vendors[0])
    const csv = [
      headers.join(','),
      ...vendors.map(row => 
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
    res.setHeader('Content-Disposition', 'attachment; filename=vendors.csv')
    res.send(csv)
  } catch (error) {
    console.error('Error exporting vendors:', error)
    res.status(500).json({ error: 'Failed to export vendors' })
  }
})

// Link a vendor to a client
router.post('/:id/clients', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { client_id, project_description, work_date } = req.body

    const result = await sql`
      INSERT INTO vendor_clients (vendor_id, client_id, project_description, work_date)
      VALUES (${id}, ${client_id}, ${project_description || null}, ${work_date || null})
      ON CONFLICT (vendor_id, client_id) DO UPDATE SET
        project_description = COALESCE(${project_description}, vendor_clients.project_description),
        work_date = COALESCE(${work_date}, vendor_clients.work_date)
      RETURNING *
    `
    res.status(201).json(result[0])
  } catch (error) {
    console.error('Error linking vendor to client:', error)
    res.status(500).json({ error: 'Failed to link vendor to client' })
  }
})

// Unlink a vendor from a client
router.delete('/:id/clients/:clientId', async (req: Request, res: Response) => {
  try {
    const { id, clientId } = req.params
    await sql`DELETE FROM vendor_clients WHERE vendor_id = ${id} AND client_id = ${clientId}`
    res.json({ success: true })
  } catch (error) {
    console.error('Error unlinking vendor from client:', error)
    res.status(500).json({ error: 'Failed to unlink vendor from client' })
  }
})

// Get clients for a vendor
router.get('/:id/clients', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const clients = await sql`
      SELECT c.*, vc.project_description, vc.work_date
      FROM vendor_clients vc
      JOIN clients c ON vc.client_id = c.id
      WHERE vc.vendor_id = ${id}
      ORDER BY vc.work_date DESC NULLS LAST
    `
    res.json(clients)
  } catch (error) {
    console.error('Error fetching vendor clients:', error)
    res.status(500).json({ error: 'Failed to fetch vendor clients' })
  }
})

export default router

