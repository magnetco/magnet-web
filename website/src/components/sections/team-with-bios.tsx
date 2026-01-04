import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Eyebrow } from '../elements/eyebrow'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'

export function TeamMemberWithBio({
  img,
  name,
  role,
  bio,
  className,
  ...props
}: {
  img: ReactNode
  name: ReactNode
  role: ReactNode
  bio: ReactNode
} & ComponentProps<'article'>) {
  return (
    <article className={clsx('grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-10', className)} {...props}>
      <div className="aspect-3/4 w-full max-w-[280px] overflow-hidden rounded-sm outline -outline-offset-1 outline-black/5 *:size-full *:object-cover dark:outline-white/5">
        {img}
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <h3 className="text-lg font-semibold text-oxblood dark:text-ember">{name}</h3>
          <p className="text-sm text-oxblood/80 dark:text-coral/80">{role}</p>
        </div>
        <div className="text-base/7 text-oxblood dark:text-coral">{bio}</div>
      </div>
    </article>
  )
}

export function TeamWithBios({
  eyebrow,
  headline,
  subheadline,
  children,
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline?: ReactNode
  subheadline?: ReactNode
} & ComponentProps<'section'>) {
  return (
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
        <div className="flex flex-col gap-16 divide-y divide-oxblood/10 dark:divide-coral/10">
          {children}
        </div>
      </Container>
    </section>
  )
}

export function TeamMemberCard({
  img,
  name,
  role,
  className,
  ...props
}: {
  img: ReactNode
  name: ReactNode
  role: ReactNode
} & ComponentProps<'li'>) {
  return (
    <li className={clsx('flex flex-col gap-4 text-sm/7', className)} {...props}>
      <div className="aspect-3/4 w-full overflow-hidden rounded-sm outline -outline-offset-1 outline-black/5 *:size-full *:object-cover dark:outline-white/5">
        {img}
      </div>
      <div>
        <p className="font-semibold text-oxblood dark:text-ember">{name}</p>
        <p className="text-oxblood/80 dark:text-coral/80">{role}</p>
      </div>
    </li>
  )
}

export function TeamGrid({
  eyebrow,
  headline,
  subheadline,
  columns = 4,
  children,
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline?: ReactNode
  subheadline?: ReactNode
  columns?: 3 | 4
} & ComponentProps<'section'>) {
  return (
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
            'grid grid-cols-2 gap-x-4 gap-y-10',
            columns === 3 && 'md:grid-cols-3',
            columns === 4 && 'md:grid-cols-3 lg:grid-cols-4',
          )}
        >
          {children}
        </ul>
      </Container>
    </section>
  )
}

