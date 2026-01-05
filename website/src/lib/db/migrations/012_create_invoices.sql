-- Create invoices table to store synced Harvest invoices
-- Invoices are linked to clients via client_id (auto-matched by company name)

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
);

-- Create harvest_sync table to track sync metadata
CREATE TABLE IF NOT EXISTS harvest_sync (
  id SERIAL PRIMARY KEY,
  entity_type TEXT NOT NULL UNIQUE,
  last_synced_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'syncing', 'success', 'error')),
  error_message TEXT,
  records_synced INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add harvest_client_id to clients table for caching matched Harvest client
ALTER TABLE clients ADD COLUMN IF NOT EXISTS harvest_client_id INTEGER;

-- Create indexes for efficient lookups
CREATE INDEX IF NOT EXISTS idx_invoices_harvest_id ON invoices(harvest_id);
CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_harvest_client_id ON invoices(harvest_client_id);
CREATE INDEX IF NOT EXISTS idx_clients_harvest_client_id ON clients(harvest_client_id);

-- Insert initial sync record for invoices
INSERT INTO harvest_sync (entity_type, status) VALUES ('invoices', 'pending')
ON CONFLICT (entity_type) DO NOTHING;

