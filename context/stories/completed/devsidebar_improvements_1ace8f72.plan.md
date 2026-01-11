---
name: DevSidebar Improvements
overview: Refactor DevSidebar to remove Page Status and Dev Notes, convert Sitemap and Design System to full-screen modals that hide the sidebar when open.
todos:
  - id: remove-status
    content: Remove Page Status section and related types/state
    status: completed
  - id: remove-notes
    content: Remove Dev Notes section and localStorage logic
    status: completed
  - id: sitemap-modal
    content: Convert Sitemap accordion to link + full-screen modal
    status: completed
  - id: design-fullscreen
    content: Update Design System modal to full-screen, hide sidebar when open
    status: completed
  - id: sidebar-hide
    content: Wire up sidebar hiding when either modal opens
    status: completed
---

# DevSidebar Improvements

## Changes to [website/app/components/DevSidebar.tsx](website/app/components/DevSidebar.tsx)

### 1. Remove Page Status Section

- Delete the `PageStatus` type, `STATUS_OPTIONS`, and `STATUS_COLORS` constants (lines 24-69)
- Remove `currentStatus` state
- Remove the "Page Status" AccordionItem (lines 224-256)

### 2. Remove Dev Notes Section

- Delete `DevNote` interface
- Remove `notes`, `newNoteText` state and `addNote`/`deleteNote` functions
- Remove localStorage effects for notes
- Remove the "Dev Notes" AccordionItem (lines 313-364)

### 3. Convert Sitemap to Full-Screen Modal Link

- Add `showSitemap` state
- Replace Sitemap AccordionItem with a simple button/link
- Create a new full-screen modal for Sitemap (similar to Design System modal but full-screen)
- Hide sidebar when sitemap modal opens (`toggleSidebar()` when opening)

### 4. Update Design System to Full-Screen Modal

- Current modal is `max-w-4xl` - change to full-screen (`inset-0` with padding)
- Hide sidebar when Design System modal opens

### 5. Modal Behavior

- Both modals use `fixed inset-0` with appropriate z-index
- When opening either modal, call `toggleSidebar()` to hide the sidebar
- Close button in top-right corner using X icon

---

## Suggestions for Additional Useful Features

Here are some ideas that could be valuable additions:

**Quick Actions**

- "Edit in Sanity Studio" link (opens current page in Sanity for editing)
- "View in Production" / "View in Staging" environment links

**Development Helpers**

- Breakpoint indicator (shows current responsive breakpoint: sm/md/lg/xl/2xl)
- Environment badge (dev/staging/prod with color coding)
- Performance metrics panel (Core Web Vitals, page load time)

**Debugging Tools**

- Console errors/warnings count with expandable list
- Network request monitor (API calls, response times)
- Active feature flags display

**Accessibility**

- Color contrast checker
- Focus order visualizer
- Screen reader text preview

**Content/SEO**

- Meta tags inspector (title, description, OG tags)
- Heading hierarchy checker
- Image alt text audit

Which of these would you find most useful? I can incorporate them into the plan.