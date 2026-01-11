---
name: Strategic Content Database Schema
overview: Design and implement comprehensive database schemas for storing Magnet's strategic marketing content including keywords, content strategy, messaging, positioning, branding, and ad copy organized by channels.
todos:
  - id: create-migration
    content: Create database migration file with all strategic content tables
    status: completed
  - id: create-types
    content: Create TypeScript interfaces for all database entities
    status: completed
    dependencies:
      - create-migration
  - id: create-keywords-client
    content: Implement database client functions for keywords (CRUD operations)
    status: completed
    dependencies:
      - create-types
  - id: create-content-client
    content: Implement database client functions for content briefs and pages
    status: completed
    dependencies:
      - create-types
  - id: create-messaging-client
    content: Implement database client functions for messaging frameworks
    status: completed
    dependencies:
      - create-types
  - id: create-ads-client
    content: Implement database client functions for ad campaigns and copy
    status: completed
    dependencies:
      - create-types
  - id: create-branding-client
    content: Implement database client functions for branding guidelines
    status: completed
    dependencies:
      - create-types
  - id: create-seed-script
    content: Create seed script with initial strategic content from STRATEGY.md
    status: completed
    dependencies:
      - create-migration
  - id: update-main-schema
    content: Update hub/src/db/schema.sql to include new tables
    status: completed
    dependencies:
      - create-migration
---

# Strategic Content Database Schema

Design a comprehensive database structure for Magnet's strategic marketing content hub, serving as the single source of truth for all acquisition activities.

## Database Schema Design

### Core Tables

#### 1. Keywords & SEO Research

**`keywords`** - Individual keyword research

- `id` (SERIAL PRIMARY KEY)
- `keyword` (VARCHAR(255) NOT NULL)
- `search_volume` (INTEGER)
- `difficulty` (INTEGER) - 0-100 scale

- `intent` (VARCHAR(50)) - informational, navigational, transactional, commercial
- `cpc` (DECIMAL) - Cost per click estimate

- `competition` (VARCHAR(50)) - low, medium, high

- `serp_features` (JSONB) - Featured snippets, people also ask, etc.
- `notes` (TEXT)

- `status` (VARCHAR(50)) - research, target, tracking, archived
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**`keyword_groups`** - Clustered keywords by topic/theme

- `id` (SERIAL PRIMARY KEY)

- `name` (VARCHAR(255) NOT NULL)
- `description` (TEXT)
- `primary_keyword_id` (INTEGER REFERENCES keywords(id))

- `created_at` (TIMESTAMP)

**`keyword_group_members`** - Many-to-many relationship

- `group_id` (INTEGER REFERENCES keyword_groups(id))
- `keyword_id` (INTEGER REFERENCES keywords(id))

- `priority` (INTEGER) - Order within group
- PRIMARY KEY (group_id, keyword_id)

**`serp_analysis`** - Top 10 SERP results for keywords

- `id` (SERIAL PRIMARY KEY)
- `keyword_id` (INTEGER REFERENCES keywords(id))

- `position` (INTEGER) - 1-10
- `url` (VARCHAR(500))

- `title` (VARCHAR(255))
- `domain` (VARCHAR(255))

- `content_type` (VARCHAR(50)) - blog, landing_page, product, etc.
- `analysis_date` (TIMESTAMP)

- `created_at` (TIMESTAMP)

#### 2. Content Strategy

**`pages`** - Website pages

- `id` (SERIAL PRIMARY KEY)

- `path` (VARCHAR(255) UNIQUE NOT NULL) - e.g., "/websites", "/method/foundation/brand-architecture"
- `title` (VARCHAR(255))

- `meta_description` (TEXT)
- `h1` (VARCHAR(255))

- `status` (VARCHAR(50)) - draft, published, archived
- `content_brief_id` (INTEGER REFERENCES content_briefs(id))

- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**`content_briefs`** - Strategic content briefs

- `id` (SERIAL PRIMARY KEY)

- `title` (VARCHAR(255) NOT NULL)
- `page_id` (INTEGER REFERENCES pages(id))

- `primary_audience` (VARCHAR(255)) - e.g., "CMOs, VPs of Marketing"

- `search_intent` (VARCHAR(50)) - informational, navigational, transactional

- `funnel_stage` (VARCHAR(50)) - awareness, consideration, decision

- `key_messages` (JSONB) - Array of key message points
- `cta_strategy` (TEXT)
- `content_outline` (TEXT)
- `notes` (TEXT)
- `created_at` (TIMESTAMP)

- `updated_at` (TIMESTAMP)

**`content_sections`** - Reusable content sections

- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255) NOT NULL)

- `type` (VARCHAR(50)) - hero, feature, testimonial, cta, faq, etc.

- `content` (JSONB) - Flexible structure for different section types
- `usage_count` (INTEGER DEFAULT 0)
- `created_at` (TIMESTAMP)

- `updated_at` (TIMESTAMP)

**`page_sections`** - Many-to-many: pages use sections

- `page_id` (INTEGER REFERENCES pages(id))

- `section_id` (INTEGER REFERENCES content_sections(id))

- `order` (INTEGER)
- `variants` (JSONB) - Page-specific overrides

- PRIMARY KEY (page_id, section_id, order)

**`keyword_assignments`** - Keywords assigned to pages/content

- `keyword_id` (INTEGER REFERENCES keywords(id))
- `page_id` (INTEGER REFERENCES pages(id))

- `priority` (VARCHAR(50)) - primary, secondary, tertiary

- `usage_type` (VARCHAR(50)) - title, meta, h1, body, anchor
- `created_at` (TIMESTAMP)
- PRIMARY KEY (keyword_id, page_id, usage_type)

#### 3. Messaging & Positioning

**`messaging_frameworks`** - Core messaging frameworks

- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255) NOT NULL)
- `description` (TEXT)

- `audience` (VARCHAR(255))
- `status` (VARCHAR(50)) - active, draft, archived

- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**`value_propositions`** - Value propositions

- `id` (SERIAL PRIMARY KEY)

- `framework_id` (INTEGER REFERENCES messaging_frameworks(id))
- `headline` (VARCHAR(255) NOT NULL)
- `description` (TEXT)

- `target_audience` (VARCHAR(255))
- `use_case` (VARCHAR(255))
- `priority` (INTEGER) - Order within framework
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**`positioning_statements`** - Positioning statements

- `id` (SERIAL PRIMARY KEY)

- `framework_id` (INTEGER REFERENCES messaging_frameworks(id))
- `statement` (TEXT NOT NULL)

- `audience` (VARCHAR(255))
- `context` (TEXT) - When/where to use
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**`key_messages`** - Key messages/claims

- `id` (SERIAL PRIMARY KEY)

- `framework_id` (INTEGER REFERENCES messaging_frameworks(id))
- `message` (TEXT NOT NULL)

- `category` (VARCHAR(100)) - differentiation, benefit, proof_point, etc.
- `supporting_evidence` (TEXT)

- `priority` (INTEGER)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**`objections`** - Common objections and responses

- `id` (SERIAL PRIMARY KEY)
- `objection` (TEXT NOT NULL)

- `response` (TEXT NOT NULL)

- `context` (VARCHAR(255)) - Where this objection typically appears
- `framework_id` (INTEGER REFERENCES messaging_frameworks(id))
- `created_at` (TIMESTAMP)

- `updated_at` (TIMESTAMP)

#### 4. Branding

**`brand_guidelines`** - Brand guidelines

- `id` (SERIAL PRIMARY KEY)

- `name` (VARCHAR(255) NOT NULL)
- `description` (TEXT)

- `status` (VARCHAR(50)) - active, draft
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**`voice_tone_guidelines`** - Voice and tone guidelines

- `id` (SERIAL PRIMARY KEY)

- `guideline_id` (INTEGER REFERENCES brand_guidelines(id))
- `attribute` (VARCHAR(255)) - e.g., "Clear, not clever"

- `description` (TEXT)
- `examples` (JSONB) - Good/bad examples

- `context` (VARCHAR(255)) - When to apply

- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**`brand_assets`** - Brand asset metadata (files stored elsewhere)

- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255) NOT NULL)
- `type` (VARCHAR(50)) - logo, color, font, image, etc.

- `url` (VARCHAR(500))
- `description` (TEXT)
- `usage_guidelines` (TEXT)
- `created_at` (TIMESTAMP)

#### 5. Ad Copy & Creative (Channel-Specific)

**`ad_channels`** - Advertising platforms

- `id` (SERIAL PRIMARY KEY)

- `name` (VARCHAR(100) NOT NULL UNIQUE) - "Google Ads", "Meta", "LinkedIn", etc.

- `type` (VARCHAR(50)) - search, display, social, native

- `specs` (JSONB) - Platform-specific requirements
- `created_at` (TIMESTAMP)

**`ad_campaigns`** - Ad campaigns

- `id` (SERIAL PRIMARY KEY)

- `name` (VARCHAR(255) NOT NULL)
- `channel_id` (INTEGER REFERENCES ad_channels(id))

- `objective` (VARCHAR(100)) - awareness, consideration, conversion

- `target_audience` (TEXT)
- `budget` (DECIMAL)

- `status` (VARCHAR(50)) - draft, active, paused, completed
- `start_date` (DATE)

- `end_date` (DATE)
- `notes` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**`ad_sets`** - Ad sets/groups (channel-specific structure)

- `id` (SERIAL PRIMARY KEY)

- `campaign_id` (INTEGER REFERENCES ad_campaigns(id))
- `name` (VARCHAR(255) NOT NULL)

- `targeting` (JSONB) - Channel-specific targeting criteria
- `budget` (DECIMAL)

- `status` (VARCHAR(50))
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**`ad_copy`** - Individual ad copy variations

- `id` (SERIAL PRIMARY KEY)
- `ad_set_id` (INTEGER REFERENCES ad_sets(id))

- `headline` (VARCHAR(255))
- `headline_2` (VARCHAR(255)) - For platforms with multiple headlines

- `headline_3` (VARCHAR(255))

- `description` (TEXT)
- `description_2` (TEXT)
- `cta_text` (VARCHAR(100))
- `display_url` (VARCHAR(255))

- `final_url` (VARCHAR(500))

- `ad_type` (VARCHAR(50)) - search, display, video, carousel, etc.
- `status` (VARCHAR(50)) - draft, active, paused

- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**`ad_creative`** - Ad creative metadata

- `id` (SERIAL PRIMARY KEY)

- `ad_copy_id` (INTEGER REFERENCES ad_copy(id))

- `type` (VARCHAR(50)) - image, video, carousel
- `url` (VARCHAR(500))

- `dimensions` (VARCHAR(50)) - e.g., "1200x628"
- `file_size` (INTEGER) - bytes
- `alt_text` (TEXT)

- `description` (TEXT)
- `created_at` (TIMESTAMP)

**`ad_performance`** - Ad performance metrics

- `id` (SERIAL PRIMARY KEY)

- `ad_copy_id` (INTEGER REFERENCES ad_copy(id))
- `date` (DATE NOT NULL)

- `impressions` (INTEGER)
- `clicks` (INTEGER)
- `ctr` (DECIMAL)
- `cpc` (DECIMAL)

- `cost` (DECIMAL)
- `conversions` (INTEGER)

- `conversion_rate` (DECIMAL)
- `cpa` (DECIMAL)

- `metrics` (JSONB) - Additional platform-specific metrics
- `created_at` (TIMESTAMP)
- UNIQUE (ad_copy_id, date)

#### 6. Performance & Testing

**`content_performance`** - Content performance metrics

- `id` (SERIAL PRIMARY KEY)
- `page_id` (INTEGER REFERENCES pages(id))

- `date` (DATE NOT NULL)
- `sessions` (INTEGER)
- `pageviews` (INTEGER)

- `bounce_rate` (DECIMAL)

- `avg_time_on_page` (DECIMAL) - seconds
- `conversions` (INTEGER)
- `conversion_rate` (DECIMAL)
- `organic_traffic` (INTEGER)

- `metrics` (JSONB) - Additional metrics
- `created_at` (TIMESTAMP)
- UNIQUE (page_id, date)

**`a_b_tests`** - A/B test experiments

- `id` (SERIAL PRIMARY KEY)
- `name` (VARCHAR(255) NOT NULL)

- `type` (VARCHAR(50)) - content, messaging, cta, creative

- `page_id` (INTEGER REFERENCES pages(id))

- `status` (VARCHAR(50)) - draft, running, completed
- `start_date` (DATE)
- `end_date` (DATE)
- `results` (JSONB) - Test results and winner

- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

**`test_variants`** - A/B test variants

- `id` (SERIAL PRIMARY KEY)
- `test_id` (INTEGER REFERENCES a_b_tests(id))

- `variant_name` (VARCHAR(100)) - "A", "B", "Control", etc.

- `content` (JSONB) - Variant content/structure
- `traffic_split` (INTEGER) - Percentage

- `performance` (JSONB) - Variant-specific metrics
- `created_at` (TIMESTAMP)

## Implementation Plan

### Phase 1: Database Schema

1. Create migration file `hub/src/db/migrations/001_strategic_content.sql`

2. Define all tables with proper relationships and constraints

3. Add indexes for common queries (keywords.keyword, pages.path, etc.)
4. Add foreign key constraints and cascading rules

### Phase 2: TypeScript Types & Database Client

1. Create TypeScript interfaces in `hub/src/lib/db/types.ts`

2. Create database client functions in `hub/src/lib/db/`:

- `keywords.ts` - Keyword CRUD operations

- `content.ts` - Content briefs and pages

- `messaging.ts` - Messaging frameworks and value props
- `ads.ts` - Ad campaigns and copy

- `branding.ts` - Brand guidelines

3. Use `@vercel/postgres` SQL template tags

### Phase 3: Seed Data

1. Create seed script `hub/scripts/seed-strategic-content.ts`
2. Seed initial data:

- Ad channels (Google Ads, Meta, LinkedIn)
- Sample keywords from STRATEGY.md

- Core messaging framework based on STRATEGY.md
- Brand guidelines from STRATEGY.md

### Phase 4: API Routes

1. Create API routes in `hub/src/app/api/`:

- `/api/keywords` - Keyword management

- `/api/content` - Content briefs and pages
- `/api/messaging` - Messaging frameworks
- `/api/ads` - Ad campaigns and copy

- `/api/branding` - Brand guidelines

### Phase 5: UI Components (Future)

- Keyword research interface
- Content brief editor
- Messaging framework builder
- Ad copy manager

- Brand guidelines viewer

## Key Design Decisions

1. **JSONB for Flexibility**: Use JSONB for flexible fields (serp_features, key_messages, content) to allow schema evolution

2. **Channel-Specific Ads**: Separate tables for campaigns/sets/copy organized by channel

3. **Reusable Sections**: Content sections can be reused across pages with page-specific variants

4. **Performance Tracking**: Separate performance tables for content and ads with daily granularity

5. **No Versioning**: Simple updated_at timestamps per requirements

6. **Structured Relationships**: Clear foreign keys and many-to-many tables for complex relationships

## Files to Create/Modify

- `hub/src/db/migrations/001_strategic_content.sql` - Main schema migration
- `hub/src/lib/db/types.ts` - TypeScript type definitions
- `hub/src/lib/db/keywords.ts` - Keyword database functions
- `hub/src/lib/db/content.ts` - Content database functions

- `hub/src/lib/db/messaging.ts` - Messaging database functions

- `hub/src/lib/db/ads.ts` - Ad database functions
- `hub/src/lib/db/branding.ts` - Branding database functions

- `hub/scripts/seed-strategic-content.ts` - Seed script