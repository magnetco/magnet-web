import { CharCount } from '@/components/ui/char-count'

interface SerpContent {
  title: string
  description: string
  url?: string
  breadcrumbs: string[]
}

interface Props {
  content: SerpContent
  showCharCounts?: boolean
}

export function SerpPreview({ content, showCharCounts = true }: Props) {
  const baseUrl = content.url || 'magnetmarketingpartners.com'

  return (
    <div className="max-w-[600px] p-4 bg-white rounded-lg border border-opal">
      {/* Favicon and URL */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-ember" />
        </div>
        <div>
          <div className="text-sm text-gray-700">{baseUrl}</div>
          <div className="text-xs text-gray-500">
            https://{baseUrl} › {content.breadcrumbs.join(' › ')}
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer leading-tight mb-1">
        {content.title}
      </h3>
      {showCharCounts && <CharCount current={content.title.length} max={60} className="mb-1" />}

      {/* Description */}
      <p className="text-sm text-gray-700 leading-relaxed">
        {content.description}
      </p>
      {showCharCounts && <CharCount current={content.description.length} max={160} className="mt-1" />}
    </div>
  )
}
