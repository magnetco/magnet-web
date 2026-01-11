'use client'

import { useDevModeOptional } from './dev-mode-provider'

export function DevModeToggle() {
  const devMode = useDevModeOptional()

  if (!devMode) return null

  return (
    <button
      onClick={devMode.toggle}
      className="text-coral hover:text-frost transition-colors duration-200"
      title="Toggle dev mode (⌘⇧G)"
    >
      Dev Mode
    </button>
  )
}
