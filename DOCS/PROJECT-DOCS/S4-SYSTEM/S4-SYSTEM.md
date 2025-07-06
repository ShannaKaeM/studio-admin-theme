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

**Hydration system for dynamic color assignment**

---

## **HOW IT WORKS**

1. **GECs use placeholders**: All color properties set to `--color-base` (transparent)
2. **Presets assign colors**: Map color1-4 to specific properties
3. **Apply via data attribute**: `data-preset="name"` activates hydration

## **SYNTAX**

```css
/* GEC with placeholder */
.wrapper {
    --wrapper-bg: var(--color-base);
}

/* Preset assigns color */
[data-preset="default-colors"] .wrapper {
    --wrapper-bg: var(--color3);
}
```

## **KEY RULES**

- Target specific classes: `[data-preset="name"] .class`
- NOT universal selector: `[data-preset="name"] *`
- Presets only assign base colors (no modifications yet)

## **CASCADE HIERARCHY**

1. **Body preset**: Base hydration for all elements
2. **Element preset**: Override parent preset on specific elements  
3. **Component scope**: Component-specific styling
4. **Helper scope**: Final overrides

## **GRANULAR APPLICATION**

```html
<body data-preset="emphasis-colors">
    <div data-scope="hero">
        <section data-preset="default-colors">  <!-- Override just this element -->
```

## **EXAMPLES**

- **S4-SYSTEM-Example-2.html**: Preset hydration + granular application
- **S4-SYSTEM-Example-3.html**: Helper presets with hierarchy modifications
- **S4-SYSTEM-Example-4.html**: JSON-based preset system with live controls

---

# S4 JSON-BASED ARCHITECTURE

**All UI interactions and theme editing use JSON as the primary data format**

---

## **JSON STRUCTURE**

```json
{
  "brandTokens": {
    "colors": { "color1": { "h": 172, "s": 50, "l": 40 } }
  },
  "colorPresets": {
    "default-colors": {
      "assignments": { "title": { "color": "color3" } }
    }
  },
  "helperPresets": {
    "typography": {
      "hierarchy": {
        "modifications": {
          "title": { "lightness": { "operation": "set", "value": 90 } }
        }
      }
    }
  },
  "layoutPresets": { ... },
  "scopes": { ... }
}
```

## **BENEFITS**

- **React State Management**: Direct mapping to Redux/Zustand
- **Dynamic CSS Generation**: Real-time conversion from JSON to CSS
- **Visual Builder**: UI controls modify JSON, CSS updates automatically
- **Import/Export**: Portable preset configurations
- **Database Storage**: Save as JSON in WordPress

## **IMPLEMENTATION**

- **s4-presets.json**: Complete preset definitions
- **S4PresetProcessor**: JavaScript class for JSON→CSS conversion
- **Live Updates**: Changes apply instantly without page reload

## **OPERATIONS**

Mathematical operations for color/layout modifications:
- `set`: Direct value replacement
- `adjust`: Add/subtract from current
- `multiply`: Scale current value
- `divide`: Reduce current value

---

**Ready for Plugin**: Complete JSON system for React implementation

