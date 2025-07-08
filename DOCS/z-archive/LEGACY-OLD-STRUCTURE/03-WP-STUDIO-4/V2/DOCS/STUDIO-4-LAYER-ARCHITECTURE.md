# Studio 4-Layer Architecture - Complete Implementation Guide

## The Paradigm Shift

The Studio System represents a fundamental shift in how we build CSS architectures. Instead of creating hundreds of utility classes or specific component variations, we create a system where:

1. **Every CSS property is a variable**
2. **Components define structure, not style**
3. **Context (scopes) provides the styling**
4. **Infinite flexibility without new classes**

## The 4 Layers in Detail

### Layer 1: Primitives (Design Tokens)
The foundation - raw values that everything else references.

```css
:root {
    /* Base Colors */
    --primary: hsl(337, 35%, 52%);
    --secondary: hsl(29, 44%, 53%);
    --neutral: hsl(0, 0%, 50%);
    
    /* Generate scales dynamically */
    --neutral-950: hsl(from var(--neutral) h s 5%);
    --neutral-900: hsl(from var(--neutral) h s 10%);
    /* ... etc ... */
    
    /* Typography Scale */
    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    
    /* Spacing Scale */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    
    /* Radii */
    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
}
```

### Layer 2: Base Components
Components that define structure with EVERY property as a variable.

```css
/* Example: Complete wrapper component */
.wrapper {
    /* Display */
    --wrapper-display: block;
    --wrapper-position: static;
    
    /* Box Model */
    --wrapper-width: auto;
    --wrapper-height: auto;
    --wrapper-padding: var(--space-4);
    --wrapper-margin: 0;
    
    /* Visual */
    --wrapper-bg: transparent;
    --wrapper-color: inherit;
    --wrapper-border: none;
    --wrapper-radius: 0;
    --wrapper-shadow: none;
    
    /* Layout */
    --wrapper-overflow: visible;
    --wrapper-flex: none;
    --wrapper-flex-direction: row;
    --wrapper-align-items: stretch;
    --wrapper-justify-content: flex-start;
    
    /* Apply ALL variables */
    display: var(--wrapper-display);
    position: var(--wrapper-position);
    width: var(--wrapper-width);
    height: var(--wrapper-height);
    padding: var(--wrapper-padding);
    margin: var(--wrapper-margin);
    background: var(--wrapper-bg);
    color: var(--wrapper-color);
    border: var(--wrapper-border);
    border-radius: var(--wrapper-radius);
    box-shadow: var(--wrapper-shadow);
    overflow: var(--wrapper-overflow);
    flex: var(--wrapper-flex);
    flex-direction: var(--wrapper-flex-direction);
    align-items: var(--wrapper-align-items);
    justify-content: var(--wrapper-justify-content);
}
```

### Layer 3: Scopes (Context)
Scopes provide context-specific styling by ONLY setting variables.

```css
/* CORRECT: Scope only sets variables */
[data-scope="sidebar"] {
    /* Override wrapper in this context */
    --wrapper-bg: var(--bg-surface);
    --wrapper-height: 100vh;
    --wrapper-display: flex;
    --wrapper-flex-direction: column;
    
    /* Override layout */
    --layout-flex: 1;
    --layout-overflow: auto;
    
    /* Override header */
    --header-border-bottom: 1px solid var(--border-default);
}

/* WRONG: Never do this! */
[data-scope="sidebar"] .wrapper {
    background: red; /* NO! Use variables */
}
```

### Layer 4: Utilities (Helpers)
Minimal utilities for specific overrides.

```css
/* Only when absolutely necessary */
.hidden { display: none !important; }
.sr-only { position: absolute; width: 1px; height: 1px; clip: rect(0,0,0,0); }
```

## Implementation Rules

### 1. Component Creation Checklist
- [ ] Define EVERY possible CSS property as a variable
- [ ] Use semantic variable names (--component-property)
- [ ] Set sensible defaults using primitives
- [ ] Never hardcode values
- [ ] Apply all variables to their properties

### 2. Scope Creation Checklist
- [ ] Only set CSS variables
- [ ] Never use child selectors
- [ ] Place in correct cascade order (parent → child)
- [ ] Use data-scope attributes for selection
- [ ] Override only what's needed

### 3. HTML Structure Rules
```html
<!-- Semantic structure -->
<section class="section" data-scope="page">
    <div class="container">
        <header class="header">...</header>
        <main class="content">
            <div class="wrapper" data-scope="card">...</div>
        </main>
    </div>
</section>

<!-- Component modifiers use BEM-style -->
<button class="button button--primary button--large">
```

## Common Patterns

### Two-Column Layout
```css
/* Parent scope sets grid */
[data-scope="dashboard"] {
    --grid-columns: 300px 1fr;
    --grid-gap: 0;
}

/* Children just need scope */
<div class="grid">
    <aside data-scope="sidebar">...</aside>
    <main data-scope="content">...</main>
</div>
```

### Scrollable Content
```css
[data-scope="scrollable"] {
    --wrapper-height: 100vh;
    --wrapper-overflow: hidden;
    --layout-flex: 1;
    --layout-overflow: auto;
    --layout-min-height: 0;
}
```

### Responsive Sizing
```css
/* Define at scope level */
[data-scope="hero"] {
    --wrapper-padding: var(--space-4);
}

@media (min-width: 768px) {
    [data-scope="hero"] {
        --wrapper-padding: var(--space-8);
    }
}
```

## Debugging Guide

### Issue: Columns stacking instead of side-by-side
```css
/* Fix: Ensure grid is actually grid */
.grid {
    display: grid !important; /* Override if needed */
    grid-template-columns: 300px 1fr !important;
}
```

### Issue: No scrolling
```css
/* Fix: Proper flex/overflow setup */
.parent {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.scrollable {
    flex: 1;
    min-height: 0; /* Critical! */
    overflow: auto;
}
```

### Issue: Variables not applying
```css
/* Fix: Check cascade order */
/* Parent scopes must come BEFORE child scopes */
[data-scope="parent"] { /* First */ }
[data-scope="child"] { /* Second */ }
```

## Benefits of This System

1. **Infinite Flexibility** - Any value for any property without new classes
2. **AI-Friendly** - Just set variables, no complex selectors
3. **Maintainable** - Changes happen in scopes, not components
4. **Performant** - Minimal CSS, no duplication
5. **Scalable** - Add new contexts without touching base components
6. **Predictable** - Clear mental model and patterns

## For AI Agents

When implementing features:
1. Always check if a component exists before creating new ones
2. Never modify Layer 2 components directly - use scopes
3. Follow the variable naming convention: --component-property
4. Test with different scope combinations
5. Document any deviations from the pattern

Remember: **The power is in the variables, not the classes.**