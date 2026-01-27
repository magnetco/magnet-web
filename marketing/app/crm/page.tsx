import { Users } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { EmptyState } from '@/components/ui/empty-state'

export default function CRMPage() {
  return (
    <>
      <PageHeader
        title="CRM & Automation"
        description="Manage leads, automate workflows, and track your pipeline"
      />
      <EmptyState
        icon={Users}
        title="CRM & Automation"
        description="Manage customer relationships and automate your marketing workflows."
        features={[
          'Lead pipeline kanban board',
          'Contact management and segmentation',
          'Automation workflow builder',
          'Email and SMS sequences',
          'Integration with external CRMs',
          'Activity tracking and reporting',
        ]}
      />
    </>
  )
}
