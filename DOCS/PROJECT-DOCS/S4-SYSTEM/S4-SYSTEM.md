# S4 FRAMEWORK - 4-LAYER SCOPE SYSTEM

**CSS architecture with progressive enhancement through 4 layers**

---

## **LAYER 1: BRAND TOKENS**
Global color variables in `:root`

```css
:root {
    --color1: hsl(172, 50%, 40%);  /* Primary */
    --color2: hsl(92, 50%, 40%);   /* Secondary */  
    --color3: hsl(0, 0%, 50%);     /* Neutral */
    --color4: hsl(0, 0%, 50%);     /* Base */
    --color-base: hsla(0, 0%, 0%, 0); /* Placeholder */
}
```

## **LAYER 2: GLOBAL ELEMENTS COMPONENTS (GECs)**
Single UI elements: `.wrapper`, `.title`, `.button`

```css
.wrapper {
    --wrapper-bg: var(--color-base);
    --wrapper-padding: 4rem;
    background: var(--wrapper-bg);
    padding: var(--wrapper-padding);
}
```

## **LAYER 3: GLOBAL COMPONENT SCOPES (GCSs)**
Groups of elements working together: `[data-scope="hero"]`

```css
[data-scope="hero"] * {
    --wrapper-bg: var(--color1-300);
    --title-color: var(--color1-900);
    --title-size: 3rem;
}
```

## **LAYER 4: HELPER COMPONENT SCOPES (HCSs)**
Modifications and variants: `[data-helper="black-friday"]`

```css
[data-helper="black-friday"] * {
    --wrapper-bg: var(--color4-900);
    --title-color: var(--color3-50);
}
```

---

## **USAGE**

```html
<!-- Basic component -->
<div data-scope="hero">
    <div class="wrapper">
        <h1 class="title">Title</h1>
    </div>
</div>

<!-- With helper scope -->
<div data-scope="hero" data-helper="black-friday">
    <div class="wrapper">
        <h1 class="title">Sale Title</h1>
    </div>
</div>
```

---

## **EXAMPLES**

**S4-SYSTEM-Example-1.html** - Basic 4-layer system with hero + Black Friday helper  
**S4-SYSTEM-Example-2.html** - Advanced preset combinations

---

**Key Rule**: `[data-scope="name"] *` - The `*` selector makes variables cascade to all children


# S4 COLOR PRESET SYSTEM

## **Core Innovation: Hydration + Cascading**
You've created a **separation of concerns** between:
1. **Color Assignment** (which of color1-4 gets used)
2. **Color Modification** (mathematical adjustments to those colors)

## **The Hydration System**
- Elements start with `--base-color` placeholders (transparent)
- **Base Theme Presets** hydrate elements by assigning color1-4 (no modifications)
- **Helper Presets** apply mathematical modifications while preserving hue

## **Cascading Flexibility**
Both base themes AND helper presets can be applied at any level:
- Site-wide defaults
- Section overrides  
- Component overrides
- Element overrides

## **Current Goals**
1. **Build Example-2** with working preset system

## **Key Benefits**
- **Contextual theming**: Apply different presets to sections/components for visual variety
- **Mathematical consistency**: Helper presets automatically adapt to any base theme
- **Designer control**: Mix and match themes and modifications at any granularity
- **No framework lock-in**: Users control everything through their own color definitions