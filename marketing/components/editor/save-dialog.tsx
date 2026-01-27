'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface SaveDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string, description: string) => void
  pinnedCount: number
  isSaving: boolean
}

export function SaveDialog({ isOpen, onClose, onSave, pinnedCount, isSaving }: SaveDialogProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  if (!isOpen) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (name.trim()) {
      onSave(name.trim(), description.trim())
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-md shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Save Campaign</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            disabled={isSaving}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-4">
              You're about to save {pinnedCount} pinned variation{pinnedCount !== 1 ? 's' : ''} as a new campaign.
            </p>
          </div>

          <div>
            <label htmlFor="campaign-name" className="block text-sm font-medium text-gray-700 mb-1">
              Campaign Name
            </label>
            <input
              id="campaign-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Q1 Google Ads Campaign"
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              disabled={isSaving}
              autoFocus
              required
            />
          </div>

          <div>
            <label htmlFor="campaign-description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (optional)
            </label>
            <textarea
              id="campaign-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add notes about this campaign..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
              disabled={isSaving}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors font-medium text-sm"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-ember text-white rounded-md hover:bg-ember/90 transition-colors font-medium text-sm disabled:opacity-50"
              disabled={isSaving || !name.trim()}
            >
              {isSaving ? 'Saving...' : 'Save Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
