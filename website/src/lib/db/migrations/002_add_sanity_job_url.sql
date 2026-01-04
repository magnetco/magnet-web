-- Add sanity_job_url column to applicants table
-- This stores a link to the Sanity Studio page for the job the applicant applied for

ALTER TABLE applicants
ADD COLUMN IF NOT EXISTS sanity_job_url TEXT;

-- Update job_id column comment to clarify it now stores Sanity document ID
COMMENT ON COLUMN applicants.job_id IS 'Sanity document ID for the job (_id)';

-- Add comment for the new column
COMMENT ON COLUMN applicants.sanity_job_url IS 'Direct URL to the job document in Sanity Studio';

