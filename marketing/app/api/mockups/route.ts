import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { campaignId, platform, name, content } = await req.json()

  // Get max sort_order for this campaign
  const [{ max }] = await sql`
    SELECT COALESCE(MAX(sort_order), -1) as max
    FROM marketing_mockups
    WHERE campaign_id = ${campaignId}
  `

  const [mockup] = await sql`
    INSERT INTO marketing_mockups (campaign_id, platform, name, content, sort_order)
    VALUES (${campaignId}, ${platform}, ${name}, ${JSON.stringify(content)}::jsonb, ${max + 1})
    RETURNING *
  `

  return NextResponse.json(mockup)
}
