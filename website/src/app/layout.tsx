import { ButtonLink } from '@/components/elements/button'
import { ChatWidget } from '@/components/elements/chat-widget'
import { FooterLogo } from '@/components/elements/footer-logo'
import { Main } from '@/components/elements/main'
import { ScrollableLogo } from '@/components/elements/scrollable-logo'
import { Search } from '@/components/elements/search'
import { DevModeProvider, DevModeToolbar, DevModeToggle, DevTopBar, DevInspector } from '@/components/dev'
import { LinkedInIcon } from '@/components/icons/social/linkedin-icon'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  SocialLink,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import {
  NavbarDropdown,
  NavbarDropdownItem,
  NavbarLink,
  NavbarWithLinksActionsAndCenteredLogo,
} from '@/components/sections/navbar-with-links-actions-and-centered-logo'
import { TransitionProvider } from '@/components/transitions'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: [
    {
      path: '../../public/fonts/Geist-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-geist-sans',
  display: 'swap',
})

const geistMono = localFont({
  src: [
    {
      path: '../../public/fonts/GeistMono-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GeistMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GeistMono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Magnet',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
      </head>
      <body>
        <TransitionProvider>
        <DevModeProvider>
          <NavbarWithLinksActionsAndCenteredLogo
            id="navbar"
            withGridBg
            links={
              <>
                <NavbarLink href="/work">Work</NavbarLink>
                <NavbarDropdown label="Industries">
                  <NavbarDropdownItem
                    title="Healthcare"
                    subcopy="HIPAA-compliant digital experiences"
                    href="/industries/healthcare"
                  />
                  <NavbarDropdownItem
                    title="Manufacturing"
                    subcopy="B2B marketing for technical buyers"
                    href="/industries/manufacturing"
                  />
                  <NavbarDropdownItem
                    title="Financial Services"
                    subcopy="Trust-building digital platforms"
                    href="/industries/financial-services"
                  />
                  <NavbarDropdownItem
                    title="Ecommerce"
                    subcopy="Stores that convert and scale"
                    href="/industries/ecommerce"
                  />
                  <NavbarDropdownItem
                    title="Professional Services"
                    subcopy="Lead generation for service firms"
                    href="/industries/professional-services"
                  />
                  <NavbarDropdownItem
                    title="Education"
                    subcopy="Learning platforms that engage"
                    href="/industries/education-technology"
                  />
                  <NavbarDropdownItem
                    title="Nonprofits"
                    subcopy="Impact storytelling that inspires"
                    href="/industries/nonprofits"
                  />
                  <NavbarDropdownItem
                    title="View All Industries"
                    subcopy="Explore our full industry expertise"
                    href="/industries"
                  />
                </NavbarDropdown>
                <NavbarLink href="/engineering">Engineering</NavbarLink>
                <NavbarLink href="/branding">Branding</NavbarLink>
                <NavbarLink href="/websites">Websites</NavbarLink>
                <NavbarLink href="/ads">Paid Ads</NavbarLink>
                <NavbarLink href="/search">Search</NavbarLink>
              </>
            }
            logo={<ScrollableLogo href="/" />}
            actions={
              <>
                <Search />
                <ButtonLink href="/contact">Get started</ButtonLink>
              </>
            }
          />

          <Main>{children}</Main>

          <FooterWithNewsletterFormCategoriesAndSocialIcons
            id="footer"
            cta={<FooterLogo />}
            links={
              <>
                <FooterCategory title="Services">
                  <FooterLink href="/retainer">Full-Service Retainer</FooterLink>
                  <FooterLink href="/engineering">Engineering</FooterLink>
                  <FooterLink href="/websites">Websites</FooterLink>
                  <FooterLink href="/branding">Branding</FooterLink>
                  <FooterLink href="/search">Search Marketing</FooterLink>
                  <FooterLink href="/ads">Paid Ads</FooterLink>
                </FooterCategory>
                <FooterCategory title="Industries">
                  <FooterLink href="/industries/healthcare">Healthcare</FooterLink>
                  <FooterLink href="/industries/manufacturing">Manufacturing</FooterLink>
                  <FooterLink href="/industries/financial-services">Financial Services</FooterLink>
                  <FooterLink href="/industries/ecommerce">Ecommerce</FooterLink>
                  <FooterLink href="/industries">All Industries</FooterLink>
                </FooterCategory>
                <FooterCategory title="Work">
                  <FooterLink href="/work">All Work</FooterLink>
                  <FooterLink href="/work/engineering">Engineering</FooterLink>
                  <FooterLink href="/work/full-funnel">Full-Funnel</FooterLink>
                  <FooterLink href="/work/websites">Websites</FooterLink>
                </FooterCategory>
                <FooterCategory title="Company">
                  <FooterLink href="/team">Team</FooterLink>
                  <FooterLink href="/method">Method</FooterLink>
                  <FooterLink href="/pricing">Pricing</FooterLink>
                  <FooterLink href="/careers">Careers</FooterLink>
                  <FooterLink href="/contact">Contact</FooterLink>
                </FooterCategory>
              </>
            }
            fineprint="© 2025 Magnet Co, LLC"
            socialLinks={
              <>
                {process.env.NODE_ENV === 'development' && (
                  <>
                    <DevModeToggle />
                    <a
                      href="http://localhost:3333"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-coral hover:text-frost transition-colors duration-200"
                    >
                      Studio
                    </a>
                    <a
                      href="http://localhost:4000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-coral hover:text-frost transition-colors duration-200"
                    >
                      Data
                    </a>
                  </>
                )}
                <SocialLink href="https://www.linkedin.com/company/magnet-co" name="LinkedIn">
                  <LinkedInIcon />
                </SocialLink>
              </>
            }
          />
          <ChatWidget />
          {process.env.NODE_ENV === 'development' && (
            <>
              <DevTopBar />
              <DevInspector />
              <DevModeToolbar />
            </>
          )}
        </DevModeProvider>
        </TransitionProvider>
      </body>
    </html>
  )
}
