# The Studio - WordPress Design System Plugin

**Version:** 2.0.0  
**Professional Visual Design System Builder for WordPress**

## 🎯 Project Overview

The Studio is a comprehensive WordPress plugin that provides a professional interface for managing design systems, projects, and visual assets. Built with React 18, TypeScript, and Redux Toolkit, it offers both traditional WordPress admin integration and a standalone fullscreen mode.

---

## 🚀 Quick Start

### System Requirements
- ✅ WordPress 6.0+
- ✅ PHP 7.4+
- ✅ Node.js 16+
- ✅ npm or yarn
- ✅ Modern browser (Chrome 88+, Firefox 85+, Safari 14+)

### Installation

1. **Extract to WordPress plugins directory:**
   ```bash
   /wp-content/plugins/the-studio/
   ```

2. **Install dependencies:**
   ```bash
   cd the-studio/
   npm install
   ```

3. **Build production assets:**
   ```bash
   npm run build
   ```

4. **Activate in WordPress:**
   - Go to **Plugins** → **Installed Plugins**
   - Find "The Studio" and click **Activate**

5. **Access The Studio:**
   - **Admin Mode**: WordPress Admin → **The Studio**
   - **Fullscreen**: Visit `your-site.com/studio/`
   - **Quick Access**: Admin bar → "🎨 Studio Fullscreen"

## ✨ Key Features

### 🏗️ **Project Management**
- **Dashboard View**: Visual project cards with client logos and stats
- **Active Project System**: One active project at a time controls site theming
- **Project Statistics**: Track colors, themes, and modification dates
- **Add New Projects**: Intuitive ghost card interface for project creation

### 🎨 **Design System Ready**
- **Semantic CSS Architecture**: Component-specific variables following Studio guidelines
- **Theme System**: Light/dark mode with proper CSS variable organization
- **Studio Branding**: Professional teal/green gradients and Montserrat typography
- **Responsive Design**: Grid-based layouts with proper spacing scales

### ⚡ **Dual Access Modes**
- **WordPress Admin**: Traditional admin integration with sidebar menu
- **Fullscreen Mode**: Clean standalone interface at `/studio/` URL
- **Admin Bar Link**: Quick access via "🎨 Studio Fullscreen" shortcut

### 🔧 **Technical Architecture**
- **Frontend**: React 18 + TypeScript + Redux Toolkit + Styled Components
- **Backend**: WordPress PHP with REST API v2 endpoints
- **Storage**: JSON file system at `/wp-content/uploads/studio-data/`
- **Build System**: Vite with IIFE format for WordPress compatibility

---

## 💻 Development

### Development Server
```bash
# Start development with hot reload
npm run dev
# Plugin automatically detects dev mode and loads from localhost:5173
```

### Production Build
```bash
# Type check and build optimized assets
npm run build

# Type check only
npm run type-check
```

### Development Workflow
1. Edit React components in `src/` folder
2. Run `npm run build` to compile changes  
3. Refresh WordPress admin or standalone page
4. CSS changes go in `src/styles/global.css`

---

## 📁 Project Architecture

### File Structure
```
the-studio/
├── 📄 the-studio.php                # Main plugin file
├── 📂 includes/
│   ├── 📄 class-studio.php         # Core plugin class
│   └── 📂 api/
│       ├── 📄 class-projects-api.php   # REST API endpoints
│       └── 📄 class-data-manager.php   # JSON storage management
├── 📂 src/                          # React frontend source
│   ├── 📄 main.tsx                  # App entry point
│   ├── 📄 App.tsx                   # Main React component
│   ├── 📂 components/               # React components
│   ├── 📂 store/                    # Redux store & slices
│   ├── 📂 styles/                   # Global CSS & variables
│   └── 📂 utils/                    # API utilities
├── 📂 STYLING/                      # Design system documentation
│   ├── 📄 RULES.md                  # Master styling guidelines
│   ├── 📄 mockup.html              # Reference implementation
│   └── 📄 variables.json           # Data structure
├── 📂 dist/                         # Built production files
├── 📂 templates/
│   └── 📄 standalone.php            # Fullscreen mode template
├── 📄 package.json                  # Dependencies
├── 📄 tsconfig.json                 # TypeScript config
└── 📄 vite.config.ts               # Build config
```

### Component Architecture
```typescript
src/
├── App.tsx                     // Root application
├── store/                      // Redux store
│   ├── slices/uiSlice.ts      // UI state (theme, navigation)
│   └── slices/projectsSlice.ts // Projects data & API calls
├── components/
│   ├── layout/                 // Layout components
│   │   ├── Sidebar.tsx        // Navigation sidebar
│   │   ├── MainContent.tsx    // Main content area
│   │   └── RightSidebar.tsx   // Additional panels
│   ├── pages/
│   │   └── ProjectsPage.tsx   // Projects dashboard
│   └── projects/
│       ├── ProjectCard.tsx    // Individual project display
│       └── AddProjectCard.tsx // Add new project interface
└── styles/global.css          // CSS variables & base styles
```

### Technical Stack
- **React**: 18.2.0 with TypeScript
- **Redux Toolkit**: 1.9.7 for state management  
- **Styled Components**: 6.1.1 for CSS-in-JS
- **Vite**: 5.0.0 for fast builds
- **WordPress**: 6.0+ with PHP 7.4+

## 🎨 Styling System

The Studio follows a semantic CSS architecture with component-specific variables. All styling rules and guidelines are located in the `STUDIO-DOCS/STUDIO-STYLING/` folder:

- **`STUDIO-DOCS/STUDIO-STYLING/STYLING-RULES.md`** - Complete styling guidelines and AI assistant rules
- **`STUDIO-DOCS/STUDIO-STYLING/studio-mockup.html`** - Reference implementation with all CSS variables
- **`STUDIO-DOCS/STUDIO-STYLING/studio-variables.json`** - Data structure and component definitions

### Key CSS Variables
```css
/* Typography Sizes */
--studio-text-metadata: 0.75rem;        /* 12px - timestamps */
--studio-text-interface: 0.875rem;      /* 14px - nav, buttons */
--studio-text-body: 1rem;               /* 16px - main content */
--studio-text-section-title: 1.25rem;   /* 20px - section titles */

/* Brand Colors */
--studio-primary-500: rgb(39, 104, 96);    /* Studio teal */
--studio-secondary-500: rgb(112, 153, 51); /* Studio green */

/* Spacing Scale */
--studio-space-1: 0.25rem;  /* Micro spacing */
--studio-space-4: 1rem;     /* Container spacing */
--studio-space-6: 3rem;     /* Content spacing */
```

**Implementation**: Plugin's `src/styles/global.css` follows the rules defined in `STUDIO-DOCS/STUDIO-STYLING/STYLING-RULES.md`

### Dynamic JSON-to-CSS Connection

The styling system features a **dynamic connection** between JSON component definitions and live CSS:

#### **Interactive Development**
- **`studio-mockup.html`** automatically loads `studio-variables.json`
- **Real-time updates** when JSON component definitions change
- **Development panel** in top-right corner with visual status indicator
- **Browser console tools** for instant testing and debugging

#### **Usage**
```bash
# Open the interactive mockup
open DOCS/STUDIO-DOCS/STUDIO-STYLING/studio-mockup.html
```

#### **Development Panel Features**
```
┌─────────────────────┐
│ 🟢 JSON Connected   │  ← Status: Connected/Disconnected
│ 🔄 Reload JSON      │  ← Reload variables.json changes
│ 📋 Toggle Panel     │  ← Hide/show development tools
│ 📝 View CSS         │  ← See generated CSS output
└─────────────────────┘
```

#### **Console Commands**
```javascript
// Available in browser console (F12):
reloadStudioVariables()     // Reload JSON file
showGeneratedCSS()          // View generated CSS
updateStudioVariables(data) // Test changes instantly
toggleDevPanel()            // Hide/show panel
```

#### **JSON-to-CSS Workflow**
1. **Edit** `studio-variables.json` component definitions
2. **Click** "🔄 Reload JSON" in development panel  
3. **See** styling changes applied instantly to HTML
4. **Test** console commands for rapid prototyping
5. **Copy** generated CSS to plugin implementation

This system allows you to **visually design and test** all styling changes before implementing them in the WordPress plugin.

### Agent Rules & Checkpoint System

The project includes a **streamlined checkpoint system** for consistent development:

- **`AGENT-RULES.md`** - Complete AI assistant rules and workflows
- **Checkpoint Command** - Simply say "checkpoint" for automatic documentation updates and commits
- **Single Source of Truth** - Hierarchical documentation structure with clear authority
- **Documentation Hierarchy** - DOCS/README.md (top-level) → domain-specific docs (styling, agent rules, etc.)

---

## 🔌 API Endpoints

### REST API v2
Base URL: `/wp-json/studio/v2/`

**Projects**
- **GET** `/projects` - List all projects
- **POST** `/projects` - Create new project  
- **PUT** `/projects/{id}` - Update project
- **DELETE** `/projects/{id}` - Delete project
- **POST** `/projects/{id}/activate` - Set active project

---

## 🛠️ WordPress Integration

### Security Features
- WordPress nonce verification
- Capability checks (`manage_options`)
- Input sanitization and validation
- User-specific data isolation

### Data Storage
```bash
# Project data location
/wp-content/uploads/studio-data/users/{user_id}/
├── projects.json              # Project definitions
├── settings.json              # User preferences  
└── assets/                    # Uploaded files (future)
```

---

## 🐛 Troubleshooting

### Common Issues

**Module Errors**
- Ensure `npm run build` completed successfully
- Check browser console for specific errors

**404 on /studio/ URL**  
- Deactivate and reactivate plugin to flush rewrite rules

**API Errors**
- Verify WordPress REST API is enabled
- Check user permissions (`manage_options`)

**Styling Issues**
- Verify CSS variables in `src/styles/global.css`
- Check `./STYLING/RULES.md` for proper implementation

---

## 🎯 Current Status

### ✅ Completed Features
- **Project Management Dashboard** with visual cards
- **Active Project System** with site-wide state  
- **Dual Access Modes** (admin + fullscreen)
- **Theme Toggle** (light/dark mode)
- **Professional UI** with Studio branding
- **JSON Storage System** with REST API
- **WordPress Integration** with security

### 🔄 Next Development  
- **Project Creation Modal** - Add/edit functionality
- **Asset Management** - File upload system
- **Design System Pages** - Colors, Typography, Layouts

---

## 🔗 Quick Links

- **WordPress Admin**: `your-site.com/wp-admin/admin.php?page=the-studio`
- **Fullscreen Mode**: `your-site.com/studio/`  
- **REST API**: `your-site.com/wp-json/studio/v2/projects`
- **Styling Rules**: `STUDIO-DOCS/STUDIO-STYLING/STYLING-RULES.md`

---

## 📚 Additional Documentation

- **`STUDIO-DOCS/STUDIO-STYLING/STYLING-RULES.md`** - Complete styling guidelines and AI assistant rules
- **`CLAUDE.md`** - Comprehensive session memory and development guide  
- **`STUDIO-DOCS/STUDIO-ARCHITECTURE.md`** - System architecture documentation

---

**🎯 The Studio is now a complete, production-ready WordPress plugin with self-contained documentation and styling guidelines.**

*Version 2.0.0 - Professional Visual Design System Builder for WordPress*
