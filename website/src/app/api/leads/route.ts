import { sql } from '@/lib/db/neon'
import { NextResponse } from 'next/server'
import { sendContactFormEmail } from '@/lib/email/resend'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, company, email, message, intent, services, subOptions } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Normalize services data
    const servicesArray = Array.isArray(services) ? services : []
    const subOptionsObj = typeof subOptions === 'object' && subOptions !== null ? subOptions : {}

    // Find or create company if provided
    let companyId: number | null = null
    if (company) {
      const existingCompany = (await sql`
        SELECT id FROM companies WHERE LOWER(name) = LOWER(${company}) LIMIT 1
      `) as { id: number }[]
      if (existingCompany.length > 0) {
        companyId = existingCompany[0].id
      } else {
        const newCompany = (await sql`
          INSERT INTO companies (name) VALUES (${company}) RETURNING id
        `) as { id: number }[]
        companyId = newCompany[0].id
      }
    }

    // Find or create person
    let personId: number | null = null
    const existingPerson = (await sql`
      SELECT id FROM people WHERE LOWER(email) = LOWER(${email}) LIMIT 1
    `) as { id: number }[]
    if (existingPerson.length > 0) {
      personId = existingPerson[0].id
      // Update company_id if we have a new one
      if (companyId) {
        await sql`UPDATE people SET company_id = ${companyId} WHERE id = ${personId}`
      }
    } else {
      const newPerson = (await sql`
        INSERT INTO people (name, email, company_id) 
        VALUES (${name}, ${email}, ${companyId}) 
        RETURNING id
      `) as { id: number }[]
      personId = newPerson[0].id
    }

    // Insert lead into database with person_id and service selections
    await sql`
      INSERT INTO leads (name, company, email, message, person_id, intent, services, sub_options, created_at, updated_at)
      VALUES (${name}, ${company || null}, ${email}, ${message}, ${personId}, ${intent || null}, ${JSON.stringify(servicesArray)}, ${JSON.stringify(subOptionsObj)}, NOW(), NOW())
    `

    // Send email notification (don't fail request if email fails)
    try {
      await sendContactFormEmail({ 
        name, 
        company, 
        email, 
        message,
        intent: intent || undefined,
        services: servicesArray,
        subOptions: subOptionsObj,
      })
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

