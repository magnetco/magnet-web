import { sql } from '@/lib/db'
import { notFound } from 'next/navigation'
import { GoogleAdPreview } from '@/components/previews/google-ad-preview'

export const dynamic = 'force-dynamic'
import { LinkedInAdPreview } from '@/components/previews/linkedin-ad-preview'
import { LinkedInPostPreview } from '@/components/previews/linkedin-post-preview'
import { FacebookPreview } from '@/components/previews/facebook-preview'
import { SerpPreview } from '@/components/previews/serp-preview'
import { ShareButton } from '@/components/campaigns/share-button'

const PREVIEW_COMPONENTS = {
  google_ad: GoogleAdPreview,
  linkedin_ad: LinkedInAdPreview,
  linkedin_post: LinkedInPostPreview,
  facebook: FacebookPreview,
  serp: SerpPreview,
}

async function getCampaign(id: string) {
  const [campaign] = await sql`
    SELECT * FROM marketing_campaigns WHERE id = ${id}
  `

  if (!campaign) return null

  const mockups = await sql`
    SELECT * FROM marketing_mockups
    WHERE campaign_id = ${id}
    ORDER BY sort_order ASC
  `

  return { campaign, mockups }
}

export default async function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await getCampaign(id)

  if (!data) {
    notFound()
  }

  const { campaign, mockups } = data

  return (
    <div className="min-h-screen bg-snow">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-oxblood">{campaign.name}</h1>
          {campaign.description && (
            <p className="text-gray-600 mt-2">{campaign.description}</p>
          )}
          <div className="mt-4 flex items-center gap-4">
            <span className={`px-2 py-1 text-xs rounded-full ${
              campaign.status === 'approved' ? 'bg-green-100 text-green-700' :
              campaign.status === 'review' ? 'bg-amber-100 text-amber-700' :
              'bg-gray-100 text-gray-600'
            }`}>
              {campaign.status}
            </span>
            <ShareButton campaignId={id} />
          </div>
        </div>

        <div className="space-y-8">
          {mockups.map((mockup: any) => {
            const Preview = PREVIEW_COMPONENTS[mockup.platform as keyof typeof PREVIEW_COMPONENTS]
            if (!Preview) return null

            return (
              <div key={mockup.id} className="p-6 bg-white rounded-lg border border-opal">
                <h2 className="font-semibold text-oxblood mb-4">{mockup.name}</h2>
                <Preview content={mockup.content} showCharCounts={false} />
              </div>
            )
          })}

          {mockups.length === 0 && (
            <p className="text-center text-gray-400 py-12">No mockups in this campaign</p>
          )}
        </div>
      </div>
    </div>
  )
}
