import { clsx } from 'clsx/lite'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from 'next-sanity'

import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { GridBgSection } from '@/components/elements/grid-bg'
import { Link } from '@/components/elements/link'
import { FacebookIcon } from '@/components/icons/social/facebook-icon'
import { LinkedInIcon } from '@/components/icons/social/linkedin-icon'
import { XIcon } from '@/components/icons/social/x-icon'
import { client } from '@/lib/sanity/client'
import { postBySlugQuery, postSlugsQuery } from '@/lib/sanity/queries'
import type { Phase, Post } from '@/lib/sanity/types'

const phaseColors: Record<Phase, string> = {
  foundation: 'bg-powder text-juniper',
  activation: 'bg-ember/10 text-ember',
  acceleration: 'bg-opal text-basalt',
  retention: 'bg-coral/20 text-oxblood',
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function ShareSidebar({ post, slug }: { post: Post; slug: string }) {
  const shareUrl = `https://magnet.so/posts/${slug}`
  const shareText = post.title

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-32 space-y-8">
        {/* Share section */}
        <div className="space-y-4">
          <Eyebrow>Share</Eyebrow>
          <div className="flex gap-2">
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-opal bg-snow transition-all duration-200 hover:border-ember hover:bg-ember dark:border-basalt dark:bg-oxblood dark:hover:border-coral dark:hover:bg-coral"
              aria-label="Share on X"
            >
              <XIcon className="h-4 w-4 text-basalt transition-colors group-hover:text-white dark:text-coral dark:group-hover:text-oxblood" />
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-opal bg-snow transition-all duration-200 hover:border-[#0A66C2] hover:bg-[#0A66C2] dark:border-basalt dark:bg-oxblood dark:hover:border-coral dark:hover:bg-coral"
              aria-label="Share on LinkedIn"
            >
              <LinkedInIcon className="h-4 w-4 text-basalt transition-colors group-hover:text-white dark:text-coral dark:group-hover:text-oxblood" />
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-opal bg-snow transition-all duration-200 hover:border-[#1877F2] hover:bg-[#1877F2] dark:border-basalt dark:bg-oxblood dark:hover:border-coral dark:hover:bg-coral"
              aria-label="Share on Facebook"
            >
              <FacebookIcon className="h-4 w-4 text-basalt transition-colors group-hover:text-white dark:text-coral dark:group-hover:text-oxblood" />
            </a>
          </div>
        </div>

        {/* Published date */}
        <div className="space-y-2">
          <Eyebrow>Published</Eyebrow>
          <time
            dateTime={post.publishedAt}
            className="block font-mono text-sm text-oxblood dark:text-coral"
          >
            {formatDate(post.publishedAt)}
          </time>
        </div>

        {/* Category */}
        {post.category && (
          <div className="space-y-2">
            <Eyebrow>Category</Eyebrow>
            <span
              className={clsx(
                'inline-block rounded-full px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.03em]',
                phaseColors[post.category.phase]
              )}
            >
              {post.category.title}
            </span>
          </div>
        )}
      </div>
    </aside>
  )
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(postSlugsQuery)
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug })

  if (!post) {
    return { title: 'Post Not Found | Magnet' }
  }

  return {
    title: `${post.title} | Magnet`,
    description: post.summary || `Read ${post.title} on Magnet`,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await client.fetch<Post | null>(postBySlugQuery, { slug })

  if (!post) {
    notFound()
  }

  // Redirect link posts to their external URL
  if (post.postType === 'link' && post.externalUrl) {
    return (
      <meta httpEquiv="refresh" content={`0;url=${post.externalUrl}`} />
    )
  }

  return (
    <main>
      <GridBgSection showBottomBorder showTopBorder={false} withPadding>
        <Container>
          {/* Back link - full width above content */}
          <div className="mb-12 lg:mb-16">
            <Link 
              href="/posts" 
              className="group inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-basalt/70 transition-colors hover:text-ember dark:text-coral/60 dark:hover:text-coral"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
              Back to posts
            </Link>
          </div>

          {/* Two-column layout */}
          <div className="lg:grid lg:grid-cols-[160px_1fr] lg:gap-12 xl:grid-cols-[180px_1fr] xl:gap-16 2xl:gap-24">
            {/* Left sidebar */}
            <ShareSidebar post={post} slug={slug} />

            {/* Main content */}
            <article className="max-w-[38rem]">
              <header className="mb-16 lg:mb-20">
                {/* Mobile-only category and date */}
                <div className="mb-8 flex flex-wrap items-center gap-3 lg:hidden">
                  {post.category && (
                    <span
                      className={clsx(
                        'inline-block rounded-full px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.03em]',
                        phaseColors[post.category.phase]
                      )}
                    >
                      {post.category.title}
                    </span>
                  )}
                  <span className="text-opal dark:text-basalt">•</span>
                  <time
                    dateTime={post.publishedAt}
                    className="font-mono text-xs font-bold uppercase tracking-[0.03em] text-ember"
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                </div>

                <h1 className="font-display text-[2.5rem]/[1.15] font-medium tracking-[-0.02em] text-oxblood sm:text-5xl/[1.15] lg:text-[3.25rem]/[1.1] dark:text-frost">
                  {post.title}
                </h1>

                {post.summary && (
                  <p className="mt-8 max-w-xl text-lg/relaxed text-oxblood/80 dark:text-coral/80">
                    {post.summary}
                  </p>
                )}

                {/* Decorative divider */}
                <div className="mt-12 flex items-center gap-3 lg:mt-16">
                  <div className="h-px flex-1 bg-gradient-to-r from-opal to-transparent dark:from-basalt" />
                  <div className="h-1.5 w-1.5 rounded-full bg-ember/50" />
                </div>
              </header>

              {post.body && (
                <div className="prose prose-oxblood dark:prose-invert max-w-none">
                  <PortableText
                    value={post.body}
                    components={{
                      block: {
                        normal: ({ children }) => (
                          <p className="mb-6 text-[1.0625rem]/[1.8] text-oxblood/90 dark:text-coral/90">
                            {children}
                          </p>
                        ),
                        h2: ({ children }) => (
                          <h2 className="mb-5 mt-16 font-display text-[1.75rem]/[1.25] font-medium tracking-tight text-oxblood first:mt-0 dark:text-frost">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="mb-4 mt-12 font-display text-xl/[1.3] font-medium tracking-tight text-oxblood dark:text-frost">
                            {children}
                          </h3>
                        ),
                        h4: ({ children }) => (
                          <h4 className="mb-3 mt-8 font-display text-lg font-medium text-oxblood dark:text-frost">
                            {children}
                          </h4>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="my-10 border-l-2 border-ember py-1 pl-6 text-lg/[1.7] italic text-basalt dark:border-coral dark:text-coral/80">
                            {children}
                          </blockquote>
                        ),
                      },
                      marks: {
                        strong: ({ children }) => (
                          <strong className="font-semibold text-oxblood dark:text-frost">{children}</strong>
                        ),
                        em: ({ children }) => <em className="italic">{children}</em>,
                        code: ({ children }) => (
                          <code className="rounded-sm bg-opal/60 px-1.5 py-0.5 font-mono text-[0.9em] text-oxblood dark:bg-basalt dark:text-coral">
                            {children}
                          </code>
                        ),
                        link: ({ children, value }) => (
                          <a
                            href={value?.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-ember underline decoration-ember/30 underline-offset-2 transition-colors duration-200 hover:decoration-ember dark:text-coral dark:decoration-coral/30 dark:hover:decoration-coral"
                          >
                            {children}
                          </a>
                        ),
                      },
                      list: {
                        bullet: ({ children }) => (
                          <ul className="my-6 space-y-2.5 pl-5 text-oxblood/90 marker:text-ember dark:text-coral/90 dark:marker:text-coral">
                            {children}
                          </ul>
                        ),
                        number: ({ children }) => (
                          <ol className="my-6 space-y-2.5 pl-5 text-oxblood/90 marker:text-ember marker:font-mono marker:text-sm dark:text-coral/90 dark:marker:text-coral">
                            {children}
                          </ol>
                        ),
                      },
                      listItem: {
                        bullet: ({ children }) => (
                          <li className="pl-1.5 text-[1.0625rem]/[1.7]">{children}</li>
                        ),
                        number: ({ children }) => (
                          <li className="pl-1.5 text-[1.0625rem]/[1.7]">{children}</li>
                        ),
                      },
                    }}
                  />
                </div>
              )}

              {/* Mobile share buttons */}
              <div className="mt-16 border-t border-opal pt-8 lg:hidden dark:border-basalt">
                <Eyebrow className="mb-4">Share</Eyebrow>
                <div className="flex gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://magnet.so/posts/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-opal bg-snow transition-all duration-200 hover:border-ember hover:bg-ember hover:text-white dark:border-basalt dark:bg-oxblood"
                    aria-label="Share on X"
                  >
                    <XIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://magnet.so/posts/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-opal bg-snow transition-all duration-200 hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white dark:border-basalt dark:bg-oxblood"
                    aria-label="Share on LinkedIn"
                  >
                    <LinkedInIcon className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://magnet.so/posts/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-opal bg-snow transition-all duration-200 hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white dark:border-basalt dark:bg-oxblood"
                    aria-label="Share on Facebook"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <footer className="mt-16 border-t border-opal/60 pt-10 dark:border-basalt/60">
                <Link 
                  href="/posts" 
                  className="group inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-basalt/70 transition-colors hover:text-ember dark:text-coral/60"
                >
                  <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
                  Back to all posts
                </Link>
              </footer>
            </article>
          </div>
        </Container>
      </GridBgSection>
    </main>
  )
}

