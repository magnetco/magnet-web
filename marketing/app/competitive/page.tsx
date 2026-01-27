import { Binoculars } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { EmptyState } from '@/components/ui/empty-state'

export default function CompetitivePage() {
  return (
    <>
      <PageHeader
        title="Competitive Intelligence"
        description="Track competitors, analyze markets, and identify opportunities"
      />
      <EmptyState
        icon={Binoculars}
        title="Competitive Intelligence"
        description="Monitor competitors and analyze market trends to stay ahead."
        features={[
          'Competitor profile management',
          'Market positioning map visualization',
          'Feature comparison matrix builder',
          'Trend analysis and reporting',
          'SWOT analysis tools',
          'Automated competitor monitoring',
        ]}
      />
    </>
  )
}
