---
name: Sanity Navbar Links
overview: Add custom navigation links to the Sanity Studio top bar for Website (localhost:3000) and Data (localhost:4000) using the studio.components.navbar configuration.
todos:
  - id: create-navbar
    content: Create CustomNavbar.tsx component with external links
    status: completed
  - id: update-config
    content: Register custom navbar in sanity.config.ts
    status: completed
---

# Add Custom Links to Sanity Studio Navbar

## Approach

Sanity Studio v3 allows customizing the navbar through `studio.components.navbar`. We'll create a custom navbar component that wraps the default navbar and adds external links to Website and Data.

## Implementation

### 1. Create Custom Navbar Component

Create a new file [`studio/components/CustomNavbar.tsx`](studio/components/CustomNavbar.tsx) that:
- Imports the default `Navbar` component from `sanity`
- Renders custom links alongside the default navbar content
- Uses Sanity UI components (`Button`, `Flex`) for consistent styling

```tsx
import { NavbarProps, useWorkspace } from 'sanity'
import { Flex, Button } from '@sanity/ui'

export function CustomNavbar(props: NavbarProps) {
  return (
    <Flex align="center" style={{ width: '100%' }}>
      {props.renderDefault(props)}
      <Flex gap={2} paddingRight={3}>
        <Button as="a" href="http://localhost:3000" target="_blank" mode="bleed" text="Website" />
        <Button as="a" href="http://localhost:4000" target="_blank" mode="bleed" text="Data" />
      </Flex>
    </Flex>
  )
}
```

### 2. Register in Sanity Config

Update [`studio/sanity.config.ts`](studio/sanity.config.ts) to use the custom navbar:

```ts
import { CustomNavbar } from './components/CustomNavbar'

export default defineConfig({
  // ... existing config
  studio: {
    components: {
      navbar: CustomNavbar,
    },
  },
})
```

## Result

The Studio top bar will display "Website" and "Data" links that open in new tabs, positioned to the right of the existing navigation.