const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

// Load .env file manually
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    const value = match[2].trim();
    envVars[key] = value;
    process.env[key] = value;
  }
});

const DATABASE_URL = envVars.DATABASE_URL || process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL not found in .env file');
  process.exit(1);
}

const sql = neon(DATABASE_URL);

const migrationPath = path.join(__dirname, '../website/src/lib/db/migrations/015_landing_pages.sql');
const migration = fs.readFileSync(migrationPath, 'utf8');

(async () => {
  try {
    console.log('Running migration...');
    console.log('Database:', DATABASE_URL.split('@')[1]?.split('?')[0] || 'unknown');
    
    // Split migration into individual statements, preserving newlines
    const statements = migration
      .split(';')
      .map(s => s.trim())
      .filter(s => {
        // Filter out empty statements and comment-only statements
        if (!s) return false;
        const lines = s.split('\n').filter(line => !line.trim().startsWith('--'));
        return lines.join('').trim().length > 0;
      });
    
    console.log(`Executing ${statements.length} statements...`);
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement) {
        // Get first meaningful line for logging
        const firstLine = statement.split('\n').find(l => l.trim() && !l.trim().startsWith('--')) || statement;
        console.log(`  ${i + 1}/${statements.length}: ${firstLine.substring(0, 60).trim()}...`);
        await sql(statement);
      }
    }
    
    console.log('✓ Migration completed successfully!');
    console.log('✓ Created tables: marketing_landing_pages, marketing_page_sections');
  } catch (error) {
    console.error('Migration error:', error.message);
    process.exit(1);
  }
})();
