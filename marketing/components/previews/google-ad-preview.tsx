import { CharCount } from '@/components/ui/char-count'

interface GoogleAdContent {
  headline1: string
  headline2: string
  headline3: string
  description1: string
  description2: string
  displayUrl?: string
  path1: string
  path2: string
}

interface Props {
  content: GoogleAdContent
  showCharCounts?: boolean
}

export function GoogleAdPreview({ content, showCharCounts = true }: Props) {
  const displayUrl = content.displayUrl || 'magnet.co'

  return (
    <div className="max-w-[600px] p-4 bg-white rounded-lg border border-opal">
      <div className="space-y-1">
        {/* Sponsored label */}
        <div className="text-xs text-basalt font-medium">Sponsored</div>

        {/* Headlines */}
        <div className="text-xl text-[#1a0dab] hover:underline cursor-pointer leading-tight">
          {content.headline1} | {content.headline2} | {content.headline3}
        </div>

        {showCharCounts && (
          <div className="flex gap-4">
            <CharCount current={content.headline1.length} max={30} />
            <CharCount current={content.headline2.length} max={30} />
            <CharCount current={content.headline3.length} max={30} />
          </div>
        )}

        {/* Display URL */}
        <div className="text-sm text-[#006621]">
          {displayUrl}/{content.path1}/{content.path2}
        </div>

        {/* Descriptions */}
        <div className="text-sm text-gray-700 leading-relaxed">
          {content.description1} {content.description2}
        </div>

        {showCharCounts && (
          <div className="flex gap-4">
            <CharCount current={content.description1.length} max={90} />
            <CharCount current={content.description2.length} max={90} />
          </div>
        )}
      </div>
    </div>
  )
}
