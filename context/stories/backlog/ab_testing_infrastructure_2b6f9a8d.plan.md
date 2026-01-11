---
name: A/B Testing Infrastructure
overview: Set up infrastructure for running A/B tests on headlines, CTAs, and page layouts to optimize conversion.
todos:
  - id: testing-library
    content: Evaluate and integrate A/B testing library or service
    status: pending
  - id: experiment-config
    content: Create experiment configuration system
    status: pending
  - id: variant-components
    content: Build variant wrapper components
    status: pending
  - id: tracking
    content: Implement conversion tracking and analysis
    status: pending
---

# A/B Testing Infrastructure

## Goal

Enable data-driven optimization of key site elements:
- Headlines and value propositions
- Call-to-action copy and placement
- Form designs
- Page layouts

## Testing Framework Options

### Option 1: Vercel Edge Config + Feature Flags
- Native to Vercel stack
- Edge-level variant assignment
- Good for simple tests

### Option 2: Statsig
- Full-featured A/B platform
- Statistical significance calculation
- Free tier available

### Option 3: Custom with Neon
- Store experiments in database
- Custom variant assignment
- Full control, more work

**Recommendation**: Start with Vercel Edge Config for simplicity.

## Implementation Pattern

```tsx
// Variant wrapper component
<Experiment name="hero-headline">
  <Variant name="control">
    <h1>Build Marketing That Scales</h1>
  </Variant>
  <Variant name="specific">
    <h1>From First Click to Loyal Customer</h1>
  </Variant>
</Experiment>
```

## Experiment Configuration

```typescript
// experiments.ts
export const experiments = {
  'hero-headline': {
    variants: ['control', 'specific'],
    traffic: 0.5, // 50% of users in experiment
    metric: 'contact_form_submit'
  },
  'cta-copy': {
    variants: ['control', 'urgent'],
    traffic: 0.3,
    metric: 'cta_click'
  }
}
```

## Tracking Events

### Key Conversion Events
- `page_view` — Track which variant shown
- `contact_form_start` — Started filling form
- `contact_form_submit` — Completed submission
- `cta_click` — Clicked any CTA
- `assessment_complete` — Finished readiness assessment

## Analysis Approach

1. Run test for minimum 2 weeks or 100 conversions per variant
2. Calculate statistical significance (p < 0.05)
3. Document winner and learnings
4. Apply winner, archive test

## Files to Create

| File | Purpose |
|------|---------|
| `website/src/lib/experiments/config.ts` | Experiment definitions |
| `website/src/lib/experiments/variant.tsx` | Experiment/Variant components |
| `website/src/lib/experiments/tracking.ts` | Event tracking utilities |
| `website/src/app/api/experiments/route.ts` | Variant assignment API |

## First Tests to Run

1. **Homepage headline** — Current vs. more specific value prop
2. **Contact CTA** — "Get Started" vs. "Schedule a Call"
3. **Pricing display** — Show prices vs. "Contact for pricing"

## Privacy Considerations

- Use anonymous visitor ID (cookie)
- No PII in experiment data
- Clear data after 90 days
- Respect Do Not Track
