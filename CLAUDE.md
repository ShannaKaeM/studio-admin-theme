# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a WordPress plugin boilerplate that demonstrates modern React Shadow DOM architecture with a complete Raycast-inspired design system. The plugin creates web components using React that render in Shadow DOM to prevent WordPress style conflicts.

## Key Architecture

### React to Web Component System
- **Entry Point**: `src/main.jsx` - Sets up the web component using `@r2wc/react-to-web-component`
- **Main Component**: `src/ShadowApp.jsx` - The root React component that receives server-side props
- **Design System**: `src/ShadowStyles.jsx` - Complete CSS-in-JS implementation of Raycast design system
- **Web Component**: Registered as `<shadow-plugin-panel>` custom element

### Server-Side Integration
- **WordPress Plugin**: `shadow-plugin.php` - Complete WordPress plugin with REST API, admin pages, and server data injection
- **Props System**: Server data (user role, site URL, settings, etc.) passed to React via web component attributes
- **REST API**: WordPress REST endpoints at `/wp-json/shadow-plugin/v1/`

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

- **Vite**: Configured to build as IIFE (Immediately Invoked Function Expression) for WordPress compatibility
- **Output**: Single file `dist/js/shadow-plugin.js` that WordPress enqueues
- **React**: Uses React 18 with modern features (hooks, concurrent rendering)
- **Bundling**: All dependencies bundled together (no external dependencies)

## Key Libraries and Dependencies

### UI Framework
- **React 18**: Core framework with hooks and concurrent features
- **Radix UI**: Headless UI components (Dialog, Tabs, Switch, Label, Dropdown Menu)
- **Framer Motion**: Animation library for smooth transitions
- **Tailwind CSS**: Utility-first CSS framework loaded dynamically via API
- **Zustand**: Lightweight state management with localStorage persistence

### WordPress Integration
- **@r2wc/react-to-web-component**: Converts React components to web components
- **Shadow DOM**: Provides complete style isolation from WordPress themes

## Code Patterns

### WordPress Data to React Props
```php
// In PHP - pass data via attributes
<shadow-plugin-panel 
    user-role="<?php echo esc_attr($user_role); ?>"
    site-url="<?php echo esc_attr(home_url()); ?>"
    settings='<?php echo esc_attr(json_encode($settings)); ?>'
></shadow-plugin-panel>
```

```jsx
// In React - receive as props
export function ShadowApp(props = {}) {
  const { userRole, siteUrl, settings } = props;
  // Use server data in React
}
```

### REST API Integration
- **Endpoints**: `/wp-json/shadow-plugin/v1/data` (GET/POST)
- **Tailwind API**: `/wp-json/shadow-plugin/v1/tailwind-styles` (GET) - Serves compiled CSS
- **Authentication**: WordPress nonce verification
- **Permissions**: `current_user_can('edit_posts')`

### State Management with Zustand
```jsx
// Import store hooks
import { useStore, useWordPressStore } from './storage/store.js';

// Use in components
function MyComponent() {
  const { isPanelOpen, togglePanel, settings } = useStore();
  const { serverData, makeApiCall } = useWordPressStore();
  
  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <button 
        onClick={togglePanel}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
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
├── main.jsx              # Web component setup and registration
├── ShadowApp.jsx         # Main app component (refactored to be minimal)
├── ShadowStyles.jsx      # Complete Raycast design system (400+ lines)
├── TailwindLoader.jsx    # Tailwind CSS API integration
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
    └── main.css          # Tailwind CSS source file

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
│   └── shadow-plugin.js  # Compiled React bundle
└── css/
    └── main.css          # Compiled Tailwind CSS (12KB+)

shadow-plugin.php         # WordPress plugin file
vite.config.js           # Build configuration
build-css.js             # Tailwind CSS build script
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
- **Tailwind CSS**: Utility-first styling with dynamic loading
- **Raycast Design**: Custom design system for professional UI
- **Keyboard Navigation**: Full keyboard support with shortcuts

### Shadow DOM Isolation
- All styles are scoped to Shadow DOM
- No WordPress theme conflicts
- CSS variables defined in `:host` selector
- Complete design system with typography, colors, spacing

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

### Tailwind CSS Development
1. Modify Tailwind classes in React components
2. Update `build-css.js` if you need additional utilities
3. Run `npm run build:css` to recompile CSS
4. CSS is automatically served via WordPress API at `/wp-json/shadow-plugin/v1/tailwind-styles`
5. The `TailwindLoader` component fetches and injects styles into Shadow DOM automatically

## WordPress Integration Examples

The plugin includes comprehensive examples in `INTEGRATION.md` showing:
- Simple button triggers
- Gutenberg block integration
- Admin page integration
- WordPress Customizer integration