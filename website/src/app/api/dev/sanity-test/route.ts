import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'

export async function POST() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 })
  }

  try {
    // Test the connection with a simple query
    await client.fetch('*[_type == "category"][0]')
    
    return NextResponse.json({ 
      connected: true,
      message: 'Sanity connection successful'
    })
  } catch (error) {
    return NextResponse.json({ 
      connected: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

