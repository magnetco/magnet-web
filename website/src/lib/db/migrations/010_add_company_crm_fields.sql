-- Add CRM fields to companies table for enrichment and sales tracking

ALTER TABLE companies ADD COLUMN IF NOT EXISTS annual_revenue TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS headquarters TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS founded_year INTEGER;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS funding_stage TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS total_funding TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS employee_count INTEGER;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE companies ADD COLUMN IF NOT EXISTS technologies TEXT;

-- Index on funding stage for filtering by company maturity
CREATE INDEX IF NOT EXISTS idx_companies_funding_stage ON companies(funding_stage);

-- Index on headquarters for geographic filtering
CREATE INDEX IF NOT EXISTS idx_companies_headquarters ON companies(headquarters);

