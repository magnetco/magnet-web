import { neon } from '@neondatabase/serverless'
import dotenv from 'dotenv'

// Try loading from multiple locations
// When running from /data folder
dotenv.config({ path: '.env' })
dotenv.config({ path: '../website/.env.local' })

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set. Create a .env file in /data with DATABASE_URL or ensure ../website/.env.local exists.')
}

export const sql = neon(process.env.DATABASE_URL)

