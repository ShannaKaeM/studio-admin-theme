# 05 - TAILWIND V4 STYLING REFACTOR

**The Studio WordPress Design System Plugin**

**Document Hierarchy**: Master Document (Read-Only)  
**Created**: July 5, 2025  
**Status**: 🎯 Tailwind v4 Migration Guide  
**Purpose**: Complete refactor plan from 4-tier CSS to Tailwind v4 utilities

---

## 📚 **DOCUMENT HIERARCHY**

**Master Documents (Read-Only)**:
- `01-ALWAYS-RULES.md` - Core universal AI assistant guidelines
- `02-PROJECT-ARCHITECTURE.md` - Complete project vision, core architecture
- `03-TECHNICAL-SETUP.md` - Development setup, build system
- `04-STYLING-SYSTEM.md` - Current 4-tier CSS architecture
- `05-TW-STYLE.md` - This document: Tailwind v4 refactor plan

---

## 🎯 **REFACTOR OVERVIEW**

### **Current System → Tailwind v4**
- **FROM**: Complex 4-tier scoped CSS (`.card.projects.dashboard`)
- **TO**: Simple Tailwind utilities (`bg-studio-card p-studio-4`)
- **PRESERVE**: Design tokens and Studio branding
- **SIMPLIFY**: Component styling and maintenance

### **Why Tailwind v4?**
1. **No config file** - Automatic utility generation
2. **CSS variables** - Direct integration with `@theme`
3. **Faster development** - Inline utility classes
4. **Better DX** - VS Code IntelliSense support
5. **Smaller builds** - Only used utilities included

---

## 🏗️ **PHASE 1: FOUNDATION SETUP**

### **1.1 Update global.css with @theme**
```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* ===== COLORS ===== */
  /* Brand Colors */
  --color-studio-primary: rgb(39, 104, 96);
  --color-studio-secondary: rgb(112, 153, 51);
  
  /* Base Colors (Neutrals) */
  --color-studio-base-50: #ffffff;
  --color-studio-base-100: #f8f8f8;
  --color-studio-base-200: #e8e8e8;
  --color-studio-base-300: #d1d1d1;
  --color-studio-base-400: #a0a0a0;
  --color-studio-base-500: #737373;
  --color-studio-base-600: #525252;
  --color-studio-base-700: #404040;
  --color-studio-base-800: #262626;
  --color-studio-base-900: #171717;
  --color-studio-base-950: #000000;
  
  /* Semantic Colors (reference existing CSS vars) */
  --color-studio-bg-main: var(--studio-bg-main);
  --color-studio-bg-sidebar: var(--studio-bg-sidebar);
  --color-studio-bg-card: var(--studio-bg-card);
  --color-studio-text-content: var(--studio-text-content);
  --color-studio-text-supporting: var(--studio-text-supporting);
  --color-studio-border-ui: var(--studio-border-ui);
  
  /* ===== SPACING ===== */
  --spacing-studio-1: 0.25rem;   /* 4px */
  --spacing-studio-2: 0.5rem;    /* 8px */
  --spacing-studio-3: 0.75rem;   /* 12px */
  --spacing-studio-4: 1rem;      /* 16px */
  --spacing-studio-5: 2rem;      /* 32px */
  --spacing-studio-6: 3rem;      /* 48px */
  
  /* ===== TYPOGRAPHY ===== */
  --font-size-studio-meta: 0.75rem;      /* 12px */
  --font-size-studio-ui: 0.875rem;       /* 14px */
  --font-size-studio-body: 1rem;         /* 16px */
  --font-size-studio-card: 1.125rem;     /* 18px */
  --font-size-studio-section: 1.25rem;   /* 20px */
  --font-size-studio-page: 1.875rem;     /* 30px */
  
  /* ===== BORDER RADIUS ===== */
  --radius-studio-sm: 0.25rem;
  --radius-studio-md: 0.5rem;
  --radius-studio-lg: 0.75rem;
  --radius-studio-xl: 1rem;
  --radius-studio-2xl: 1.5rem;
  
  /* ===== BORDER WIDTH ===== */
  --width-studio-thin: 1px;
  --width-studio-thick: 2px;
}

/* Keep existing CSS variables for backward compatibility */
/* They can be gradually removed as components are refactored */
```

### **1.2 Generated Utilities**
Tailwind v4 automatically creates:
- `bg-studio-primary`, `text-studio-primary`
- `p-studio-4`, `m-studio-4`, `gap-studio-4`
- `text-studio-meta`, `text-studio-ui`
- `rounded-studio-xl`, `rounded-studio-2xl`
- `border-studio-thin`, `border-studio-thick`

---

## 🔄 **PHASE 2: COMPONENT MIGRATION**

### **2.1 Migration Pattern**
```jsx
// BEFORE: Complex scoped CSS
<div className="card projects dashboard">
  <h3 className="card-title">Project Name</h3>
</div>

// AFTER: Tailwind utilities
<div className="bg-studio-bg-card border border-studio-border-ui 
              rounded-studio-xl p-studio-4 hover:shadow-lg transition-all">
  <h3 className="text-studio-card font-semibold text-studio-text-content">
    Project Name
  </h3>
</div>
```

### **2.2 Component Library Approach**
```tsx
// src/components/ui/StudioCard.tsx
interface StudioCardProps {
  variant?: 'default' | 'project' | 'add-new';
  children: React.ReactNode;
  className?: string;
}

export const StudioCard: React.FC<StudioCardProps> = ({ 
  variant = 'default', 
  children, 
  className = '' 
}) => {
  const baseClasses = `
    bg-studio-bg-card 
    border border-studio-border-ui 
    rounded-studio-xl 
    p-studio-4 
    transition-all
  `;
  
  const variants = {
    default: 'hover:shadow-md',
    project: 'hover:shadow-lg hover:border-studio-primary',
    'add-new': 'border-dashed opacity-60 hover:opacity-100 cursor-pointer'
  };
  
  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};
```

---

## 📋 **PHASE 3: REFACTOR CHECKLIST**

### **3.1 Components Priority Order**
1. **Buttons** - Simplest to refactor
2. **Cards** - Most reused component
3. **Navigation** - Sidebar and nav items
4. **Forms** - Input fields and controls
5. **Layout** - Grid and flex containers
6. **Pages** - Full page compositions

### **3.2 Refactor Steps Per Component**
- [ ] Identify all CSS classes used
- [ ] Map to Tailwind utilities
- [ ] Create reusable component if needed
- [ ] Update all instances
- [ ] Remove old CSS
- [ ] Test thoroughly

---

## 🚀 **PHASE 4: OPTIMIZATION**

### **4.1 Remove Styled Components**
```tsx
// BEFORE: styled-components
const StudioButton = styled.button`
  background: var(--studio-primary-500);
  padding: var(--studio-space-2) var(--studio-space-4);
`;

// AFTER: Tailwind component
const StudioButton = ({ children, ...props }) => (
  <button 
    className="bg-studio-primary text-white px-studio-4 py-studio-2 
               rounded-studio-md hover:opacity-90 transition-opacity"
    {...props}
  >
    {children}
  </button>
);
```

### **4.2 Clean Up global.css**
- Remove component-specific CSS
- Keep only CSS variables
- Remove scoped selectors
- Maintain theme switching logic

---

## 🎯 **PHASE 5: BEST PRACTICES**

### **5.1 Naming Conventions**
```jsx
// Component files
StudioCard.tsx      // Not: Card.tsx
StudioButton.tsx    // Not: Button.tsx

// Utility classes
bg-studio-primary   // Not: bg-primary
p-studio-4          // Not: p-4
```

### **5.2 Composition Patterns**
```jsx
// Combine base + modifiers
<div className={cn(
  "bg-studio-bg-card p-studio-4",      // Base
  "hover:shadow-lg",                    // Interaction
  isActive && "ring-2 ring-studio-primary", // State
  className                             // Props
)}>
```

### **5.3 Responsive Design**
```jsx
// Mobile-first approach
<div className="p-studio-2 md:p-studio-4 lg:p-studio-6">
  <h1 className="text-studio-section md:text-studio-page">
    Title
  </h1>
</div>
```

---

## ⚡ **QUICK REFERENCE**

### **Common Conversions**
```css
/* CSS Variable → Tailwind Utility */
var(--studio-space-4)     → p-studio-4, m-studio-4
var(--studio-primary-500) → bg-studio-primary, text-studio-primary
var(--studio-radius-xl)   → rounded-studio-xl
var(--studio-bg-card)     → bg-studio-bg-card
```

### **Utility Patterns**
```jsx
// Spacing
p-studio-4      // padding: 1rem
mx-studio-2     // margin: 0 0.5rem
gap-studio-3    // gap: 0.75rem

// Colors
bg-studio-primary      // background: rgb(39, 104, 96)
text-studio-secondary  // color: rgb(112, 153, 51)
border-studio-border-ui // border-color: var(--studio-border-ui)

// Typography
text-studio-page    // font-size: 1.875rem
text-studio-body    // font-size: 1rem
font-semibold       // font-weight: 600
```

---

## 📊 **MIGRATION TRACKING**

### **Component Status**
- [ ] Buttons
- [ ] Cards
- [ ] Sidebar
- [ ] Navigation
- [ ] Forms
- [ ] Modals
- [ ] Tables
- [ ] Layout Grid
- [ ] Page Headers
- [ ] Full Pages

### **Success Metrics**
- Reduced CSS file size
- Faster development time
- Improved maintainability
- Consistent styling
- Better performance

---

## 🔍 **TROUBLESHOOTING**

### **Common Issues**
1. **Utilities not working**: Check `@theme` syntax
2. **Styles not applying**: Verify CSS import order
3. **Conflicts**: Remove old CSS gradually
4. **Missing utilities**: Add to `@theme` block

### **Resources**
- Tailwind v4 Docs: https://tailwindcss.com/docs
- VS Code Extension: Tailwind CSS IntelliSense
- Chrome DevTools: Inspect applied classes

---

*This document serves as the definitive guide for migrating The Studio from the 4-tier CSS system to Tailwind v4 utilities.*