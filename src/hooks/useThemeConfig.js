import { useState, useEffect, useMemo } from 'react';
import themeConfig from '../config/ui-theme-config.json';

/**
 * Custom hook for managing dynamic theme configuration
 * Allows real-time editing of UI styles through JSON configuration
 */
export function useThemeConfig() {
  // Load from localStorage on initialization
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('studio4-ui-theme-config');
      return saved ? JSON.parse(saved) : themeConfig;
    } catch {
      return themeConfig;
    }
  });
  
  const [customOverrides, setCustomOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem('studio4-ui-theme-overrides');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persist config changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('studio4-ui-theme-config', JSON.stringify(config));
    } catch (error) {
      console.warn('Failed to save theme config:', error);
    }
  }, [config]);

  // Persist override changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('studio4-ui-theme-overrides', JSON.stringify(customOverrides));
    } catch (error) {
      console.warn('Failed to save theme overrides:', error);
    }
  }, [customOverrides]);

  // Generate CSS custom properties from JSON config
  const cssVariables = useMemo(() => {
    const variables = {};
    
    // Color variables
    Object.entries(config.colors.brand).forEach(([colorName, scale]) => {
      Object.entries(scale).forEach(([weight, value]) => {
        variables[`--color-${colorName}-${weight}`] = value;
      });
    });

    // Semantic color variables
    Object.entries(config.colors.semantic).forEach(([name, value]) => {
      const kebabName = name.replace(/([A-Z])/g, '-$1').toLowerCase();
      variables[`--color-${kebabName}`] = value;
    });

    // Typography variables
    Object.entries(config.typography.fontSize).forEach(([size, value]) => {
      variables[`--font-size-${size}`] = value;
    });

    Object.entries(config.typography.fontWeight).forEach(([weight, value]) => {
      variables[`--font-weight-${weight}`] = value;
    });

    // Spacing variables
    Object.entries(config.spacing).forEach(([size, value]) => {
      variables[`--spacing-${size}`] = value;
    });

    // Border radius variables
    Object.entries(config.borderRadius).forEach(([size, value]) => {
      variables[`--border-radius-${size}`] = value;
    });

    // Custom properties
    variables['--gradient-primary'] = config.customProperties.gradients.primary;
    variables['--gradient-primary-subtle'] = config.customProperties.gradients.primarySubtle;
    
    Object.entries(config.customProperties.borders.width).forEach(([size, value]) => {
      variables[`--border-width-${size}`] = value;
    });

    // Apply custom overrides
    return { ...variables, ...customOverrides };
  }, [config, customOverrides]);

  // Apply CSS variables to shadow root and document
  useEffect(() => {
    // Apply to document root
    Object.entries(cssVariables).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });

    // Also inject into shadow DOM via a style element
    const studio4Element = document.querySelector('studio4-builder');
    let styleElement;
    
    if (studio4Element && studio4Element.shadowRoot) {
      // Remove existing style element if any
      const existingStyle = studio4Element.shadowRoot.querySelector('#dynamic-theme-vars');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      // Create new style element with CSS variables
      styleElement = document.createElement('style');
      styleElement.id = 'dynamic-theme-vars';
      
      // Generate CSS for custom properties and component styles
      const customPropertiesCSS = Object.entries(cssVariables)
        .map(([property, value]) => `  ${property}: ${value};`)
        .join('\n');
      
      // Generate component CSS rules
      const componentCSS = Object.entries(config.components)
        .map(([componentName, styles]) => {
          const cssRules = Object.entries(styles)
            .filter(([property, value]) => typeof value === 'string') // Only include string values, skip nested objects
            .map(([property, value]) => {
              // Convert camelCase to kebab-case for CSS
              const cssProp = property.replace(/([A-Z])/g, '-$1').toLowerCase();
              return `  ${cssProp}: ${value};`;
            })
            .join('\n');
          
          let css = cssRules ? `.${componentName} {\n${cssRules}\n}` : '';
          
          
          // Add hover state for accordion-trigger
          if (componentName === 'accordion-trigger' && config.components['accordion-trigger-hover']) {
            const hoverRules = Object.entries(config.components['accordion-trigger-hover'])
              .filter(([property, value]) => typeof value === 'string')
              .map(([property, value]) => {
                const cssProp = property.replace(/([A-Z])/g, '-$1').toLowerCase();
                return `  ${cssProp}: ${value};`;
              })
              .join('\n');
            
            if (hoverRules) {
              css += `\n\n.${componentName}:hover {\n${hoverRules}\n}`;
            }
          }
          
          // Add hover states for other components
          const hoverComponents = ['sidebar-nav-button', 'preview-mode-button', 'color-card'];
          if (hoverComponents.includes(componentName) && config.components[`${componentName}-hover`]) {
            const hoverRules = Object.entries(config.components[`${componentName}-hover`])
              .filter(([property, value]) => typeof value === 'string')
              .map(([property, value]) => {
                const cssProp = property.replace(/([A-Z])/g, '-$1').toLowerCase();
                return `  ${cssProp}: ${value};`;
              })
              .join('\n');
            
            if (hoverRules) {
              css += `\n\n.${componentName}:hover {\n${hoverRules}\n}`;
            }
          }
          
          return css;
        })
        .filter(Boolean)
        .join('\n\n');
      
      // Add pulse animation
      const animationCSS = `
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}`;
      
      const cssText = `:host {\n${customPropertiesCSS}\n}\n\n${animationCSS}\n\n${componentCSS}`;
      
      styleElement.textContent = cssText;
      studio4Element.shadowRoot.appendChild(styleElement);
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
  }, [cssVariables]);

  // Helper functions for component styling
  const getComponentStyles = (componentName, variant = 'default') => {
    const component = config.components[componentName];
    if (!component) return {};

    if (variant === 'default') {
      return component;
    }

    return component[variant] || component;
  };

  const getColorValue = (colorPath) => {
    const [colorName, weight] = colorPath.split('-');
    return config.colors.brand[colorName]?.[weight] || colorPath;
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

  const updateComponent = (componentName, styles) => {
    setConfig(prev => ({
      ...prev,
      components: {
        ...prev.components,
        [componentName]: styles // Replace entirely instead of merging
      }
    }));
  };

  const addCustomOverride = (property, value) => {
    setCustomOverrides(prev => ({
      ...prev,
      [property]: value
    }));
  };

  const removeCustomOverride = (property) => {
    setCustomOverrides(prev => {
      const updated = { ...prev };
      delete updated[property];
      return updated;
    });
  };

  const exportConfig = () => {
    return JSON.stringify(config, null, 2);
  };

  const importConfig = (newConfig) => {
    try {
      const parsedConfig = typeof newConfig === 'string' ? JSON.parse(newConfig) : newConfig;
      setConfig(parsedConfig);
      return true;
    } catch (error) {
      console.error('Failed to import config:', error);
      return false;
    }
  };

  const resetToDefault = () => {
    setConfig(themeConfig);
    setCustomOverrides({});
  };

  // Sync new components from default config without losing custom edits
  const syncNewComponents = () => {
    setConfig(prev => {
      const merged = { ...prev };
      
      // Merge only new components that don't exist in current config
      Object.entries(themeConfig.components).forEach(([componentName, defaultStyles]) => {
        if (!prev.components[componentName]) {
          merged.components[componentName] = defaultStyles;
        }
      });
      
      return merged;
    });
  };

  // Merge with defaults - preserves custom styles while adding new defaults
  const mergeWithDefaults = () => {
    setConfig(prev => {
      const merged = JSON.parse(JSON.stringify(themeConfig)); // Deep clone defaults
      
      // Preserve user customizations by overlaying them on defaults
      Object.entries(prev.components).forEach(([componentName, userStyles]) => {
        if (merged.components[componentName]) {
          // Component exists in both - preserve user's custom styles
          merged.components[componentName] = userStyles;
        } else {
          // User has a custom component not in defaults - keep it
          merged.components[componentName] = userStyles;
        }
      });
      
      // Preserve other user customizations (colors, typography, etc.)
      merged.colors = prev.colors;
      merged.typography = prev.typography;
      merged.spacing = prev.spacing;
      merged.borderRadius = prev.borderRadius;
      merged.customProperties = prev.customProperties;
      
      return merged;
    });
  };

  return {
    config,
    cssVariables,
    customOverrides,
    
    // Helper functions
    getComponentStyles,
    getColorValue,
    
    // Update functions
    updateColorScale,
    updateComponent,
    addCustomOverride,
    removeCustomOverride,
    
    // Import/Export
    exportConfig,
    importConfig,
    resetToDefault,
    syncNewComponents,
    mergeWithDefaults,
    
    // Raw config for advanced usage
    setConfig
  };
}

/**
 * Hook for generating Tailwind classes from theme config
 */
export function useThemeClasses() {
  const { config } = useThemeConfig();

  const getClass = (type, value, variant) => {
    switch (type) {
      case 'bg':
        if (value.includes('-')) {
          return `bg-${value}`;
        }
        return `bg-${value}-500`;
        
      case 'text':
        if (value.includes('-')) {
          return `text-${value}`;
        }
        return `text-${value}-500`;
        
      case 'border':
        if (value.includes('-')) {
          return `border-${value}`;
        }
        return `border-${value}-500`;
        
      case 'p':
      case 'padding':
        return `p-${config.spacing[value] ? value : 'md'}`;
        
      case 'rounded':
        return `rounded-${config.borderRadius[value] ? value : 'md'}`;
        
      default:
        return value;
    }
  };

  const combineClasses = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  return {
    getClass,
    combineClasses,
    config
  };
}

export default useThemeConfig;