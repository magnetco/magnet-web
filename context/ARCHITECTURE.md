# ARCHITECTURE.md

Visual overview of how the magnet-web codebase is structured and how the parts interconnect.

For business context, see [`OVERVIEW.md`](OVERVIEW.md). For the tech stack, see the root [`README.md`](../README.md).

---

## Codebase Structure

```mermaid
flowchart TB
    subgraph context [context/ - Documentation]
        BRAND[BRAND.md]
        DESIGN[DESIGN.md]
        STRATEGY[STRATEGY.md]
        OVERVIEW[OVERVIEW.md]
        OTHER[ICP, METHOD, PRICING, ROADMAP]
    end

    subgraph studio [studio/ - Sanity CMS :3333]
        SCHEMAS[Schema Types]
        POSTS[Posts + Categories]
        JOBS[Jobs + Departments + Locations + Types]
        TEAM[Team Members]
        CASES[Case Studies]
    end

    subgraph website [website/ - Next.js :3000]
        subgraph PAGES [Public Pages]
            HOME[Home, Careers, Posts, Team, Contact]
            METHOD[Method Pages]
            APPLY[Apply Form]
        end
        subgraph API [API Routes]
            LEADS_API[/api/leads]
            APPLICANTS_API[/api/applicants]
        end
        SANITY_CLIENT[Sanity Client + Queries]
        NEON_WEB[Neon DB Connection]
        RESEND[Resend Email]
    end

    subgraph data [data/ - Express API :4001]
        DATA_UI[Admin Dashboard UI]
        subgraph DATA_API [API Endpoints]
            CLIENTS_R[/api/clients]
            LEADS_R[/api/leads]
            APPLICANTS_R[/api/applicants]
            COMPANIES_R[/api/companies]
            PEOPLE_R[/api/people]
            VERSIONS_R[/api/versions]
            ENRICH_R[/api/enrich]
        end
        NEON_DATA[Neon DB Connection]
    end

    subgraph external [External Services]
        SANITY_API[Sanity Cloud API]
        NEON[(Neon PostgreSQL)]
        RESEND_SVC[Resend Email Service]
    end

    %% Context informs development
    context -.->|informs development| website
    context -.->|informs development| studio

    %% Studio to Sanity Cloud
    SCHEMAS --> SANITY_API
    POSTS --> SANITY_API
    JOBS --> SANITY_API
    TEAM --> SANITY_API
    CASES --> SANITY_API

    %% Website fetches from Sanity
    SANITY_CLIENT -->|GROQ queries| SANITY_API
    PAGES --> SANITY_CLIENT

    %% Website writes to Neon
    LEADS_API --> NEON_WEB
    APPLICANTS_API --> NEON_WEB
    NEON_WEB -->|writes leads, applicants, people, companies| NEON

    %% Website sends emails
    LEADS_API --> RESEND
    APPLICANTS_API --> RESEND
    RESEND --> RESEND_SVC

    %% Data app connects to same Neon DB
    DATA_API --> NEON_DATA
    NEON_DATA -->|CRUD all tables| NEON
    DATA_UI --> DATA_API
```

---

## How the Parts Connect

| Source | Target | Relationship |
|--------|--------|--------------|
| **website** | **studio** | Website fetches content (posts, jobs, team, case studies) from Sanity via GROQ queries using shared project ID `o28dq6x5` |
| **website** | **Neon DB** | Website API routes write leads and job applicants to PostgreSQL, also creates/links people and companies |
| **data** | **Neon DB** | Data admin app provides full CRUD access to all database tables (clients, leads, applicants, companies, people) with version history |
| **website** + **data** | **Shared DB** | Both connect to the same Neon PostgreSQL database via `DATABASE_URL` |
| **context** | **All** | Documentation files inform development decisions but are not directly consumed by code |

---

## Data Flow Summary

1. **Content Management Flow**: Editors use **studio** to manage posts, jobs, team members, and case studies in Sanity Cloud

2. **Content Display Flow**: **website** fetches this content via Sanity client and displays it on public pages

3. **Lead Capture Flow**: Visitors submit contact forms on **website** → writes to Neon DB + sends email via Resend

4. **Application Flow**: Job applicants apply on **website** → writes to Neon DB + sends email notification

5. **Admin Management Flow**: Internal team uses **data** app to manage all database records with full CRUD, version history, and data enrichment

---

## Directory Purpose

| Directory | Purpose | Port |
|-----------|---------|------|
| `context/` | Documentation and guidelines for development | N/A |
| `studio/` | Sanity CMS Studio for content editors | 3333 |
| `website/` | Public Next.js website | 3010 |
| `data/` | Internal admin dashboard for data management | 4010 |
| `marketing/` | Marketing Studio (AI ad copy generation) | 5010 |

---

## Key Files

### Studio → Website Connection

- **Studio schemas**: `studio/schemaTypes/*.ts` define content types
- **Website client**: `website/src/lib/sanity/client.ts` connects to Sanity API
- **Website queries**: `website/src/lib/sanity/queries.ts` defines GROQ queries

### Shared Database

- **Website DB**: `website/src/lib/db/neon.ts` - used by API routes
- **Data app DB**: `data/server/db.ts` - loads from `website/.env.local`
- **Migrations**: `website/src/lib/db/migrations/*.sql`

### Email Integration

- **Resend client**: `website/src/lib/email/resend.ts`
- **Templates**: `website/src/lib/email/templates/`

