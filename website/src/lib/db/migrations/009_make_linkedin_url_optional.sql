-- Make linkedin_url optional in the applicants table
-- Previously it was required (NOT NULL), now it's optional

ALTER TABLE applicants ALTER COLUMN linkedin_url DROP NOT NULL;

COMMENT ON COLUMN applicants.linkedin_url IS 'Optional LinkedIn profile URL for the applicant';

