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
          className="px-3 py-1 text-sm border border-opal rounded bg-white"
          onClick={(e) => (e.target as HTMLInputElement).select()}
        />
        <button
          onClick={() => {
            navigator.clipboard.writeText(shareUrl)
            alert('Link copied to clipboard!')
          }}
          className="px-3 py-1 text-sm bg-ember text-frost rounded hover:bg-ember/90"
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
        className="px-4 py-2 text-sm bg-basalt text-frost rounded hover:bg-basalt/90 disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Create Share Link'}
      </button>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
