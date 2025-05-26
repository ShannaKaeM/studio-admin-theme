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