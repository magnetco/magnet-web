-- Marketing campaigns table
CREATE TABLE IF NOT EXISTS marketing_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Marketing mockups table
CREATE TABLE IF NOT EXISTS marketing_mockups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES marketing_campaigns(id) ON DELETE CASCADE,
  platform VARCHAR(20) NOT NULL CHECK (platform IN ('google_ad', 'linkedin_ad', 'linkedin_post', 'facebook', 'serp')),
  name VARCHAR(255) NOT NULL,
  content JSONB NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Marketing share links table
CREATE TABLE IF NOT EXISTS marketing_share_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token VARCHAR(64) UNIQUE NOT NULL,
  campaign_id UUID REFERENCES marketing_campaigns(id) ON DELETE CASCADE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_marketing_mockups_campaign ON marketing_mockups(campaign_id);
CREATE INDEX IF NOT EXISTS idx_marketing_mockups_sort ON marketing_mockups(campaign_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_marketing_share_links_token ON marketing_share_links(token);
CREATE INDEX IF NOT EXISTS idx_marketing_share_links_expires ON marketing_share_links(expires_at);
