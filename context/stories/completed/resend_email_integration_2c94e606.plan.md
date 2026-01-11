---
name: Resend Email Integration
overview: Integrate Resend email service to send contact form submissions to gavin@magnet.co while keeping the existing database save functionality.
todos: []
---

# Resend Email Integration for Contact Form

## Overview

Add email notification functionality to the contact form API route using Resend. When a form is submitted, it will:

1. Save the lead to the database (existing functionality)
2. Send an email notification to gavin@magnet.co with the form details

## Implementation Steps

### 1. Install Resend SDK

- Add `resend` package to [`website/package.json`](website/package.json) dependencies

### 2. Create Email Utility Function

- Create [`website/src/lib/email/resend.ts`](website/src/lib/email/resend.ts) to:
- Initialize Resend client with `RESEND_API_KEY` from environment variables
- Export a function to send contact form emails
- Format the email with form submission details (name, company, email, message)
- Use `contact@email.magnet.co` as the "from" address (or another address from the verified domain)
- Send to `gavin@magnet.co`

### 3. Update API Route

- Modify [`website/src/app/api/leads/route.ts`](website/src/app/api/leads/route.ts) to:
- Import the email sending function
- After successfully saving to database, send the email
- Handle email errors gracefully (log but don't fail the request if email fails)
- Return success response even if email sending fails (to not break form UX)

### 4. Environment Variables

- Verify `.env.local` has:
- `RESEND_API_KEY` (already set)
- `RESEND_DOMAIN` (already set)
- Add `RESEND_FROM_EMAIL` environment variable (e.g., `contact@email.magnet.co`)
- Add `RESEND_TO_EMAIL` environment variable (`gavin@magnet.co`)

## Email Format

The email will include:

- Subject: "New Contact Form Submission from [Name]"
- Body: Formatted HTML/text with:
- Name
- Company (if provided)
- Email
- Message

## Error Handling