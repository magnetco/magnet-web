import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Section } from '../elements/section'
import { Bullet } from '../elements/bullet'

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
      <ul className="mt-2 flex flex-col gap-2" role="list">
        {items}
      </ul>
    </div>
  )
}

export function ApproachItem({ children, ...props }: ComponentProps<'li'>) {
  return (
    <li className="flex items-start gap-2 text-sm/7" {...props}>
      <Bullet className="mt-1.5" />
      <span>{children}</span>
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

