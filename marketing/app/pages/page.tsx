import Link from 'next/link'
import { sql } from '@/lib/db'
import { PageHeader } from '@/components/ui/page-header'
import { ExternalLink } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getLandingPages() {
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
  return pages
}

export default async function PagesPage() {
  const pages = await getLandingPages()

  return (
    <>
      <PageHeader
        title="Landing Pages"
        description="Reference copy from key landing pages on the marketing website"
      />
      <div className="max-w-4xl mx-auto">
        <div className="space-y-3">
          {pages.map((page: any) => (
            <Link
              key={page.id}
              href={`/pages/${page.id}`}
              className="block p-4 bg-white rounded-md shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-medium text-gray-900">{page.name}</h2>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{page.url_path}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {page.section_count} section{page.section_count !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(page.updated_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </Link>
          ))}

          {pages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm mb-4">No landing pages synced yet</p>
              <p className="text-gray-400 text-xs">
                Run <code className="px-2 py-1 bg-gray-100 rounded">npm run sync-pages</code> to sync landing page copy
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
