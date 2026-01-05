import { sql } from '@/lib/db/neon'
import { NextResponse } from 'next/server'
import { sendApplicationEmail } from '@/lib/email/resend'
import { isValidEmail } from '@/lib/validation'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      jobId,
      jobSlug,
      jobTitle,
      sanityJobUrl,
      firstName,
      lastName,
      email,
      cellNumber,
      linkedinUrl,
      resumeUrl,
      timezone,
      locationPreference,
    } = body

    // Validate required fields
    if (!jobId || !firstName || !lastName || !email || !cellNumber || !timezone || !locationPreference) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Insert applicant into database
    await sql`
      INSERT INTO applicants (
        job_id,
        sanity_job_url,
        first_name,
        last_name,
        email,
        cell_number,
        linkedin_url,
        resume_url,
        timezone,
        location_preference,
        created_at,
        updated_at
      )
      VALUES (
        ${jobId},
        ${sanityJobUrl || null},
        ${firstName},
        ${lastName},
        ${email},
        ${cellNumber},
        ${linkedinUrl || null},
        ${resumeUrl || null},
        ${timezone},
        ${locationPreference},
        NOW(),
        NOW()
      )
    `

    // Send email notification (don't fail request if email fails)
    try {
      await sendApplicationEmail({
        jobId,
        jobTitle,
        sanityJobUrl,
        firstName,
        lastName,
        email,
        cellNumber,
        linkedinUrl,
        resumeUrl,
        timezone,
        locationPreference,
      })
    } catch (emailError) {
      console.error('Error sending application email notification:', emailError)
      // Continue execution - don't fail the request if email fails
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Error saving applicant:', error)
    return NextResponse.json(
      { error: 'Failed to save application' },
      { status: 500 }
    )
  }
}

