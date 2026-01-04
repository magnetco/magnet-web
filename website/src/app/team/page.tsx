import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { ChevronIcon } from '@/components/icons/chevron-icon'
import { CallToActionSimple } from '@/components/sections/call-to-action-simple'
import { HeroSimpleLeftAligned } from '@/components/sections/hero-simple-left-aligned'
import { TeamCardGrid, type TeamMember } from '@/components/sections/team-card-grid'

const leadershipTeam: TeamMember[] = [
  {
    id: 'gavin-hall',
    name: 'Gavin Hall',
    role: 'CEO & Creative Director',
    image: '/img/avatars/1-h-1000-w-800.webp',
    bio: (
      <>
        <p>
          Our founder studied architecture before falling in love with the web — a shift that sparked two decades of
          designing and building high-performance platforms with precision, purpose, and a systems mindset. Since
          launching Magnet in 2004, he's led digital projects across Europe, the Middle East, and North America,
          scaling teams and crafting platforms for ambitious brands.
        </p>
        <p>
          A strategist at heart and designer by instinct, he shapes the Foundation phase — ensuring every project
          begins with clear positioning, coherent narrative, and technical architecture that supports growth. Now based
          in Cincinnati, he remains joyfully obsessed with mountains, snowboarding, and medium roast single-origin
          coffee.
        </p>
      </>
    ),
  },
  {
    id: 'sarah-littlefield',
    name: 'Sarah Littlefield',
    role: 'Chief Strategy Officer',
    image: '/img/avatars/2-h-1000-w-800.webp',
    bio: (
      <>
        <p>
          Cornell-educated and committed to human-centered design, Sarah blends strategic thinking, clear
          communication, and UX insight to help organizations simplify complexity and connect with the people they
          serve.
        </p>
        <p>
          With a background in healthcare, education, and the nonprofit world, she's led large-scale digital
          initiatives for St. Elizabeth Healthcare and McGraw Hill Education — bringing clarity, alignment, and purpose
          to every project. She leads our messaging systems and ICP research, translating customer motivations into
          frameworks that guide everything from homepage copy to paid campaigns. She's also the type who can solve a
          content challenge and write a jingle — often in the same meeting.
        </p>
      </>
    ),
  },
  {
    id: 'andrew-gaynor',
    name: 'Andrew Gaynor',
    role: 'Production Director',
    image: '/img/avatars/3-h-1000-w-800.webp',
    bio: (
      <>
        <p>
          Our endlessly dependable cornerstone of Magnet's operations plays a vital role in driving projects forward —
          translating client needs into clear production plans, aligning teams, and ensuring nothing slips through the
          cracks.
        </p>
        <p>
          With a sharp eye for scope, timelines, and risk, Andrew brings structure and calm to fast-moving work. From
          Discovery through Launch, he orchestrates the Acceleration phase — making sure that offers, landing
          experiences, and sales enablement assets ship on time and at quality. He's a skilled communicator and trusted
          liaison, helping clients feel supported while keeping our remote team focused and in sync. Thoughtful,
          organized, and unflappable, he's one of the key reasons things at Magnet just work.
        </p>
      </>
    ),
  },
  {
    id: 'mike-heggie',
    name: 'Mike Heggie',
    role: 'Chief Technology Officer',
    image: '/img/avatars/4-h-1000-w-800.webp',
    bio: (
      <>
        <p>
          Magnet's quietly brilliant technical lead, Mike is a calm, collaborative thinker with a gift for turning
          complexity into clarity. He leads the architecture and execution of our most demanding web projects, always
          favoring thoughtful, client-first solutions over flashy tech.
        </p>
        <p>
          With deep experience in full-stack development and systems integration, he ensures our Digital Experience
          work is fast, accessible, and built for long-term maintainability. Every tracking layer, every CRM
          integration, every conversion flow runs through his exacting standards. Now based in Salt Lake City, Mike
          spends his time outside work exploring the mountains and refining no-code workflows — all while lending
          steady insight to every technical decision we make.
        </p>
      </>
    ),
  },
  {
    id: 'alex-topal',
    name: 'Alex Topal',
    role: 'Engineering Director',
    image: '/img/avatars/5-h-1000-w-800.webp',
    bio: (
      <>
        <p>
          With over 24 years of experience in advanced software engineering, Alex brings deep technical insight and
          thoughtful leadership to every project he touches. As Magnet's most senior engineer, he's spent the last 15
          years designing scalable systems, solving complex challenges, and guiding our development team through
          everything from web architecture to DevOps and data infrastructure.
        </p>
        <p>
          A former computer science professor with two master's degrees, Alex combines academic depth with real-world
          execution. Whether architecting robust digital platforms or mentoring engineers, he approaches every problem
          with clarity, precision, and a solutions-first mindset — making him an essential force behind Magnet's
          technical success.
        </p>
      </>
    ),
  },
  {
    id: 'michael-casner',
    name: 'Michael Casner',
    role: 'Marketing Director',
    image: '/img/avatars/6-h-1000-w-800.webp',
    bio: (
      <>
        <p>
          Based in Southern California, Michael leads our Activation phase — turning on demand through paid media,
          search marketing, and performance campaigns. Specializing in PPC advertising, SEO, and geo-targeting, he
          combines analytical insight with strategic vision to deliver measurable growth.
        </p>
        <p>
          From channel strategy through scaling, he ensures every campaign is structured for predictable acquisition
          and continuous optimization. Known for creative problem-solving and process improvements, Michael
          consistently drives operational efficiency, increases profitability, and mentors teams to achieve both
          company objectives and their own professional development goals.
        </p>
      </>
    ),
  },
]

const extendedTeam: TeamMember[] = [
  {
    id: 'eugene-vasylenko',
    name: 'Eugene Vasylenko',
    role: 'App Developer',
    image: '/img/avatars/7-h-1000-w-800.webp',
    bio: (
      <>
        <p>
          Our principled and versatile app developer with over 20 years of experience, based in London, UK, with a
          sharp command of both mobile and web technologies. Equally fluent in Swift, Flutter, PHP, Python, and
          JavaScript, he builds scalable, performant applications across platforms — always with clean architecture and
          long-term maintainability in mind.
        </p>
        <p>
          With a deep respect for engineering fundamentals and a keen eye on emerging tech, Eugene is also at the
          forefront of integrating AI-assisted development tools into his workflow. He brings rigor, speed, and
          forward-thinking innovation to every build — from native mobile apps to complex web systems — without ever
          compromising on code quality or clarity.
        </p>
      </>
    ),
  },
  {
    id: 'nazar-bodak',
    name: 'Nazar Bodak',
    role: 'Frontend Developer',
    image: '/img/avatars/8-h-1000-w-800.webp',
    bio: (
      <>
        <p>
          Our frontend developer is known for pairing deep technical expertise with high spirits and an easy sense of
          humor. Originally from Lviv and now based in the U.S., he brings a rare mix of professionalism, warmth, and
          sharp engineering talent to every project.
        </p>
        <p>
          Fluent in TypeScript, HTML, and CSS, Nazar builds scalable APIs, clean interfaces, and reliable systems that
          hold up under pressure. He's equally comfortable architecting complex backend services or polishing frontend
          details — always with a clear eye for user experience and performance. Whether shipping code or lifting team
          morale, Nazar leads with care, clarity, and craft.
        </p>
      </>
    ),
  },
  {
    id: 'martin-stark',
    name: 'Martin Stark',
    role: 'Design Lead',
    image: '/img/avatars/10-size-160.webp',
    bio: (
      <>
        <p>
          With over 15 years of industry experience crafting digital interfaces that prioritize clarity, restraint, and
          purpose. Rooted in the belief that the best design disappears into the experience, his work reflects a deep
          understanding of hierarchy, whitespace, and human attention.
        </p>
        <p>
          Martin favors systems over decoration, and timeless design principles over fleeting trends — always aiming to
          make the complex feel simple. His approach to UI Design ensures our Digital Experience work is not just
          beautiful, but strategically structured for conversion and long-term brand coherence.
        </p>
      </>
    ),
  },
  {
    id: 'irakli-lolashvili',
    name: 'Irakli Lolashvili',
    role: 'Design Lead',
    image: '/img/avatars/11-size-160.webp',
    bio: (
      <>
        <p>
          Our meticulous product designer brings a touch of magic to Magnet. Originally from Tbilisi, Georgia, Irakli
          has an incredible eye for detail and a passion for crafting UI/UX designs that are both clear and
          delightfully intuitive. His absolute attention to every pixel ensures that our products are not just
          beautiful but also a joy to use.
        </p>
        <p>
          With his friendly approach and innovative thinking, Irakli turns complex ideas into simple, engaging
          experiences. His work on UX Architecture and UI Design shapes how users flow through our digital experiences
          — from first touch to conversion.
        </p>
      </>
    ),
  },
  {
    id: 'george-zhulov',
    name: 'George Zhulov',
    role: 'Senior Frontend Engineer',
    image: '/img/avatars/12-size-160.webp',
    bio: (
      <>
        <p>
          Our senior frontend engineer with over a decade of experience transforming complex systems into clear,
          intuitive user interfaces. With a background spanning healthcare, finance, and telecom, he's led frontend
          efforts for high-load applications and B2B platforms used in over 40 global markets. Calm under pressure and
          deeply product-minded, George brings precision and empathy to every technical decision — always building with
          the user in mind.
        </p>
        <p>
          Equally skilled in systems architecture and team mentorship, he excels at scaling codebases, improving
          workflows, and elevating engineering standards across the board. Based in Cannes, France, George is driven by
          a fascination with systems thinking — from development pipelines to the psychology of decision-making. When
          he's not writing code, he's likely exploring investment strategies, tinkering with automated trading models,
          or pondering the deeper architecture of human will.
        </p>
      </>
    ),
  },
  {
    id: 'katie-zeek',
    name: 'Katie Zeek',
    role: 'Sales Director',
    image: '/img/avatars/13-size-160.webp',
    bio: (
      <>
        <p>
          Our high-energy, high-empathy sales leader thrives at the intersection of storytelling, systems, and client
          success. She brings a decade of experience helping creative and digital teams build lasting relationships
          with the right clients — not just more of them.
        </p>
        <p>
          Her approach is equal parts relational and operational: aligning Magnet's growth strategy with what prospects
          actually need, and equipping the team with better processes, messaging, and momentum. She's worked with
          startups, agencies, and global brands alike — always focusing on clarity, trust, and value. When she's not
          deep in leading a pitch, you can find her traveling, trying a new restaurant, or perfecting her workflow
          setup.
        </p>
      </>
    ),
  },
  {
    id: 'andrew-skrypnik',
    name: 'Andrew Skrypnik',
    role: 'Full-Stack Developer',
    image: '/img/avatars/14-size-160.webp',
    bio: (
      <>
        <p>
          Our seasoned full-stack engineer with over a decade of experience specializing in PHP, Laravel, and Magento.
          Known for his analytical mindset and calm precision, he thrives in complex enterprise environments — whether
          optimizing legacy systems, scaling dev teams, or driving measurable improvements across codebases and
          workflows.
        </p>
        <p>
          With a strong foundation in backend architecture and a pragmatic approach to technical leadership, Andrew
          brings clarity to large-scale challenges. He's especially skilled at process optimization and KPI-driven
          delivery, combining clean engineering practices with a deep understanding of business impact. Relentlessly
          curious and quietly exacting, Andrew continues to evolve his craft while helping teams deliver better
          software at scale.
        </p>
      </>
    ),
  },
  {
    id: 'nathan-metzler',
    name: 'Nathan Metzler',
    role: 'Brand Designer',
    image: '/img/avatars/15-size-160.webp',
    bio: (
      <>
        <p>
          Nathan specializes in the intersection of typography and brand identity. With a background in lettering,
          wordmark design, and custom type development, he brings a distinct visual language to every project — helping
          shape brands that are not only seen, but felt.
        </p>
        <p>
          From early moodboards and sketch exploration to vector refinement and typographic systems, he plays a key
          role in our Identity Design and Systemization work — transforming abstract brand ideas into cohesive,
          high-impact visual identities. His deep understanding of how type communicates allows him to anchor each
          design in a clear, intentional voice — one that extends seamlessly across websites, interfaces, packaging,
          and beyond.
        </p>
      </>
    ),
  },
]

export default function Page() {
  return (
    <>
      {/* Hero */}
      <HeroSimpleLeftAligned
        id="hero"
        headline="Craftsmanship elevated by a culture of quality"
        subheadline={
          <p>
            We're a cross-functional team of strategists, designers, and engineers who build unified digital systems.
            Every discipline works together — from Foundation through Retention — to deliver outcomes, not outputs.
          </p>
        }
      />

      {/* Leadership Team */}
      <TeamCardGrid
        id="leadership"
        eyebrow="Leadership"
        headline="The people behind the method"
        subheadline={
          <p>
            Our leadership team combines strategic vision with deep execution experience. We've spent decades building
            systems that connect brand, web, and growth into a coherent whole.
          </p>
        }
        members={leadershipTeam}
        columns={3}
        cardSize="large"
      />

      {/* Extended Team */}
      <TeamCardGrid
        id="team"
        eyebrow="The team"
        headline="Experts across every discipline"
        subheadline={
          <p>
            From brand designers to frontend engineers, our team brings depth across the full spectrum of digital.
            Every project benefits from specialists who understand how their work connects to the larger system.
          </p>
        }
        members={extendedTeam}
        columns={4}
      />

      {/* Careers CTA */}
      <CallToActionSimple
        id="careers"
        headline="Join our growing team"
        subheadline={
          <p>
            We're a remote-first agency that believes diversity, equity, and inclusion make our work and each
            individual better. Competitive pay, flexible hours, health insurance, retirement contributions, parental
            and sabbatical leave, plus ongoing education come standard.
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
