import { useState } from 'react'

interface LinearIssue {
  id: string
  identifier: string
  title: string
  status: 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done' | 'canceled'
  priority: 0 | 1 | 2 | 3 | 4 // 0 = no priority, 1 = urgent, 2 = high, 3 = medium, 4 = low
  assignee?: string
  createdAt: string
  updatedAt: string
  labels: string[]
  estimate?: number
  project?: string
  cycle?: string
}

interface LinearProject {
  id: string
  name: string
  progress: number
  status: 'planned' | 'started' | 'paused' | 'completed' | 'canceled'
  targetDate?: string
  issueCount: number
  completedCount: number
}

// Mock Linear data
const mockIssues: LinearIssue[] = [
  {
    id: '1',
    identifier: 'MAG-142',
    title: 'Homepage hero redesign with new brand assets',
    status: 'in_progress',
    priority: 2,
    assignee: 'Jamie K.',
    createdAt: '2025-12-15T10:00:00Z',
    updatedAt: '2026-01-03T14:30:00Z',
    labels: ['design', 'website'],
    estimate: 5,
    project: 'Q1 Website Refresh',
  },
  {
    id: '2',
    identifier: 'MAG-143',
    title: 'Implement new contact form with HubSpot integration',
    status: 'in_review',
    priority: 2,
    assignee: 'Alex M.',
    createdAt: '2025-12-18T09:00:00Z',
    updatedAt: '2026-01-02T16:45:00Z',
    labels: ['development', 'integration'],
    estimate: 3,
    project: 'Q1 Website Refresh',
  },
  {
    id: '3',
    identifier: 'MAG-144',
    title: 'SEO audit and meta tag optimization',
    status: 'done',
    priority: 3,
    assignee: 'Sam T.',
    createdAt: '2025-12-10T11:00:00Z',
    updatedAt: '2025-12-28T10:00:00Z',
    labels: ['seo', 'content'],
    estimate: 2,
    project: 'Q1 Website Refresh',
  },
  {
    id: '4',
    identifier: 'MAG-145',
    title: 'Mobile navigation UX improvements',
    status: 'todo',
    priority: 3,
    assignee: 'Jamie K.',
    createdAt: '2025-12-20T14:00:00Z',
    updatedAt: '2025-12-20T14:00:00Z',
    labels: ['design', 'mobile'],
    estimate: 3,
    project: 'Q1 Website Refresh',
  },
  {
    id: '5',
    identifier: 'MAG-146',
    title: 'Analytics dashboard setup in GA4',
    status: 'backlog',
    priority: 4,
    createdAt: '2025-12-22T09:00:00Z',
    updatedAt: '2025-12-22T09:00:00Z',
    labels: ['analytics'],
    project: 'Q1 Website Refresh',
  },
  {
    id: '6',
    identifier: 'MAG-138',
    title: 'Blog post: 2025 Marketing Trends',
    status: 'done',
    priority: 3,
    assignee: 'Taylor R.',
    createdAt: '2025-12-01T10:00:00Z',
    updatedAt: '2025-12-15T11:30:00Z',
    labels: ['content', 'blog'],
    estimate: 4,
  },
  {
    id: '7',
    identifier: 'MAG-139',
    title: 'Email campaign templates refresh',
    status: 'done',
    priority: 2,
    assignee: 'Jamie K.',
    createdAt: '2025-11-28T08:00:00Z',
    updatedAt: '2025-12-10T16:00:00Z',
    labels: ['design', 'email'],
    estimate: 3,
  },
]

const mockProject: LinearProject = {
  id: '1',
  name: 'Q1 Website Refresh',
  progress: 0.35,
  status: 'started',
  targetDate: '2026-02-28',
  issueCount: 12,
  completedCount: 4,
}

// AI-derived insights
const mockInsights = {
  velocityTrend: 'increasing' as const,
  avgCycleTime: 4.2, // days
  blockedCount: 0,
  recentWins: [
    'SEO audit completed ahead of schedule',
    'Email templates shipped with positive feedback',
    'HubSpot integration nearly ready for launch',
  ],
  attentionNeeded: [
    'Mobile navigation work not yet started',
    'Analytics setup needs prioritization',
  ],
  teamFocus: 'Currently focused on website redesign with 3 active tasks',
  predictedCompletion: 'On track for late February delivery',
}

const statusConfig: Record<LinearIssue['status'], { label: string; color: string; bgColor: string; dotColor: string }> = {
  backlog: { label: 'Backlog', color: 'text-slate-500', bgColor: 'bg-slate-100', dotColor: 'bg-slate-400' },
  todo: { label: 'Todo', color: 'text-slate-600', bgColor: 'bg-slate-100', dotColor: 'bg-slate-500' },
  in_progress: { label: 'In Progress', color: 'text-amber-700', bgColor: 'bg-amber-50', dotColor: 'bg-amber-500' },
  in_review: { label: 'In Review', color: 'text-purple-700', bgColor: 'bg-purple-50', dotColor: 'bg-purple-500' },
  done: { label: 'Done', color: 'text-emerald-700', bgColor: 'bg-emerald-50', dotColor: 'bg-emerald-500' },
  canceled: { label: 'Canceled', color: 'text-slate-400', bgColor: 'bg-slate-50', dotColor: 'bg-slate-300' },
}

const priorityConfig: Record<number, { label: string; icon: JSX.Element; color: string }> = {
  0: { label: 'No priority', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />, color: 'text-slate-300' },
  1: { label: 'Urgent', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />, color: 'text-red-500' },
  2: { label: 'High', icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></>, color: 'text-orange-500' },
  3: { label: 'Medium', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />, color: 'text-amber-500' },
  4: { label: 'Low', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />, color: 'text-slate-400' },
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function getLinearIssueUrl(identifier: string): string {
  // In production, this would use the actual Linear workspace URL
  return `https://linear.app/team/issue/${identifier}`
}

interface LinearTrackingProps {
  clientId?: number
}

export default function LinearTracking({ clientId }: LinearTrackingProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [lastSynced] = useState(new Date())
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'done'>('active')
  
  const issues = mockIssues
  const project = mockProject
  const insights = mockInsights
  
  // Filter issues
  const filteredIssues = issues.filter(issue => {
    if (activeFilter === 'active') return !['done', 'canceled'].includes(issue.status)
    if (activeFilter === 'done') return issue.status === 'done'
    return true
  })
  
  // Calculate stats
  const activeCount = issues.filter(i => ['in_progress', 'in_review'].includes(i.status)).length
  const completedCount = issues.filter(i => i.status === 'done').length
  const totalEstimate = issues.reduce((sum, i) => sum + (i.estimate || 0), 0)
  const completedEstimate = issues.filter(i => i.status === 'done').reduce((sum, i) => sum + (i.estimate || 0), 0)
  
  const handleResync = () => {
    setIsSyncing(true)
    // Simulate sync
    setTimeout(() => {
      setIsSyncing(false)
    }, 2000)
  }

  return (
    <div className="bg-frost rounded-lg border border-opal overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 border-b border-opal/60 hover:bg-snow/50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-violet-100 to-indigo-100 rounded-lg">
              <svg className="w-5 h-5 text-violet-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-medium text-charcoal">Linear Tracking</h3>
              <p className="text-sm text-basalt">
                {issues.length} issues · {activeCount} active · {completedCount} completed
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Quick stats */}
            <div className="flex items-center gap-3 mr-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-sm font-medium text-charcoal">{activeCount}</span>
                <span className="text-xs text-basalt">in flight</span>
              </div>
              <div className="w-px h-4 bg-opal" />
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-charcoal">{completedCount}</span>
                <span className="text-xs text-basalt">done</span>
              </div>
            </div>
            
            <svg 
              className={`w-5 h-5 text-basalt transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>
      
      {isExpanded && (
        <>
          {/* Project Progress */}
          <div className="px-6 py-4 border-b border-opal/40 bg-gradient-to-r from-violet-50/50 to-frost">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span className="font-medium text-charcoal">{project.name}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  project.status === 'started' ? 'bg-amber-100 text-amber-800' :
                  project.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                  'bg-slate-100 text-slate-600'
                }`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm text-basalt">Target: </span>
                <span className="text-sm font-medium text-charcoal">
                  {project.targetDate ? new Date(project.targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                </span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="relative">
              <div className="h-2 bg-slate-200/60 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${project.progress * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-xs text-basalt">{project.completedCount} of {project.issueCount} issues</span>
                <span className="text-xs font-medium text-violet-600">{Math.round(project.progress * 100)}% complete</span>
              </div>
            </div>
          </div>
          
          {/* AI Insights Panel */}
          <div className="px-6 py-4 border-b border-opal/40 bg-gradient-to-r from-indigo-50/30 via-frost to-violet-50/30">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1 bg-gradient-to-br from-indigo-200 to-violet-200 rounded">
                <svg className="w-3.5 h-3.5 text-indigo-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-sm font-medium text-charcoal">AI Insights</h4>
              <span className="text-xs text-basalt ml-auto">Based on recent activity</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Velocity & Status */}
              <div className="bg-white/70 rounded-lg border border-indigo-100/50 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <svg className={`w-4 h-4 ${insights.velocityTrend === 'increasing' ? 'text-emerald-500' : insights.velocityTrend === 'decreasing' ? 'text-amber-500' : 'text-slate-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {insights.velocityTrend === 'increasing' ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    )}
                  </svg>
                  <span className="text-xs font-medium text-charcoal">Velocity {insights.velocityTrend}</span>
                </div>
                <p className="text-sm text-basalt">{insights.teamFocus}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-basalt">Avg cycle:</span>
                  <span className="text-xs font-medium text-charcoal">{insights.avgCycleTime} days</span>
                </div>
              </div>
              
              {/* Recent Wins */}
              <div className="bg-white/70 rounded-lg border border-emerald-100/50 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs font-medium text-emerald-800">Recent Wins</span>
                </div>
                <ul className="space-y-1">
                  {insights.recentWins.slice(0, 2).map((win, i) => (
                    <li key={i} className="text-xs text-charcoal flex items-start gap-1.5">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span className="line-clamp-1">{win}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Attention Needed */}
              <div className="bg-white/70 rounded-lg border border-amber-100/50 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-xs font-medium text-amber-800">Needs Attention</span>
                </div>
                {insights.attentionNeeded.length > 0 ? (
                  <ul className="space-y-1">
                    {insights.attentionNeeded.slice(0, 2).map((item, i) => (
                      <li key={i} className="text-xs text-charcoal flex items-start gap-1.5">
                        <span className="text-amber-500 mt-0.5">•</span>
                        <span className="line-clamp-1">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-basalt italic">All good! No blockers.</p>
                )}
              </div>
            </div>
            
            {/* Prediction */}
            <div className="mt-3 flex items-center justify-center gap-2 py-2 bg-white/50 rounded-lg border border-violet-100/50">
              <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-violet-800 font-medium">{insights.predictedCompletion}</span>
            </div>
          </div>
          
          {/* Filter tabs + Sync button */}
          <div className="px-6 py-3 border-b border-opal/40 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {(['all', 'active', 'done'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    activeFilter === filter 
                      ? 'bg-white text-charcoal shadow-sm' 
                      : 'text-basalt hover:text-charcoal'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  <span className="ml-1 text-basalt">
                    ({filter === 'all' ? issues.length : filter === 'active' ? activeCount : completedCount})
                  </span>
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs text-basalt">
                Last synced: {lastSynced.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
              </span>
              <button
                onClick={handleResync}
                disabled={isSyncing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-violet-700 bg-violet-50 border border-violet-200 rounded-lg hover:bg-violet-100 hover:border-violet-300 transition-colors disabled:opacity-50"
              >
                <svg 
                  className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {isSyncing ? 'Syncing...' : 'Resync'}
              </button>
            </div>
          </div>
          
          {/* Issues List */}
          <div className="divide-y divide-opal/40">
            {filteredIssues.map((issue) => {
              const status = statusConfig[issue.status]
              const priority = priorityConfig[issue.priority]
              
              return (
                <a
                  key={issue.id}
                  href={getLinearIssueUrl(issue.identifier)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-6 py-3 hover:bg-violet-50/30 transition-colors group"
                >
                  {/* Status dot */}
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${status.dotColor}`} />
                  
                  {/* Priority icon */}
                  <svg className={`w-4 h-4 shrink-0 ${priority.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {priority.icon}
                  </svg>
                  
                  {/* Identifier */}
                  <span className="text-xs font-mono text-violet-600 shrink-0">{issue.identifier}</span>
                  
                  {/* Title */}
                  <span className="flex-1 text-sm text-charcoal truncate group-hover:text-violet-700 transition-colors">
                    {issue.title}
                  </span>
                  
                  {/* Labels */}
                  <div className="flex items-center gap-1 shrink-0">
                    {issue.labels.slice(0, 2).map((label, i) => (
                      <span key={i} className="text-xs px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                        {label}
                      </span>
                    ))}
                    {issue.labels.length > 2 && (
                      <span className="text-xs text-basalt">+{issue.labels.length - 2}</span>
                    )}
                  </div>
                  
                  {/* Assignee */}
                  {issue.assignee && (
                    <span className="text-xs text-basalt shrink-0 w-16 truncate text-right">{issue.assignee}</span>
                  )}
                  
                  {/* Status badge */}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${status.bgColor} ${status.color}`}>
                    {status.label}
                  </span>
                  
                  {/* Updated time */}
                  <span className="text-xs text-basalt shrink-0 w-14 text-right">
                    {formatRelativeTime(issue.updatedAt)}
                  </span>
                  
                  {/* External link icon */}
                  <svg className="w-4 h-4 text-basalt opacity-0 group-hover:opacity-100 transition-opacity shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )
            })}
            
            {filteredIssues.length === 0 && (
              <div className="px-6 py-8 text-center">
                <p className="text-sm text-basalt italic">No issues found</p>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="px-6 py-3 bg-slate-50/50 border-t border-opal/40">
            <div className="flex items-center justify-between">
              <p className="text-xs text-basalt">
                <span className="font-medium">Total estimated:</span> {totalEstimate} points · 
                <span className="font-medium ml-1">Completed:</span> {completedEstimate} points
              </p>
              <a
                href="https://linear.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-violet-600 hover:text-violet-800 transition-colors"
              >
                Open in Linear
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

