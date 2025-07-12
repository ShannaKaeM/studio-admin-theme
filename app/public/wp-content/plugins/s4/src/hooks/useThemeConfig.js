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

  // Apply CSS variables to document and shadow DOM
  useEffect(() => {
    // Apply to document root
    Object.entries(cssVariables).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });

    // Apply to Studio1 shadow DOM
    const studio1Element = document.querySelector('studio1-element');
    let styleElement;
    
    if (studio1Element && studio1Element.shadowRoot) {
      // Remove existing style element if any
      const existingStyle = studio1Element.shadowRoot.querySelector('#studio1-theme-vars');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      // Create new style element with CSS variables
      styleElement = document.createElement('style');
      styleElement.id = 'studio1-theme-vars';
      
      // Generate CSS for custom properties
      const customPropertiesCSS = Object.entries(cssVariables)
        .map(([property, value]) => `  ${property}: ${value};`)
        .join('\n');
      
      // Generate component CSS rules using .one element system
      const componentCSS = Object.entries(config.components)
        .map(([componentName, styles]) => {
          const cssRules = Object.entries(styles)
            .filter(([property, value]) => typeof value === 'string')
            .map(([property, value]) => `  ${property}: ${value};`)
            .join('\n');
          
          return cssRules ? `.${componentName} {\n${cssRules}\n}` : '';
        })
        .filter(Boolean)
        .join('\n\n');
      
      const cssText = `:host {\n${customPropertiesCSS}\n}\n\n${componentCSS}`;
      
      styleElement.textContent = cssText;
      studio1Element.shadowRoot.appendChild(styleElement);
    }

    return () => {
      // Cleanup: remove custom properties from document
      Object.keys(cssVariables).forEach(property => {
        document.documentElement.style.removeProperty(property);
      });
      
      // Remove style element from shadow root
      if (styleElement && styleElement.parentNode) {
        styleElement.remove();
      }
    };
  }, [cssVariables, config.components]);

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
    addCustomOverride,
    removeCustomOverride,
    exportConfig,
    importConfig,
    resetToDefault,
    syncNewComponents
  };
}

export default useThemeConfig;
