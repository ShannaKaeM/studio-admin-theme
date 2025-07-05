# CLAUDE SESSION MEMORY

**The Studio WordPress Design System Plugin**

**Document Hierarchy**: Working Document (AI Modifiable)  
**Date Created**: December 30, 2024  
**Last Updated**: January 2025  
**Current Project**: The Studio - WordPress Design System Plugin  
**Location**: `/Users/shannamiddleton/Local Drive Mac/mi agency/miProjects/studio-admin-theme`  
**Current Phase**: Documentation Hierarchy Implementation  
**Site URL**: `http://localhost:10100/`

---

## 📚 **DOCUMENT HIERARCHY SYSTEM**

**Master Documents (Read-Only)**:
- `01-ALWAYS-RULES.md` - Core universal AI assistant guidelines
- `02-PROJECT-ARCHITECTURE.md` - Complete project vision, core architecture, user workflows
- `03-TECHNICAL-SETUP.md` - Development setup, build system, WordPress integration
- `04-STYLING-SYSTEM.md` - Universal styling system

**Working Documents**:
- `CLAUDE.md` - Session memory, current status, development context

---

## 🎯 **PROJECT STATUS OVERVIEW**

### **✅ COMPLETED - Working WordPress Plugin**
The Studio is now a **fully functional WordPress plugin** with:
- **React frontend** with TypeScript + Redux Toolkit
- **WordPress PHP backend** with REST API
- **JSON data storage** at `/wp-content/uploads/studio-data/`
- **Fullscreen standalone mode** accessible at `/studio/` URL
- **Projects management** with active project system

---

## 🏗️ **CURRENT ARCHITECTURE**

### **Plugin Structure**
```
app/public/wp-content/plugins/the-studio/
├── the-studio.php                 # Main plugin file
├── includes/
│   ├── class-studio.php          # Main plugin class
│   └── api/
│       ├── class-projects-api.php # REST API endpoints
│       └── class-data-manager.php # JSON storage management
├── src/                           # React frontend source
│   ├── main.tsx                   # App entry point
│   ├── App.tsx                    # Main React component
│   ├── components/                # React components
│   ├── store/                     # Redux store & slices
│   ├── styles/global.css          # CSS variables & base styles
│   └── utils/api.ts               # API utility functions
├── dist/                          # Built production files
├── templates/
│   └── standalone.php             # Fullscreen mode template
├── package.json                   # Node.js dependencies
├── postcss.config.js              # PostCSS configuration for Tailwind
└── tailwind.config.js             # Tailwind CSS configuration (if needed)
```

### **Navigation Structure (Current)**
```
SIDEBAR NAVIGATION:
├── Projects (top-level)
│   ├── Dashboard (tab)
│   └── Assets (tab) - placeholder
├── Design System (section)
│   ├── Colors (placeholder)
│   ├── Typography (placeholder)
│   ├── Layouts (placeholder)
│   └── Scopes (placeholder)
└── Settings (bottom) - placeholder
```

---

## 🎨 **STYLING ARCHITECTURE COMPLIANCE**

### **✅ Following Studio Styling Rules**
- **CSS Variables**: Using semantic `--studio-*` variables throughout
- **Component Organization**: CSS organized by UI sections, not properties
- **Semantic Typography**: Using component-specific text variables
- **Studio Branding**: Teal/green gradients, Montserrat font, proper spacing

### **Recent Font Size Fixes**
Fixed section header titles to match HTML mockup:
- **Main Title**: `2.5rem` with `font-weight: 700` (was too small)
- **Subtitle**: `var(--studio-text-interface)` with proper letter-spacing
- **Gradient**: Maintained proper teal-to-green gradient on titles

### **CSS Variables System**
```css
/* Typography Sizes */
--studio-text-metadata: 0.75rem;        /* 12px - timestamps, nav titles */
--studio-text-interface: 0.875rem;      /* 14px - nav, buttons, forms */
--studio-text-body: 1rem;               /* 16px - main content */
--studio-text-card-title: 1.125rem;     /* 18px - card headers */
--studio-text-section-title: 1.25rem;   /* 20px - section titles */
--studio-text-page-title: 1.875rem;     /* 30px - page headers */

/* Spacing Scale */
--studio-space-1: 0.25rem;  /* Micro spacing */
--studio-space-2: 0.5rem;   /* Tight spacing */
--studio-space-3: 0.75rem;  /* Element spacing */
--studio-space-4: 1rem;     /* Container spacing */
--studio-space-5: 2rem;     /* Section spacing */
--studio-space-6: 3rem;     /* Content spacing */

/* Brand Colors */
--studio-primary-500: rgb(39, 104, 96);    /* Studio teal */
--studio-secondary-500: rgb(112, 153, 51); /* Studio green */
```

---

## 🚀 **ACCESS METHODS**

### **1. WordPress Admin**
- Navigate to **"The Studio"** in admin sidebar
- Full plugin interface within WordPress admin

### **2. Fullscreen Mode** ⭐
- **URL**: `http://localhost:10100/studio/`
- Clean interface without WordPress admin clutter
- Fullscreen toggle button (⛶) in bottom right
- Admin bar shortcut: "🎨 Studio Fullscreen"

---

## 📊 **CURRENT FEATURES**

### **Projects Management**
- **Dashboard Tab**: Project cards with client logos, stats, active toggle
- **Assets Tab**: Placeholder for future asset management
- **Active Project System**: Only one project can be active at a time
- **Project Stats**: Colors count, themes count, last modified date
- **Add New Project**: Ghost card with + icon for adding projects

### **Data Storage**
- **JSON Files**: Stored at `/wp-content/uploads/studio-data/users/{user_id}/`
- **REST API**: Full CRUD operations for projects
- **Active Project Tracking**: WordPress option for site-wide active project

### **UI Features**
- **Light/Dark Theme Toggle**: Functional theme switching
- **Semantic CSS**: Component-specific styling following Studio guidelines
- **Responsive Design**: Grid-based layout with proper spacing
- **Professional Polish**: Smooth animations, hover effects, gradients

---

## 🔧 **TECHNICAL IMPLEMENTATION**

### **Build System**
```bash
# Development with hot reload
npm run dev

# Production build
npm run build
```

### **Styling System**
- **styled-components**: Primary CSS-in-JS solution for component-specific styles
- **Tailwind CSS v4**: Utility-first CSS framework for rapid UI development
- **CSS Variables**: Design system tokens in global.css
- **Hybrid Approach**: Use both styled-components and Tailwind classes together

### **WordPress Integration**
- **Plugin Activation**: Creates data directories, sets up rewrite rules
- **REST API Endpoints**: `/wp-json/studio/v2/projects`
- **Permissions**: Requires `manage_options` capability
- **Security**: Nonce verification, input sanitization

### **React State Management**
- **Redux Toolkit**: Centralized state management
- **UI Slice**: Theme, active page/tab state
- **Projects Slice**: Project data, loading states, API calls

---

## 📋 **DEVELOPMENT WORKFLOW**

### **Making Changes**
1. **Edit React components** in `src/` folder
2. **Run `npm run build`** to compile changes
3. **Refresh WordPress admin** or standalone page
4. **CSS changes** go in `src/styles/global.css`

### **Adding New Pages**
1. **Create component** in `src/components/pages/`
2. **Add navigation** in `src/components/layout/Sidebar.tsx`
3. **Add routing** in `src/components/layout/MainContent.tsx`
4. **Follow styling conventions** from DOCS/STUDIO-STYLING/STYLING-RULES.md

---

## 🎯 **NEXT DEVELOPMENT PRIORITIES**

### **✅ COMPLETED: Universal Scoped Component System Production Ready**
- ✅ **STYLING-RULES.md**: Clean production-ready styling guidelines (single source of truth)
- ✅ **STUDIO-MOC.html**: Complete foundation with universal scoped classes (`.card.projects.dashboard`)
- ✅ **STUDIO-INPUT.json**: Clean 4-tier hierarchy system (v4.0.0) ready for plugin integration
- ✅ **Responsive System**: Hamburger menus at 1320px & 1068px breakpoints
- ✅ **React Compatibility**: Clean className structure for direct plugin integration
- ✅ **Documentation Alignment**: Single source of truth structure established

### **CURRENT PHASE: Full Plugin Development**
Following **STUDIO-ARCHITECTURE.md** comprehensive vision for professional design system builder:

**Phase 1: Foundation Implementation (Current)**
1. **Apply Universal Scoped System**: Update plugin with V2 architecture
2. **Projects Page Enhancement**: Complete dashboard with universal components
3. **Core Plugin Architecture**: Establish foundation for advanced features

**Phase 2: Design System Builder (Next)**
1. **Colors Page**: Multi-brand color management with layered preset system
2. **Typography Page**: Font scale builders with mathematical consistency
3. **Theme Mapping**: Semantic role assignment and preset management

**Phase 3: Advanced Architecture (Future)**
1. **Layered Preset System**: Revolutionary 4-layer preset architecture
2. **Mathematical Consistency**: Base + calculation system for scalability
3. **Scopes System**: Context-aware styling with layout and helper scopes

### **Design System Pages**
1. **Colors Page**: Multi-brand color management with universal scoped components
2. **Typography Page**: Font scale builders using universal base + page scopes
3. **Layouts Page**: Component composition with scoped inheritance
4. **Scopes Page**: Context-aware styling editor

### **Advanced Features**
1. **Add Project Modal**: Create/edit project functionality
2. **Asset Management**: File upload system for project assets
3. **Project Theme Connection**: Link projects to specific theme configurations

### **Advanced Features**
1. **Import/Export**: Project data portability
2. **Theme Generation**: CSS variable output system
3. **Live Preview**: Real-time style changes on frontend
4. **Multi-user Support**: User permissions and project sharing

---

## 🔍 **DEBUGGING & TROUBLESHOOTING**

### **Common Issues**
- **Module Errors**: Ensure `npm run build` completed successfully
- **404 on /studio/**: Deactivate/reactivate plugin to flush rewrite rules
- **API Errors**: Check WordPress REST API is enabled
- **Styling Issues**: Verify CSS variables are properly defined

### **Development Commands**
```bash
# Navigate to plugin directory
cd "app/public/wp-content/plugins/the-studio"

# Install dependencies
npm install

# Development mode (hot reload)
npm run dev

# Production build
npm run build

# Type checking
npm run type-check
```

---

## 📚 **DOCUMENTATION REFERENCES**

### **Key Files**
- **DOCS/STUDIO-STYLING/STYLING-RULES.md**: Complete V2 styling guidelines (Single Source of Truth)
- **DOCS/STUDIO-ARCHITECTURE.md**: Comprehensive plugin development roadmap
- **DOCS/STUDIO-STYLING/STUDIO-MOC/STUDIO-MOC.html**: Production-ready reference implementation
- **DOCS/STUDIO-STYLING/STUDIO-MOC/STUDIO-INPUT.json**: V4.0.0 component definitions

### **WordPress Plugin Files**
- **the-studio.php**: Main plugin initialization
- **class-studio.php**: Core plugin functionality
- **class-projects-api.php**: REST API endpoints
- **standalone.php**: Fullscreen mode template

---

## ⚡ **QUICK ACCESS LINKS**

- **Plugin Admin**: `http://localhost:10100/wp-admin/admin.php?page=the-studio`
- **Fullscreen Mode**: `http://localhost:10100/studio/`
- **REST API**: `http://localhost:10100/wp-json/studio/v2/projects`
- **Plugin Directory**: `/app/public/wp-content/plugins/the-studio/`

---

## 💾 **RECENT SESSION CHANGES**

### **July 5, 2025 - Session: Tailwind CSS v4 Integration**
- ✅ **Tailwind CSS v4 Added**: Integrated modern utility-first CSS framework alongside styled-components
- ✅ **PostCSS Configuration**: Created postcss.config.js for build pipeline
- ✅ **Tailwind Import**: Added `@import "tailwindcss"` to global.css
- ✅ **Test Component**: Created TailwindTest.tsx to verify integration
- ✅ **Database Backup**: Created backup-before-tailwind-20250705-094108.sql
- ✅ **Git Branch**: Created and switched to `tailwind` branch for development
- ✅ **Hybrid Styling**: Maintained existing styled-components while adding Tailwind capabilities
- 🔄 **Next Steps**: Push to GitHub with `git push -u origin tailwind`
- 🔄 **Development**: Can now use Tailwind utility classes throughout React components

### **July 3, 2025 - Session: HTML Editor Integration & Project Cleanup**
- ✅ **HTML Editor Implementation**: Added 6th view mode (🌐 HTML) to PE.html interface
- ✅ **HTML Editor Functions**: Created generateHTML(), updateHTMLEditor(), saveHTMLChanges()
- ✅ **View Mode Integration**: Updated setViewMode() to handle HTML mode switching
- ✅ **Project Cleanup**: Converted test-pe.html to PE-DATA-TESTING.md documentation
- ✅ **File Organization**: Removed test-pe.html from main project folder
- ✅ **Documentation Updates**: Updated PE-DOC.md to v3.2.0 with HTML editor features
- ✅ **Roadmap Enhancement**: Added Phase 4.5 (HTML Editor) and Phase 5.5 (Cleanup) to roadmap
- ✅ **Synchronization Vision**: Documented MOC.html ↔ MOC.json ↔ PE.html sync goals
- 🔄 **Next Priority**: Fix generateHTML() to load actual MOC.html content instead of placeholder
- 🔄 **Future Goal**: Implement bidirectional HTML ↔ JSON synchronization

### **December 30, 2024 - Session 4: V2 Universal Scoped System Production Ready + Documentation Alignment**
- ✅ **STYLING-RULES.md**: Single source of truth styling guidelines (renamed from V2)
- ✅ **Documentation Alignment**: Updated all cross-references for consistency
- ✅ **Full Plugin Vision Integration**: Aligned V2 system with STUDIO-ARCHITECTURE.md roadmap
- ✅ **4-Tier Hierarchy Production Ready**: Primitives → Generic → Top Level → Helper Scopes
- ✅ **React className Ready**: Clean universal scoped classes (.card.projects.dashboard)
- ✅ **Responsive System Complete**: Hamburger menu system at 1320px & 1068px breakpoints
- ✅ **JSON System V4.0.0**: Clean component definitions with 4-tier architecture
- ✅ **Agent Rules Updated**: V2 system guidelines for AI assistant development
- ✅ **README.md Modernized**: Updated file references and implementation paths
- ✅ **Development Roadmap**: Clear phases from foundation to advanced features

### **December 30, 2024 - Session 3: Universal Scoped Component System + JSON Reconnection Complete**
- ✅ **Universal Component Architecture**: Implemented complete scoped CSS system with `.card.projects.dashboard` syntax
- ✅ **Progressive Enhancement**: Created base universal components (card, sidebar, section-title, nav, status, stats) with page/tab scoping
- ✅ **Projects Page Refactor**: Converted entire Projects page mockup to use universal scoped classes
- ✅ **JSON Component Catalog**: Extended STUDIO-INPUT.json with universal sidebar and section-title components
- ✅ **CSS Cascade System**: Established secure base styles that cascade to all pages (base → page → tab)
- ✅ **HTML Structure Update**: Converted all classes from `.studio-*` to scoped system (`.sidebar.projects`, `.card.projects.dashboard`)
- ✅ **Meta Development Panel**: Created STUDIO-DEV-PANEL.html - self-hosted editor using same scoped architecture
- ✅ **Dev Panel Structure Refinement**: Simplified left nav to match real plugin (Projects, Colors, Typography, etc.)
- ✅ **Progressive Disclosure Interface**: Revolutionary UX that reveals options only when relevant
- ✅ **Three-Level Selection Flow**: "What to edit?" → Component → Scope → Variables editor
- ✅ **Smart Filtering**: Page Level vs Tab Level distinction with contextual component lists
- ✅ **Dynamic Scope Population**: Component-specific scope options (universal, projects, projects.dashboard, etc.)
- ✅ **Full View Toggle**: Working preview expansion with CSS class-based toggle (.dp-app.full-view)
- ✅ **Enhanced Error Handling**: Try-catch blocks, console logging, and conflict-free button handlers
- ✅ **Helper Text Guidance**: Contextual instructions that update based on selection progress
- ✅ **Clean Preview Separation**: Removed old dev tools from STUDIO-MOC.html for clean iframe embedding
- ✅ **Interactive Features**: Copy to clipboard, dynamic breadcrumbs, live selector updates
- ✅ **Architecture Self-Validation**: Dev panel uses `.dp-card.projects.editor` classes, proving system scalability
- ✅ **PHASE 1 REFACTOR COMPLETE**: Eliminated ALL studio-* prefixes from HTML, implemented clean hierarchy
- ✅ **Universal Component Foundation**: 4-tier hierarchy (Primitives → Generic → Top Level → Helper Scopes)
- ✅ **Navigation System Fix**: Converted sidebar navigation to proper flex-column with universal classes
- ✅ **Responsive Hamburger System**: Progressive enhancement (3-col → left hamburger → both hamburgers)
- ✅ **Mobile-First Architecture**: Touch-friendly overlays with smooth animations and proper z-indexing
- ✅ **React Compatibility Ready**: Clean className structure for direct React component integration
- ✅ **Semantic CSS Hierarchy**: Follows design system principles with maintainable structure
- ✅ **Documentation Updated**: Complete DEV-PANEL README with refactored architecture guide
- ✅ **STUDIO-MOC Folder Creation**: Separated STUDIO-MOC.html and STUDIO-INPUT.json into dedicated folder
- ✅ **JSON System Refactor**: Complete rewrite of STUDIO-INPUT.json to match new universal component architecture
- ✅ **JSON-to-CSS Reconnection**: Dynamic CSS injection system connecting JSON configuration to HTML
- ✅ **Dev Panel Path Updates**: Updated iframe and documentation references to point to ../STUDIO-MOC/ location
- ✅ **4-Tier Architecture Complete**: Primitives → Generic → Top Level → Helper Scopes fully implemented

### **December 30, 2024 - Session 2: Documentation & Dynamic Styling**
- ✅ **Documentation Consolidation**: Moved README to DOCS, consolidated SETUP.md into README
- ✅ **STYLING Folder**: Relocated STUDIO-STYLING to DOCS with renamed STYLING-RULES.md
- ✅ **Dynamic JSON-CSS Connection**: Connected studio-variables.json to studio-mockup.html
- ✅ **Development Panel**: Added interactive panel with reload, status, and CSS viewing tools
- ✅ **AGENT-RULES.md**: Created comprehensive agent rules with checkpoint command system
- ✅ **Single Source of Truth**: Established documentation hierarchy and authority structure
- ✅ **Checkpoint System**: Streamlined automatic checkpoint process without user prompts

### **December 30, 2024 - Session 1: WordPress Plugin Creation**
- ✅ **Navigation Restructure**: Removed ADMIN section, made Projects top-level
- ✅ **Tab System**: Added Dashboard/Assets tabs to Projects page
- ✅ **Fullscreen Mode**: Added standalone `/studio/` URL access
- ✅ **Font Size Fix**: Corrected section header titles to match mockup (2.5rem)
- ✅ **Settings Relocation**: Moved Settings to bottom of sidebar
- ✅ **Admin Bar Link**: Added "🎨 Studio Fullscreen" shortcut

### **Build Status**
- **Last Build**: Successful - `227.63 kB` JavaScript, `4.06 kB` CSS
- **React Version**: 18.2.0 with TypeScript
- **WordPress Compatibility**: 6.0+ with PHP 7.4+

---

## 🎨 **PLUGIN EDITOR (PE) PROJECT**

### **Project Overview**
The Plugin Editor (PE) is a visual spreadsheet-style editor for managing the STUDIO 4-Layer Architecture CSS system. Located in `/DOCS/TEMPORARY-PROJECTS/PLUGIN-EDITOR/`.

**Current Version**: 3.2.0 (July 3, 2025)
**Status**: 🚧 Active Development - HTML Editor Integration Phase

### **Latest Updates (July 2025)**
- **HTML Editor Integration**: Added 6th view mode for HTML structure editing
- **Bidirectional Sync Vision**: MOC.html ↔ MOC.json ↔ PE.html synchronization
- **Project Cleanup**: Removed test files, converted to documentation
- **Documentation Updates**: Comprehensive roadmap and feature documentation
- **File Organization**: Clean project structure with proper DOCS hierarchy

### **6 View Modes**
1. **📊 Table Mode**: Spreadsheet-style data editing
2. **⚡ Split Mode**: Data + live CSS preview
3. **🎯 Progressive Mode**: Step-by-step component builder (default)
4. **✏️ Editor Mode**: Filtered JSON editing
5. **📄 JSON Mode**: Full MOC.json editing
6. **🌐 HTML Mode**: HTML structure editing with sync (NEW)

### **4-Layer Architecture Implementation**
1. **Layer 1**: Root Theme Variables (10-shade color scales)
2. **Layer 2**: Base Components (wrapper, navigation, layout)
3. **Layer 3**: Scopes (card, hero, sidebar, panel, etc.)
4. **Layer 4**: Helpers (brand-colors, dark, active, holiday)

### **Key Files**
- **PE.html**: Main editor with 6 view modes
- **MOC.html**: Actual implementation HTML (sync target)
- **MOC.json**: Unified data source
- **PE-DOC.md**: Comprehensive documentation (v3.2.0)
- **PE-UPDATE-ROADMAP.md**: Development phases and tasks
- **PE-DATA-TESTING.md**: Converted test documentation
- **load-json-inline.js**: Embedded JSON data to avoid CORS

### **Current Status**
- ✅ Architecture fully migrated to 4-layer system
- ✅ HTML Editor interface implemented
- ✅ Progressive builder with variable controls
- ✅ Live preview panel with layer toggles
- ✅ Project cleanup and documentation complete
- 🔄 **Priority**: Fix generateHTML() to load actual MOC.html content
- 🔄 **Next**: Implement HTML ↔ JSON bidirectional synchronization
- 🔄 Pending: Save functionality, undo/redo, file writing capabilities

### **HTML Editor Vision**
**Goal**: Central editing hub where MOC.html ↔ MOC.json ↔ PE.html all synchronize
- Edit HTML structure → automatically updates JSON data
- Edit JSON data → automatically updates HTML structure
- PE.html becomes the central editor for the entire STUDIO system

---

**🎯 The Studio is now a fully functional WordPress plugin ready for continued development and expansion!**

*This memory file should be referenced for all future development sessions to maintain context and architectural consistency.*