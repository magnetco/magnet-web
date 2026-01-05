-- Create leads table for contact form submissions
-- Note: This may already exist if created manually before migrations were introduced

CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for duplicate checking
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

