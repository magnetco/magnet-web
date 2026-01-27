# Marketing Studio Implementation Plan

A phased implementation plan for building the Marketing Studio app.

---

## Project Overview

**Location:** `/marketing` folder (sibling to `/website`, `/studio`, `/data`)

**Stack:**
- Next.js 15 with App Router
- React 19
- Tailwind CSS v4 (matching website)
- Neon serverless PostgreSQL
- Groq AI via `@ai-sdk/groq` and `ai` SDK
- TypeScript

**Key Features:**
- Password-protected internal tool
- AI-powered ad copy generation
- 5 platform preview components
- Campaign organization
- Shareable review links

---

## Implementation Phases

### Phase 1: App Scaffolding & Configuration (2-3 hours)

#### 1.1 Initialize Next.js App

```bash
cd /Users/gavin/Projects/magnet-web
pnpm create next-app@latest marketing --typescript --tailwind --app --src-dir=false --import-alias="@/*"
cd marketing
```

#### 1.2 Configure Dependencies

```json
// marketing/package.json dependencies
{
  "dependencies": {
    "next": "^15",
    "react": "^19",
    "react-dom": "^19",
    "@ai-sdk/groq": "^3.0.2",
    "ai": "^6.0.6",
    "@neondatabase/serverless": "^0.9.0",
    "bcryptjs": "^3.0.2",
    "geist": "^1.5.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.562.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "tailwindcss": "^4.1.18",
    "@types/bcryptjs": "^3.0.0",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5"
  }
}
```

#### 1.3 Environment Variables

```bash
# marketing/.env.local.example
GROQ_API_KEY=gsk_...
DATABASE_URL=postgresql://...
AUTH_PASSWORD_HASH=...      # bcrypt hash of the password
AUTH_SECRET=...             # 32+ character random string for cookie signing
CONTEXT_DIR=../context      # relative path to context files
```

#### 1.4 Tailwind v4 Configuration

Match the website's color system from `DESIGN.md`:

```css
/* marketing/app/globals.css */
@import "tailwindcss";

@theme {
  --font-sans: "Geist", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, monospace;

  /* Brand colors from DESIGN.md */
  --color-ember: #F9432B;
  --color-oxblood: #220002;
  --color-powder: #BAD9DC;
  --color-juniper: #001D22;
  --color-basalt: #2A4144;
  --color-opal: #DDE6E7;
  --color-snow: #F5F7F7;
  --color-frost: #FFFFFF;
  --color-coral: #FFB5AB;
}
```

#### 1.5 File Structure Setup

Create initial folder structure:

```
marketing/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── login/page.tsx
│   ├── editor/page.tsx
│   ├── campaigns/
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── review/[token]/page.tsx
│   └── api/
│       ├── auth/route.ts
│       ├── generate/route.ts
│       ├── mockups/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       ├── campaigns/
│       │   ├── route.ts
│       │   └── [id]/route.ts
│       └── share/route.ts
├── components/
│   ├── auth/
│   ├── previews/
│   ├── forms/
│   ├── layout/
│   └── ui/
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   └── context.ts
├── middleware.ts
├── hooks/
└── types/
```

---

### Phase 2: Database Setup (1-2 hours)

#### 2.1 Create Migration File

```sql
-- website/src/lib/db/migrations/014_marketing_tables.sql

-- Marketing campaigns table
CREATE TABLE IF NOT EXISTS marketing_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'review', 'approved')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Marketing mockups table
CREATE TABLE IF NOT EXISTS marketing_mockups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES marketing_campaigns(id) ON DELETE CASCADE,
  platform VARCHAR(20) NOT NULL CHECK (platform IN ('google_ad', 'linkedin_ad', 'linkedin_post', 'facebook', 'serp')),
  name VARCHAR(255) NOT NULL,
  content JSONB NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Marketing share links table
CREATE TABLE IF NOT EXISTS marketing_share_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token VARCHAR(64) UNIQUE NOT NULL,
  campaign_id UUID REFERENCES marketing_campaigns(id) ON DELETE CASCADE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_marketing_mockups_campaign ON marketing_mockups(campaign_id);
CREATE INDEX IF NOT EXISTS idx_marketing_mockups_sort ON marketing_mockups(campaign_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_marketing_share_links_token ON marketing_share_links(token);
CREATE INDEX IF NOT EXISTS idx_marketing_share_links_expires ON marketing_share_links(expires_at);
```

#### 2.2 Database Client

```typescript
// marketing/lib/db.ts
import { neon } from '@neondatabase/serverless'

let _sql: ReturnType<typeof neon> | null = null

function getSql() {
  if (!_sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set')
    }
    _sql = neon(process.env.DATABASE_URL)
  }
  return _sql
}

export function sql(strings: TemplateStringsArray, ...values: unknown[]) {
  return getSql()(strings, ...values)
}
```

---

### Phase 3: Authentication (2-3 hours)

#### 3.1 Auth Utilities

```typescript
// marketing/lib/auth.ts
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'marketing_auth'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export async function verifyPassword(password: string): Promise<boolean> {
  const hash = process.env.AUTH_PASSWORD_HASH
  if (!hash) return false
  return bcrypt.compare(password, hash)
}

export async function createSession(): Promise<string> {
  const token = crypto.randomUUID()
  // In production, you'd store this in DB. For simplicity, we'll use a signed cookie.
  return token
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  return !!cookieStore.get(COOKIE_NAME)?.value
}
```

#### 3.2 Middleware

```typescript
// marketing/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public review pages
  if (pathname.startsWith('/review/')) {
    return NextResponse.next()
  }

  // Allow login page and auth API
  if (pathname === '/login' || pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // Allow static files
  if (pathname.startsWith('/_next/') || pathname.startsWith('/favicon')) {
    return NextResponse.next()
  }

  // Check for auth cookie
  const authCookie = request.cookies.get('marketing_auth')
  if (!authCookie?.value) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

#### 3.3 Auth API Route

```typescript
// marketing/app/api/auth/route.ts
import { verifyPassword, setAuthCookie, clearAuthCookie, createSession } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { password, action } = await req.json()

  if (action === 'logout') {
    await clearAuthCookie()
    return NextResponse.json({ success: true })
  }

  const valid = await verifyPassword(password)
  if (!valid) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = await createSession()
  await setAuthCookie(token)

  return NextResponse.json({ success: true })
}
```

#### 3.4 Login Page

```tsx
// marketing/app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError('Invalid password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-snow">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold text-oxblood">Marketing Studio</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full px-4 py-3 border border-opal rounded-lg focus:outline-none focus:ring-2 focus:ring-ember"
          autoFocus
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-ember text-frost rounded-lg hover:bg-ember/90 disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
```

---

### Phase 4: AI Generation (2-3 hours)

#### 4.1 Context Loading

```typescript
// marketing/lib/context.ts
import fs from 'fs'
import path from 'path'

interface Context {
  brand: string
  strategy: string
  icp: string
}

let cachedContext: Context | null = null

export function getContext(): Context {
  if (cachedContext) return cachedContext

  const contextDir = process.env.CONTEXT_DIR || path.join(process.cwd(), '..', 'context')

  cachedContext = {
    brand: fs.readFileSync(path.join(contextDir, 'BRAND.md'), 'utf-8'),
    strategy: fs.readFileSync(path.join(contextDir, 'STRATEGY.md'), 'utf-8'),
    icp: fs.readFileSync(path.join(contextDir, 'ICP.md'), 'utf-8'),
  }

  return cachedContext
}

// Clear cache (useful for development)
export function clearContextCache() {
  cachedContext = null
}
```

#### 4.2 Platform Prompts

```typescript
// marketing/lib/prompts.ts
export const PLATFORM_PROMPTS = {
  google_ad: `Generate Google Ads copy with:
- headline1: First headline (max 30 characters)
- headline2: Second headline (max 30 characters)
- headline3: Third headline (max 30 characters)
- description1: First description (max 90 characters)
- description2: Second description (max 90 characters)
- path1: URL path segment 1 (max 15 characters)
- path2: URL path segment 2 (max 15 characters)

Focus on clear value props, urgency where appropriate, and strong calls to action.
Use the brand voice: precise, calm, direct, confident.`,

  linkedin_ad: `Generate LinkedIn Sponsored Content with:
- introText: Intro text above the image (max 150 characters)
- headline: Headline below the image (max 70 characters)
- description: Description text (max 100 characters)
- ctaButton: One of "Learn more", "Sign up", "Register", "Download", "Get quote", "Apply now", "Contact us"

Professional B2B tone. Focus on business outcomes and credibility.`,

  linkedin_post: `Generate a LinkedIn organic post with:
- postText: The main post text (ideal 150 characters, max 3000)
- hashtags: Array of 3-5 relevant hashtags (without #)

Thought leadership tone. Hook the reader in the first line. 
Create engagement through insight, not promotion.`,

  facebook: `Generate Facebook/Instagram ad copy with:
- primaryText: Primary text above the image (max 125 characters)
- headline: Headline below the image (max 40 characters)
- description: Link description (max 30 characters)
- ctaButton: One of "Learn more", "Sign up", "Shop now", "Book now", "Contact us", "Get offer"

Concise and compelling. Focus on benefits and clear CTA.`,

  serp: `Generate SEO metadata with:
- title: Meta title (max 60 characters)
- description: Meta description (max 160 characters)
- breadcrumbs: Array of 2-3 URL breadcrumb segments

Include the primary keyword naturally. Write for clicks while being accurate.`,
} as const

export type Platform = keyof typeof PLATFORM_PROMPTS
```

#### 4.3 Generate API Route

```typescript
// marketing/app/api/generate/route.ts
import { createGroq } from '@ai-sdk/groq'
import { generateText } from 'ai'
import { getContext } from '@/lib/context'
import { PLATFORM_PROMPTS, Platform } from '@/lib/prompts'
import { NextResponse } from 'next/server'

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: Request) {
  try {
    const { platform, segment, topic, additionalContext } = await req.json()

    if (!PLATFORM_PROMPTS[platform as Platform]) {
      return NextResponse.json({ error: 'Invalid platform' }, { status: 400 })
    }

    const context = getContext()

    const systemPrompt = `You are a B2B marketing copywriter for Magnet, a growth architecture firm.

BRAND VOICE & GUIDELINES:
${context.brand}

STRATEGY & POSITIONING:
${context.strategy}

TARGET CUSTOMER PROFILES:
${context.icp}

TASK:
${PLATFORM_PROMPTS[platform as Platform]}

Return ONLY valid JSON with the requested fields. No markdown, no explanation.`

    const userPrompt = `Target segment: ${segment}
Topic/focus: ${topic}
${additionalContext ? `Additional context: ${additionalContext}` : ''}`

    const result = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      system: systemPrompt,
      prompt: userPrompt,
      maxTokens: 1000,
    })

    // Parse the JSON response
    const content = JSON.parse(result.text)

    return NextResponse.json({ content })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}
```

---

### Phase 5: Platform Preview Components (3-4 hours)

#### 5.1 Character Count Component

```tsx
// marketing/components/ui/char-count.tsx
import clsx from 'clsx'

interface CharCountProps {
  current: number
  max: number
  className?: string
}

export function CharCount({ current, max, className }: CharCountProps) {
  const percentage = current / max
  const color = percentage > 1 ? 'text-red-500' : percentage > 0.9 ? 'text-amber-500' : 'text-green-500'

  return (
    <span className={clsx('text-xs font-mono', color, className)}>
      {current}/{max}
    </span>
  )
}
```

#### 5.2 Google Ads Preview

```tsx
// marketing/components/previews/google-ad-preview.tsx
import { CharCount } from '@/components/ui/char-count'

interface GoogleAdContent {
  headline1: string
  headline2: string
  headline3: string
  description1: string
  description2: string
  displayUrl?: string
  path1: string
  path2: string
}

interface Props {
  content: GoogleAdContent
  showCharCounts?: boolean
}

export function GoogleAdPreview({ content, showCharCounts = true }: Props) {
  const displayUrl = content.displayUrl || 'magnetmarketingpartners.com'

  return (
    <div className="max-w-[600px] p-4 bg-white rounded-lg border border-opal">
      <div className="space-y-1">
        {/* Sponsored label */}
        <div className="text-xs text-basalt font-medium">Sponsored</div>

        {/* Headlines */}
        <div className="text-xl text-[#1a0dab] hover:underline cursor-pointer leading-tight">
          {content.headline1} | {content.headline2} | {content.headline3}
        </div>

        {showCharCounts && (
          <div className="flex gap-4">
            <CharCount current={content.headline1.length} max={30} />
            <CharCount current={content.headline2.length} max={30} />
            <CharCount current={content.headline3.length} max={30} />
          </div>
        )}

        {/* Display URL */}
        <div className="text-sm text-[#006621]">
          {displayUrl}/{content.path1}/{content.path2}
        </div>

        {/* Descriptions */}
        <div className="text-sm text-gray-700 leading-relaxed">
          {content.description1} {content.description2}
        </div>

        {showCharCounts && (
          <div className="flex gap-4">
            <CharCount current={content.description1.length} max={90} />
            <CharCount current={content.description2.length} max={90} />
          </div>
        )}
      </div>
    </div>
  )
}
```

#### 5.3 LinkedIn Ad Preview

```tsx
// marketing/components/previews/linkedin-ad-preview.tsx
import { CharCount } from '@/components/ui/char-count'

interface LinkedInAdContent {
  introText: string
  headline: string
  description: string
  imageUrl?: string
  destinationUrl?: string
  ctaButton: string
}

interface Props {
  content: LinkedInAdContent
  showCharCounts?: boolean
}

export function LinkedInAdPreview({ content, showCharCounts = true }: Props) {
  return (
    <div className="max-w-[552px] bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-ember flex items-center justify-center text-white font-semibold">
          M
        </div>
        <div>
          <div className="font-semibold text-sm">Magnet</div>
          <div className="text-xs text-gray-500">Promoted</div>
        </div>
      </div>

      {/* Intro text */}
      <div className="px-4 pb-3">
        <p className="text-sm text-gray-900">{content.introText}</p>
        {showCharCounts && <CharCount current={content.introText.length} max={150} className="mt-1" />}
      </div>

      {/* Image placeholder */}
      <div className="aspect-[1.91/1] bg-gray-100 flex items-center justify-center text-gray-400">
        {content.imageUrl ? (
          <img src={content.imageUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <span>1200 × 628 image</span>
        )}
      </div>

      {/* Card content */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-sm text-gray-500 mb-1">{content.destinationUrl || 'magnetmarketingpartners.com'}</div>
        <div className="font-semibold text-gray-900 mb-1">{content.headline}</div>
        {showCharCounts && <CharCount current={content.headline.length} max={70} className="mb-1" />}
        <div className="text-sm text-gray-600">{content.description}</div>
        {showCharCounts && <CharCount current={content.description.length} max={100} className="mt-1" />}
      </div>

      {/* CTA */}
      <div className="px-4 pb-4">
        <button className="px-4 py-2 bg-[#0a66c2] text-white text-sm font-semibold rounded-full">
          {content.ctaButton}
        </button>
      </div>
    </div>
  )
}
```

#### 5.4 LinkedIn Post Preview

```tsx
// marketing/components/previews/linkedin-post-preview.tsx
import { CharCount } from '@/components/ui/char-count'

interface LinkedInPostContent {
  postText: string
  hashtags: string[]
  imageUrl?: string
  linkUrl?: string
  linkTitle?: string
  linkDescription?: string
}

interface Props {
  content: LinkedInPostContent
  showCharCounts?: boolean
}

export function LinkedInPostPreview({ content, showCharCounts = true }: Props) {
  return (
    <div className="max-w-[552px] bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-ember flex items-center justify-center text-white font-semibold">
          M
        </div>
        <div>
          <div className="font-semibold text-sm">Magnet</div>
          <div className="text-xs text-gray-500">1h • 🌐</div>
        </div>
      </div>

      {/* Post text */}
      <div className="px-4 pb-3">
        <p className="text-sm text-gray-900 whitespace-pre-wrap">{content.postText}</p>
        {showCharCounts && (
          <CharCount current={content.postText.length} max={3000} className="mt-2" />
        )}
        <div className="mt-2 text-[#0a66c2] text-sm">
          {content.hashtags.map((tag) => `#${tag}`).join(' ')}
        </div>
      </div>

      {/* Optional image */}
      {content.imageUrl && (
        <div className="aspect-[1.91/1] bg-gray-100">
          <img src={content.imageUrl} alt="" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Engagement bar */}
      <div className="px-4 py-3 border-t border-gray-200 flex gap-6 text-gray-500 text-sm">
        <span>👍 Like</span>
        <span>💬 Comment</span>
        <span>🔄 Repost</span>
        <span>📤 Send</span>
      </div>
    </div>
  )
}
```

#### 5.5 Facebook Preview

```tsx
// marketing/components/previews/facebook-preview.tsx
import { CharCount } from '@/components/ui/char-count'

interface FacebookContent {
  primaryText: string
  headline: string
  description: string
  imageUrl?: string
  destinationUrl?: string
  ctaButton: string
}

interface Props {
  content: FacebookContent
  showCharCounts?: boolean
}

export function FacebookPreview({ content, showCharCounts = true }: Props) {
  return (
    <div className="max-w-[500px] bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-ember flex items-center justify-center text-white font-semibold text-sm">
          M
        </div>
        <div>
          <div className="font-semibold text-sm">Magnet</div>
          <div className="text-xs text-gray-500">Sponsored · 🌐</div>
        </div>
      </div>

      {/* Primary text */}
      <div className="px-4 pb-3">
        <p className="text-sm text-gray-900">{content.primaryText}</p>
        {showCharCounts && <CharCount current={content.primaryText.length} max={125} className="mt-1" />}
      </div>

      {/* Image placeholder */}
      <div className="aspect-square bg-gray-100 flex items-center justify-center text-gray-400">
        {content.imageUrl ? (
          <img src={content.imageUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <span>1080 × 1080 image</span>
        )}
      </div>

      {/* Card content */}
      <div className="p-4 border-t border-gray-200 flex justify-between items-center">
        <div className="flex-1">
          <div className="text-xs text-gray-500 uppercase">{content.destinationUrl || 'MAGNETMARKETINGPARTNERS.COM'}</div>
          <div className="font-semibold text-gray-900">{content.headline}</div>
          {showCharCounts && <CharCount current={content.headline.length} max={40} />}
          <div className="text-sm text-gray-600">{content.description}</div>
          {showCharCounts && <CharCount current={content.description.length} max={30} />}
        </div>
        <button className="px-4 py-2 bg-gray-100 text-gray-900 text-sm font-semibold rounded">
          {content.ctaButton}
        </button>
      </div>
    </div>
  )
}
```

#### 5.6 SERP Preview

```tsx
// marketing/components/previews/serp-preview.tsx
import { CharCount } from '@/components/ui/char-count'

interface SerpContent {
  title: string
  description: string
  url?: string
  breadcrumbs: string[]
}

interface Props {
  content: SerpContent
  showCharCounts?: boolean
}

export function SerpPreview({ content, showCharCounts = true }: Props) {
  const baseUrl = content.url || 'magnetmarketingpartners.com'

  return (
    <div className="max-w-[600px] p-4 bg-white rounded-lg border border-opal">
      {/* Favicon and URL */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-ember" />
        </div>
        <div>
          <div className="text-sm text-gray-700">{baseUrl}</div>
          <div className="text-xs text-gray-500">
            https://{baseUrl} › {content.breadcrumbs.join(' › ')}
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl text-[#1a0dab] hover:underline cursor-pointer leading-tight mb-1">
        {content.title}
      </h3>
      {showCharCounts && <CharCount current={content.title.length} max={60} className="mb-1" />}

      {/* Description */}
      <p className="text-sm text-gray-700 leading-relaxed">
        {content.description}
      </p>
      {showCharCounts && <CharCount current={content.description.length} max={160} className="mt-1" />}
    </div>
  )
}
```

---

### Phase 6: Mockup Editor (2-3 hours)

#### 6.1 Platform Form Component

```tsx
// marketing/components/forms/platform-form.tsx
'use client'

import { useState } from 'react'
import { Platform } from '@/lib/prompts'

interface Props {
  platform: Platform
  content: Record<string, unknown>
  onChange: (content: Record<string, unknown>) => void
}

const PLATFORM_FIELDS: Record<Platform, { key: string; label: string; max: number; multiline?: boolean }[]> = {
  google_ad: [
    { key: 'headline1', label: 'Headline 1', max: 30 },
    { key: 'headline2', label: 'Headline 2', max: 30 },
    { key: 'headline3', label: 'Headline 3', max: 30 },
    { key: 'description1', label: 'Description 1', max: 90, multiline: true },
    { key: 'description2', label: 'Description 2', max: 90, multiline: true },
    { key: 'path1', label: 'Path 1', max: 15 },
    { key: 'path2', label: 'Path 2', max: 15 },
  ],
  linkedin_ad: [
    { key: 'introText', label: 'Intro Text', max: 150, multiline: true },
    { key: 'headline', label: 'Headline', max: 70 },
    { key: 'description', label: 'Description', max: 100, multiline: true },
    { key: 'ctaButton', label: 'CTA Button', max: 20 },
  ],
  linkedin_post: [
    { key: 'postText', label: 'Post Text', max: 3000, multiline: true },
    { key: 'hashtags', label: 'Hashtags (comma-separated)', max: 100 },
  ],
  facebook: [
    { key: 'primaryText', label: 'Primary Text', max: 125, multiline: true },
    { key: 'headline', label: 'Headline', max: 40 },
    { key: 'description', label: 'Description', max: 30 },
    { key: 'ctaButton', label: 'CTA Button', max: 20 },
  ],
  serp: [
    { key: 'title', label: 'Meta Title', max: 60 },
    { key: 'description', label: 'Meta Description', max: 160, multiline: true },
    { key: 'breadcrumbs', label: 'Breadcrumbs (comma-separated)', max: 50 },
  ],
}

export function PlatformForm({ platform, content, onChange }: Props) {
  const fields = PLATFORM_FIELDS[platform]

  function handleChange(key: string, value: string) {
    onChange({ ...content, [key]: value })
  }

  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const value = String(content[field.key] || '')
        const isOver = value.length > field.max

        return (
          <div key={field.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              <span className={`ml-2 text-xs ${isOver ? 'text-red-500' : 'text-gray-400'}`}>
                {value.length}/{field.max}
              </span>
            </label>
            {field.multiline ? (
              <textarea
                value={value}
                onChange={(e) => handleChange(field.key, e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-opal rounded-lg focus:outline-none focus:ring-2 focus:ring-ember"
              />
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full px-3 py-2 border border-opal rounded-lg focus:outline-none focus:ring-2 focus:ring-ember"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
```

#### 6.2 Editor Page

```tsx
// marketing/app/editor/page.tsx
'use client'

import { useState } from 'react'
import { Platform } from '@/lib/prompts'
import { PlatformForm } from '@/components/forms/platform-form'
import { GoogleAdPreview } from '@/components/previews/google-ad-preview'
import { LinkedInAdPreview } from '@/components/previews/linkedin-ad-preview'
import { LinkedInPostPreview } from '@/components/previews/linkedin-post-preview'
import { FacebookPreview } from '@/components/previews/facebook-preview'
import { SerpPreview } from '@/components/previews/serp-preview'

const PLATFORMS: { value: Platform; label: string }[] = [
  { value: 'google_ad', label: 'Google Ads' },
  { value: 'linkedin_ad', label: 'LinkedIn Sponsored' },
  { value: 'linkedin_post', label: 'LinkedIn Organic' },
  { value: 'facebook', label: 'Facebook/Instagram' },
  { value: 'serp', label: 'SERP Preview' },
]

const SEGMENTS = [
  'B2B SaaS Leaders',
  'E-commerce Brands',
  'Professional Services',
  'Healthcare Tech',
  'Manufacturing',
]

export default function EditorPage() {
  const [platform, setPlatform] = useState<Platform>('google_ad')
  const [segment, setSegment] = useState(SEGMENTS[0])
  const [topic, setTopic] = useState('')
  const [additionalContext, setAdditionalContext] = useState('')
  const [content, setContent] = useState<Record<string, unknown>>({})
  const [generating, setGenerating] = useState(false)
  const [mockupName, setMockupName] = useState('')

  async function handleGenerate() {
    setGenerating(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, segment, topic, additionalContext }),
      })
      const data = await res.json()
      if (data.content) {
        setContent(data.content)
      }
    } finally {
      setGenerating(false)
    }
  }

  const PreviewComponent = {
    google_ad: GoogleAdPreview,
    linkedin_ad: LinkedInAdPreview,
    linkedin_post: LinkedInPostPreview,
    facebook: FacebookPreview,
    serp: SerpPreview,
  }[platform]

  return (
    <div className="min-h-screen bg-snow">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold text-oxblood mb-8">Mockup Editor</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Controls & Form */}
          <div className="space-y-6">
            {/* Platform selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
              <select
                value={platform}
                onChange={(e) => {
                  setPlatform(e.target.value as Platform)
                  setContent({})
                }}
                className="w-full px-3 py-2 border border-opal rounded-lg"
              >
                {PLATFORMS.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            {/* AI Generation */}
            <div className="p-4 bg-white rounded-lg border border-opal space-y-4">
              <h2 className="font-semibold text-oxblood">AI Generation</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Segment</label>
                <select
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  className="w-full px-3 py-2 border border-opal rounded-lg"
                >
                  {SEGMENTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic/Focus</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Website redesign services"
                  className="w-full px-3 py-2 border border-opal rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Context (optional)</label>
                <textarea
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  rows={2}
                  placeholder="Any specific messaging, keywords, or offers..."
                  className="w-full px-3 py-2 border border-opal rounded-lg"
                />
              </div>

              <button
                onClick={handleGenerate}
                disabled={generating || !topic}
                className="w-full py-2 bg-ember text-frost rounded-lg hover:bg-ember/90 disabled:opacity-50"
              >
                {generating ? 'Generating...' : 'Generate with AI'}
              </button>
            </div>

            {/* Manual edit form */}
            <div className="p-4 bg-white rounded-lg border border-opal">
              <h2 className="font-semibold text-oxblood mb-4">Edit Content</h2>
              <PlatformForm
                platform={platform}
                content={content}
                onChange={setContent}
              />
            </div>

            {/* Save controls */}
            <div className="p-4 bg-white rounded-lg border border-opal space-y-4">
              <input
                type="text"
                value={mockupName}
                onChange={(e) => setMockupName(e.target.value)}
                placeholder="Mockup name..."
                className="w-full px-3 py-2 border border-opal rounded-lg"
              />
              <button
                disabled={!mockupName || Object.keys(content).length === 0}
                className="w-full py-2 bg-oxblood text-frost rounded-lg hover:bg-oxblood/90 disabled:opacity-50"
              >
                Save Mockup
              </button>
            </div>
          </div>

          {/* Right: Preview */}
          <div>
            <h2 className="font-semibold text-oxblood mb-4">Preview</h2>
            <div className="sticky top-8">
              {Object.keys(content).length > 0 ? (
                <PreviewComponent content={content as any} showCharCounts />
              ) : (
                <div className="p-8 bg-white rounded-lg border border-opal text-center text-gray-400">
                  Generate or enter content to see preview
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

### Phase 7: Campaign Management (2-3 hours)

#### 7.1 Campaigns API Routes

```typescript
// marketing/app/api/campaigns/route.ts
import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  const campaigns = await sql`
    SELECT c.*, COUNT(m.id) as mockup_count
    FROM marketing_campaigns c
    LEFT JOIN marketing_mockups m ON m.campaign_id = c.id
    GROUP BY c.id
    ORDER BY c.updated_at DESC
  `
  return NextResponse.json(campaigns)
}

export async function POST(req: Request) {
  const { name, description } = await req.json()

  const [campaign] = await sql`
    INSERT INTO marketing_campaigns (name, description)
    VALUES (${name}, ${description})
    RETURNING *
  `

  return NextResponse.json(campaign)
}
```

```typescript
// marketing/app/api/campaigns/[id]/route.ts
import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [campaign] = await sql`
    SELECT * FROM marketing_campaigns WHERE id = ${id}
  `

  if (!campaign) {
    return NextResponse.json({ error: 'Campaign not found' }, { status: 404 })
  }

  const mockups = await sql`
    SELECT * FROM marketing_mockups
    WHERE campaign_id = ${id}
    ORDER BY sort_order ASC
  `

  return NextResponse.json({ ...campaign, mockups })
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const updates = await req.json()

  const [campaign] = await sql`
    UPDATE marketing_campaigns
    SET
      name = COALESCE(${updates.name}, name),
      description = COALESCE(${updates.description}, description),
      status = COALESCE(${updates.status}, status),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `

  return NextResponse.json(campaign)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  await sql`DELETE FROM marketing_campaigns WHERE id = ${id}`

  return NextResponse.json({ success: true })
}
```

#### 7.2 Mockups API Routes

```typescript
// marketing/app/api/mockups/route.ts
import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { campaignId, platform, name, content } = await req.json()

  // Get max sort_order for this campaign
  const [{ max }] = await sql`
    SELECT COALESCE(MAX(sort_order), -1) as max
    FROM marketing_mockups
    WHERE campaign_id = ${campaignId}
  `

  const [mockup] = await sql`
    INSERT INTO marketing_mockups (campaign_id, platform, name, content, sort_order)
    VALUES (${campaignId}, ${platform}, ${name}, ${JSON.stringify(content)}, ${max + 1})
    RETURNING *
  `

  return NextResponse.json(mockup)
}
```

```typescript
// marketing/app/api/mockups/[id]/route.ts
import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const updates = await req.json()

  const [mockup] = await sql`
    UPDATE marketing_mockups
    SET
      name = COALESCE(${updates.name}, name),
      content = COALESCE(${updates.content ? JSON.stringify(updates.content) : null}, content),
      sort_order = COALESCE(${updates.sortOrder}, sort_order),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `

  return NextResponse.json(mockup)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  await sql`DELETE FROM marketing_mockups WHERE id = ${id}`

  return NextResponse.json({ success: true })
}
```

#### 7.3 Campaign List Page

```tsx
// marketing/app/campaigns/page.tsx
import Link from 'next/link'
import { sql } from '@/lib/db'

async function getCampaigns() {
  const campaigns = await sql`
    SELECT c.*, COUNT(m.id)::int as mockup_count
    FROM marketing_campaigns c
    LEFT JOIN marketing_mockups m ON m.campaign_id = c.id
    GROUP BY c.id
    ORDER BY c.updated_at DESC
  `
  return campaigns
}

export default async function CampaignsPage() {
  const campaigns = await getCampaigns()

  return (
    <div className="min-h-screen bg-snow">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-oxblood">Campaigns</h1>
          <Link
            href="/campaigns/new"
            className="px-4 py-2 bg-ember text-frost rounded-lg hover:bg-ember/90"
          >
            New Campaign
          </Link>
        </div>

        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <Link
              key={campaign.id}
              href={`/campaigns/${campaign.id}`}
              className="block p-4 bg-white rounded-lg border border-opal hover:border-basalt transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-oxblood">{campaign.name}</h2>
                  {campaign.description && (
                    <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    {campaign.mockup_count} mockup{campaign.mockup_count !== 1 ? 's' : ''}
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  campaign.status === 'approved' ? 'bg-green-100 text-green-700' :
                  campaign.status === 'review' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {campaign.status}
                </span>
              </div>
            </Link>
          ))}

          {campaigns.length === 0 && (
            <p className="text-center text-gray-400 py-12">No campaigns yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
```

---

### Phase 8: Share Links (1-2 hours)

#### 8.1 Share API Route

```typescript
// marketing/app/api/share/route.ts
import { sql } from '@/lib/db'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: Request) {
  const { campaignId, expiresInDays = 7 } = await req.json()

  const token = crypto.randomBytes(32).toString('hex')
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + expiresInDays)

  const [link] = await sql`
    INSERT INTO marketing_share_links (token, campaign_id, expires_at)
    VALUES (${token}, ${campaignId}, ${expiresAt.toISOString()})
    RETURNING *
  `

  return NextResponse.json({
    ...link,
    url: `${process.env.NEXT_PUBLIC_URL || ''}/review/${token}`,
  })
}
```

#### 8.2 Public Review Page

```tsx
// marketing/app/review/[token]/page.tsx
import { sql } from '@/lib/db'
import { notFound } from 'next/navigation'
import { GoogleAdPreview } from '@/components/previews/google-ad-preview'
import { LinkedInAdPreview } from '@/components/previews/linkedin-ad-preview'
import { LinkedInPostPreview } from '@/components/previews/linkedin-post-preview'
import { FacebookPreview } from '@/components/previews/facebook-preview'
import { SerpPreview } from '@/components/previews/serp-preview'

async function getCampaignByToken(token: string) {
  const [link] = await sql`
    SELECT * FROM marketing_share_links
    WHERE token = ${token}
  `

  if (!link) return null

  // Check expiration
  if (new Date(link.expires_at) < new Date()) {
    return { expired: true }
  }

  const [campaign] = await sql`
    SELECT * FROM marketing_campaigns WHERE id = ${link.campaign_id}
  `

  if (!campaign) return null

  const mockups = await sql`
    SELECT * FROM marketing_mockups
    WHERE campaign_id = ${campaign.id}
    ORDER BY sort_order ASC
  `

  return { campaign, mockups }
}

const PREVIEW_COMPONENTS = {
  google_ad: GoogleAdPreview,
  linkedin_ad: LinkedInAdPreview,
  linkedin_post: LinkedInPostPreview,
  facebook: FacebookPreview,
  serp: SerpPreview,
}

export default async function ReviewPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const data = await getCampaignByToken(token)

  if (!data) {
    notFound()
  }

  if ('expired' in data) {
    return (
      <div className="min-h-screen bg-snow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-oxblood mb-2">Link Expired</h1>
          <p className="text-gray-600">This review link has expired. Please request a new one.</p>
        </div>
      </div>
    )
  }

  const { campaign, mockups } = data

  return (
    <div className="min-h-screen bg-snow">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-oxblood">{campaign.name}</h1>
          {campaign.description && (
            <p className="text-gray-600 mt-2">{campaign.description}</p>
          )}
        </div>

        <div className="space-y-8">
          {mockups.map((mockup) => {
            const Preview = PREVIEW_COMPONENTS[mockup.platform as keyof typeof PREVIEW_COMPONENTS]
            return (
              <div key={mockup.id} className="p-6 bg-white rounded-lg border border-opal">
                <h2 className="font-semibold text-oxblood mb-4">{mockup.name}</h2>
                <Preview content={mockup.content} showCharCounts={false} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
```

---

## Deployment Configuration

### Vercel Configuration

The marketing app will be deployed as a separate Vercel project.

```json
// marketing/vercel.json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```

### Environment Variables for Vercel

Set in Vercel dashboard:
- `GROQ_API_KEY` - Groq API key
- `DATABASE_URL` - Neon connection string (same as website)
- `AUTH_PASSWORD_HASH` - bcrypt hash (generate with `bcrypt.hash('password', 10)`)
- `AUTH_SECRET` - Random 32+ character string
- `NEXT_PUBLIC_URL` - Full URL (e.g., `https://marketing.magnetmarketingpartners.com`)
- `CONTEXT_DIR` - Path to context files (may need bundling strategy)

### Context Files Handling

Option A: **Copy context files at build time**
```json
// marketing/package.json
{
  "scripts": {
    "prebuild": "cp -r ../context ./context",
    "build": "next build"
  }
}
```

Option B: **Bundle context in API route** (recommended for serverless)
```typescript
// Pre-process context files and embed in code at build time
```

---

## Recommended Implementation Order

1. **Phase 1** - App scaffolding (get running locally)
2. **Phase 2** - Database migration
3. **Phase 3** - Authentication (protect routes)
4. **Phase 4** - AI generation route
5. **Phase 5** - Preview components (start with Google Ads)
6. **Phase 6** - Editor page (integrate previews + AI)
7. **Phase 7** - Campaign management
8. **Phase 8** - Share links
9. **Deploy & test**

---

## Testing Checklist

- [ ] Password authentication works
- [ ] Protected routes redirect to login
- [ ] AI generation returns valid JSON for all platforms
- [ ] Preview components render correctly
- [ ] Character counts show correct colors
- [ ] Mockups save to database
- [ ] Campaigns list and detail pages work
- [ ] Share links generate and expire correctly
- [ ] Public review page loads without auth
- [ ] All environment variables documented

---

## Future Enhancements

- Email template previews
- Landing page copy generation
- A/B variant generation
- Export to platform-specific formats
- Team collaboration (multiple users)
- Comments on mockups
- Version history for mockups
