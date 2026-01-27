import { Mail } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { EmptyState } from '@/components/ui/empty-state'

export default function EmailPage() {
  return (
    <>
      <PageHeader
        title="Email Marketing"
        description="Create, automate, and optimize your email campaigns"
      />
      <EmptyState
        icon={Mail}
        title="Email Marketing"
        description="Build email campaigns, templates, and automation sequences."
        features={[
          'Visual email campaign builder',
          'Template library with customization',
          'Automation workflow builder',
          'A/B testing and optimization',
          'Performance metrics and analytics',
          'List segmentation and management',
        ]}
      />
    </>
  )
}
