'use client'

import { Platform } from '@/lib/prompts'

interface Props {
  platform: Platform
  content: Record<string, unknown>
  onChange: (content: Record<string, unknown>) => void
}

const PLATFORM_FIELDS: Record<Platform, { key: string; label: string; max: number; multiline?: boolean }[]> = {
  google_ad: [
    { key: 'headline1', label: 'Headline 1', max: 30 },
    { key: 'headline2', label: 'Headline 2', max: 30 },
    { key: 'headline3', label: 'Headline 3', max: 30 },
    { key: 'description1', label: 'Description 1', max: 90, multiline: true },
    { key: 'description2', label: 'Description 2', max: 90, multiline: true },
    { key: 'path1', label: 'Path 1', max: 15 },
    { key: 'path2', label: 'Path 2', max: 15 },
  ],
  linkedin_ad: [
    { key: 'introText', label: 'Intro Text', max: 150, multiline: true },
    { key: 'headline', label: 'Headline', max: 70 },
    { key: 'description', label: 'Description', max: 100, multiline: true },
    { key: 'ctaButton', label: 'CTA Button', max: 20 },
  ],
  linkedin_post: [
    { key: 'postText', label: 'Post Text', max: 3000, multiline: true },
    { key: 'hashtags', label: 'Hashtags (comma-separated)', max: 100 },
  ],
  facebook: [
    { key: 'primaryText', label: 'Primary Text', max: 125, multiline: true },
    { key: 'headline', label: 'Headline', max: 40 },
    { key: 'description', label: 'Description', max: 30 },
    { key: 'ctaButton', label: 'CTA Button', max: 20 },
  ],
  serp: [
    { key: 'title', label: 'Meta Title', max: 60 },
    { key: 'description', label: 'Meta Description', max: 160, multiline: true },
    { key: 'breadcrumbs', label: 'Breadcrumbs (comma-separated)', max: 50 },
  ],
}

export function PlatformForm({ platform, content, onChange }: Props) {
  const fields = PLATFORM_FIELDS[platform]

  function handleChange(key: string, value: string) {
    // Handle special cases for arrays
    if (key === 'hashtags' || key === 'breadcrumbs') {
      const arrayValue = value.split(',').map((s) => s.trim()).filter(Boolean)
      onChange({ ...content, [key]: arrayValue })
    } else {
      onChange({ ...content, [key]: value })
    }
  }

  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const rawValue = content[field.key]
        let value = ''
        if (Array.isArray(rawValue)) {
          value = rawValue.join(', ')
        } else {
          value = String(rawValue || '')
        }
        const isOver = value.length > field.max

        return (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              <span className={`ml-2 text-xs ${isOver ? 'text-red-500' : 'text-gray-400'}`}>
                {value.length}/{field.max}
              </span>
            </label>
            {field.multiline ? (
              <textarea
                value={value}
                onChange={(e) => handleChange(field.key, e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-opal rounded-lg focus:outline-none focus:ring-2 focus:ring-ember"
              />
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full px-3 py-2 border border-opal rounded-lg focus:outline-none focus:ring-2 focus:ring-ember"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
