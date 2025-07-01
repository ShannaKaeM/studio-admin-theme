# STUDIO STYLING RULES V2 - Universal Scoped Component System

**Project**: The Studio WordPress Plugin  
**Date**: December 30, 2024  
**Status**: Ready for Production Implementation  

---

## 🎯 **CORE ARCHITECTURE PRINCIPLES**

### **Universal Scoped Component System**
All styling follows a **4-tier hierarchy** with progressive enhancement scoping:

```css
/* 1. Primitives - CSS Variables */
--studio-text-interface: 0.875rem;
--studio-space-4: 1rem;
--studio-primary-500: rgb(39, 104, 96);

/* 2. Generic Components - Universal base elements */
.card { /* base card styling for ALL pages */ }
.sidebar { /* base sidebar layout for ALL pages */ }
.nav { /* base navigation for ALL pages */ }

/* 3. Top Level Scopes - Page/context specific */
.card.projects { /* projects page cards */ }
.sidebar.projects { /* projects page sidebar */ }

/* 4. Helper Scopes - Tab/variant specific */
.card.projects.dashboard { /* dashboard tab cards */ }
.card.projects.add-new { /* add new project cards */ }
```

---

## 🔧 **CRITICAL AI AGENT RULES**

### **Rule #1: Universal Component Classes Only**
```
✅ ALWAYS use scoped classes: .card.projects.dashboard
✅ ALWAYS build from universal base: .card → .card.projects → .card.projects.dashboard
❌ NEVER use studio-* prefixes: .studio-card, .studio-nav-item
❌ NEVER create isolated classes: .project-card-dashboard
```

### **Rule #2: CSS Variables Required**
```
✅ ALWAYS use semantic variables: var(--studio-bg-card)
✅ ALWAYS use spacing variables: var(--studio-space-4)
❌ NEVER use hardcoded values: #24242a, 16px
❌ NEVER create new variables without approval
```

### **Rule #3: Progressive Enhancement Scoping**
```
✅ Start with universal base: .card
✅ Add page scope: .card.projects  
✅ Add tab/variant scope: .card.projects.dashboard
❌ Skip hierarchy levels
❌ Create overly specific selectors
```

### **Rule #4: Single CSS File Rule**
```
✅ Plugin: Edit src/styles/global.css ONLY
❌ NEVER create separate CSS files
❌ NEVER use inline styles
❌ NEVER add styles to component files
```

---

## 🎨 **SEMANTIC CSS VARIABLE SYSTEM**

### **Typography - Component Purpose Based**
```css
--studio-text-metadata: 0.75rem;        /* 12px - timestamps, nav titles */
--studio-text-interface: 0.875rem;      /* 14px - nav items, buttons, forms */
--studio-text-body: 1rem;               /* 16px - main content */
--studio-text-card-title: 1.125rem;     /* 18px - card headers */
--studio-text-section-title: 1.25rem;   /* 20px - section titles */
--studio-text-page-title: 1.875rem;     /* 30px - page headers */
```

### **Spacing - Component Context Based**
```css
--studio-space-1: 0.25rem;   /* Micro spacing: fine adjustments */
--studio-space-2: 0.5rem;    /* Tight spacing: button padding */
--studio-space-3: 0.75rem;   /* Element spacing: form padding */
--studio-space-4: 1rem;      /* Container spacing: card padding */
--studio-space-5: 2rem;      /* Section spacing: major gaps */
--studio-space-6: 3rem;      /* Content spacing: page margins */
```

### **Brand Colors - Studio Identity**
```css
--studio-primary-500: rgb(39, 104, 96);    /* Studio teal */
--studio-secondary-500: rgb(112, 153, 51); /* Studio green */
```

### **Theme-Aware Semantic Colors**
```css
/* Background Colors */
--studio-bg-main: var(--studio-base-50);     /* Page background */
--studio-bg-sidebar: var(--studio-base-100); /* Sidebar background */
--studio-bg-card: var(--studio-base-200);    /* Card background */

/* Text Colors */
--studio-text-content: var(--studio-base-950);   /* Main content */
--studio-text-supporting: var(--studio-base-700); /* Supporting text */
--studio-text-subtle: var(--studio-base-600);     /* Subtle text */

/* Border Colors */
--studio-border-ui: var(--studio-base-300);       /* General UI borders */
--studio-border-primary: var(--studio-base-300);  /* Primary content borders */
```

---

## 🏗️ **UNIVERSAL COMPONENT HIERARCHY**

### **Generic Components (Apply to ALL pages)**
```css
.card {
    background: var(--studio-bg-card);
    border: var(--studio-border-thick) solid var(--studio-border-primary);
    border-radius: var(--studio-radius-xl);
    padding: var(--studio-space-4);
    transition: all 0.2s ease;
}

.sidebar {
    background: var(--studio-bg-sidebar);
    border-right: 1px solid var(--studio-border-ui);
    width: 250px;
    display: flex;
    flex-direction: column;
}

.nav {
    display: flex;
    gap: var(--studio-space-6);
}

.nav-item {
    padding: var(--studio-space-2) var(--studio-space-4);
    color: var(--studio-text-navigation);
    text-decoration: none;
    border-radius: var(--studio-radius);
    transition: all 0.2s ease;
}

.button {
    background: var(--studio-bg-button);
    color: var(--studio-text-content);
    border: var(--studio-border-thin) solid var(--studio-border-ui);
    border-radius: var(--studio-radius);
    padding: var(--studio-space-2) var(--studio-space-4);
    cursor: pointer;
    transition: all 0.2s ease;
}

.status {
    background: var(--studio-bg-controls);
    color: var(--studio-text-subtle);
    padding: var(--studio-space-1) var(--studio-space-2);
    border-radius: var(--studio-radius-sm);
    font-size: var(--studio-text-metadata);
    font-weight: 600;
    text-transform: uppercase;
}

.status.active {
    background: linear-gradient(135deg, var(--studio-primary-500), var(--studio-secondary-500));
    color: white;
}
```

### **Page Scopes (Context specific)**
```css
/* Projects Page Modifications */
.card.projects {
    min-height: 320px;
}

.sidebar.projects {
    /* projects specific sidebar adjustments */
}

.nav.projects {
    /* projects page navigation adjustments */
}
```

### **Helper Scopes (Variants and tabs)**
```css
/* Dashboard Tab */
.card.projects.dashboard {
    /* dashboard specific styling */
}

/* Assets Tab */
.card.projects.assets {
    /* assets specific styling */
}

/* Add New Variant */
.card.projects.add-new {
    justify-content: center;
    align-items: center;
    text-align: center;
    opacity: 0.7;
    border-style: dashed;
}

.card.projects.add-new:hover {
    opacity: 1;
    border-style: solid;
}
```

---

## 📱 **RESPONSIVE DESIGN SYSTEM**

### **Breakpoint Strategy**
```css
/* Large Desktop (Above 1320px) */
.layout {
    grid-template-columns: 250px 1fr 300px;
}

/* Medium Desktop (1320px) - Hide left sidebar */
@media (max-width: 1320px) {
    .layout {
        grid-template-columns: 1fr 300px;
    }
    
    .sidebar.projects {
        display: none;
    }
    
    .mobile-toggle.nav-toggle {
        display: block;
    }
}

/* Small Desktop (1068px) - Hide right sidebar */
@media (max-width: 1068px) {
    .layout {
        grid-template-columns: 1fr;
    }
    
    .sidebar.right {
        display: none;
    }
    
    .mobile-toggle.header-toggle {
        display: block;
    }
}
```

### **Mobile Hamburger System**
```css
.mobile-toggle {
    display: none;
    position: fixed;
    top: 20px;
    z-index: 20;
    background: linear-gradient(135deg, var(--studio-primary-500), var(--studio-secondary-500));
    color: white;
    border: none;
    width: 44px;
    height: 44px;
    border-radius: var(--studio-radius);
    cursor: pointer;
    transition: all 0.2s ease;
}

.mobile-toggle.nav-toggle {
    left: 20px;
}

.mobile-toggle.header-toggle {
    right: 20px;
}

.overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
}
```

---

## ⚛️ **REACT INTEGRATION READY**

### **Direct className Compatibility**
```jsx
// Clean className structure
<div className="card projects dashboard">
    <div className="status active">ACTIVE</div>
    <div className="stats">
        <div className="stat">
            <span className="stat-value">12</span>
            <span className="stat-label">Colors</span>
        </div>
    </div>
    <div className="actions">
        <button className="button secondary">Edit</button>
        <button className="button primary">Activate</button>
    </div>
</div>

<div className="sidebar projects">
    <nav className="nav">
        <a className="nav-item active">Projects</a>
        <a className="nav-item">Colors</a>
    </nav>
</div>
```

---

## 🎯 **IMPLEMENTATION WORKFLOW**

### **For Plugin Development**
1. **Start with universal base**: `.card`, `.sidebar`, `.nav`
2. **Add page scope**: `.card.projects`, `.sidebar.projects`
3. **Add specific scope**: `.card.projects.dashboard`
4. **Use semantic variables**: `var(--studio-space-4)`
5. **Test responsive behavior**: Ensure hamburger menus work

### **CSS Organization**
```css
/* ================================== */
/* CSS VARIABLES & THEME SYSTEM      */
/* ================================== */

/* ================================== */
/* UNIVERSAL COMPONENT FOUNDATION     */
/* ================================== */

/* ================================== */
/* PAGE SCOPES - Projects Page        */
/* ================================== */

/* ================================== */
/* RESPONSIVE DESIGN                  */
/* ================================== */
```

---

## 🚨 **CRITICAL DONT'S**

### **Never Do These**
```css
❌ .studio-card-projects-dashboard
❌ .project-card
❌ .ProjectCard
❌ hardcoded colors: #24242a
❌ hardcoded spacing: 16px
❌ generic variables: --space-lg
❌ isolated components without scoping
```

### **Always Do These**
```css
✅ .card.projects.dashboard
✅ .sidebar.projects
✅ var(--studio-bg-card)
✅ var(--studio-space-4)
✅ semantic variables: --studio-text-interface
✅ progressive enhancement scoping
```

---

## 📋 **QUALITY CHECKLIST**

Before committing any styling changes:

- [ ] Uses universal scoped component classes
- [ ] All hardcoded values replaced with CSS variables
- [ ] Follows 4-tier hierarchy (Primitives → Generic → Top Level → Helper)
- [ ] Responsive design works at 1320px and 1068px breakpoints
- [ ] Mobile hamburger menus function properly
- [ ] React className compatibility maintained
- [ ] No studio-* prefixes in HTML classes
- [ ] Semantic variable naming used throughout

---

**🎯 This system is production-ready for The Studio WordPress plugin implementation.**

*Ready for direct application to `/app/public/wp-content/plugins/the-studio/src/styles/global.css`*