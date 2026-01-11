---
name: Competitive Positioning Assistant
overview: Interactive tool for prospects to compare their current solution against Magnet's approach, highlighting differentiators and fit.
todos:
  - id: comparison-page
    content: Create /compare page with interactive comparison UI
    status: pending
  - id: competitor-data
    content: Build data structure for common competitor approaches
    status: pending
  - id: ai-analysis
    content: Create AI route to analyze prospect's current situation
    status: pending
  - id: results-display
    content: Design compelling results view showing Magnet advantages
    status: pending
---

# Competitive Positioning Assistant

## Goal

Help prospects understand how Magnet's approach differs from:
- Their current in-house team
- Their current agency
- Generic agency approaches
- DIY/tool-based solutions

## User Journey

```
/compare → Select current approach → Describe situation → AI Analysis → Comparison Results
```

## Comparison Categories

### 1. In-House Team
- Limited bandwidth vs. dedicated partner
- Skill gaps vs. full-stack expertise
- Internal bias vs. external perspective

### 2. Current Agency
- Project-based vs. methodology-driven
- Siloed services vs. integrated approach
- Reporting vs. strategic partnership

### 3. DIY/Tools
- Tool fatigue vs. curated stack
- No strategy vs. methodology framework
- Time sink vs. done-for-you execution

## AI Analysis Inputs

User provides:
- Current approach type
- Biggest challenge/frustration
- Goals for next 12 months
- Budget range (optional)

AI generates:
- Specific gaps in current approach
- How Magnet addresses each gap
- Relevant case studies
- Suggested starting point

## UI Design

### Step 1: Current Approach
Cards to select:
- "We have an in-house team"
- "We work with another agency"
- "We're doing it ourselves with tools"
- "We're starting from scratch"

### Step 2: Situation Details
- Freeform text about challenges
- Checkbox list of common pain points
- Goals dropdown

### Step 3: Results
- Side-by-side comparison
- Specific advantages highlighted
- Case study matches
- Clear CTA to schedule call

## Files to Create

| File | Purpose |
|------|---------|
| `website/src/app/compare/page.tsx` | Comparison tool page |
| `website/src/app/api/compare/route.ts` | AI analysis endpoint |
| `website/src/components/sections/comparison-results.tsx` | Results display component |
| `website/src/data/competitor-approaches.ts` | Structured competitor data |

## Tone Guidelines

- Never trash competitors directly
- Focus on Magnet's strengths, not others' weaknesses
- Use "different approach" not "better approach"
- Let results and case studies speak
