import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Document } from '../elements/document'
import { Eyebrow } from '../elements/eyebrow'
import { GridBgSection, sectionPaddingClasses } from '../elements/grid-bg'
import { Heading } from '../elements/heading'
import { Text } from '../elements/text'

export function DocumentLeftAligned({
  eyebrow,
  headline,
  subheadline,
  className,
  children,
  withGridBg = false,
  ...props
}: {
  eyebrow?: ReactNode
  headline: ReactNode
  subheadline?: ReactNode
  withGridBg?: boolean
} & ComponentProps<'section'>) {
  const content = (
    <Container className="flex flex-col gap-10 sm:gap-16">
      <div className="flex max-w-2xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {typeof headline === 'string' ? <Heading>{headline}</Heading> : headline}
        </div>
        {subheadline && (
          <Text size="lg" className="flex max-w-xl flex-col gap-4">
            {subheadline}
          </Text>
        )}
      </div>
      <Document className="max-w-2xl">{children}</Document>
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
