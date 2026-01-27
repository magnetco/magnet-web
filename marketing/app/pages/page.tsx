import { Layout } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { EmptyState } from '@/components/ui/empty-state'

export default function PagesPage() {
  return (
    <>
      <PageHeader
        title="Landing Pages"
        description="Build, test, and optimize high-converting landing pages"
      />
      <EmptyState
        icon={Layout}
        title="Landing Pages"
        description="Create and optimize landing pages for maximum conversions."
        features={[
          'Drag-and-drop page builder',
          'Template library with best practices',
          'A/B testing and multivariate testing',
          'Conversion tracking and analytics',
          'Mobile-responsive design',
          'Integration with ad platforms',
        ]}
      />
    </>
  )
}
