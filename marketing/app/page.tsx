import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { navigation } from '@/lib/navigation'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <PageHeader
        title="Marketing Studio"
        description="AI-powered marketing platform for Magnet"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {navigation.map((section) =>
          section.items.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="block p-6 bg-white rounded-lg border border-opal hover:border-ember transition-all hover:shadow-lg group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-ember/10 rounded-lg group-hover:bg-ember/20 transition-colors">
                    <Icon className="w-6 h-6 text-ember" />
                  </div>
                  {item.isNew && (
                    <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
                      NEW
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-oxblood mb-2 group-hover:text-ember transition-colors">
                  {item.label}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center text-sm text-ember font-medium">
                  <span>Open</span>
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })
        )}
      </div>
    </>
  )
}
