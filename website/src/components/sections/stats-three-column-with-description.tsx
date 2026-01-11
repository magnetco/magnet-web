import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Eyebrow } from '../elements/eyebrow'
import { GridBgSection, sectionPaddingClasses } from '../elements/grid-bg'
import { Subheading } from '../elements/subheading'

export function Stat({
  stat,
  text,
  className,
  ...props
}: { stat: ReactNode; text: ReactNode } & ComponentProps<'div'>) {
  return (
    <div className={clsx('rounded-xl bg-olive-950/2.5 p-6 dark:bg-white/5', className)} {...props}>
      <div className="text-2xl/10 tracking-tight text-oxblood dark:text-ember">{stat}</div>
      <p className="mt-2 text-sm/7 text-oxblood dark:text-coral">{text}</p>
    </div>
  )
}

export function StatsThreeColumnWithDescription({
  eyebrow,
  heading,
  description,
  children,
  className,
  withGridBg = false,
  ...props
}: {
  eyebrow?: ReactNode
  heading: ReactNode
  description: ReactNode
  withGridBg?: boolean
} & ComponentProps<'section'>) {
  const content = (
    <Container>
      <div className="relative flex flex-col gap-10 sm:gap-16">
        <hr className="absolute inset-x-0 -top-16 border-t border-olive-950/10 dark:border-white/10" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <Subheading>{heading}</Subheading>
          </div>
          <div className="flex max-w-xl flex-col gap-4 text-base/7 text-oxblood dark:text-coral">
            {description}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">{children}</div>
      </div>
    </Container>
  )

  if (withGridBg) {
    return (
      <section className={className} {...props}>
        <GridBgSection showBottomBorder={true} withPadding>
          {content}
        </GridBgSection>
      </section>
    )
  }

  return (
    <section className={clsx(sectionPaddingClasses, className)} {...props}>
      {content}
    </section>
  )
}
