import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Only available in development' }, { status: 403 })
  }

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return NextResponse.json({ 
      connected: false, 
      error: 'RESEND_API_KEY not configured' 
    })
  }

  try {
    const resend = new Resend(apiKey)
    // Test the connection by fetching domains (lightweight API call)
    await resend.domains.list()
    
    return NextResponse.json({ 
      connected: true,
      message: 'Resend API connection successful'
    })
  } catch (error) {
    return NextResponse.json({ 
      connected: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

