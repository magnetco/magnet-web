---
name: FAQ Chat Merge
overview: Transform the two-column FAQ accordion + chat layout into a single chat-first interface where FAQ questions serve as prominent conversation starters above a unified chat panel.
todos:
  - id: refactor-layout
    content: Refactor FAQsWithChat from two-column to single centered column with FAQ pills above chat
    status: completed
  - id: faq-pills
    content: Create FaqPill component and responsive grid for displaying clickable FAQ questions
    status: completed
  - id: wire-interaction
    content: Wire FAQ pill clicks to send question to InlineChat and auto-scroll to response
    status: completed
  - id: update-api
    content: Change component API from children-based to data-driven questions array
    status: completed
---

# Chat-First FAQ Section

## Concept

Replace the current side-by-side layout with a unified conversational interface:

```
┌─────────────────────────────────────────────────────┐
│  Eyebrow + Headline + Subheadline                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │
│  │ FAQ Pill 1  │ │ FAQ Pill 2  │ │ FAQ Pill 3  │   │
│  └─────────────┘ └─────────────┘ └─────────────┘   │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐   │
│  │ FAQ Pill 4  │ │ FAQ Pill 5  │ │ FAQ Pill 6  │   │
│  └─────────────┘ └─────────────┘ └─────────────┘   │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │  Chat Messages Area                          │   │
│  │  ─────────────────────────────               │   │
│  │  AI welcome message                          │   │
│  │                      User question ───────   │   │
│  │  AI response...                              │   │
│  ├─────────────────────────────────────────────┤   │
│  │  [  Ask anything about Magnet...   ] [Send] │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Key Design Elements

- **FAQ pills at top**: Prominent, scannable question buttons arranged in a responsive grid
- **Chat panel below**: Centered, constrained-width chat with messages + input
- **Click behavior**: Clicking a FAQ pill sends that question to the AI and scrolls to chat
- **Visual hierarchy**: Pills are secondary to the chat — they're "shortcuts" not the main UI

## Implementation

### File: [`website/src/components/sections/faqs-with-chat.tsx`](website/src/components/sections/faqs-with-chat.tsx)

**Changes:**
1. Replace two-column grid layout with single centered column
2. Convert FAQ questions into clickable pill components that trigger chat
3. Move FAQ pill grid above the chat panel
4. Retain the `InlineChat` component with modifications:
   - Accept a callback to handle FAQ question clicks
   - Auto-scroll when question is submitted
5. Remove the `Faq` accordion component from this file (keep in other FAQ files)
6. Update the `FAQsWithChat` API to accept `questions` as data array instead of children

**New component structure:**

```tsx
// Data-driven FAQ questions
interface FaqQuestion {
  question: string
  icon?: string // optional emoji or icon
}

// Main export
export function FAQsWithChat({
  eyebrow,
  headline, 
  subheadline,
  questions,  // Array of FAQ questions (not ReactNode children)
  ...
})
```

**FAQ Pill styling:**
- Rounded, bordered pills similar to current quick replies but larger
- Subtle hover states with ember accent
- Grid layout: 2-3 columns on desktop, 1-2 on mobile
- Truncate long questions with ellipsis

**Chat panel:**
- Max-width ~640px, centered
- Taller height to accommodate conversation (~500px)
- Remove the sticky positioning (no longer side-by-side)

## Migration

Pages using `FAQsWithChat` will need to update from:

```tsx
<FAQsWithChat eyebrow="..." headline="...">
  <Faq question="..." answer="..." />
  <Faq question="..." answer="..." />
</FAQsWithChat>
```

To:

```tsx
<FAQsWithChat 
  eyebrow="..." 
  headline="..."
  questions={[
    { question: "How quickly will I hear back...?" },
    { question: "What information should I include...?" },
  ]}
/>
```

Answers are now AI-generated, not static.