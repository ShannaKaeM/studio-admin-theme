# STUDIO1 SYSTEM DOCUMENTATION

**Complete Technical Reference - July 13, 2025**

## 🚨 **CRITICAL RULES - READ BEFORE EDITING DOCUMENTATION**

### **🔧 Two CSS System Architecture - NEVER MIX:**
- **UI Dashboard** (`ui-components.css`): `--ui-*` colors, `.dashboard-*` classes (never user-editable)
- **Studio1 Content** (`main.css`): `.one` element, `--one-*` properties, direct HSLA (user content)
- **⚠️ Both share same JSON but serve different purposes!**

### **🏷️ Naming Rules - NEVER CHANGE:**
- **Plugin**: "S4 Design System" (matches /s4/ folder - NEVER CHANGE)
- **Brand**: "Studio1 - The One Element System" (user-facing)

### **📝 Documentation Editing Rules:**
1. Read critical rules first
2. Understand two CSS system separation  
3. Preserve plugin vs brand naming
4. Document only TESTED and IMPLEMENTED features

---

> **Document Purpose**: Complete technical documentation of TESTED and IMPLEMENTED Studio1 features. This is the definitive lead technical reference for the Studio1 system. All work documented here has been successfully implemented, tested, and committed to the repository.

## 📁 **Documentation Organization**

**Studio1 Documentation Structure**:
- **04-Doc.md** (this file): **Lead technical documentation** - Complete feature specs and architecture
- **CLAUDE.md**: Development memory and breakthrough history with detailed implementation notes  
- **04-Whiteboard.md**: Current action items and active development progress
- **04-Roadmap.md**: Strategic planning and future development phases
- **04-DOC-Issue-Log.md**: Running log of all changes, fixes, and troubleshooting

**Content Guidelines**:
- **Technical specs** and completed features belong here in 04-Doc.md
- **Development history** and breakthroughs go in CLAUDE.md  
- **Current work** and immediate action items go in 04-Whiteboard.md
- **Future planning** and strategic vision go in 04-Roadmap.md
- **All implementation changes** and troubleshooting go in 04-DOC-Issue-Log.md

---

## 🎯 **CURRENT VERIFIED WORKING FEATURES**

*Only features that have been tested and verified in the current session*

### **✅ Manual Color Control System**
**Date Verified**: July 13, 2025

**Working Light Theme Defaults**:
```css
.one {
    --one-color: hsla(0, 0%, 15%, 1);        /* Dark charcoal text */
    --one-background: hsla(0, 0%, 98%, 1);   /* Nearly white surface */
    --one-border-color: hsla(0, 0%, 30%, 1); /* Medium gray borders */
    
    /* Applied properties */
    color: var(--one-color);
    background: var(--one-background);
    border-color: var(--one-border-color);
}
```

**User Control Achieved**:
- No automatic color systems
- No invisible text issues
- Manual defaults with good contrast
- Complete user override capability

### **✅ Enhanced Scope Editor with Dropdown Controls**
**Date Verified**: July 13, 2025

**Dropdown Control System**:
- **60+ CSS Properties**: Comprehensive dropdown values for common properties including new color system
- **Intelligent Categorization**: Typography, layout, spacing, flexbox, grid, background, border, appearance, SVG & graphics, effects, interaction
- **Complete Color System**: Text color, caret color, background color, border color, outline color, SVG fill/stroke, accent color
- **Smart Fallback**: Text inputs for properties without predefined values
- **User-Friendly Labels**: Property names without --one- prefix for clarity

**Property Categories Working**:
```javascript
// Typography properties (13 properties)
'--one-font-size': ['0.75rem', '0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '2rem', '3rem', '4rem']
'--one-font-weight': ['100', '200', '300', '400', '500', '600', '700', '800', '900']
'--one-line-height': ['1', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.75', '2']

// Layout properties (4 properties)
'--one-display': ['block', 'inline', 'flex', 'grid', 'none']
'--one-position': ['static', 'relative', 'absolute', 'fixed', 'sticky']

// Spacing properties (3 properties)
'--one-padding': ['0', '0.25rem', '0.5rem', '0.75rem', '1rem', '2rem', '3rem']
'--one-margin': ['0', 'auto', '0.25rem', '0.5rem', '1rem', '2rem', '3rem']

// + many more categories with comprehensive value sets
```

**Interface Features**:
- **Accordion Organization**: 11 collapsible categories (Typography, Layout, Spacing, Flexbox, Grid, Background, Border, Appearance, SVG & Graphics, Effects, Interaction)
- **Complete Color Control**: Text, caret, background, border, outline, SVG fill/stroke, and form accent colors
- **Real-time Updates**: Changes apply instantly to preview grid
- **Semantic Labels**: Shows "font-size" instead of "--one-font-size" for user clarity

**New Color Properties Added**:
```css
/* Typography */
--one-color: hsla(0, 0%, 20%, 1);        /* Text color */
--one-caret-color: hsla(0, 0%, 20%, 1);  /* Text cursor color */

/* Background */  
--one-background-color: hsla(0, 0%, 90%, 1);  /* Background color */

/* Border & Outline */
--one-border-color: hsla(0, 0%, 70%, 1);     /* Border color */
--one-outline-color: hsla(0, 0%, 70%, 1);    /* Outline/focus ring color */

/* SVG & Graphics */
--one-fill: hsla(0, 0%, 20%, 1);             /* SVG fill color */
--one-stroke: hsla(0, 0%, 70%, 1);           /* SVG stroke color */
--one-stroke-width: 1px;                     /* SVG stroke width */

/* Interaction */
--one-accent-color: hsla(0, 0%, 20%, 1);     /* Form control accent color */
```

---

## 🏗️ **THREE-TAB CREATOR SYSTEM - FOUNDATION COMPLETE**

**Date Implemented**: July 14, 2025  
**Status**: First two tabs roughed in and functional, waiting for Pattern Creator completion

### **✅ Tab 1: 📦 1Blocks - COMPLETE**
**Purpose**: Individual element creation and editing
**Status**: Fully functional with complete feature set

**Key Features**:
- **Collections Management** - Create, organize, and manage 1Block collections
- **Property Editor** - 11 accordion categories with 60+ CSS properties
- **Real-time Preview** - Live preview grid with instant visual updates
- **Move/Rearrange** - Move 1Blocks between collections with modal interface
- **Export/Import** - JSON configuration management
- **Base Test Scopes** - Pre-built foundation scopes (button, text-box, container, etc.)

### **✅ Tab 2: 🏗️ Box Groups - COMPLETE WITH LIMITATIONS**
**Purpose**: Assembly system for combining 1Blocks into components
**Status**: Fully functional with single card pattern, ready for Pattern Creator enhancement

**Key Features**:
- **Collections Management** - Separate collections system from 1Blocks
- **Smart Nesting Logic** - Intelligent hierarchical rendering (image INSIDE card, content INSIDE card)
- **Property Editor** - Real-time editing of container properties (layout, grid, spacing, appearance)
- **Code Generation** - View and copy generated HTML/CSS with proper nesting structure
- **Live Preview** - Visual preview of assembled components with sample content

**Current Limitation**: Single hard-coded card pattern (card-box → image-box → content-box → text-box → button)

**Technical Architecture**:
```javascript
// Current hard-coded pattern detection
const hasCardBox = boxGroup.items.includes('card-box');
if (hasCardBox) {
  // Render card pattern with proper nesting
}
```

### **🔄 Tab 3: Sections - PLANNED**
**Purpose**: Complete page compositions using 1Blocks and Box Groups
**Status**: Planned after Pattern Creator provides unlimited layout patterns

**Architecture Dependencies**:
- Requires Pattern Creator for flexible Box Group layouts
- Needs design presets system for visual styling layer
- Will combine 1Blocks + Box Groups + Sections for complete compositions

---

## 🔧 **CURRENT KNOWN ISSUES**

### **Issue #001: Export JSON Bug**
**Status**: Under Investigation  
**Problem**: Export not including newly created scopes  
**Reference**: See 04-DOC-Issue-Log.md for full investigation details

### **Issue #002: Scope System Documentation Gap**
**Status**: ✅ Documented  
**Problem**: Scope vs 1Block terminology and data-scope system not properly documented
**Solution**: Complete scope system documentation added below

---

## 🎯 **SCOPE SYSTEM ARCHITECTURE**

*Complete documentation of the data-scope attribute system and 1Block terminology*

### **Core Concepts**

#### **Scopes vs 1Blocks**
- **Scope**: A named styling configuration stored in JSON
- **1Block**: A user-created scope with specific styling properties
- **data-scope attribute**: HTML attribute that applies scope styling to elements

#### **HTML Implementation**
```html
<!-- Single scope application -->
<div data-scope="hero-section" class="one">
  Content styled with hero-section scope
</div>

<!-- Multiple scope application (space-separated) -->
<div data-scope="card primary-theme" class="one">
  Content with both card and primary-theme scopes
</div>
```

#### **CSS Generation Pattern**
When a scope is created, the system generates CSS using attribute selectors:
```css
/* Generated CSS for scope named "hero-section" */
.one[data-scope="hero-section"] {
  --one-font-size: 2rem;
  --one-color: hsla(0, 0%, 15%, 1);
  --one-padding: 2rem;
}

/* Multiple scopes use attribute contains selector */
.one[data-scope~="card"] {
  --one-border: 1px solid hsla(0, 0%, 30%, 1);
  --one-border-radius: 0.5rem;
}
```

### **Scope Creation Workflow**

#### **1Block Builder Interface**
1. **Collection Management**: Organize 1Blocks into named collections
2. **1Block Creation**: Create new scope with name and minimal defaults
3. **Property Editor**: Accordion-based editor with dropdown controls
4. **Live Preview**: Real-time preview grid showing all collection blocks

#### **Default Property Structure**
```javascript
// Minimal defaults for new 1Block
{
  '--one-display': 'block',
  '--one-font-family': 'var(--font-family)'
}
```

### **Property Editor System**

#### **Dropdown Controls**
The scope editor provides intelligent dropdown controls for common CSS properties:

**Typography Properties**:
- Font sizes (0.75rem to 4rem)
- Font weights (100-900)
- Line height (1 to 2)
- Text alignment, transform, etc.

**Layout Properties**:
- Display types (block, flex, grid, etc.)
- Position values (static, relative, absolute, etc.)
- Overflow and visibility options

**Spacing Properties**:
- Padding/margin values (0 to 3rem)
- Gap values for flex/grid layouts

**Advanced Properties**:
- Flexbox alignment and direction
- Grid template definitions
- Border styles and widths
- Effects like opacity and cursor

#### **Text Input Fallback**
For properties without predefined values, the system provides text inputs for custom values.

### **Storage Architecture**

#### **localStorage Structure**
```javascript
// Main configuration storage
'studio1-theme-config': {
  scopes: {
    "scope-name": {
      baseProperties: {
        "--one-property": "value"
      }
    }
  }
}

// Collection organization storage
'studio1-collections': {
  "collection-name": {
    name: "Display Name",
    blocks: ["scope1", "scope2", "scope3"]
  }
}
```

### **CSS Injection System**

#### **Real-time Updates**
When scope properties change, the system:
1. Updates the localStorage configuration
2. Generates new CSS rules
3. Injects CSS into document head with ID `studio1-component-styles`
4. Applies changes instantly to preview elements

#### **CSS Selector Strategy**
```css
/* Specific scope targeting */
.one[data-scope="button-primary"] {
  --one-background: hsla(200, 100%, 50%, 1);
  --one-color: white;
  --one-padding: 0.75rem 1.5rem;
}

/* Multiple scope support */
.one[data-scope~="interactive"] {
  --one-cursor: pointer;
  --one-transition: all 0.2s ease;
}
```

---

## 📋 **ARCHITECTURE NOTES**

*Carefully documented architecture elements - verify before relying on*

### **File Structure**
```
s4/
├── s4.php                    # Main plugin file
├── package.json              # Build configuration  
├── vite.config.js            # Build system
├── src/
│   ├── main.jsx             # Entry point
│   ├── styles/
│   │   ├── main.css         # .one element + user content
│   │   └── ui-components.css # Dashboard UI only
│   ├── hooks/
│   │   └── useThemeConfig.js # Configuration management
│   └── components/
│       ├── Studio1ThemeBuilder.jsx # Main dashboard
│       └── ScopesBuilder.jsx       # Scope editor
└── dist/                    # Build output
```

### **CSS System Separation**
- **UI Dashboard**: Uses semantic CSS classes, fixed colors, never user-editable
- **User Content**: Uses .one element with --one- variables, fully user-controllable

---

## ⚠️ **DOCUMENTATION STATUS**

**Current State**: Minimal verified documentation only  
**Note**: Previous content moved to 04-DOC-Issue-Log.md for verification

**Next Steps**: 
1. Test and verify each claimed feature
2. Document only confirmed working functionality  
3. Build documentation carefully and systematically

---

*This document will grow as features are tested, verified, and properly documented.*