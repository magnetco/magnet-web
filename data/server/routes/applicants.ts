import { Router, Request, Response } from 'express'
import { sql } from '../db.js'
import { logVersion } from './versions.js'

const router = Router()

// Get all applicants
router.get('/', async (_req: Request, res: Response) => {
  try {
    const applicants = await sql`SELECT * FROM applicants ORDER BY id DESC`
    res.json(applicants)
  } catch (error) {
    console.error('Error fetching applicants:', error)
    res.status(500).json({ error: 'Failed to fetch applicants' })
  }
})

// Create a new applicant
router.post('/', async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, cell_number, linkedin_url, resume_url, timezone, location_preference, job_id, sanity_job_url, status } = req.body
    
    const result = await sql`
      INSERT INTO applicants (first_name, last_name, email, cell_number, linkedin_url, resume_url, timezone, location_preference, job_id, sanity_job_url, status)
      VALUES (${first_name}, ${last_name}, ${email}, ${cell_number || ''}, ${linkedin_url || ''}, ${resume_url || null}, ${timezone || 'UTC'}, ${location_preference || 'Remote'}, ${job_id || ''}, ${sanity_job_url || null}, ${status || 'applied'})
      RETURNING *
    `
    res.status(201).json(result[0])
  } catch (error) {
    console.error('Error creating applicant:', error)
    res.status(500).json({ error: 'Failed to create applicant' })
  }
})

// Update an applicant field
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { field, value } = req.body

    // Validate field name to prevent SQL injection
    const allowedFields = ['first_name', 'last_name', 'email', 'cell_number', 'linkedin_url', 'resume_url', 'timezone', 'location_preference', 'job_id', 'sanity_job_url', 'status']
    if (!allowedFields.includes(field)) {
      return res.status(400).json({ error: 'Invalid field' })
    }

    // Get old value for version tracking
    const oldRecord = await sql`SELECT * FROM applicants WHERE id = ${id}`
    if (oldRecord.length === 0) {
      return res.status(404).json({ error: 'Applicant not found' })
    }
    
    const oldValue = oldRecord[0][field]

    // Update the field dynamically
    const query = `UPDATE applicants SET ${field} = $1, updated_at = NOW() WHERE id = $2 RETURNING *`
    const result = await sql(query, [value, id])

    // Log the version change
    await logVersion('applicants', parseInt(id), field, oldValue, value)

    res.json(result[0])
  } catch (error) {
    console.error('Error updating applicant:', error)
    res.status(500).json({ error: 'Failed to update applicant' })
  }
})

// Delete an applicant
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await sql`DELETE FROM applicants WHERE id = ${id}`
    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting applicant:', error)
    res.status(500).json({ error: 'Failed to delete applicant' })
  }
})

// Export as CSV
router.get('/export', async (_req: Request, res: Response) => {
  try {
    const applicants = await sql`SELECT * FROM applicants ORDER BY id`
    
    if (applicants.length === 0) {
      res.setHeader('Content-Type', 'text/csv')
      res.setHeader('Content-Disposition', 'attachment; filename=applicants.csv')
      return res.send('id,job_id,sanity_job_url,first_name,last_name,email,cell_number,linkedin_url,resume_url,timezone,location_preference,created_at,updated_at')
    }

    const headers = Object.keys(applicants[0])
    const csv = [
      headers.join(','),
      ...applicants.map(row => 
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
    res.setHeader('Content-Disposition', 'attachment; filename=applicants.csv')
    res.send(csv)
  } catch (error) {
    console.error('Error exporting applicants:', error)
    res.status(500).json({ error: 'Failed to export applicants' })
  }
})

export default router

