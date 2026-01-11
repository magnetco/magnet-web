'use client'

import { useDevMode } from './dev-mode-provider'

export function DevAnimationControls() {
  const { animationState, cycleAnimationState } = useDevMode()

  const icons = {
    normal: (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
      </svg>
    ),
    paused: (
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    slow: (
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }

  const labels = {
    normal: '1×',
    paused: '⏸',
    slow: '.25×',
  }

  const colors = {
    normal: 'bg-white/10 text-white/60',
    paused: 'bg-amber-500/20 text-amber-400',
    slow: 'bg-blue-500/20 text-blue-400',
  }

  return (
    <button
      onClick={cycleAnimationState}
      className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono transition-all hover:opacity-80 ${colors[animationState]}`}
      title={`Animation: ${animationState} (P to cycle)`}
    >
      {icons[animationState]}
      <span className="uppercase tracking-wide">{labels[animationState]}</span>
    </button>
  )
}
