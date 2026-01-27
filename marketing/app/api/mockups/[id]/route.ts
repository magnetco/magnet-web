import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const updates = await req.json()

  if (updates.name !== undefined) {
    const [mockup] = await sql`
      UPDATE marketing_mockups
      SET name = ${updates.name}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return NextResponse.json(mockup)
  }

  if (updates.content !== undefined) {
    const [mockup] = await sql`
      UPDATE marketing_mockups
      SET content = ${JSON.stringify(updates.content)}::jsonb, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return NextResponse.json(mockup)
  }

  if (updates.sortOrder !== undefined) {
    const [mockup] = await sql`
      UPDATE marketing_mockups
      SET sort_order = ${updates.sortOrder}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return NextResponse.json(mockup)
  }

  return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  await sql`DELETE FROM marketing_mockups WHERE id = ${id}`

  return NextResponse.json({ success: true })
}
