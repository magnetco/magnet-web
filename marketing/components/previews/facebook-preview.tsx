import { CharCount } from '@/components/ui/char-count'

interface FacebookContent {
  primaryText: string
  headline: string
  description: string
  imageUrl?: string
  destinationUrl?: string
  ctaButton: string
}

interface Props {
  content: FacebookContent
  showCharCounts?: boolean
}

export function FacebookPreview({ content, showCharCounts = true }: Props) {
  return (
    <div className="max-w-[500px] bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-ember flex items-center justify-center text-white font-semibold text-sm">
          M
        </div>
        <div>
          <div className="font-semibold text-sm">Magnet</div>
          <div className="text-xs text-gray-500">Sponsored · 🌐</div>
        </div>
      </div>

      {/* Primary text */}
      <div className="px-4 pb-3">
        <p className="text-sm text-gray-900">{content.primaryText}</p>
        {showCharCounts && <CharCount current={content.primaryText.length} max={125} className="mt-1" />}
      </div>

      {/* Image placeholder */}
      <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-400">
        {content.imageUrl ? (
          <img src={content.imageUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <span>1080 × 1080 image</span>
        )}
      </div>

      {/* Card content */}
      <div className="p-4 border-t border-gray-200 flex justify-between items-center">
        <div className="flex-1">
          <div className="text-xs text-gray-500 uppercase">{content.destinationUrl || 'MAGNET.CO'}</div>
          <div className="font-semibold text-gray-900">{content.headline}</div>
          {showCharCounts && <CharCount current={content.headline.length} max={40} />}
          <div className="text-sm text-gray-600">{content.description}</div>
          {showCharCounts && <CharCount current={content.description.length} max={30} />}
        </div>
        <button className="px-4 py-2 bg-gray-100 text-gray-900 text-sm font-semibold rounded">
          {content.ctaButton}
        </button>
      </div>
    </div>
  )
}
