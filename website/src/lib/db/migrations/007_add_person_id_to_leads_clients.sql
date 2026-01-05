-- Add person_id FK to leads and clients tables
-- This links leads and clients to the people table

-- Add person_id to leads
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS person_id INTEGER REFERENCES people(id) ON DELETE SET NULL;

-- Create index for joins
CREATE INDEX IF NOT EXISTS idx_leads_person_id ON leads(person_id);

-- Add person_id to clients
ALTER TABLE clients
ADD COLUMN IF NOT EXISTS person_id INTEGER REFERENCES people(id) ON DELETE SET NULL;

-- Create index for joins
CREATE INDEX IF NOT EXISTS idx_clients_person_id ON clients(person_id);

