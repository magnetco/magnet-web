'use client'

import { Star } from 'lucide-react'
import { clsx } from 'clsx'
import { Platform } from '@/lib/prompts'
import { GoogleAdPreview } from '@/components/previews/google-ad-preview'
import { LinkedInAdPreview } from '@/components/previews/linkedin-ad-preview'
import { LinkedInPostPreview } from '@/components/previews/linkedin-post-preview'
import { FacebookPreview } from '@/components/previews/facebook-preview'
import { SerpPreview } from '@/components/previews/serp-preview'

interface Variation {
  content: Record<string, unknown>
  score: {
    overall: number
    specificity: number
    clarity: number
    urgency: number
    credibility: number
    feedback: string[]
  }
}

interface VariationCardProps {
  variation: Variation
  index: number
  platform: Platform
  isPinned: boolean
  isSelected: boolean
  onPin: () => void
  onSelect: () => void
}

export function VariationCard({
  variation,
  index,
  platform,
  isPinned,
  isSelected,
  onPin,
  onSelect,
}: VariationCardProps) {
  const PreviewComponent = {
    google_ad: GoogleAdPreview,
    linkedin_ad: LinkedInAdPreview,
    linkedin_post: LinkedInPostPreview,
    facebook: FacebookPreview,
    serp: SerpPreview,
  }[platform]

  return (
    <div
      className={clsx(
        'shrink-0 w-80 bg-white rounded-md shadow-sm transition-all cursor-pointer snap-start',
        isSelected && 'ring-2 ring-gray-900 shadow-md'
      )}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">Variation {index + 1}</span>
          <span
            className={clsx(
              'px-2 py-0.5 text-xs font-medium rounded',
              variation.score.overall >= 8
                ? 'bg-green-100 text-green-700'
                : variation.score.overall >= 6
                ? 'bg-amber-100 text-amber-700'
                : 'bg-red-100 text-red-700'
            )}
          >
            {variation.score.overall}/10
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPin()
          }}
          className={clsx(
            'p-1.5 rounded-md transition-colors',
            isPinned
              ? 'text-ember hover:bg-ember/10'
              : 'text-gray-400 hover:bg-gray-100'
          )}
          title={isPinned ? 'Unpin' : 'Pin'}
        >
          <Star
            className={clsx('w-4 h-4', isPinned && 'fill-current')}
          />
        </button>
      </div>

      {/* Preview */}
      <div className="p-3">
        <div className="transform scale-75 origin-top-left w-[133%] h-[200px] overflow-hidden">
          <PreviewComponent content={variation.content as any} showCharCounts={false} />
        </div>
      </div>

      {/* Score breakdown */}
      <div className="px-3 pb-3 space-y-1">
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">Specificity:</span>
            <span className="font-medium text-gray-700">{variation.score.specificity}/10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Clarity:</span>
            <span className="font-medium text-gray-700">{variation.score.clarity}/10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Urgency:</span>
            <span className="font-medium text-gray-700">{variation.score.urgency}/10</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Credibility:</span>
            <span className="font-medium text-gray-700">{variation.score.credibility}/10</span>
          </div>
        </div>
      </div>
    </div>
  )
}
