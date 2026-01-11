'use client'

import { useEffect, useState, useCallback } from 'react'
import { useDevMode } from './dev-mode-provider'

interface InspectedElement {
  name: string
  type: string
  source?: string
  file?: string
  tagName: string
  id?: string
  className?: string
  rect: DOMRect
  computedStyles: {
    padding: string
    margin: string
    width: string
    height: string
  }
  breadcrumb: string[]
}

function getElementBreadcrumb(element: Element): string[] {
  const parts: string[] = []
  let current: Element | null = element
  
  while (current && current !== document.body) {
    let name = current.tagName.toLowerCase()
    if (current.id) {
      name += `#${current.id}`
    } else if (current.getAttribute('data-dev-name')) {
      name = current.getAttribute('data-dev-name') || name
    }
    parts.unshift(name)
    current = current.parentElement
    
    // Limit depth
    if (parts.length > 5) break
  }
  
  return parts
}

function getComputedSpacing(element: Element) {
  const styles = window.getComputedStyle(element)
  return {
    padding: `${styles.paddingTop} ${styles.paddingRight} ${styles.paddingBottom} ${styles.paddingLeft}`,
    margin: `${styles.marginTop} ${styles.marginRight} ${styles.marginBottom} ${styles.marginLeft}`,
    width: styles.width,
    height: styles.height,
  }
}

export function DevInspector() {
  const { isActive, showLabels } = useDevMode()
  const [inspected, setInspected] = useState<InspectedElement | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
    
    // Find the nearest dev-outlined element or semantic element
    const target = e.target as Element
    
    // Look for data-dev-outline first
    const devElement = target.closest('[data-dev-outline]')
    // Then look for semantic elements with IDs
    const sectionElement = target.closest('section[id], main, header, footer, nav')
    
    const element = devElement || sectionElement
    
    if (element) {
      const rect = element.getBoundingClientRect()
      const computedStyles = getComputedSpacing(element)
      const breadcrumb = getElementBreadcrumb(element)
      
      setInspected({
        name: element.getAttribute('data-dev-name') || element.getAttribute('id') || element.tagName.toLowerCase(),
        type: element.getAttribute('data-dev-outline') || 'element',
        source: element.getAttribute('data-dev-source') || undefined,
        file: element.getAttribute('data-dev-file') || undefined,
        tagName: element.tagName.toLowerCase(),
        id: element.id || undefined,
        className: element.className || undefined,
        rect,
        computedStyles,
        breadcrumb,
      })
    } else {
      setInspected(null)
    }
  }, [])

  useEffect(() => {
    if (!isActive || !showLabels) {
      setInspected(null)
      return
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [isActive, showLabels, handleMouseMove])

  const handleCopyPath = useCallback(() => {
    if (inspected?.file) {
      navigator.clipboard.writeText(inspected.file)
    } else if (inspected?.name) {
      navigator.clipboard.writeText(inspected.name)
    }
  }, [inspected])

  const handleOpenInEditor = useCallback(() => {
    if (inspected?.file) {
      // Open in Cursor using the cursor:// protocol
      window.open(`cursor://file/${inspected.file}`, '_blank')
    }
  }, [inspected])

  if (!isActive || !showLabels || !inspected) return null

  // Calculate panel position
  const panelWidth = 280
  const panelHeight = 160
  const padding = 16
  
  let left = mousePos.x + padding
  let top = mousePos.y + padding
  
  // Keep panel in viewport
  if (left + panelWidth > window.innerWidth) {
    left = mousePos.x - panelWidth - padding
  }
  if (top + panelHeight > window.innerHeight) {
    top = mousePos.y - panelHeight - padding
  }

  const typeColors: Record<string, string> = {
    section: 'bg-blue-500',
    component: 'bg-blue-400',
    unstandardized: 'bg-orange-500',
    element: 'bg-gray-500',
  }

  return (
    <div
      className="fixed z-[10000] pointer-events-none"
      style={{ left, top }}
    >
      <div className="w-[280px] rounded-lg bg-black/95 border border-white/20 shadow-2xl backdrop-blur-sm overflow-hidden pointer-events-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase ${typeColors[inspected.type]} text-white`}>
              {inspected.type}
            </span>
            <span className="font-mono text-[11px] text-white font-medium truncate max-w-[180px]">
              {inspected.name}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 space-y-2">
          {/* Source */}
          {inspected.source && (
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono uppercase text-white/40">Source:</span>
              <span className="text-[10px] font-mono text-emerald-400">{inspected.source}</span>
            </div>
          )}

          {/* Dimensions */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono uppercase text-white/40">Size:</span>
            <span className="text-[10px] font-mono text-white/70">
              {Math.round(inspected.rect.width)} × {Math.round(inspected.rect.height)}
            </span>
          </div>

          {/* Spacing */}
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono uppercase text-white/40">Padding:</span>
            <span className="text-[10px] font-mono text-white/70">{inspected.computedStyles.padding}</span>
          </div>

          {/* Breadcrumb */}
          <div className="pt-2 border-t border-white/10">
            <div className="text-[9px] font-mono text-white/40 truncate">
              {inspected.breadcrumb.join(' → ')}
            </div>
          </div>

          {/* Actions */}
          {(inspected.file || inspected.name) && (
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              <button
                onClick={handleCopyPath}
                className="text-[9px] font-mono uppercase text-blue-400 hover:text-blue-300"
              >
                Copy
              </button>
              {inspected.file && (
                <button
                  onClick={handleOpenInEditor}
                  className="text-[9px] font-mono uppercase text-blue-400 hover:text-blue-300"
                >
                  Open in Cursor
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
