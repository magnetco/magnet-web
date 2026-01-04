'use client'

import { useState } from 'react'
import { clsx } from 'clsx/lite'
import { Button } from './button'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { AlertTriangleIcon } from '@/components/icons/alert-triangle-icon'
import { LockIcon } from '@/components/icons/lock-icon'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const CORRECT_PASSWORD = 'magnetc0'

export function LoginForm() {
  const [password, setPassword] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Reset error state
    setErrorMessage('')

    // Validate password
    if (!password.trim()) {
      setErrorMessage('Please enter the password')
      setFormState('error')
      return
    }

    // Set submitting state
    setFormState('submitting')

    // Simulate API call delay
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      // Check password
      if (password === CORRECT_PASSWORD) {
        // Store authentication in sessionStorage
        sessionStorage.setItem('authenticated', 'true')
        setFormState('success')
        
        // Redirect to home page after a brief delay
        setTimeout(() => {
          window.location.href = '/'
        }, 1500)
      } else {
        setFormState('error')
        setErrorMessage('Incorrect password. Please try again.')
      }
    } catch (error) {
      setFormState('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  const handleReset = () => {
    setPassword('')
    setFormState('idle')
    setErrorMessage('')
  }

  return (
    <div className="w-full">
      {formState === 'success' ? (
        <div className="flex flex-col items-center gap-6 rounded-2xl bg-opal/10 p-8 text-center dark:bg-white/5">
          <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <CheckmarkIcon className="size-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-oxblood dark:text-ember">
              Access granted
            </h2>
            <p className="text-base/7 text-oxblood/70 dark:text-coral/70">
              Redirecting you...
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium text-oxblood dark:text-coral">
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <LockIcon className="size-5 text-oxblood/40 dark:text-coral/40" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (formState === 'error') {
                    setFormState('idle')
                    setErrorMessage('')
                  }
                }}
                placeholder="Enter password"
                disabled={formState === 'submitting'}
                className={clsx(
                  'w-full rounded-full border-2 bg-white px-4 py-3 pl-12 text-sm/7 text-oxblood placeholder:text-oxblood/40 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:bg-white/5 dark:text-coral dark:placeholder:text-coral/40',
                  formState === 'error'
                    ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-400 dark:focus:border-rose-400'
                    : 'border-oxblood/20 focus:border-ember focus:ring-ember/20 dark:border-white/20 dark:focus:border-ember',
                  formState === 'submitting' && 'opacity-60 cursor-not-allowed',
                )}
                aria-invalid={formState === 'error'}
                aria-describedby={formState === 'error' ? 'password-error' : undefined}
              />
            </div>
            {formState === 'error' && errorMessage && (
              <div
                id="password-error"
                className="flex items-center gap-2 text-sm text-rose-600 dark:text-rose-400"
                role="alert"
              >
                <AlertTriangleIcon className="size-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={formState === 'submitting'}
            className="w-full"
          >
            {formState === 'submitting' ? (
              <span className="flex items-center gap-2">
                <svg
                  className="size-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Verifying...
              </span>
            ) : (
              'Log in'
            )}
          </Button>
        </form>
      )}
    </div>
  )
}

