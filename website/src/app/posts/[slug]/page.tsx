import { clsx } from 'clsx/lite'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from 'next-sanity'

import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { Link } from '@/components/elements/link'
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
    <main className="py-16 sm:py-24">
      <Container>
        <article className="mx-auto max-w-2xl">
          <header className="mb-12">
            <div className="mb-6">
              <Link href="/posts" className="text-basalt dark:text-coral/80">
                ← Back to posts
              </Link>
            </div>

            {post.category && (
              <span
                className={clsx(
                  'mb-4 inline-block rounded-full px-2.5 py-0.5 font-mono text-xs font-medium',
                  phaseColors[post.category.phase]
                )}
              >
                {post.category.title}
              </span>
            )}

            <h1 className="font-display text-4xl/10 tracking-tight text-oxblood sm:text-5xl/14 dark:text-frost">
              {post.title}
            </h1>

            <div className="mt-6 flex items-center gap-4">
              <time
                dateTime={post.publishedAt}
                className="font-mono text-sm text-basalt dark:text-coral/60"
              >
                {formatDate(post.publishedAt)}
              </time>
            </div>

            {post.summary && (
              <Eyebrow className="mt-8 text-basalt dark:text-coral/80">
                {post.summary}
              </Eyebrow>
            )}
          </header>

          {post.body && (
            <div className="prose prose-oxblood dark:prose-invert max-w-none">
              <PortableText
                value={post.body}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-base/7 text-oxblood dark:text-coral">{children}</p>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mt-12 mb-4 font-display text-2xl/8 font-medium tracking-tight text-oxblood dark:text-frost">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mt-8 mb-3 font-display text-xl/7 font-medium tracking-tight text-oxblood dark:text-frost">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="mt-6 mb-2 font-display text-lg/6 font-medium text-oxblood dark:text-frost">
                        {children}
                      </h4>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="my-6 border-l-2 border-ember pl-6 text-lg/8 italic text-basalt dark:border-coral dark:text-coral/80">
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
                      <code className="rounded bg-opal px-1.5 py-0.5 font-mono text-sm text-oxblood dark:bg-basalt dark:text-coral">
                        {children}
                      </code>
                    ),
                    link: ({ children, value }) => (
                      <a
                        href={value?.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ember underline underline-offset-2 transition-colors duration-200 hover:text-oxblood dark:text-coral dark:hover:text-frost"
                      >
                        {children}
                      </a>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="my-4 list-disc pl-6 text-oxblood marker:text-ember dark:text-coral dark:marker:text-coral">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="my-4 list-decimal pl-6 text-oxblood marker:text-ember dark:text-coral dark:marker:text-coral">
                        {children}
                      </ol>
                    ),
                  },
                  listItem: {
                    bullet: ({ children }) => <li className="my-1">{children}</li>,
                    number: ({ children }) => <li className="my-1">{children}</li>,
                  },
                }}
              />
            </div>
          )}

          <footer className="mt-16 border-t border-opal pt-8 dark:border-basalt">
            <Link href="/posts">← Back to all posts</Link>
          </footer>
        </article>
      </Container>
    </main>
  )
}

