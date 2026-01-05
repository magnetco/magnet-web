import { Router, Request, Response } from 'express'
import { sql } from '../db.js'

const router = Router()

// Helper to log a version change
export async function logVersion(
  tableName: string,
  recordId: number,
  fieldName: string,
  oldValue: unknown,
  newValue: unknown
) {
  await sql`
    INSERT INTO record_versions (table_name, record_id, field_name, old_value, new_value)
    VALUES (${tableName}, ${recordId}, ${fieldName}, ${String(oldValue ?? '')}, ${String(newValue ?? '')})
  `
}

// Get versions for a specific record
router.get('/:table/:recordId', async (req: Request, res: Response) => {
  try {
    const { table, recordId } = req.params
    
    // Validate table name
    const allowedTables = ['companies', 'people', 'clients', 'leads', 'applicants']
    if (!allowedTables.includes(table)) {
      return res.status(400).json({ error: 'Invalid table' })
    }

    const versions = await sql`
      SELECT * FROM record_versions 
      WHERE table_name = ${table} AND record_id = ${recordId}
      ORDER BY changed_at DESC
    `
    res.json(versions)
  } catch (error) {
    console.error('Error fetching versions:', error)
    res.status(500).json({ error: 'Failed to fetch versions' })
  }
})

// Revert to a specific version
router.post('/:versionId/revert', async (req: Request, res: Response) => {
  try {
    const { versionId } = req.params
    
    // Get the version record
    const versions = await sql`SELECT * FROM record_versions WHERE id = ${versionId}`
    if (versions.length === 0) {
      return res.status(404).json({ error: 'Version not found' })
    }
    
    const version = versions[0]
    const { table_name, record_id, field_name, old_value } = version
    
    // Validate table name
    const allowedTables = ['companies', 'people', 'clients', 'leads', 'applicants']
    if (!allowedTables.includes(table_name)) {
      return res.status(400).json({ error: 'Invalid table' })
    }

    // Get current value before reverting
    const currentQuery = `SELECT ${field_name} FROM ${table_name} WHERE id = $1`
    const currentRecords = await sql(currentQuery, [record_id])
    if (currentRecords.length === 0) {
      return res.status(404).json({ error: 'Record not found' })
    }
    
    const currentValue = currentRecords[0][field_name]

    // Revert to the old value
    const updateQuery = `UPDATE ${table_name} SET ${field_name} = $1, updated_at = NOW() WHERE id = $2`
    await sql(updateQuery, [old_value, record_id])

    // Log this reversion as a new version
    await logVersion(table_name, record_id, field_name, currentValue, old_value)

    res.json({ success: true })
  } catch (error) {
    console.error('Error reverting version:', error)
    res.status(500).json({ error: 'Failed to revert version' })
  }
})

export default router

