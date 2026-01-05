-- Create vendors table for tracking external contractors/vendors
-- Examples: photographers, videographers, designers, etc. hired by Magnet for client work

CREATE TABLE IF NOT EXISTS vendors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  service_type TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on name for lookups
CREATE INDEX IF NOT EXISTS idx_vendors_name ON vendors(name);

-- Create index on service_type for filtering
CREATE INDEX IF NOT EXISTS idx_vendors_service_type ON vendors(service_type);

-- Create junction table for vendor-client relationships
CREATE TABLE IF NOT EXISTS vendor_clients (
  id SERIAL PRIMARY KEY,
  vendor_id INTEGER NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  project_description TEXT,
  work_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(vendor_id, client_id)
);

-- Create indexes for the junction table
CREATE INDEX IF NOT EXISTS idx_vendor_clients_vendor_id ON vendor_clients(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_clients_client_id ON vendor_clients(client_id);

