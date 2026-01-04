import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function POST() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 })
  }

  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    return NextResponse.json({ 
      connected: false, 
      error: 'DATABASE_URL not configured' 
    })
  }

  try {
    const sql = neon(databaseUrl)
    // Test the connection with a simple query
    await sql`SELECT 1 as test`
    
    return NextResponse.json({ 
      connected: true,
      message: 'Neon database connection successful'
    })
  } catch (error) {
    return NextResponse.json({ 
      connected: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

