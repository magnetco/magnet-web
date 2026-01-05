-- Update clients table to link to companies and add business metrics
-- Clients represent business relationships with companies (LTV, revenue, contract info)
-- Companies store generic company info (industry, size, website - enrichable data)

-- Add company_id foreign key to clients
ALTER TABLE clients ADD COLUMN IF NOT EXISTS company_id INTEGER REFERENCES companies(id) ON DELETE SET NULL;

-- Add business metrics for client relationships
ALTER TABLE clients ADD COLUMN IF NOT EXISTS lifetime_value DECIMAL(12, 2);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS avg_annual_revenue DECIMAL(12, 2);
ALTER TABLE clients ADD COLUMN IF NOT EXISTS services TEXT; -- comma-separated services provided

-- Create index for company_id lookups
CREATE INDEX IF NOT EXISTS idx_clients_company_id ON clients(company_id);

