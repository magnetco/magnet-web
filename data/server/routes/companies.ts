import { Router, Request, Response } from 'express'
import { sql } from '../db.js'
import { logVersion } from './versions.js'

const router = Router()

// Get all companies
router.get('/', async (_req: Request, res: Response) => {
  try {
    const companies = await sql`SELECT * FROM companies ORDER BY id DESC`
    res.json(companies)
  } catch (error) {
    console.error('Error fetching companies:', error)
    res.status(500).json({ error: 'Failed to fetch companies' })
  }
})

// Create a new company
router.post('/', async (req: Request, res: Response) => {
  try {
    const { 
      name, website, industry, size, notes,
      annual_revenue, headquarters, founded_year, description,
      linkedin_url, funding_stage, total_funding, employee_count, phone, technologies
    } = req.body
    
    const result = await sql`
      INSERT INTO companies (
        name, website, industry, size, notes,
        annual_revenue, headquarters, founded_year, description,
        linkedin_url, funding_stage, total_funding, employee_count, phone, technologies
      )
      VALUES (
        ${name}, ${website || null}, ${industry || null}, ${size || null}, ${notes || null},
        ${annual_revenue || null}, ${headquarters || null}, ${founded_year || null}, ${description || null},
        ${linkedin_url || null}, ${funding_stage || null}, ${total_funding || null}, ${employee_count || null}, ${phone || null}, ${technologies || null}
      )
      RETURNING *
    `
    res.status(201).json(result[0])
  } catch (error) {
    console.error('Error creating company:', error)
    res.status(500).json({ error: 'Failed to create company' })
  }
})

// Update a company field
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { field, value } = req.body

    // Validate field name to prevent SQL injection
    const allowedFields = [
      'name', 'website', 'industry', 'size', 'notes',
      'annual_revenue', 'headquarters', 'founded_year', 'description',
      'linkedin_url', 'funding_stage', 'total_funding', 'employee_count', 'phone', 'technologies'
    ]
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ error: 'Invalid field' })
    }

    // Get old value for version tracking
    const oldRecord = await sql`SELECT * FROM companies WHERE id = ${id}`
    if (oldRecord.length === 0) {
      return res.status(404).json({ error: 'Company not found' })
    }
    
    const oldValue = oldRecord[0][field]

    // Update the field dynamically
    const query = `UPDATE companies SET ${field} = $1, updated_at = NOW() WHERE id = $2 RETURNING *`
    const result = await sql(query, [value, id])

    // Log the version change
    await logVersion('companies', parseInt(id), field, oldValue, value)

    res.json(result[0])
  } catch (error) {
    console.error('Error updating company:', error)
    res.status(500).json({ error: 'Failed to update company' })
  }
})

// Delete a company
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await sql`DELETE FROM companies WHERE id = ${id}`
    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting company:', error)
    res.status(500).json({ error: 'Failed to delete company' })
  }
})

// Export as CSV
router.get('/export', async (_req: Request, res: Response) => {
  try {
    const companies = await sql`SELECT * FROM companies ORDER BY id`
    
    if (companies.length === 0) {
      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', 'attachment; filename=companies.csv')
      return res.send('id,name,website,industry,size,notes,annual_revenue,headquarters,founded_year,description,linkedin_url,funding_stage,total_funding,employee_count,phone,technologies,created_at,updated_at')
    }

    const headers = Object.keys(companies[0])
    const csv = [
      headers.join(','),
      ...companies.map(row => 
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
    res.setHeader('Content-Disposition', 'attachment; filename=companies.csv')
    res.send(csv)
  } catch (error) {
    console.error('Error exporting companies:', error)
    res.status(500).json({ error: 'Failed to export companies' })
  }
})

// Find or create company by name
router.post('/find-or-create', async (req: Request, res: Response) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(400).json({ error: 'Name is required' })
    }

    // Try to find existing company
    const existing = await sql`SELECT * FROM companies WHERE LOWER(name) = LOWER(${name}) LIMIT 1`
    if (existing.length > 0) {
      return res.json(existing[0])
    }

    // Create new company
    const result = await sql`
      INSERT INTO companies (name)
      VALUES (${name})
      RETURNING *
    `
    res.status(201).json(result[0])
  } catch (error) {
    console.error('Error finding/creating company:', error)
    res.status(500).json({ error: 'Failed to find or create company' })
  }
})

export default router

