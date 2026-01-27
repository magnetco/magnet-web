import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [campaign] = await sql`
    SELECT * FROM marketing_campaigns WHERE id = ${id}
  `

  if (!campaign) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
  }

  const mockups = await sql`
    SELECT * FROM marketing_mockups
    WHERE campaign_id = ${id}
    ORDER BY sort_order ASC
  `

  return NextResponse.json({ ...campaign, mockups })
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const updates = await req.json()

  const [campaign] = await sql`
    UPDATE marketing_campaigns
    SET
      name = COALESCE(${updates.name}, name),
      description = COALESCE(${updates.description}, description),
      status = COALESCE(${updates.status}, status),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `

  return NextResponse.json(campaign)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  await sql`DELETE FROM marketing_campaigns WHERE id = ${id}`

  return NextResponse.json({ success: true })
}
