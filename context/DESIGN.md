# DESIGN.md

Visual design principles and system for Magnet.

For voice and tone, see [`BRAND.md`](BRAND.md). For coding patterns, see [`README.md`](../README.md).

---

## Design Philosophy

Design is **restrained, typography-led, and purposeful**. Motion is used only when it improves understanding.

The interface should:
- Feel calm, deliberate, and senior
- Prioritize hierarchy and readability
- Reduce cognitive load
- Make the system feel inevitable, not flashy

**Visual novelty is secondary to clarity. Every design decision should help the reader think.**

## Visual Character

| Attribute | Interpretation |
|-----------|----------------|
| Calm | Not flashy or attention-seeking |
| Deliberate | Every element has purpose |
| Senior | Sophisticated, not trendy |
| Clear | Information hierarchy is obvious |
| Inevitable | Feels right, not surprising |

## Color System

### Brand Palette

| Name    | Hex       | Role                           |
|---------|-----------|--------------------------------|
| Ember   | `#F9432B` | Primary accent, CTAs, active states |
| Oxblood | `#220002` | Primary text, headings         |
| Powder  | `#BAD9DC` | Light backgrounds, soft accents |
| Juniper | `#001D22` | Dark backgrounds, dark mode    |
| Basalt  | `#2A4144` | Secondary text, borders        |
| Opal    | `#DDE6E7` | Dividers, subtle borders       |
| Snow    | `#F5F7F7` | Page background                |
| Frost   | `#FFFFFF` | White, cards                   |
| Coral   | `#FFB5AB` | Dark mode accent, highlights   |

### Usage Guidelines

- **Text**: Oxblood on light backgrounds, Frost/Coral on dark
- **Backgrounds**: Snow (default), Frost (elevated), Juniper (dark sections)
- **Accents**: Ember for CTAs and interactive elements
- **Borders**: Opal for subtle dividers, Basalt for emphasis

## Typography

### Font Stack

- **Display/Sans**: Geist Sans (Regular 400, Medium 500, SemiBold 600)
- **Mono**: Geist Mono (Light 300, Regular 400, Medium 500)

### Scale

Typography uses Tailwind's default scale with custom line heights:

| Element | Classes |
|---------|---------|
| H1 (Heading) | `text-5xl/12 sm:text-[5rem]/20 tracking-tight` |
| H2 (Subheading) | `text-3xl/9 tracking-tight` |
| Body (Text) | `text-base/7` or `text-lg/8` |
| Eyebrow | `text-sm/7 font-medium tracking-widest uppercase` |

### Principles

- Use `text-balance` for headings to prevent orphans
- Maintain generous line height for readability
- Tracking is tighter on large text, normal on body

## Spacing

Use Tailwind's spacing scale consistently:

| Context | Common Values |
|---------|---------------|
| Section padding | `py-24` to `py-32` |
| Component gaps | `gap-6` to `gap-12` |
| Text blocks | `mt-6` between paragraphs |
| Container max-width | Built into `Container` component |

## Components

### Buttons

Three variants with consistent interaction patterns:

| Variant | Use Case |
|---------|----------|
| Solid (`Button/ButtonLink`) | Primary CTAs |
| Soft (`SoftButton/SoftButtonLink`) | Secondary actions |
| Plain (`PlainButton/PlainButtonLink`) | Tertiary, navigation |

All buttons use hover animations with `clipPath` reveals.

### Cards and Containers

- Use subtle shadows sparingly
- Prefer border-based elevation over shadows
- Round corners consistently (`rounded-xl` for cards, `rounded-full` for buttons)

### Icons

- Icon components live in `@/components/icons/`
- Use Lucide React for common icons
- Custom icons as React components

## Motion

### Principles

- Motion improves understanding, not decoration
- Prefer CSS transitions over JavaScript animation
- Keep durations short: 150–300ms for micro-interactions
- Use easing: `ease-in-out` for most transitions

### Patterns

- **Hover states**: `transition-colors duration-300`
- **Button fills**: `clipPath` animation with GSAP
- **Accordions**: `max-height` transition for disclosure
- **Page transitions**: Keep minimal, let content load fast

## Layout

### Container

The `Container` component provides consistent max-width and padding. Use it for all page content.

### Sections

`Section` component provides consistent vertical rhythm. Sections stack with generous spacing.

### Grid

Use Tailwind's grid utilities. Common patterns:
- `grid-cols-1 md:grid-cols-2` for two-column layouts
- `grid-cols-1 md:grid-cols-3` for feature grids
- `gap-8` or `gap-12` between grid items

## Dark Mode

Support dark mode using Tailwind's `dark:` prefix.

| Light | Dark |
|-------|------|
| `bg-snow` | `bg-juniper` |
| `text-oxblood` | `text-frost` or `text-coral` |
| `bg-ember` | `bg-coral` |

Components accept `color="dark/light"` or `color="light"` props for explicit control.

## Imagery

### Screenshots

- Use consistent framing and shadow treatment
- Located in `public/img/screenshots/`
- Named with descriptive suffixes for variants

### Avatars

- Consistent aspect ratios
- Located in `public/img/avatars/`

### Logos

- SVG format preferred
- White and black variants for different backgrounds
- Located in `public/img/logos/`

## Anti-Patterns

Avoid:
- Gratuitous animation
- Decorative elements without purpose
- Trendy effects that date quickly
- Overly complex layouts
- Breaking established patterns for novelty

