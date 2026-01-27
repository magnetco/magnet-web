import Link from 'next/link'
import { sql } from '@/lib/db'
import { PageHeader } from '@/components/ui/page-header'

export const dynamic = 'force-dynamic'

async function getCampaigns() {
  const campaigns = await sql`
    SELECT c.*, COUNT(m.id)::int as mockup_count
    FROM marketing_campaigns c
    LEFT JOIN marketing_mockups m ON m.campaign_id = c.id
    GROUP BY c.id
    ORDER BY c.updated_at DESC
  `
  return campaigns
}

export default async function CampaignsPage() {
  const campaigns = await getCampaigns()

  return (
    <>
      <PageHeader
        title="Campaigns"
        description="Manage your marketing campaigns and mockups"
        actions={
          <Link
            href="/editor"
            className="px-4 py-2 bg-ember text-white rounded-md hover:bg-ember/90 font-medium text-sm transition-colors"
          >
            New Mockup
          </Link>
        }
      />
      <div className="max-w-4xl mx-auto">

        <div className="space-y-3">
          {campaigns.map((campaign: any) => (
            <Link
              key={campaign.id}
              href={`/campaigns/${campaign.id}`}
              className="block p-4 bg-white rounded-md shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-medium text-gray-900">{campaign.name}</h2>
                  {campaign.description && (
                    <p className="text-sm text-gray-500 mt-1">{campaign.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    {campaign.mockup_count} mockup{campaign.mockup_count !== 1 ? 's' : ''}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  campaign.status === 'approved' ? 'bg-green-100 text-green-700' :
                  campaign.status === 'review' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {campaign.status}
                </span>
              </div>
            </Link>
          ))}

          {campaigns.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-12">No campaigns yet</p>
          )}
        </div>
      </div>
    </>
  )
}
