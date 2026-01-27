# Marketing Studio

AI-powered ad copy generation and campaign management tool for Magnet.

## Features

- **Password-protected** internal tool
- **AI-powered ad copy generation** using Groq (Llama 3.3 70B)
- **5 platform previews**: Google Ads, LinkedIn Sponsored, LinkedIn Organic, Facebook/Instagram, SERP
- **Campaign organization** with mockup management
- **Shareable review links** for client/stakeholder review

## Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your values
   ```

3. **Run database migration:**
   The migration file is at `../website/src/lib/db/migrations/014_marketing_tables.sql`
   Run it against your Neon database.

4. **Generate password hash:**
   ```bash
   node -e "const bcrypt=require('bcryptjs');bcrypt.hash('yourpassword',10).then(console.log)"
   ```
   Add the output to `AUTH_PASSWORD_HASH` in `.env.local`

5. **Start development server:**
   ```bash
   pnpm dev
   ```

6. **Start development server:**
   ```bash
   pnpm dev
   ```

7. **Open http://localhost:5010** and log in with your password

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4
- Neon PostgreSQL
- Groq AI (Llama 3.3 70B)
- TypeScript

## Project Structure

```
marketing/
├── app/
│   ├── api/          # API routes (auth, generate, campaigns, mockups, share)
│   ├── campaigns/    # Campaign list and detail pages
│   ├── editor/       # Mockup editor page
│   ├── login/        # Login page
│   └── review/       # Public review pages (no auth required)
├── components/
│   ├── campaigns/    # Campaign-specific components
│   ├── forms/        # Form components
│   ├── previews/     # Platform preview components
│   └── ui/           # UI primitives
└── lib/              # Utilities (db, auth, context, prompts)
```

## Usage

1. **Create a mockup:**
   - Go to `/editor`
   - Select a platform
   - Enter topic and segment
   - Click "Generate with AI" or edit manually
   - Save the mockup (creates a new campaign automatically)

2. **Manage campaigns:**
   - View all campaigns at `/campaigns`
   - Click a campaign to see all mockups
   - Create share links for review

3. **Share for review:**
   - On a campaign detail page, click "Create Share Link"
   - Copy the link and share with stakeholders
   - Links expire after 7 days (configurable)

## Environment Variables

See `.env.local.example` for all required variables.

## Deployment

Deploy to Vercel as a separate project. Set all environment variables in the Vercel dashboard.
