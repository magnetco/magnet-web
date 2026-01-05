import { sql } from './db.js'

async function runMigration() {
  console.log('Running applicants and vendors status migration...\n')

  // Add status to applicants table
  try {
    await sql`
      ALTER TABLE applicants 
      ADD COLUMN IF NOT EXISTS status TEXT 
      DEFAULT 'applied' 
      CHECK (status IN ('applied', 'screening', 'interview', 'offer', 'hired', 'rejected'))
    `
    console.log('✓ Added status column to applicants table')
  } catch (error: any) {
    if (error.message?.includes('already exists') || error.message?.includes('duplicate column')) {
      console.log('⊘ status column already exists on applicants')
    } else {
      console.error('✗ Failed to add status column to applicants:', error.message)
    }
  }

  try {
    await sql`CREATE INDEX IF NOT EXISTS idx_applicants_status ON applicants(status)`
    console.log('✓ Created index idx_applicants_status')
  } catch (error: any) {
    if (error.message?.includes('already exists')) {
      console.log('⊘ Index idx_applicants_status already exists')
    } else {
      console.error('✗ Failed to create applicants index:', error.message)
    }
  }

  // Add status to vendors table
  try {
    await sql`
      ALTER TABLE vendors 
      ADD COLUMN IF NOT EXISTS status TEXT 
      DEFAULT 'prospect' 
      CHECK (status IN ('prospect', 'evaluating', 'approved', 'active', 'on_hold', 'inactive'))
    `
    console.log('✓ Added status column to vendors table')
  } catch (error: any) {
    if (error.message?.includes('already exists') || error.message?.includes('duplicate column')) {
      console.log('⊘ status column already exists on vendors')
    } else {
      console.error('✗ Failed to add status column to vendors:', error.message)
    }
  }

  try {
    await sql`CREATE INDEX IF NOT EXISTS idx_vendors_status ON vendors(status)`
    console.log('✓ Created index idx_vendors_status')
  } catch (error: any) {
    if (error.message?.includes('already exists')) {
      console.log('⊘ Index idx_vendors_status already exists')
    } else {
      console.error('✗ Failed to create vendors index:', error.message)
    }
  }

  console.log('\n✅ Migration complete!')
}

runMigration().catch(console.error)

