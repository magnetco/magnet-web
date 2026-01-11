---
name: Neon Database Setup
overview: Set up Neon PostgreSQL database connection in the Next.js website using @vercel/postgres client with proper environment variable configuration.
todos:
  - id: env-local
    content: Create website/.env.local with Neon database credentials
    status: completed
  - id: env-example
    content: Create website/.env.example with placeholder values
    status: completed
  - id: install-pkg
    content: Install @vercel/postgres package in website workspace
    status: completed
  - id: db-util
    content: Create website/lib/db.ts utility file
    status: completed
---

# Neon Database Setup for Contact Form Enquiries

## Overview

Configure the Neon PostgreSQL database connection using `@vercel/postgres` in the `website/` workspace, with environment variables for local development and production.

## Files to Create/Modify

### 1. Environment Variables

Create [website/.env.local](website/.env.local) with the Vercel Postgres variables:

```bash
# Vercel Postgres (Neon) - deseret-neon database
POSTGRES_URL="postgresql://neondb_owner:npg_XqSiN8fnKU9E@ep-solitary-paper-ahrazlmi-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"
POSTGRES_URL_NON_POOLING="postgresql://neondb_owner:npg_XqSiN8fnKU9E@ep-solitary-paper-ahrazlmi.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require"
POSTGRES_USER="neondb_owner"
POSTGRES_HOST="ep-solitary-paper-ahrazlmi-pooler.c-3.us-east-1.aws.neon.tech"
POSTGRES_PASSWORD="npg_XqSiN8fnKU9E"
POSTGRES_DATABASE="neondb"
```

Create [website/.env.example](website/.env.example) with placeholder values for documentation:

```bash
# Vercel Postgres (Neon)
POSTGRES_URL="postgresql://user:password@host/database?sslmode=require"
POSTGRES_URL_NON_POOLING="postgresql://user:password@host/database?sslmode=require"
POSTGRES_USER="user"
POSTGRES_HOST="host"
POSTGRES_PASSWORD="password"
POSTGRES_DATABASE="database"
```

### 2. Install Dependencies

Install `@vercel/postgres` in the website workspace:

```bash
npm install @vercel/postgres --workspace=website
```

### 3. Database Utility File

Create [website/lib/db.ts](website/lib/db.ts) - a simple utility to export the database client:

```typescript
import { sql } from '@vercel/postgres';

export { sql };
```

This provides a centralized import point and makes it easy to add query helpers later.

## Verification

After setup, you can test the connection by running a simple query in a server component or API route:

```typescript
import { sql } from '@/lib/db';

const result = await sql`SELECT NOW()`;
```

## Notes

- The `POSTGRES_URL` uses connection pooling (via PgBouncer) - recommended for serverless
- `POSTGRES_URL_NON_POOLING` is for operations that don't work with pooling (like migrations)
- These environment variables are automatically available in Vercel deployments since you've already configured them in the Vercel UI