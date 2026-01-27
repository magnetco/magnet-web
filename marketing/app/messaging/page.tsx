import { Target } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { EmptyState } from '@/components/ui/empty-state'

export default function MessagingPage() {
  return (
    <>
      <PageHeader
        title="Messaging Hub"
        description="Define your ICP, value propositions, and positioning statements"
      />
      <EmptyState
        icon={Target}
        title="Messaging Hub"
        description="Build and manage your core marketing messages, positioning, and value propositions."
        features={[
          'ICP (Ideal Customer Profile) definition builder',
          'Value proposition canvas and templates',
          'Positioning statement generator',
          'Messaging framework library',
          'Competitor positioning analysis',
          'Message testing and validation',
        ]}
      />
    </>
  )
}
