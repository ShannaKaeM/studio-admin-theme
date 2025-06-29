# The Studio Plugin - Style Guide for AI Assistants

**Created**: June 28, 2025  
**Purpose**: Instructions for maintaining consistent styling when working with AI assistants  
**Target Audience**: Users directing AI assistants to modify The Studio plugin

---

## 🎯 **CRITICAL RULES FOR AI ASSISTANTS**

When asking an AI assistant to add features or modify The Studio plugin, **always give them these rules**:

### **Rule #1: ONLY Edit Designated CSS File for Styling**
```
❌ NEVER create new CSS files
❌ NEVER use inline styles in components  
❌ NEVER add styles to separate files
✅ HTML Phase: Edit the <style> block in HTML mockup
✅ React Phase: Edit src/ShadowStyles.jsx (or designated CSS file)
```

### **Rule #2: Use Existing CSS Classes First**
```
✅ FIRST: Check if a class already exists
✅ SECOND: Use existing Studio design system classes
❌ LAST RESORT: Create new styles
```

### **Rule #3: Follow the Variable System**
```
✅ ALWAYS use CSS variables: var(--studio-bg-card)
❌ NEVER use hardcoded colors: #24242a
✅ ALWAYS use spacing variables: var(--studio-space-4)  
❌ NEVER use hardcoded spacing: 16px
```

---

## 📁 **FILE STRUCTURE (For AI Context)**

### **Current HTML Phase**
```
DOCS/HTML-MOCKUPS/
└── studio-mockup.html       ← ALL STYLES in <style> block (~1283 lines)
```

### **Future React Phase**
```
src/
├── ShadowStyles.jsx          ← ALL STYLES GO HERE 
├── context/ThemeContext.jsx  ← Theme switching only
├── components/               ← React components (NO STYLES)
├── views/                    ← Page components (NO STYLES)
└── main.jsx                  ← App entry point
```

**Key Points**: 
- **HTML Phase**: All styles in HTML `<style>` block with component organization
- **React Phase**: Shadow DOM isolation with all styles in one file

---

## 🎨 **CURRENT DESIGN SYSTEM (Give This to AI)**

### **Available CSS Variables (Current HTML Mockup Standard)**
```css
/* Colors - Theme Aware */
--studio-bg-main, --studio-bg-card, --studio-bg-sidebar, --studio-bg-header
--studio-text-content, --studio-text-supporting, --studio-text-subtle, --studio-text-navigation
--studio-border-subtle, --studio-border-medium, --studio-border-card
--studio-primary-500: rgb(39, 104, 96);          /* Studio teal accent */
--studio-secondary-500: rgb(112, 153, 51);       /* Studio green accent */

/* Spacing */
--studio-space-1: 0.25rem;  --studio-space-2: 0.5rem;   --studio-space-3: 0.75rem;
--studio-space-4: 1rem;     --studio-space-5: 2rem;     --studio-space-6: 3rem;
--studio-space-8: 4rem;     --studio-space-10: 5rem;    --studio-space-12: 6rem;

/* Border Radius */
--studio-radius-sm: 0.375rem;  --studio-radius: 0.5rem;  --studio-radius-lg: 0.75rem;  --studio-radius-xl: 1rem;

/* Typography - Semantic Names (CURRENT STANDARD) */
--studio-text-metadata: 0.75rem;        /* 12px - codes, timestamps, small labels */
--studio-text-interface: 0.875rem;      /* 14px - nav, buttons, forms, controls */
--studio-text-body: 1rem;               /* 16px - main body text */
--studio-text-card-title: 1.125rem;     /* 18px - card titles, component headers */
--studio-text-section-title: 1.25rem;   /* 20px - section titles */
--studio-text-page-title: 1.875rem;     /* 30px - page titles */
```

### **Available Component Classes**
```css
/* Buttons */
.studio-button                   /* Base button */
.studio-button-primary           /* Primary button (studio teal) */
.studio-button-secondary         /* Secondary button (studio green) */
.studio-button-ghost             /* Transparent button */

/* Cards & Containers */
.studio-card                     /* Base card container */
.studio-color-card               /* Color editing card */
.studio-section-header           /* Section header container */

/* Forms */
.studio-form-group               /* Form field wrapper */
.studio-form-input               /* Input field */
.studio-control-group            /* Control group wrapper */

/* Navigation */
.studio-nav                      /* Navigation container */
.studio-nav-item                 /* Individual nav item */
.studio-nav-item.active          /* Active nav state */

/* Color Controls */
.studio-color-slider             /* Styled range inputs */
.studio-format-tabs              /* Color format tab container */
.studio-format-tab               /* Individual format tab */
```

---

## 💬 **HOW TO INSTRUCT AI ASSISTANTS**

### **✅ GOOD Instructions to Give AI:**

**"Add a new color picker component"**
```
Create a new color picker component. Add the CSS styles to the HTML mockup 
or CSS file. Use existing variables like 
var(--studio-bg-card) for backgrounds and var(--studio-space-4) for padding. 
Follow the existing .studio-button pattern for styling.
```

**"Style this new component"**
```
Style this component by adding CSS to the appropriate CSS section. Use the 
existing Studio design system variables. Make it consistent with other 
components like .studio-card.
```

**"Make this look professional"**
```
Improve the styling by editing the CSS file. Use the existing 
--studio-bg-card background, --studio-border-card for borders, and 
var(--studio-space-4) for consistent spacing. Follow the current button and 
card styling patterns.
```

### **❌ BAD Instructions (Will Create Mess):**

```
❌ "Add some CSS to make this look good"
❌ "Style this component" (without specifying the file)
❌ "Add styles to make it pretty"  
❌ "Create a stylesheet for this"
```

---

## 🔧 **AI ASSISTANT WORKFLOW**

Give your AI assistant this **exact workflow**:

### **Step 1: Check Existing Classes**
```
Before creating new styles, check if these classes already exist:
- .studio-button (for buttons)
- .studio-card (for containers)  
- .studio-form-input (for inputs)
- .studio-color-slider (for sliders)
```

### **Step 2: Add to CSS File**
```
1. Open the appropriate CSS file or HTML mockup
2. Find the correct CSS section for your component
3. Add new CSS in the appropriate section with clear headers
4. Use existing CSS variables (--studio-*)
5. Follow existing naming convention (studio-component-name)
```

### **Step 3: Use in React Component**
```
1. Add className="your-new-class" to React elements
2. DO NOT add inline styles
3. DO NOT create separate CSS files
```

---

## 📝 **EXAMPLE: Adding New Component**

### **✅ CORRECT Way to Ask AI:**

> **"I need a card component for displaying project statistics. Add the CSS using the existing Studio design variables. Style it like the existing .studio-card but smaller and with hover effects. Use var(--studio-bg-card) for background and var(--studio-space-4) for padding."**

### **Expected AI Response:**
```css
/* AI should add this to the appropriate CSS section */
.studio-project-card {
  background: var(--studio-bg-card);
  border: 1px solid var(--studio-border-card);
  border-radius: var(--studio-radius-lg);
  padding: var(--studio-space-4);
  transition: all 0.2s ease;
  cursor: pointer;
}

.studio-project-card:hover {
  background: var(--studio-bg-card-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

### **Then AI Should Create React Component:**
```jsx
export function ProjectCard({ project }) {
  return (
    <div className="studio-project-card">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
    </div>
  );
}
```

---

## 🚨 **COMMON MISTAKES TO PREVENT**

### **AI Might Try These (STOP THEM):**

1. **Creating separate CSS files**
   ```
   ❌ "I'll create src/components/ProjectCard.css"
   ✅ "I'll add styles to the CSS file"
   ```

2. **Using inline styles**
   ```
   ❌ <div style={{ background: '#24242a', padding: '16px' }}>
   ✅ <div className="studio-project-card">
   ```

3. **Hardcoding values**
   ```
   ❌ background: #24242a; padding: 16px;
   ✅ background: var(--studio-bg-card); padding: var(--studio-space-4);
   ```

4. **Not following naming convention**
   ```
   ❌ .projectCard, .my-component, .card
   ✅ .studio-project-card, .studio-component-name
   ```

---

## 🎯 **QUICK REFERENCE FOR AI ASSISTANTS**

### **File Locations:**
- **All Styles**: `src/ShadowStyles.jsx` (lines 3-575)
- **React Components**: `src/components/` and `src/views/`
- **Theme Context**: `src/context/ThemeContext.jsx`

### **Design System:**
- **Primary Color**: `var(--studio-primary-500)` (rgb(39, 104, 96))
- **Secondary Color**: `var(--studio-secondary-500)` (rgb(112, 153, 51))  
- **Background**: `var(--studio-bg-card)`
- **Text**: `var(--studio-text-primary)`
- **Spacing**: `var(--studio-space-4)` (1rem)
- **Radius**: `var(--studio-radius)` (0.5rem)

### **Build Command:**
```bash
npm run build:watch  # Rebuilds when ShadowStyles.jsx changes
```

### **Testing:**
1. Save changes to `src/ShadowStyles.jsx`
2. Build will auto-update
3. Refresh WordPress page to see changes

---

## 📋 **CHECKLIST FOR AI ASSISTANTS**

Before the AI assistant finishes any styling task, they should confirm:

- [ ] ✅ Added styles ONLY to `src/ShadowStyles.jsx`
- [ ] ✅ Used existing CSS variables (var(--studio-*))
- [ ] ✅ Followed naming convention (.studio-*)
- [ ] ✅ Used className in React, not inline styles
- [ ] ✅ Checked if existing classes could be reused first
- [ ] ❌ Did NOT create separate CSS files
- [ ] ❌ Did NOT use hardcoded colors or spacing
- [ ] ❌ Did NOT add styles to other files

---

## 🎉 **SUCCESS PATTERN**

**When working correctly, you should see:**

1. **One style file**: Only `src/ShadowStyles.jsx` gets modified
2. **Consistent variables**: All new styles use `var(--studio-*)` 
3. **Clean React**: Components only have `className`, no `style` props
4. **Professional look**: New components match existing Studio design
5. **No conflicts**: Shadow DOM prevents style conflicts with WordPress

---

## 🔄 **HTML-TO-REACT MIGRATION WORKFLOW**

### **Phase 1: HTML Mockup Development**
```
1. Edit ONLY: DOCS/HTML-MOCKUPS/studio-mockup.html <style> block
2. Use semantic typography variables: --studio-text-metadata, --studio-text-interface
3. Follow component organization with CSS section headers
4. Maintain .studio-* class naming convention
5. Use theme-aware variables: --studio-bg-*, --studio-text-*
```

### **Phase 2: React Conversion**
```
1. Extract entire <style> block to src/ShadowStyles.jsx
2. Convert HTML elements to React components with className props
3. Preserve ALL CSS variables and class names exactly
4. Maintain component organization and section headers
5. Test theme switching functionality
```

### **Key Migration Rules**
- **Never change variable names** during HTML-to-React conversion
- **Preserve CSS organization** with section headers and component grouping
- **Keep semantic typography** variables (not generic xs/sm/base)
- **Maintain single CSS file** approach (no separate component stylesheets)

---

**🚀 Give this guide to any AI assistant working on The Studio plugin to maintain consistent, professional styling across HTML mockups and React implementation!**