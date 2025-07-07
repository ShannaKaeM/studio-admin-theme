# mi-editor Architecture Documentation
**The Editor's Own UI System**

> ⚠️ **This is mi-editor's interface system!** For the design system that users CREATE with mi-editor, see `STUDIO-SYSTEM-ARCHITECTURE.md`

## Overview
mi-editor is a single-file, browser-based visual design system editor. This document covers its architecture, UI components, and implementation details.

## The Two Systems - Critical Distinction 🚨

### 1. **mi-editor UI System** (THIS DOCUMENT)
- Powers the editor's interface (sidebar, buttons, panels, etc.)
- Uses pink/tangerine/neutral color scheme
- Built with the same 4-layer philosophy as Studio but is SEPARATE
- Located in: The main `mi-editor.html` file's styles

### 2. **Studio Design System** (WHAT WE CREATE)
- The design system that users build WITH mi-editor
- Uses aqua/terracotta/sand colors (or user-defined)
- Stored in: `MOC.html` and user's preview/export
- Documented in: `STUDIO-SYSTEM-ARCHITECTURE.md`

## mi-editor's 4-Layer Architecture

### Layer 1: Primitives (Root Variables)
```css
:root {
    /* Base Colors (HSL) - Minimal set */
    --mi-pink: hsl(337, 35%, 52%);      /* Primary UI color */
    --mi-tangerine: hsl(29, 44%, 53%);  /* Accent/highlight color */
    --mi-neutral: hsl(0, 0%, 50%);      /* Base neutral */
    
    /* Dynamic neutral scale generated from base */
    --neutral-950: hsl(from var(--mi-neutral) h s 5%);
    --neutral-900: hsl(from var(--mi-neutral) h s 10%);
    /* ... etc ... */
}
```

### Layer 2: Base Components
These are mi-editor's UI building blocks with variable slots:

#### Button Component
```css
.button {
    --button-padding: 0.5rem 1rem;
    --button-radius: 0.375rem;
    --button-size: 0.875rem;
    --button-weight: 500;
    --button-bg: var(--mi-pink);
    --button-color: white;
    --button-border: 1px solid var(--mi-pink);
    --button-hover-bg: hsl(from var(--mi-pink) h s 60%);
    
    /* Apply variables */
    padding: var(--button-padding);
    border-radius: var(--button-radius);
    /* ... etc ... */
}

/* Variants */
.button--outline {
    --button-bg: transparent;
    --button-color: var(--mi-pink);
}

.button--secondary {
    --button-bg: var(--neutral-800);
    --button-color: var(--neutral-200);
}
```

#### Other Components
- `.input` - Form inputs in the theme panel
- `.select` - Dropdown menus
- `.panel` - Container sections
- `.tab` - Navigation tabs (Theme, Components, Inspector)
- `.badge` - Numbered indicators (layer numbers, etc.)

### Layer 3: Scopes (Context-Specific Overrides)
Scopes modify component variables based on UI context:

```css
/* Sidebar scope - affects all components within */
[data-scope="sidebar"] {
    --panel-bg: var(--neutral-900);
    --panel-border: 1px solid var(--neutral-800);
}

/* Sidebar header - smaller, compact buttons */
[data-scope="sidebar-header"] {
    --button-size: 1rem;
    --button-padding: 0.375rem 0.5rem;
}

/* Theme panel - specific styling for form elements */
[data-scope="theme-panel"] {
    --badge-bg: var(--mi-tangerine);  /* Orange badges for layer numbers */
    --input-bg: var(--neutral-700);
}
```

### Layer 4: Helpers
Utility classes for occasional overrides:

```css
.hidden { display: none !important; }
.collapsed { /* sidebar collapsed state */ }
```

## Component Inventory

### Buttons in mi-editor
1. **Sidebar Controls** (top right)
   - Shrink/Expand/Collapse buttons
   - Uses: `.button.button--secondary`
   - Scope: `[data-scope="sidebar-header"]`

2. **Footer Actions** 
   - Clear Content (solid pink)
   - Upload Image (outline pink)
   - Uses: `.button` and `.button.button--outline`
   - Scope: `[data-scope="sidebar-footer"]`

3. **Preview Header**
   - Connect Folder (solid pink)
   - Export HTML (outline pink)
   - Uses: `.button` and `.button.button--outline`
   - Scope: `[data-scope="preview"]`

### Navigation Tabs
- Theme | Components | Inspector
- Uses: `.tab` class
- Active state: `.tab.active`

### Form Elements
- Color dropdowns: `.select`
- Number inputs: `.input`
- All within `[data-scope="theme-panel"]`

## File Structure

```
mi-editor.html
├── Styles (mi-editor UI)
│   ├── Layer 1: Root variables (--mi-pink, etc.)
│   ├── Layer 2: Components (.button, .input, etc.)
│   ├── Layer 3: Scopes ([data-scope="..."])
│   └── Layer 4: Helpers (.hidden, etc.)
│
├── HTML Structure
│   ├── Sidebar (data-scope="sidebar")
│   │   ├── Header (data-scope="sidebar-header")
│   │   ├── Content panels
│   │   └── Footer (data-scope="sidebar-footer")
│   └── Preview area (data-scope="preview")
│
└── Generated Content (Studio Design System)
    └── This is what users create, NOT mi-editor's UI
```

## Key Principles

1. **Separation of Concerns**
   - mi-editor UI uses pink/tangerine theme
   - Studio content uses whatever the user defines
   - Never mix the two systems

2. **Component Reusability**
   - Define once in Layer 2
   - Override in Layer 3 scopes
   - All buttons share same base component

3. **Variable Slots Philosophy**
   - Components accept ANY CSS value
   - Not limited to predefined sizes
   - Enables infinite customization

4. **Minimal Root Variables**
   - Only 3 base colors defined
   - Everything else generated dynamically
   - Uses CSS relative color syntax

## Common Pitfalls to Avoid

1. **Don't confuse the systems**
   - Pink buttons = mi-editor UI
   - Aqua/custom colors = user's Studio system

2. **Don't hardcode values**
   - Always use CSS variables
   - Let scopes override as needed

3. **Don't mix old classes**
   - No more `.sidebar-btn` (use `.button`)
   - No more `.export-btn` (use `.button`)
   - No more `.editor-tab` (use `.tab`)

## Adding New Components

When adding new UI elements to mi-editor:

1. Create base component in Layer 2
2. Define all variables with defaults
3. Add scope overrides if needed
4. Use existing color variables (--mi-pink, etc.)

Example:
```css
/* New notification component */
.notification {
    --notification-padding: 1rem;
    --notification-bg: var(--neutral-800);
    --notification-color: var(--neutral-100);
    --notification-border: 1px solid var(--mi-pink);
    
    padding: var(--notification-padding);
    background: var(--notification-bg);
    color: var(--notification-color);
    border: var(--notification-border);
}
```

## Application Structure

### Single-File Architecture
```
mi-editor.html
├── HTML Structure
├── CSS (embedded)
│   ├── mi-editor UI styles (pink theme)
│   └── Default Studio content (MOC.html embedded)
├── JavaScript (embedded)
│   ├── Editor functionality
│   ├── Preview management
│   ├── Typography editor
│   ├── Color editor
│   └── Export/Import handlers
└── Hidden textareas for code storage
```

### Layout Structure
```
┌─────────────────────────────────────────────┐
│ Sidebar (400px)          │ Preview Area     │
├─────────────────────────┼──────────────────┤
│ Header                  │ Header           │
│ - Title                 │ - View toggles   │
│ - Controls (−/+/×)      │ - Export buttons │
├─────────────────────────┼──────────────────┤
│ Tabs                    │ Content          │
│ - Theme (active)        │ - Preview iframe │
│ - Components            │ - HTML overlay   │
│ - Inspector             │ - CSS overlay    │
├─────────────────────────┤                  │
│ Content Panels          │                  │
│ - Theme variables       │                  │
│ - Component library     │                  │
│ - Inspector view        │                  │
├─────────────────────────┤                  │
│ Footer                  │                  │
│ - Clear/Upload buttons  │                  │
└─────────────────────────┴──────────────────┘
```

## Current Features

### Visual Editors
1. **Typography Editor**
   - Visual controls for semantic text components
   - Font size (rem), weight, line height, letter spacing (em)
   - Text transform and margin-bottom (em)
   - JSON preset system with localStorage
   - Export/Import functionality

2. **Color Editor**
   - HSL-based visual color picker
   - Separate controls for Hue, Saturation, Lightness
   - Manages 7 color roles (Primary, Secondary, Neutral, etc.)
   - JSON preset system
   - Live preview with contrast detection

### Component Management
- Dropdown selector in sidebar footer
- Pre-built component templates
- Add to editor functionality
- Clear content option

### Preview System
- Real-time iframe preview
- Toggle between Preview/HTML/CSS views
- Code editors as overlays
- Auto-sync with File System API (Chrome/Edge)

### Export/Import
- HTML/CSS combined export
- Typography presets (JSON)
- Color presets (JSON)
- Clean, production-ready output

## JavaScript Architecture

### Core Modules
1. **Editor Management**
   - Tab switching logic
   - Panel visibility control
   - Sidebar resize/collapse

2. **Theme Panel**
   - Accordion sections for organization
   - Typography form generation
   - Color form generation
   - Live preview updates

3. **Preview System**
   - iframe content injection
   - Real-time updates
   - Code overlay management

4. **Storage**
   - localStorage for presets
   - File System API integration
   - Import/Export handlers

## Development Guidelines

### Adding New Features
1. Follow the 4-layer component system
2. Use CSS custom properties for all values
3. Add appropriate data-scope attributes
4. Maintain pink/tangerine color scheme
5. Keep everything in single file

### Code Organization
- CSS: Group by layers (primitives → components → scopes → helpers)
- JS: Group by feature (editor → theme → preview → storage)
- HTML: Semantic structure with clear sections

## Maintenance Notes

- All mi-editor UI styles are in the main `mi-editor.html` file
- No external CSS files for the editor itself
- Studio Design System content is separate (MOC.html, exports)
- When updating, ensure you're modifying the correct system!

## Version History
- **Current**: Full visual editing suite with typography and color systems
- **Previous**: Basic HTML/CSS editor with preview
- **Origin**: Simplified version of PE (Plugin Editor) tool