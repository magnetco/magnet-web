'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface PageGroup {
  label: string
  pages: { name: string; path: string }[]
}

const pageGroups: PageGroup[] = [
  {
    label: 'Main',
    pages: [
      { name: 'Home', path: '/' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Contact', path: '/contact' },
      { name: 'Team', path: '/team' },
    ],
  },
  {
    label: 'Services',
    pages: [
      { name: 'Branding', path: '/branding' },
      { name: 'Websites', path: '/websites' },
      { name: 'Paid Ads', path: '/ads' },
      { name: 'Search', path: '/search' },
    ],
  },
  {
    label: 'Method',
    pages: [
      { name: 'Foundation', path: '/method/foundation' },
      { name: 'Activation', path: '/method/activation' },
      { name: 'Acceleration', path: '/method/acceleration' },
      { name: 'Retention', path: '/method/retention' },
    ],
  },
  {
    label: 'Content',
    pages: [
      { name: 'Posts', path: '/posts' },
      { name: 'Careers', path: '/careers' },
      { name: 'Apply', path: '/apply' },
      { name: 'Privacy', path: '/privacy-policy' },
    ],
  },
]

export function DevPageNav() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      return () => window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const navigateTo = (path: string) => {
    router.push(path)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wide transition-all ${
          isOpen ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white/80'
        }`}
        title="Quick page navigation"
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        Pages
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-48 rounded-lg bg-black/95 border border-white/10 shadow-2xl backdrop-blur-sm overflow-hidden">
          <div className="max-h-[300px] overflow-auto">
            {pageGroups.map((group, i) => (
              <div key={group.label}>
                {i > 0 && <div className="border-t border-white/10" />}
                <div className="px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider text-white/40">
                  {group.label}
                </div>
                {group.pages.map((page) => (
                  <button
                    key={page.path}
                    onClick={() => navigateTo(page.path)}
                    className={`w-full text-left px-3 py-1.5 text-[11px] font-mono transition-colors ${
                      pathname === page.path
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {page.name}
                    <span className="ml-2 text-white/30">{page.path}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
