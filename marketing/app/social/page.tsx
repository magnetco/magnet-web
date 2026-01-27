import { MessageCircle } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { EmptyState } from '@/components/ui/empty-state'

export default function SocialPage() {
  return (
    <>
      <PageHeader
        title="Social Media"
        description="Schedule posts, manage content, and track engagement"
      />
      <EmptyState
        icon={MessageCircle}
        title="Social Media"
        description="Manage your social media presence across all platforms."
        features={[
          'Post scheduler with calendar view',
          'Content library for images and copy',
          'Platform-specific formatting tools',
          'Engagement analytics and insights',
          'Multi-platform publishing',
          'Social listening and monitoring',
        ]}
      />
    </>
  )
}
