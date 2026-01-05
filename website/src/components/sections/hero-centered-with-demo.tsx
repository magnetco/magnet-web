import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { GridBgSection, sectionPaddingClasses } from '../elements/grid-bg'
import { Heading } from '../elements/heading'
import { Text } from '../elements/text'

export function HeroCenteredWithDemo({
  eyebrow,
  headline,
  subheadline,
  cta,
  demo,
  footer,
  className,
  withGridBg = false,
  ...props
}: {
  eyebrow?: ReactNode
  headline: ReactNode
  subheadline: ReactNode
  cta?: ReactNode
  demo?: ReactNode
  footer?: ReactNode
  withGridBg?: boolean
} & ComponentProps<'section'>) {
  // If headline is a string, wrap in Heading. Otherwise, render as-is (for AnimatedHeadline etc.)
  const headlineElement =
    typeof headline === 'string' ? <Heading className="max-w-5xl text-center">{headline}</Heading> : headline

  const content = (
    <Container className="flex flex-col gap-16">
      <div className="flex flex-col items-center gap-32">
        <div className="flex flex-col items-center gap-6">
          {eyebrow}
          <div className="max-w-5xl text-center">{headlineElement}</div>
          <Text size="lg" className="flex max-w-3xl flex-col gap-4 text-center">
            {subheadline}
          </Text>
          {cta}
        </div>
        {demo}
      </div>
      {footer}
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
