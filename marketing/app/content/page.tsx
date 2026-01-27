import { Newspaper } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { EmptyState } from '@/components/ui/empty-state'

export default function ContentPage() {
  return (
    <>
      <PageHeader
        title="Content Strategy"
        description="Plan, organize, and optimize your content marketing efforts"
      />
      <EmptyState
        icon={Newspaper}
        title="Content Strategy"
        description="Manage your content calendar, topic clusters, and SEO optimization."
        features={[
          'Content calendar with scheduling',
          'Topic cluster builder and organization',
          'SEO keyword planner and research',
          'Blog post ideation with AI assistance',
          'Content performance analytics',
          'Editorial workflow management',
        ]}
      />
    </>
  )
}
