# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Studio4 is a WordPress plugin implementing the S4 (4-Layer Scope System) for visual theme building. It uses React Shadow DOM architecture with ShadCN design system for the UI, while allowing users to create themes using the S4 system.

## S4 System Architecture

### The 4 Layers (IN ORDER - this is critical):
1. **Brand Tokens**: 4 colors + typography that cascade through everything
2. **Global Elements**: Define all properties for every element (section, title, button, etc.)
3. **Component Scopes**: Modify global elements within components (hero, card, sidebar)
4. **Helper Scopes**: Utilities and states (hover, hierarchy, saturation)

### Current Status
- ✅ Basic color picker for brand tokens
- ✅ Color persistence working
- ❌ Built wrong "layouts" system (spacing/sizing instead of component layouts)
- 📋 Need to build: Typography, Global Elements, Color Presets, Component Scopes

### IMPORTANT: Correct User Flow
1. Brand Setup (Colors + Typography)
2. Global Elements Definition
3. Color Preset Mapping
4. Helper Presets
5. Component Scopes
6. Layout Transformations (component layouts, NOT spacing)

### What "Layouts" Means in S4
- Component layout transformations (hero: center → half-page → full-width)
- Card arrangements (grid → list → masonry)
- NOT spacing scales or sizing systems

### Development Status - January 2025
- Session 10: Course correction after building wrong "layouts" system
- Removed spacing/sizing features that aren't part of S4
- Refocused on proper user journey: Brand → Global Elements → Presets → Scopes
- Created comprehensive documentation (Master Roadmap, Development Log)
- Ready to build Typography and Global Elements system

### Next Implementation Steps
1. Remove current Layouts tab
2. Add Typography to Brand section (font stack + base size)
3. Create Global Elements interface with property matrix
4. Build color preset mapping system
5. Add hierarchy and hover presets
6. Then move to Component Scopes

## Key Architecture

### React to Web Component System
- **Entry Point**: `src/main.jsx` - Custom HTMLElement class `PluginBoilerplateElement` that creates shadow DOM and renders React
- **Main Component**: `src/ShadowApp.jsx` - Root React component that receives server-side props and injects CSS
- **Design System**: `src/styles/main.css` - Tailwind CSS 4 with ShadCN design tokens using `@theme` directive
- **Web Component**: Registered as `<plugin-boilerplate>` custom element

### Server-Side Integration
- **WordPress Plugin**: `studio4.php` - Singleton plugin class with hooks, REST API, and CSS injection
- **Props System**: Server data passed via base64-encoded attributes (non-escaped to prevent CSS corruption)
- **CSS Injection**: Tailwind CSS served server-side and injected into shadow DOM via `<style>` tags
- **REST API**: WordPress REST endpoints at `/wp-json/studio4/v1/`

## S4 Implementation Guidelines

### Global Elements to Define
```javascript
const globalElements = {
  'section': { bg, padding, margin, border },
  'container': { maxWidth, padding, margin },
  'wrapper': { bg, padding, border, borderRadius },
  'title': { color, fontSize, fontWeight, lineHeight, margin },
  'subtitle': { color, fontSize, fontWeight, lineHeight, margin },
  'pretitle': { color, fontSize, fontWeight, textTransform, letterSpacing },
  'text': { color, fontSize, lineHeight, opacity },
  'button-primary': { bg, color, padding, border, borderRadius, fontSize },
  'button-secondary': { bg, color, padding, border, borderRadius, fontSize },
  'link': { color, textDecoration, hover },
  'divider': { borderColor, borderWidth, margin }
};
```

### Property Matrix
Every element needs ALL properties defined, even if null:
- color, background-color
- border (width, color, style, radius)
- padding, margin
- font (size, weight, line-height, family)
- opacity, transition
- text (transform, decoration, align)

### CSS Variable Generation Pattern
```css
/* For each element and property */
--[element]-[property]: value;
--title-color: var(--color3);
--title-font-size: 2.5rem;
--button-primary-bg: var(--color1);
```

## Development Commands

```bash
# Development with hot reload
npm run dev

# Production build with automatic testing (outputs to dist/js/shadow-plugin.js and dist/css/main.css)
npm run build

# Build only Tailwind CSS (outputs to dist/css/main.css)
npm run build:css

# Build and watch for changes
npm run build:watch

# Preview production build
npm run preview

# Testing commands
npm run test              # Run all tests
npm run test:build        # Build validation only
npm run test:components   # Component tests only  
npm run test:integration  # Integration tests only
```

## Build Configuration

- **Vite**: Dual configuration - main build for JS (IIFE format) and CSS-only build via `vite.config.css.js`
- **CSS Build**: Tailwind CSS 4 with `@tailwindcss/vite` plugin, uses `@source` directives to scan JSX files
- **Output**: `dist/js/shadow-plugin.js` (1.4MB) and `dist/css/main.css` (30KB+ with ShadCN design system)
- **React**: Uses React 18, renders directly into `shadowRoot` for proper isolation
- **Bundling**: All dependencies bundled, no external dependencies required

## Key Libraries and Dependencies

### UI Framework
- **React 18**: Core framework with hooks and concurrent features
- **Radix UI**: Headless UI components (Dialog, Tabs, Switch, Label, Dropdown Menu)
- **Framer Motion**: Animation library for smooth transitions
- **Tailwind CSS 4**: Utility-first CSS with `@theme` directive for ShadCN design tokens
- **Zustand**: Lightweight state management with localStorage persistence

### WordPress Integration
- **Custom Web Component**: Hand-coded HTMLElement class (no @r2wc dependency)
- **Shadow DOM**: Complete style isolation with server-side CSS injection
- **Base64 CSS Transport**: CSS encoded and passed via attributes to prevent escaping issues

## Code Patterns

### WordPress Data to React Props
```php
// In PHP - pass data via attributes (CSS uses json_encode, not esc_attr)
<plugin-boilerplate 
    user-role="<?php echo esc_attr($user_role); ?>"
    site-url="<?php echo esc_attr(home_url()); ?>"
    settings='<?php echo esc_attr(json_encode($settings)); ?>'
    tailwind-css="<?php echo base64_encode($tailwind_css); ?>"
></plugin-boilerplate>
```

```jsx
// In React - props parsed from attributes in render() method
export function ShadowApp(props = {}) {
  const { userRole, siteUrl, settings, tailwindCSS } = props;
  const decodedCSS = tailwindCSS ? atob(tailwindCSS) : '';
  
  return (
    <>
      {decodedCSS && <style dangerouslySetInnerHTML={{ __html: decodedCSS }} />}
      <Panel />
    </>
  );
}
```

### Tailwind CSS 4 with ShadCN Design System
```css
// src/styles/main.css - Tailwind 4 configuration
@import "tailwindcss";
@source "../**/*.jsx";
@source "../**/*.js";

@theme inline {
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(15% 0.007 285.82);
  --color-primary: oklch(47.31% 0.099 264.05);
  --color-muted: oklch(96% 0.006 285.82);
  --color-border: oklch(90% 0.006 285.82);
  --radius: 0.5rem;
}
```

```jsx
// Components use ShadCN design tokens
<button className="bg-muted text-muted-foreground border border-border hover:bg-accent">
  Click me
</button>
```

### Critical CSS Escaping Rules
```php
// CORRECT: Use json_encode for base64 CSS in JavaScript
panel.setAttribute('tailwind-css', <?php echo json_encode(base64_encode($tailwind_css)); ?>);

// CORRECT: Use raw base64 for HTML attributes  
tailwind-css="<?php echo base64_encode($tailwind_css); ?>"

// WRONG: esc_js() or esc_attr() will corrupt the base64 CSS
```

### State Management with Zustand
```jsx
// Import store hooks
import { useStore, useWordPressStore } from './storage/store.js';

// Use in components
function MyComponent() {
  const { isPanelOpen, togglePanel, settings } = useStore();
  const { serverData, makeApiCall } = useWordPressStore();
  
  return (
    <div className="p-4 bg-muted rounded-lg border border-border">
      <button 
        onClick={togglePanel}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
      >
        Toggle Panel
      </button>
    </div>
  );
}
```

### Component Architecture
```jsx
// Modular component structure
import { Panel } from './components/Panel.jsx';
import { CommandPalette } from './components/CommandPalette.jsx';
import { SettingsDialog } from './components/SettingsDialog.jsx';
import { TailwindDemo } from './components/TailwindDemo.jsx';
```

## File Structure

```
src/
├── main.jsx              # Custom HTMLElement web component with shadow DOM
├── ShadowApp.jsx         # Main app component with CSS injection
├── ShadowStyles.jsx      # Legacy Raycast design (replaced by Tailwind)
├── TailwindLoader.jsx    # Legacy API loader (replaced by server-side injection)
├── components/           # Modular React components
│   ├── Panel.jsx         # Main panel with keyboard shortcuts
│   ├── CommandPalette.jsx # Search and command interface
│   ├── SettingsDialog.jsx # Settings with tabs and form controls
│   ├── PanelHeader.jsx   # Header with logo and actions
│   └── TailwindDemo.jsx  # Interactive Tailwind showcase
├── storage/
│   └── store.js          # Zustand stores with localStorage persistence
├── utils/
│   ├── constants.js      # App constants and demo data
│   ├── helpers.js        # Utility functions
│   └── keyboardShortcuts.js # Keyboard shortcut management
└── styles/
    └── main.css          # Tailwind 4 with @theme directive and ShadCN tokens

includes/
└── api/
    └── class-tailwind-controller.php  # WordPress API controller for CSS

tests/                    # Comprehensive test suite  
├── build-validation.js  # Build artifacts validation
├── component-tests.js   # React component architecture tests
├── integration-tests.js # WordPress integration tests
├── run-all-tests.js     # Master test runner
└── README.md            # Testing documentation

dist/
├── js/
│   └── shadow-plugin.js  # Compiled React bundle (1.4MB)
└── css/
    └── main.css          # Compiled Tailwind CSS with ShadCN (30KB+)

shadow-plugin.php         # WordPress plugin file (singleton class)
vite.config.js           # Main Vite configuration (IIFE format)
vite.config.css.js       # CSS-only Vite configuration  
build-css.js             # Tailwind CSS build script using Vite + @tailwindcss/vite
package.json             # Dependencies and scripts
```

## Development Notes

### State Management
- **Zustand Store**: Main app state with localStorage persistence
- **WordPress Store**: Server data and API management
- **Persistent Settings**: Panel position, theme, preferences
- **Cross-tab Sync**: State synced across browser tabs

### Component Architecture  
- **Modular Design**: Each feature is a separate component
- **ShadCN Design System**: Complete design system with semantic color tokens
- **Tailwind CSS 4**: Uses `@theme` directive for custom design tokens
- **Keyboard Navigation**: Full keyboard support with shortcuts via Framer Motion
- **Floating Action Button**: Positioned bottom-right with monochromatic styling

### Shadow DOM Isolation
- **Complete Isolation**: All styles scoped to Shadow DOM using `:host` selector  
- **Server-Side CSS**: CSS built server-side and injected via `<style>` tags
- **No WordPress Conflicts**: Zero interference with WordPress themes
- **Base64 Transport**: CSS safely encoded to prevent PHP escaping corruption

### Plugin Architecture
- Singleton pattern for main plugin class
- Proper WordPress hooks and lifecycle management
- Database table creation with upgrade handling
- REST API with proper security (nonce verification)

### Integration Points
- Admin settings page with React component
- Automatic frontend injection with server data
- Block editor compatibility
- Keyboard shortcuts (Cmd/Ctrl + ` to toggle)
- Settings persistence across sessions

### Testing & Quality Assurance
- **Comprehensive Test Suite**: 53+ automated tests covering all aspects
- **Build Validation**: File existence, sizes, content validation
- **Component Testing**: React structure, store integration, accessibility
- **Integration Testing**: WordPress compatibility, API endpoints, data flow
- **Automatic Testing**: Runs after every build to ensure quality
- **CI/CD Ready**: Exit codes for integration with deployment pipelines

## Testing the Plugin

1. Build the assets: `npm run build`
2. Activate the WordPress plugin
3. The demo panel should auto-open showing:
   - **Zustand State Management**: Persistent settings and panel state
   - **Tailwind CSS Integration**: Dynamic styles loaded from API
   - **Component Architecture**: Modular, reusable React components
   - **Server Props Integration**: WordPress data seamlessly passed to React
   - **Keyboard Shortcuts**: Full navigation with Cmd/Ctrl + ` toggle
   - **Settings Dialog**: Advanced configuration with tabs and controls
   - **Command Palette**: Searchable interface with demo commands

## Common Tasks

### Adding New UI Components
1. Create component in `src/components/` directory
2. Use Tailwind classes for rapid styling: `className="p-4 bg-blue-100 rounded-lg"`
3. Use existing design system classes from `ShadowStyles.jsx` for Raycast-specific styling
4. Leverage Radix UI components for accessibility
5. Import and use Zustand stores for state management
6. Add to main `Panel.jsx` or create new route
7. Rebuild with `npm run build` (includes CSS compilation)

### Adding Server Data
1. Modify `addServerDataToPage()` in `shadow-plugin.php`
2. Add new prop to `r2wc` configuration in `src/main.jsx`
3. Use the new prop in `ShadowApp.jsx`

### Extending REST API
1. Add new routes in `initRestApi()` method
2. Implement callback functions with proper nonce verification
3. Use `wp_localize_script` to pass API URLs to React

### Tailwind CSS 4 Development  
1. Modify Tailwind classes in React components (uses ShadCN design tokens)
2. Update `src/styles/main.css` to add new `@theme` variables if needed
3. Run `npm run build:css` to recompile CSS using Vite + @tailwindcss/vite plugin
4. CSS is automatically read server-side and injected into shadow DOM
5. Use ShadCN semantic tokens: `bg-background`, `text-foreground`, `border-border`, etc.

### Critical Development Rules
1. **Never use esc_attr() or esc_js() on base64 CSS** - it will corrupt the CSS
2. **Use json_encode() for JavaScript attributes** and raw base64 for HTML attributes  
3. **CSS uses `@source` directives** to scan JSX files for Tailwind classes
4. **All components must use ShadCN tokens** for consistent design system

## WordPress Integration Examples

The plugin includes comprehensive examples in `INTEGRATION.md` showing:
- Simple button triggers
- Gutenberg block integration
- Admin page integration
- WordPress Customizer integration