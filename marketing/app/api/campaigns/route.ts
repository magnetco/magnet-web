import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const campaigns = await sql`
    SELECT c.*, COUNT(m.id)::int as mockup_count
    FROM marketing_campaigns c
    LEFT JOIN marketing_mockups m ON m.campaign_id = c.id
    GROUP BY c.id
    ORDER BY c.updated_at DESC
  `
  return NextResponse.json(campaigns)
}

export async function POST(req: Request) {
  const { name, description } = await req.json()

  const [campaign] = await sql`
    INSERT INTO marketing_campaigns (name, description)
    VALUES (${name}, ${description})
    RETURNING *
  `

  return NextResponse.json(campaign)
}
