/**
 * S4 Preset Processor
 * Converts JSON preset definitions into CSS
 */

class S4PresetProcessor {
  constructor(presetData) {
    this.data = presetData;
    this.css = [];
  }

  /**
   * Generate all CSS from the preset data
   */
  generateCSS() {
    this.css = [];
    
    // 1. Generate brand tokens
    this.generateBrandTokens();
    
    // 2. Generate color presets
    this.generateColorPresets();
    
    // 3. Generate helper presets
    this.generateHelperPresets();
    
    // 4. Generate scope modifiers
    this.generateScopes();
    
    return this.css.join('\n\n');
  }

  /**
   * Generate CSS custom properties for brand tokens
   */
  generateBrandTokens() {
    const tokens = [':root {'];
    
    // Color tokens
    Object.entries(this.data.brandTokens.colors).forEach(([key, color]) => {
      tokens.push(`  --${key}: hsl(${color.h}, ${color.s}%, ${color.l}%);`);
      // Also generate component values for manual calculations
      tokens.push(`  --${key}-h: ${color.h};`);
      tokens.push(`  --${key}-s: ${color.s}%;`);
      tokens.push(`  --${key}-l: ${color.l}%;`);
    });
    
    tokens.push(`  --color-base: hsla(0, 0%, 0%, 0); /* Transparent placeholder */`);
    tokens.push('}');
    
    this.css.push(tokens.join('\n'));
  }

  /**
   * Generate CSS for color presets
   */
  generateColorPresets() {
    Object.entries(this.data.colorPresets).forEach(([presetKey, preset]) => {
      const rules = [`/* ${preset.name} - ${preset.description} */`];
      
      Object.entries(preset.assignments).forEach(([element, props]) => {
        const selector = `[data-preset="${presetKey}"] .${element}`;
        const properties = [];
        
        Object.entries(props).forEach(([prop, value]) => {
          if (value === 'transparent') {
            properties.push(`--${element}-${prop}: transparent;`);
          } else {
            properties.push(`--${element}-${prop}: var(--${value});`);
          }
        });
        
        if (properties.length > 0) {
          rules.push(`${selector} {\n  ${properties.join('\n  ')}\n}`);
        }
      });
      
      this.css.push(rules.join('\n'));
    });
  }

  /**
   * Generate CSS for helper presets
   */
  generateHelperPresets() {
    Object.entries(this.data.helperPresets).forEach(([category, presets]) => {
      this.css.push(`/* Helper Presets: ${category} */`);
      
      Object.entries(presets).forEach(([presetKey, preset]) => {
        const rules = [`/* ${preset.name} - ${preset.description} */`];
        
        Object.entries(preset.modifications).forEach(([element, mods]) => {
          const selector = element === 'all' 
            ? `[data-${category}="${presetKey}"] *` 
            : `[data-${category}="${presetKey}"] .${element}`;
          
          const properties = this.generateModifications(element, mods);
          
          if (properties.length > 0) {
            rules.push(`${selector} {\n  ${properties.join('\n  ')}\n}`);
          }
        });
        
        this.css.push(rules.join('\n'));
      });
    });
  }

  /**
   * Generate modification properties
   */
  generateModifications(element, mods) {
    const properties = [];
    
    // Handle opacity directly
    if (mods.opacity !== undefined) {
      properties.push(`opacity: ${mods.opacity};`);
    }
    
    // Handle HSL modifications
    if (mods.lightness || mods.saturation || mods.hue) {
      // For browsers that support relative colors
      const relativeColor = this.generateRelativeColor(element, mods);
      if (relativeColor) {
        properties.push(`--${element}-color: ${relativeColor};`);
      }
      
      // For manual HSL approach
      const manualHSL = this.generateManualHSL(element, mods);
      if (manualHSL) {
        properties.push(`/* Fallback: ${manualHSL} */`);
      }
    }
    
    return properties;
  }

  /**
   * Generate relative color syntax
   */
  generateRelativeColor(element, mods) {
    const parts = [];
    
    if (mods.hue) {
      parts.push(this.applyOperation('h', mods.hue));
    } else {
      parts.push('h');
    }
    
    if (mods.saturation) {
      parts.push(this.applyOperation('s', mods.saturation) + '%');
    } else {
      parts.push('s');
    }
    
    if (mods.lightness) {
      parts.push(this.applyOperation('l', mods.lightness) + '%');
    } else {
      parts.push('l');
    }
    
    return `hsl(from var(--${element}-color) ${parts.join(' ')})`;
  }

  /**
   * Apply mathematical operation
   */
  applyOperation(channel, mod) {
    switch (mod.operation) {
      case 'set':
        return mod.value;
      case 'adjust':
        return `calc(${channel} + ${mod.value})`;
      case 'multiply':
        return `calc(${channel} * ${mod.value})`;
      case 'divide':
        return `calc(${channel} / ${mod.value})`;
      default:
        return channel;
    }
  }

  /**
   * Generate manual HSL syntax for fallback
   */
  generateManualHSL(element, mods) {
    const h = mods.hue?.operation === 'set' ? mods.hue.value : `var(--${element}-color-h)`;
    const s = mods.saturation?.operation === 'set' ? `${mods.saturation.value}%` : `var(--${element}-color-s)`;
    const l = mods.lightness?.operation === 'set' ? `${mods.lightness.value}%` : `var(--${element}-color-l)`;
    
    return `hsl(${h}, ${s}, ${l})`;
  }

  /**
   * Generate scope modifiers
   */
  generateScopes() {
    Object.entries(this.data.scopes).forEach(([scopeType, scopes]) => {
      this.css.push(`/* Layout Scopes: ${scopeType} */`);
      
      Object.entries(scopes).forEach(([scopeKey, scope]) => {
        const rules = [`/* ${scope.name} */`];
        
        Object.entries(scope.modifiers).forEach(([element, mods]) => {
          const selector = `[data-scope="${scopeKey}"] .${element}`;
          const properties = [];
          
          if (mods.scale) {
            properties.push(`--${element}-scale: ${mods.scale};`);
          }
          
          if (properties.length > 0) {
            rules.push(`${selector} {\n  ${properties.join('\n  ')}\n}`);
          }
        });
        
        this.css.push(rules.join('\n'));
      });
    });
  }
}

// Export for use in browser or Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = S4PresetProcessor;
}