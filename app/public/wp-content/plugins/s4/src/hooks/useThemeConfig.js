import { useState, useEffect, useMemo } from 'react';

// Default Studio1 theme configuration
const defaultConfig = {
  theme: {
    name: "Studio1 - The One Element System",
    version: "1.0.0",
    description: "Revolutionary unified element system with ultimate flexibility"
  },
  colors: {
    brand: {
      color1: {
        50: "hsl(337, 35%, 95%)",
        100: "hsl(337, 35%, 90%)",
        200: "hsl(337, 35%, 80%)",
        300: "hsl(337, 35%, 70%)",
        400: "hsl(337, 35%, 60%)",
        500: "hsl(337, 35%, 52%)",
        600: "hsl(337, 35%, 45%)",
        700: "hsl(337, 35%, 35%)",
        800: "hsl(337, 35%, 25%)",
        900: "hsl(337, 35%, 15%)",
        950: "hsl(337, 35%, 8%)"
      },
      color2: {
        50: "hsl(29, 44%, 95%)",
        100: "hsl(29, 44%, 90%)",
        200: "hsl(29, 44%, 80%)",
        300: "hsl(29, 44%, 70%)",
        400: "hsl(29, 44%, 60%)",
        500: "hsl(29, 44%, 53%)",
        600: "hsl(29, 44%, 45%)",
        700: "hsl(29, 44%, 35%)",
        800: "hsl(29, 44%, 25%)",
        900: "hsl(29, 44%, 15%)",
        950: "hsl(29, 44%, 8%)"
      },
      color3: {
        50: "hsl(0, 0%, 95%)",
        100: "hsl(0, 0%, 90%)",
        200: "hsl(0, 0%, 80%)",
        300: "hsl(0, 0%, 70%)",
        400: "hsl(0, 0%, 60%)",
        500: "hsl(0, 0%, 50%)",
        600: "hsl(0, 0%, 40%)",
        700: "hsl(0, 0%, 30%)",
        800: "hsl(0, 0%, 20%)",
        900: "hsl(0, 0%, 10%)",
        950: "hsl(0, 0%, 5%)"
      },
      color4: {
        50: "hsl(0, 0%, 100%)",
        100: "hsl(0, 0%, 98%)",
        200: "hsl(0, 0%, 95%)",
        300: "hsl(0, 0%, 90%)",
        400: "hsl(0, 0%, 80%)",
        500: "hsl(0, 0%, 70%)",
        600: "hsl(0, 0%, 60%)",
        700: "hsl(0, 0%, 50%)",
        800: "hsl(0, 0%, 40%)",
        900: "hsl(0, 0%, 20%)",
        950: "hsl(0, 0%, 10%)"
      }
    }
  },
  components: {
    // Studio1 components using .one element system with --one- variables
    "theme-builder": {
      "--one-background": "var(--color3-950)",
      "--one-border": "1px solid var(--color3-800)",
      "--one-padding": "1.5rem",
      "--one-color": "var(--color4-100)"
    },
    "nav-tab": {
      "--one-background": "var(--color3-900)",
      "--one-border": "1px solid var(--color3-700)",
      "--one-padding": "0.75rem 1rem",
      "--one-color": "var(--color4-300)",
      "--one-font-weight": "500"
    },
    "nav-tab-active": {
      "--one-background": "var(--color1-500)",
      "--one-color": "var(--color4-50)",
      "--one-border": "1px solid var(--color1-400)"
    },
    "color-card": {
      "--one-background": "var(--color3-900)",
      "--one-border": "1px solid var(--color3-700)",
      "--one-padding": "1rem",
      "--one-border-radius": "0.5rem",
      "--one-color": "var(--color4-200)"
    },
    "input-field": {
      "--one-background": "var(--color3-800)",
      "--one-border": "1px solid var(--color3-600)",
      "--one-padding": "0.5rem 0.75rem",
      "--one-border-radius": "0.25rem",
      "--one-color": "var(--color4-100)",
      "--one-font-size": "0.875rem"
    },
    "button-primary": {
      "--one-background": "var(--color1-500)",
      "--one-border": "1px solid var(--color1-400)",
      "--one-padding": "0.75rem 1.5rem",
      "--one-border-radius": "0.375rem",
      "--one-color": "var(--color4-50)",
      "--one-font-weight": "600"
    },
    "button-secondary": {
      "--one-background": "var(--color3-700)",
      "--one-border": "1px solid var(--color3-600)",
      "--one-padding": "0.75rem 1.5rem",
      "--one-border-radius": "0.375rem",
      "--one-color": "var(--color4-200)",
      "--one-font-weight": "500"
    }
  },
  scopes: {
    // Individual scopes with styling baked in
    "eyebrow": {
      baseProperties: {
        "--one-display": "block",
        "--one-font-family": "var(--font-family)",
        "--one-font-size": "0.875rem",
        "--one-font-weight": "500",
        "--one-line-height": "1.3",
        "--one-color": "var(--color3-800)",
        "--one-text-transform": "uppercase",
        "--one-letter-spacing": "0.05em",
        "--one-margin": "0",
        "--one-margin-bottom": "0.5rem"
      }
    },
    "title": {
      baseProperties: {
        "--one-display": "block",
        "--one-font-family": "var(--font-family)",
        "--one-font-size": "2.5rem",
        "--one-font-weight": "700",
        "--one-line-height": "1.1",
        "--one-color": "var(--color3-800)",
        "--one-margin": "0",
        "--one-margin-bottom": "1rem"
      }
    },
    "subtitle": {
      baseProperties: {
        "--one-display": "block",
        "--one-font-family": "var(--font-family)",
        "--one-font-size": "1.125rem",
        "--one-font-weight": "400",
        "--one-line-height": "1.5",
        "--one-color": "var(--color3-800)",
        "--one-margin": "0",
        "--one-margin-bottom": "1rem"
      }
    }
  },
  colorVariations: {
    // Custom color variations will be saved here
    // color1: { "Dark Primary": "hsl(337, 35%, 35%)", "Light Primary": "hsl(337, 35%, 70%)" }
    // color2: { "Dark Secondary": "hsl(29, 44%, 35%)" }
    // etc.
  }
};

/**
 * Custom hook for managing Studio1 theme configuration
 * Integrates with CSS custom properties and .one element system
 */
export function useThemeConfig() {
  // Load from localStorage on initialization
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('studio1-theme-config');
      return saved ? JSON.parse(saved) : defaultConfig;
    } catch {
      return defaultConfig;
    }
  });
  
  const [customOverrides, setCustomOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem('studio1-theme-overrides');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persist config changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('studio1-theme-config', JSON.stringify(config));
    } catch (error) {
      console.warn('Failed to save theme config:', error);
    }
  }, [config]);

  // Persist override changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('studio1-theme-overrides', JSON.stringify(customOverrides));
    } catch (error) {
      console.warn('Failed to save theme overrides:', error);
    }
  }, [customOverrides]);

  // Generate CSS custom properties from JSON config
  const cssVariables = useMemo(() => {
    const variables = {};
    
    // Color variables - convert to Studio1 naming convention
    Object.entries(config.colors.brand).forEach(([colorName, scale]) => {
      Object.entries(scale).forEach(([weight, value]) => {
        variables[`--${colorName}-${weight}`] = value;
      });
    });
    
    return variables;
  }, [config.colors]);

  // Apply CSS variables and component styles to document
  useEffect(() => {
    // Apply CSS variables to document root
    Object.entries(cssVariables).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });

    // Remove existing Studio1 component styles
    const existingStyle = document.head.querySelector('#studio1-component-styles');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create new style element for component styles
    const styleElement = document.createElement('style');
    styleElement.id = 'studio1-component-styles';
    
    // Generate component CSS rules using .one element system with component class names
    const componentCSS = Object.entries(config.components)
      .map(([componentName, styles]) => {
        const cssRules = Object.entries(styles)
          .filter(([property, value]) => typeof value === 'string')
          .map(([property, value]) => `  ${property}: ${value};`)
          .join('\n');
        
        return cssRules ? `.${componentName} {\n${cssRules}\n}` : '';
      })
      .filter(Boolean);

    // Generate scope CSS rules
    const scopeCSS = Object.entries(config.scopes || {})
      .map(([scopeName, scopeConfig]) => {
        // Properties for the scope
        if (scopeConfig.baseProperties) {
          const scopeRules = Object.entries(scopeConfig.baseProperties)
            .filter(([property, value]) => typeof value === 'string')
            .map(([property, value]) => `  ${property}: ${value};`)
            .join('\n');
          
          if (scopeRules) {
            return `[data-scope="${scopeName}"] .one {\n${scopeRules}\n}`;
          }
        }
        
        return null;
      })
      .filter(Boolean);

    // Combine component and scope CSS
    const allCSS = [...componentCSS, ...scopeCSS].join('\n\n');
    
    // Only add the style element if we have CSS
    if (allCSS) {
      styleElement.textContent = allCSS;
      document.head.appendChild(styleElement);
    }

    return () => {
      // Cleanup: remove component styles from document head
      const existingStyle = document.head.querySelector('#studio1-component-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [cssVariables, config.components, config.scopes]);

  // Helper functions for component styling
  const getComponentStyles = (componentName, variant = 'default') => {
    const component = config.components[componentName];
    if (!component) return {};

    if (variant === 'default') {
      return component;
    }

    return component[variant] || component;
  };

  const updateColorScale = (colorName, newScale) => {
    setConfig(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        brand: {
          ...prev.colors.brand,
          [colorName]: newScale
        }
      }
    }));
  };

  const updateComponent = (componentName, newStyles) => {
    setConfig(prev => ({
      ...prev,
      components: {
        ...prev.components,
        [componentName]: newStyles
      }
    }));
  };


  const updateScopeBaseProperties = (scopeName, newBaseProperties) => {
    setConfig(prev => ({
      ...prev,
      scopes: {
        ...prev.scopes,
        [scopeName]: {
          ...prev.scopes[scopeName],
          baseProperties: newBaseProperties
        }
      }
    }));
  };

  const createNewScope = (scopeName, baseProperties = {}) => {
    setConfig(prev => ({
      ...prev,
      scopes: {
        ...prev.scopes,
        [scopeName]: {
          baseProperties: baseProperties
        }
      }
    }));
  };

  const deleteScope = (scopeName) => {
    setConfig(prev => {
      const newScopes = { ...prev.scopes };
      delete newScopes[scopeName];
      return {
        ...prev,
        scopes: newScopes
      };
    });
  };

  const createColorVariation = (coreColor, variationName, hslValue) => {
    setConfig(prev => ({
      ...prev,
      colorVariations: {
        ...prev.colorVariations,
        [coreColor]: {
          ...(prev.colorVariations?.[coreColor] || {}),
          [variationName]: hslValue
        }
      }
    }));
  };

  const updateColorVariations = (coreColor, variations) => {
    setConfig(prev => ({
      ...prev,
      colorVariations: {
        ...(prev.colorVariations || {}),
        [coreColor]: variations
      }
    }));
  };

  const deleteColorVariation = (coreColor, variationName) => {
    setConfig(prev => ({
      ...prev,
      colorVariations: {
        ...(prev.colorVariations || {}),
        [coreColor]: Object.fromEntries(
          Object.entries(prev.colorVariations?.[coreColor] || {})
            .filter(([name]) => name !== variationName)
        )
      }
    }));
  };


  const addCustomOverride = (selector, styles) => {
    setCustomOverrides(prev => ({
      ...prev,
      [selector]: styles
    }));
  };

  const removeCustomOverride = (selector) => {
    setCustomOverrides(prev => {
      const newOverrides = { ...prev };
      delete newOverrides[selector];
      return newOverrides;
    });
  };

  const exportConfig = () => {
    return JSON.stringify(config, null, 2);
  };

  const importConfig = (configJson) => {
    try {
      const newConfig = JSON.parse(configJson);
      setConfig(newConfig);
      return true;
    } catch {
      return false;
    }
  };

  const resetToDefault = () => {
    setConfig(defaultConfig);
    setCustomOverrides({});
  };

  const syncNewComponents = () => {
    // Merge new components from default config without losing custom edits
    setConfig(prev => ({
      ...prev,
      components: {
        ...defaultConfig.components,
        ...prev.components
      }
    }));
  };

  return {
    config,
    cssVariables,
    customOverrides,
    getComponentStyles,
    updateColorScale,
    updateComponent,
    updateScopeBaseProperties,
    createNewScope,
    deleteScope,
    createColorVariation,
    updateColorVariations,
    deleteColorVariation,
    addCustomOverride,
    removeCustomOverride,
    exportConfig,
    importConfig,
    resetToDefault,
    syncNewComponents
  };
}

export default useThemeConfig;
