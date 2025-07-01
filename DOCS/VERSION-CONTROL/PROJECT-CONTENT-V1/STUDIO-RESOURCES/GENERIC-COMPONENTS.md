# The Studio - Generic Components Reference

**Created**: June 28, 2025  
**Status**: 🎯 Complete Component Library  
**Purpose**: Comprehensive reference for all generic components based on Daniel's proven theme architecture

---

## 🎯 **COMPONENT PHILOSOPHY**

### **Generic First Approach**
All components are designed to be:
- **Context Agnostic**: Work in any layout or situation
- **Scope Ready**: Modified by layout scopes (`.hero`, `.card`, `.sidebar`)
- **Helper Compatible**: Enhanced by brand scopes (`.holiday`, `.luxury`)
- **Mathematically Consistent**: All values derived from Studio's base calculations

### **Component Architecture**
```
Studio Base Values → Daniel's Component Structure → Scope Modifications → Final Output
```

---

## 📝 **TEXT COMPONENTS**

### **Typography Hierarchy**
Based on Daniel's typography system (lines 21-81) and prose styling (lines 467-883)

```javascript
textComponents: {
  pretitle: {
    // Studio Integration
    preset: 'text-xs',           // Maps to Daniel's --text-xs: 0.75rem
    weight: 'font-weight-semibold', // Maps to Daniel's --font-weight-semibold: 600
    color: 'color-primary',      // Maps to Daniel's --color-primary: hsl(var(--primary))
    
    // CSS Output
    fontSize: 'var(--text-xs)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-primary)',
    margin: '0 0 var(--space-2) 0',
    lineHeight: 'var(--leading-normal)',
    letterSpacing: 'var(--tracking-wide)'
  },

  title: {
    // Studio Integration  
    preset: 'text-5xl',          // Maps to Daniel's --text-5xl: 3rem
    weight: 'font-weight-bold',  // Maps to Daniel's --font-weight-bold: 700
    color: 'color-base-content', // Maps to Daniel's --color-base-content: hsl(var(--foreground))
    
    // CSS Output
    fontSize: 'var(--text-5xl)',
    fontWeight: 'var(--font-weight-bold)',
    color: 'var(--color-base-content)',
    margin: '0 0 var(--space-5) 0',
    lineHeight: 'var(--leading-tight)',
    letterSpacing: 'var(--tracking-tight)'
  },

  subtitle: {
    // Studio Integration
    preset: 'text-2xl',          // Maps to Daniel's --text-2xl: 1.5rem
    weight: 'font-weight-semibold',
    color: 'color-neutral-content', // Maps to Daniel's --color-neutral-content: hsl(var(--muted-foreground))
    
    // CSS Output
    fontSize: 'var(--text-2xl)',
    fontWeight: 'var(--font-weight-semibold)',
    color: 'var(--color-neutral-content)',
    margin: 'var(--space-6) 0 var(--space-4) 0',
    lineHeight: 'var(--leading-snug)',
    letterSpacing: 'var(--tracking-normal)'
  },

  subhead: {
    // Studio Integration
    preset: 'text-xl',           // Maps to Daniel's --text-xl: 1.25rem
    weight: 'font-weight-medium',
    color: 'color-base-content',
    
    // CSS Output
    fontSize: 'var(--text-xl)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-base-content)',
    margin: 'var(--space-4) 0 var(--space-3) 0',
    lineHeight: 'var(--leading-snug)'
  },

  lead: {
    // Studio Integration (Based on Daniel's .lead - lines 949-961)
    preset: 'text-xl',           // Maps to Daniel's --text-xl: 1.25rem
    weight: 'font-weight-normal',
    color: 'color-neutral-content',
    
    // CSS Output  
    fontSize: 'var(--text-xl)',
    fontWeight: 'var(--font-weight-normal)',
    color: 'var(--color-neutral-content)',
    margin: '0 0 var(--space-6) 0',
    lineHeight: 'var(--leading-normal)'
  },

  body: {
    // Studio Integration
    preset: 'text-base',         // Maps to Daniel's --text-base: 1rem
    weight: 'font-weight-normal',
    color: 'color-base-content',
    
    // CSS Output
    fontSize: 'var(--text-base)',
    fontWeight: 'var(--font-weight-normal)',
    color: 'var(--color-base-content)',
    margin: '0 0 var(--space-4) 0',
    lineHeight: 'var(--leading-normal)'
  },

  caption: {
    // Studio Integration
    preset: 'text-sm',           // Maps to Daniel's --text-sm: 0.875rem
    weight: 'font-weight-normal',
    color: 'color-neutral-content',
    
    // CSS Output
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--font-weight-normal)',
    color: 'var(--color-neutral-content)',
    margin: '0',
    lineHeight: 'var(--leading-normal)'
  },

  label: {
    // Studio Integration
    preset: 'text-sm',
    weight: 'font-weight-medium',
    color: 'color-base-content',
    
    // CSS Output
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--font-weight-medium)',
    color: 'var(--color-base-content)',
    margin: '0 0 var(--space-2) 0',
    lineHeight: 'var(--leading-tight)'
  },

  meta: {
    // Studio Integration
    preset: 'text-xs',
    weight: 'font-weight-normal',
    color: 'color-neutral-content',
    
    // CSS Output
    fontSize: 'var(--text-xs)',
    fontWeight: 'var(--font-weight-normal)',
    color: 'var(--color-neutral-content)',
    margin: '0',
    lineHeight: 'var(--leading-tight)',
    letterSpacing: 'var(--tracking-wide)'
  }
}
```

---

## 🏗️ **LAYOUT COMPONENTS**

### **Core Structure Components**
Based on Daniel's base component classes (lines 884-1760)

```javascript
layoutComponents: {
  wrapper: {
    // Studio Integration (Based on Daniel's .wrapper - lines 887-904)
    maxWidth: 'container-9xl',    // Maps to Daniel's --container-9xl: 96rem
    padding: 'space-fluid-md',    // Maps to Daniel's --space-fluid-md: clamp(1.5rem, 3vw, 2rem)
    
    // CSS Variables
    '--wrapper-max-width': 'var(--container-9xl)',
    '--wrapper-padding': 'var(--space-fluid-md)',
    '--wrapper-background': 'white',
    '--wrapper-margin': '0 auto',
    '--wrapper-border-radius': '0',
    '--wrapper-border': 'none',
    '--wrapper-shadow': 'none',
    
    // CSS Output
    maxWidth: 'var(--wrapper-max-width)',
    padding: 'var(--wrapper-padding)',
    background: 'var(--wrapper-background)',
    margin: 'var(--wrapper-margin)',
    borderRadius: 'var(--wrapper-border-radius)',
    border: 'var(--wrapper-border)',
    boxShadow: 'var(--wrapper-shadow)'
  },

  section: {
    // Studio Integration (Based on Daniel's .section - lines 1436-1445)
    margin: 'space-section',      // Maps to Daniel's semantic spacing
    gap: 'space-element',
    
    // CSS Variables
    '--section-margin': '0 0 var(--space-section) 0',
    '--section-gap': 'var(--space-element)',
    
    // CSS Output
    margin: 'var(--section-margin)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--section-gap)'
  },

  card: {
    // Studio Integration (Based on Daniel's .card - lines 1398-1417)
    padding: 'space-component',
    borderRadius: 'radius-lg',
    
    // CSS Variables
    '--card-background': 'transparent',
    '--card-border': 'none',
    '--card-border-radius': '0',
    '--card-padding': '0',
    '--card-shadow': 'none',
    '--card-margin': 'var(--space-6) 0',
    '--card-gap': 'var(--space-element)',
    
    // CSS Output
    background: 'var(--card-background)',
    border: 'var(--card-border)',
    borderRadius: 'var(--card-border-radius)',
    padding: 'var(--card-padding)',
    boxShadow: 'var(--card-shadow)',
    margin: 'var(--card-margin)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--card-gap)'
  },

  grid: {
    // Studio Integration (Based on Daniel's .grid system - lines 1180-1396)
    columns: 'grid-columns',
    gap: 'space-6',
    
    // CSS Variables
    '--grid-columns': 'repeat(auto-fit, minmax(var(--container-md), 1fr))',
    '--grid-gap': 'var(--space-6)',
    '--grid-margin': 'var(--space-6) 0',
    
    // CSS Output
    display: 'grid',
    gridTemplateColumns: 'var(--grid-columns)',
    gap: 'var(--grid-gap)',
    margin: 'var(--grid-margin)'
  },

  actions: {
    // Studio Integration (Based on Daniel's .actions - lines 1419-1434)
    gap: 'space-4',
    
    // CSS Variables
    '--actions-display': 'flex',
    '--actions-gap': 'var(--space-4)',
    '--actions-flex-wrap': 'wrap',
    '--actions-justify': 'flex-start',
    '--actions-align': 'center',
    '--actions-margin': 'var(--space-6) 0 0 0',
    
    // CSS Output
    display: 'var(--actions-display)',
    gap: 'var(--actions-gap)',
    flexWrap: 'var(--actions-flex-wrap)',
    justifyContent: 'var(--actions-justify)',
    alignItems: 'var(--actions-align)',
    margin: 'var(--actions-margin)'
  }
}
```

---

## 🎛️ **INTERACTIVE COMPONENTS**

### **Form and UI Elements**
Based on Daniel's interactive components

```javascript
interactiveComponents: {
  button: {
    // Studio Integration (Based on Daniel's .btn - lines 975-1160)
    padding: 'space-2 space-6',
    borderRadius: 'radius-md',
    
    // CSS Variables
    '--btn-background': 'hsl(var(--primary))',
    '--btn-color': 'hsl(var(--primary-foreground))',
    '--btn-padding': 'var(--space-2) var(--space-6)',
    '--btn-border': '1px solid transparent',
    '--btn-border-radius': 'var(--radius-md)',
    '--btn-font-size': 'var(--text-sm)',
    '--btn-font-weight': 'var(--font-weight-medium)',
    '--btn-line-height': '1',
    '--btn-transition': 'all var(--default-transition-duration)',
    '--btn-cursor': 'pointer',
    '--btn-display': 'inline-flex',
    '--btn-align': 'center',
    '--btn-justify': 'center',
    '--btn-gap': 'var(--space-2)',
    '--btn-height': '40px',
    '--btn-min-width': 'auto',
    '--btn-shadow': 'none',
    
    // CSS Output
    background: 'var(--btn-background)',
    color: 'var(--btn-color)',
    padding: 'var(--btn-padding)',
    border: 'var(--btn-border)',
    borderRadius: 'var(--btn-border-radius)',
    fontSize: 'var(--btn-font-size)',
    fontWeight: 'var(--btn-font-weight)',
    fontFamily: 'inherit',
    lineHeight: 'var(--btn-line-height)',
    transition: 'var(--btn-transition)',
    cursor: 'var(--btn-cursor)',
    display: 'var(--btn-display)',
    alignItems: 'var(--btn-align)',
    justifyContent: 'var(--btn-justify)',
    gap: 'var(--btn-gap)',
    textDecoration: 'none',
    margin: '0',
    height: 'var(--btn-height)',
    minWidth: 'var(--btn-min-width)',
    boxShadow: 'var(--btn-shadow)'
  },

  input: {
    // Studio Integration
    padding: 'space-3',
    borderRadius: 'radius-md',
    border: 'border',
    
    // CSS Variables
    '--input-background': 'hsl(var(--background))',
    '--input-border': '1px solid hsl(var(--border))',
    '--input-border-radius': 'var(--radius-md)',
    '--input-padding': 'var(--space-3)',
    '--input-font-size': 'var(--text-sm)',
    '--input-color': 'hsl(var(--foreground))',
    '--input-transition': 'all var(--default-transition-duration)',
    
    // CSS Output
    background: 'var(--input-background)',
    border: 'var(--input-border)',
    borderRadius: 'var(--input-border-radius)',
    padding: 'var(--input-padding)',
    fontSize: 'var(--input-font-size)',
    color: 'var(--input-color)',
    transition: 'var(--input-transition)',
    outline: 'none',
    width: '100%'
  }
}
```

---

## 🧩 **ADVANCED COMPONENTS**

### **Complex UI Patterns**
Based on Daniel's advanced component system

```javascript
advancedComponents: {
  accordion: {
    // Studio Integration (Based on Daniel's .accordion - lines 1447-1546)
    // CSS Variables
    '--accordion-background': 'transparent',
    '--accordion-gap': '0',
    
    // CSS Output
    background: 'var(--accordion-background)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--accordion-gap)'
  },

  accordionItem: {
    // CSS Variables
    '--accordion-item-border-bottom': '1px solid hsl(var(--border))',
    '--accordion-item-background': 'transparent',
    
    // CSS Output
    borderBottom: 'var(--accordion-item-border-bottom)',
    background: 'var(--accordion-item-background)'
  },

  accordionTrigger: {
    // CSS Variables
    '--trigger-background': 'transparent',
    '--trigger-color': 'hsl(var(--foreground))',
    '--trigger-padding': 'var(--space-4) 0',
    '--trigger-border': 'none',
    '--trigger-font-size': 'var(--text-lg)',
    '--trigger-font-weight': 'var(--font-weight-normal)',
    '--trigger-cursor': 'pointer',
    '--trigger-transition': 'all var(--default-transition-duration)',
    '--trigger-width': '100%',
    '--trigger-display': 'flex',
    '--trigger-justify': 'space-between',
    '--trigger-align': 'center',
    
    // CSS Output
    background: 'var(--trigger-background)',
    color: 'var(--trigger-color)',
    padding: 'var(--trigger-padding)',
    border: 'var(--trigger-border)',
    fontSize: 'var(--trigger-font-size)',
    fontWeight: 'var(--trigger-font-weight)',
    fontFamily: 'inherit',
    cursor: 'var(--trigger-cursor)',
    transition: 'var(--trigger-transition)',
    textAlign: 'left',
    width: 'var(--trigger-width)',
    display: 'var(--trigger-display)',
    justifyContent: 'var(--trigger-justify)',
    alignItems: 'var(--trigger-align)'
  },

  tabs: {
    // Studio Integration (Based on Daniel's .tabs - lines 1548-1646)
    // CSS Variables
    '--tabs-background': 'transparent',
    '--tabs-width': '100%',
    
    // CSS Output
    background: 'var(--tabs-background)',
    width: 'var(--tabs-width)'
  },

  tabsList: {
    // CSS Variables
    '--tabs-list-display': 'inline-flex',
    '--tabs-list-background': 'hsl(var(--muted))',
    '--tabs-list-border-radius': 'var(--radius-md)',
    '--tabs-list-padding': 'var(--space-1)',
    '--tabs-list-gap': '0',
    '--tabs-list-margin': '0 0 var(--space-6) 0',
    '--tabs-list-height': '40px',
    '--tabs-list-align': 'center',
    '--tabs-list-justify': 'start',
    
    // CSS Output
    display: 'var(--tabs-list-display)',
    background: 'var(--tabs-list-background)',
    borderRadius: 'var(--tabs-list-border-radius)',
    padding: 'var(--tabs-list-padding)',
    gap: 'var(--tabs-list-gap)',
    margin: 'var(--tabs-list-margin)',
    listStyle: 'none',
    height: 'var(--tabs-list-height)',
    alignItems: 'var(--tabs-list-align)',
    justifyContent: 'var(--tabs-list-justify)'
  },

  tabsTrigger: {
    // CSS Variables
    '--tab-background': 'transparent',
    '--tab-color': 'hsl(var(--muted-foreground))',
    '--tab-padding': 'var(--space-2) var(--space-3)',
    '--tab-border': 'none',
    '--tab-border-radius': 'var(--radius-sm)',
    '--tab-font-size': 'var(--text-sm)',
    '--tab-font-weight': 'var(--font-weight-medium)',
    '--tab-cursor': 'pointer',
    '--tab-transition': 'all var(--default-transition-duration)',
    '--tab-display': 'inline-flex',
    '--tab-align': 'center',
    '--tab-justify': 'center',
    '--tab-height': '32px',
    '--tab-min-width': '80px',
    
    // CSS Output
    background: 'var(--tab-background)',
    color: 'var(--tab-color)',
    padding: 'var(--tab-padding)',
    border: 'var(--tab-border)',
    borderRadius: 'var(--tab-border-radius)',
    fontSize: 'var(--tab-font-size)',
    fontWeight: 'var(--tab-font-weight)',
    fontFamily: 'inherit',
    cursor: 'var(--tab-cursor)',
    transition: 'var(--tab-transition)',
    textDecoration: 'none',
    display: 'var(--tab-display)',
    alignItems: 'var(--tab-align)',
    justifyContent: 'var(--tab-justify)',
    height: 'var(--tab-height)',
    minWidth: 'var(--tab-min-width)'
  },

  alert: {
    // Studio Integration (Based on Daniel's .alert - lines 1648-1758)
    padding: 'space-4',
    borderRadius: 'radius-md',
    
    // CSS Variables
    '--alert-background': 'hsl(var(--card))',
    '--alert-border': '1px solid hsl(var(--border))',
    '--alert-border-radius': 'var(--radius-md)',
    '--alert-padding': 'var(--space-4)',
    '--alert-gap': 'var(--space-3)',
    '--alert-color': 'hsl(var(--card-foreground))',
    
    // CSS Output
    background: 'var(--alert-background)',
    border: 'var(--alert-border)',
    borderRadius: 'var(--alert-border-radius)',
    padding: 'var(--alert-padding)',
    display: 'flex',
    gap: 'var(--alert-gap)',
    alignItems: 'flex-start',
    color: 'var(--alert-color)'
  }
}
```

---

## 📏 **RESPONSIVE GRID SYSTEM**

### **Grid Variants**
Based on Daniel's comprehensive grid system (lines 1180-1396)

```javascript
gridComponents: {
  // Base Grid Classes (1-6 columns)
  'grid-1': {
    '--grid-columns': '1fr',
    '--grid-gap': 'var(--space-6)',
    '--grid-margin': 'var(--space-6) 0'
  },

  'grid-2': {
    '--grid-columns': 'repeat(2, 1fr)',
    '--grid-gap': 'var(--space-6)',
    '--grid-margin': 'var(--space-6) 0'
  },

  'grid-3': {
    '--grid-columns': 'repeat(3, 1fr)',
    '--grid-gap': 'var(--space-6)',
    '--grid-margin': 'var(--space-6) 0'
  },

  'grid-4': {
    '--grid-columns': 'repeat(4, 1fr)',
    '--grid-gap': 'var(--space-6)',
    '--grid-margin': 'var(--space-6) 0'
  },

  'grid-5': {
    '--grid-columns': 'repeat(5, 1fr)',
    '--grid-gap': 'var(--space-6)',
    '--grid-margin': 'var(--space-6) 0'
  },

  'grid-6': {
    '--grid-columns': 'repeat(6, 1fr)',
    '--grid-gap': 'var(--space-6)',
    '--grid-margin': 'var(--space-6) 0'
  },

  // Responsive Grid Classes (Desktop > Tablet > Mobile)
  'grid-6-3-2': {
    '--grid-columns': 'repeat(6, 1fr)',
    '@media (max-width: 64rem)': {
      '--grid-columns': 'repeat(3, 1fr)'
    },
    '@media (max-width: 48rem)': {
      '--grid-columns': 'repeat(2, 1fr)'
    }
  },

  'grid-4-2-1': {
    '--grid-columns': 'repeat(4, 1fr)',
    '@media (max-width: 64rem)': {
      '--grid-columns': 'repeat(2, 1fr)'
    },
    '@media (max-width: 48rem)': {
      '--grid-columns': '1fr'
    }
  },

  'grid-3-2-1': {
    '--grid-columns': 'repeat(3, 1fr)',
    '@media (max-width: 64rem)': {
      '--grid-columns': 'repeat(2, 1fr)'
    },
    '@media (max-width: 48rem)': {
      '--grid-columns': '1fr'
    }
  }
}
```

---

## 🎨 **SCOPE INTEGRATION EXAMPLES**

### **How Scopes Modify Generic Components**

```css
/* Generic Component Base */
.title {
  font-size: var(--title-size);
  color: var(--title-color);
  margin: var(--title-margin);
}

/* Layout Scope Modifications */
[data-component="hero"] .title {
  --title-size: calc(var(--studio-text-lg) * 2.5);
  --title-color: var(--studio-primary);
  --title-margin: 0 0 var(--studio-space-8) 0;
}

[data-component="card"] .title {
  --title-size: calc(var(--studio-text-lg) * 0.8);
  --title-color: var(--studio-foreground);
  --title-margin: 0 0 var(--studio-space-4) 0;
}

[data-component="sidebar"] .title {
  --title-size: var(--studio-text-base);
  --title-color: var(--studio-muted);
  --title-margin: 0 0 var(--studio-space-2) 0;
}

/* Helper Scope Modifications */
.holiday .title {
  --title-color: var(--holiday-accent);
}

.luxury .title {
  --title-color: var(--luxury-gold);
  font-weight: var(--font-weight-bold);
}

.minimal .title {
  --title-color: var(--neutral-900);
  font-weight: var(--font-weight-light);
}
```

---

## 📊 **COMPONENT USAGE MATRIX**

### **Component × Scope Compatibility**

| Component | Hero | Card | Sidebar | Modal | Form |
|-----------|------|------|---------|-------|------|
| title     | ✅   | ✅   | ✅      | ✅    | ✅   |
| subtitle  | ✅   | ✅   | ✅      | ✅    | ❌   |
| body      | ✅   | ✅   | ✅      | ✅    | ✅   |
| button    | ✅   | ✅   | ❌      | ✅    | ✅   |
| wrapper   | ✅   | ✅   | ✅      | ✅    | ✅   |
| section   | ✅   | ✅   | ✅      | ✅    | ✅   |
| grid      | ✅   | ✅   | ❌      | ❌    | ❌   |
| actions   | ✅   | ✅   | ✅      | ✅    | ✅   |

### **Helper Scope Compatibility**

| Component | Holiday | Luxury | Minimal | Playful |
|-----------|---------|--------|---------|---------|
| title     | ✅      | ✅     | ✅      | ✅      |
| button    | ✅      | ✅     | ✅      | ✅      |
| card      | ✅      | ✅     | ✅      | ✅      |
| wrapper   | ✅      | ✅     | ✅      | ✅      |

---

## 🎯 **IMPLEMENTATION STRATEGY**

### **Studio's Component Generation Process**

1. **User Sets Base Styles**: Colors, typography, spacing foundations
2. **Presets Created**: Mathematical scales and variations generated
3. **Components Built**: Generic components using presets
4. **Scopes Applied**: Context-aware modifications for different layouts
5. **CSS Output**: Clean, minimal variables with Daniel's proven structure

### **Integration with Daniel's Theme**

```css
/* Studio provides the variables */
:root {
  --studio-primary: hsl(200 50% 50%);
  --studio-text-lg: 1.5rem;
  --studio-space-4: 1rem;
}

/* Daniel's structure uses Studio's variables */
.title {
  --title-size: var(--studio-text-lg);
  --title-color: var(--studio-primary);
  --title-margin: 0 0 var(--studio-space-4) 0;
  
  /* Daniel's proven CSS */
  font-size: var(--title-size);
  color: var(--title-color);
  margin: var(--title-margin);
  line-height: var(--leading-tight);
}
```

### **Benefits of This Approach**

- ✅ **Proven Architecture**: Built on Daniel's 1,760+ lines of tested CSS
- ✅ **Visual Management**: Studio provides UI for Daniel's variables
- ✅ **Mathematical Consistency**: All values derive from base calculations
- ✅ **Scope Ready**: Components designed for context modifications
- ✅ **Professional Output**: Clean, maintainable CSS structure

---

**🚀 This component library provides the complete foundation for The Studio's visual design system, combining Studio's mathematical consistency with Daniel's proven component architecture.**