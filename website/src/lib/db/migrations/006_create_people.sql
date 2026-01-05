-- Create people table for contact management
-- People belong to companies and can be referenced by leads and clients

CREATE TABLE IF NOT EXISTS people (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  title TEXT,
  linkedin_url TEXT,
  notes TEXT,
  company_id INTEGER REFERENCES companies(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for lookups
CREATE INDEX IF NOT EXISTS idx_people_email ON people(email);

-- Create index on company_id for joins
CREATE INDEX IF NOT EXISTS idx_people_company_id ON people(company_id);

-- Create index on name for searching
CREATE INDEX IF NOT EXISTS idx_people_name ON people(name);

