'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Platform } from '@/lib/prompts'
import { PlatformForm } from '@/components/forms/platform-form'
import { GoogleAdPreview } from '@/components/previews/google-ad-preview'
import { LinkedInAdPreview } from '@/components/previews/linkedin-ad-preview'
import { LinkedInPostPreview } from '@/components/previews/linkedin-post-preview'
import { FacebookPreview } from '@/components/previews/facebook-preview'
import { SerpPreview } from '@/components/previews/serp-preview'
import { PageHeader } from '@/components/ui/page-header'

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [content, setContent] = useState<Record<string, unknown>>({})
  const [generating, setGenerating] = useState(false)
  const [mockupName, setMockupName] = useState('')
  const [saving, setSaving] = useState(false)
  const [variationCount, setVariationCount] = useState(5)

  const currentVariation = variations[currentIndex]

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
        setCurrentIndex(0)
        setContent(sorted[0].content)
      }
    } catch (error) {
      console.error('Generation error:', error)
    } finally {
      setGenerating(false)
    }
  }

  function handleVariationChange(index: number) {
    setCurrentIndex(index)
    setContent(variations[index].content)
  }

  function handleNextVariation() {
    const nextIndex = (currentIndex + 1) % variations.length
    handleVariationChange(nextIndex)
  }

  function handlePrevVariation() {
    const prevIndex = (currentIndex - 1 + variations.length) % variations.length
    handleVariationChange(prevIndex)
  }

  async function handleSave() {
    if (!mockupName || Object.keys(content).length === 0) return

    setSaving(true)
    try {
      // First, create or get a campaign
      const campaignRes = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Campaign - ${new Date().toLocaleDateString()}`,
          description: '',
        }),
      })
      const campaign = await campaignRes.json()

      // Then save the mockup
      await fetch('/api/mockups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignId: campaign.id,
          platform,
          name: mockupName,
          content,
        }),
      })

      router.push(`/campaigns/${campaign.id}`)
    } catch (error) {
      console.error('Save error:', error)
      setSaving(false)
    }
  }

  const PreviewComponent = {
    google_ad: GoogleAdPreview,
    linkedin_ad: LinkedInAdPreview,
    linkedin_post: LinkedInPostPreview,
    facebook: FacebookPreview,
    serp: SerpPreview,
  }[platform]

  return (
    <>
      <PageHeader
        title="Ad Copy Editor"
        description="Create and edit ad copy mockups with AI assistance"
      />
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Controls & Form */}
          <div className="space-y-6">
            {/* Platform selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
              <select
                value={platform}
                onChange={(e) => {
                  setPlatform(e.target.value as Platform)
                  setContent({})
                }}
                className="w-full px-3 py-2 border border-opal rounded-lg"
              >
                {PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            {/* AI Generation */}
            <div className="p-4 bg-white rounded-lg border border-opal space-y-4">
              <h2 className="font-semibold text-oxblood">AI Generation</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Segment</label>
                <select
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  className="w-full px-3 py-2 border border-opal rounded-lg"
                >
                  {SEGMENTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic/Focus</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Full funnel digital marketing"
                  className="w-full px-3 py-2 border border-opal rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Context (optional)</label>
                <textarea
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  rows={2}
                  placeholder="Specific messaging, offers, or angles..."
                  className="w-full px-3 py-2 border border-opal rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Variations to Generate</label>
                <select
                  value={variationCount}
                  onChange={(e) => setVariationCount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-opal rounded-lg"
                >
                  <option value={3}>3 variations</option>
                  <option value={5}>5 variations</option>
                  <option value={10}>10 variations</option>
                </select>
              </div>

              <button
                onClick={handleGenerate}
                disabled={generating || !topic}
                className="w-full py-2 bg-ember text-frost rounded-lg hover:bg-ember/90 disabled:opacity-50"
              >
                {generating ? 'Generating...' : `Generate ${variationCount} Variations`}
              </button>
            </div>

            {/* Variation Navigator */}
            {variations.length > 0 && (
              <div className="p-4 bg-white rounded-lg border border-opal space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-oxblood">Variations</h2>
                  <span className="text-sm text-gray-500">
                    {currentIndex + 1} of {variations.length}
                  </span>
                </div>

                {/* Quality Score */}
                {currentVariation && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Quality Score</span>
                      <span className={`text-lg font-bold ${
                        currentVariation.score.overall >= 8 ? 'text-green-600' :
                        currentVariation.score.overall >= 6 ? 'text-amber-600' :
                        'text-red-600'
                      }`}>
                        {currentVariation.score.overall}/10
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Specificity:</span>
                        <span className="font-medium">{currentVariation.score.specificity}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Clarity:</span>
                        <span className="font-medium">{currentVariation.score.clarity}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Urgency:</span>
                        <span className="font-medium">{currentVariation.score.urgency}/10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Credibility:</span>
                        <span className="font-medium">{currentVariation.score.credibility}/10</span>
                      </div>
                    </div>

                    {currentVariation.score.feedback.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {currentVariation.score.feedback.map((item, i) => (
                          <div key={i} className="text-xs text-gray-600">{item}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation */}
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevVariation}
                    className="flex-1 py-2 border border-opal rounded-lg hover:bg-gray-50"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={handleNextVariation}
                    className="flex-1 py-2 border border-opal rounded-lg hover:bg-gray-50"
                  >
                    Next →
                  </button>
                </div>

                {/* Quick jump */}
                <div className="flex flex-wrap gap-1">
                  {variations.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => handleVariationChange(i)}
                      className={`px-2 py-1 text-xs rounded ${
                        i === currentIndex
                          ? 'bg-ember text-white'
                          : v.score.overall >= 8
                          ? 'bg-green-100 text-green-700'
                          : v.score.overall >= 6
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {i + 1} ({v.score.overall})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Manual edit form */}
            <div className="p-4 bg-white rounded-lg border border-opal">
              <h2 className="font-semibold text-oxblood mb-4">Edit Content</h2>
              <PlatformForm
                platform={platform}
                content={content}
                onChange={setContent}
              />
            </div>

            {/* Save controls */}
            <div className="p-4 bg-white rounded-lg border border-opal space-y-4">
              <input
                type="text"
                value={mockupName}
                onChange={(e) => setMockupName(e.target.value)}
                placeholder="Mockup name..."
                className="w-full px-3 py-2 border border-opal rounded-lg"
              />
              <button
                onClick={handleSave}
                disabled={!mockupName || Object.keys(content).length === 0 || saving}
                className="w-full py-2 bg-oxblood text-frost rounded-lg hover:bg-oxblood/90 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Mockup'}
              </button>
            </div>
          </div>

          {/* Right: Preview */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-oxblood">Preview</h2>
              {currentVariation && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  currentVariation.score.overall >= 8 ? 'bg-green-100 text-green-700' :
                  currentVariation.score.overall >= 6 ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {currentVariation.score.overall >= 8 ? '🔥 High Quality' :
                   currentVariation.score.overall >= 6 ? '✓ Good' :
                   '⚠️ Needs Work'}
                </span>
              )}
            </div>
            <div className="sticky top-8">
              {Object.keys(content).length > 0 ? (
                <PreviewComponent content={content as any} showCharCounts />
              ) : (
                <div className="p-8 bg-white rounded-lg border border-opal text-center text-gray-400">
                  Generate variations to see preview
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
