import { sql } from '@/lib/db'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/ui/page-header'
import { ExternalLink } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getPage(id: string) {
  const [page] = await sql`
    SELECT * FROM marketing_landing_pages WHERE id = ${id}
  `

  if (!page) return null

  const sections = await sql`
    SELECT * FROM marketing_page_sections
    WHERE page_id = ${id}
    ORDER BY sort_order ASC
  `

  return { page, sections }
}

const SECTION_TYPE_LABELS: Record<string, string> = {
  hero: 'Hero',
  features: 'Features',
  stats: 'Stats',
  testimonials: 'Testimonials',
  testimonial: 'Testimonial',
  cta: 'Call to Action',
  faq: 'FAQ',
  pricing: 'Pricing',
  industries: 'Industries',
}

const SECTION_TYPE_COLORS: Record<string, string> = {
  hero: 'bg-purple-100 text-purple-700',
  features: 'bg-blue-100 text-blue-700',
  stats: 'bg-green-100 text-green-700',
  testimonials: 'bg-amber-100 text-amber-700',
  testimonial: 'bg-amber-100 text-amber-700',
  cta: 'bg-ember/10 text-ember',
  faq: 'bg-gray-100 text-gray-700',
  pricing: 'bg-indigo-100 text-indigo-700',
  industries: 'bg-teal-100 text-teal-700',
}

export default async function PageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getPage(id)

  if (!data) {
    notFound()
  }

  const { page, sections } = data

  return (
    <>
      <PageHeader
        title={page.name}
        description={`Copy reference for ${page.url_path}`}
        breadcrumbs={[
          { label: 'Landing Pages', href: '/pages' },
          { label: page.name },
        ]}
        actions={
          <a
            href={`https://magnetstudio.com${page.url_path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium text-sm transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Live
          </a>
        }
      />
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {sections.map((section: any) => (
            <div key={section.id} className="p-6 bg-white rounded-md shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    SECTION_TYPE_COLORS[section.section_type] || 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {SECTION_TYPE_LABELS[section.section_type] || section.section_type}
                </span>
                {section.section_name && (
                  <span className="text-sm text-gray-500">{section.section_name}</span>
                )}
              </div>

              <div className="space-y-4">
                {section.headline && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Headline
                    </h3>
                    <p className="text-xl font-semibold text-gray-900">{section.headline}</p>
                  </div>
                )}

                {section.subheadline && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Subheadline
                    </h3>
                    <p className="text-base text-gray-700">{section.subheadline}</p>
                  </div>
                )}

                {section.body_copy && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Body Copy
                    </h3>
                    <p className="text-sm text-gray-600">{section.body_copy}</p>
                  </div>
                )}

                {section.cta_text && (
                  <div>
                    <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      CTA Text
                    </h3>
                    <p className="text-sm font-medium text-ember">{section.cta_text}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {sections.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-12">No sections found for this page</p>
          )}
        </div>
      </div>
    </>
  )
}
