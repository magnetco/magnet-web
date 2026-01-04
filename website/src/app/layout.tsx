import { ButtonLink, PlainButtonLink } from '@/components/elements/button'
import { FooterLogo } from '@/components/elements/footer-logo'
import { Main } from '@/components/elements/main'
import { ScrollableLogo } from '@/components/elements/scrollable-logo'
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
        <>
          <NavbarWithLinksActionsAndCenteredLogo
            id="navbar"
            links={
              <>
                <NavbarDropdown label="Solutions">
                  <NavbarDropdownItem
                    href="/websites"
                    title="Websites"
                    subcopy="Design frictionless digital journeys that consistently convert higher-quality buyers."
                  />
                  <NavbarDropdownItem
                    href="/branding"
                    title="Branding"
                    subcopy="Clarify your story and stand out in the market with advanced strategic precision."
                  />
                  <NavbarDropdownItem
                    href="/search"
                    title="Search"
                    subcopy="Build fast, scalable search systems that reliably power sustainable long-term growth."
                  />
                  <NavbarDropdownItem
                    href="/ads"
                    title="Ads"
                    subcopy="Increase qualified demand through highly targeted, high-intent acquisition campaigns."
                  />
                </NavbarDropdown>
                <NavbarLink href="/playbook">Method</NavbarLink>
                <NavbarLink href="/team">Team</NavbarLink>
                <NavbarLink href="/pricing">Pricing</NavbarLink>
                <NavbarLink href="/login" className="sm:hidden">
                  Log in
                </NavbarLink>
              </>
            }
            logo={<ScrollableLogo href="/" />}
            actions={
              <>
                <PlainButtonLink href="/login" className="max-sm:hidden">
                  Log in
                </PlainButtonLink>
                <ButtonLink href="#">Get started</ButtonLink>
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
                  <FooterLink href="/websites">Websites</FooterLink>
                  <FooterLink href="/branding">Branding</FooterLink>
                  <FooterLink href="/search">Search</FooterLink>
                  <FooterLink href="/ads">Ads</FooterLink>
                </FooterCategory>
                <FooterCategory title="Method">
                  <FooterLink href="/method/foundation">Foundation</FooterLink>
                  <FooterLink href="/method/activation">Activation</FooterLink>
                  <FooterLink href="/method/acceleration">Acceleration</FooterLink>
                  <FooterLink href="/method/retention">Retention</FooterLink>
                </FooterCategory>
                <FooterCategory title="Company">
                  <FooterLink href="/team">Team</FooterLink>
                  <FooterLink href="/pricing">Pricing</FooterLink>
                  <FooterLink href="/careers">Careers</FooterLink>
                  <FooterLink href="/privacy-policy">Privacy</FooterLink>
                </FooterCategory>
              </>
            }
            fineprint="© 2025 Magnet Co, LLC"
            socialLinks={
              <SocialLink href="https://www.linkedin.com/company/magnet-co" name="LinkedIn">
                <LinkedInIcon />
              </SocialLink>
            }
          />
        </>
      </body>
    </html>
  )
}
