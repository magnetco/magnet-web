import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { GridBgSection, sectionPaddingClasses } from '../elements/grid-bg'

export function TestimonialLargeQuote({
  quote,
  img,
  name,
  byline,
  className,
  withGridBg = false,
  ...props
}: {
  quote: ReactNode
  img: ReactNode
  name: ReactNode
  byline: ReactNode
  withGridBg?: boolean
} & ComponentProps<'section'>) {
  const content = (
    <Container>
      <figure className="text-oxblood dark:text-ember">
        <blockquote className={`mx-auto flex max-w-240 flex-col gap-4 text-center font-display text-[2rem]/12 tracking-tight text-pretty *:first:before:content-['"'] *:last:after:content-['"'] sm:text-5xl/16`}>
          {quote}
        </blockquote>
        <figcaption className="mt-16 flex flex-col items-center">
          <div className="flex size-12 overflow-hidden rounded-full outline -outline-offset-1 outline-black/5 *:size-full *:object-cover dark:outline-white/5">
            {img}
          </div>
          <p className="mt-4 text-center text-sm/6 font-semibold">{name}</p>
          <p className="text-center text-sm/6 text-oxblood dark:text-coral">{byline}</p>
        </figcaption>
      </figure>
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
