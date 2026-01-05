import { sql } from './db.js'

async function runMigration() {
  console.log('Running leads status migration...\n')

  try {
    // Add status column to leads table
    await sql`
      ALTER TABLE leads 
      ADD COLUMN IF NOT EXISTS status TEXT 
      DEFAULT 'new' 
      CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost'))
    `
    console.log('✓ Added status column to leads table')
  } catch (error: any) {
    if (error.message?.includes('already exists') || error.message?.includes('duplicate column')) {
      console.log('⊘ status column already exists on leads')
    } else {
      console.error('✗ Failed to add status column:', error.message)
    }
  }

  try {
    // Create index for status column
    await sql`CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status)`
    console.log('✓ Created index idx_leads_status')
  } catch (error: any) {
    if (error.message?.includes('already exists')) {
      console.log('⊘ Index idx_leads_status already exists')
    } else {
      console.error('✗ Failed to create index:', error.message)
    }
  }

  console.log('\n✅ Migration complete!')
}

runMigration().catch(console.error)

