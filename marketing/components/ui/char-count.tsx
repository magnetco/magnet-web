import { clsx } from 'clsx'

interface CharCountProps {
  current: number
  max: number
  className?: string
}

export function CharCount({ current, max, className }: CharCountProps) {
  const percentage = current / max
  const color = percentage > 1 ? 'text-red-500' : percentage > 0.9 ? 'text-amber-500' : 'text-green-500'

  return (
    <span className={clsx('text-xs font-mono', color, className)}>
      {current}/{max}
    </span>
  )
}
