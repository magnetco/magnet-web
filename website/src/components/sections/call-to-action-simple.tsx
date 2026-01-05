import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Eyebrow } from '../elements/eyebrow'
import { GridBgSection, sectionPaddingClasses } from '../elements/grid-bg'
import { Subheading } from '../elements/subheading'
import { Text } from '../elements/text'

export function CallToActionSimple({
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
  subheadline?: ReactNode
  cta?: ReactNode
  withGridBg?: boolean
} & ComponentProps<'section'>) {
  const content = (
    <Container className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <div className="flex max-w-4xl flex-col gap-2">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {typeof headline === 'string' ? <Subheading>{headline}</Subheading> : headline}
        </div>
        {subheadline && <Text className="flex max-w-3xl flex-col gap-4 text-pretty">{subheadline}</Text>}
      </div>
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
