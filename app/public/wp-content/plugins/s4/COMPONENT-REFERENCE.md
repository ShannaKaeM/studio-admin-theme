# S4 Component Reference - Current State

## Overview
This document shows all the components we currently have loaded in our S4 system and how they work.

## Current Architecture Status

### ✅ LAYER 1: Brand Variables (Complete)
- 4 brand colors with full 50-950 scales
- Montserrat font family
- Located in `src/styles/main.css` lines 10-58

### ✅ LAYER 2: Global Elements (Complete)
- `.box` - Universal container element
- `.text` - Universal text element
- All CSS properties available as custom properties

### ❌ LAYER 3: Scopes (Not Implemented)
- No semantic components like `.card`, `.hero`, `.sidebar`

### ❌ LAYER 4: Helpers (Not Implemented)
- No state modifiers like `.dark`, `.active`, `.holiday`

---

## Current Components (7 Total)

These are defined in `src/hooks/useThemeConfig.js` lines 66-117:

### 1. theme-builder
**Purpose**: Main container for the theme builder interface
```css
--box-background: var(--color3-950)
--box-border: 1px solid var(--color3-800)
--box-padding: 1.5rem
--text-color: var(--color4-100)
```

**HTML Usage**:
```jsx
<div className="box" style={getComponentStyles('theme-builder')}>
  <span className="text" style={{"--text-color": "inherit"}}>
    Theme Builder Content
  </span>
</div>
```

### 2. nav-tab
**Purpose**: Navigation tab buttons (inactive state)
```css
--box-background: var(--color3-900)
--box-border: 1px solid var(--color3-700)
--box-padding: 0.75rem 1rem
--text-color: var(--color4-300)
--text-font-weight: 500
```

**HTML Usage**:
```jsx
<button className="box text" style={getComponentStyles('nav-tab')}>
  Dashboard
</button>
```

### 3. nav-tab-active
**Purpose**: Navigation tab buttons (active state)
```css
--box-background: var(--color1-500)
--text-color: var(--color4-50)
--box-border: 1px solid var(--color1-400)
```

**HTML Usage**:
```jsx
<button className="box text" style={getComponentStyles('nav-tab-active')}>
  Components
</button>
```

### 4. color-card
**Purpose**: Color preview cards for displaying brand colors
```css
--box-background: var(--color3-900)
--box-border: 1px solid var(--color3-700)
--box-padding: 1rem
--box-border-radius: 0.5rem
--text-color: var(--color4-200)
```

**HTML Usage**:
```jsx
<div className="box" style={getComponentStyles('color-card')}>
  <span className="text" style={{"--text-color": "inherit"}}>
    Color Card Content
  </span>
</div>
```

### 5. input-field
**Purpose**: Form input fields
```css
--box-background: var(--color3-800)
--box-border: 1px solid var(--color3-600)
--box-padding: 0.5rem 0.75rem
--box-border-radius: 0.25rem
--text-color: var(--color4-100)
--text-font-size: 0.875rem
```

**HTML Usage**:
```jsx
<input 
  className="box text" 
  style={getComponentStyles('input-field')}
  type="text" 
  placeholder="Enter value..."
/>
```

### 6. button-primary
**Purpose**: Primary action buttons
```css
--box-background: var(--color1-500)
--box-border: 1px solid var(--color1-400)
--box-padding: 0.75rem 1.5rem
--box-border-radius: 0.375rem
--text-color: var(--color4-50)
--text-font-weight: 600
```

**HTML Usage**:
```jsx
<button className="box text" style={getComponentStyles('button-primary')}>
  Save Changes
</button>
```

### 7. button-secondary
**Purpose**: Secondary action buttons
```css
--box-background: var(--color3-700)
--box-border: 1px solid var(--color3-600)
--box-padding: 0.75rem 1.5rem
--box-border-radius: 0.375rem
--text-color: var(--color4-200)
--text-font-weight: 500
```

**HTML Usage**:
```jsx
<button className="box text" style={getComponentStyles('button-secondary')}>
  Cancel
</button>
```

---

## How Our System Works

### 1. Component Definition
Components are defined as JSON objects with CSS custom properties:
```javascript
"button-primary": {
  "--box-background": "var(--color1-500)",
  "--box-border": "1px solid var(--color1-400)",
  "--box-padding": "0.75rem 1.5rem",
  // ... more properties
}
```

### 2. Component Usage
Components are used by applying styles to `.box` and `.text` elements:
```jsx
const styles = getComponentStyles('button-primary');
<button className="box text" style={styles}>
  Click Me
</button>
```

### 3. Real-time Editing
The ComponentVariablesTable allows editing these properties in real-time:
- Changes update the JSON configuration
- CSS custom properties are immediately applied
- No page refresh needed

### 4. Current Interface Structure
Our S4ThemeBuilder uses these components:
- **Sidebar sections**: Use hover states and active borders
- **Header buttons**: Use button-secondary styling
- **Content areas**: Use theme-builder container styling
- **All styling**: Pure CSS custom properties, no hardcoded values

---

## Key Insights

### What We Have:
- ✅ 7 functional UI components for admin interface
- ✅ Real-time editing system
- ✅ Pure CSS custom property architecture
- ✅ Beautiful dark theme with S4 brand colors

### What We're Missing:
- ❌ Semantic component scopes (Layer 3)
- ❌ State helpers (Layer 4)
- ❌ More diverse component types (forms, cards, layouts)

### Next Steps Options:
1. **Add more admin UI components** (forms, modals, tables)
2. **Implement Layer 3 scopes** for semantic components
3. **Build preset system** for quick theme switching
4. **Enhance current components** with more properties

---

## Questions for Discussion:
1. Should we add more admin UI components first?
2. Do you want to implement Layer 3 scopes next?
3. Are these 7 components sufficient for a basic admin interface?
4. What specific functionality do you want to add to the theme builder?
