# Email Templates

This directory contains HTML email templates for Magnet's transactional emails.

## Template Files

### `contact-form.html`
Reference HTML template showing the structure and styling. This file is for reference only and is not used directly in the codebase.

### `contact-form.ts`
TypeScript template renderer that generates the HTML email. This is the file used by the email service.

## Brand Colors

The templates use Magnet's brand colors:

- **Background**: `#F5F7F7` (Snow)
- **Container**: `#FFFFFF` (Frost)
- **Text Primary**: `#220002` (Oxblood)
- **Text Secondary**: `#2A4144` (Basalt)
- **Accent**: `#F9432B` (Ember)
- **Border**: `#DDE6E7` (Opal)

## Editing Templates

To modify the email template:

1. **For structure/styling**: Edit `contact-form.ts` - the template string contains all HTML and inline styles
2. **For reference**: View `contact-form.html` to see the structure without TypeScript syntax

### Important Notes

- **Inline styles only**: Email clients don't support external CSS, so all styles must be inline
- **Table-based layout**: Use HTML tables for layout compatibility across email clients
- **XSS protection**: The template automatically escapes HTML to prevent XSS attacks
- **Responsive**: The template is designed to work on mobile devices (max-width: 600px)

## Adding New Templates

To add a new email template:

1. Create a new `.ts` file in this directory (e.g., `welcome.ts`)
2. Export a function that takes data and returns an HTML string
3. Import and use it in `../resend.ts`

Example:

```typescript
export function renderWelcomeEmail(data: WelcomeData): string {
  // Template implementation
  return `<!DOCTYPE html>...`
}
```

## Testing

To test email templates:

1. Use the contact form on the website
2. Check the email received at the configured `RESEND_TO_EMAIL` address
3. Verify rendering across email clients (Gmail, Outlook, Apple Mail)

