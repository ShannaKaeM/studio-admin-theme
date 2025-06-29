





# Studio Design System - HTML Mockups

**Purpose**: Design foundation for The Studio WordPress Plugin  
**Status**: CSS Architecture Complete - Ready for Additional Pages  
**Created**: June 29, 2025

---

## 📁 **Files in This Directory**

### **HTML Mockups**
- **`studio-mockup.html`** - ✅ **CURRENT VERSION** - Complete Colors page with organized CSS architecture
- **`admin-page-mockup.html`** - 🚧 **COMING NEXT** - Variable & component admin interface

### **Data Files**
- **`studio-variables.json`** - ✅ **COMPLETE** - Component catalog & variable documentation for admin page

### **Archive**
- **`Backups/`** - Previous versions and development backups

---

## 🎯 **CSS Architecture Overview**

Our HTML mockups implement a **clean and organized CSS architecture** using simple spacing scales with semantic organization and Studio brand consistency.

### **🚀 Key Features: Simple Spacing + Studio Branding**

We use a clean spacing scale system with Studio brand consistency:

```css
/* ✅ SIMPLE SPACING SCALE */
--studio-space-1: 0.25rem;
--studio-space-2: 0.5rem;
--studio-space-3: 0.75rem;
--studio-space-4: 1rem;
--studio-space-5: 2rem;
--studio-space-6: 3rem;

/* ✅ STUDIO BRAND SYSTEM */
--studio-primary-500: rgb(39, 104, 96);    /* Studio teal */
--studio-secondary-500: rgb(112, 153, 51);  /* Studio green */
```

### **📊 Design System Features**

#### **1. Simple Spacing Scale**
Clean, predictable spacing using numbered scale:
```css
/* Consistent spacing progression */
--studio-space-1: 0.25rem;  /* 4px - fine details */
--studio-space-2: 0.5rem;   /* 8px - small gaps */
--studio-space-3: 0.75rem;  /* 12px - medium gaps */
--studio-space-4: 1rem;     /* 16px - standard spacing */
--studio-space-5: 2rem;     /* 32px - large spacing */
--studio-space-6: 3rem;     /* 48px - section spacing */
```

#### **2. Studio Brand Integration**
Professional Studio brand colors with gradient effects:
```css
/* Brand Colors */
--studio-primary-500: rgb(39, 104, 96);    /* Studio teal */
--studio-secondary-500: rgb(112, 153, 51);  /* Studio green */

/* Gradient Effects */
background: linear-gradient(135deg, var(--studio-primary-500), var(--studio-secondary-500));
```

#### **3. Enhanced UI Features**
- **Studio Icon**: 35px size for enhanced visibility
- **Consistent Sidebar Padding**: Both sidebars use `--studio-space-5`
- **Active Navigation**: Gradient backgrounds for active states
- **Professional Typography**: Montserrat font with semantic sizing
- **Card-based Interface**: 24px radius with gradient brand accents

---

## 🏗️ **CSS Organization Structure**

Our CSS is organized with clear section headers for maximum maintainability:

```css
/* ================================== */
/* CSS VARIABLES & THEME SYSTEM      */
/* ================================== */
/* Color scales, typography, theme modes */

/* ================================== */
/* BASE STYLES & PAGE LAYOUT         */
/* ================================== */
/* Global styles, grid layout */

/* ================================== */
/* LEFT SIDEBAR                       */
/* ================================== */
/* Left Sidebar - Header */
/* Left Sidebar - Navigation */

/* ================================== */
/* MAIN HEADER                        */
/* ================================== */
/* Main Header - Top Bar */
/* Main Header - Sub Navigation */

/* ================================== */
/* SECTION HEADER                     */
/* ================================== */
/* Page section headers with titles/descriptions */

/* ================================== */
/* COLOR WIDGET                       */
/* ================================== */
/* Color cards, controls, format tabs */

/* ================================== */
/* RIGHT SIDEBAR                      */
/* ================================== */
/* Right Sidebar - Header */
/* Right Sidebar - Content */
```

---

## 🎨 **Studio Theme System**

### **Color Variables**
```css
/* Primary: Studio Teal */
--studio-primary-500: rgb(39, 104, 96);

/* Secondary: Studio Green */
--studio-secondary-500: rgb(112, 153, 51);

/* Base: Neutral Scale */
--studio-base-50: #ffffff;   /* Lightest */
--studio-base-950: #000000;  /* Darkest */
```

### **Typography System**
```css
--studio-font-family: 'Montserrat', system-ui, sans-serif;
--studio-text-xs: 0.75rem;
--studio-text-sm: 0.875rem;
--studio-text-base: 1rem;
--studio-text-lg: 1.125rem;
--studio-text-xl: 1.25rem;
--studio-text-2xl: 1.5rem;
```

### **Layout Grid**
```css
.studio-layout {
    display: grid;
    grid-template-columns: 250px 1fr 300px;  /* Sidebar | Content | Sidebar */
    height: 100vh;
}
```

---

## 🛠️ **Development Guidelines**

### **When Adding New Elements**

1. **Never use hardcoded spacing values**
2. **Always use the Studio spacing scale variables**
3. **Choose the appropriate scale level for your spacing needs**
4. **Maintain consistent Studio brand integration**

#### **Good Examples:**
```css
/* ✅ Using Studio spacing scale */
padding: var(--studio-space-4);
gap: var(--studio-space-3);

/* ✅ Studio brand colors for accents */
background: linear-gradient(135deg, var(--studio-primary-500), var(--studio-secondary-500));
color: var(--studio-primary-500);
```

#### **Bad Examples:**
```css
/* ❌ Hardcoded spacing */
padding: 1rem;
gap: 12px;

/* ❌ Non-Studio colors */
background: #ff0000;
color: #00ff00;
```

### **CSS Organization Rules**

1. **Add new components to appropriate sections**
2. **Use clear section headers with `/* ======= */` format**
3. **Group related styles together**
4. **Keep CSS organized by UI component, not by property type**

### **Variable Naming Convention**

Format: `--studio-[component]-[property]`

Examples:
- `--studio-nav-padding` (Navigation component padding)
- `--studio-card-gap` (Card component internal gap)
- `--studio-button-group-gap` (Gap between button groups)

---

## 🎯 **Benefits of This Architecture**

### **For Developers**
- **Simple and predictable**: Clear numbered spacing scale that's easy to understand
- **Easy maintenance**: Consistent spacing relationships across all components
- **Studio brand integration**: Professional teal/green color system throughout
- **Component focus**: CSS is organized by UI component sections

### **For AI Assistants**
- **Clear patterns**: Simple spacing scale is easy to follow and implement
- **Organized structure**: Clear CSS section headers for easy navigation
- **Studio brand consistency**: Always use Studio colors for professional results
- **Maintainable additions**: Clear patterns for adding new components

### **For Design Consistency**
- **Professional polish**: Enhanced Studio branding with gradients and proper sizing
- **Brand consistency**: All styling uses Studio theme variables and colors
- **Scalable system**: Simple spacing scale works for any new components
- **Visual hierarchy**: Gradient effects and enhanced icons for better UX

---

## 🔗 **Integration with Studio Setup Guide**

These HTML mockups serve as the **design foundation** for the React + TypeScript implementation outlined in `/DOCS/STUDIO-DOCS/STUDIO-SETUP-GUIDE.md`.

### **Translation Path: HTML → React**
1. **CSS Variables** → React styled-components theme
2. **Component Sections** → React component files  
3. **Semantic Variables** → TypeScript theme interfaces
4. **Layout Structure** → React page components

### **Maintained Consistency**
- **Color system** matches React implementation specs
- **Component structure** previews React component organization
- **Typography scale** aligns with setup guide requirements
- **Layout grid** translates directly to React layouts

---

## 📋 **Next Steps**

### **Additional Page Mockups Needed**
1. **Typography Page** - Font management and text style presets
2. **Layouts Page** - Grid systems and layout templates  
3. **Effects Page** - Shadows, gradients, and visual effects
4. **Scopes Page** - Context-aware component system
5. **Projects Page** - Project management interface

### **Enhancement Opportunities**
1. **Responsive behavior** - Mobile and tablet layouts
2. **Interactive prototyping** - More JavaScript functionality
3. **Animation system** - Transition and animation variables
4. **Component variants** - Light/dark theme refinements

### **WordPress Integration**
1. **PHP integration** - Connect designs to WordPress plugin
2. **REST API design** - Plan data structures based on UI mockups
3. **Theme.json generation** - Export design tokens to WordPress
4. **Gutenberg integration** - Block editor compatibility

---

## 🚀 **Quick Start for New Mockups**

To create a new page mockup:

1. **Copy** `colors-page-organized.html` as your starting point
2. **Update** the page title and main content section
3. **Add** new semantic variables for your specific components
4. **Organize** your new CSS in the appropriate component section
5. **Test** light/dark mode compatibility
6. **Document** any new semantic variables you create

**Remember**: Never use hardcoded spacing values - always create meaningful semantic variables!

---

**🎨 This architecture provides a solid foundation for professional design system development and seamless transition to React implementation.**