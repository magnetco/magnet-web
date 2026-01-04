-- Create applicants table for job applications
CREATE TABLE IF NOT EXISTS applicants (
  id SERIAL PRIMARY KEY,
  job_id TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  cell_number TEXT NOT NULL,
  linkedin_url TEXT NOT NULL,
  resume_url TEXT,
  timezone TEXT NOT NULL,
  location_preference TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on job_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_applicants_job_id ON applicants(job_id);

-- Create index on email for duplicate checking
CREATE INDEX IF NOT EXISTS idx_applicants_email ON applicants(email);

