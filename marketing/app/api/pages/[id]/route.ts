import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const { id } = params

  const [page] = await sql`
    SELECT * FROM marketing_landing_pages
    WHERE id = ${id}
  `

  if (!page) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 })
  }

  const sections = await sql`
    SELECT * FROM marketing_page_sections
    WHERE page_id = ${id}
    ORDER BY sort_order ASC
  `

  return NextResponse.json({
    ...page,
    sections,
  })
}
