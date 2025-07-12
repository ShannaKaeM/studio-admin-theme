import { useState, useEffect, useMemo } from 'react';

// Default S4 theme configuration
const defaultConfig = {
  theme: {
    name: "S4 Design System",
    version: "2.0.0",
    description: "Preset-driven design system with CSS custom properties"
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
    // Example components using .box and .text system
    "theme-builder": {
      "--box-background": "var(--color3-950)",
      "--box-border": "1px solid var(--color3-800)",
      "--box-padding": "1.5rem",
      "--text-color": "var(--color4-100)"
    },
    "nav-tab": {
      "--box-background": "var(--color3-900)",
      "--box-border": "1px solid var(--color3-700)",
      "--box-padding": "0.75rem 1rem",
      "--text-color": "var(--color4-300)",
      "--text-font-weight": "500"
    },
    "nav-tab-active": {
      "--box-background": "var(--color1-500)",
      "--text-color": "var(--color4-50)",
      "--box-border": "1px solid var(--color1-400)"
    },
    "color-card": {
      "--box-background": "var(--color3-900)",
      "--box-border": "1px solid var(--color3-700)",
      "--box-padding": "1rem",
      "--box-border-radius": "0.5rem",
      "--text-color": "var(--color4-200)"
    },
    "input-field": {
      "--box-background": "var(--color3-800)",
      "--box-border": "1px solid var(--color3-600)",
      "--box-padding": "0.5rem 0.75rem",
      "--box-border-radius": "0.25rem",
      "--text-color": "var(--color4-100)",
      "--text-font-size": "0.875rem"
    },
    "button-primary": {
      "--box-background": "var(--color1-500)",
      "--box-border": "1px solid var(--color1-400)",
      "--box-padding": "0.75rem 1.5rem",
      "--box-border-radius": "0.375rem",
      "--text-color": "var(--color4-50)",
      "--text-font-weight": "600"
    },
    "button-secondary": {
      "--box-background": "var(--color3-700)",
      "--box-border": "1px solid var(--color3-600)",
      "--box-padding": "0.75rem 1.5rem",
      "--box-border-radius": "0.375rem",
      "--text-color": "var(--color4-200)",
      "--text-font-weight": "500"
    }
  }
};

/**
 * Custom hook for managing S4 theme configuration
 * Integrates with CSS custom properties and .box/.text system
 */
export function useThemeConfig() {
  // Load from localStorage on initialization
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('s4-theme-config');
      return saved ? JSON.parse(saved) : defaultConfig;
    } catch {
      return defaultConfig;
    }
  });
  
  const [customOverrides, setCustomOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem('s4-theme-overrides');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persist config changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('s4-theme-config', JSON.stringify(config));
    } catch (error) {
      console.warn('Failed to save theme config:', error);
    }
  }, [config]);

  // Persist override changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('s4-theme-overrides', JSON.stringify(customOverrides));
    } catch (error) {
      console.warn('Failed to save theme overrides:', error);
    }
  }, [customOverrides]);

  // Generate CSS custom properties from JSON config
  const cssVariables = useMemo(() => {
    const variables = {};
    
    // Color variables - convert to S4 naming convention
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

    // Apply to S4 shadow DOM
    const s4Element = document.querySelector('s4-element');
    let styleElement;
    
    if (s4Element && s4Element.shadowRoot) {
      // Remove existing style element if any
      const existingStyle = s4Element.shadowRoot.querySelector('#s4-theme-vars');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      // Create new style element with CSS variables
      styleElement = document.createElement('style');
      styleElement.id = 's4-theme-vars';
      
      // Generate CSS for custom properties
      const customPropertiesCSS = Object.entries(cssVariables)
        .map(([property, value]) => `  ${property}: ${value};`)
        .join('\n');
      
      // Generate component CSS rules using .box and .text system
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
      s4Element.shadowRoot.appendChild(styleElement);
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
