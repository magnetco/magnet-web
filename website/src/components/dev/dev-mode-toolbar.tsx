'use client'

import { useDevMode } from './dev-mode-provider'
import { DevQuickLinks } from './dev-quick-links'
import { DevAnimationControls } from './dev-animation-controls'
import { DevPageNav } from './dev-page-nav'

function ToggleButton({
  label,
  shortcut,
  active,
  onClick,
  color = 'blue',
}: {
  label: string
  shortcut?: string
  active: boolean
  onClick: () => void
  color?: 'blue' | 'orange'
}) {
  const activeColors = {
    blue: 'bg-blue-500 text-white',
    orange: 'bg-orange-500 text-white',
  }

  return (
    <button
      onClick={onClick}
      className={`
        px-2 py-1 text-[10px] font-mono uppercase tracking-wide rounded transition-all
        ${
          active
            ? activeColors[color]
            : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white/80'
        }
      `}
      title={shortcut ? `${label} (${shortcut})` : label}
    >
      {label}
    </button>
  )
}

export function DevModeToolbar() {
  const {
    isActive,
    showSections,
    showComponents,
    showUnstandardized,
    showLabels,
    showImages,
    showA11y,
    deactivate,
    toggleSections,
    toggleComponents,
    toggleUnstandardized,
    toggleLabels,
    toggleImages,
    toggleA11y,
  } = useDevMode()

  if (!isActive) return null

  return (
    <div
      className="fixed bottom-4 right-4 z-[9999] flex items-center gap-2 rounded-lg bg-black/90 px-3 py-2 shadow-2xl backdrop-blur-sm border border-white/10"
      role="toolbar"
      aria-label="Dev mode controls"
    >
      {/* Grid icon and label */}
      <div className="flex items-center gap-2 pr-2 border-r border-white/20">
        <svg
          className="w-4 h-4 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
        <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider">Dev</span>
      </div>

      {/* Outline toggles */}
      <div className="flex items-center gap-1 pr-2 border-r border-white/20">
        <ToggleButton label="Sections" active={showSections} onClick={toggleSections} shortcut="1" />
        <ToggleButton label="Components" active={showComponents} onClick={toggleComponents} shortcut="2" />
        <ToggleButton label="Needs Work" active={showUnstandardized} onClick={toggleUnstandardized} shortcut="3" color="orange" />
        <ToggleButton label="Labels" active={showLabels} onClick={toggleLabels} shortcut="4" />
      </div>

      {/* Quality toggles */}
      <div className="flex items-center gap-1 pr-2 border-r border-white/20">
        <ToggleButton label="Images" active={showImages} onClick={toggleImages} shortcut="5" />
        <ToggleButton label="A11y" active={showA11y} onClick={toggleA11y} shortcut="6" />
      </div>

      {/* Animation controls */}
      <div className="pr-2 border-r border-white/20">
        <DevAnimationControls />
      </div>

      {/* Quick links */}
      <div className="pr-2 border-r border-white/20">
        <DevQuickLinks />
      </div>

      {/* Page nav */}
      <div className="pr-2 border-r border-white/20">
        <DevPageNav />
      </div>

      {/* Close button */}
      <button
        onClick={deactivate}
        className="p-1 rounded text-white/40 hover:text-white hover:bg-white/10 transition-colors"
        title="Close dev mode (Esc or ⌘⇧G)"
        aria-label="Close dev mode"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}
