---
name: Add Sanity CMS Posts
overview: Integrate Sanity CMS into the Next.js website to manage a Posts section with shortform entries (external links and internal posts) and categories mapped to the METHOD framework phases.
todos:
  - id: install-deps
    content: Install next-sanity and @sanity/image-url packages
    status: completed
  - id: sanity-client
    content: Create Sanity client configuration in lib/sanity/
    status: completed
    dependencies:
      - install-deps
  - id: sanity-queries
    content: Create GROQ queries for posts and categories
    status: completed
    dependencies:
      - sanity-client
  - id: sanity-studio
    content: Set up Sanity Studio with post and category schemas
    status: completed
    dependencies:
      - install-deps
  - id: posts-page
    content: Build posts listing page with category filtering
    status: completed
    dependencies:
      - sanity-queries
  - id: post-detail
    content: Build post detail page for article type posts
    status: completed
    dependencies:
      - sanity-queries
  - id: env-vars
    content: Configure environment variables for Sanity connection
    status: completed
---

# Sanity CMS Integration for Posts

## Architecture

```mermaid
flowchart LR
    subgraph Sanity["Sanity Studio"]
        Category[Category Schema]
        Post[Post Schema]
    end
    subgraph Website["Next.js Website"]
        Client[sanity.ts Client]
        PostsPage[/posts Page]
        PostDetail[/posts/slug Page]
    end
    Post --> Category
    Sanity --> Client
    Client --> PostsPage
    Client --> PostDetail
```



## Schemas

**Post** - Two variants via `postType` field:

- `link` - External URL with title, summary, category
- `article` - Full post with title, body (Portable Text), category

**Category** - Maps to METHOD phases and sub-topics:

- Foundation: Brand, Messaging, Experience, Conversion, Analytics
- Activation: Paid Media, Search, Social, Creative, Partnerships
- Acceleration: Offers, Landing Pages, Sales, CRM, Attribution
- Retention: Lifecycle, Success, Community, Feedback, Predictive

## Implementation

### 1. Install Dependencies

Add `next-sanity` and `@sanity/image-url` to the website package.

### 2. Create Sanity Configuration

Create [`website/src/lib/sanity/client.ts`](website/src/lib/sanity/client.ts) with:

- Project ID: `o28dq6x5`
- Dataset: `production`
- API version: `2025-01-03`
- Token from env var `SANITY_API_TOKEN`

### 3. Create Sanity Schemas

Set up Sanity Studio in a new `studio/` directory with schemas for:

- `post` (title, slug, postType, externalUrl, body, category, publishedAt)
- `category` (title, slug, phase, description)

### 4. Create Posts Pages

- [`website/src/app/posts/page.tsx`](website/src/app/posts/page.tsx) - List view with category filtering
- [`website/src/app/posts/[slug]/page.tsx`](website/src/app/posts/[slug]/page.tsx) - Article detail page (only for `article` type)

### 5. Environment Variables

Add to `.env.local`:

```javascript
SANITY_PROJECT_ID=o28dq6x5
SANITY_DATASET=production
SANITY_API_TOKEN=skcQxxk9tMblQjc5DwlTftqHk8tDhtBJijTXoF7JU6Q2LNX8OdMla3kn5aLBHQ0bCLUhQ2xY3B0v9ClaWPZ72R1Re8OJnbIepATjWUIxV4IEyD53Li2meqLnIva8eS1s5oIyHW7DSI6EgL6kvYfE7gicYFewFAziZpQ1w2bxSpEU8jonKXHa
```



## File Structure

```javascript
website/
├── src/
│   ├── lib/
│   │   └── sanity/
│   │       ├── client.ts      # Sanity client config
│   │       └── queries.ts     # GROQ queries
│   └── app/
│       └── posts/
│           ├── page.tsx       # Posts listing
│           └── [slug]/
│               └── page.tsx   # Post detail
studio/
├── package.json
├── sanity.config.ts
├── sanity.cli.ts
└── schemaTypes/
    ├── index.ts
    ├── post.ts
    └── category.ts
```



## Categories Structure

Phase-based organization matching METHOD:

- **Foundation** phase categories
- **Activation** phase categories  
- **Acceleration** phase categories
- **Retention** phase categories