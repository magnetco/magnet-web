import { CharCount } from '@/components/ui/char-count'

interface LinkedInPostContent {
  postText: string
  hashtags: string[]
  imageUrl?: string
  linkUrl?: string
  linkTitle?: string
  linkDescription?: string
}

interface Props {
  content: LinkedInPostContent
  showCharCounts?: boolean
}

export function LinkedInPostPreview({ content, showCharCounts = true }: Props) {
  return (
    <div className="max-w-[552px] bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-ember flex items-center justify-center text-white font-semibold">
          M
        </div>
        <div>
          <div className="font-semibold text-sm">Magnet</div>
          <div className="text-xs text-gray-500">1h • 🌐</div>
        </div>
      </div>

      {/* Post text */}
      <div className="px-4 pb-3">
        <p className="text-sm text-gray-900 whitespace-pre-wrap">{content.postText}</p>
        {showCharCounts && (
          <CharCount current={content.postText.length} max={3000} className="mt-2" />
        )}
        <div className="mt-2 text-[#0a66c2] text-sm">
          {content.hashtags.map((tag) => `#${tag}`).join(' ')}
        </div>
      </div>

      {/* Optional image */}
      {content.imageUrl && (
        <div className="aspect-[1.91/1] bg-gray-100">
          <img src={content.imageUrl} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Engagement bar */}
      <div className="px-4 py-3 border-t border-gray-200 flex gap-6 text-gray-500 text-sm">
        <span>👍 Like</span>
        <span>💬 Comment</span>
        <span>🔄 Repost</span>
        <span>📤 Send</span>
      </div>
    </div>
  )
}
