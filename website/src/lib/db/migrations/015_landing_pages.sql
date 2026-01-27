CREATE TABLE IF NOT EXISTS marketing_landing_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  file_path TEXT NOT NULL,
  url_path VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS marketing_page_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id UUID REFERENCES marketing_landing_pages(id) ON DELETE CASCADE,
  section_type VARCHAR(50) NOT NULL,
  section_name VARCHAR(255),
  headline TEXT,
  subheadline TEXT,
  body_copy TEXT,
  cta_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_page_sections_page ON marketing_page_sections(page_id);
CREATE INDEX idx_page_sections_sort ON marketing_page_sections(page_id, sort_order);
