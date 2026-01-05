'use client'

import { clsx } from 'clsx/lite'
import { useCallback, useEffect, useId, useRef, useState, type ComponentProps, type ReactNode } from 'react'
import { Section } from '../elements/section'

// Stage data with cumulative stats at each point in the journey
const STAGE_DATA = [
  {
    name: 'Foundation',
    stats: [
      { value: 125, prefix: '$', suffix: 'M+', label: 'Revenue generated for clients' },
      { value: 1.8, suffix: 'x', label: 'Average ROI increase' },
      { value: 85, suffix: '%', label: 'Brand consistency improvement' },
    ],
  },
  {
    name: 'Activation',
    stats: [
      { value: 275, prefix: '$', suffix: 'M+', label: 'Revenue generated for clients' },
      { value: 2.4, suffix: 'x', label: 'Average ROI increase' },
      { value: 140, suffix: '%', label: 'Traffic and engagement lift' },
    ],
  },
  {
    name: 'Acceleration',
    stats: [
      { value: 400, prefix: '$', suffix: 'M+', label: 'Revenue generated for clients' },
      { value: 2.9, suffix: 'x', label: 'Average ROI increase' },
      { value: 200, suffix: '%', label: 'Conversion rate improvement' },
    ],
  },
  {
    name: 'Retention',
    stats: [
      { value: 500, prefix: '$', suffix: 'M+', label: 'Revenue generated for clients' },
      { value: 3.2, suffix: 'x', label: 'Average ROI increase' },
      { value: 240, suffix: '%', label: 'Average conversion improvement' },
    ],
  },
]

// Positions along the curve (x percentage, calculated y from bezier)
// The curve: M 0 383 C 396 362.79, 804 264.32, 1200 60
// We'll place dots at roughly 15%, 40%, 70%, 95% along the x-axis
const DOT_POSITIONS = [
  { x: 15, y: 92 },   // Foundation - near bottom left
  { x: 40, y: 82 },   // Activation
  { x: 70, y: 58 },   // Acceleration  
  { x: 95, y: 20 },   // Retention - near top right
]

function AnimatedNumber({ 
  value, 
  prefix = '', 
  suffix = '',
  duration = 600,
}: { 
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const [displayValue, setDisplayValue] = useState(value)
  const previousValue = useRef(value)
  const animationRef = useRef<number | undefined>(undefined)
  const startTimeRef = useRef<number | undefined>(undefined)

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp
    }

    const elapsed = timestamp - startTimeRef.current
    const progress = Math.min(elapsed / duration, 1)
    
    // Easing function (ease-out cubic)
    const eased = 1 - Math.pow(1 - progress, 3)
    
    const current = previousValue.current + (value - previousValue.current) * eased
    setDisplayValue(current)

    if (progress < 1) {
      animationRef.current = requestAnimationFrame(animate)
    } else {
      setDisplayValue(value)
      previousValue.current = value
    }
  }, [value, duration])

  useEffect(() => {
    if (value !== previousValue.current) {
      startTimeRef.current = undefined
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [value, animate])

  // Format the number appropriately
  const formatted = Number.isInteger(value) 
    ? Math.round(displayValue).toString()
    : displayValue.toFixed(1)

  return (
    <span>
      {prefix}{formatted}{suffix}
    </span>
  )
}

function InteractiveStat({
  stat,
  label,
  prefix = '',
  suffix = '',
}: {
  stat: number
  label: string
  prefix?: string
  suffix?: string
}) {
  return (
    <div className="border-l border-olive-950/20 pl-6 dark:border-white/20">
      <div className="text-2xl/10 tracking-tight text-oxblood dark:text-ember">
        <AnimatedNumber value={stat} prefix={prefix} suffix={suffix} />
      </div>
      <p className="mt-2 text-sm/7 text-oxblood dark:text-coral">{label}</p>
    </div>
  )
}

function StageDot({
  position,
  isActive,
  onClick,
  label,
}: {
  position: { x: number; y: number }
  isActive: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`View ${label} stats`}
      className="group absolute z-10"
      style={{
        left: `${position.x}%`,
        bottom: `${position.y}%`,
        transform: 'translate(-50%, 50%)',
      }}
    >
      {/* Outer glow ring */}
      <span
        className={clsx(
          'absolute inset-0 rounded-full transition-all duration-300',
          isActive 
            ? 'scale-[2.5] bg-ember/20 dark:bg-coral/20' 
            : 'scale-100 bg-transparent group-hover:scale-[2] group-hover:bg-ember/10 dark:group-hover:bg-coral/10'
        )}
      />
      {/* Inner dot */}
      <span
        className={clsx(
          'relative block size-3 rounded-full border-2 transition-all duration-300',
          isActive
            ? 'scale-125 border-ember bg-ember dark:border-coral dark:bg-coral'
            : 'border-olive-950/40 bg-snow group-hover:border-ember group-hover:bg-ember/20 dark:border-white/40 dark:bg-olive-950 dark:group-hover:border-coral dark:group-hover:bg-coral/20'
        )}
      />
      {/* Label tooltip */}
      <span
        className={clsx(
          'pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium transition-all duration-200',
          isActive
            ? 'translate-y-0 bg-ember text-white opacity-100 dark:bg-coral dark:text-olive-950'
            : 'translate-y-1 bg-oxblood/90 text-white opacity-0 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-white/90 dark:text-olive-950'
        )}
      >
        {label}
      </span>
    </button>
  )
}

function StageButton({
  name,
  isActive,
  onClick,
}: {
  name: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
        isActive
          ? 'bg-ember text-white dark:bg-coral dark:text-olive-950'
          : 'text-oxblood/60 hover:bg-oxblood/5 hover:text-oxblood dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white'
      )}
    >
      {name}
    </button>
  )
}

// Keep the original Stat export for backwards compatibility with pages that use static stats
export function Stat({
  stat,
  text,
  className,
  ...props
}: { stat: ReactNode; text: ReactNode } & ComponentProps<'div'>) {
  return (
    <div className={clsx('border-l border-olive-950/20 pl-6 dark:border-white/20', className)} {...props}>
      <div className="text-2xl/10 tracking-tight text-oxblood dark:text-ember">{stat}</div>
      <p className="mt-2 text-sm/7 text-oxblood dark:text-coral">{text}</p>
    </div>
  )
}

type StatsWithGraphProps = ComponentProps<typeof Section> & {
  interactive?: boolean
}

export function StatsWithGraph({ children, interactive = false, ...props }: StatsWithGraphProps) {
  const pathId = useId()
  const [activeStage, setActiveStage] = useState(3) // Default to Retention (full results)

  const currentStageData = STAGE_DATA[activeStage]

  return (
    <Section {...props}>
      {/* Stage selector buttons */}
      {interactive && (
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {STAGE_DATA.map((stage, index) => (
            <StageButton
              key={stage.name}
              name={stage.name}
              isActive={activeStage === index}
              onClick={() => setActiveStage(index)}
            />
          ))}
        </div>
      )}

      {/* Stats display */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 grid grid-cols-2 gap-x-2 gap-y-10 sm:auto-cols-fr sm:grid-flow-col-dense">
          {interactive ? (
            currentStageData.stats.map((stat, index) => (
              <InteractiveStat
                key={index}
                stat={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))
          ) : (
            children
          )}
        </div>
      </div>

      {/* Graph with dots */}
      <div className="pointer-events-none relative h-48 sm:h-64 lg:h-36">
        <div className="absolute bottom-0 left-1/2 w-[150vw] max-w-[calc(var(--container-7xl)-(--spacing(10)*2))] -translate-x-1/2">
          {/* Interactive dots overlay */}
          {interactive && (
            <div className="pointer-events-auto absolute inset-0">
              {DOT_POSITIONS.map((position, index) => (
                <StageDot
                  key={STAGE_DATA[index].name}
                  position={position}
                  isActive={activeStage === index}
                  onClick={() => setActiveStage(index)}
                  label={STAGE_DATA[index].name}
                />
              ))}
            </div>
          )}
          
          <svg
            className="h-100 w-full fill-olive-950/2.5 stroke-olive-950/40 dark:fill-white/2.5 dark:stroke-white/40"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
          >
            <defs>
              <clipPath id={pathId}>
                <path d="M 0 400 L 0 383 C 396 362.7936732276819, 804 264.31672304481856, 1200 60 L 1200 60 L 1200 400 Z" />
              </clipPath>
            </defs>
            <path
              d="M 0 400 L 0 383 C 396 362.7936732276819, 804 264.31672304481856, 1200 60 L 1200 60 L 1200 400 Z"
              stroke="none"
            />
            <g strokeWidth="1" strokeDasharray="4 3" clipPath={`url(#${pathId})`}>
              <line x1="0.5" y1="400" x2="0.5" y2="0" vectorEffect="non-scaling-stroke" />
              <line x1="92.3076923076923" y1="400" x2="92.3076923076923" y2="0" vectorEffect="non-scaling-stroke" />
              <line x1="184.6153846153846" y1="400" x2="184.6153846153846" y2="0" vectorEffect="non-scaling-stroke" />
              <line x1="276.9230769230769" y1="400" x2="276.9230769230769" y2="0" vectorEffect="non-scaling-stroke" />
              <line x1="369.2307692307692" y1="400" x2="369.2307692307692" y2="0" vectorEffect="non-scaling-stroke" />
              <line x1="461.53846153846155" y1="400" x2="461.53846153846155" y2="0" vectorEffect="non-scaling-stroke" />
              <line x1="553.8461538461538" y1="400" x2="553.8461538461538" y2="0" vectorEffect="non-scaling-stroke" />
              <line x1="646.1538461538462" y1="400" x2="646.1538461538462" y2="0" vectorEffect="non-scaling-stroke" />
              <line x1="738.4615384615385" y1="400" x2="738.4615384615385" y2="0" vectorEffect="non-scaling-stroke" />
              <line x1="830.7692307692307" y1="400" x2="830.7692307692307" y2="0" vectorEffect="non-scaling-stroke" />
              <line x1="923.0769230769231" y1="400" x2="923.0769230769231" y2="0" vectorEffect="non-scaling-stroke" />
              <line x1="1015.3846153846154" y1="400" x2="1015.3846153846154" y2="0" vectorEffect="non-scaling-stroke" />
              <line x1="1107.6923076923076" y1="400" x2="1107.6923076923076" y2="0" vectorEffect="non-scaling-stroke" />
              <line x1="1199.5" y1="400" x2="1199.5" y2="0" vectorEffect="non-scaling-stroke" />
            </g>
            <path
              d="M 0 383 C 396 362.7936732276819, 804 264.31672304481856, 1200 60"
              fill="none"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </Section>
  )
}
