---
name: Readiness Assessment Tool
overview: Interactive questionnaire that generates personalized AI analysis of which methodology phase fits the prospect's current situation.
todos:
  - id: assessment-page
    content: Create /assessment page with multi-step questionnaire
    status: pending
  - id: question-design
    content: Design 8-10 diagnostic questions covering the 4 phases
    status: pending
  - id: ai-analysis
    content: Build AI route to analyze responses and generate recommendations
    status: pending
  - id: results-page
    content: Create results page with phase recommendations and next steps
    status: pending
---

# Readiness Assessment Tool

## Goal

Create a self-serve diagnostic tool that helps prospects understand where they are in their marketing maturity and which Magnet methodology phase would benefit them most.

## User Journey

```
/assessment → Questions (8-10) → AI Analysis → Results Page
                                      ↓
                              Save to database
                                      ↓
                              Email results to prospect + Magnet
```

## Question Categories

### Foundation Phase Signals (Questions 1-2)
- Do you have documented brand guidelines?
- Is your website converting visitors to leads effectively?

### Activation Phase Signals (Questions 3-4)
- Are you actively running paid acquisition campaigns?
- Do you have content driving organic traffic?

### Acceleration Phase Signals (Questions 5-6)
- Do you have a CRM with automated follow-up sequences?
- Can you attribute revenue to specific marketing channels?

### Retention Phase Signals (Questions 7-8)
- Do you have automated email sequences for existing customers?
- Do you measure and act on customer feedback systematically?

## AI Analysis Output

The AI generates:
1. **Primary Phase Recommendation** — Where to start
2. **Readiness Score** — 1-10 for each phase
3. **Key Gaps** — 3-5 specific areas needing attention
4. **Quick Wins** — 2-3 immediate actions they could take
5. **Suggested Engagement** — Which Magnet services would help

## Files to Create

| File | Purpose |
|------|---------|
| `website/src/app/assessment/page.tsx` | Main assessment page |
| `website/src/app/assessment/results/page.tsx` | Results display |
| `website/src/app/api/assessment/route.ts` | Save and analyze responses |
| `website/src/components/sections/assessment-form.tsx` | Multi-step form component |
| `website/src/data/assessment-questions.ts` | Question data |

## Design Notes

- Progress indicator showing current step
- One question per screen for focus
- Smooth transitions between questions
- Results page matches site aesthetic with phase visualization
