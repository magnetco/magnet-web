'use client'

import { clsx } from 'clsx/lite'
import { useChat } from '@ai-sdk/react'
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  type ComponentProps,
  type ReactNode,
} from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { Container } from '../elements/container'
import { Eyebrow } from '../elements/eyebrow'
import { GridBgSection, sectionPaddingClasses } from '../elements/grid-bg'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'

// ============================================================================
// Icons
// ============================================================================

function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  )
}

function QuestionMarkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

// ============================================================================
// Types
// ============================================================================

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  parts?: { type: string; text?: string }[]
  createdAt?: Date
}

interface ParsedPart {
  type: 'text' | 'action'
  content?: string
  label?: string
  href?: string
}

interface FaqQuestion {
  question: string
}

interface InlineChatHandle {
  sendQuestion: (question: string) => void
}

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = 'magnet-chat-history'

const PAGE_CONTEXTS: Record<string, { welcome: string }> = {
  '/pricing': {
    welcome:
      "Looking at pricing? I can help explain what's included and help you determine which tier might be right for your situation.",
  },
  '/contact': {
    welcome:
      'Ready to talk? I can answer any quick questions while you fill out the form, or help you prepare for the call.',
  },
  default: {
    welcome:
      "Hi, I'm Magnet's AI assistant. I can answer questions about our methodology, services, and whether we might be a good fit for your growth challenges.",
  },
}

// ============================================================================
// Utilities
// ============================================================================

function getWelcomeMessage(pathname: string): string {
  return PAGE_CONTEXTS[pathname]?.welcome || PAGE_CONTEXTS.default.welcome
}

function formatTime(date: Date | undefined): string {
  if (!date) return ''
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

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
    parts.push({ type: 'text', content: text.slice(lastIndex) })
  }

  return parts.length > 0 ? parts : [{ type: 'text', content: text }]
}

// ============================================================================
// Markdown Components
// ============================================================================

const markdownComponents = {
  p: ({ children }: { children?: React.ReactNode }) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mb-2 ml-4 list-disc last:mb-0">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="mb-2 ml-4 list-decimal last:mb-0">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => <li className="mb-1">{children}</li>,
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold">{children}</strong>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="rounded bg-oxblood/5 px-1 py-0.5 text-xs">{children}</code>
  ),
}

// ============================================================================
// Chat Sub-components
// ============================================================================

function MessageBubble({ message, isLatest }: { message: ChatMessage; isLatest: boolean }) {
  const isUser = message.role === 'user'
  const text = getMessageText(message)
  const parts = parseMessageWithActions(text)

  return (
    <div
      className={clsx(
        'flex flex-col gap-1.5',
        isLatest && 'animate-in fade-in-0 slide-in-from-bottom-2 duration-300',
        isUser ? 'items-end' : 'items-start'
      )}
    >
      <div
        className={clsx(
          'max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isUser
            ? 'bg-gradient-to-br from-oxblood to-oxblood/90 text-white shadow-md shadow-oxblood/10'
            : 'bg-white text-oxblood shadow-sm ring-1 ring-olive-950/5 dark:bg-juniper/50 dark:text-coral dark:ring-white/5'
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
                  className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-ember/10 px-3 py-1.5 text-xs font-medium text-ember transition-all hover:bg-ember/20 hover:shadow-sm"
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
      <span className={clsx('px-2 text-[10px] text-basalt/40 dark:text-opal/40', isUser ? 'text-right' : 'text-left')}>
        {formatTime(message.createdAt)}
      </span>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-start">
      <div className="flex gap-1.5 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-olive-950/5 dark:bg-juniper/50 dark:ring-white/5">
        <span className="size-2 animate-bounce rounded-full bg-ember/50 [animation-delay:-0.3s]" />
        <span className="size-2 animate-bounce rounded-full bg-ember/50 [animation-delay:-0.15s]" />
        <span className="size-2 animate-bounce rounded-full bg-ember/50" />
      </div>
    </div>
  )
}

// ============================================================================
// FAQ Pill Component
// ============================================================================

function FaqPill({
  question,
  onClick,
  disabled,
}: {
  question: string
  onClick: () => void
  disabled: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'group flex items-start gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200',
        'border-olive-950/10 bg-white/60 backdrop-blur-sm',
        'hover:border-ember/30 hover:bg-white hover:shadow-md hover:shadow-ember/5',
        'dark:border-white/10 dark:bg-juniper/30 dark:hover:border-ember/40 dark:hover:bg-juniper/50',
        'disabled:cursor-not-allowed disabled:opacity-50'
      )}
    >
      <div
        className={clsx(
          'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full',
          'bg-ember/10 text-ember transition-colors duration-200',
          'group-hover:bg-ember/20',
          'dark:bg-ember/20 dark:group-hover:bg-ember/30'
        )}
      >
        <QuestionMarkIcon className="size-3" />
      </div>
      <span className="text-sm font-medium text-oxblood transition-colors duration-200 group-hover:text-ember dark:text-coral dark:group-hover:text-ember">
        {question}
      </span>
    </button>
  )
}

// ============================================================================
// Inline Chat Component
// ============================================================================

const InlineChat = forwardRef<InlineChatHandle, object>(function InlineChat(_props, ref) {
  const pathname = usePathname()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hasUserInteracted = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, setMessages } = useChat()

  const isLoading = status === 'submitted'

  // Expose sendQuestion method to parent
  useImperativeHandle(ref, () => ({
    sendQuestion: (question: string) => {
      hasUserInteracted.current = true
      sendMessage({ text: question })
      // Scroll chat into view
      setTimeout(() => {
        containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    },
  }))

  // Load conversation from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed)
          return
        }
      } catch (e) {
        console.error('Failed to parse chat history:', e)
      }
    }
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

  // Auto-scroll to bottom on new messages (only after user has interacted)
  useEffect(() => {
    if (hasUserInteracted.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading])

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      e?.preventDefault()
      const inputValue = input || inputRef.current?.value || ''
      if (!inputValue.trim() || isLoading) return

      hasUserInteracted.current = true
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

  const handleClearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        role: 'assistant',
        parts: [{ type: 'text', text: getWelcomeMessage(pathname) }],
      },
    ])
  }, [pathname, setMessages])

  return (
    <div
      ref={containerRef}
      className="group/chat relative flex h-[32rem] flex-col overflow-hidden rounded-3xl border border-olive-950/10 bg-gradient-to-b from-white to-snow shadow-2xl shadow-oxblood/5 ring-1 ring-olive-950/5 dark:border-white/10 dark:from-juniper/60 dark:to-juniper/40 dark:shadow-black/20 dark:ring-white/5"
    >
      {/* Decorative gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ember/[0.02] via-transparent to-oxblood/[0.02] dark:from-ember/[0.05] dark:to-oxblood/[0.05]" />

      {/* Header */}
      <header className="relative flex items-center justify-between border-b border-olive-950/5 bg-white/80 px-5 py-4 backdrop-blur-sm dark:border-white/5 dark:bg-juniper/50">
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-oxblood to-oxblood/90 text-white shadow-lg shadow-oxblood/20">
            <SparkleIcon className="size-5" />
            <div className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-juniper" />
          </div>
          <div>
            <p className="text-sm font-semibold text-oxblood dark:text-coral">Magnet AI</p>
            <p className="text-[11px] text-basalt/70 dark:text-opal/70">Always here to help</p>
          </div>
        </div>
        <button
          onClick={handleClearHistory}
          className="rounded-lg px-2.5 py-1 text-[11px] font-medium text-basalt/60 transition-all hover:bg-olive-950/5 hover:text-oxblood dark:text-opal/60 dark:hover:bg-white/5 dark:hover:text-coral"
          title="Clear chat history"
        >
          Clear
        </button>
      </header>

      {/* Messages */}
      <div className="relative flex-1 overflow-y-auto px-5 py-4">
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
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="relative border-t border-olive-950/5 bg-white/60 p-4 backdrop-blur-sm dark:border-white/5 dark:bg-juniper/30"
      >
        <div className="flex items-center gap-3">
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
            placeholder="Ask anything about Magnet..."
            className="flex-1 rounded-xl border border-olive-950/10 bg-white px-4 py-3 text-sm text-oxblood shadow-sm placeholder:text-basalt/50 focus:border-oxblood/30 focus:outline-none focus:ring-2 focus:ring-oxblood/10 dark:border-white/10 dark:bg-juniper/50 dark:text-coral dark:placeholder:text-opal/50 dark:focus:border-ember/30 dark:focus:ring-ember/10"
          />
          <button
            type="button"
            onClick={() => handleSubmit()}
            disabled={isLoading}
            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-oxblood to-oxblood/90 text-white shadow-lg shadow-oxblood/20 transition-all hover:shadow-xl hover:shadow-oxblood/30 disabled:opacity-50 disabled:shadow-none"
            aria-label="Send message"
          >
            <SendIcon className="size-4" />
          </button>
        </div>
      </form>
    </div>
  )
})

// ============================================================================
// Main Section Component
// ============================================================================

export function FAQsWithChat({
  eyebrow,
  headline,
  subheadline,
  questions,
  className,
  withGridBg = false,
  ...props
}: {
  eyebrow?: ReactNode
  headline?: ReactNode
  subheadline?: ReactNode
  questions: FaqQuestion[]
  withGridBg?: boolean
} & Omit<ComponentProps<'section'>, 'children'>) {
  const chatRef = useRef<InlineChatHandle>(null)
  const [isLoading, setIsLoading] = useState(false)

  const headlineElement =
    headline && typeof headline === 'string' ? <Subheading>{headline}</Subheading> : headline

  const handleQuestionClick = useCallback((question: string) => {
    setIsLoading(true)
    chatRef.current?.sendQuestion(question)
    // Reset loading state after a brief delay
    setTimeout(() => setIsLoading(false), 500)
  }, [])

  const content = (
    <Container className="flex flex-col gap-12 sm:gap-16">
      {/* Header - Left aligned */}
      <div className="flex max-w-2xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {headlineElement}
        </div>
        {subheadline && <Text className="text-pretty">{subheadline}</Text>}
      </div>

      {/* FAQ Pills Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {questions.map((faq, index) => (
          <FaqPill
            key={index}
            question={faq.question}
            onClick={() => handleQuestionClick(faq.question)}
            disabled={isLoading}
          />
        ))}
      </div>

      {/* Chat Panel */}
      <div className="max-w-2xl">
        <div className="mb-4 flex items-center gap-2">
          <div className="size-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-basalt/60 dark:text-opal/60">
            Or ask your own question below
          </span>
        </div>
        <InlineChat ref={chatRef} />
      </div>
    </Container>
  )

  if (withGridBg) {
    return (
      <section className={className} {...props}>
        <GridBgSection showBottomBorder={true} withPadding>
          {content}
        </GridBgSection>
      </section>
    )
  }

  return (
    <section className={clsx(sectionPaddingClasses, className)} {...props}>
      {content}
    </section>
  )
}
