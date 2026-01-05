-- Create clients table for managing client relationships
-- Links to leads table via lead_id for converted leads

CREATE TABLE IF NOT EXISTS clients (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'lead' CHECK (status IN ('lead', 'active', 'churned', 'paused')),
  contract_start DATE,
  contract_value DECIMAL(12, 2),
  industry TEXT,
  notes TEXT,
  lead_id INTEGER REFERENCES leads(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on lead_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_clients_lead_id ON clients(lead_id);

-- Create index on email for duplicate checking
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);

