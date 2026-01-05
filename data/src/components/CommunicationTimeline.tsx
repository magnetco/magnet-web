import { useState } from 'react'

interface Email {
  id: number
  direction: 'inbound' | 'outbound'
  from_name: string
  from_email: string
  to_name?: string
  to_email?: string
  subject: string
  received_at: string
  summary: string
  sentiment: 'positive' | 'neutral' | 'negative' | 'mixed'
  sentiment_score: number // -1.0 to 1.0
  key_points: string[]
  gmail_url: string
}

interface Touchpoint {
  id: number
  type: 'check-in' | 'follow-up' | 'celebration' | 'proactive'
  title: string
  reason: string
  suggestedSubject: string
  suggestedBody: string
  priority: 'high' | 'medium' | 'low'
  thingsToMention: string[]
}

// Mock data for UI development
const mockEmails: Email[] = [
  {
    id: 1,
    direction: 'inbound',
    from_name: 'Sarah Chen',
    from_email: 'sarah@acmecorp.com',
    to_name: 'Gavin',
    to_email: 'gavin@magnet.co',
    subject: 'Re: Q1 Campaign Results',
    received_at: '2025-01-03T14:30:00Z',
    summary: 'Sarah expressed enthusiasm about the 47% increase in qualified leads from our Q1 campaigns. She wants to schedule a call next week to discuss expanding the budget for Q2 and exploring new channels.',
    sentiment: 'positive',
    sentiment_score: 0.85,
    key_points: ['47% increase in qualified leads', 'Wants to discuss Q2 budget expansion', 'Interested in new channels'],
    gmail_url: '#',
  },
  {
    id: 2,
    direction: 'outbound',
    from_name: 'Gavin',
    from_email: 'gavin@magnet.co',
    to_name: 'Sarah Chen',
    to_email: 'sarah@acmecorp.com',
    subject: 'Re: Q1 Campaign Results',
    received_at: '2025-01-02T10:15:00Z',
    summary: 'Shared the Q1 campaign performance report highlighting key metrics and ROI. Outlined recommendations for scaling successful channels and proposed a strategy session.',
    sentiment: 'neutral',
    sentiment_score: 0.1,
    key_points: ['Shared Q1 performance report', 'Recommended scaling successful channels', 'Proposed strategy session'],
    gmail_url: '#',
  },
  {
    id: 3,
    direction: 'inbound',
    from_name: 'Sarah Chen',
    from_email: 'sarah@acmecorp.com',
    to_name: 'Gavin',
    to_email: 'gavin@magnet.co',
    subject: 'Quick question about timeline',
    received_at: '2024-12-28T16:45:00Z',
    summary: 'Sarah asked about the timeline for launching the new landing pages. She mentioned stakeholders are eager to see the updated designs and wants to confirm we\'re still on track for mid-January.',
    sentiment: 'neutral',
    sentiment_score: 0.0,
    key_points: ['Landing page timeline inquiry', 'Stakeholder pressure', 'Mid-January deadline confirmation'],
    gmail_url: '#',
  },
  {
    id: 4,
    direction: 'outbound',
    from_name: 'Gavin',
    from_email: 'gavin@magnet.co',
    to_name: 'Sarah Chen',
    to_email: 'sarah@acmecorp.com',
    subject: 'December retainer invoice + holiday schedule',
    received_at: '2024-12-20T09:00:00Z',
    summary: 'Sent the December retainer invoice and outlined the team\'s holiday availability. Confirmed coverage for urgent requests and set expectations for response times during the break.',
    sentiment: 'neutral',
    sentiment_score: 0.05,
    key_points: ['December invoice sent', 'Holiday availability outlined', 'Emergency coverage confirmed'],
    gmail_url: '#',
  },
  {
    id: 5,
    direction: 'inbound',
    from_name: 'Sarah Chen',
    from_email: 'sarah@acmecorp.com',
    to_name: 'Gavin',
    to_email: 'gavin@magnet.co',
    subject: 'Concerns about ad performance',
    received_at: '2024-12-15T11:30:00Z',
    summary: 'Sarah raised concerns about declining click-through rates on the LinkedIn campaign. She\'s worried about wasted spend and requested an urgent review of targeting parameters.',
    sentiment: 'negative',
    sentiment_score: -0.6,
    key_points: ['LinkedIn CTR declining', 'Concerned about ad spend', 'Requested targeting review'],
    gmail_url: '#',
  },
  {
    id: 6,
    direction: 'outbound',
    from_name: 'Gavin',
    from_email: 'gavin@magnet.co',
    to_name: 'Sarah Chen',
    to_email: 'sarah@acmecorp.com',
    subject: 'Re: Concerns about ad performance',
    received_at: '2024-12-15T15:20:00Z',
    summary: 'Responded to Sarah\'s concerns with a detailed analysis showing the CTR dip is seasonal and aligned with industry trends. Proposed A/B tests for new creatives and adjusted targeting.',
    sentiment: 'positive',
    sentiment_score: 0.4,
    key_points: ['Explained seasonal CTR trends', 'Proposed A/B testing', 'Adjusted targeting strategy'],
    gmail_url: '#',
  },
  {
    id: 7,
    direction: 'inbound',
    from_name: 'Marcus Wong',
    from_email: 'marcus@acmecorp.com',
    to_name: 'Gavin',
    to_email: 'gavin@magnet.co',
    subject: 'Website analytics access',
    received_at: '2024-12-10T14:00:00Z',
    summary: 'Marcus (Acme\'s IT lead) granted Google Analytics admin access and shared the GTM container ID. He asked about our data retention policies for compliance purposes.',
    sentiment: 'neutral',
    sentiment_score: 0.2,
    key_points: ['GA admin access granted', 'GTM container shared', 'Data retention policy question'],
    gmail_url: '#',
  },
]

// Mock touchpoint recommendations based on sentiment analysis
const mockTouchpoints: Touchpoint[] = [
  {
    id: 1,
    type: 'follow-up',
    title: 'Schedule Q2 Strategy Call',
    reason: 'Sarah mentioned wanting to discuss Q2 budget expansion',
    suggestedSubject: 'Q2 Strategy Session - Let\'s lock in a time',
    suggestedBody: 'Hi Sarah,\n\nFollowing up on our Q1 results conversation - I\'d love to schedule that strategy session to discuss Q2 budget expansion and the new channels you mentioned.\n\nWould Thursday or Friday afternoon work for a 30-minute call?\n\nBest,\nGavin',
    priority: 'high',
    thingsToMention: ['Reference the 47% lead increase', 'Bring specific channel recommendations', 'Have Q2 projections ready'],
  },
  {
    id: 2,
    type: 'proactive',
    title: 'Landing Page Progress Update',
    reason: 'Stakeholders are eager - proactive update builds trust',
    suggestedSubject: 'Landing Pages Update - On Track for Mid-January',
    suggestedBody: 'Hi Sarah,\n\nQuick update on the landing pages: we\'re on track for the mid-January launch as discussed. The design team is finalizing the responsive layouts this week.\n\nI\'ll send preview links by Friday so you can share with stakeholders.\n\nBest,\nGavin',
    priority: 'medium',
    thingsToMention: ['Confirm mid-January timeline', 'Offer preview for stakeholders', 'Mention any blockers proactively'],
  },
  {
    id: 3,
    type: 'check-in',
    title: 'LinkedIn Performance Check-in',
    reason: 'Past concern about CTR - show ongoing attention',
    suggestedSubject: 'LinkedIn Campaign Update - Seeing Improvements',
    suggestedBody: 'Hi Sarah,\n\nWanted to share a quick update on the LinkedIn campaign. Since implementing the new targeting and creatives, we\'re seeing CTR recover to pre-holiday levels.\n\nI\'ll include the full breakdown in next week\'s report, but wanted to give you a heads up that things are trending positively.\n\nBest,\nGavin',
    priority: 'medium',
    thingsToMention: ['Reference the A/B tests proposed', 'Share specific improvement metrics', 'Acknowledge her earlier concerns were valid'],
  },
]

// Mock client insights based on sentiment analysis
const mockClientInsights = {
  communicationStyle: 'Direct and data-driven. Appreciates proactive updates and specific metrics.',
  painPoints: ['Stakeholder pressure for visible progress', 'ROI concerns on paid campaigns', 'Timeline accountability'],
  whatMakesThemHappy: [
    'Proactive communication before they ask',
    'Specific numbers and metrics in updates',
    'Quick turnaround on concerns (same-day responses)',
    'Concrete recommendations with clear next steps',
  ],
  redFlags: [
    'Avoid vague timelines - they need specifics',
    'Don\'t let concerns linger - address immediately',
    'Stakeholder visibility matters - offer shareable materials',
  ],
}

// Calculate overall sentiment from emails
function calculateOverallSentiment(emails: Email[]): { label: string; score: number; trend: 'improving' | 'stable' | 'declining' } {
  if (emails.length === 0) return { label: 'No data', score: 0, trend: 'stable' }
  
  const avgScore = emails.reduce((sum, e) => sum + e.sentiment_score, 0) / emails.length
  
  const recentEmails = emails.slice(0, Math.min(3, emails.length))
  const olderEmails = emails.slice(3)
  
  let trend: 'improving' | 'stable' | 'declining' = 'stable'
  if (olderEmails.length > 0) {
    const recentAvg = recentEmails.reduce((sum, e) => sum + e.sentiment_score, 0) / recentEmails.length
    const olderAvg = olderEmails.reduce((sum, e) => sum + e.sentiment_score, 0) / olderEmails.length
    if (recentAvg - olderAvg > 0.2) trend = 'improving'
    else if (olderAvg - recentAvg > 0.2) trend = 'declining'
  }
  
  let label = 'Neutral'
  if (avgScore > 0.3) label = 'Positive'
  else if (avgScore < -0.3) label = 'Negative'
  
  return { label, score: avgScore, trend }
}

// Format relative time
function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Get days with communication for calendar
function getEmailDates(emails: Email[]): Set<string> {
  const dates = new Set<string>()
  emails.forEach(email => {
    const date = new Date(email.received_at)
    dates.add(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
  })
  return dates
}

// Generate Gmail compose URL
function generateGmailDraftUrl(to: string, subject: string, body: string): string {
  const encodedSubject = encodeURIComponent(subject)
  const encodedBody = encodeURIComponent(body)
  return `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodedSubject}&body=${encodedBody}`
}

// Mini Calendar Component
function MiniCalendar({ year, month, emailDates }: { year: number; month: number; emailDates: Set<string> }) {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = new Date()
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month
  
  const days: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)
  
  return (
    <div className="bg-white rounded-lg border border-slate-200/60 p-3">
      <div className="text-xs font-medium text-charcoal mb-2">
        {monthNames[month]} {year}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {dayNames.map((day, i) => (
          <div key={i} className="text-[10px] text-basalt text-center py-0.5">
            {day}
          </div>
        ))}
        {days.map((day, i) => {
          if (day === null) return <div key={i} />
          
          const dateKey = `${year}-${month}-${day}`
          const hasEmail = emailDates.has(dateKey)
          const isToday = isCurrentMonth && today.getDate() === day
          
          return (
            <div
              key={i}
              className={`text-[10px] text-center py-0.5 rounded ${
                hasEmail 
                  ? 'bg-ember text-white font-medium' 
                  : isToday 
                    ? 'bg-slate-200 text-charcoal font-medium'
                    : 'text-basalt'
              }`}
              title={hasEmail ? 'Communication on this day' : undefined}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Sentiment color classes
const sentimentColors: Record<Email['sentiment'], { bg: string; text: string; dot: string }> = {
  positive: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  neutral: { bg: 'bg-slate-50', text: 'text-slate-600', dot: 'bg-slate-400' },
  negative: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  mixed: { bg: 'bg-sky-50', text: 'text-sky-700', dot: 'bg-sky-500' },
}

const touchpointIcons: Record<Touchpoint['type'], JSX.Element> = {
  'check-in': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />,
  'follow-up': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />,
  'celebration': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
  'proactive': <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
}

const priorityColors: Record<Touchpoint['priority'], string> = {
  high: 'border-l-ember bg-ember/5',
  medium: 'border-l-amber-400 bg-amber-50/50',
  low: 'border-l-slate-300 bg-slate-50/50',
}

interface CommunicationTimelineProps {
  companyId?: number
}

export default function CommunicationTimeline({ companyId }: CommunicationTimelineProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [expandedTouchpoint, setExpandedTouchpoint] = useState<number | null>(null)
  
  const emails = mockEmails
  const touchpoints = mockTouchpoints
  const insights = mockClientInsights
  const overallSentiment = calculateOverallSentiment(emails)
  const emailDates = getEmailDates(emails)
  
  const inboundCount = emails.filter(e => e.direction === 'inbound').length
  const outboundCount = emails.filter(e => e.direction === 'outbound').length
  
  // Get last 3 months for calendar
  const now = new Date()
  const months = [
    { year: now.getFullYear(), month: now.getMonth() },
    { year: now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear(), month: now.getMonth() === 0 ? 11 : now.getMonth() - 1 },
    { year: now.getMonth() <= 1 ? now.getFullYear() - 1 : now.getFullYear(), month: now.getMonth() <= 1 ? 10 + now.getMonth() : now.getMonth() - 2 },
  ]

  // Calculate communication frequency
  const daysSinceFirst = emails.length > 0 
    ? Math.ceil((now.getTime() - new Date(emails[emails.length - 1].received_at).getTime()) / (1000 * 60 * 60 * 24))
    : 0
  const avgFrequency = daysSinceFirst > 0 ? Math.round(daysSinceFirst / emails.length) : 0

  return (
    <div className="bg-frost rounded-lg border border-opal overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-opal/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg">
              <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium text-charcoal">Communication</h3>
              <p className="text-sm text-basalt">
                {emails.length} emails · {inboundCount} received · {outboundCount} sent
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${
                  overallSentiment.label === 'Positive' ? 'bg-emerald-100 text-emerald-800' :
                  overallSentiment.label === 'Negative' ? 'bg-amber-100 text-amber-800' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {overallSentiment.label === 'Positive' && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                  {overallSentiment.label === 'Negative' && (
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  )}
                  {overallSentiment.label}
                </span>
                
                {overallSentiment.trend !== 'stable' && (
                  <span className={`text-xs px-1.5 py-0.5 rounded ${
                    overallSentiment.trend === 'improving' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    {overallSentiment.trend === 'improving' ? '↑ Improving' : '↓ Declining'}
                  </span>
                )}
              </div>
              <p className="text-xs text-basalt mt-0.5">Overall sentiment</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content with sidebar */}
      <div className="flex">
        {/* Timeline (left side) */}
        <div className="flex-1 px-6 py-4 border-r border-opal/40">
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-opal via-opal to-transparent" />
            
            <div className="space-y-4">
              {emails.map((email) => {
                const isExpanded = expandedId === email.id
                const colors = sentimentColors[email.sentiment]
                const isInbound = email.direction === 'inbound'
                
                return (
                  <div key={email.id} className="relative pl-12">
                    <div className={`absolute left-3 top-3 w-4 h-4 rounded-full border-2 border-frost ${colors.dot} shadow-sm`} />
                    
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : email.id)}
                      className={`w-full text-left rounded-lg border transition-all duration-200 ${
                        isInbound 
                          ? 'bg-slate-50/80 border-slate-200/60 hover:border-slate-300' 
                          : 'bg-gradient-to-r from-ember/5 to-coral/10 border-ember/20 hover:border-ember/40'
                      } ${isExpanded ? 'ring-2 ring-ember/20' : ''}`}
                    >
                      <div className="p-4">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${
                              isInbound ? 'bg-slate-200/80 text-slate-700' : 'bg-ember/10 text-ember'
                            }`}>
                              {isInbound ? (
                                <>
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                  </svg>
                                  Received
                                </>
                              ) : (
                                <>
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                  </svg>
                                  Sent
                                </>
                              )}
                            </span>
                            <span className="text-sm font-medium text-charcoal truncate">
                              {isInbound ? email.from_name : `To: ${email.to_name}`}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium capitalize ${colors.bg} ${colors.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                              {email.sentiment}
                            </span>
                            <span className="text-xs text-basalt">
                              {formatRelativeTime(email.received_at)}
                            </span>
                          </div>
                        </div>
                        
                        <h4 className="font-medium text-charcoal mb-2">{email.subject}</h4>
                        <p className={`text-sm text-basalt ${isExpanded ? '' : 'line-clamp-2'}`}>
                          {email.summary}
                        </p>
                        
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-opal/60 space-y-3">
                            <div>
                              <p className="text-xs font-medium text-basalt uppercase tracking-wide mb-2">Key Points</p>
                              <ul className="space-y-1">
                                {email.key_points.map((point, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-charcoal">
                                    <svg className="w-4 h-4 text-ember shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="flex items-center justify-between pt-2">
                              <div className="text-xs text-basalt">
                                <span className="font-medium">{email.from_name}</span>
                                <span className="mx-1">·</span>
                                <span>{email.from_email}</span>
                                <span className="mx-1">→</span>
                                <span>{email.to_email}</span>
                              </div>
                              
                              <a
                                href={email.gmail_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-ember hover:text-oxblood bg-frost border border-ember/30 rounded hover:bg-ember/5 transition-colors"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                View in Gmail
                              </a>
                            </div>
                            
                            <p className="text-xs text-basalt">
                              {new Date(email.received_at).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className={`flex items-center justify-center py-1.5 border-t ${
                        isInbound ? 'border-slate-200/60 bg-slate-100/50' : 'border-ember/10 bg-ember/5'
                      }`}>
                        <svg 
                          className={`w-4 h-4 text-basalt transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
          
          {emails.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 mb-4">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-basalt">No email communication found</p>
            </div>
          )}
        </div>
        
        {/* Sidebar (right side) */}
        <div className="w-80 shrink-0 bg-slate-50/30 p-4 space-y-4">
          {/* Recommended Touchpoints */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h4 className="text-sm font-medium text-charcoal">Recommended Touchpoints</h4>
            </div>
            
            <div className="space-y-2">
              {touchpoints.map((tp) => {
                const isExpanded = expandedTouchpoint === tp.id
                return (
                  <div 
                    key={tp.id} 
                    className={`rounded-lg border-l-4 ${priorityColors[tp.priority]} border border-l-4 transition-all`}
                  >
                    <button
                      onClick={() => setExpandedTouchpoint(isExpanded ? null : tp.id)}
                      className="w-full text-left p-3"
                    >
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-basalt shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {touchpointIcons[tp.type]}
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-charcoal">{tp.title}</p>
                          <p className="text-xs text-basalt mt-0.5 line-clamp-1">{tp.reason}</p>
                        </div>
                        <svg 
                          className={`w-4 h-4 text-basalt shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <div className="px-3 pb-3 space-y-3">
                        <div className="p-2 bg-white rounded border border-slate-200/60">
                          <p className="text-xs font-medium text-basalt uppercase tracking-wide mb-1">Things to Mention</p>
                          <ul className="space-y-1">
                            {tp.thingsToMention.map((item, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-xs text-charcoal">
                                <span className="text-ember">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <a
                          href={generateGmailDraftUrl('sarah@acmecorp.com', tp.suggestedSubject, tp.suggestedBody)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-2 px-3 text-sm font-medium text-white bg-ember hover:bg-oxblood rounded transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Draft in Gmail
                        </a>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Client Insights */}
          <div className="bg-white rounded-lg border border-slate-200/60 p-3">
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h4 className="text-sm font-medium text-charcoal">Keeping This Client Happy</h4>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-basalt uppercase tracking-wide mb-1">Communication Style</p>
                <p className="text-xs text-charcoal">{insights.communicationStyle}</p>
              </div>
              
              <div>
                <p className="text-xs font-medium text-emerald-700 uppercase tracking-wide mb-1">What Works</p>
                <ul className="space-y-1">
                  {insights.whatMakesThemHappy.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-charcoal">
                      <svg className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <p className="text-xs font-medium text-amber-700 uppercase tracking-wide mb-1">Watch Out For</p>
                <ul className="space-y-1">
                  {insights.redFlags.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs text-charcoal">
                      <svg className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Activity Calendar */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-basalt" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h4 className="text-sm font-medium text-charcoal">Activity</h4>
              </div>
              <span className="text-xs text-basalt">
                ~{avgFrequency} days between emails
              </span>
            </div>
            
            <div className="space-y-2">
              {months.map((m, i) => (
                <MiniCalendar 
                  key={i} 
                  year={m.year} 
                  month={m.month} 
                  emailDates={emailDates} 
                />
              ))}
            </div>
            
            <div className="flex items-center gap-3 mt-3 text-xs text-basalt">
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-ember" />
                <span>Email activity</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-slate-200" />
                <span>Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="px-6 py-3 bg-slate-50/50 border-t border-opal/40">
        <p className="text-xs text-basalt text-center">
          <span className="font-medium">AI-generated summaries and insights</span> · Click an email to expand details
        </p>
      </div>
    </div>
  )
}
