# STUDIO 4-Layer Architecture: AI Development Guide

**Version:** 1.0  
**Date:** July 11, 2025  
**Status:** ✅ Active Reference  

## 🎯 Mission Statement

You are building components, scopes, and helpers for the **STUDIO 4-Layer Architecture** - a revolutionary CSS system that achieves maximum flexibility through pure CSS variables while maintaining architectural purity. Every element must be composable, reusable, and follow the strict layer hierarchy.

---

## 🏗️ Architecture Overview

### **The 5-Layer Hierarchy**
```
Layer 1: Brand Variables (4 Base HSLA Colors, Typography)
    ↓
Layer 2: Global Elements (.box, .text)
    ↓
Layer 3: Component Scopes (brand-box, header, sidebar)
    ↓
Layer 4: Presets (Design Variations - colors, sizes, layouts, states)
    ↓
Layer 5: Helper Scopes (Project-Specific Variants - black-friday, realtor-card)
```

### **Core Principles**
1. **Variables Only in Scopes** - Never hardcode values
2. **Applied Properties Only in Elements** - Elements contain actual CSS properties
3. **Composable Architecture** - Every component works with every other component
4. **CSS Grid Always** - Use CSS Grid with grid areas for all layouts
5. **Flexbox Rarely** - Only for simple containers with no children
6. **Semantic HTML** - Use `data-scope` attributes for styling hooks
7. **Dynamic Color System** - Base HSLA colors modified by presets
8. **Consult on Naming** - Always check with user for new scope/helper names

---

## 🧩 Component Structure

### **HTML Pattern**
```html
<div class="box" data-scope="component-name">
    <div class="text" data-scope="title">Content</div>
    <div class="box" data-scope="sub-component">
        <div class="text" data-scope="subtitle">More Content</div>
    </div>
</div>
```

### **CSS Pattern**
```css
[data-scope="component-name"]{
    --box-layout-display: grid;
    --box-layout-grid-template-columns: auto 1fr;
    --box-layout-grid-template-areas: "a b";
    --box-layout-column-gap: 1rem;
    --box-grid-area: a;
    --box-background: var(--color3-800);
    --box-padding: 1rem;
}
```

---

## 📋 Layer 1: Brand Variables

### **Purpose**
Define the core visual identity foundation - 4 base HSLA colors and typography only.

### **Dynamic Color System**
```css
:root {
    /* 4 Base HSLA Colors - Modified by Presets */
    --color1: hsla(337, 35%, 52%, 1);  /* Primary */
    --color2: hsla(29, 44%, 53%, 1);   /* Secondary */
    --color3: hsla(0, 0%, 46%, 1);     /* Neutral */
    --color4: hsla(0, 0%, 46%, 1);     /* Base */
    
    /* Typography */
    --font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### **Future Implementation**
Presets will dynamically modify H, S, L, A values:
```css
/* Example: Preset modifies base colors */
[data-preset="vibrant"] {
    --color1: hsla(337, 85%, 52%, 1);  /* Increased saturation */
    --color2: hsla(29, 84%, 53%, 1);   /* Increased saturation */
}

[data-preset="muted"] {
    --color1: hsla(337, 15%, 52%, 0.8);  /* Decreased saturation, alpha */
    --color2: hsla(29, 14%, 53%, 0.8);   /* Decreased saturation, alpha */
}
```

### **Temporary Color Scales**
*Note: 10-shade scales (50-950) are currently used for development but will be replaced by dynamic preset system.*

### **Rules**
- ✅ **4 Base HSLA Colors** - Use HSLA format for maximum flexibility
- ✅ **Typography** - Font families and font stacks
- ✅ **Preset-Ready** - Colors designed to be modified by presets
- ❌ **No layout properties** - Keep purely visual
- ❌ **No component-specific values** - Stay generic
- ❌ **No hardcoded scales** - Presets will generate variations

---

## 🎨 Layer 2: Global Elements

### **Purpose**
Define reusable elements with comprehensive CSS custom properties and applied CSS properties.

### **The .box Element**
The universal container element supporting all layout systems:

```css
.box {
    /* === CSS CUSTOM PROPERTIES === */
    
    /* Display & Layout */
    --box-display: block;
    --box-position: relative;
    --box-z-index: 1;
    
    /* Dimensions */
    --box-width: auto;
    --box-height: auto;
    --box-min-width: none;
    --box-max-width: none;
    
    /* Spacing */
    --box-padding: 0;
    --box-margin: 0;
    
    /* Background */
    --box-background: transparent;
    --box-background-image: none;
    --box-background-size: cover;
    
    /* Grid Positioning */
    --box-grid-area: auto;
    
    /* Layout Display Type */
    --box-layout-display: block; /* grid | flex | block */
    
    /* Shared Layout Variables */
    --box-layout-gap: 0;
    --box-layout-row-gap: var(--box-layout-gap);
    --box-layout-column-gap: var(--box-layout-gap);
    --box-layout-align-items: stretch;
    --box-layout-justify-content: start;
    
    /* CSS Grid Layout Variables */
    --box-layout-grid-template-columns: none;
    --box-layout-grid-template-rows: none;
    --box-layout-grid-template-areas: none;
    --box-layout-grid-justify-items: stretch;
    
    /* CSS Flexbox Layout Variables */
    --box-layout-flex-direction: row;
    --box-layout-flex-wrap: nowrap;
    
    /* === APPLIED CSS PROPERTIES === */
    
    /* Core Properties */
    display: var(--box-layout-display, var(--box-display, block));
    position: var(--box-position);
    width: var(--box-width);
    height: var(--box-height);
    padding: var(--box-padding);
    margin: var(--box-margin);
    background: var(--box-background);
    background-image: var(--box-background-image);
    
    /* Grid Properties */
    grid-area: var(--box-grid-area);
    grid-template-columns: var(--box-layout-grid-template-columns);
    grid-template-rows: var(--box-layout-grid-template-rows);
    grid-template-areas: var(--box-layout-grid-template-areas);
    justify-items: var(--box-layout-grid-justify-items);
    
    /* Shared Layout Properties */
    gap: var(--box-layout-gap);
    row-gap: var(--box-layout-row-gap);
    column-gap: var(--box-layout-column-gap);
    align-items: var(--box-layout-align-items);
    justify-content: var(--box-layout-justify-content);
    
    /* Flexbox Properties */
    flex-direction: var(--box-layout-flex-direction);
    flex-wrap: var(--box-layout-flex-wrap);
}
```

### **The .text Element**
The universal text element:

```css
.text {
    /* === CSS CUSTOM PROPERTIES === */
    
    /* Typography */
    --text-font-family: var(--font-family);
    --text-font-size: 1rem;
    --text-font-weight: 500;
    --text-line-height: 1.4;
    --text-color: var(--color3-500);
    
    /* Layout */
    --text-display: block;
    --text-margin: 0;
    --text-padding: 0;
    --text-grid-area: auto;
    
    /* === APPLIED CSS PROPERTIES === */
    
    /* Typography */
    font-family: var(--text-font-family);
    font-size: var(--text-font-size);
    font-weight: var(--text-font-weight);
    line-height: var(--text-line-height);
    color: var(--text-color);
    
    /* Layout */
    display: var(--text-display);
    margin: var(--text-margin);
    padding: var(--text-padding);
    grid-area: var(--text-grid-area);
}
```

### **Rules**
- ✅ **Comprehensive variables** - Cover all possible CSS properties
- ✅ **Applied properties** - Use variables in actual CSS properties
- ✅ **Fallback chains** - Use `var(--primary, var(--fallback, default))`
- ✅ **Universal compatibility** - Work with any layout system
- ❌ **No hardcoded values** - Everything must be variable-driven
- ❌ **No scope-specific logic** - Keep generic and reusable


---

## 🎯 Layer 3: Component Scopes

### **Purpose**
Define specific component behavior by overriding element variables.

### **Naming Convention**
- **Semantic names**: `brand-box`, `nav-box`, `sidebar`, `header`
- **Hyphenated**: Use kebab-case for multi-word names
- **Descriptive**: Name reflects purpose, not appearance, generic and reusable

### **Grid Layout Pattern**
```css
[data-scope="component-name"]{
    /* Grid Container Setup */
    --box-layout-display: grid;
    --box-layout-grid-template-columns: auto 1fr auto;
    --box-layout-grid-template-rows: auto 1fr auto;
    --box-layout-grid-template-areas: 
        "a b c"
        "d e f"
        "g h i";
    
    /* Grid Spacing */
    --box-layout-column-gap: 1rem;
    --box-layout-row-gap: 0;
    
    /* Grid Alignment */
    --box-layout-align-items: center;
    --box-layout-justify-items: start;
    
    /* Grid Positioning */
    --box-grid-area: a;
    
    /* Visual Styling */
    --box-background: var(--color3-800);
    --box-padding: 1rem;
    --box-width: 100%;
}
```

### **Grid Area Assignment**
Use single letters for grid areas:
```css
/* 2x2 Grid Example */
--box-layout-grid-template-areas: 
    "a b"
    "c d";

/* 3x3 Grid Example */
--box-layout-grid-template-areas: 
    "a b c"
    "d e f"
    "g h i";

/* Spanning Example */
--box-layout-grid-template-areas: 
    "a a b"  /* 'a' spans 2 columns */
    "c d e";
```

### **Child Component Positioning**
```css
[data-scope="logo"]{
    --box-grid-area: a;
    --box-background-image: url('../05-Assets/logo.png');
    --box-background-size: contain;
    --box-width: 3rem;
    --box-height: 3rem;
}

[data-scope="title"]{
    --box-grid-area: b;
    --text-font-size: 1.5rem;
    --text-font-weight: 500;
    --text-color: var(--color3-50);
}
```

### **Layout Systems**

#### **CSS Grid ALWAYS**
```css
[data-scope="grid-component"]{
    --box-layout-display: grid;
    --box-layout-grid-template-columns: 1fr 2fr 1fr;
    --box-layout-grid-template-rows: auto 1fr auto;
    --box-layout-grid-template-areas: 
        "header header header"
        "sidebar main aside"
        "footer footer footer";
    --box-layout-gap: 1rem;
}
```

#### **Flexbox Never or rarly**
```css
[data-scope="flex-component"]{
    --box-layout-display: flex;
    --box-layout-flex-direction: row;
    --box-layout-justify-content: space-between;
    --box-layout-align-items: center;
    --box-layout-gap: 1rem;
}
```

#### **Block (Fallback)**
```css
[data-scope="block-component"]{
    --box-layout-display: block;
    --box-margin: 1rem 0;
}
```

### **Common Patterns**

#### **Brand Box Pattern**
```css
[data-scope="brand-box"]{
    --box-layout-display: grid;
    --box-layout-grid-template-columns: auto 1fr;
    --box-layout-grid-template-areas: "a b";
    --box-layout-column-gap: 1rem;
    --box-layout-align-items: center;
}

[data-scope="logo-box"]{
    --box-grid-area: a;
    --box-layout-display: grid;
    --box-layout-align-items: center;
    --box-layout-justify-items: center;
}

[data-scope="text-box"]{
    --box-grid-area: b;
    --box-layout-display: flex;
    --box-layout-align-items: center;
    --box-layout-justify-items: start;
    
}
```

#### **Header Pattern**
```css
[data-scope="header"]{
    --box-layout-display: grid;
    --box-layout-grid-template-columns: auto 1fr auto;
    --box-layout-grid-template-areas: "a b c";
    --box-layout-align-items: center;
    --box-layout-gap: 1rem;
    --box-background: var(--color3-900);
    --box-padding: 1rem 2rem;
}
```

#### **Sidebar Pattern**
```css
[data-scope="sidebar"]{
    --box-layout-display: grid;
    --box-layout-grid-template-rows: auto 1fr auto;
    --box-layout-grid-template-areas: "a" "b" "c";
    --box-background: var(--color3-800);
    --box-padding: 1rem;
}
```

### **Rules**
- ✅ **Variables only** - Never apply CSS properties directly
- ✅ **Grid-first** - Use CSS Grid as primary layout system
- ✅ **Semantic naming** - Use descriptive, purpose-based names, generic and reusable. 
- ✅ **Letter grid areas** - Use single letters (a, b, c, d...)
- ✅ **Brand color references** - Use `var(--color1-500)` format
- ❌ **No hardcoded values** - Everything must reference variables
- ❌ **No applied properties** - Only override element variables

---

## 🔧 Layer 4: Helper Scopes

### **Purpose**
Cross-cutting modifiers that can be applied to any component.

### **Types of Helpers**

#### **State Helpers**
```css
[data-helper="active"]{
    --box-background: var(--color1-500);
    --text-color: var(--color1-50);
}

[data-helper="disabled"]{
    --box-opacity: 0.5;
    --text-color: var(--color3-400);
}

[data-helper="hover"]{
    --box-background: var(--color1-600);
    --box-box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
```

#### **Theme Helpers**
```css
[data-helper="dark"]{
    --box-background: var(--color3-900);
    --text-color: var(--color3-100);
}

[data-helper="light"]{
    --box-background: var(--color3-100);
    --text-color: var(--color3-900);
}
```

#### **Size Helpers**
```css
[data-helper="small"]{
    --text-font-size: 0.875rem;
    --box-padding: 0.5rem;
}

[data-helper="large"]{
    --text-font-size: 1.25rem;
    --box-padding: 1.5rem;
}
```

#### **Seasonal/Brand Helpers**
```css
[data-helper="holiday"]{
    --box-background: var(--color2-500);
    --text-color: var(--color2-50);
    --box-border: 2px solid var(--color1-500);
}
```

### **Usage Pattern**
```html
<div class="box" data-scope="button" data-helper="active large">
    <div class="text">Active Large Button</div>
</div>
```

### **Rules**
- ✅ **Modifier purpose** - Enhance or modify existing components
- ✅ **Cross-cutting** - Work with any component scope
- ✅ **Stackable** - Multiple helpers can be applied together
- ✅ **Semantic naming** - Use descriptive, state-based names
- ❌ **No layout changes** - Don't override grid template areas
- ❌ **No structural changes** - Don't change display types

---

## 🎨 Layer 4: Presets

### **Purpose**
Dynamically modify the 4 base HSLA colors and control design variations - colors, sizes, states, and themes.

### **Dynamic Color Modification**
```css
/* Color Theme Presets - Modify base HSLA values */
[data-preset="vibrant"] {
    --color1: hsla(337, 85%, 52%, 1);  /* Boost saturation */
    --color2: hsla(29, 84%, 53%, 1);
    --color3: hsla(0, 0%, 20%, 1);     /* Darker neutral */
    --color4: hsla(0, 0%, 20%, 1);
}

[data-preset="muted"] {
    --color1: hsla(337, 15%, 52%, 0.7);  /* Reduce saturation & alpha */
    --color2: hsla(29, 14%, 53%, 0.7);
    --color3: hsla(0, 0%, 60%, 0.8);
    --color4: hsla(0, 0%, 60%, 0.8);
}

[data-preset="dark"] {
    --color1: hsla(337, 35%, 65%, 1);  /* Lighter for dark backgrounds */
    --color2: hsla(29, 44%, 65%, 1);
    --color3: hsla(0, 0%, 80%, 1);
    --color4: hsla(0, 0%, 80%, 1);
}
```

### **Component Variable Presets**
```css
/* Size Presets */
[data-preset="small"] {
    --box-padding: 0.5rem;
    --text-size: 0.875rem;
}

[data-preset="large"] {
    --box-padding: 2rem;
    --text-size: 1.25rem;
}

/* State Presets */
[data-preset="hover"] {
    --box-transform: translateY(-2px);
    --box-box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

[data-preset="active"] {
    --box-border-width: 2px;
    --box-border-style: solid;
}
```

### **Usage**
```html
<!-- Color theme applied to container affects all children -->
<div class="box" data-preset="vibrant" data-scope="page">
    <div class="box" data-scope="card" data-preset="large hover">
        <h2 class="text" data-scope="title">Card Title</h2>
    </div>
</div>
```

### **Rules**
- ✅ **Modify base HSLA colors** - Change H, S, L, A values for themes
- ✅ **Design variations** - Sizes, states, visual themes
- ✅ **Use data-preset attribute** - Multiple presets space-separated
- ✅ **Override variables only** - Never set applied properties
- ✅ **Semantic naming** - vibrant, muted, dark, large, hover, etc.
- ✅ **Cascading themes** - Color presets inherit down the DOM tree
- ❌ **No layout structure** - Use scopes for layout changes
- ❌ **No component-specific logic** - Keep generic and reusable

---

## 🎨 Color System

### **HSLA Format (Current)**
Use HSLA for maximum flexibility with alpha channel:
```css
--color1: hsla(337, 35%, 52%, 1);  /* Hue, Saturation, Lightness, Alpha */
--color2: hsla(29, 44%, 53%, 1);
--color3: hsla(0, 0%, 46%, 1);
--color4: hsla(0, 0%, 46%, 1);
```

### **Dynamic Color Modification**
Presets modify base HSLA values:
```css
/* Example: Vibrant preset increases saturation */
[data-preset="vibrant"] {
    --color1: hsla(337, 85%, 52%, 1);  /* 35% → 85% saturation */
    --color2: hsla(29, 84%, 53%, 1);   /* 44% → 84% saturation */
}

/* Example: Muted preset reduces saturation and alpha */
[data-preset="muted"] {
    --color1: hsla(337, 15%, 52%, 0.7);  /* Reduced saturation & alpha */
    --color2: hsla(29, 14%, 53%, 0.7);
}
```

### **Temporary 10-Shade Scales**
*Note: These are used for development but will be replaced by dynamic preset system.*

```css
--color1-50: hsl(337, 70%, 97%);   /* Lightest */
--color1-100: hsl(337, 60%, 91%);
--color1-200: hsl(337, 55%, 83%);
--color1-300: hsl(337, 45%, 70%);
--color1-400: hsl(337, 40%, 61%);
--color1-500: hsl(337, 35%, 52%);  /* Base color */
--color1-600: hsl(337, 38%, 42%);
--color1-700: hsl(337, 42%, 32%);
--color1-800: hsl(337, 45%, 26%);
--color1-900: hsl(337, 50%, 21%);
--color1-950: hsl(337, 60%, 11%);  /* Darkest */
```

### **Usage Guidelines (Temporary)**
- **50-200**: Light backgrounds, subtle accents
- **300-400**: Muted colors, secondary elements
- **500**: Base brand color, primary elements
- **600-700**: Hover states, active elements
- **800-900**: Dark backgrounds, high contrast text
- **950**: Darkest elements, maximum contrast

*These will be replaced by dynamic color generation based on preset modifications.*

---

## 📐 Grid System Guide

### **Grid Template Areas**
Use quoted strings for each row:
```css
--box-layout-grid-template-areas: 
    "a b c"    /* Row 1: 3 columns */
    "d e f"    /* Row 2: 3 columns */
    "g h i";   /* Row 3: 3 columns */
```

### **Spanning Elements**
Repeat area names to span multiple cells:
```css
--box-layout-grid-template-areas: 
    "a a b"    /* 'a' spans 2 columns */
    "c d e";   /* Normal 3 columns */
```

### **Grid Alignment**
```css
/* Individual items within their areas */
--box-layout-align-items: center;     /* Vertical alignment */
--box-layout-justify-items: start;    /* Horizontal alignment */

/* Entire grid within container */
--box-layout-align-content: center;   /* Vertical grid alignment */
--box-layout-justify-content: start;  /* Horizontal grid alignment */
```

### **Grid Gaps**
```css
--box-layout-gap: 1rem;              /* Both row and column gap */
--box-layout-row-gap: 0;             /* Specific row gap */
--box-layout-column-gap: 1rem;       /* Specific column gap */
```

### **Common Grid Patterns**

#### **Two Column Layout**
```css
--box-layout-grid-template-columns: auto 1fr;
--box-layout-grid-template-areas: "a b";
```

#### **Three Column Layout**
```css
--box-layout-grid-template-columns: auto 1fr auto;
--box-layout-grid-template-areas: "a b c";
```

#### **Full Page Layout**
```css
--box-layout-grid-template-rows: auto 1fr auto;
--box-layout-grid-template-areas: 
    "header"
    "main"
    "footer";
```

#### **Dashboard Layout**
```css
--box-layout-grid-template-columns: 300px 1fr;
--box-layout-grid-template-rows: auto 1fr auto;
--box-layout-grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
```

---

## 🔍 Development Workflow

### **1. Analyze Requirements**
- What is the component's purpose?
- What layout system is most appropriate?
- What child components are needed?
- What states or variations are required?

### **2. Plan Grid Structure**
- How many columns and rows?
- Which areas need to span multiple cells?
- What gaps and alignment are needed?

### **3. Create Component Scope**
```css
[data-scope="new-component"]{
    /* Layout System */
    --box-layout-display: grid;
    --box-layout-grid-template-columns: /* define columns */;
    --box-layout-grid-template-rows: /* define rows */;
    --box-layout-grid-template-areas: /* define areas */;
    
    /* Spacing */
    --box-layout-gap: /* define gaps */;
    
    /* Alignment */
    --box-layout-align-items: /* define alignment */;
    
    /* Positioning */
    --box-grid-area: /* define position in parent */;
    
    /* Visual Styling */
    --box-background: /* use brand colors */;
    --box-padding: /* define spacing */;
}
```

### **4. Create Child Scopes**
```css
[data-scope="child-component"]{
    --box-grid-area: a;  /* Assign to grid area */
    /* Override other properties as needed */
}
```

### **5. Create HTML Structure**
```html
<div class="box" data-scope="new-component">
    <div class="box" data-scope="child-component">
        <div class="text" data-scope="text-element">Content</div>
    </div>
</div>
```

### **6. Test and Refine**
- Verify grid areas work correctly
- Test with different content lengths
- Ensure responsive behavior
- Validate color contrast
- Check accessibility

---

## ⚠️ Common Pitfalls

### **❌ Don't Do This**
```css
/* Hardcoded values */
[data-scope="bad-component"]{
    background: #ff0000;
    padding: 20px;
    display: flex;
}

/* Applied properties in scopes */
[data-scope="bad-component"]{
    display: grid;
    grid-template-columns: 1fr 2fr;
}

/* Non-semantic naming */
[data-scope="red-box"]{
    --box-background: red;
}
```

### **✅ Do This Instead**
```css
/* Use brand color variables */
[data-scope="good-component"]{
    --box-background: var(--color1-500);
    --box-padding: 1rem;
    --box-layout-display: grid;
    --box-layout-grid-template-columns: 1fr 2fr;
}

/* Semantic naming */
[data-scope="alert-box"]{
    --box-background: var(--color1-500);
}
```

---

## 🎯 Quality Checklist

### **Before Submitting Code**
- [ ] All values use CSS variables
- [ ] Grid areas use single letters (a, b, c, d...)
- [ ] Color references use brand color system
- [ ] Semantic, descriptive naming
- [ ] Proper layer separation maintained
- [ ] HTML uses `data-scope` attributes
- [ ] Components are composable and reusable
- [ ] Grid template areas match grid template rows/columns
- [ ] Fallback values provided where appropriate
- [ ] Documentation includes usage examples

### **Testing Requirements**
- [ ] Component works in isolation
- [ ] Component works nested within other components
- [ ] Grid areas display correctly
- [ ] Responsive behavior is appropriate
- [ ] Color contrast meets accessibility standards
- [ ] Typography scales properly
- [ ] Layout doesn't break with varying content

---

## 📚 Reference Examples

### **Complete Brand Box Implementation**
```html
<div class="box" data-scope="brand-box">
    <div class="box" data-scope="logo-box">
        <div class="box" data-scope="logo"></div>
    </div>
    <div class="box" data-scope="text-box">
        <div class="text" data-scope="title">studio4</div>
        <div class="text" data-scope="subtitle">VISUAL THEME BUILDER</div>
    </div>
</div>
```

```css
[data-scope="brand-box"]{
    --box-layout-display: grid;
    --box-layout-grid-template-columns: auto 1fr;
    --box-layout-grid-template-areas: "a b";
    --box-layout-column-gap: 1rem;
    --box-layout-align-items: center;
    --box-grid-area: a;
}

[data-scope="logo-box"]{
    --box-grid-area: a;
    --box-layout-display: flex;
    --box-layout-align-items: center;
    --box-layout-justify-content: center;
}

[data-scope="logo"]{
    --box-background-image: url('../05-Assets/logo.png');
    --box-background-size: contain;
    --box-width: 3rem;
    --box-height: 3rem;
}

[data-scope="text-box"]{
    --box-grid-area: b;
}

[data-scope="title"]{
    --text-font-size: 1.5rem;
    --text-font-weight: 500;
    --text-color: var(--color3-50);
    --text-margin: 0 0 0.25rem 0;
}

[data-scope="subtitle"]{
    --text-font-size: 0.85rem;
    --text-font-weight: 400;
    --text-color: var(--color3-200);
    --text-margin: 0;
}
```

---

## 🚀 Success Metrics

### **Architecture Compliance**
- Zero hardcoded values in scopes
- All components use CSS variables
- Proper layer separation maintained
- Grid-first layout approach

### **Code Quality**
- Semantic, descriptive naming
- Comprehensive variable coverage
- Proper fallback chains
- Clean, readable structure

### **Functionality**
- Components work in isolation
- Components compose together
- Responsive behavior
- Accessibility compliance

### **Maintainability**
- Easy to modify and extend
- Clear documentation
- Consistent patterns
- Reusable components

---

## 🌈 Dynamic Color System Implementation

### **Current State vs. Future Vision**

**Current (Temporary):**
- 4 base HSLA colors defined in Layer 1
- 10-shade scales (50-950) for development
- Components reference specific shade numbers

**Future (Target):**
- 4 base HSLA colors modified by presets
- Dynamic color generation based on H, S, L, A modifications
- UI-driven preset management with live preview

### **Implementation Strategy**

1. **Phase 1 (Current)**: Use temporary 10-shade scales for development
2. **Phase 2**: Implement preset system that modifies base HSLA values
3. **Phase 3**: Build UI for managing presets with live preview
4. **Phase 4**: Remove temporary scales, use only dynamic colors

### **Preset Examples**
```css
/* Theme Presets */
[data-preset="vibrant"] {
    --color1: hsla(337, 85%, 52%, 1);  /* Boost saturation */
    --color2: hsla(29, 84%, 53%, 1);
}

[data-preset="dark"] {
    --color1: hsla(337, 35%, 65%, 1);  /* Lighter for dark backgrounds */
    --color2: hsla(29, 44%, 65%, 1);
}

[data-preset="corporate"] {
    --color1: hsla(220, 25%, 45%, 1);  /* Change hue to blue */
    --color2: hsla(200, 30%, 50%, 1);
}
```

### **Benefits**
- **Infinite Variations**: Any color combination possible
- **Consistent Relationships**: Maintain color harmony
- **Live Editing**: Real-time theme modifications
- **Reduced Complexity**: No need for hundreds of shade variables
- **Better Performance**: Fewer CSS variables to process

---

**Remember: The STUDIO 4-Layer Architecture is about creating a composable, variable-driven CSS system that achieves maximum flexibility while maintaining architectural purity. Every decision should support this goal.**
