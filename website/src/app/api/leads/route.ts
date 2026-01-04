import { sql } from '@/lib/db/neon'
import { NextResponse } from 'next/server'
import { sendContactFormEmail } from '@/lib/email/resend'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert lead into database
    await sql`
      INSERT INTO leads (name, company, email, message, created_at, updated_at)
      VALUES (${name}, ${company || null}, ${email}, ${message}, NOW(), NOW())
    `

    // Send email notification (don't fail request if email fails)
    try {
      await sendContactFormEmail({ name, company, email, message })
    } catch (emailError) {
      console.error('Error sending email notification:', emailError)
      // Continue execution - don't fail the request if email fails
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Error saving lead:', error)
    return NextResponse.json(
      { error: 'Failed to save lead' },
      { status: 500 }
    )
  }
}

