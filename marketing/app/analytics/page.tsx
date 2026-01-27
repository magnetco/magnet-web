import { BarChart3 } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { EmptyState } from '@/components/ui/empty-state'

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Analytics"
        description="Track performance, measure ROI, and gain insights"
      />
      <EmptyState
        icon={BarChart3}
        title="Analytics"
        description="Comprehensive analytics and reporting for all your marketing efforts."
        features={[
          'Performance dashboards with key metrics',
          'Attribution modeling and tracking',
          'ROI calculator and forecasting',
          'Custom report builder',
          'Cross-channel analytics',
          'Data visualization and insights',
        ]}
      />
    </>
  )
}
