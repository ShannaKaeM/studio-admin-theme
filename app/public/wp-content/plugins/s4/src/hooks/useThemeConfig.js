import { useState, useEffect, useMemo } from 'react';

// Default Studio1 theme configuration
const defaultConfig = {
  theme: {
    name: "Studio1 - The One Element System",
    version: "1.0.0",
    description: "Revolutionary unified element system with ultimate flexibility"
  },
  colors: {
    // Grayscale foundation - single base color system
    grayscale: {
      50: "hsl(0, 0%, 97%)",
      100: "hsl(0, 0%, 93%)",
      200: "hsl(0, 0%, 85%)",
      300: "hsl(0, 0%, 73%)",
      400: "hsl(0, 0%, 58%)",
      500: "hsl(0, 0%, 50%)",  // Base foundation color
      600: "hsl(0, 0%, 42%)",
      700: "hsl(0, 0%, 35%)",
      800: "hsl(0, 0%, 25%)",
      900: "hsl(0, 0%, 15%)",
      950: "hsl(0, 0%, 8%)"
    }
  },
  // Color Book - HSLA adjustment system
  colorBook: {
    baseColor: "hsl(0, 0%, 50%)",  // Single foundation color
    presets: {
      // Color presets will be defined here
      // Each preset modifies H/S/L/A of the base color
    }
  },
  components: {
    // Studio1 components using .one element system with grayscale foundation
    "theme-builder": {
      "--one-background": "var(--grayscale-950)",
      "--one-border": "1px solid var(--grayscale-800)",
      "--one-padding": "1.5rem",
      "--one-color": "var(--grayscale-100)"
    },
    "nav-tab": {
      "--one-background": "var(--grayscale-900)",
      "--one-border": "1px solid var(--grayscale-700)",
      "--one-padding": "0.75rem 1rem",
      "--one-color": "var(--grayscale-300)",
      "--one-font-weight": "500"
    },
    "nav-tab-active": {
      "--one-background": "var(--grayscale-500)",  // Will be modified by Color Book presets
      "--one-color": "var(--grayscale-50)",
      "--one-border": "1px solid var(--grayscale-600)"
    },
    "color-card": {
      "--one-background": "var(--grayscale-900)",
      "--one-border": "1px solid var(--grayscale-700)",
      "--one-padding": "1rem",
      "--one-border-radius": "0.5rem",
      "--one-color": "var(--grayscale-200)"
    },
    "input-field": {
      "--one-background": "var(--grayscale-800)",
      "--one-border": "1px solid var(--grayscale-600)",
      "--one-padding": "0.5rem 0.75rem",
      "--one-border-radius": "0.25rem",
      "--one-color": "var(--grayscale-100)",
      "--one-font-size": "0.875rem"
    },
    "button-primary": {
      "--one-background": "var(--grayscale-500)",  // Will be modified by Color Book presets
      "--one-border": "1px solid var(--grayscale-600)",
      "--one-padding": "0.75rem 1.5rem",
      "--one-border-radius": "0.375rem",
      "--one-color": "var(--grayscale-50)",
      "--one-font-weight": "600"
    },
    "button-secondary": {
      "--one-background": "var(--grayscale-700)",
      "--one-border": "1px solid var(--grayscale-600)",
      "--one-padding": "0.75rem 1.5rem",
      "--one-border-radius": "0.375rem",
      "--one-color": "var(--grayscale-200)",
      "--one-font-weight": "500"
    }
  },
  scopes: {
    // Individual scopes with grayscale foundation - Color Book will modify these
    "eyebrow": {
      baseProperties: {
        "--one-display": "block",
        "--one-font-family": "var(--font-family)",
        "--one-font-size": "0.875rem",
        "--one-font-weight": "500",
        "--one-line-height": "1.3",
        "--one-color": "var(--grayscale-800)",  // Will be modified by Color Book
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
        "--one-color": "var(--grayscale-800)",  // Will be modified by Color Book
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
        "--one-color": "var(--grayscale-800)",  // Will be modified by Color Book
        "--one-margin": "0",
        "--one-margin-bottom": "1rem"
      }
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
    
    // Grayscale foundation variables
    Object.entries(config.colors.grayscale || {}).forEach(([weight, value]) => {
      variables[`--grayscale-${weight}`] = value;
    });
    
    // Color Book base color
    if (config.colorBook?.baseColor) {
      variables[`--base-color`] = config.colorBook.baseColor;
    }

    // Color Book presets - will be implemented here
    // TODO: Add Color Book preset system
    
    return variables;
  }, [config.colors, config.colorBook]);

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

  const updateGrayscaleColor = (weight, newColor) => {
    setConfig(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        grayscale: {
          ...prev.colors.grayscale,
          [weight]: newColor
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

  // Color Book functions
  const updateBaseColor = (newBaseColor) => {
    setConfig(prev => ({
      ...prev,
      colorBook: {
        ...prev.colorBook,
        baseColor: newBaseColor
      }
    }));
  };

  const createColorPreset = (presetName, hslaAdjustments) => {
    setConfig(prev => ({
      ...prev,
      colorBook: {
        ...prev.colorBook,
        presets: {
          ...prev.colorBook.presets,
          [presetName]: hslaAdjustments
        }
      }
    }));
  };

  const deleteColorPreset = (presetName) => {
    setConfig(prev => ({
      ...prev,
      colorBook: {
        ...prev.colorBook,
        presets: Object.fromEntries(
          Object.entries(prev.colorBook.presets || {})
            .filter(([name]) => name !== presetName)
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
    updateGrayscaleColor,
    updateComponent,
    updateScopeBaseProperties,
    createNewScope,
    deleteScope,
    // Color Book functions
    updateBaseColor,
    createColorPreset,
    deleteColorPreset,
    addCustomOverride,
    removeCustomOverride,
    exportConfig,
    importConfig,
    resetToDefault,
    syncNewComponents
  };
}

export default useThemeConfig;
