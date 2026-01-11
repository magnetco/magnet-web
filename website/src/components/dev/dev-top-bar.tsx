'use client'

import { useEffect, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useDevMode } from './dev-mode-provider'

// Tailwind breakpoints
const breakpoints = [
  { name: 'xs', min: 0, max: 639 },
  { name: 'sm', min: 640, max: 767 },
  { name: 'md', min: 768, max: 1023 },
  { name: 'lg', min: 1024, max: 1279 },
  { name: 'xl', min: 1280, max: 1535 },
  { name: '2xl', min: 1536, max: Infinity },
]

function getBreakpoint(width: number) {
  return breakpoints.find((bp) => width >= bp.min && width <= bp.max)?.name || 'xs'
}

function getEnvInfo() {
  if (typeof window === 'undefined') return { env: 'SSR', color: 'gray' }
  
  const hostname = window.location.hostname
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return { env: 'DEV', color: 'emerald' }
  }
  if (hostname.includes('staging') || hostname.includes('preview') || hostname.includes('vercel.app')) {
    return { env: 'STAGE', color: 'amber' }
  }
  return { env: 'PROD', color: 'rose' }
}

interface ErrorInfo {
  message: string
  source?: string
  timestamp: number
}

export function DevTopBar() {
  const { isActive, errorCount, errors } = useDevMode()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [viewport, setViewport] = useState({ width: 0, height: 0, breakpoint: 'lg' })
  const [envInfo, setEnvInfo] = useState({ env: 'DEV', color: 'emerald' })
  const [showErrors, setShowErrors] = useState(false)

  // Update viewport on resize
  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setViewport({
        width,
        height,
        breakpoint: getBreakpoint(width),
      })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  // Get environment info
  useEffect(() => {
    setEnvInfo(getEnvInfo())
  }, [])

  if (!isActive) return null

  const envColors: Record<string, string> = {
    emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    rose: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  }

  const breakpointColors: Record<string, string> = {
    xs: 'text-rose-400',
    sm: 'text-orange-400',
    md: 'text-amber-400',
    lg: 'text-emerald-400',
    xl: 'text-blue-400',
    '2xl': 'text-violet-400',
  }

  // Build search params string
  const searchStr = searchParams.toString()
  const fullPath = searchStr ? `${pathname}?${searchStr}` : pathname

  return (
    <>
      <div
        className="fixed top-4 left-4 z-[9999] flex items-center gap-2 rounded-lg bg-black/90 px-3 py-1.5 shadow-2xl backdrop-blur-sm border border-white/10 font-mono text-[11px]"
        role="status"
        aria-label="Dev mode info"
      >
        {/* Environment */}
        <span className={`px-1.5 py-0.5 rounded border ${envColors[envInfo.color]}`}>
          {envInfo.env}
        </span>

        <span className="text-white/20">|</span>

        {/* Viewport */}
        <span className="flex items-center gap-1.5">
          <span className={`font-bold ${breakpointColors[viewport.breakpoint]}`}>
            {viewport.breakpoint}
          </span>
          <span className="text-white/40">
            {viewport.width}×{viewport.height}
          </span>
        </span>

        <span className="text-white/20">|</span>

        {/* Route */}
        <span className="text-white/60 max-w-[200px] truncate" title={fullPath}>
          {fullPath}
        </span>

        {/* Error count */}
        {errorCount > 0 && (
          <>
            <span className="text-white/20">|</span>
            <button
              onClick={() => setShowErrors(!showErrors)}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition-colors"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errorCount}
            </button>
          </>
        )}
      </div>

      {/* Error panel */}
      {showErrors && errors.length > 0 && (
        <div className="fixed top-14 left-4 z-[9999] w-[400px] max-h-[300px] overflow-auto rounded-lg bg-black/95 border border-rose-500/30 shadow-2xl backdrop-blur-sm">
          <div className="sticky top-0 flex items-center justify-between px-3 py-2 border-b border-white/10 bg-black/90">
            <span className="font-mono text-[11px] text-rose-400 font-bold">
              {errorCount} Error{errorCount !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => setShowErrors(false)}
              className="text-white/40 hover:text-white"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-2 space-y-2">
            {errors.map((error, i) => (
              <div key={i} className="p-2 rounded bg-white/5 border border-white/10">
                <p className="font-mono text-[10px] text-rose-300 break-all">{error.message}</p>
                {error.source && (
                  <p className="font-mono text-[9px] text-white/40 mt-1 truncate">{error.source}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
