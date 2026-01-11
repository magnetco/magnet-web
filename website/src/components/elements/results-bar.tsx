import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'
import { Container } from './container'

export interface ResultItem {
  metric: string
  label: string
}

export function ResultsBar({
  results,
  className,
  ...props
}: {
  results: ResultItem[]
} & ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'border-b border-opal bg-frost py-8 dark:border-basalt dark:bg-juniper/50',
        className
      )}
      {...props}
    >
      <Container>
        <div
          className={clsx(
            'grid gap-8',
            results.length === 2 && 'grid-cols-2',
            results.length === 3 && 'grid-cols-3',
            results.length >= 4 && 'grid-cols-2 md:grid-cols-4'
          )}
        >
          {results.map((result, index) => (
            <div key={index} className="text-center md:text-left">
              <div className="font-mono text-3xl font-semibold text-ember">{result.metric}</div>
              <div className="mt-1 text-sm text-basalt dark:text-coral/60">{result.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
