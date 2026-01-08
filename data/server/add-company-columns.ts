import { sql } from './db.js'

async function addCompanyColumns() {
  console.log('Adding missing columns to companies table...\n')

  const columnsToAdd = [
    { name: 'description', type: 'TEXT' },
    { name: 'annual_revenue', type: 'TEXT' },
    { name: 'headquarters', type: 'TEXT' },
    { name: 'founded_year', type: 'INTEGER' },
    { name: 'linkedin_url', type: 'TEXT' },
    { name: 'funding_stage', type: 'TEXT' },
    { name: 'total_funding', type: 'TEXT' },
    { name: 'technologies', type: 'TEXT' },
    { name: 'phone', type: 'TEXT' },
    { name: 'employee_count', type: 'INTEGER' },
  ]

  for (const col of columnsToAdd) {
    try {
      await sql(`ALTER TABLE companies ADD COLUMN IF NOT EXISTS ${col.name} ${col.type}`)
      console.log(`✓ Added column ${col.name}`)
    } catch (error: any) {
      if (error.message?.includes('already exists') || error.message?.includes('duplicate column')) {
        console.log(`⊘ Column ${col.name} already exists`)
      } else {
        console.error(`✗ Failed to add column ${col.name}:`, error.message)
      }
    }
  }

  console.log('\n✅ Migration complete!')
}

addCompanyColumns().catch(console.error)






