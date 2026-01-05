'use client'

import { clsx } from 'clsx/lite'
import { useChat } from '@ai-sdk/react'
import { useEffect, useRef, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

// ============================================================================
// Icons
// ============================================================================

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
      />
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" />
    </svg>
  )
}

// ============================================================================
// Types
// ============================================================================

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content?: string
  parts?: Array<{ type: string; text?: string }>
  createdAt?: Date
}

interface QuickReply {
  text: string
  icon: string
}

interface ParsedPart {
  type: 'text' | 'action'
  content?: string
  label?: string
  href?: string
}

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = 'magnet-chat-history'
const PROACTIVE_DELAY = 45000 // 45 seconds

const QUICK_REPLIES: QuickReply[] = [
  { text: 'What services do you offer?', icon: '🎯' },
  { text: 'How does your methodology work?', icon: '📋' },
  { text: 'What companies do you work with?', icon: '🏢' },
  { text: "I'd like to book a call", icon: '📞' },
]

const PAGE_CONTEXTS: Record<string, { welcome: string; proactive?: string }> = {
  '/pricing': {
    welcome: "Looking at pricing? I can help explain what's included and help you determine which tier might be right for your situation.",
    proactive: "I noticed you're exploring our pricing. Have any questions about which tier might be right for you?",
  },
  '/method': {
    welcome: "Exploring our methodology? I can walk you through how our four phases work together to drive growth.",
  },
  '/method/foundation': {
    welcome: "The Foundation phase is where everything starts. Want me to explain what's included or how it relates to your goals?",
  },
  '/method/activation': {
    welcome: "Activation is about turning on demand. I can explain our approach to paid, organic, and content channels.",
  },
  '/contact': {
    welcome: "Ready to talk? I can answer any quick questions while you fill out the form, or help you prepare for the call.",
  },
  default: {
    welcome: "Hi, I'm Magnet's AI assistant. I can answer questions about our methodology, services, and whether we might be a good fit for your growth challenges.",
  },
}

// ============================================================================
// Utilities
// ============================================================================

function getMessageText(message: ChatMessage): string {
  if (typeof message.content === 'string') {
    return message.content
  }
  if (message.parts) {
    return message.parts
      .filter((part) => part.type === 'text' && part.text)
      .map((part) => part.text)
      .join('')
  }
  return ''
}

function parseMessageWithActions(text: string): ParsedPart[] {
  const actionRegex = /\[ACTION:([^\]]+)\]\(([^)]+)\)/g
  const parts: ParsedPart[] = []
  let lastIndex = 0
  let match

  while ((match = actionRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', content: text.slice(lastIndex, match.index) })
    }
    parts.push({ type: 'action', label: match[1], href: match[2] })
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    let remaining = text.slice(lastIndex)
    // Clean up leading punctuation/whitespace that looks orphaned after an action button
    if (parts.length > 0 && parts[parts.length - 1].type === 'action') {
      remaining = remaining.replace(/^[\s]*[.,;:!?][\s]*/, ' ')
    }
    if (remaining.trim()) {
      parts.push({ type: 'text', content: remaining })
    }
  }

  return parts.length > 0 ? parts : [{ type: 'text', content: text }]
}

function formatTime(date?: Date | string): string {
  const d = date ? new Date(date) : new Date()
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function getWelcomeMessage(pathname: string): string {
  // Check for exact match first
  if (PAGE_CONTEXTS[pathname]) {
    return PAGE_CONTEXTS[pathname].welcome
  }
  // Check for partial match (e.g., /method/foundation matches /method)
  for (const [path, context] of Object.entries(PAGE_CONTEXTS)) {
    if (path !== 'default' && pathname.startsWith(path)) {
      return context.welcome
    }
  }
  return PAGE_CONTEXTS.default.welcome
}

function getProactiveMessage(pathname: string): string | null {
  for (const [path, context] of Object.entries(PAGE_CONTEXTS)) {
    if (pathname.startsWith(path) && context.proactive) {
      return context.proactive
    }
  }
  return null
}

// ============================================================================
// Markdown Components
// ============================================================================

const markdownComponents = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-2 last:mb-0">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mb-2 list-disc space-y-1 pl-4 last:mb-0">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="mb-2 list-decimal space-y-1 pl-4 last:mb-0">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => <li>{children}</li>,
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      className="text-ember underline decoration-ember/50 underline-offset-2 hover:decoration-ember"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="rounded bg-oxblood/10 px-1 py-0.5 font-mono text-xs">{children}</code>
  ),
}

// ============================================================================
// Sub-components
// ============================================================================

function MessageBubble({
  message,
  isLatest,
}: {
  message: ChatMessage
  isLatest: boolean
}) {
  const isUser = message.role === 'user'
  const text = getMessageText(message)
  const parts = parseMessageWithActions(text)

  return (
    <div
      className={clsx(
        'flex flex-col gap-1',
        isLatest && 'animate-in fade-in-0 slide-in-from-bottom-2 duration-300',
        isUser ? 'items-end' : 'items-start'
      )}
    >
      <div
        className={clsx(
          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
          isUser ? 'bg-oxblood text-white' : 'bg-snow text-oxblood'
        )}
      >
        {isUser ? (
          text
        ) : (
          <div className="space-y-2">
            {parts.map((part, i) =>
              part.type === 'action' ? (
                <Link
                  key={i}
                  href={part.href || '#'}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-ember/10 px-3 py-1.5 text-xs font-medium text-ember transition-colors hover:bg-ember/20"
                >
                  {part.label}
                  <ArrowRightIcon className="size-3" />
                </Link>
              ) : (
                <ReactMarkdown key={i} components={markdownComponents}>
                  {part.content || ''}
                </ReactMarkdown>
              )
            )}
          </div>
        )}
      </div>
      <span
        className={clsx(
          'px-2 text-[10px] text-basalt/60',
          isUser ? 'text-right' : 'text-left'
        )}
      >
        {formatTime(message.createdAt)}
      </span>
    </div>
  )
}

function QuickReplyButtons({
  replies,
  onSelect,
  disabled,
}: {
  replies: QuickReply[]
  onSelect: (text: string) => void
  disabled: boolean
}) {
  return (
    <div className="flex flex-wrap gap-2 px-1 pt-2">
      {replies.map((reply) => (
        <button
          key={reply.text}
          onClick={() => onSelect(reply.text)}
          disabled={disabled}
          className="rounded-full border border-opal bg-white px-3 py-1.5 text-xs text-oxblood transition-all hover:border-oxblood hover:bg-snow disabled:opacity-50"
        >
          <span className="mr-1">{reply.icon}</span>
          {reply.text}
        </button>
      ))}
    </div>
  )
}

function EmailCapture({
  onDismiss,
}: {
  onDismiss: () => void
}) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    // Redirect to contact page with email prefilled
    window.location.href = `/contact?email=${encodeURIComponent(email.trim())}`
  }

  return (
    <div className="animate-in fade-in-0 slide-in-from-bottom-2 mx-4 mb-4 rounded-xl border border-ember/20 bg-gradient-to-br from-ember/5 to-coral/10 p-4">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <SparklesIcon className="size-4 text-ember" />
          <p className="text-sm font-medium text-oxblood">Want us to follow up?</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-basalt/60 transition-colors hover:text-oxblood"
          aria-label="Dismiss"
        >
          <CloseIcon className="size-4" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          required
          className="flex-1 rounded-lg border border-opal bg-white px-3 py-2 text-sm text-oxblood placeholder:text-basalt focus:border-oxblood focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-ember px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-oxblood"
        >
          Send
        </button>
      </form>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="animate-in fade-in-0 flex justify-start">
      <div className="flex max-w-[85%] items-center gap-1.5 rounded-2xl bg-snow px-4 py-3 text-oxblood">
        <span className="size-1.5 animate-bounce rounded-full bg-basalt [animation-delay:-0.3s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-basalt [animation-delay:-0.15s]" />
        <span className="size-1.5 animate-bounce rounded-full bg-basalt" />
      </div>
    </div>
  )
}

// ============================================================================
// Main Component
// ============================================================================

export function ChatWidget() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [hasUnread, setHasUnread] = useState(false)
  const [showEmailCapture, setShowEmailCapture] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [hasTriggeredProactive, setHasTriggeredProactive] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, sendMessage, status, setMessages } = useChat()

  const isLoading = status === 'submitted'

  // Load conversation from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed)
          setMessageCount(parsed.length)
          return
        }
      } catch (e) {
        console.error('Failed to parse chat history:', e)
      }
    }
    // Set initial welcome message if no saved history
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        parts: [{ type: 'text', text: getWelcomeMessage(pathname) }],
      },
    ])
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Save conversation to localStorage on change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    }
  }, [messages])

  // Track message count for email capture trigger
  useEffect(() => {
    const userMessages = messages.filter((m) => m.role === 'user').length
    if (userMessages >= 3 && !showEmailCapture) {
      setShowEmailCapture(true)
    }
    setMessageCount(messages.length)
  }, [messages, showEmailCapture])

  // Proactive message trigger
  useEffect(() => {
    if (hasTriggeredProactive || isOpen) return

    const proactiveMessage = getProactiveMessage(pathname)
    if (!proactiveMessage) return

    const timer = setTimeout(() => {
      if (!isOpen && !hasTriggeredProactive) {
        setHasTriggeredProactive(true)
        setHasUnread(true)
        setMessages((prev) => [
          ...prev,
          {
            id: 'proactive-' + Date.now(),
            role: 'assistant',
            parts: [{ type: 'text', text: proactiveMessage }],
          },
        ])
      }
    }, PROACTIVE_DELAY)

    return () => clearTimeout(timer)
  }, [pathname, isOpen, hasTriggeredProactive, setMessages])

  // Unread indicator when new message arrives while closed
  useEffect(() => {
    if (!isOpen && messages.length > messageCount && messages[messages.length - 1]?.role === 'assistant') {
      setHasUnread(true)
    }
  }, [messages, isOpen, messageCount])

  // Clear unread on open
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false)
    }
  }, [isOpen])

  // Auto-scroll to bottom on new messages (only when chat is open)
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading, isOpen])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault()
      const inputValue = input || inputRef.current?.value || ''
      if (!inputValue.trim() || isLoading) return

      const userMessage = inputValue.trim()
      setInput('')
      if (inputRef.current) inputRef.current.value = ''

      try {
        await sendMessage({ text: userMessage })
      } catch (error) {
        console.error('Chat error:', error)
      }
    },
    [input, isLoading, sendMessage]
  )

  const handleQuickReply = useCallback(
    (text: string) => {
      setInput(text)
      if (inputRef.current) inputRef.current.value = text
      setTimeout(() => handleSubmit(), 50)
    },
    [handleSubmit]
  )

  const handleClearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        role: 'assistant',
        parts: [{ type: 'text', text: getWelcomeMessage(pathname) }],
      },
    ])
    setShowEmailCapture(false)
  }, [pathname, setMessages])


  const showQuickReplies = messages.length === 1 && messages[0]?.role === 'assistant' && !isLoading

  return (
    <>
      {/* Floating trigger button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(true)
        }}
        className={clsx(
          'fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full border-2 border-white bg-oxblood text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-ember',
          isOpen && 'pointer-events-none opacity-0'
        )}
        aria-label="Open chat"
      >
        <ChatIcon className="size-6" />
        {/* Unread indicator */}
        {hasUnread && (
          <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-ember opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-ember" />
          </span>
        )}
      </button>

      {/* Chat panel */}
      <div
        className={clsx(
          'fixed bottom-6 right-6 z-50 flex h-[32rem] w-96 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300',
          isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        )}
      >
        {/* Header */}
        <header className="flex items-center justify-between border-b border-opal bg-gradient-to-r from-snow to-white px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-oxblood text-white shadow-sm">
              <ChatIcon className="size-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-oxblood">Magnet Assistant</p>
              <p className="text-xs text-basalt">Ask about our methodology</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={handleClearHistory}
              className="rounded-full px-2 py-1 text-[10px] text-basalt transition-colors hover:bg-opal hover:text-oxblood"
              title="Clear chat history"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsOpen(false)
              }}
              className="flex size-8 items-center justify-center rounded-full text-basalt transition-colors hover:bg-opal hover:text-oxblood"
              aria-label="Close chat"
            >
              <CloseIcon className="size-5" />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message as ChatMessage}
                isLatest={index === messages.length - 1}
              />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          {showQuickReplies && (
            <QuickReplyButtons replies={QUICK_REPLIES} onSelect={handleQuickReply} disabled={isLoading} />
          )}
        </div>

        {/* Email capture */}
        {showEmailCapture && (
          <EmailCapture onDismiss={() => setShowEmailCapture(false)} />
        )}

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-opal bg-white p-4">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              defaultValue=""
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
              placeholder="Ask about our approach..."
              className="flex-1 rounded-full border border-opal bg-snow px-4 py-2.5 text-sm text-oxblood placeholder:text-basalt focus:border-oxblood focus:outline-none"
            />
            <button
              type="button"
              onClick={() => handleSubmit()}
              disabled={isLoading}
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-oxblood text-white transition-colors hover:bg-ember disabled:opacity-50 disabled:hover:bg-oxblood"
              aria-label="Send message"
            >
              <SendIcon className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
