# Shadow Plugin Boilerplate

A minimal WordPress plugin boilerplate featuring React Shadow DOM architecture with the complete Raycast design system. Perfect starting point for building modern WordPress plugins with React.

## ✨ Features

- 🎯 **React 18** with JSX and hooks
- 🔒 **Shadow DOM** for complete style isolation
- 🎨 **Complete Raycast Design System** included
- ⚡ **Vite Build System** for fast development
- 🔌 **WordPress REST API** integration ready
- ⌨️ **Keyboard Shortcuts** support (Cmd/Ctrl + `)
- 📱 **Responsive Design** 
- 📦 **Web Components** using @r2wc/react-to-web-component
- 🎭 **Framer Motion** animations

## 🚀 Quick Start

```bash
# 1. Copy the boilerplate
cp -r shadow-plugin-boilerplate your-plugin-name
cd your-plugin-name

# 2. Install dependencies
npm install

# 3. Build the plugin
npm run build

# 4. Activate in WordPress admin
```

## 🏗️ What You Get

### Minimal File Structure (Only 7 files!)

```
shadow-plugin-boilerplate/
├── src/
│   ├── main.jsx              # Entry point (web component setup)
│   ├── ShadowApp.jsx         # Demo React app
│   └── ShadowStyles.jsx      # Complete Raycast design system
├── shadow-plugin.php         # WordPress plugin file
├── style.css                 # WordPress plugin styles
├── package.json              # Dependencies (only 4!)
├── vite.config.js            # Build configuration
├── README.md                 # This file
└── INTEGRATION.md            # Quick integration examples
```

### Demo Command Palette

When activated, shows a working command palette with:

- ✅ **"Shadow Plugin Boilerplate is Working!"** - React + Shadow DOM loaded
- 🎨 **"Raycast Design System Active"** - Full design system ready
- 🛡️ **"Style Isolation Working"** - No WordPress style conflicts
- 🔌 **"WordPress API Ready"** - REST endpoints configured

## 🎨 Raycast Design System

Complete design system included with 400+ lines of beautiful CSS:

### Key Components
- **Panels** - `.shadow-plugin-panel` with backdrop blur
- **Buttons** - `.shadow-button`, `.shadow-button-default`, `.shadow-button-ghost`
- **Command Interface** - `.shadow-command-container`, search & animations
- **Forms** - `.shadow-form-input`, `.shadow-form-group`
- **Colors** - Dark theme optimized with CSS variables

### Usage Examples
```jsx
// Beautiful button
<button className="shadow-button shadow-button-default">
  Save Changes
</button>

// Form input
<div className="shadow-form-group">
  <label>Your Setting</label>
  <input type="text" className="shadow-form-input" />
</div>
```

## 🛠️ Development

```bash
npm run dev         # Development with hot reload
npm run build       # Production build
npm run build:watch # Build and watch for changes
```

## 📋 Building Your Plugin

### 1. Replace Demo Content

Edit `src/ShadowApp.jsx`:

```jsx
import React, { useState } from 'react';
import { ShadowStyles } from './ShadowStyles';

export function ShadowApp() {
  return (
    <>
      <ShadowStyles />
      {/* Build your plugin UI here */}
      <div className="shadow-plugin-panel right">
        <div className="shadow-plugin-header">
          <h2>My Awesome Plugin</h2>
        </div>
        <div style={{ padding: 'var(--space-4)' }}>
          <div className="shadow-form-group">
            <label>Plugin Setting</label>
            <input type="text" className="shadow-form-input" />
          </div>
          <button className="shadow-button shadow-button-default">
            Save
          </button>
        </div>
      </div>
    </>
  );
}
```

### 2. Customize Branding

Update these files:
- `shadow-plugin.php` - Plugin name, description, author
- `package.json` - Package name and details
- Rename files as needed

### 3. Add Your Features

The boilerplate gives you:
- **WordPress integration** - PHP plugin structure
- **React app** - Modern component architecture  
- **Shadow DOM** - Complete style isolation
- **Beautiful design** - Raycast system ready to use
- **Build system** - Vite for fast development

## 🎯 Integration Examples

### Simple Trigger
```html
<button onclick="openPlugin()">Open Panel</button>
<shadow-plugin-panel></shadow-plugin-panel>
```

### Gutenberg Block
```jsx
const openPanel = () => {
  let panel = document.querySelector('shadow-plugin-panel');
  if (!panel) {
    panel = document.createElement('shadow-plugin-panel');
    document.body.appendChild(panel);
  }
};
```

See `INTEGRATION.md` for more examples.

## 🔍 Why This Boilerplate?

### ✅ **Minimal Dependencies**
- Only 4 npm packages
- No complex state management 
- No unnecessary abstractions
- Easy to understand and extend

### ✅ **Complete Design System**
- 400+ lines of production-ready CSS
- Raycast-inspired beautiful interface
- Dark theme optimized
- Consistent spacing and typography

### ✅ **Perfect Isolation**
- Shadow DOM prevents all style conflicts
- Your plugin UI never breaks
- Works with any WordPress theme
- Future-proof architecture

### ✅ **WordPress Native**
- Proper plugin structure
- REST API integration ready
- Security best practices
- GPL-compatible license

## 📦 Recommended React Packages

### State Management
- **[Zustand](https://github.com/pmndrs/zustand)** - Lightweight state management (2.9kb)
  ```bash
  npm install zustand
  ```
  ```jsx
  import { create } from 'zustand'
  
  const usePluginStore = create((set) => ({
    isOpen: false,
    settings: {},
    togglePanel: () => set((state) => ({ isOpen: !state.isOpen })),
    updateSetting: (key, value) => set((state) => ({ 
      settings: { ...state.settings, [key]: value } 
    }))
  }))
  ```

- **[Jotai](https://jotai.org/)** - Atomic state management
- **[Valtio](https://github.com/pmndrs/valtio)** - Proxy-based state

### UI Components ✨ **INCLUDED**
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components ✅ **Pre-installed**
  ```bash
  # Already included in boilerplate
  npm install @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-switch
  ```
  ```jsx
  import * as Dialog from '@radix-ui/react-dialog';
  import * as Tabs from '@radix-ui/react-tabs';
  import * as Switch from '@radix-ui/react-switch';
  ```

### UI & Interaction
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with easy validation
- **[React Query/TanStack Query](https://tanstack.com/query/)** - Data fetching and caching
- **[React DnD](https://react-dnd.github.io/react-dnd/)** - Drag and drop interactions
- **[React Hotkeys Hook](https://github.com/JohannesKlauss/react-hotkeys-hook)** - Keyboard shortcuts

### Utilities
- **[Immer](https://immerjs.github.io/immer/)** - Immutable state updates
- **[React Use](https://github.com/streamich/react-use)** - Essential React hooks collection
- **[Lodash-es](https://lodash.com/)** - Utility functions (tree-shakeable)

### WordPress Specific
- **[@wordpress/api-fetch](https://www.npmjs.com/package/@wordpress/api-fetch)** - WordPress REST API client
- **[@wordpress/components](https://www.npmjs.com/package/@wordpress/components)** - WordPress UI components

## 🔗 Server-Side Integration

### Passing PHP Data to React Components

The boilerplate includes seamless server-side data integration via web component attributes:

#### Method 1: Direct HTML Attributes
```php
// In your PHP template/admin page
<shadow-plugin-panel 
    user-role="<?php echo esc_attr($user_role); ?>"
    site-url="<?php echo esc_attr(home_url()); ?>"
    user-id="<?php echo esc_attr($current_user->ID); ?>"
    settings='<?php echo esc_attr(json_encode($settings)); ?>'
    api-nonce="<?php echo esc_attr(wp_create_nonce('plugin_nonce')); ?>"
    is-admin="<?php echo esc_attr(current_user_can('manage_options') ? 'true' : 'false'); ?>"
></shadow-plugin-panel>
```

#### Method 2: JavaScript Dynamic Creation
```php
// In your plugin's PHP enqueue function
add_action('wp_footer', function() {
    ?>
    <script>
        const panel = document.createElement('shadow-plugin-panel');
        panel.setAttribute('user-role', '<?php echo esc_js($user_role); ?>');
        panel.setAttribute('user-id', '<?php echo esc_js($user_id); ?>');
        panel.setAttribute('settings', '<?php echo esc_js(json_encode($settings)); ?>');
        document.body.appendChild(panel);
    </script>
    <?php
});
```

#### React Component Receives Props
```jsx
export function ShadowApp(props = {}) {
  const {
    userRole = 'guest',
    siteUrl = window.location.origin,
    userId = 0,
    settings = {},
    apiNonce = '',
    isAdmin = false
  } = props;

  // Use server data directly in React
  return (
    <div>
      <h2>Welcome {userRole} (ID: {userId})</h2>
      <p>Site: {siteUrl}</p>
      {isAdmin && <AdminPanel settings={settings} />}
    </div>
  );
}
```

### Use Cases for Server Integration

1. **User Context** - Pass user roles, permissions, preferences
2. **Site Configuration** - URLs, settings, feature flags
3. **Security** - Nonces, API keys, authentication tokens
4. **Content Data** - Posts, pages, custom field values
5. **Plugin Settings** - Configuration from WordPress options table

### WordPress Data Sources

```php
// Common WordPress data to pass to React
$server_data = [
    'user_role' => wp_get_current_user()->roles[0] ?? 'guest',
    'user_id' => get_current_user_id(),
    'site_url' => home_url(),
    'admin_url' => admin_url(),
    'is_admin' => current_user_can('manage_options'),
    'api_nonce' => wp_create_nonce('wp_rest'),
    'settings' => get_option('my_plugin_settings', []),
    'posts' => get_posts(['numberposts' => 10]),
    'theme' => get_option('stylesheet'),
    'plugins' => get_option('active_plugins')
];
```

## ✅ Completed Features

- [x] **React 18 Integration** - Modern React with hooks and concurrent features
- [x] **Shadow DOM Architecture** - Complete style isolation from WordPress themes
- [x] **Raycast Design System** - 400+ lines of production-ready CSS components
- [x] **Radix UI Components** - Dialog, Tabs, Switch with demo implementation
- [x] **Server Props Integration** - PHP data seamlessly passed to React components
- [x] **Vite Build System** - Fast development with HMR and optimized builds
- [x] **Web Components** - Custom elements using @r2wc/react-to-web-component
- [x] **Framer Motion** - Smooth animations and transitions
- [x] **WordPress Plugin Structure** - Proper PHP plugin with activation hooks
- [x] **Keyboard Shortcuts** - Cmd/Ctrl + ` to toggle panel
- [x] **Responsive Design** - Works on all screen sizes
- [x] **Command Palette Demo** - Working example with search and actions
- [x] **Form Components** - Input fields, buttons, and form groups
- [x] **Panel Positioning** - Right-side panel with backdrop blur
- [x] **Development Scripts** - Build, watch, and preview commands
- [x] **GPL License** - WordPress-compatible licensing

## 📋 TODO Items

- [ ] **TypeScript Support** - Add TypeScript configuration and type definitions
- [ ] **Testing Setup** - Jest/React Testing Library configuration
- [ ] **Storybook Integration** - Component documentation and testing
- [ ] **ESLint/Prettier** - Code formatting and linting rules
- [ ] **WordPress REST API Examples** - Complete CRUD operations
- [ ] **Admin Settings Page** - WordPress admin interface integration
- [ ] **Internationalization (i18n)** - Multi-language support
- [ ] **Plugin Options Panel** - Settings persistence in WordPress database
- [ ] **Custom Hook Examples** - WordPress-specific React hooks
- [ ] **Performance Optimization** - Code splitting and lazy loading
- [ ] **Plugin Updater** - Auto-update mechanism
- [ ] **Debug Mode** - Development debugging tools
- [ ] **Error Boundaries** - React error handling
- [ ] **Accessibility (a11y)** - WCAG compliance and screen reader support
- [ ] **Mobile Optimization** - Touch interactions and mobile UX

## 💡 Plugin Ideas & Extensions

### Content Management
- **Custom Post Type Manager** - Visual post type and field creation
- **Media Library Enhancer** - Advanced media organization and editing
- **Content Templates** - Reusable content blocks and templates
- **Bulk Content Editor** - Mass edit posts, pages, and custom fields

### E-commerce & Business
- **Simple Store Builder** - Product catalog with Shadow DOM components
- **Lead Generation Forms** - Advanced form builder with CRM integration
- **Appointment Booking** - Calendar and scheduling system
- **Membership Portal** - User registration and content restriction

### Developer Tools
- **Code Snippet Manager** - PHP/JS code snippets with syntax highlighting
- **Database Query Builder** - Visual SQL query construction
- **API Endpoint Tester** - WordPress REST API testing interface
- **Theme/Plugin Inspector** - Debug WordPress hooks and filters

### Analytics & Monitoring
- **Custom Analytics Dashboard** - Site metrics with beautiful charts
- **Performance Monitor** - Page speed and optimization recommendations
- **User Activity Tracker** - Detailed user behavior analytics
- **Error Logger** - JavaScript and PHP error tracking

### Content Creation
- **AI Writing Assistant** - Content generation with OpenAI integration
- **Image Optimizer** - Automatic image compression and WebP conversion
- **SEO Optimization Tool** - Meta tags and schema markup generator
- **Social Media Manager** - Auto-posting and social integration

### Workflow & Automation
- **Task Management** - Project management within WordPress admin
- **Email Automation** - Drip campaigns and user onboarding
- **Backup & Sync** - Automated backups with cloud storage
- **Multi-site Manager** - Centralized WordPress network management

## 📚 Learn More

- [WordPress Plugin Development](https://developer.wordpress.org/plugins/)
- [React Documentation](https://react.dev/)
- [Shadow DOM Guide](https://developer.mozilla.org/docs/Web/Web_Components/Using_shadow_DOM)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Getting Help

1. Check the demo works (should auto-open)
2. Look at browser console for errors
3. Verify Node.js 18+ and WordPress 5.8+
4. Check `INTEGRATION.md` for examples

## 📄 License

GPL v2 or later - Perfect for WordPress plugins

---

**🚀 Ready to build something amazing?**

This boilerplate gives you everything you need in just 7 files. The demo shows it works - now make it yours!