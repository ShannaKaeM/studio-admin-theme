# 04-Plugin Backend - REFACTOR WHITEBOARD

## 🚨 CRITICAL S4 RULE - TAGS ARE NEVER USED FOR STYLING

**FUNDAMENTAL PRINCIPLE:**
- ❌ **NEVER assign styles or scopes to HTML tags**
- ❌ **Tags have NOTHING to do with styling or scoping**
- ✅ **Tags are ONLY for semantic structure, SEO, accessibility**
- ✅ **Styling comes from data-scope attributes ONLY**

**Example - All identical styling:**
```html
<header data-scope="header">Content</header>    <!-- Same styling -->
<section data-scope="header">Content</section>  <!-- Same styling -->
<div data-scope="header">Content</div>          <!-- Same styling -->
<main data-scope="header">Content</main>        <!-- Same styling -->
```

**CSS targets scope, NOT tag:**
```css
/* ✅ CORRECT - target scope */
[data-scope="header"] {
  /* All header styling here */
}

/* ❌ WRONG - never target tags */
header {
  /* Never do this */
}
```

**Tag Selection Process:**
1. Choose scope for styling: `data-scope="header"`
2. Choose tag for semantics: `<header>`, `<section>`, `<div>`, etc.
3. Tag choice has ZERO impact on styling

---

## 📊 STUDIO4 COMPONENT AUDIT RESULTS

### **DEFINED COMPONENTS**: ~50+ in ui-theme-config.json

#### **✅ ACTUALLY USED COMPONENTS** (28 components)
**Used in S4ThemeBuilder.jsx + StructuredSidebar.jsx:**
- main-header, header-brand, header-logo,(what is the header-brand? vs header logo? is it a wrapper or a duplicate?)  header-title, header-subtitle
- sidebar, sidebar-header(remove??) sidebar-nav-grid, sidebadr-nav-button, sidebar-nav-number, sidebar-nav-label
- sidebar-content, content-area, section, sidebar-footer
- preview-container, preview-header, preview-content, preview-canvas, preview-mode-toggle, preview-mode-button
- button-primary, button-secondary
- color-grid, color-card, color-swatch, color-scale

#### **❌ UNUSED/ORPHANED COMPONENTS** (~22+ components)
- accordion, accordion-item, accordion-trigger, accordion-content, accordion-icon
- input, label, card
- color-grid-xs, color-grid-sm, color-grid-md, color-grid-lg, color-grid-xl
- color-card-content, color-card-title, color-card-value
- color-swatch-number, color-swatch-label
- color-scale-swatch, color-preview-title
- preview-mode-button-active, preview-mode-button-hover
- sidebar-nav-button-active, sidebar-nav-button-hover
- sidebar-nav-number-active, sidebar-nav-label-active

### **🚨 CURRENT SYSTEM USAGE REALITY CHECK**

#### **Files Using Theme-Aware System**: 2 files
1. **S4ThemeBuilder.jsx** - 🔀 MIXED (imports 28 components but still has Tailwind classes)
2. **StructuredSidebar.jsx** - 🎯 PURE (fully theme-aware)

#### **Files Using Pure Tailwind**: 7 files
- ThemeEditor.jsx, CommandPalette.jsx, Panel.jsx, PanelHeader.jsx, SettingsDialog.jsx, TailwindDemo.jsx, ThemeEditor-old.jsx

### **🔄 DUPLICATES & ODDITIES**

#### **State Variants (Connected but separate)**:
- `sidebar-nav-button` + `sidebar-nav-button-active` + `sidebar-nav-button-hover`
- `preview-mode-button` + `preview-mode-button-active` + `preview-mode-button-hover`
- `sidebar-nav-number` + `sidebar-nav-number-active`
- `sidebar-nav-label` + `sidebar-nav-label-active`

#### **Responsive Grid Variants**:
- `color-grid` + `color-grid-xs` + `color-grid-sm` + `color-grid-md` + `color-grid-lg` + `color-grid-xl` (6 versions!)

### **💡 REFACTOR RECOMMENDATIONS**

#### **1. Remove Unused (22+ components)**
Safe to delete since they're not imported anywhere

#### **2. Consolidate State Variants**
Instead of separate `-active` components, use CSS `:hover` and `[data-state="active"]`

#### **3. Simplify Responsive Grids**
Replace 6 grid variants with CSS `@media` queries in one component

#### **4. Convert Tailwind Files**
7 files still using pure Tailwind - prime candidates for S4 conversion

## 🔥 UPDATED REFACTOR PLAN

### **COMPONENT DECISIONS BASED ON YOUR NOTES**

#### **Questions to Resolve:**
- **header-brand vs header-logo**: Is header-brand a wrapper or duplicate?
- **sidebar-header**: Remove entirely?

#### **Confirmed Approach:**
- ✅ **Keep unused components until refactor** - they are used (strange import situation)
- ✅ **Don't touch existing system** - build S4 alongside existing
- ✅ **Natural consolidation** - state variants will consolidate naturally with S4
- ✅ **Clean deletion after refactor** - old TW components will be deletable naturally

### **SECTION-BY-SECTION REBUILD STRATEGY**

#### **Phase 1: Define Global Elements in Tailwind @theme (don't touch existing)**
- [ ] **Step 1: Outer Section Component** - wrapper, section, container elements
- [ ] **Step 2: Header Section** - nav, title, brand elements
- [ ] **Step 3: Sidebar Section** - sidebar, content, nav elements  
- [ ] **Step 4: Preview Section** - preview, canvas, toggle elements

#### **Phase 2: Create Global Scoped Components in JSON**
- [ ] Define component scopes (card, header, sidebar, preview)
- [ ] Update JSON interface for scopes instead of individual components
- [ ] Build new section-by-section approach

#### **Phase 3: S4 Integration & Testing**
- [ ] Update React components to use data-scope attributes
- [ ] Test S4 4-layer system
- [ ] Section-by-section validation

#### **Phase 4: Natural Cleanup (happens automatically)**
- [ ] Old TW components become deletable after S4 implementation
- [ ] State variants consolidate naturally 
- [ ] Responsive grids fix during refactor
- [ ] Import issues resolve with proper S4 structure 

## 🔑 KEY S4 ARCHITECTURE DECISIONS

### **S4 Element Separation & Consistency**
1. **Section**: Outer container/scope - `data-scope="dashboard"`
2. **Container**: Content width controller ONLY - `max-width`, `width`, `margin: 0 auto`
3. **Wrapper**: All visual styling - background, borders, padding, shadows, etc.
4. **Layout**: ALL layout transformations (grid, flex, block) - controlled by scope
5. **Elements**: Content (header, sidebar, preview, etc.)

### **🎯 CONTAINER vs WRAPPER ROLES**
**Container = Content Width Management:**
- `max-width: 1200px` (or site-wide content width)
- `width: 100%`
- `margin: 0 auto` (centering)
- Basic positioning only
- **Single Purpose**: "How wide should the content be?"

**Wrapper = Visual Styling:**
- Background, borders, padding, shadows
- Visual styling that doesn't affect content width
- Can be used multiple times in different contexts
- **Single Purpose**: "How should this box look?"

**Clean Separation**: Container controls width, wrapper controls appearance, layout controls arrangement.

### **🎯 ARCHITECTURAL RULE: Always Include Layout**
**Every box structure must include a layout element, even if simple:**
```html
<div class="wrapper">
  <div class="layout">  <!-- Always present -->
    <!-- content -->
  </div>
</div>
```

**Benefits:**
- **Predictable Structure**: Every developer knows layout is always there
- **Future-Proof**: Easy to add layout logic later without HTML restructure
- **Clean Separation**: Shell elements = box styling, layout = arrangement logic
- **No Exceptions**: No guesswork about when to include layout vs when not to

### **Critical Rule: Layout Control via Scopes**
- ❌ **Don't use**: `<div class="layout" data-layout="dashboard-grid">`
- ✅ **Do use**: `<div class="layout">` controlled by parent scope

```html
<section class="section" data-scope="dashboard">
  <div class="container">
    <div class="wrapper">
      <div class="layout">  <!-- Always present, no data-layout! -->
        <header>...</header>
        <aside>...</aside>
        <main>...</main>
      </div>
    </div>
  </div>
</section>
```

### **Scope Controls Layout:**
```css
[data-scope="dashboard"] .layout {
  --layout-display: grid;
  --layout-template-areas: "header header" "sidebar preview";
  --layout-template-columns: 400px 1fr;
}

[data-scope="card"] .layout {
  --layout-display: flex;
  --layout-flex-direction: column;
}
```

### **Layout Element = Universal Layout System**
- **Grid layouts**: `--layout-display: grid` + grid properties
- **Flex layouts**: `--layout-display: flex` + flex properties  
- **Block layouts**: `--layout-display: block`
- **Reusable**: Same layout element in cards, modals, anywhere

### **S4 Base Color System**
- **color1**: Primary (Studio4 Pink)
- **color2**: Secondary (Studio4 Tangerine)  
- **color3**: Neutral
- **color4**: Base
- **color-base-bg**: Background placeholder for preset hydration
- **color-base-border**: Border placeholder (transparent) for preset hydration

### **🎯 CRITICAL: Global Elements → Scope Level Tag Assignment**

**Global Elements are self-contained components (NO tag assignments):**
```css
/* Global Element: subtitle - self-contained with variables + CSS */
.subtitle {
  --subtitle-font-size: 1rem;
  --subtitle-color: var(--color1);
  --subtitle-font-weight: 600;
  
  font-size: var(--subtitle-font-size);
  color: var(--subtitle-color);
  font-weight: var(--subtitle-font-weight);
}

/* Global Element: wrapper - universal, no tag assignment */
.wrapper {
  --wrapper-width: 100%;
  --wrapper-background: var(--color-base-bg);
  --wrapper-padding: 1rem;
  
  width: var(--wrapper-width);
  background: var(--wrapper-background);
  padding: var(--wrapper-padding);
}
```

**HTML Tag Assignments happen at SCOPE LEVEL only:**
```css
/* Scope assigns global elements to semantic HTML tags */
[data-scope="header"] h3 {
  /* Inherit all subtitle properties */
  font-size: var(--subtitle-font-size);
  color: var(--subtitle-color);
  font-weight: var(--subtitle-font-weight);
}

[data-scope="header"] .wrapper {
  /* Can override global wrapper properties in this scope */
  --wrapper-background: var(--color2);
}
```

**Scopes can override global element properties:**
```css
[data-scope="card"] .subtitle {
  --subtitle-font-size: 1.2rem;  /* Override subtitle in cards */
}
```

**Updated Architecture:** 
- ✅ **Global Elements** = Self-contained CSS components (variables + styles)
- ✅ **No Tag Assignments** = Global elements are generic and universal
- ✅ **Scope Level Tag Assignment** = Scopes decide which tags get which properties
- ✅ **Scopes Override** = Can modify global element properties for context
- ❌ **No Global Tag Assignment** = Never assign global elements to HTML tags globally

### **🎯 SEMANTIC TAG ASSIGNMENT SYSTEM**

**Scope Interface - Tag Assignment Required:**
```
[data-scope="hero"] configuration:
┌─────────────────┬──────────────────┐
│ Global Element  │ Assigned Tag     │
├─────────────────┼──────────────────┤
│ .title         │ <h1> ▼           │
│ .subtitle      │ <h2> ▼           │
│ .pretitle      │ <p> ▼            │
│ .description   │ <p> ▼            │
│ .button        │ <a> ▼            │
└─────────────────┴──────────────────┘
```

**Generated CSS from scope interface:**
```css
[data-scope="hero"] h1 {
  /* Apply all .title properties to h1 tags */
  color: var(--title-color);
  font-size: var(--title-size);
  font-weight: var(--title-weight);
}
```

**HTML Pattern:**
```html
<div data-scope="hero">
  <h1>Title Text</h1>        <!-- Gets .title styling via scope -->
  <p>Description text</p>    <!-- Gets .description styling via scope -->
</div>
```

### **🎯 HIERARCHICAL CASCADE SYSTEM**

**Hierarchy Preset** establishes base semantic structure:
```css
[data-preset="hierarchy"] .title {
  /* All titles become h1 by default */
}
[data-preset="hierarchy"] .subtitle {  
  /* All subtitles become h2 by default */
}
```

**Component Scopes** override for nested contexts:
```css
[data-scope="card"] .title {
  /* Becomes h3 instead of h1 (demoted for nesting) */
}
[data-scope="card"] .subtitle {
  /* Becomes h4 instead of h2 */
}
```

**Hierarchical Benefits:**
- ✅ **Proper SEO hierarchy** (h1 → h2 → h3 → h4)
- ✅ **Automatic accessibility** (screen readers get proper structure)
- ✅ **Context-aware nesting** (cards don't break page hierarchy)
- ✅ **Preset + Scope control** (both visual styling AND semantic structure)

**Example Hierarchy:**
- **Page level**: `.title` = h1, `.subtitle` = h2
- **Card context**: `.title` = h3, `.subtitle` = h4  
- **Modal context**: `.title` = h2, `.subtitle` = h3

**Default Fallback:** All elements start with `<div>` tag to ensure semantic validity.
**Scope Requirement:** Every scope must assign tags to global elements.
**Helper Override:** Helper scopes can change tag assignments from base scopes.

## Backend Development Notes

### Document API Design
Need endpoints for:
```
GET /wp-json/studio4/v1/docs/{folder}/{file}
POST /wp-json/studio4/v1/docs/{folder}/{file}
PUT /wp-json/studio4/v1/docs/{folder}/{file}
```

### Security Considerations
- Proper nonce verification
- File path validation
- User permission checks
- Backup before saves