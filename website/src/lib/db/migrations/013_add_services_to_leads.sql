-- Add intent, services, and sub_options columns to leads table
-- These capture the full service selection from the contact form

-- Intent: what brings them here (prospect, vendor, partnership, careers)
ALTER TABLE leads ADD COLUMN IF NOT EXISTS intent TEXT;

-- Services: JSON array of selected service IDs (e.g., ["branding", "websites"] or ["retainer"])
ALTER TABLE leads ADD COLUMN IF NOT EXISTS services JSONB DEFAULT '[]'::jsonb;

-- Sub-options: JSON object mapping service IDs to arrays of sub-option IDs
-- e.g., {"branding": ["brand-essentials"], "paid-media": ["google-ads", "meta-ads"]}
ALTER TABLE leads ADD COLUMN IF NOT EXISTS sub_options JSONB DEFAULT '{}'::jsonb;

-- Create index on intent for filtering leads by type
CREATE INDEX IF NOT EXISTS idx_leads_intent ON leads(intent);

