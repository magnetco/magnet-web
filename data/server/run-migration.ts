import { sql } from './db.js'

async function runMigration() {
  console.log('Running invoice tables migration...\n')

  try {
    // Create invoices table
    await sql`
      CREATE TABLE IF NOT EXISTS invoices (
        id SERIAL PRIMARY KEY,
        harvest_id INTEGER UNIQUE NOT NULL,
        harvest_client_id INTEGER,
        harvest_client_name TEXT,
        client_id INTEGER REFERENCES clients(id) ON DELETE SET NULL,
        number TEXT,
        amount DECIMAL(12, 2),
        due_amount DECIMAL(12, 2),
        status TEXT CHECK (status IN ('draft', 'open', 'paid', 'closed')),
        issue_date DATE,
        due_date DATE,
        paid_date DATE,
        subject TEXT,
        notes TEXT,
        currency TEXT DEFAULT 'USD',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `
    console.log('✓ Created invoices table')
  } catch (error: any) {
    if (error.message?.includes('already exists')) {
      console.log('⊘ invoices table already exists')
    } else {
      console.error('✗ Failed to create invoices table:', error.message)
    }
  }

  try {
    // Create harvest_sync table
    await sql`
      CREATE TABLE IF NOT EXISTS harvest_sync (
        id SERIAL PRIMARY KEY,
        entity_type TEXT NOT NULL UNIQUE,
        last_synced_at TIMESTAMP WITH TIME ZONE,
        status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'syncing', 'success', 'error')),
        error_message TEXT,
        records_synced INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `
    console.log('✓ Created harvest_sync table')
  } catch (error: any) {
    if (error.message?.includes('already exists')) {
      console.log('⊘ harvest_sync table already exists')
    } else {
      console.error('✗ Failed to create harvest_sync table:', error.message)
    }
  }

  try {
    // Add harvest_client_id to clients
    await sql`ALTER TABLE clients ADD COLUMN IF NOT EXISTS harvest_client_id INTEGER`
    console.log('✓ Added harvest_client_id to clients')
  } catch (error: any) {
    if (error.message?.includes('already exists') || error.message?.includes('duplicate column')) {
      console.log('⊘ harvest_client_id already exists on clients')
    } else {
      console.error('✗ Failed to add harvest_client_id:', error.message)
    }
  }

  // Create indexes
  const indexes = [
    { name: 'idx_invoices_harvest_id', sql: 'CREATE INDEX IF NOT EXISTS idx_invoices_harvest_id ON invoices(harvest_id)' },
    { name: 'idx_invoices_client_id', sql: 'CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON invoices(client_id)' },
    { name: 'idx_invoices_status', sql: 'CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status)' },
    { name: 'idx_invoices_harvest_client_id', sql: 'CREATE INDEX IF NOT EXISTS idx_invoices_harvest_client_id ON invoices(harvest_client_id)' },
    { name: 'idx_clients_harvest_client_id', sql: 'CREATE INDEX IF NOT EXISTS idx_clients_harvest_client_id ON clients(harvest_client_id)' },
  ]

  for (const index of indexes) {
    try {
      await sql(index.sql)
      console.log(`✓ Created index ${index.name}`)
    } catch (error: any) {
      if (error.message?.includes('already exists')) {
        console.log(`⊘ Index ${index.name} already exists`)
      } else {
        console.error(`✗ Failed to create index ${index.name}:`, error.message)
      }
    }
  }

  try {
    // Insert initial sync record
    await sql`
      INSERT INTO harvest_sync (entity_type, status) VALUES ('invoices', 'pending')
      ON CONFLICT (entity_type) DO NOTHING
    `
    console.log('✓ Inserted initial sync record')
  } catch (error: any) {
    console.error('✗ Failed to insert sync record:', error.message)
  }

  console.log('\n✅ Migration complete!')
}

runMigration().catch(console.error)
