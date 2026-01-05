-- Create record_versions table for tracking all edits with version history
-- Enables reverting any field to a previous value

CREATE TABLE IF NOT EXISTS record_versions (
  id SERIAL PRIMARY KEY,
  table_name TEXT NOT NULL,
  record_id INTEGER NOT NULL,
  field_name TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  changed_by TEXT DEFAULT 'admin',
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create composite index for looking up versions of a specific record
CREATE INDEX IF NOT EXISTS idx_record_versions_lookup ON record_versions(table_name, record_id);

-- Create index on changed_at for chronological queries
CREATE INDEX IF NOT EXISTS idx_record_versions_changed_at ON record_versions(changed_at DESC);

