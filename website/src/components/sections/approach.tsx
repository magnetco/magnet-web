import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Section } from '../elements/section'
import { Bullet } from '../elements/bullet'
import { Link } from '../elements/link'

export function ApproachStage({
  title,
  description,
  items,
  className,
  ...props
}: {
  title: ReactNode
  description: ReactNode
  items: ReactNode
} & ComponentProps<'div'>) {
  return (
    <div className={clsx('flex flex-col gap-4', className)} {...props}>
      <h3 className="text-xl/8 font-semibold tracking-tight">{title}</h3>
      <p className="text-sm/7">{description}</p>
      <ul className="mt-2 flex flex-col gap-2.5 leading-none" role="list">
        {items}
      </ul>
    </div>
  )
}

export function ApproachItem({ 
  children, 
  href,
  ...props 
}: { href?: string } & ComponentProps<'li'>) {
  const content = (
    <>
      <Bullet className="mt-[0.5rem] shrink-0" />
      <span className="flex-1 leading-7">{children}</span>
    </>
  )

  return (
    <li className="flex gap-2.5 text-sm leading-7" {...props}>
      {href ? (
        <Link href={href} className="flex gap-2.5">
          {content}
        </Link>
      ) : (
        content
      )}
    </li>
  )
}

export function Approach({
  children,
  ...props
}: { children: ReactNode } & Omit<ComponentProps<typeof Section>, 'children'>) {
  return (
    <Section {...props}>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
    </Section>
  )
}

