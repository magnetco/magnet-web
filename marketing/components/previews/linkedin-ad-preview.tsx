import { CharCount } from '@/components/ui/char-count'

interface LinkedInAdContent {
  introText: string
  headline: string
  description: string
  imageUrl?: string
  destinationUrl?: string
  ctaButton: string
}

interface Props {
  content: LinkedInAdContent
  showCharCounts?: boolean
}

export function LinkedInAdPreview({ content, showCharCounts = true }: Props) {
  return (
    <div className="max-w-[552px] bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-ember flex items-center justify-center text-white font-semibold">
          M
        </div>
        <div>
          <div className="font-semibold text-sm">Magnet</div>
          <div className="text-xs text-gray-500">Promoted</div>
        </div>
      </div>

      {/* Intro text */}
      <div className="px-4 pb-3">
        <p className="text-sm text-gray-900">{content.introText}</p>
        {showCharCounts && <CharCount current={content.introText.length} max={150} className="mt-1" />}
      </div>

      {/* Image placeholder */}
      <div className="aspect-[1.91/1] bg-gray-100 flex items-center justify-center text-gray-400">
        {content.imageUrl ? (
          <img src={content.imageUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <span>1200 × 628 image</span>
        )}
      </div>

      {/* Card content */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-sm text-gray-500 mb-1">{content.destinationUrl || 'magnet.co'}</div>
        <div className="font-semibold text-gray-900 mb-1">{content.headline}</div>
        {showCharCounts && <CharCount current={content.headline.length} max={70} className="mb-1" />}
        <div className="text-sm text-gray-600">{content.description}</div>
        {showCharCounts && <CharCount current={content.description.length} max={100} className="mt-1" />}
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <button className="px-4 py-2 bg-[#0a66c2] text-white text-sm font-semibold rounded-full">
          {content.ctaButton}
        </button>
      </div>
    </div>
  )
}
