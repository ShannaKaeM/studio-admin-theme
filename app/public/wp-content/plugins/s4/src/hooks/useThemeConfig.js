import { useState, useEffect, useMemo } from 'react';

// Clean default S4 theme configuration - completely empty to start
const defaultConfig = {
  theme: {
    name: "Studio1 - The One Element System",
    version: "1.0.0",
    description: "Revolutionary unified element system with ultimate flexibility"
  },
  colors: {
    // Empty - no predefined colors
  },
  components: {
    // Empty - no predefined components, users create their own
  },
  scopes: {
    // Empty - complete creative freedom, users create their own 1Blocks
  }
};

/**
 * Custom hook for managing Studio1 theme configuration
 * 
 * PURPOSE: User content management (scopes, components, export/import)
 * SCOPE: User-created 1Blocks, localStorage persistence, CSS injection
 * SEPARATION: Works independently of useStudio1Store (UI + WordPress integration)
 * 
 * Integrates with CSS custom properties and .one element system
 */
export function useThemeConfig() {
  // Load from localStorage on initialization
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('studio1-theme-config');
      if (saved) {
        const parsedConfig = JSON.parse(saved);
        // Remove any legacy colorBook references from existing config
        if (parsedConfig.colorBook) {
          delete parsedConfig.colorBook;
          // Save cleaned config back to localStorage
          localStorage.setItem('studio1-theme-config', JSON.stringify(parsedConfig));
        }
        return parsedConfig;
      }
      return defaultConfig;
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
    
    // No colorBook system - variables generated from scopes and components only
    
    return variables;
  }, [config]);

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
            // Fixed: Apply styles directly to elements with both data-scope and .one class
            return `.one[data-scope="${scopeName}"] {\n${scopeRules}\n}`;
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

  // Removed updateGrayscaleColor - no longer needed

  const updateComponent = (componentName, newStyles) => {
    setConfig(prev => ({
      ...prev,
      components: {
        ...prev.components,
        [componentName]: newStyles
      }
    }));
  };

  const deleteComponent = (componentName) => {
    setConfig(prev => {
      const newComponents = { ...prev.components };
      delete newComponents[componentName];
      return {
        ...prev,
        components: newComponents
      };
    });
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

  // Color management - now handled directly in scopes and components


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
    // Clear all localStorage data to remove legacy components and colorBook references
    localStorage.removeItem('studio1-theme-config');
    localStorage.removeItem('studio1-theme-overrides');
    localStorage.removeItem('studio1-color-variations');
    localStorage.removeItem('studio1-collections');
    localStorage.removeItem('studio1-color-book'); // Clear any old colorBook data
    
    // Reset to clean default state (no colorBook)
    setConfig(defaultConfig);
    setCustomOverrides({});
  };

  const clearOldColorVariations = () => {
    // Clear old color variations from localStorage
    localStorage.removeItem('studio1-color-variations');
    // Remove only color variations from config, keep everything else
    setConfig(prev => ({
      ...prev,
      colorVariations: {}  // Only clear color variations, keep scopes and other config
    }));
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
    updateComponent,
    deleteComponent,
    updateScopeBaseProperties,
    createNewScope,
    deleteScope,
    clearOldColorVariations,
    addCustomOverride,
    removeCustomOverride,
    exportConfig,
    importConfig,
    resetToDefault,
    syncNewComponents
  };
}

export default useThemeConfig;
