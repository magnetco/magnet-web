'use client'

import { ElDisclosure } from '@tailwindplus/elements/react'
import { clsx } from 'clsx/lite'
import { gsap } from 'gsap'
import { useChat } from '@ai-sdk/react'
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ComponentProps,
  type ReactNode,
  useId,
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

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = 'magnet-chat-history'

const QUICK_REPLIES = [
  { text: 'What services do you offer?', icon: '🎯' },
  { text: 'How does your methodology work?', icon: '📋' },
  { text: 'What companies do you work with?', icon: '🏢' },
]

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

function QuickReplyButtons({
  replies,
  onSelect,
  disabled,
}: {
  replies: typeof QUICK_REPLIES
  onSelect: (text: string) => void
  disabled: boolean
}) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {replies.map((reply) => (
        <button
          key={reply.text}
          onClick={() => onSelect(reply.text)}
          disabled={disabled}
          className="inline-flex items-center gap-2 rounded-xl border border-olive-950/10 bg-white px-3.5 py-2 text-xs font-medium text-oxblood shadow-sm transition-all hover:border-oxblood/20 hover:bg-snow hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-juniper/50 dark:text-coral dark:hover:border-ember/30 dark:hover:bg-juniper/70"
        >
          <span className="text-sm">{reply.icon}</span>
          <span>{reply.text}</span>
        </button>
      ))}
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
// Inline Chat Component
// ============================================================================

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  )
}

function InlineChat() {
  const pathname = usePathname()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const hasUserInteracted = useRef(false)

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
  }, [pathname, setMessages])

  const showQuickReplies = messages.length === 1 && messages[0]?.role === 'assistant' && !isLoading

  return (
    <div className="group/chat relative flex h-[28rem] flex-col overflow-hidden rounded-3xl border border-olive-950/10 bg-gradient-to-b from-white to-snow shadow-2xl shadow-oxblood/5 ring-1 ring-olive-950/5 dark:border-white/10 dark:from-juniper/60 dark:to-juniper/40 dark:shadow-black/20 dark:ring-white/5">
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

        {/* Quick replies */}
        {showQuickReplies && (
          <QuickReplyButtons replies={QUICK_REPLIES} onSelect={handleQuickReply} disabled={isLoading} />
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="relative border-t border-olive-950/5 bg-white/60 p-4 backdrop-blur-sm dark:border-white/5 dark:bg-juniper/30">
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
}

// ============================================================================
// FAQ Component
// ============================================================================

export function Faq({
  id,
  question,
  answer,
  ...props
}: { question: ReactNode; answer: ReactNode } & ComponentProps<'div'>) {
  const autoId = useId()
  id = id || autoId
  const disclosureRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const disclosure = disclosureRef.current
    const content = contentRef.current
    const button = buttonRef.current
    const icon = iconRef.current
    if (!disclosure || !content || !icon) return

    disclosure.style.height = '0px'
    disclosure.style.overflow = 'hidden'
    gsap.set(content, { opacity: 0, y: 12 })

    const updateAriaExpanded = (open: boolean) => {
      if (button) {
        button.setAttribute('aria-expanded', String(open))
      }
      setIsOpen(open)
    }

    const animateOpen = () => {
      gsap.killTweensOf([disclosure, content, icon])

      disclosure.style.height = 'auto'
      const targetHeight = disclosure.offsetHeight
      disclosure.style.height = '0px'

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.to(icon, { rotation: 180, duration: 0.4, ease: 'back.out(1.7)' }, 0)
      tl.to(
        disclosure,
        {
          height: targetHeight,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            disclosure.style.height = 'auto'
          },
        },
        0
      )
      tl.to(content, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, 0.1)
    }

    const animateClose = () => {
      gsap.killTweensOf([disclosure, content, icon])

      const currentHeight = disclosure.offsetHeight
      disclosure.style.height = `${currentHeight}px`

      const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })
      tl.to(icon, { rotation: 0, duration: 0.3, ease: 'power2.inOut' }, 0)
      tl.to(content, { opacity: 0, y: 8, duration: 0.25 }, 0)
      tl.to(disclosure, { height: 0, duration: 0.35, ease: 'power3.inOut' }, 0.05)
    }

    const animateToggle = () => {
      const open = disclosure.hasAttribute('open') && !disclosure.hasAttribute('hidden')
      updateAriaExpanded(open)
      if (open) {
        animateOpen()
      } else {
        animateClose()
      }
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          (mutation.attributeName === 'open' || mutation.attributeName === 'hidden')
        ) {
          requestAnimationFrame(() => {
            animateToggle()
          })
        }
      })
    })

    observer.observe(disclosure, {
      attributes: true,
      attributeFilter: ['open', 'hidden'],
    })

    const isInitiallyOpen = disclosure.hasAttribute('open') && !disclosure.hasAttribute('hidden')
    updateAriaExpanded(isInitiallyOpen)
    if (isInitiallyOpen) {
      disclosure.style.height = 'auto'
      gsap.set(content, { opacity: 1, y: 0 })
      gsap.set(icon, { rotation: 180 })
    }

    return () => {
      observer.disconnect()
      gsap.killTweensOf([disclosure, content, icon])
    }
  }, [])

  return (
    <div
      id={id}
      className={clsx(
        'group transition-all duration-200',
        isOpen && '-mx-4 rounded-xl bg-olive-950/[0.02] px-4 dark:bg-white/[0.02]'
      )}
      {...props}
    >
      <button
        ref={buttonRef}
        type="button"
        id={`${id}-question`}
        command="--toggle"
        commandfor={`${id}-answer`}
        aria-expanded={isOpen}
        className={clsx(
          'flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left',
          'text-base/7 font-medium text-oxblood transition-colors duration-200',
          'hover:text-ember dark:text-coral dark:hover:text-ember'
        )}
      >
        <span className="text-pretty">{question}</span>
        <div
          ref={iconRef}
          className={clsx(
            'relative mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full',
            'bg-olive-950/5 transition-all duration-200',
            'group-hover:bg-ember/10 group-hover:scale-110 dark:bg-white/10 dark:group-hover:bg-ember/20',
            isOpen && 'bg-ember/10 dark:bg-ember/20'
          )}
        >
          <svg
            className="size-3 text-oxblood dark:text-coral"
            fill="none"
            viewBox="0 0 12 12"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          >
            <path
              d="M6 1v10"
              className={clsx('origin-center transition-opacity duration-200', isOpen && 'opacity-0')}
            />
            <path d="M1 6h10" />
          </svg>
        </div>
      </button>
      <ElDisclosure ref={disclosureRef} id={`${id}-answer`} hidden className="overflow-hidden">
        <div ref={contentRef} className="pb-5 pr-12">
          <div className="text-sm/7 text-olive-700 dark:text-opal">{answer}</div>
        </div>
      </ElDisclosure>
    </div>
  )
}

// ============================================================================
// Main Section Component
// ============================================================================

export function FAQsWithChat({
  eyebrow,
  headline,
  subheadline,
  className,
  children,
  withGridBg = false,
  ...props
}: {
  eyebrow?: ReactNode
  headline?: ReactNode
  subheadline?: ReactNode
  withGridBg?: boolean
} & ComponentProps<'section'>) {
  const headlineElement =
    headline && typeof headline === 'string' ? <Subheading>{headline}</Subheading> : headline

  const content = (
    <Container>
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: FAQs */}
        <div className="flex flex-col lg:col-span-7">
          {/* Header */}
          <div className="mb-10 flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {headlineElement}
            </div>
            {subheadline && (
              <Text className="max-w-xl text-pretty">{subheadline}</Text>
            )}
          </div>

          {/* FAQ Items */}
          <div className="divide-y divide-olive-950/10 border-y border-olive-950/10 dark:divide-white/10 dark:border-white/10">
            {children}
          </div>
        </div>

        {/* Right: Chat */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          {/* Chat label */}
          <div className="mb-4 flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-basalt/60 dark:text-opal/60">
              AI assistant available
            </span>
          </div>
          <InlineChat />
        </div>
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

