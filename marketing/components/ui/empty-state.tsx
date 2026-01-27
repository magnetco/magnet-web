import type { LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  features?: string[]
}

export function EmptyState({ icon: Icon, title, description, features }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[600px]">
      <div className="max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-md bg-gray-100 mb-4">
          <Icon className="w-8 h-8 text-gray-500" />
        </div>
        
        <div className="inline-flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-medium text-gray-900">{title}</h2>
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
            COMING SOON
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-6">{description}</p>
        
        {features && features.length > 0 && (
          <div className="bg-white rounded-md shadow-sm p-6 text-left">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Planned Features:</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
