import { Palette } from 'lucide-react'
import { PageHeader } from '@/components/ui/page-header'
import { EmptyState } from '@/components/ui/empty-state'

export default function BrandPage() {
  return (
    <>
      <PageHeader
        title="Brand Assets"
        description="Manage logos, colors, typography, and design system"
      />
      <EmptyState
        icon={Palette}
        title="Brand Assets"
        description="Centralize and manage all your brand assets and design system."
        features={[
          'Logo variations library and management',
          'Color palette manager with export',
          'Typography system documentation',
          'Design component library',
          'Brand guidelines and usage rules',
          'Asset version control and history',
        ]}
      />
    </>
  )
}
