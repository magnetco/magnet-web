import { ButtonLink } from '@/components/elements/button'
import { ChatWidget } from '@/components/elements/chat-widget'
import { FooterLogo } from '@/components/elements/footer-logo'
import { Main } from '@/components/elements/main'
import { ScrollableLogo } from '@/components/elements/scrollable-logo'
import { Search } from '@/components/elements/search'
import { LinkedInIcon } from '@/components/icons/social/linkedin-icon'
import {
  FooterCategory,
  FooterLink,
  FooterWithNewsletterFormCategoriesAndSocialIcons,
  SocialLink,
} from '@/components/sections/footer-with-newsletter-form-categories-and-social-icons'
import {
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
            withGridBg
            links={
              <>
                <NavbarLink href="/branding">Branding</NavbarLink>
                <NavbarLink href="/websites">Websites</NavbarLink>
                <NavbarLink href="/ads">Paid Ads</NavbarLink>
                <NavbarLink href="/search">Search Marketing</NavbarLink>
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
                  <FooterLink href="/websites">Websites</FooterLink>
                  <FooterLink href="/branding">Branding</FooterLink>
                  <FooterLink href="/search">Search Marketing</FooterLink>
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
                  <FooterLink href="/posts">Posts</FooterLink>
                  <FooterLink href="/pricing">Pricing</FooterLink>
                  <FooterLink href="/careers">Careers</FooterLink>
                  <FooterLink href="/privacy-policy">Privacy</FooterLink>
                </FooterCategory>
              </>
            }
            fineprint="© 2025 Magnet Co, LLC"
            socialLinks={
              <>
                {process.env.NODE_ENV === 'development' && (
                  <>
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
        </>
      </body>
    </html>
  )
}
