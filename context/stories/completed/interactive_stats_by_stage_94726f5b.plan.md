---
name: Interactive Stats by Stage
overview: ""
todos:
  - id: client-component
    content: Convert stats-with-graph.tsx to client component with stage state
    status: completed
  - id: stage-data
    content: Add STAGE_DATA array with stats for all 4 stages
    status: completed
  - id: dots-ui
    content: Add clickable dot indicators positioned on the curve
    status: completed
  - id: stage-buttons
    content: Add stage selector buttons (Foundation/Activation/Acceleration/Retention)
    status: completed
  - id: animated-stats
    content: Implement animated number transitions when stage changes
    status: completed
---

# Interactive Stats Section with Stage-Based Scaling

## Overview

Add 4 clickable stage indicators positioned along the existing curve. Clicking a stage updates the stats to show cumulative results at that point in the journey, with animated number counting. The background SVG remains unchanged.

## Visual Concept

```javascript
                                              ● Retention
                                    ● Acceleration
                          ● Activation
              ● Foundation
             ╱─────────────────────────────────────────╲
            ╱                                           ╲
           ╱                                             ╲

[Foundation]  [Activation]  [Acceleration]  [Retention]  ← clickable labels/buttons

$125M+              |    1.8x ROI           |    85% conversion lift
Revenue generated       Average increase        In first quarter
```



## Implementation

### 1. Update Component Structure

Modify [`website/src/components/sections/stats-with-graph.tsx`](website/src/components/sections/stats-with-graph.tsx):

- Add `'use client'` directive for interactivity
- Add state for `activeStage` (0-3)
- Position 4 clickable dots/circles on the curve using absolute positioning
- Add stage label buttons below the stats (or inline with eyebrow area)

### 2. Stage Data Structure

Define stats for each stage:

```typescript
const STAGE_DATA = [
  {
    name: 'Foundation',
    stats: [
      { value: '$125M+', label: 'Revenue generated for clients' },
      { value: '1.8x', label: 'Average ROI increase' },
      { value: '85%', label: 'Brand consistency improvement' },
    ],
  },
  {
    name: 'Activation', 
    stats: [
      { value: '$275M+', label: 'Revenue generated for clients' },
      { value: '2.4x', label: 'Average ROI increase' },
      { value: '140%', label: 'Traffic and engagement lift' },
    ],
  },
  {
    name: 'Acceleration',
    stats: [
      { value: '$400M+', label: 'Revenue generated for clients' },
      { value: '2.9x', label: 'Average ROI increase' },
      { value: '200%', label: 'Conversion rate improvement' },
    ],
  },
  {
    name: 'Retention',
    stats: [
      { value: '$500M+', label: 'Revenue generated for clients' },
      { value: '3.2x', label: 'Average ROI increase' },
      { value: '240%', label: 'Average conversion rate improvement' },
    ],
  },
]
```



### 3. Animated Number Counter

Create a reusable `AnimatedNumber` component or use CSS/JS animation:

- Parse the stat value (handle `$`, `M`, `+`, `x`, `%`)
- Animate from previous value to new value over ~600ms
- Use `requestAnimationFrame` or framer-motion's `animate`

### 4. Dot Positions on Curve

Calculate positions along the existing bezier curve at 4 points (roughly 15%, 40%, 70%, 95% along the path). Position dots absolutely over the SVG.

### 5. Stage Selector UI

Add horizontal button group below stats:

- Pills or underlined text links for each stage name
- Active state: filled/highlighted
- Smooth transitions between states

## Files to Modify

- [`website/src/components/sections/stats-with-graph.tsx`](website/src/components/sections/stats-with-graph.tsx) - Main changes

## Optional Enhancements (future)

- Auto-advance through stages on scroll-into-view
- Keyboard arrow navigation between stages