# DESIGN SYSTEM FRAMEWORK - DETAILS

> **Working Example**: coming soon

## GLOBAL ELEMENT CRITERIA
- **Single UI element** (wrapper, title, button, text, link)
- **ALL properties defined** (background, padding, border, color, etc.)
- **Uses & Defines CSS variables** for complete themability and scope isolation overwriting.
- **NOT combinations** (no "card" - that's a scope)

## SCOPE CONCEPTS
- **Component Scopes**: Highly reusable grouped elements generic but semantic, ie. card, hero, modal, etc.
  - Example: Card wrapper `max-width: 300px`, Hero wrapper `max-width: 600px`
  - Example: Card title `1.2rem`, Hero title `3rem`
- **Helper Scopes**: Specific styling that can be applied to multiple scopes, ie. holiday, featured-agent/featured-property, etc.
  - Example: Holiday changes title color to red on any component
  - Example: Featured-agent and featured-property can be applied to a base card scope for specific styling but it can also be applied to a hero or any other scope. very powerful. define all styles for featured agents in one place. ie secondary bg color on profile image and secondary buttons. while featured property uses primary icons and primary buttons. 
- **Data Attributes**: `data-scope="hero"` and `data-helper="holiday"`
  - Highest specificity wins (last scope applied)

### Key Concept: Single Scope Application
Instead of multiple classes (`.card`, `.card-title`, `.card-description`), use one scope:
```css
[data-scope="card"] * {
  --title-color: var(--color1);
  --title-size: 1.2rem;
  --wrapper-max-width: 300px;
  --wrapper-padding: 1rem;
}
```

## CSS SYNTAX
```css
/* Global Element */
.title { 
  --title-color: var(--color-base);
  --title-size: var(--font-size-base);
  
  color: var(--title-color); 
  font-size: var(--title-size); 
}

/* Component Scope */
[data-scope="hero"] * {
  --title-size: calc(var(--font-size-base) * 3); /* Hero title scale */
}

/* Helper Scope */
[data-helper="holiday"] * {
  --title-color: var(--color4);
}
```

## CASCADE ORDER
1. **Brand Tokens** (`:root` variables)
2. **Global Elements** (`.title`, `.wrapper`)
3. **Component Scopes** (`[data-scope="hero"] *`)
4. **Helper Scopes** (`[data-helper="holiday"] *`)

## PLACEHOLDER/PRESET SYSTEM
- **Base Values**: `--color-base: hsl(0, 0%, 0%)`, `--font-size-base: 1rem`
- **Color Hydration**: Presets assign brand colors to placeholders
- **Mathematical Scaling**: `calc(var(--font-size-base) * 2.25)` for responsive sizing
- **Property Modification**: Lightness, saturation, spacing, layout values
- **See Example-5.html**: Live demonstration of all preset types working together 

## JSON OPERATIONS
- **set**: Direct replacement
- **adjust**: Add/subtract from current
- **multiply**: Scale current value
- **divide**: Reduce current value