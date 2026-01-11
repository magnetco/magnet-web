'use client'

import { clsx } from 'clsx/lite'

export function ImageSkeleton({ className }: { className?: string }) {
  return (
    <div className={clsx('absolute inset-0 overflow-hidden bg-gray-200', className)}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent" />
    </div>
  )
}
