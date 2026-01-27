import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const pages = await sql`
    SELECT 
      p.*,
      COUNT(s.id)::int as section_count
    FROM marketing_landing_pages p
    LEFT JOIN marketing_page_sections s ON s.page_id = p.id
    WHERE p.status = 'active'
    GROUP BY p.id
    ORDER BY 
      CASE p.slug
        WHEN 'home' THEN 1
        WHEN 'websites' THEN 2
        WHEN 'branding' THEN 3
        WHEN 'ads' THEN 4
        WHEN 'search' THEN 5
        WHEN 'engineering' THEN 6
        ELSE 99
      END,
      p.name
  `
  return NextResponse.json(pages)
}
