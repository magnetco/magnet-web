---
name: Services Nav Dropdown
overview: Add a Services dropdown menu to the navigation (similar to Inventory), update footer links to match the four actual services (conditioning, rejuvenation, mechanical, cosmetic), and ensure mobile navigation supports the new submenu.
todos:
  - id: nav-config
    content: Add Services submenu config to navigation.ts
    status: completed
  - id: services-megamenu
    content: Create ServicesMegaMenu component for desktop dropdown
    status: completed
    dependencies:
      - nav-config
  - id: desktop-nav
    content: Update DesktopNav to support multiple submenu types
    status: completed
    dependencies:
      - services-megamenu
  - id: mobile-context
    content: Add services panel state to MobileMenuContext
    status: completed
  - id: mobile-services-panel
    content: Create MobileServicesPanel component
    status: completed
    dependencies:
      - nav-config
      - mobile-context
  - id: mobile-menu
    content: Update MobileMenu to handle services submenu
    status: completed
    dependencies:
      - mobile-services-panel
  - id: footer
    content: Update footer service links to match actual pages
    status: completed
---

# Services Navigation Dropdown

## Overview

Add a Services mega-menu dropdown to the desktop and mobile navigation, featuring cards for each of the four service types. Update footer links to match the actual service pages.

## Files to Modify

### 1. Navigation Configuration

**[`lib/config/navigation.ts`](website/lib/config/navigation.ts)**

- Add `hasSubmenu: true` to the Services nav item (line 32)
- Add `submenuType: "services"` property to distinguish between Inventory and Services submenus
- Add new `SERVICES_MENU` configuration with the four services:
- Conditioning & Protection (`/services/conditioning`)
- Full Rejuvenation (`/services/rejuvenation`)
- Mechanical Services (`/services/mechanical`)
- Cosmetic Repairs (`/services/cosmetic`)

### 2. Desktop Services Mega-Menu

**Create [`components/shared/ServicesMegaMenu.tsx`](website/components/shared/ServicesMegaMenu.tsx)**

- Similar structure to `InventoryMegaMenu` but with service cards instead of chassis codes
- Display 4 service cards in a grid layout with:
- Icon (using existing icons from ServiceCards.tsx)
- Title
- Short description
- Click to navigate
- Include "All Services" quick link on the left

### 3. Update Desktop Navigation

**[`components/shared/DesktopNav.tsx`](website/components/shared/DesktopNav.tsx)**

- Add `servicesOpen` state alongside `inventoryOpen`
- Check `submenuType` property to determine which mega-menu to render
- Render `ServicesMegaMenu` for services items, `InventoryMegaMenu` for inventory items

### 4. Mobile Services Panel

**Create [`components/shared/MobileServicesPanel.tsx`](website/components/shared/MobileServicesPanel.tsx)**

- Similar to `MobileInventoryPanel` but with service links
- Display all 4 services with titles and descriptions
- Include "All Services" link at top

### 5. Update Mobile Menu Context

**[`components/shared/MobileMenuContext.tsx`](website/components/shared/MobileMenuContext.tsx)**

- Add `servicesPanelOpen` state
- Add `openServicesPanel` and `closeServicesPanel` functions

### 6. Update Mobile Menu

**[`components/shared/MobileMenu.tsx`](website/components/shared/MobileMenu.tsx)**

- Check `submenuType` to determine which panel opener to call
- Import and render `MobileServicesPanel`

### 7. Update Footer

**[`components/layout/footer.tsx`](website/components/layout/footer.tsx)**

- Update `footerLinks.services.links` (lines 25-32) to:
- All Services -> `/services`
- Conditioning -> `/services/conditioning`
- Rejuvenation -> `/services/rejuvenation`
- Mechanical -> `/services/mechanical`
- Cosmetic -> `/services/cosmetic`

## Visual Structure

```javascript
Desktop Mega-Menu:
+------------------------------------------+
| Close                                    |
|------------------------------------------|
| All Services        |  [Card: Conditioning]  [Card: Rejuvenation]  |
|                     |  [Card: Mechanical]    [Card: Cosmetic]      |
+------------------------------------------+

Mobile Panel:
+------------------+
| <- Back          |
|------------------|
| All Services     |
|------------------|
| Conditioning     |
| Rejuvenation     |
| Mechanical       |
| Cosmetic         |
+------------------+

```