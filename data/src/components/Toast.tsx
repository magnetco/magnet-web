import { useEffect, useState } from 'react'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: string
  type: ToastType
  title: string
  details?: string[]
  duration?: number
}

interface ToastProps {
  message: ToastMessage
  onDismiss: (id: string) => void
}

function Toast({ message, onDismiss }: ToastProps) {
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true)
      setTimeout(() => onDismiss(message.id), 300)
    }, message.duration || 5000)

    return () => clearTimeout(timer)
  }, [message.id, message.duration, onDismiss])

  const handleDismiss = () => {
    setIsLeaving(true)
    setTimeout(() => onDismiss(message.id), 300)
  }

  const bgColor = {
    success: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    error: 'bg-gradient-to-r from-rose-500 to-red-500',
    info: 'bg-gradient-to-r from-sky-500 to-blue-500',
  }[message.type]

  const icon = {
    success: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  }[message.type]

  return (
    <div
      className={`
        ${bgColor}
        ${isLeaving ? 'animate-slide-out' : 'animate-slide-in'}
        flex items-start gap-3 rounded-xl px-4 py-3 text-white shadow-lg shadow-black/10
        backdrop-blur-sm min-w-[320px] max-w-[420px]
      `}
    >
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{message.title}</p>
        {message.details && message.details.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {message.details.map((detail, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-white/20 backdrop-blur-sm"
              >
                {detail}
              </span>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 rounded-lg p-1 hover:bg-white/20 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

interface ToastContainerProps {
  messages: ToastMessage[]
  onDismiss: (id: string) => void
}

export function ToastContainer({ messages, onDismiss }: ToastContainerProps) {
  if (messages.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {messages.map((msg) => (
        <Toast key={msg.id} message={msg} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

// Hook for managing toasts
export function useToast() {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const showToast = (type: ToastType, title: string, details?: string[], duration?: number) => {
    const id = Math.random().toString(36).substring(7)
    setMessages((prev) => [...prev, { id, type, title, details, duration }])
  }

  const dismissToast = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const success = (title: string, details?: string[]) => showToast('success', title, details)
  const error = (title: string, details?: string[]) => showToast('error', title, details, 8000)
  const info = (title: string, details?: string[]) => showToast('info', title, details)

  return {
    messages,
    dismissToast,
    success,
    error,
    info,
  }
}






