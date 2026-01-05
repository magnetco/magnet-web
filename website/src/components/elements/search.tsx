'use client'

import { clsx } from 'clsx/lite'
import Fuse from 'fuse.js'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MagnifyingGlassIcon } from '../icons/magnifying-glass-icon'

// All site pages organized by category
const SITEMAP = {
  Main: [
    { path: '/', label: 'Home' },
    { path: '/branding', label: 'Branding' },
    { path: '/websites', label: 'Websites' },
    { path: '/ads', label: 'Ads' },
    { path: '/search', label: 'Search Marketing' },
  ],
  Company: [
    { path: '/team', label: 'Team' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/method', label: 'Method' },
    { path: '/posts', label: 'Posts' },
  ],
  Method: [
    { path: '/method/foundation', label: 'Foundation' },
    { path: '/method/activation', label: 'Activation' },
    { path: '/method/acceleration', label: 'Acceleration' },
    { path: '/method/retention', label: 'Retention' },
  ],
  'Foundation Services': [
    { path: '/method/foundation/brand-architecture', label: 'Brand Architecture' },
    { path: '/method/foundation/messaging-system', label: 'Messaging System' },
    { path: '/method/foundation/digital-experience', label: 'Digital Experience' },
    { path: '/method/foundation/conversion-architecture', label: 'Conversion Architecture' },
    { path: '/method/foundation/data-analytics-setup', label: 'Data & Analytics Setup' },
  ],
  'Activation Services': [
    { path: '/method/activation/paid-media', label: 'Paid Media' },
    { path: '/method/activation/search-marketing', label: 'Search Marketing' },
    { path: '/method/activation/social-content', label: 'Social Content' },
    { path: '/method/activation/creative-storytelling', label: 'Creative Storytelling' },
    { path: '/method/activation/partnerships', label: 'Partnerships' },
  ],
  'Acceleration Services': [
    { path: '/method/acceleration/landing-experiences', label: 'Landing Experiences' },
    { path: '/method/acceleration/offers-packaging', label: 'Offers & Packaging' },
    { path: '/method/acceleration/crm-flows-automation', label: 'CRM Flows & Automation' },
    { path: '/method/acceleration/sales-enablement', label: 'Sales Enablement' },
    { path: '/method/acceleration/attribution-measurement', label: 'Attribution & Measurement' },
  ],
  'Retention Services': [
    { path: '/method/retention/lifecycle-email', label: 'Lifecycle Email' },
    { path: '/method/retention/success-enablement', label: 'Success Enablement' },
    { path: '/method/retention/community-brand-systems', label: 'Community & Brand Systems' },
    { path: '/method/retention/feedback-loops-optimization', label: 'Feedback Loops' },
    { path: '/method/retention/predictive-intelligence', label: 'Predictive Intelligence' },
  ],
  Legal: [
    { path: '/privacy-policy', label: 'Privacy Policy' },
    { path: '/login', label: 'Login' },
  ],
}

type SearchItem = {
  path: string
  label: string
  category: string
  type: 'page' | 'post'
}

type Post = {
  _id: string
  title: string
  slug: { current: string }
  summary?: string
}

// Flatten sitemap for searching
const flatPages: SearchItem[] = Object.entries(SITEMAP).flatMap(([category, pages]) =>
  pages.map((page) => ({
    ...page,
    category,
    type: 'page' as const,
  }))
)

function SearchResult({
  item,
  isActive,
  onClick,
}: {
  item: SearchItem
  isActive: boolean
  onClick: () => void
}) {
  return (
    <Link
      href={item.path}
      onClick={onClick}
      className={clsx(
        'flex items-center justify-between rounded-lg px-4 py-3 transition-colors',
        isActive ? 'bg-ember text-white' : 'text-oxblood hover:bg-oxblood/5'
      )}
    >
      <div className="flex items-center gap-3">
        <span className={clsx('text-sm font-medium', isActive && 'text-white')}>
          {item.label}
        </span>
        {item.type === 'post' && (
          <span className={clsx(
            'rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider',
            isActive ? 'bg-white/20 text-white' : 'bg-oxblood/10 text-oxblood/60'
          )}>
            Post
          </span>
        )}
      </div>
      <span className={clsx(
        'text-xs',
        isActive ? 'text-white/70' : 'text-oxblood/40'
      )}>
        {item.category}
      </span>
    </Link>
  )
}

function SitemapSection({
  title,
  pages,
  currentPath,
  onNavigate,
}: {
  title: string
  pages: { path: string; label: string }[]
  currentPath: string
  onNavigate: () => void
}) {
  return (
    <div>
      <h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-oxblood/40">
        {title}
      </h3>
      <ul className="space-y-0.5">
        {pages.map(({ path, label }) => (
          <li key={path}>
            <Link
              href={path}
              onClick={onNavigate}
              className={clsx(
                'block rounded px-2 py-1.5 text-sm transition-colors',
                currentPath === path
                  ? 'bg-ember text-white'
                  : 'text-oxblood/70 hover:bg-oxblood/5 hover:text-oxblood'
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const [posts, setPosts] = useState<Post[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  // Fetch posts from Sanity on mount
  useEffect(() => {
    if (isOpen) {
      fetch('/api/search/posts')
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setPosts(data)
          }
        })
        .catch(() => {
          // Silently fail - posts just won't be searchable
        })
    }
  }, [isOpen])

  // Combine pages and posts for searching
  const allItems = useMemo(() => {
    const postItems: SearchItem[] = posts.map((post) => ({
      path: `/posts/${post.slug.current}`,
      label: post.title,
      category: 'Posts',
      type: 'post' as const,
    }))
    return [...flatPages, ...postItems]
  }, [posts])

  // Create Fuse instance for fuzzy search
  const fuse = useMemo(
    () =>
      new Fuse(allItems, {
        keys: ['label', 'category', 'path'],
        threshold: 0.4,
        includeScore: true,
      }),
    [allItems]
  )

  // Get search results
  const results = useMemo(() => {
    if (!query.trim()) return []
    return fuse.search(query).slice(0, 8).map((result) => result.item)
  }, [query, fuse])

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((prev) => (prev + 1) % results.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((prev) => (prev - 1 + results.length) % results.length)
      } else if (e.key === 'Enter' && results[activeIndex]) {
        e.preventDefault()
        router.push(results[activeIndex].path)
        onClose()
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    },
    [results, activeIndex, router, onClose]
  )

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0)
      setQuery('')
      setActiveIndex(0)
    }
  }, [isOpen])

  // Handle escape key globally
  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNavigate = () => {
    setQuery('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-oxblood/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto px-4 pt-[10vh] pb-20">
        <div
          className="w-full max-w-3xl rounded-2xl border border-oxblood/10 bg-snow shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center gap-4 border-b border-oxblood/10 px-6 py-4">
            <MagnifyingGlassIcon className="h-5 w-5 text-oxblood/40" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setActiveIndex(0)
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search pages and posts..."
              className="flex-1 bg-transparent text-lg text-oxblood placeholder:text-oxblood/40 focus:outline-none"
            />
            <kbd className="hidden rounded-md border border-oxblood/20 bg-oxblood/5 px-2 py-1 font-mono text-[10px] text-oxblood/50 sm:inline-block">
              ESC
            </kbd>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-oxblood/40 transition-colors hover:bg-oxblood/5 hover:text-oxblood"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search Results */}
          {query.trim() && results.length > 0 && (
            <div className="border-b border-oxblood/10 p-2">
              {results.map((item, index) => (
                <SearchResult
                  key={item.path}
                  item={item}
                  isActive={index === activeIndex}
                  onClick={handleNavigate}
                />
              ))}
            </div>
          )}

          {/* No Results */}
          {query.trim() && results.length === 0 && (
            <div className="border-b border-oxblood/10 px-6 py-8 text-center">
              <p className="text-sm text-oxblood/50">No results found for "{query}"</p>
            </div>
          )}

          {/* Sitemap */}
          <div className="max-h-[60vh] overflow-y-auto p-6">
            <h2 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-oxblood/60">
              Sitemap
            </h2>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
              {Object.entries(SITEMAP).map(([category, pages]) => (
                <SitemapSection
                  key={category}
                  title={category}
                  pages={pages}
                  currentPath={pathname}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>
            <div className="mt-6 border-t border-oxblood/10 pt-4 text-[10px] text-oxblood/40">
              {Object.values(SITEMAP).flat().length} pages • Current:{' '}
              <span className="font-medium text-oxblood/60">{pathname}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function Search() {
  const [isOpen, setIsOpen] = useState(false)

  // Handle global keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Search"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-oxblood transition-colors hover:bg-oxblood/10"
      >
        <MagnifyingGlassIcon className="h-4 w-4" />
      </button>
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

