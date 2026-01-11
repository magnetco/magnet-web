'use client'

import { clsx } from 'clsx/lite'
import { useState, type ComponentProps } from 'react'
import type { Phase } from '@/lib/sanity/types'

const phases: {
  id: Phase
  name: string
  description: string
  services: string[]
}[] = [
  {
    id: 'foundation',
    name: 'Foundation',
    description: 'Establishes clarity and structure. No growth system works without it.',
    services: ['Brand Architecture', 'Messaging System', 'Digital Experience', 'Conversion Architecture', 'Data & Analytics'],
  },
  {
    id: 'activation',
    name: 'Activation',
    description: 'Drives qualified demand into the system.',
    services: ['Paid Media', 'Social Content', 'Search Marketing', 'Creative Storytelling', 'Partnerships'],
  },
  {
    id: 'acceleration',
    name: 'Acceleration',
    description: 'Improves efficiency and conversion throughout the system.',
    services: ['Landing Experiences', 'Offers & Packaging', 'Sales Enablement', 'CRM & Automation', 'Attribution'],
  },
  {
    id: 'retention',
    name: 'Retention',
    description: 'Ensures the system compounds instead of decaying.',
    services: ['Lifecycle Email', 'Predictive Intelligence', 'Feedback Loops', 'Community', 'Customer Success'],
  },
]

export function MethodologyTimeline({
  activePhases,
  interactive = true,
  className,
  ...props
}: {
  activePhases?: Phase[]
  interactive?: boolean
} & ComponentProps<'div'>) {
  const [expandedPhase, setExpandedPhase] = useState<Phase | null>(null)

  const handlePhaseClick = (phaseId: Phase) => {
    if (!interactive) return
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId)
  }

  return (
    <div className={clsx('w-full', className)} {...props}>
      {/* Desktop: Horizontal Timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-0 right-0 top-6 h-0.5 bg-opal dark:bg-basalt" />
          {activePhases && (
            <div
              className="absolute left-0 top-6 h-0.5 bg-ember transition-all duration-500"
              style={{
                width: `${(activePhases.length / phases.length) * 100}%`,
              }}
            />
          )}

          {/* Phase Nodes */}
          <div className="relative grid grid-cols-4 gap-4">
            {phases.map((phase, index) => {
              const isActive = activePhases?.includes(phase.id)
              const isExpanded = expandedPhase === phase.id

              return (
                <div key={phase.id} className="flex flex-col items-center">
                  {/* Node */}
                  <button
                    onClick={() => handlePhaseClick(phase.id)}
                    disabled={!interactive}
                    className={clsx(
                      'relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300',
                      isActive
                        ? 'border-ember bg-ember text-frost'
                        : 'border-opal bg-frost text-basalt hover:border-ember/50 dark:border-basalt dark:bg-juniper',
                      interactive && 'cursor-pointer'
                    )}
                  >
                    <span className="font-mono text-sm font-medium">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </button>

                  {/* Phase Name */}
                  <h3
                    className={clsx(
                      'mt-4 text-center font-medium transition-colors duration-300',
                      isActive ? 'text-ember' : 'text-oxblood dark:text-frost'
                    )}
                  >
                    {phase.name}
                  </h3>

                  {/* Expanded Content */}
                  <div
                    className={clsx(
                      'mt-3 overflow-hidden transition-all duration-300',
                      isExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    <p className="mb-3 text-center text-sm text-basalt dark:text-coral/80">
                      {phase.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-1">
                      {phase.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-full bg-opal px-2 py-0.5 text-xs text-basalt dark:bg-basalt/50 dark:text-coral/80"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile: Vertical Timeline */}
      <div className="md:hidden">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute bottom-0 left-6 top-0 w-0.5 bg-opal dark:bg-basalt" />

          <div className="space-y-6">
            {phases.map((phase, index) => {
              const isActive = activePhases?.includes(phase.id)
              const isExpanded = expandedPhase === phase.id

              return (
                <div key={phase.id} className="relative flex gap-4">
                  {/* Node */}
                  <button
                    onClick={() => handlePhaseClick(phase.id)}
                    disabled={!interactive}
                    className={clsx(
                      'relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300',
                      isActive
                        ? 'border-ember bg-ember text-frost'
                        : 'border-opal bg-frost text-basalt hover:border-ember/50 dark:border-basalt dark:bg-juniper',
                      interactive && 'cursor-pointer'
                    )}
                  >
                    <span className="font-mono text-sm font-medium">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </button>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <h3
                      className={clsx(
                        'font-medium transition-colors duration-300',
                        isActive ? 'text-ember' : 'text-oxblood dark:text-frost'
                      )}
                    >
                      {phase.name}
                    </h3>

                    {/* Expanded Content */}
                    <div
                      className={clsx(
                        'overflow-hidden transition-all duration-300',
                        isExpanded ? 'mt-2 max-h-48 opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      <p className="mb-3 text-sm text-basalt dark:text-coral/80">
                        {phase.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {phase.services.map((service) => (
                          <span
                            key={service}
                            className="rounded-full bg-opal px-2 py-0.5 text-xs text-basalt dark:bg-basalt/50 dark:text-coral/80"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// Simple non-interactive version for displaying phases
export function MethodologyPhaseBar({
  phases: activePhases,
  className,
}: {
  phases?: Phase[]
  className?: string
}) {
  return (
    <div className={clsx('grid grid-cols-2 gap-4 sm:grid-cols-4', className)}>
      {phases.map((phase, index) => {
        const isActive = activePhases?.includes(phase.id)

        return (
          <div
            key={phase.id}
            className={clsx(
              'relative rounded-xl border p-6 transition-all duration-300',
              isActive
                ? 'border-ember/30 bg-ember/5 dark:border-coral/30 dark:bg-coral/5'
                : 'border-opal bg-frost dark:border-basalt dark:bg-juniper/50'
            )}
          >
            <div
              className={clsx(
                'mb-2 font-mono text-xs font-medium',
                isActive ? 'text-ember' : 'text-basalt dark:text-coral/60'
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </div>
            <h3
              className={clsx(
                'font-medium',
                isActive ? 'text-ember' : 'text-oxblood dark:text-frost'
              )}
            >
              {phase.name}
            </h3>
          </div>
        )
      })}
    </div>
  )
}
