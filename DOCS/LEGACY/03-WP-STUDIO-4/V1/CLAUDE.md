# Studio4 Project Memory

## Project Vision
Studio4 is a **Visual Design System Builder** that creates production-ready, tokenized components for any website. Think of it as:
- **Token Studio for the Web** - Visual token editor that outputs real HTML/CSS
- **Design System Generator** - Creates reusable components with CSS custom properties
- **4-Layer Architecture** - Revolutionary approach to CSS organization
- **Production-Ready Output** - Clean code ready to drop into any project

## Core Philosophy: Everything is a Variable
Unlike traditional CSS frameworks with fixed utility classes, Studio4 uses **variable slots** - every CSS property on every component is a custom property that can accept ANY valid CSS value. This enables infinite design flexibility without creating new classes.

## ⚠️ CRITICAL: Two Separate Systems

### 1. **Studio4 UI System** (Pink/Tangerine theme)
- The editor's own interface (buttons, panels, sidebar)
- Uses `--studio4-primary` and `--studio4-accent` colors
- Located in: Main styles in `studio4.html`

### 2. **User's Design System** (What users create)
- The design system users build with Studio4
- Variable colors (default: aqua/terracotta/neutral/pink)
- Located in: `studio4-users.html` and generated content

**NEVER MIX THESE TWO SYSTEMS!**

## 🚨 CRITICAL DEVELOPMENT RULES

### ALWAYS:
1. **DELETE old CSS** - Never comment out or override
2. **Every property is a variable** - No exceptions
3. **Scopes ONLY set variables** - Never direct properties
4. **Clean structure** - One wrapper, not multiple nested
5. **Proper cascade order** - Parent scopes before child scopes

### NEVER:
1. **Never use child selectors in scopes** - `[data-scope] .class` is forbidden
2. **Never override with specificity** - Fix the root issue
3. **Never use inline styles** - Move to scopes
4. **Never hardcode values** - Always use CSS variables

## The 4-Layer Architecture

### Layer 1: Primitives (Design Tokens)
```css
:root {
    --studio4-primary: hsl(337, 35%, 52%);
    --space-1: 0.25rem;
    --text-sm: 0.875rem;
}
```

### Layer 2: Base Components (Structure)
```css
.button {
    /* Every property as a variable */
    --button-bg: var(--primary);
    --button-padding: var(--space-2) var(--space-4);
    --button-radius: var(--radius-md);
    /* ... ALL properties ... */
    
    /* Apply variables */
    background: var(--button-bg);
    padding: var(--button-padding);
    border-radius: var(--button-radius);
}
```

### Layer 3: Scopes (Context)
```css
/* Scopes ONLY set variables */
[data-scope="dashboard"] {
    --button-bg: var(--neutral-800);
    --wrapper-height: 100vh;
}
```

### Layer 4: Utilities (Minimal)
```css
.hidden { display: none !important; }
```

## Current Architecture

### HTML Structure
```html
<section class="section" data-scope="dashboard">
    <div class="container">
        <header class="header">
            <!-- Top bar with buttons -->
        </header>
        <div class="grid"> <!-- 2-column layout -->
            <div data-scope="sidebar">
                <div class="wrapper">
                    <header>Studio4 title & controls</header>
                    <div class="wrapper" id="themePanel">
                        <!-- Theme content -->
                    </div>
                    <footer><!-- empty for now --></footer>
                </div>
            </div>
            <div data-scope="preview">
                <!-- Preview area -->
            </div>
        </div>
    </div>
</section>
```

### Critical CSS Fixes
```css
/* Grid must use direct overrides (CSS variable limitation) */
[data-scope="dashboard"] .grid {
    display: grid !important;
    grid-template-columns: 400px 1fr !important;
    height: calc(100vh - 60px) !important;
}

/* Scrolling solution */
[data-scope="sidebar"] #themePanel {
    overflow-y: auto !important;
    flex: 1;
    min-height: 0;
}
```

## Features

### Core Editor
1. **Theme Panel** - Visual editing for design tokens
2. **Color System** - 4-color system with dynamic lightness
3. **Typography Editor** - Visual controls with presets
4. **Live Preview** - Real-time updates in iframe
5. **HTML/CSS Editing** - Toggle between preview and code

### Removed (for simplicity)
- Component management
- File system integration
- Inspector functionality
- Auto-save features

## Technical Implementation
- **Single-file architecture** - Everything in studio4.html
- **No external dependencies** - Pure HTML/CSS/JS
- **iframe isolation** - Clean preview separation
- **JSON presets** - Color and typography sharing

## Next Steps
1. Complete UI controls section
2. Add spacing scale editor
3. Enhance color system with saturation controls
4. Build component assembly interface
5. Add export pipeline for multiple formats

## For AI Agents
When working on Studio4:
1. Always check variable names match the component
2. Never modify Layer 2 components directly
3. Use scopes for ALL styling changes
4. Test with different scope combinations
5. Remember: The power is in the variables, not the classes

**Project Status**: Fresh start with clean architecture, ready for rapid development.