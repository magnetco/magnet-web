import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: Request) {
  const { campaignId, expiresInDays = 7 } = await req.json()

  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + expiresInDays)

  const [link] = await sql`
    INSERT INTO marketing_share_links (token, campaign_id, expires_at)
    VALUES (${token}, ${campaignId}, ${expiresAt.toISOString()})
    RETURNING *
  `

  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
  return NextResponse.json({
    ...link,
    url: `${baseUrl}/review/${token}`,
  })
}
