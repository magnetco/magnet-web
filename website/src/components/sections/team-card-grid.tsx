'use client'

import { clsx } from 'clsx/lite'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Container } from '../elements/container'
import { Eyebrow } from '../elements/eyebrow'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'
import { CloseIcon } from '../icons/close-icon'

export type TeamMember = {
  id: string
  name: string
  role: string
  image: string
  bio: ReactNode
}

function TeamCard({
  member,
  size = 'default',
  onClick,
}: {
  member: TeamMember
  size?: 'default' | 'large'
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'group flex cursor-pointer flex-col gap-4 text-left transition-transform duration-300 ease-in-out',
        'hover:scale-[1.02] focus-visible:scale-[1.02]',
        'focus-visible:outline-none',
      )}
    >
      <div
        className={clsx(
          'w-full overflow-hidden rounded-sm transition-all duration-300',
          'outline -outline-offset-1 outline-black/5 dark:outline-white/5',
          'group-hover:ring-2 group-hover:ring-ember/30 group-focus-visible:ring-2 group-focus-visible:ring-ember/30',
          size === 'large' ? 'aspect-4/5' : 'aspect-3/4',
        )}
      >
        <Image
          src={member.image}
          alt={member.name}
          width={800}
          height={1000}
          className="size-full object-cover not-dark:bg-white/75 dark:bg-black/75"
        />
      </div>
      <div>
        <p className="font-semibold text-oxblood dark:text-ember">{member.name}</p>
        <p className="text-sm text-oxblood/70 dark:text-coral/70">{member.role}</p>
      </div>
    </button>
  )
}

function BioDrawer({
  member,
  isOpen,
  onClose,
}: {
  member: TeamMember | null
  isOpen: boolean
  onClose: () => void
}) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={member ? `drawer-title-${member.id}` : undefined}
        className={clsx(
          'fixed top-0 right-0 z-50 flex h-full w-full flex-col bg-frost shadow-2xl transition-transform duration-300 ease-in-out sm:w-[480px]',
          'dark:bg-juniper',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {member && (
          <>
            {/* Header */}
            <div className="flex items-center justify-end p-6">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-oxblood/60 transition-colors hover:bg-oxblood/5 hover:text-oxblood dark:text-coral/60 dark:hover:bg-coral/5 dark:hover:text-coral"
                aria-label="Close"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-12">
              {/* Photo */}
              <div className="mb-8 aspect-4/5 w-full overflow-hidden rounded-sm outline -outline-offset-1 outline-black/5 dark:outline-white/5">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={800}
                  height={1000}
                  className="size-full object-cover not-dark:bg-white/75 dark:bg-black/75"
                />
              </div>

              {/* Name & Role */}
              <h2
                id={`drawer-title-${member.id}`}
                className="text-2xl font-semibold text-oxblood dark:text-ember"
              >
                {member.name}
              </h2>
              <p className="mt-1 text-base text-oxblood/70 dark:text-coral/70">{member.role}</p>

              {/* Bio */}
              <div className="mt-6 space-y-4 text-base/7 text-oxblood dark:text-coral">{member.bio}</div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export function TeamCardGrid({
  eyebrow,
  headline,
  subheadline,
  members,
  columns = 4,
  cardSize = 'default',
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline?: ReactNode
  subheadline?: ReactNode
  members: TeamMember[]
  columns?: 2 | 3 | 4
  cardSize?: 'default' | 'large'
} & React.ComponentProps<'section'>) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const openDrawer = useCallback((member: TeamMember) => {
    setSelectedMember(member)
    setIsDrawerOpen(true)
  }, [])

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false)
  }, [])

  return (
    <>
      <section className={clsx('py-16', className)} {...props}>
        <Container className="flex flex-col gap-10 sm:gap-16">
          {headline && (
            <div className="flex max-w-2xl flex-col gap-6">
              <div className="flex flex-col gap-2">
                {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
                <Subheading>{headline}</Subheading>
              </div>
              {subheadline && <Text className="text-pretty">{subheadline}</Text>}
            </div>
          )}
          <ul
            role="list"
            className={clsx(
              'grid gap-x-6 gap-y-10',
              columns === 2 && 'grid-cols-2 md:grid-cols-2 lg:grid-cols-2',
              columns === 3 && 'grid-cols-2 md:grid-cols-3',
              columns === 4 && 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
            )}
          >
            {members.map((member) => (
              <li key={member.id}>
                <TeamCard member={member} size={cardSize} onClick={() => openDrawer(member)} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <BioDrawer member={selectedMember} isOpen={isDrawerOpen} onClose={closeDrawer} />
    </>
  )
}
