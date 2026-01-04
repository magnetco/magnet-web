'use client'

import { clsx } from 'clsx/lite'
import { useEffect, useRef, useState } from 'react'


type ConnectionStatus = 'unknown' | 'testing' | 'connected' | 'disconnected'

function StatusDot({ status }: { status: ConnectionStatus }) {
  return (
    <span
      className={clsx(
        'h-2 w-2 rounded-full transition-colors',
        status === 'unknown' && 'bg-juniper/40',
        status === 'testing' && 'animate-pulse bg-yellow-500',
        status === 'connected' && 'bg-emerald-500',
        status === 'disconnected' && 'bg-ember'
      )}
    />
  )
}

// Floating button component
function DevButton({
  onClick,
  isActive,
  children,
  label,
  variant = 'light',
}: {
  onClick: () => void
  isActive: boolean
  children: React.ReactNode
  label: string
  variant?: 'light' | 'dark'
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={clsx(
        'flex h-9 w-9 items-center justify-center rounded-full shadow-lg transition-all',
        'hover:scale-105 hover:shadow-xl',
        variant === 'light' && 'border border-juniper/20 bg-snow text-juniper',
        variant === 'dark' && 'bg-juniper text-frost',
        isActive && 'ring-2 ring-ember ring-offset-2'
      )}
    >
      {children}
    </button>
  )
}


// Sanity CMS Panel
function SanityPanel({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<ConnectionStatus>('unknown')
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  useEffect(() => {
    testConnection()
  }, [])

  async function testConnection() {
    setStatus('testing')
    try {
      const response = await fetch('/api/dev/sanity-test', { method: 'POST' })
      const data = await response.json()
      setStatus(data.connected ? 'connected' : 'disconnected')
    } catch {
      setStatus('disconnected')
    }
  }

  const statusLabel = {
    unknown: 'Unknown',
    testing: 'Testing...',
    connected: 'Connected',
    disconnected: 'Unavailable',
  }[status]

  return (
    <div
      ref={panelRef}
      className="absolute bottom-0 left-14 w-72 rounded-xl border border-juniper/10 bg-snow p-4 shadow-2xl"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-juniper/60">Sanity CMS</h2>
        <button
          onClick={onClose}
          className="rounded p-1 text-juniper/40 transition-colors hover:bg-juniper/5 hover:text-juniper"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {/* Connection Status */}
        <div className="flex items-center justify-between rounded-lg bg-juniper/5 px-3 py-2">
          <div className="flex items-center gap-2">
            <StatusDot status={status} />
            <span className="text-sm font-medium text-juniper">{statusLabel}</span>
          </div>
          <button
            onClick={testConnection}
            disabled={status === 'testing'}
            className={clsx(
              'rounded bg-juniper/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-juniper/70 transition-colors',
              status === 'testing' ? 'cursor-not-allowed opacity-50' : 'hover:bg-juniper/20 hover:text-juniper'
            )}
          >
            {status === 'testing' ? 'Testing...' : 'Test'}
          </button>
        </div>

        {/* Studio Link */}
        <a
          href="http://localhost:3333"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-lg border border-juniper/10 px-3 py-2 text-sm font-medium text-juniper transition-colors hover:bg-juniper/5"
        >
          <span>Open Sanity Studio</span>
          <svg className="h-4 w-4 text-juniper/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>

        {/* Quick Info */}
        <div className="text-[10px] text-juniper/40">
          Studio URL: <span className="font-mono">localhost:3333</span>
        </div>
      </div>
    </div>
  )
}

// Icons
function EditIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  )
}

type ActivePanel = 'sanity' | null

export function DevBar() {
  const [isDev, setIsDev] = useState(false)
  const [activePanel, setActivePanel] = useState<ActivePanel>(null)

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setIsDev(true)
    }
  }, [])

  if (!isDev) {
    return null
  }

  const togglePanel = (panel: ActivePanel) => {
    setActivePanel(activePanel === panel ? null : panel)
  }

  return (
    <div className="fixed bottom-[88px] left-[22px] z-[9999]">
      {/* Panels */}
      {activePanel === 'sanity' && <SanityPanel onClose={() => setActivePanel(null)} />}

      {/* Button Stack */}
      <div className="flex flex-col items-center gap-3">
        <DevButton
          onClick={() => togglePanel('sanity')}
          isActive={activePanel === 'sanity'}
          label="Sanity CMS"
          variant="dark"
        >
          <EditIcon />
        </DevButton>
      </div>
    </div>
  )
}
