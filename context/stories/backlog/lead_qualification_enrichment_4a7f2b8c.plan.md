---
name: Lead Qualification & Enrichment
overview: Extend Vercel AI SDK to analyze contact form submissions, score lead quality, extract pain points, and suggest follow-up priority to improve sales efficiency.
todos:
  - id: schema-update
    content: Add lead_score, pain_points, priority fields to contacts table
    status: pending
  - id: ai-analysis-route
    content: Create API route that runs AI analysis on new contact submissions
    status: pending
  - id: scoring-prompt
    content: Design prompt for Llama 3.1 to score and categorize leads
    status: pending
  - id: data-app-integration
    content: Display AI-generated insights in data app contacts view
    status: pending
---

# Lead Qualification & Enrichment

## Goal

Automatically analyze incoming contact form submissions to:
- Score lead quality (0-100) based on fit and intent signals
- Extract specific pain points mentioned in their message
- Suggest follow-up priority (high/medium/low)
- Recommend which methodology phase to discuss first

## Architecture

```mermaid
flowchart LR
    Form[Contact Form] -->|Submit| API["/api/contact"]
    API -->|INSERT| DB[(Neon: contacts)]
    API -->|Trigger| AIRoute["/api/analyze-lead"]
    AIRoute -->|Groq Llama 3.1| Analysis[Lead Analysis]
    Analysis -->|UPDATE| DB
    DataApp[Data App] -->|Display| Insights[AI Insights]
```

## Database Changes

Add columns to `contacts` table:
- `lead_score` (integer, 0-100)
- `pain_points` (text array)
- `suggested_priority` (text: high/medium/low)
- `recommended_phase` (text: foundation/activation/acceleration/retention)
- `analysis_timestamp` (timestamp)

## AI Prompt Strategy

The prompt should analyze:
1. **Company context** — Size, industry, digital maturity signals
2. **Pain signals** — Specific problems mentioned
3. **Intent signals** — Urgency, budget mentions, timeline
4. **Fit assessment** — Match with Magnet's ideal client profile

## Files to Create

| File | Purpose |
|------|---------|
| `website/src/app/api/analyze-lead/route.ts` | AI analysis endpoint |
| `data/src/components/LeadInsightsPanel.tsx` | Display AI insights in data app |

## Files to Modify

| File | Change |
|------|--------|
| `website/src/app/api/contact/route.ts` | Trigger AI analysis after save |
| `website/src/lib/db/schema.sql` | Add lead analysis columns |
