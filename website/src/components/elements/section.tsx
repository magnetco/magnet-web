import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from './container'
import { Eyebrow } from './eyebrow'
import { GridBgSection, sectionPaddingClasses } from './grid-bg'
import { Subheading } from './subheading'
import { Text } from './text'

export function Section({
  eyebrow,
  headline,
  subheadline,
  cta,
  className,
  children,
  withGridBg = false,
  ...props
}: {
  eyebrow?: ReactNode
  headline?: ReactNode
  subheadline?: ReactNode
  cta?: ReactNode
  withGridBg?: boolean
} & ComponentProps<'section'>) {
  // If headline is a string, wrap in Subheading. Otherwise, render as-is (for AnimatedSubheading etc.)
  const headlineElement =
    headline && typeof headline === 'string' ? <Subheading>{headline}</Subheading> : headline

  const content = (
    <Container className="flex flex-col gap-10 sm:gap-16">
      {headline && (
        <div className="flex max-w-2xl flex-col gap-6">
          <div className="flex flex-col gap-2">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {headlineElement}
          </div>
          {subheadline && <Text className="text-pretty">{subheadline}</Text>}
          {cta}
        </div>
      )}
      <div>{children}</div>
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
