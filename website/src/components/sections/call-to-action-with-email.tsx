'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { clsx } from 'clsx/lite'
import Image from 'next/image'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Button } from '../elements/button'
import { Input } from '../elements/input'
import { AlertTriangleIcon } from '../icons/alert-triangle-icon'
import { CheckmarkIcon } from '../icons/checkmark-icon'
import { SparklesIcon } from '../icons/sparkles-icon'
import { isValidEmail } from '@/lib/validation'

const keyStaff = [
  { name: 'Gavin Hall', role: 'CEO', image: '/img/avatars/1-h-1000-w-800.webp' },
  { name: 'Sarah Littlefield', role: 'Strategy', image: '/img/avatars/2-h-1000-w-800.webp' },
  { name: 'Andrew Gaynor', role: 'Production', image: '/img/avatars/3-h-1000-w-800.webp' },
  { name: 'Mike Heggie', role: 'Technology', image: '/img/avatars/4-h-1000-w-800.webp' },
  { name: 'Michael Casner', role: 'Marketing', image: '/img/avatars/6-h-1000-w-800.webp' },
]

function AvatarStack() {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex -space-x-3">
        {keyStaff.map((person, index) => (
          <div
            key={person.name}
            className="relative size-12 overflow-hidden rounded-full ring-[3px] ring-ember transition-transform duration-300 hover:z-50 hover:scale-110"
            style={{ zIndex: keyStaff.length - index }}
            title={`${person.name} — ${person.role}`}
          >
            <Image
              src={person.image}
              alt={person.name}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      <p className="text-sm text-white/70">
        Your dedicated leadership team — this is who you'll hear from first.
      </p>
    </div>
  )
}

function Guarantee({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-white/90">
      <span className="flex size-4 shrink-0 items-center justify-center text-white">
        {icon}
      </span>
      <span>{text}</span>
    </div>
  )
}

export function CallToActionWithEmail({
  headline,
  subheadline,
  className,
  ...props
}: {
  headline: ReactNode
  subheadline?: ReactNode
} & ComponentProps<'section'>) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    router.push(`/contact?email=${encodeURIComponent(email)}`)
  }

  return (
    <section 
      className={clsx('relative overflow-hidden bg-ember py-20 lg:py-28', className)} 
      {...props}
    >
      {/* Grid pattern background */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />
      
      {/* Gradient overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10" />
      
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column: Content and CTA */}
          <div className="flex flex-col gap-8">
            {/* Headline */}
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl/10 font-semibold tracking-tight text-white text-balance sm:text-4xl/[1.15]">
                {headline}
              </h2>
              {subheadline && (
                <p className="max-w-md text-base/7 text-white/80">
                  {subheadline}
                </p>
              )}
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex-1 sm:max-w-xs">
                  <label htmlFor="cta-email" className="sr-only">
                    Email address
                  </label>
                  <Input
                    id="cta-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError('')
                    }}
                    placeholder="you@company.com"
                    hasError={!!error}
                    className="border-white/25 bg-white/10 py-3 text-white placeholder:text-white/50 focus:border-white focus:ring-white/20"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg"
                  color="light"
                  className="shrink-0"
                >
                  Book a strategy call
                </Button>
              </div>
              {error && (
                <div className="flex items-center gap-2 text-sm text-white">
                  <AlertTriangleIcon className="size-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </form>

            {/* Guarantees */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Guarantee 
                icon={<CheckmarkIcon className="size-3.5" />}
                text="Free strategy consultation"
              />
              <Guarantee 
                icon={<SparklesIcon className="size-3.5" />}
                text="No commitment required"
              />
            </div>
          </div>

          {/* Right column: Testimonial and Avatar Stack */}
          <div className="flex flex-col gap-8">
            {/* Testimonial */}
            <figure className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm sm:p-8">
              <blockquote className="flex flex-col gap-3">
                <p className="text-lg/7 font-medium text-white sm:text-xl/8">
                  "Magnet transformed our marketing from scattered campaigns into a cohesive system."
                </p>
                <p className="text-base/7 text-white/75">
                  "Within 6 months, our qualified leads increased <span className="font-semibold text-white">340%</span> and our cost per acquisition dropped by half."
                </p>
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
                <div className="size-11 overflow-hidden rounded-full ring-2 ring-white/20">
                  <Image 
                    src="/img/avatars/10-size-160.webp"
                    alt="Sarah Chen"
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-white">Sarah Chen</p>
                  <p className="text-sm text-white/60">VP Marketing, TechCorp</p>
                </div>
              </figcaption>
            </figure>

            {/* Avatar Stack */}
            <AvatarStack />
          </div>
        </div>
      </Container>
    </section>
  )
}
