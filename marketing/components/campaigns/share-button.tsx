'use client'

import { useState } from 'react'

interface Props {
  campaignId: string
}

export function ShareButton({ campaignId }: Props) {
  const [loading, setLoading] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleShare() {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId, expiresInDays: 7 }),
      })

      if (!res.ok) {
        throw new Error('Failed to create share link')
      }

      const data = await res.json()
      setShareUrl(data.url)
    } catch (err) {
      setError('Failed to create share link')
    } finally {
      setLoading(false)
    }
  }

  if (shareUrl) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="px-3 py-1 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(shareUrl)
            alert('Link copied to clipboard!')
          }}
          className="px-3 py-1 text-sm bg-ember text-white rounded-md hover:bg-ember/90 font-medium transition-colors"
        >
          Copy
        </button>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={handleShare}
        disabled={loading}
        className="px-4 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 font-medium transition-colors"
      >
        {loading ? 'Generating...' : 'Create Share Link'}
      </button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
