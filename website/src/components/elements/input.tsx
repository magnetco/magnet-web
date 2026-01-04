import { clsx } from 'clsx/lite'
import type { ComponentProps } from 'react'

interface InputProps extends ComponentProps<'input'> {
  hasError?: boolean
}

export function Input({ hasError, className, disabled, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        'w-full rounded-lg border-2 bg-white px-4 py-3 text-sm/7 text-oxblood placeholder:text-oxblood/40 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-white/5 dark:text-coral dark:placeholder:text-coral/40',
        hasError
          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-400 dark:focus:border-rose-400'
          : 'border-oxblood/20 focus:border-ember focus:ring-ember/20 dark:border-white/20 dark:focus:border-ember',
        disabled && 'opacity-60 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      {...props}
    />
  )
}

interface TextareaProps extends ComponentProps<'textarea'> {
  hasError?: boolean
}

export function Textarea({ hasError, className, disabled, ...props }: TextareaProps) {
  return (
    <textarea
      className={clsx(
        'w-full rounded-lg border-2 bg-white px-4 py-3 text-sm/7 text-oxblood placeholder:text-oxblood/40 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-white/5 dark:text-coral dark:placeholder:text-coral/40',
        hasError
          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-400 dark:focus:border-rose-400'
          : 'border-oxblood/20 focus:border-ember focus:ring-ember/20 dark:border-white/20 dark:focus:border-ember',
        disabled && 'opacity-60 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      {...props}
    />
  )
}

interface SelectProps extends ComponentProps<'select'> {
  hasError?: boolean
}

export function Select({ hasError, className, disabled, ...props }: SelectProps) {
  return (
    <select
      className={clsx(
        'w-full rounded-lg border-2 bg-white px-4 py-3 text-sm/7 text-oxblood focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-white/5 dark:text-coral',
        hasError
          ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-400 dark:focus:border-rose-400'
          : 'border-oxblood/20 focus:border-ember focus:ring-ember/20 dark:border-white/20 dark:focus:border-ember',
        disabled && 'opacity-60 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      {...props}
    />
  )
}

interface LabelProps extends ComponentProps<'label'> {
  required?: boolean
}

export function Label({ required, children, className, ...props }: LabelProps) {
  return (
    <label className={clsx('mb-2 block text-sm font-medium text-oxblood dark:text-coral', className)} {...props}>
      {children}
      {required && <span className="text-rose-500">*</span>}
    </label>
  )
}

