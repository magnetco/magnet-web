'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { clsx } from 'clsx/lite'
import { Container } from '@/components/elements/container'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
import { Button } from '@/components/elements/button'
import { Input, Select, Label } from '@/components/elements/input'
import { Subheading } from '@/components/elements/subheading'
import { CheckmarkIcon } from '@/components/icons/checkmark-icon'
import { AlertTriangleIcon } from '@/components/icons/alert-triangle-icon'
import { isValidEmail } from '@/lib/validation'
import type { ApplyJob } from './page'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const TIMEZONES = [
  'Eastern Time (ET)',
  'Central Time (CT)',
  'Mountain Time (MT)',
  'Pacific Time (PT)',
  'Alaska Time (AKT)',
  'Hawaii Time (HT)',
  'Other',
]

export function ApplyForm({ jobs }: { jobs: ApplyJob[] }) {
  const searchParams = useSearchParams()
  const prefilledJobSlug = searchParams?.get('job') || ''

  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedJobSlug, setSelectedJobSlug] = useState(prefilledJobSlug)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cellNumber: '',
    linkedinUrl: '',
    resumeUrl: '',
    timezone: '',
    locationPreference: '',
  })

  // Update selected job when URL param changes
  useEffect(() => {
    if (prefilledJobSlug && jobs.some((job) => job.slug.current === prefilledJobSlug)) {
      setSelectedJobSlug(prefilledJobSlug)
    }
  }, [prefilledJobSlug, jobs])

  // Get the selected job's details
  const selectedJob = selectedJobSlug ? jobs.find((job) => job.slug.current === selectedJobSlug) : null
  const availableLocations = selectedJob?.locations || []

  // Reset location preference when job changes
  useEffect(() => {
    if (selectedJobSlug && !availableLocations.some((loc) => loc.title === formData.locationPreference)) {
      setFormData((prev) => ({ ...prev, locationPreference: '' }))
    }
  }, [selectedJobSlug, availableLocations, formData.locationPreference])

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (formState === 'error') {
      setFormState('idle')
      setErrorMessage('')
    }
  }

  const handleJobChange = (value: string) => {
    setSelectedJobSlug(value)
    if (formState === 'error') {
      setFormState('idle')
      setErrorMessage('')
    }
  }

  const validateForm = (): boolean => {
    if (!selectedJobSlug) {
      setErrorMessage('Please select a position')
      setFormState('error')
      return false
    }
    if (!formData.firstName.trim()) {
      setErrorMessage('Please enter your first name')
      setFormState('error')
      return false
    }
    if (!formData.lastName.trim()) {
      setErrorMessage('Please enter your last name')
      setFormState('error')
      return false
    }
    if (!formData.email.trim()) {
      setErrorMessage('Please enter your email address')
      setFormState('error')
      return false
    }
    if (!isValidEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address')
      setFormState('error')
      return false
    }
    if (!formData.cellNumber.trim()) {
      setErrorMessage('Please enter your cell number')
      setFormState('error')
      return false
    }
    if (!formData.linkedinUrl.trim()) {
      setErrorMessage('Please enter your LinkedIn URL')
      setFormState('error')
      return false
    }
    if (!formData.timezone) {
      setErrorMessage('Please select your timezone')
      setFormState('error')
      return false
    }
    if (!formData.locationPreference) {
      setErrorMessage('Please select your location preference')
      setFormState('error')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setFormState('submitting')
    setErrorMessage('')

    // Build the Sanity job URL
    const sanityJobUrl = `https://magnet-website.sanity.studio/structure/job;${selectedJob?._id}`

    try {
      const response = await fetch('/api/applicants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobId: selectedJob?._id || '',
          jobSlug: selectedJobSlug,
          jobTitle: selectedJob?.title || '',
          sanityJobUrl,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          cellNumber: formData.cellNumber,
          linkedinUrl: formData.linkedinUrl,
          resumeUrl: formData.resumeUrl || null,
          timezone: formData.timezone,
          locationPreference: formData.locationPreference,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit application')
      }

      setFormState('success')
    } catch {
      setFormState('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      cellNumber: '',
      linkedinUrl: '',
      resumeUrl: '',
      timezone: '',
      locationPreference: '',
    })
    setSelectedJobSlug('')
    setFormState('idle')
    setErrorMessage('')
  }

  const isDisabled = formState === 'submitting'

  return (
    <section className="min-h-screen py-16">
      <Container>
        <div className="mb-12">
          <Heading>Apply for a position</Heading>
          <Text size="lg" className="mt-4 max-w-2xl">
            Join our team and help brands build stronger market positions. Fill out the form below and we&apos;ll be in
            touch.
          </Text>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[300px_1fr] lg:gap-16">
          {/* Left Column - Job Selection */}
          <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:h-fit">
            <div className="flex flex-col gap-2">
              <Label htmlFor="job" required>
                Position
              </Label>
              <Select
                id="job"
                value={selectedJobSlug}
                onChange={(e) => handleJobChange(e.target.value)}
                disabled={isDisabled || formState === 'success'}
                hasError={formState === 'error' && !selectedJobSlug}
              >
                <option value="">Select a position</option>
                {jobs.map((job) => (
                  <option key={job._id} value={job.slug.current}>
                    {job.title}
                  </option>
                ))}
              </Select>
            </div>

            {selectedJob && (
              <div className="flex flex-col gap-4 rounded-lg bg-oxblood/5 p-4 dark:bg-white/5">
                <div className="flex flex-col gap-1">
                  <span className="text-xs/6 font-semibold uppercase tracking-wide text-oxblood/60 dark:text-coral/60">
                    Department
                  </span>
                  <span className="text-sm/7 text-oxblood dark:text-coral">{selectedJob.department.title}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs/6 font-semibold uppercase tracking-wide text-oxblood/60 dark:text-coral/60">
                    Type
                  </span>
                  <span className="text-sm/7 text-oxblood dark:text-coral">{selectedJob.jobType.title}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs/6 font-semibold uppercase tracking-wide text-oxblood/60 dark:text-coral/60">
                    Locations
                  </span>
                  <div className="flex flex-col gap-0.5">
                    {selectedJob.locations.map((location) => (
                      <span key={location._id} className="text-sm/7 text-oxblood dark:text-coral">
                        {location.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </aside>

          {/* Right Column - Application Form */}
          <div className="rounded-xl bg-olive-950/2.5 p-6 sm:p-8 dark:bg-white/5">
            {formState === 'success' ? (
              <div className="flex flex-col items-center gap-6 py-8 text-center">
                <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <CheckmarkIcon className="size-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex flex-col gap-2">
                  <Subheading>Application submitted!</Subheading>
                  <Text className="text-pretty">
                    Thank you for applying to join Magnet. We&apos;ll review your application and get back to you soon.
                  </Text>
                </div>
                <Button onClick={handleReset} color="dark/light">
                  Submit another application
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-oxblood dark:text-ember">Your information</h2>
                  <p className="mt-2 text-sm text-oxblood/70 dark:text-coral/70">
                    All fields marked with an asterisk are required.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name Row */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="firstName" required>
                        First name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        placeholder="Jane"
                        required
                        disabled={isDisabled}
                        hasError={formState === 'error' && !formData.firstName.trim()}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" required>
                        Last name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        placeholder="Smith"
                        required
                        disabled={isDisabled}
                        hasError={formState === 'error' && !formData.lastName.trim()}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" required>
                      Email address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="jane@example.com"
                      required
                      disabled={isDisabled}
                      hasError={formState === 'error' && !formData.email.trim()}
                    />
                  </div>

                  {/* Cell Number */}
                  <div>
                    <Label htmlFor="cellNumber" required>
                      Cell number
                    </Label>
                    <Input
                      id="cellNumber"
                      name="cellNumber"
                      type="tel"
                      value={formData.cellNumber}
                      onChange={(e) => handleChange('cellNumber', e.target.value)}
                      placeholder="(555) 123-4567"
                      required
                      disabled={isDisabled}
                      hasError={formState === 'error' && !formData.cellNumber.trim()}
                    />
                  </div>

                  {/* LinkedIn URL */}
                  <div>
                    <Label htmlFor="linkedinUrl" required>
                      LinkedIn URL
                    </Label>
                    <Input
                      id="linkedinUrl"
                      name="linkedinUrl"
                      type="url"
                      value={formData.linkedinUrl}
                      onChange={(e) => handleChange('linkedinUrl', e.target.value)}
                      placeholder="https://linkedin.com/in/janesmith"
                      required
                      disabled={isDisabled}
                      hasError={formState === 'error' && !formData.linkedinUrl.trim()}
                    />
                  </div>

                  {/* Resume/Portfolio URL (Optional) */}
                  <div>
                    <Label htmlFor="resumeUrl">Resume / Portfolio URL</Label>
                    <Input
                      id="resumeUrl"
                      name="resumeUrl"
                      type="url"
                      value={formData.resumeUrl}
                      onChange={(e) => handleChange('resumeUrl', e.target.value)}
                      placeholder="https://yourportfolio.com"
                      disabled={isDisabled}
                    />
                  </div>

                  {/* Timezone */}
                  <div>
                    <Label htmlFor="timezone" required>
                      Timezone
                    </Label>
                    <Select
                      id="timezone"
                      value={formData.timezone}
                      onChange={(e) => handleChange('timezone', e.target.value)}
                      required
                      disabled={isDisabled}
                      hasError={formState === 'error' && !formData.timezone}
                    >
                      <option value="">Select your timezone</option>
                      {TIMEZONES.map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      ))}
                    </Select>
                  </div>

                  {/* Location Preference */}
                  <div>
                    <Label htmlFor="locationPreference" required>
                      Location preference
                    </Label>
                    <Select
                      id="locationPreference"
                      value={formData.locationPreference}
                      onChange={(e) => handleChange('locationPreference', e.target.value)}
                      required
                      disabled={isDisabled || !selectedJobSlug}
                      hasError={formState === 'error' && !formData.locationPreference}
                    >
                      <option value="">
                        {selectedJobSlug ? 'Select your preferred location' : 'Select a position first'}
                      </option>
                      {availableLocations.map((location) => (
                        <option key={location._id} value={location.title}>
                          {location.title}
                        </option>
                      ))}
                    </Select>
                  </div>

                  {/* Error Message */}
                  {formState === 'error' && errorMessage && (
                    <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:bg-rose-900/30 dark:text-rose-200">
                      <AlertTriangleIcon className="size-5 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button type="submit" size="lg" disabled={isDisabled} className="w-full sm:w-auto">
                    {formState === 'submitting' ? 'Submitting...' : 'Submit application'}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

