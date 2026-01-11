---
name: Email Timeline UI Mockup
overview: Create a Communication Timeline UI mockup on the Client page in the data app using hardcoded mock data to visualize the email feature before building the backend.
todos:
  - id: timeline-component
    content: Create CommunicationTimeline component with mock data and styling
    status: completed
  - id: integrate-recordview
    content: Add Communication section to RecordView for clients table
    status: completed
---

# Email Timeline UI Mockup

## Goal

Build a visual mockup of the Communication Timeline component on the Client detail page using mock data. No backend, no Gmail API - just the UI to validate the design before full implementation.

---

## What We're Building

A "Communication" section on the Client RecordView that displays:
- Sequential timeline of emails
- Inbound emails (from client) styled distinctly from outbound (to client)
- Each email shows: date, subject, summary, sentiment indicator, key points
- Link to "View in Gmail" (mock)
- Overall sentiment trend header

---

## Mock Data Structure

```typescript
const mockEmails = [
  {
    id: 1,
    direction: 'inbound',
    from_name: 'Sarah Chen',
    from_email: 'sarah@acmecorp.com',
    subject: 'Re: Q1 Campaign Results',
    received_at: '2025-01-03T14:30:00Z',
    summary: 'Sarah expressed enthusiasm about the 47% increase in qualified leads...',
    sentiment: 'positive',
    key_points: ['47% increase in leads', 'Wants to discuss Q2 budget expansion'],
    gmail_url: '#'
  },
  // ... more mock emails
]
```

---

## Files to Create/Modify

| File | Action |
|------|--------|
| [`data/src/components/CommunicationTimeline.tsx`](data/src/components/CommunicationTimeline.tsx) | Create - Timeline component with mock data |
| [`data/src/components/RecordView.tsx`](data/src/components/RecordView.tsx) | Modify - Add timeline section when viewing clients |

---

## UI Design Notes

- **Inbound emails**: Left-aligned, subtle background (e.g., slate-50), "received" indicator
- **Outbound emails**: Right-aligned, brand-tinted background, "sent" indicator  
- **Sentiment colors**: Green (positive), Gray (neutral), Amber (negative), Blue (mixed)
- **Timeline connector**: Vertical line connecting emails chronologically
- **Header**: Show overall sentiment trend + email count