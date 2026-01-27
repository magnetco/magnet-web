import { sql } from '@/lib/db'
import { notFound } from 'next/navigation'
import { GoogleAdPreview } from '@/components/previews/google-ad-preview'

export const dynamic = 'force-dynamic'
import { LinkedInAdPreview } from '@/components/previews/linkedin-ad-preview'
import { LinkedInPostPreview } from '@/components/previews/linkedin-post-preview'
import { FacebookPreview } from '@/components/previews/facebook-preview'
import { SerpPreview } from '@/components/previews/serp-preview'

async function getCampaignByToken(token: string) {
  const [link] = await sql`
    SELECT * FROM marketing_share_links
    WHERE token = ${token}
  `

  if (!link) return null

  // Check expiration
  if (new Date(link.expires_at as string) < new Date()) {
    return { expired: true }
  }

  const [campaign] = await sql`
    SELECT * FROM marketing_campaigns WHERE id = ${link.campaign_id}
  `

  if (!campaign) return null

  const mockups = await sql`
    SELECT * FROM marketing_mockups
    WHERE campaign_id = ${campaign.id}
    ORDER BY sort_order ASC
  `

  return { campaign, mockups }
}

const PREVIEW_COMPONENTS = {
  google_ad: GoogleAdPreview,
  linkedin_ad: LinkedInAdPreview,
  linkedin_post: LinkedInPostPreview,
  facebook: FacebookPreview,
  serp: SerpPreview,
}

export default async function ReviewPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const data = await getCampaignByToken(token)

  if (!data) {
    notFound()
  }

  if ('expired' in data) {
    return (
      <div className="min-h-screen bg-snow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-oxblood mb-2">Link Expired</h1>
          <p className="text-gray-600">This review link has expired. Please request a new one.</p>
        </div>
      </div>
    )
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
        </div>
      </div>
    </div>
  )
}
