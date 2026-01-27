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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {navigation.map((section) =>
          section.items.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="block p-6 bg-white rounded-md shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-gray-100 rounded-md group-hover:bg-gray-200 transition-colors">
                    <Icon className="w-6 h-6 text-gray-700" />
                  </div>
                  {item.isNew && (
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
                      NEW
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {item.label}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{item.description}</p>
                <div className="flex items-center text-sm text-gray-700 font-medium">
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
