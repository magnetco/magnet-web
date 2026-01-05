import { clsx } from 'clsx/lite'
import { ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'
import NextLink from 'next/link'

import { Container } from '@/components/elements/container'
import { Eyebrow } from '@/components/elements/eyebrow'
import { GridBgSection } from '@/components/elements/grid-bg'
import { Heading } from '@/components/elements/heading'
import { Text } from '@/components/elements/text'
import { client } from '@/lib/sanity/client'
import { categoriesQuery, postsQuery } from '@/lib/sanity/queries'
import type { Category, Phase, Post } from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'Posts | Magnet',
  description: 'Insights, links, and ideas on digital marketing strategy.',
}

const phaseLabels: Record<Phase, string> = {
  foundation: 'Foundation',
  activation: 'Activation',
  acceleration: 'Acceleration',
  retention: 'Retention',
}

const phaseColors: Record<Phase, string> = {
  foundation: 'bg-powder text-juniper',
  activation: 'bg-ember/10 text-ember',
  acceleration: 'bg-opal text-basalt',
  retention: 'bg-coral/20 text-oxblood',
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function PostCard({ post }: { post: Post }) {
  const isLink = post.postType === 'link'
  const href = isLink ? post.externalUrl! : `/posts/${post.slug.current}`

  return (
    <article className="group relative">
      <NextLink
        href={href}
        target={isLink ? '_blank' : undefined}
        rel={isLink ? 'noopener noreferrer' : undefined}
        className="block rounded-xl border border-opal bg-frost p-6 transition-all duration-300 hover:border-basalt/30 hover:shadow-sm dark:border-basalt dark:bg-juniper/50 dark:hover:border-coral/30"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {post.category && (
              <span
                className={clsx(
                  'mb-3 inline-block rounded-full px-2.5 py-0.5 font-mono text-xs font-medium',
                  phaseColors[post.category.phase]
                )}
              >
                {post.category.title}
              </span>
            )}
            <h2 className="font-display text-lg/7 font-medium tracking-tight text-oxblood transition-colors duration-300 group-hover:text-ember dark:text-frost dark:group-hover:text-coral">
              {post.title}
            </h2>
            {post.summary && (
              <p className="mt-2 line-clamp-2 text-sm/6 text-basalt dark:text-coral/80">{post.summary}</p>
            )}
            <div className="mt-3 flex items-center gap-3 text-xs text-basalt dark:text-coral/60">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              {isLink && (
                <span className="flex items-center gap-1 font-medium text-ember dark:text-coral">
                  External <ArrowUpRight className="h-3 w-3" />
                </span>
              )}
            </div>
          </div>
          {isLink && (
            <ArrowUpRight className="h-5 w-5 shrink-0 text-basalt transition-colors duration-300 group-hover:text-ember dark:text-coral/60 dark:group-hover:text-coral" />
          )}
        </div>
      </NextLink>
    </article>
  )
}

function CategoryFilter({
  categories,
  activeCategory,
}: {
  categories: Category[]
  activeCategory?: string
}) {
  const grouped = categories.reduce(
    (acc, cat) => {
      if (!acc[cat.phase]) acc[cat.phase] = []
      acc[cat.phase].push(cat)
      return acc
    },
    {} as Record<Phase, Category[]>
  )

  const phases: Phase[] = ['foundation', 'activation', 'acceleration', 'retention']

  return (
    <div className="flex flex-wrap gap-2">
      <NextLink
        href="/posts"
        className={clsx(
          'rounded-full px-3 py-1 font-mono text-xs font-medium transition-colors duration-200',
          !activeCategory
            ? 'bg-oxblood text-frost dark:bg-coral dark:text-juniper'
            : 'bg-opal text-basalt hover:bg-powder dark:bg-basalt dark:text-coral dark:hover:bg-basalt/80'
        )}
      >
        All
      </NextLink>
      {phases.map((phase) =>
        grouped[phase]?.map((cat) => (
          <NextLink
            key={cat._id}
            href={`/posts?category=${cat.slug.current}`}
            className={clsx(
              'rounded-full px-3 py-1 font-mono text-xs font-medium transition-colors duration-200',
              activeCategory === cat.slug.current
                ? 'bg-oxblood text-frost dark:bg-coral dark:text-juniper'
                : 'bg-opal text-basalt hover:bg-powder dark:bg-basalt dark:text-coral dark:hover:bg-basalt/80'
            )}
          >
            {cat.title}
          </NextLink>
        ))
      )}
    </div>
  )
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const [posts, categories] = await Promise.all([
    client.fetch<Post[]>(postsQuery),
    client.fetch<Category[]>(categoriesQuery),
  ])

  const filteredPosts = params.category
    ? posts.filter((post) => post.category?.slug.current === params.category)
    : posts

  return (
    <main>
      <GridBgSection showBottomBorder showTopBorder={false} withPadding>
        <Container>
          <header className="mb-12">
            <Eyebrow className="mb-4">Posts</Eyebrow>
            <Heading>Insights &amp; Links</Heading>
            <Text size="lg" className="mt-6 max-w-2xl">
              <p>Curated thinking on digital marketing strategy, methodology, and execution.</p>
            </Text>
          </header>

          {categories.length > 0 && (
            <div className="mb-10">
              <CategoryFilter categories={categories} activeCategory={params.category} />
            </div>
          )}

          {filteredPosts.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-opal bg-frost/50 py-16 text-center dark:border-basalt dark:bg-juniper/30">
              <p className="text-basalt dark:text-coral/80">No posts found.</p>
            </div>
          )}
        </Container>
      </GridBgSection>
    </main>
  )
}

