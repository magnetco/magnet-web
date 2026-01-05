-- Create companies table for CRM-like company management
-- Companies are linked to by People, which are then linked to by Leads and Clients

CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  website TEXT,
  industry TEXT,
  size TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on name for lookups
CREATE INDEX IF NOT EXISTS idx_companies_name ON companies(name);

-- Create index on industry for filtering
CREATE INDEX IF NOT EXISTS idx_companies_industry ON companies(industry);

