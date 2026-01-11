'use client'

import { useEffect, useState } from 'react'

interface DevLink {
  name: string
  url: string
  port: number
}

const devLinks: DevLink[] = [
  { name: 'Studio', url: 'http://localhost:3333', port: 3333 },
  { name: 'Data', url: 'http://localhost:4000', port: 4000 },
]

function DevLinkButton({ link }: { link: DevLink }) {
  const [isOnline, setIsOnline] = useState<boolean | null>(null)

  useEffect(() => {
    let mounted = true

    const checkStatus = async () => {
      try {
        // Use a simple fetch with a short timeout
        const controller = new AbortController()
        const timeout = setTimeout(() => controller.abort(), 2000)
        
        await fetch(link.url, { 
          mode: 'no-cors',
          signal: controller.signal 
        })
        clearTimeout(timeout)
        
        if (mounted) setIsOnline(true)
      } catch {
        if (mounted) setIsOnline(false)
      }
    }

    checkStatus()
    const interval = setInterval(checkStatus, 10000) // Check every 10s

    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [link.url])

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wide bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all"
      title={`Open ${link.name} (${link.url})`}
    >
      {/* Status indicator */}
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isOnline === null
            ? 'bg-white/30'
            : isOnline
            ? 'bg-emerald-400'
            : 'bg-white/30'
        }`}
      />
      {link.name}
    </a>
  )
}

export function DevQuickLinks() {
  return (
    <div className="flex items-center gap-1">
      {devLinks.map((link) => (
        <DevLinkButton key={link.name} link={link} />
      ))}
    </div>
  )
}
