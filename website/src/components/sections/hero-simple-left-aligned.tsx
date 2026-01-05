import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { GridBgSection, sectionPaddingClasses } from '../elements/grid-bg'
import { Heading } from '../elements/heading'
import { Text } from '../elements/text'

export function HeroSimpleLeftAligned({
  eyebrow,
  headline,
  subheadline,
  cta,
  className,
  withGridBg = false,
  ...props
}: {
  eyebrow?: ReactNode
  headline: ReactNode
  subheadline: ReactNode
  cta?: ReactNode
  withGridBg?: boolean
} & ComponentProps<'section'>) {
  // If headline is a string, wrap in Heading. Otherwise, render as-is (for AnimatedHeadline etc.)
  const headlineElement =
    typeof headline === 'string' ? <Heading>{headline}</Heading> : headline

  const content = (
    <Container className="flex flex-col gap-6">
      {eyebrow}
      {headlineElement}
      <Text size="lg" className="flex max-w-xl flex-col gap-4">
        {subheadline}
      </Text>
      {cta}
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
