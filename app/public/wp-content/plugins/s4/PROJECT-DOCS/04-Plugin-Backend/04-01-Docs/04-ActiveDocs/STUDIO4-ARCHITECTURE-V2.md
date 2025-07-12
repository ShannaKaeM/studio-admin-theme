# STUDIO4 Architecture: Version 2.0

**Version:** 2.0  
**Date:** July 11, 2025  
**Status:** ✅ Active Architecture  

## 🎯 Mission Statement

Build a **Preset-Driven Design System** using Atomic Design principles where infinite variations are created through composable presets rather than hardcoded components.

---

## 🏗️ The 4-Layer Architecture (Atomic Design)

```
Layer 1: Brand Variables (Atoms) - 4 Base HSLA Colors + Font Stack
    ↓
Layer 2: Global Elements (Molecules) - .box + .text with ALL variables
    ↓
Layer 3: Global Components (Organisms) - Generic reusable components
    ↓
Layer 4: Project Sections (Templates) - Finished sections with presets
```

---

## 📋 Layer 1: Brand Variables (Atoms)

### **Purpose**
Foundation layer - only 4 base HSLA colors and font stack.

### **Structure**
```css
:root {
    /* 4 Base HSLA Colors - Modified by Presets */
    --color1: hsla(337, 35%, 52%, 1);  /* Primary */
    --color2: hsla(29, 44%, 53%, 1);   /* Secondary */
    --color3: hsla(0, 0%, 46%, 1);     /* Neutral */
    --color4: hsla(0, 0%, 46%, 1);     /* Base */
    
    /* Font Stack */
    --font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### **Rules**
- ✅ **4 Base HSLA Colors ONLY**
- ✅ **Font Stack ONLY**
- ❌ **NEVER add variables here** - All other variables go in Global Elements

---

## 🧩 Layer 2: Global Elements (Molecules)

### **Purpose**
The smallest reusable components containing ALL CSS variables and applied properties.

### **Structure**
```css
.box {
    /* ALL layout, styling, and visual variables */
    --box-display: block;
    --box-background: transparent;
    --box-padding: 0;
    /* ... hundreds of variables ... */
    
    /* Applied Properties */
    display: var(--box-display);
    background: var(--box-background);
    padding: var(--box-padding);
    /* ... all CSS properties ... */
}

.text {
    /* ALL typography, styling, and layout variables */
    --text-font-size: 1rem;
    --text-color: var(--color3);
    --text-font-weight: 400;
    /* ... all text variables ... */
    
    /* Applied Properties */
    font-size: var(--text-font-size);
    color: var(--text-color);
    font-weight: var(--text-font-weight);
    /* ... all CSS properties ... */
}
```

### **Rules**
- ✅ **Predefined and locked** - No editing allowed
- ✅ **Variables + Applied Properties** - Both together
- ✅ **ALL CSS variables defined here** - Nothing added elsewhere
- ❌ **No customization** - These are the molecules

---

## 🎨 Layer 3: Global Components (Organisms)

### **Purpose**
Generic, reusable components that override Global Element variables only.

### **Structure**
```css
[data-scope="card"] {
    --box-layout-display: grid;
    --box-layout-grid-template-areas: "a b";
    --box-layout-grid-template-columns: auto 1fr;
    --box-padding: 1rem;
    --box-background: var(--color3-100);
}

[data-scope="button"] {
    --box-layout-display: inline-flex;
    --box-layout-align-items: center;
    --box-padding: 0.5rem 1rem;
    --text-font-weight: 500;
}
```

### **Rules**
- ✅ **Override variables only** - Never applied properties
- ✅ **Highly generic** - No project specificity
- ✅ **Use data-scope** - Semantic naming
- ✅ **CSS Grid layouts** - Single-letter grid areas (a, b, c, d)
- ❌ **No applied properties** - Only variable overrides

---

## 🧩 Layer 4: Project Sections (Templates)

### **Purpose**
Finished sections that combine multiple components with presets for infinite variations.

### **Structure**
```css
[data-scope="hero"] {
    --box-layout-display: grid;
    --box-layout-grid-template-areas: 
        "a a"
        "b c";
    --box-layout-grid-template-columns: 1fr 1fr;
    --box-padding: 4rem 2rem;
}

[data-scope="dashboard"] {
    --box-layout-display: grid;
    --box-layout-grid-template-areas: 
        "a b b"
        "c d e";
    --box-layout-grid-template-columns: 250px 1fr 1fr;
}
```

### **Rules**
- ✅ **Higher specificity allowed** - Still generic and reusable
- ✅ **Combine multiple components** - Complex layouts
- ✅ **Finished products** - Ready-to-use sections
- ✅ **Preset-driven variations** - One section, infinite looks

---

## 🎨 The Preset System

### **Preset Categories**

#### **1. Color Presets**
```css
/* Base Color Presets */
[data-preset="primary"] { /* Uses --color1 */ }
[data-preset="secondary"] { /* Uses --color2 */ }
[data-preset="neutral"] { /* Uses --color3 */ }

/* Color Modifier Presets */
[data-preset="muted"] {
    --color1: hsla(337, 15%, 52%, 0.7);  /* Reduced saturation & alpha */
    --color2: hsla(29, 14%, 53%, 0.7);
}

[data-preset="vibrant"] {
    --color1: hsla(337, 85%, 52%, 1);  /* Boosted saturation */
    --color2: hsla(29, 84%, 53%, 1);
}
```

#### **2. Typography Hierarchy Presets**
```css
[data-preset="title"] {
    --text-font-size: 2rem;
    --text-font-weight: 600;
    --text-line-height: 1.2;
}

[data-preset="subtitle"] {
    --text-font-size: 1.25rem;
    --text-font-weight: 400;
    --text-line-height: 1.4;
}

[data-preset="body"] {
    --text-font-size: 1rem;
    --text-font-weight: 400;
    --text-line-height: 1.6;
}
```

#### **3. State Presets**
```css
[data-preset="hover"] {
    --box-transform: translateY(-2px);
    --box-box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

[data-preset="active"] {
    --box-border-width: 2px;
    --box-border-style: solid;
}

[data-preset="disabled"] {
    --box-opacity: 0.5;
    --box-pointer-events: none;
}
```

#### **4. Layout Presets**
```css
[data-preset="center"] {
    --box-layout-grid-template-areas: "a";
    --box-layout-justify-items: center;
    --box-layout-align-items: center;
}

[data-preset="split"] {
    --box-layout-grid-template-areas: "a b";
    --box-layout-grid-template-columns: 1fr 1fr;
}

[data-preset="bento"] {
    --box-layout-grid-template-areas: 
        "a b"
        "c c";
    --box-layout-grid-template-columns: 1fr 1fr;
}
```

### **Preset Combination Examples**
```html
<!-- Multiple presets can be combined -->
<section class="box" data-scope="hero" data-preset="center vibrant">
    <h1 class="text" data-preset="title primary">Hero Title</h1>
    <p class="text" data-preset="subtitle muted">Hero subtitle</p>
</section>

<!-- Card with hover state -->
<div class="box" data-scope="card" data-preset="hover">
    <h2 class="text" data-preset="title secondary">Card Title</h2>
</div>
```

---

## 🚀 User Journey Levels

### **Level 1: Brand + Sections (90% of users)**
1. Add brand colors and font
2. Choose from section library (hero, dashboard, etc.)
3. Toggle through preset combinations
4. Done!

### **Level 2: Preset Mixing (8% of users)**
1. Start with Level 1
2. Mix and match individual presets
3. Combine color + layout + typography presets
4. Done!

### **Level 3: Preset Customization (1.9% of users)**
1. Start with Level 2
2. Customize base presets
3. Create custom preset combinations
4. Done!

### **Level 4: Full Customization (0.1% of users)**
1. Build everything from scratch
2. Create new components and sections
3. Define new preset categories
4. Full control!

---

## 🎯 Development Principles

### **Core Rules**
1. **NEVER add to Brand Variables** - Only 4 colors + font
2. **NEVER add to Global Elements** - Predefined and locked
3. **CSS Grid Always** - Grid areas for all layouts
4. **Preset-First Thinking** - Create variations through presets
5. **Consult on Naming** - All scope/preset names approved

### **Quality Checklist**
- [ ] All values use CSS variables from Global Elements
- [ ] Grid areas use single letters (a, b, c, d)
- [ ] Semantic, descriptive naming
- [ ] Components work in isolation
- [ ] Components work with any preset combination
- [ ] Presets can be mixed and matched
- [ ] No hardcoded values in scopes
- [ ] No applied properties in scopes

---

## 🌈 Benefits of This Architecture

### **For Developers**
- **Scalable** - One component, infinite variations
- **Maintainable** - Changes cascade through presets
- **Consistent** - All variations follow same structure
- **Flexible** - Easy to add new presets

### **For End Users**
- **Simple** - Start with sections + presets
- **Powerful** - Deep customization available
- **Visual** - See changes in real-time
- **Non-destructive** - Always can revert to defaults

### **For the System**
- **Performance** - Fewer CSS variables overall
- **Composable** - Everything works together
- **Future-proof** - Easy to extend
- **Brand-consistent** - All variations use brand colors

---

**Remember: This is a preset-driven system where infinite variations are created through composable presets, not hardcoded components.**
