import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { HeroSimpleLeftAligned } from '@/components/sections/hero-simple-left-aligned'
import { TeamEditorial, type TeamEditorialMember } from '@/components/sections/team-editorial'
import { client } from '@/lib/sanity/client'
import { teamMembersQuery } from '@/lib/sanity/queries'

export default async function Page() {
  // Fetch team members from Sanity
  const teamMembers = await client.fetch<TeamEditorialMember[]>(teamMembersQuery)

  return (
    <>
      {/* Hero */}
      <HeroSimpleLeftAligned
        id="hero"
        withGridBg
        headline="Craftsmanship elevated by a culture of quality"
        subheadline={
          <p>
            We're a cross-functional team of strategists, designers, and engineers who build unified digital systems.
            Every discipline works together — from Foundation through Retention — to deliver outcomes, not outputs.
          </p>
        }
      />

      {/* Team */}
      <TeamEditorial
        id="team"
        eyebrow="The team"
        headline="Experts across every discipline"
        subheadline={
          <p>
            From brand designers to frontend engineers, our team brings depth across the full spectrum of digital. Every
            project benefits from specialists who understand how their work connects to the larger system.
          </p>
        }
        members={teamMembers}
      />

      {/* Careers CTA */}
      <CallToActionSimple
        id="careers"
        headline="Join our growing team"
        subheadline={
          <p>
            We're a remote-first agency that believes diversity, equity, and inclusion make our work and each individual
            better. Competitive pay, flexible hours, health insurance, retirement contributions, parental and sabbatical
            leave, plus ongoing education come standard.
          </p>
        }
        cta={
          <div className="flex items-center gap-4">
            <ButtonLink href="/careers" size="lg">
              View open positions
            </ButtonLink>

            <PlainButtonLink href="/contact" size="lg">
              Start a conversation <ChevronIcon />
            </PlainButtonLink>
          </div>
        }
      />
    </>
  )
}
