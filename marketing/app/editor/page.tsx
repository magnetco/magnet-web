'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Platform } from '@/lib/prompts'
import { PlatformForm } from '@/components/forms/platform-form'
import { GoogleAdPreview } from '@/components/previews/google-ad-preview'
import { LinkedInAdPreview } from '@/components/previews/linkedin-ad-preview'
import { LinkedInPostPreview } from '@/components/previews/linkedin-post-preview'
import { FacebookPreview } from '@/components/previews/facebook-preview'
import { SerpPreview } from '@/components/previews/serp-preview'
import { PageHeader } from '@/components/ui/page-header'
import { VariationCard } from '@/components/editor/variation-card'
import { SaveDialog } from '@/components/editor/save-dialog'

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: 'google_ad', label: 'Google Ads' },
  { value: 'linkedin_ad', label: 'LinkedIn Sponsored' },
  { value: 'linkedin_post', label: 'LinkedIn Organic' },
  { value: 'facebook', label: 'Facebook/Instagram' },
  { value: 'serp', label: 'SERP Preview' },
]

const SEGMENTS = [
  'B2B SaaS Leaders',
  'E-commerce Brands',
  'Professional Services',
  'Healthcare Tech',
  'Manufacturing',
]

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

export default function EditorPage() {
  const router = useRouter()
  const [platform, setPlatform] = useState<Platform>('google_ad')
  const [segment, setSegment] = useState(SEGMENTS[0])
  const [topic, setTopic] = useState('')
  const [additionalContext, setAdditionalContext] = useState('')
  const [variations, setVariations] = useState<Variation[]>([])
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [pinnedIndices, setPinnedIndices] = useState<Set<number>>(new Set())
  const [content, setContent] = useState<Record<string, unknown>>({})
  const [generating, setGenerating] = useState(false)
  const [generatorCollapsed, setGeneratorCollapsed] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [variationCount, setVariationCount] = useState(5)

  const selectedVariation = selectedIndex !== null ? variations[selectedIndex] : null

  async function handleGenerate() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, segment, topic, additionalContext, count: variationCount }),
      })
      const data = await res.json()
      if (data.variations) {
        // Sort by overall score descending
        const sorted = data.variations.sort((a: Variation, b: Variation) => b.score.overall - a.score.overall)
        setVariations(sorted)
        setSelectedIndex(0)
        setContent(sorted[0].content)
        setPinnedIndices(new Set())
        setGeneratorCollapsed(true)
      }
    } catch (error) {
      console.error('Generation error:', error)
    } finally {
      setGenerating(false)
    }
  }

  function handleVariationSelect(index: number) {
    setSelectedIndex(index)
    setContent(variations[index].content)
  }

  function handleVariationPin(index: number) {
    setPinnedIndices((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  async function handleSavePinned(name: string, description: string) {
    if (pinnedIndices.size === 0) return

    setSaving(true)
    try {
      // Create campaign
      const campaignRes = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description }),
      })
      const campaign = await campaignRes.json()

      // Save all pinned variations as mockups
      const pinnedArray = Array.from(pinnedIndices).sort((a, b) => a - b)
      await Promise.all(
        pinnedArray.map((index) =>
          fetch('/api/mockups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              campaignId: campaign.id,
              platform,
              name: `Variation ${index + 1}`,
              content: variations[index].content,
            }),
          })
        )
      )

      router.push(`/campaigns/${campaign.id}`)
    } catch (error) {
      console.error('Save error:', error)
      setSaving(false)
      setSaveDialogOpen(false)
    }
  }

  const PreviewComponent = {
    google_ad: GoogleAdPreview,
    linkedin_ad: LinkedInAdPreview,
    linkedin_post: LinkedInPostPreview,
    facebook: FacebookPreview,
    serp: SerpPreview,
  }[platform]

  const pinnedVariations = Array.from(pinnedIndices)
    .sort((a, b) => a - b)
    .map((index) => ({ index, variation: variations[index] }))

  return (
    <>
      <PageHeader
        title="Ad Copy Editor"
        description="Create and edit ad copy mockups with AI assistance"
      />
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Generation Controls */}
        <div className="bg-white rounded-md shadow-sm">
          <button
            onClick={() => setGeneratorCollapsed(!generatorCollapsed)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <h2 className="text-base font-medium text-gray-900">Generation Controls</h2>
              {variations.length > 0 && (
                <span className="text-xs text-gray-500">
                  {variations.length} variation{variations.length !== 1 ? 's' : ''} generated
                </span>
              )}
            </div>
            {generatorCollapsed ? (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            )}
          </button>

          {!generatorCollapsed && (
            <div className="p-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Platform selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => {
                    setPlatform(e.target.value as Platform)
                    setContent({})
                  }}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  {PLATFORMS.map((p) => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>

              {/* Target Segment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Segment</label>
                <select
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  {SEGMENTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic/Focus</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Full funnel marketing"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              {/* Additional Context */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Context (optional)</label>
                <input
                  type="text"
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  placeholder="Specific messaging..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                />
              </div>

              {/* Generate Button */}
              <div className="flex items-end">
                <button
                  onClick={handleGenerate}
                  disabled={generating || !topic}
                  className="w-full py-2 bg-ember text-white rounded-md hover:bg-ember/90 disabled:opacity-50 font-medium text-sm transition-colors"
                >
                  {generating ? 'Generating...' : `Generate ${variationCount}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Horizontal Scrollable Variations */}
        {variations.length > 0 && (
          <div className="bg-white rounded-md shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-gray-900">All Variations</h2>
              <span className="text-xs text-gray-500">Click to select, star to pin</span>
            </div>
            <div className="overflow-x-auto snap-x snap-mandatory -mx-4 px-4">
              <div className="flex gap-4 pb-2">
                {variations.map((variation, index) => (
                  <VariationCard
                    key={index}
                    variation={variation}
                    index={index}
                    platform={platform}
                    isPinned={pinnedIndices.has(index)}
                    isSelected={selectedIndex === index}
                    onPin={() => handleVariationPin(index)}
                    onSelect={() => handleVariationSelect(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Selected Variation - Large Preview & Edit Form */}
        {selectedVariation && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Edit Form */}
            <div className="bg-white rounded-md shadow-sm p-4">
              <h2 className="text-base font-medium text-gray-900 mb-4">Edit Content</h2>
              <PlatformForm
                platform={platform}
                content={content}
                onChange={setContent}
              />
            </div>

            {/* Large Preview */}
            <div className="bg-white rounded-md shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-medium text-gray-900">Preview</h2>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    selectedVariation.score.overall >= 8
                      ? 'bg-green-100 text-green-700'
                      : selectedVariation.score.overall >= 6
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {selectedVariation.score.overall}/10
                </span>
              </div>
              <PreviewComponent content={content as any} showCharCounts />
              
              {/* Feedback */}
              {selectedVariation.score.feedback.length > 0 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <h3 className="text-xs font-medium text-gray-700 mb-2">AI Feedback:</h3>
                  <ul className="space-y-1">
                    {selectedVariation.score.feedback.map((item, i) => (
                      <li key={i} className="text-xs text-gray-600">• {item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pinned Variations Section */}
        {pinnedVariations.length > 0 && (
          <div className="bg-white rounded-md shadow-sm p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-medium text-gray-900">
                Pinned Variations ({pinnedVariations.length})
              </h2>
              <button
                onClick={() => setSaveDialogOpen(true)}
                disabled={saving}
                className="px-4 py-2 bg-ember text-white rounded-md hover:bg-ember/90 disabled:opacity-50 font-medium text-sm transition-colors"
              >
                Save {pinnedVariations.length} Pinned Ad{pinnedVariations.length !== 1 ? 's' : ''}
              </button>
            </div>
            <div className="overflow-x-auto -mx-4 px-4">
              <div className="flex gap-4 pb-2">
                {pinnedVariations.map(({ index, variation }) => (
                  <VariationCard
                    key={index}
                    variation={variation}
                    index={index}
                    platform={platform}
                    isPinned={true}
                    isSelected={selectedIndex === index}
                    onPin={() => handleVariationPin(index)}
                    onSelect={() => handleVariationSelect(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {variations.length === 0 && (
          <div className="bg-white rounded-md shadow-sm p-12 text-center">
            <p className="text-gray-500 text-sm">
              Configure your settings above and click Generate to create ad variations
            </p>
          </div>
        )}
      </div>

      {/* Save Dialog */}
      <SaveDialog
        isOpen={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        onSave={handleSavePinned}
        pinnedCount={pinnedVariations.length}
        isSaving={saving}
      />
    </>
  )
}
