-- Add enrichment fields to people table
ALTER TABLE people ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE people ADD COLUMN IF NOT EXISTS seniority_level TEXT;
ALTER TABLE people ADD COLUMN IF NOT EXISTS department TEXT;
ALTER TABLE people ADD COLUMN IF NOT EXISTS twitter_url TEXT;
ALTER TABLE people ADD COLUMN IF NOT EXISTS previous_companies TEXT;

