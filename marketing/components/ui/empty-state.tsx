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
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ember/10 mb-4">
          <Icon className="w-8 h-8 text-ember" />
        </div>
        
        <div className="inline-flex items-center gap-2 mb-2">
          <h2 className="text-2xl font-semibold text-oxblood">{title}</h2>
          <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
            COMING SOON
          </span>
        </div>
        
        <p className="text-gray-600 mb-6">{description}</p>
        
        {features && features.length > 0 && (
          <div className="bg-white rounded-lg border border-opal p-6 text-left">
            <h3 className="text-sm font-semibold text-oxblood mb-3">Planned Features:</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-ember mt-0.5">•</span>
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
