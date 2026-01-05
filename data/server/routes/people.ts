import { Router, Request, Response } from 'express'
import { sql } from '../db.js'
import { logVersion } from './versions.js'

const router = Router()

// Get all people with company names
router.get('/', async (_req: Request, res: Response) => {
  try {
    const people = await sql`
      SELECT p.*, c.name as company_name 
      FROM people p 
      LEFT JOIN companies c ON p.company_id = c.id 
      ORDER BY p.id DESC
    `
    res.json(people)
  } catch (error) {
    console.error('Error fetching people:', error)
    res.status(500).json({ error: 'Failed to fetch people' })
  }
})

// Create a new person
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, title, linkedin_url, notes, company_id } = req.body
    
    const result = await sql`
      INSERT INTO people (name, email, phone, title, linkedin_url, notes, company_id)
      VALUES (${name}, ${email || null}, ${phone || null}, ${title || null}, ${linkedin_url || null}, ${notes || null}, ${company_id || null})
      RETURNING *
    `
    res.status(201).json(result[0])
  } catch (error) {
    console.error('Error creating person:', error)
    res.status(500).json({ error: 'Failed to create person' })
  }
})

// Update a person field
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { field, value } = req.body

    // Validate field name to prevent SQL injection
    const allowedFields = ['name', 'email', 'phone', 'title', 'linkedin_url', 'notes', 'company_id', 'location', 'seniority_level', 'department', 'twitter_url', 'previous_companies']
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ error: 'Invalid field' })
    }

    // Get old value for version tracking
    const oldRecord = await sql`SELECT * FROM people WHERE id = ${id}`
    if (oldRecord.length === 0) {
      return res.status(404).json({ error: 'Person not found' })
    }
    
    const oldValue = oldRecord[0][field]

    // Update the field dynamically
    const query = `UPDATE people SET ${field} = $1, updated_at = NOW() WHERE id = $2 RETURNING *`
    const result = await sql(query, [value, id])

    // Log the version change
    await logVersion('people', parseInt(id), field, oldValue, value)

    res.json(result[0])
  } catch (error) {
    console.error('Error updating person:', error)
    res.status(500).json({ error: 'Failed to update person' })
  }
})

// Delete a person
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await sql`DELETE FROM people WHERE id = ${id}`
    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting person:', error)
    res.status(500).json({ error: 'Failed to delete person' })
  }
})

// Export as CSV
router.get('/export', async (_req: Request, res: Response) => {
  try {
    const people = await sql`
      SELECT p.*, c.name as company_name 
      FROM people p 
      LEFT JOIN companies c ON p.company_id = c.id 
      ORDER BY p.id
    `
    
    if (people.length === 0) {
      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', 'attachment; filename=people.csv')
      return res.send('id,name,email,phone,title,linkedin_url,notes,company_id,company_name,created_at,updated_at')
    }

    const headers = Object.keys(people[0])
    const csv = [
      headers.join(','),
      ...people.map(row => 
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
    res.setHeader('Content-Disposition', 'attachment; filename=people.csv')
    res.send(csv)
  } catch (error) {
    console.error('Error exporting people:', error)
    res.status(500).json({ error: 'Failed to export people' })
  }
})

// Find or create person by email (with optional company)
router.post('/find-or-create', async (req: Request, res: Response) => {
  try {
    const { name, email, company_id } = req.body
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' })
    }

    // Try to find existing person by email
    const existing = await sql`SELECT * FROM people WHERE LOWER(email) = LOWER(${email}) LIMIT 1`
    if (existing.length > 0) {
      return res.json(existing[0])
    }

    // Create new person
    const result = await sql`
      INSERT INTO people (name, email, company_id)
      VALUES (${name}, ${email}, ${company_id || null})
      RETURNING *
    `
    res.status(201).json(result[0])
  } catch (error) {
    console.error('Error finding/creating person:', error)
    res.status(500).json({ error: 'Failed to find or create person' })
  }
})

export default router

