---
name: Analytics Dashboard Integration
overview: Embed or build analytics dashboard showing website performance, lead metrics, and conversion data.
todos:
  - id: requirements
    content: Define key metrics to track and display
    status: pending
  - id: data-sources
    content: Identify and connect data sources (Vercel, Neon, Plausible)
    status: pending
  - id: dashboard-ui
    content: Build or embed dashboard interface
    status: pending
  - id: alerts
    content: Set up alerts for key metric changes
    status: pending
---

# Analytics Dashboard Integration

## Goal

Create a unified view of website and business metrics for internal use:
- Website traffic and engagement
- Lead generation performance
- Conversion funnel metrics
- Content performance

## Key Metrics

### Website Performance
- Page views, unique visitors
- Top pages by traffic
- Bounce rate, time on site
- Traffic sources

### Lead Generation
- Contact form submissions (from Neon)
- Lead quality distribution (from AI enrichment)
- Response time metrics
- Conversion to opportunity

### Content Performance
- Blog post views
- Case study engagement
- Assessment completions
- Chat interactions

## Data Sources

| Metric | Source |
|--------|--------|
| Traffic | Vercel Analytics or Plausible |
| Leads | Neon `contacts` table |
| Invoices | Harvest API |
| Email | Resend delivery stats |

## Implementation Options

### Option 1: Embedded Plausible
- Privacy-focused analytics
- Simple embed in admin area
- ~$9/month

### Option 2: Custom Dashboard
- Build with Recharts or Tremor
- Pull from all data sources
- Full control, more work

### Option 3: Hybrid
- Plausible for traffic
- Custom panels for business metrics

**Recommendation**: Start with Plausible + custom panels for lead/conversion data.

## Dashboard Layout

```
┌─────────────────────────────────────────────────────┐
│ Traffic Overview (Plausible embed)                   │
├─────────────────────────────────────────────────────┤
│ Leads This Week    │ Avg Lead Score   │ Response    │
│      12            │     72           │   4.2 hrs   │
├─────────────────────────────────────────────────────┤
│ Lead Sources       │ Conversion Funnel              │
│ - Organic: 45%     │ Visits → Contacts → Opps       │
│ - Direct: 30%      │                                │
│ - Referral: 25%    │                                │
└─────────────────────────────────────────────────────┘
```

## Files to Create

| File | Purpose |
|------|---------|
| `website/src/app/admin/analytics/page.tsx` | Analytics dashboard |
| `website/src/components/analytics/traffic-embed.tsx` | Plausible embed |
| `website/src/components/analytics/lead-metrics.tsx` | Lead stats cards |
| `website/src/app/api/analytics/leads/route.ts` | Lead metrics API |

## Access Control

- Dashboard should be admin-only
- Simple auth check (environment variable secret or portal auth)
- No public access to metrics
