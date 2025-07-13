# COLOR BOOK CORE SCOPES PLANNING

**Purpose**: Define the essential core scopes that need preset colors for a functional design system

---

## **PRESET CONCEPT: PRIMARY LIGHT THEME**

**Foundation Idea**: 
- **Text Elements**: `hsl(0, 0%, 80%, 1)` - Dark text on light backgrounds
- **Box/Surface Elements**: `hsl(0, 0%, 20%, 1)` - Light surfaces  
- **Background**: Pure white or very light
- **Emphasis**: Pure black or very dark for contrast

---

## **CORE SCOPES THAT NEED PRESET COLORS**

### **Typography Scopes**
- `eyebrow`  (already exists)
- `title`  (already exists) 
- `subtitle`  (already exists)
- `body-text`
- `caption`
- `label`
- `link`
- `code`

### **Interactive Elements**
- `button-primary`
- `button-secondary` 
- `button-tertiary`
- `button-ghost`
- `button-danger`
- `link-primary`
- `link-secondary`

### **Layout & Container Scopes**
- `container`
- `card`
- `panel`
- `sidebar`
- `header`
- `footer`
- `nav-container`

### **Form Elements**
- `input-field`
- `textarea`
- `select`
- `checkbox`
- `radio`
- `form-label`
- `form-error`
- `form-success`

### **Navigation Scopes**
- `nav-item`
- `nav-item-active`
- `nav-item-hover`
- `breadcrumb`
- `tab`
- `tab-active`

### **Feedback & Status**
- `alert-info`
- `alert-warning`
- `alert-error`
- `alert-success`
- `badge`
- `tag`
- `status-indicator`

### **Content Blocks**
- `hero-section`
- `content-block`
- `feature-card`
- `testimonial`
- `callout`
- `quote`
- `divider`

### **Data Display**
- `table-header`
- `table-row`
- `table-cell`
- `list-item`
- `data-value`
- `metric`

---

## **QUESTIONS FOR DISCUSSION**

1. **Scope Priorities**: Which scopes should we implement first for MVP?

2. **Preset Structure**: Should presets modify:
   - Just `--one-color` and `--one-background`?
   - Or also borders, shadows, etc.?

3. **Theme Variants**: Should we plan for:
   - Light theme (what you described)
   - Dark theme 
   - High contrast theme?

4. **Color Roles**: Should we think in terms of:
   - Primary/Secondary/Tertiary colors?
   - Semantic colors (success, warning, error)?
   - Neutral scale (light to dark)?

5. **Implementation Order**: 
   - Create all core scopes first?
   - Or create preset system with existing 3 scopes?

---

## **NEXT STEPS OPTIONS**

**Option A**: Create all core scopes first, then build preset system
**Option B**: Build preset system with existing 3 scopes, add more scopes later
**Option C**: Create just essential scopes (buttons, containers, forms) then preset system

**Your call on direction!** <¯