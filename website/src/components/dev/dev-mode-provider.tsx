'use client'

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

interface ErrorInfo {
  message: string
  source?: string
  timestamp: number
}

interface DevModeState {
  isActive: boolean
  showSections: boolean
  showComponents: boolean
  showUnstandardized: boolean
  showLabels: boolean
  showImages: boolean
  showA11y: boolean
  animationState: 'normal' | 'paused' | 'slow'
  errors: ErrorInfo[]
  errorCount: number
}

interface DevModeContextValue extends DevModeState {
  activate: () => void
  deactivate: () => void
  toggle: () => void
  toggleSections: () => void
  toggleComponents: () => void
  toggleUnstandardized: () => void
  toggleLabels: () => void
  toggleImages: () => void
  toggleA11y: () => void
  setAnimationState: (state: 'normal' | 'paused' | 'slow') => void
  cycleAnimationState: () => void
  clearErrors: () => void
}

const DevModeContext = createContext<DevModeContextValue | null>(null)

export function useDevMode() {
  const context = useContext(DevModeContext)
  if (!context) {
    throw new Error('useDevMode must be used within a DevModeProvider')
  }
  return context
}

// Safe hook that returns null when outside provider (for footer toggle)
export function useDevModeOptional() {
  return useContext(DevModeContext)
}

export function DevModeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DevModeState>({
    isActive: false,
    showSections: true,
    showComponents: true,
    showUnstandardized: true,
    showLabels: true,
    showImages: false,
    showA11y: false,
    animationState: 'normal',
    errors: [],
    errorCount: 0,
  })

  // Sync state to HTML data attributes for CSS targeting
  useEffect(() => {
    const html = document.documentElement
    html.dataset.devMode = String(state.isActive)
    html.dataset.devSections = String(state.showSections)
    html.dataset.devComponents = String(state.showComponents)
    html.dataset.devUnstandardized = String(state.showUnstandardized)
    html.dataset.devLabels = String(state.showLabels)
    html.dataset.devImages = String(state.showImages)
    html.dataset.devA11y = String(state.showA11y)
    html.dataset.devAnimation = state.animationState

    return () => {
      delete html.dataset.devMode
      delete html.dataset.devSections
      delete html.dataset.devComponents
      delete html.dataset.devUnstandardized
      delete html.dataset.devLabels
      delete html.dataset.devImages
      delete html.dataset.devA11y
      delete html.dataset.devAnimation
    }
  }, [state])

  // Error tracking
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setState((prev) => ({
        ...prev,
        errors: [
          { message: event.message, source: event.filename, timestamp: Date.now() },
          ...prev.errors.slice(0, 19), // Keep last 20 errors
        ],
        errorCount: prev.errorCount + 1,
      }))
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const message = event.reason?.message || String(event.reason)
      setState((prev) => ({
        ...prev,
        errors: [
          { message: `Unhandled Promise: ${message}`, timestamp: Date.now() },
          ...prev.errors.slice(0, 19),
        ],
        errorCount: prev.errorCount + 1,
      }))
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Shift + G to toggle dev mode
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'g') {
        e.preventDefault()
        setState((prev) => ({ ...prev, isActive: !prev.isActive }))
        return
      }

      // Only handle other shortcuts when dev mode is active
      if (!state.isActive) return

      // Escape to close
      if (e.key === 'Escape') {
        e.preventDefault()
        setState((prev) => ({ ...prev, isActive: false }))
        return
      }

      // Number keys for toggles (only when not in an input)
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return
      }

      switch (e.key) {
        case '1':
          e.preventDefault()
          setState((prev) => ({ ...prev, showSections: !prev.showSections }))
          break
        case '2':
          e.preventDefault()
          setState((prev) => ({ ...prev, showComponents: !prev.showComponents }))
          break
        case '3':
          e.preventDefault()
          setState((prev) => ({ ...prev, showUnstandardized: !prev.showUnstandardized }))
          break
        case '4':
          e.preventDefault()
          setState((prev) => ({ ...prev, showLabels: !prev.showLabels }))
          break
        case '5':
          e.preventDefault()
          setState((prev) => ({ ...prev, showImages: !prev.showImages }))
          break
        case '6':
          e.preventDefault()
          setState((prev) => ({ ...prev, showA11y: !prev.showA11y }))
          break
        case 'p':
        case 'P':
          e.preventDefault()
          setState((prev) => {
            const states: Array<'normal' | 'paused' | 'slow'> = ['normal', 'paused', 'slow']
            const currentIndex = states.indexOf(prev.animationState)
            const nextState = states[(currentIndex + 1) % states.length]
            return { ...prev, animationState: nextState }
          })
          break
        case 'e':
        case 'E':
          // Toggle error panel (handled by top bar component)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [state.isActive])

  const activate = useCallback(() => {
    setState((prev) => ({ ...prev, isActive: true }))
  }, [])

  const deactivate = useCallback(() => {
    setState((prev) => ({ ...prev, isActive: false }))
  }, [])

  const toggle = useCallback(() => {
    setState((prev) => ({ ...prev, isActive: !prev.isActive }))
  }, [])

  const toggleSections = useCallback(() => {
    setState((prev) => ({ ...prev, showSections: !prev.showSections }))
  }, [])

  const toggleComponents = useCallback(() => {
    setState((prev) => ({ ...prev, showComponents: !prev.showComponents }))
  }, [])

  const toggleUnstandardized = useCallback(() => {
    setState((prev) => ({ ...prev, showUnstandardized: !prev.showUnstandardized }))
  }, [])

  const toggleLabels = useCallback(() => {
    setState((prev) => ({ ...prev, showLabels: !prev.showLabels }))
  }, [])

  const toggleImages = useCallback(() => {
    setState((prev) => ({ ...prev, showImages: !prev.showImages }))
  }, [])

  const toggleA11y = useCallback(() => {
    setState((prev) => ({ ...prev, showA11y: !prev.showA11y }))
  }, [])

  const setAnimationState = useCallback((animationState: 'normal' | 'paused' | 'slow') => {
    setState((prev) => ({ ...prev, animationState }))
  }, [])

  const cycleAnimationState = useCallback(() => {
    setState((prev) => {
      const states: Array<'normal' | 'paused' | 'slow'> = ['normal', 'paused', 'slow']
      const currentIndex = states.indexOf(prev.animationState)
      const nextState = states[(currentIndex + 1) % states.length]
      return { ...prev, animationState: nextState }
    })
  }, [])

  const clearErrors = useCallback(() => {
    setState((prev) => ({ ...prev, errors: [], errorCount: 0 }))
  }, [])

  const value: DevModeContextValue = {
    ...state,
    activate,
    deactivate,
    toggle,
    toggleSections,
    toggleComponents,
    toggleUnstandardized,
    toggleLabels,
    toggleImages,
    toggleA11y,
    setAnimationState,
    cycleAnimationState,
    clearErrors,
  }

  return <DevModeContext.Provider value={value}>{children}</DevModeContext.Provider>
}
