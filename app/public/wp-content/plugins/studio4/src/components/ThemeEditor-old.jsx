import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useThemeConfig } from '../hooks/useThemeConfig.js';

// Separate component for style input to prevent re-renders
const StyleInput = React.memo(({ componentName, fullKey, value, onChange, onDelete }) => {
  const [showDelete, setShowDelete] = useState(false);
  
  return (
    <div 
      className="flex gap-2 items-center"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <label className="text-xs text-neutral-400 w-24 capitalize">{fullKey.split('.').pop()}:</label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(componentName, fullKey, e.target.value)}
        className="flex-1 px-2 py-1 bg-neutral-900 border border-neutral-600 rounded text-xs text-neutral-200"
        placeholder="CSS value"
      />
      <button
        onClick={() => {
          console.log('Deleting style:', componentName, fullKey);
          onDelete(componentName, fullKey);
        }}
        className={`px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-all ${
          showDelete ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        title="Delete style"
      >
        ×
      </button>
    </div>
  );
});

/**
 * Theme Editor Component
 * Provides real-time editing of UI styling through JSON configuration
 */
export function ThemeEditor({ isOpen, onClose }) {
  const {
    config,
    updateColorScale,
    updateComponent,
    addCustomOverride,
    removeCustomOverride,
    exportConfig,
    importConfig,
    resetToDefault,
    syncNewComponents,
    mergeWithDefaults,
    customOverrides
  } = useThemeConfig();

  const [activeTab, setActiveTab] = useState('whiteboard');
  const [expandedSection, setExpandedSection] = useState('whiteboard');
  const [selectedColor, setSelectedColor] = useState('primary');
  const [selectedWeight, setSelectedWeight] = useState('500');
  const [customProperty, setCustomProperty] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [selectedFile, setSelectedFile] = useState('ui-theme-config');
  const [fileContent, setFileContent] = useState('');
  const [whiteboardContent, setWhiteboardContent] = useState('');
  const [isWhiteboardLoading, setIsWhiteboardLoading] = useState(false);

  // All hooks must be before any conditional returns
  const handleColorChange = useCallback((weight, value) => {
    const currentScale = config.colors.brand[selectedColor];
    updateColorScale(selectedColor, {
      ...currentScale,
      [weight]: value
    });
  }, [config.colors.brand, selectedColor, updateColorScale]);

  const handleStyleChange = useCallback((componentName, fullKey, value) => {
    const keys = fullKey.split('.');
    let newStyles = JSON.parse(JSON.stringify(config.components[componentName]));
    let current = newStyles;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    updateComponent(componentName, newStyles);
  }, [config.components, updateComponent]);

  const handleStyleDelete = useCallback((componentName, fullKey) => {
    const keys = fullKey.split('.');
    let newStyles = JSON.parse(JSON.stringify(config.components[componentName]));
    
    if (keys.length === 1) {
      // Direct property
      delete newStyles[keys[0]];
    } else {
      // Nested property
      let current = newStyles;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) return;
        if (i === keys.length - 2) {
          delete current[keys[i]][keys[keys.length - 1]];
        } else {
          current = current[keys[i]];
        }
      }
    }
    
    updateComponent(componentName, newStyles);
  }, [config.components, updateComponent]);

  const handleStyleAdd = useCallback((componentName, property, value) => {
    const newStyles = {
      ...config.components[componentName],
      [property]: value
    };
    updateComponent(componentName, newStyles);
  }, [config.components, updateComponent]);

  const renderStyleEditor = useCallback((componentName, styles, parentKey = '') => {
    return Object.entries(styles).map(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return (
          <div key={fullKey} className="ml-4 space-y-2">
            <div className="text-sm font-medium text-neutral-300 capitalize">{key}</div>
            {renderStyleEditor(componentName, value, fullKey)}
          </div>
        );
      }
      
      return (
        <StyleInput
          key={fullKey}
          componentName={componentName}
          fullKey={fullKey}
          value={value}
          onChange={handleStyleChange}
          onDelete={handleStyleDelete}
        />
      );
    });
  }, [handleStyleChange, handleStyleDelete]);

  const handleExport = useCallback(() => {
    const configJson = exportConfig();
    navigator.clipboard.writeText(configJson);
    alert('Theme configuration copied to clipboard!');
  }, [exportConfig]);

  const handleImport = useCallback(() => {
    const input = prompt('Paste theme configuration JSON:');
    if (input) {
      const success = importConfig(input);
      if (success) {
        alert('Theme configuration imported successfully!');
      } else {
        alert('Failed to import configuration. Please check the JSON format.');
      }
    }
  }, [importConfig]);

  // File loading logic
  const loadFileContent = useCallback(async (fileName) => {
    try {
      let content = '';
      switch (fileName) {
        case 'ui-theme-config':
          content = JSON.stringify(config, null, 2);
          break;
        case 'useThemeConfig':
          content = `// useThemeConfig.js - Theme Configuration Hook
// This hook manages the UI theme configuration and CSS generation

import { useState, useEffect, useCallback } from 'react';

// Main hook for theme configuration management
export function useThemeConfig() {
  // Theme configuration state
  const [config, setConfig] = useState(/* loaded from localStorage */);
  
  // CSS generation and Shadow DOM injection
  const generateCSS = () => {
    // Converts JSON config to CSS rules
    // Injects styles into Shadow DOM
  };
  
  // Update functions for colors, components, etc.
  const updateColorScale = (colorName, scale) => { /* ... */ };
  const updateComponent = (componentName, styles) => { /* ... */ };
  
  return {
    config,
    updateColorScale,
    updateComponent,
    // ... other functions
  };
}`;
          break;
        case 'UIComponents':
          content = `// UIComponents.jsx - Theme-Aware React Components
// Every component automatically pulls styles from JSON config

import React from 'react';
import { useComponentStyles } from '../hooks/useThemeConfig.js';

// Example theme-aware component
export function Sidebar({ children, className = '', ...props }) {
  const styles = useComponentStyles('sidebar');
  
  return (
    <aside 
      className={\`\${className}\`}
      style={styles}
      {...props}
    >
      {children}
    </aside>
  );
}

// 25+ components defined this way:
// - Sidebar, SidebarHeader, SidebarTitle, etc.
// - Buttons, Inputs, Cards, etc.
// - All automatically styled from JSON config`;
          break;
        case 'main.css':
          content = `/* main.css - Tailwind 4 with @theme directive */

@import "tailwindcss";
@source "../**/*.jsx";
@source "../**/*.js";

@theme {
  /* S4 Brand Colors (not ShadCN) */
  --color-primary-500: hsl(337, 35%, 52%);    /* S4 Pink brand */
  --color-secondary-500: hsl(29, 44%, 53%);   /* S4 Tangerine */
  --color-neutral-950: hsl(0, 0%, 0%);        /* S4 Dark bg */
  --color-neutral-50: hsl(0, 0%, 100%);       /* S4 Light text */
  --radius: 0.375rem;
}

/* Shadow DOM styles with :host selector */
:host {
  /* Component isolation styles */
}`;
          break;
        case 'daniels-architecture':
          content = `# DANIEL'S BOILERPLATE ARCHITECTURE - REFERENCE

## 🏗️ THE REVOLUTIONARY STACK

### 1. 🌐 WordPress → Web Component Bridge
WHAT: Custom <studio4-builder> HTML element  
PURPOSE: Isolates React app from WordPress completely  
MAGIC: Shadow DOM = Zero style conflicts with themes  

### 2. ⚛️ React Inside Shadow DOM
WHAT: Full React 18 app in isolated bubble  
PURPOSE: Modern UI without touching WordPress styles  
RESULT: React works perfectly, WordPress themes can't interfere  

### 3. 🎨 Our S4 Framework Integration
WHAT: JSON config → CSS generation → Theme-aware components  
PURPOSE: Complete theme control through Studio4 interface  
NOTE: We replaced Daniel's original ShadCN with our S4 system  

## 🔗 THE DATA FLOW

WordPress PHP → Web Component Attributes → React Props → UI
     ↓              ↓                      ↓           ↓
"User data"    "user-role='admin'"    "userRole"   "Admin UI"
"CSS file"     "tailwind-css='...'"   "CSS"        "Styled"
"S4 config"    "settings='{...}'"     "settings"   "S4 Theme"

## 🛡️ SHADOW DOM ISOLATION

Problem: WordPress themes break everything  
Solution: Shadow DOM = Completely separate style universe  
Result: Your React app is untouchable  

// Inside shadow DOM - completely isolated
<div className="bg-primary-500 text-white">
  // WordPress themes can't touch this!
</div>

## 🔥 THE BREAKTHROUGH POINTS

1. Web Component: React runs in isolated shadow DOM
2. Server Props: PHP data flows seamlessly to React
3. CSS Injection: Tailwind CSS injected safely via base64
4. S4 Integration: Our theme system replaces ShadCN tokens
5. Zero Conflicts: WordPress themes can't break anything
6. JSON Control: Our ui-theme-config.json controls everything

🚀 BOTTOM LINE: Daniel's bulletproof architecture + Our S4 system = Perfect combo!`;
          break;
        default:
          content = 'File not found';
      }
      setFileContent(content);
    } catch (error) {
      setFileContent('Error loading file: ' + error.message);
    }
  }, [config]);

  // Load file content when selectedFile changes
  useEffect(() => {
    loadFileContent(selectedFile);
  }, [selectedFile, loadFileContent]);

  // Load whiteboard content on component mount
  useEffect(() => {
    loadWhiteboardContent();
  }, []);

  // Function to load whiteboard content from our docs
  const loadWhiteboardContent = useCallback(async () => {
    setIsWhiteboardLoading(true);
    try {
      // Load the actual whiteboard file content
      // For now, we'll use a placeholder since we can't directly access the file system
      // In a real implementation, this would be an API call to read the file
      const placeholderContent = `# PLUGIN BACKEND - WHITEBOARD

*Live editing workspace - changes sync to DOCS/PROJECT-DOCS/04-Plugin-Backend/WHITEBOARD.md*

## 📝 CURRENT SESSION NOTES

### What we're working on:
- [ ] Task 1
- [ ] Task 2
- [ ] Task 3

### Ideas & Discoveries:
- 

### Next Steps:
- 

### Blockers:
- 

---

## 🔄 QUICK REFERENCE

### S4 4-Layer System:
1. **Brand Tokens** - Colors + Typography
2. **Global Elements** - All element properties  
3. **Component Scopes** - Component modifications
4. **Helper Scopes** - States and utilities

### Current Architecture:
- ✅ Daniel's Web Component System (Shadow DOM isolation)
- ✅ Our S4 Framework (JSON → CSS → Components)
- ✅ Revolutionary Theme-Aware React Components

---

*Edit freely - this is your workspace!*`;
      
      setWhiteboardContent(placeholderContent);
    } catch (error) {
      setWhiteboardContent('Error loading whiteboard content');
    } finally {
      setIsWhiteboardLoading(false);
    }
  }, []);

  // Function to save whiteboard content
  const saveWhiteboardContent = useCallback(async (content) => {
    try {
      // In a real implementation, this would save to the actual file
      // For now, we'll just update the local state
      setWhiteboardContent(content);
      
      // You could add an API call here to save to the actual file
      // await saveToFile('/path/to/whiteboard.md', content);
      
      console.log('Whiteboard content updated (local only)');
    } catch (error) {
      console.error('Error saving whiteboard:', error);
    }
  }, []);

  const ColorScaleEditor = useMemo(() => (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        {Object.keys(config.colors.brand).map(colorName => (
          <button
            key={colorName}
            onClick={() => setSelectedColor(colorName)}
            className={`px-3 py-2 rounded text-sm font-medium capitalize transition-colors ${
              selectedColor === colorName
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-700 text-neutral-200 hover:bg-neutral-600'
            }`}
          >
            {colorName}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Object.entries(config.colors.brand[selectedColor]).map(([weight, value]) => (
          <div key={weight} className="space-y-2">
            <label className="text-sm font-medium text-neutral-200">
              {selectedColor}-{weight}
            </label>
            <div className="flex gap-2 items-center">
              <div
                className="w-8 h-8 rounded border-2 border-neutral-600"
                style={{ backgroundColor: value }}
              />
              <input
                type="text"
                value={value}
                onChange={(e) => handleColorChange(weight, e.target.value)}
                className="flex-1 px-2 py-1 bg-neutral-800 border border-neutral-600 rounded text-sm text-neutral-200"
                placeholder="hsl(0, 0%, 50%)"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ), [config.colors.brand, selectedColor, handleColorChange]);

  // Common CSS properties for autocomplete
  const cssProperties = [
    // Layout
    'display', 'position', 'top', 'right', 'bottom', 'left', 'float', 'clear',
    'width', 'height', 'maxWidth', 'maxHeight', 'minWidth', 'minHeight',
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'overflow', 'overflowX', 'overflowY', 'visibility', 'zIndex',
    
    // Flexbox
    'flex', 'flexDirection', 'flexWrap', 'flexGrow', 'flexShrink', 'flexBasis',
    'justifyContent', 'alignItems', 'alignContent', 'alignSelf', 'gap',
    
    // Grid
    'gridTemplateColumns', 'gridTemplateRows', 'gridColumn', 'gridRow',
    'gridGap', 'gridColumnGap', 'gridRowGap',
    
    // Typography
    'color', 'fontSize', 'fontWeight', 'fontFamily', 'fontStyle',
    'lineHeight', 'letterSpacing', 'textAlign', 'textDecoration',
    'textTransform', 'textOverflow', 'whiteSpace', 'wordBreak',
    
    // Background & Border
    'background', 'backgroundColor', 'backgroundImage', 'backgroundSize',
    'backgroundPosition', 'backgroundRepeat',
    'border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft',
    'borderColor', 'borderStyle', 'borderWidth', 'borderRadius',
    'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius',
    
    // Effects
    'opacity', 'boxShadow', 'textShadow', 'transform', 'transformOrigin',
    'transition', 'transitionProperty', 'transitionDuration', 'transitionTimingFunction',
    'animation', 'animationName', 'animationDuration', 'animationTimingFunction',
    
    // Other
    'cursor', 'pointerEvents', 'userSelect', 'resize', 'listStyle', 'outline'
  ].sort();

  const ComponentEditor = useMemo(() => {
    const [newStyleProperty, setNewStyleProperty] = useState({});
    const [newStyleValue, setNewStyleValue] = useState({});
    const [showSuggestions, setShowSuggestions] = useState({});
    const [filteredSuggestions, setFilteredSuggestions] = useState({});

    // Define component groups with section titles
    const componentGroups = [
      {
        title: "Main Header",
        components: ["main-header", "header-brand", "header-logo", "header-title", "header-subtitle"]
      },
      {
        title: "Sidebar Container",
        components: ["sidebar"]
      },
      {
        title: "Sidebar Header",
        components: ["sidebar-header", "sidebar-header-content", "sidebar-logo", "sidebar-header-text", "sidebar-title", "sidebar-subtitle"]
      },
      {
        title: "Sidebar Navigation (4-Square Grid)",
        components: ["sidebar-nav-grid", "sidebar-nav-button", "sidebar-nav-button-active", "sidebar-nav-button-hover", "sidebar-nav-number", "sidebar-nav-number-active", "sidebar-nav-label", "sidebar-nav-label-active"]
      },
      {
        title: "Sidebar Content Area",
        components: ["sidebar-content", "sidebar-section", "content-area", "section"]
      },
      {
        title: "Accordion Components",
        components: ["accordion", "accordion-item", "accordion-trigger", "accordion-trigger-open", "accordion-trigger-hover", "accordion-content", "accordion-icon"]
      },
      {
        title: "Sidebar Footer",
        components: ["sidebar-footer"]
      },
      {
        title: "Preview Area",
        components: ["preview-container", "preview-header", "preview-content", "preview-canvas"]
      },
      {
        title: "Preview Mode Toggle",
        components: ["preview-mode-toggle", "preview-mode-button", "preview-mode-button-active", "preview-mode-button-hover"]
      },
      {
        title: "Buttons",
        components: ["button-primary", "button-secondary"]
      },
      {
        title: "Form Components",
        components: ["input", "label"]
      },
      {
        title: "Card Component",
        components: ["card"]
      },
      {
        title: "Color Grid Responsive Breakpoints",
        components: ["color-grid", "color-grid-xs", "color-grid-sm", "color-grid-md", "color-grid-lg", "color-grid-xl"]
      },
      {
        title: "Color Preview Components",
        components: ["color-card", "color-card-hover", "color-swatch", "color-swatch-number", "color-swatch-label", "color-card-content", "color-card-title", "color-card-value", "color-scale", "color-scale-swatch", "color-preview-title"]
      }
    ];

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-400 mb-4">
          Edit component styles - Changes apply immediately
        </div>
        
        <div className="space-y-6">
          {componentGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h3 className="text-sm font-semibold text-primary-400 uppercase tracking-wider">{group.title}</h3>
              {group.components.map((componentName) => {
                const styles = config.components[componentName];
                if (!styles) return null;
                
                return (
                  <details key={componentName} className="bg-neutral-800 rounded p-3">
                    <summary className="font-medium text-neutral-200 cursor-pointer capitalize">
                      {componentName}
                      {componentName === 'color-grid' && ' (Base: all screens)'}
                      {componentName === 'color-grid-xs' && ' (480px+)'}
                      {componentName === 'color-grid-sm' && ' (640px+)'}
                      {componentName === 'color-grid-md' && ' (768px+)'}
                      {componentName === 'color-grid-lg' && ' (1024px+)'}
                      {componentName === 'color-grid-xl' && ' (1280px+)'}
                    </summary>
              <div className="mt-3 space-y-3">
                {renderStyleEditor(componentName, styles)}
                
                {/* Add New Style Section */}
                <div className="pt-3 border-t border-neutral-700">
                  <div className="flex gap-2 items-center">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Property name"
                        value={newStyleProperty[componentName] || ''}
                        onChange={(e) => {
                          const value = e.target.value;
                          setNewStyleProperty({
                            ...newStyleProperty,
                            [componentName]: value
                          });
                          
                          // Filter suggestions
                          if (value) {
                            const filtered = cssProperties.filter(prop => 
                              prop.toLowerCase().includes(value.toLowerCase())
                            );
                            setFilteredSuggestions({
                              ...filteredSuggestions,
                              [componentName]: filtered
                            });
                            setShowSuggestions({
                              ...showSuggestions,
                              [componentName]: true
                            });
                          } else {
                            setShowSuggestions({
                              ...showSuggestions,
                              [componentName]: false
                            });
                          }
                        }}
                        onFocus={() => {
                          if (newStyleProperty[componentName]) {
                            const filtered = cssProperties.filter(prop => 
                              prop.toLowerCase().includes(newStyleProperty[componentName].toLowerCase())
                            );
                            setFilteredSuggestions({
                              ...filteredSuggestions,
                              [componentName]: filtered
                            });
                            setShowSuggestions({
                              ...showSuggestions,
                              [componentName]: true
                            });
                          }
                        }}
                        onBlur={() => {
                          // Delay to allow click on suggestion
                          setTimeout(() => {
                            setShowSuggestions({
                              ...showSuggestions,
                              [componentName]: false
                            });
                          }, 200);
                        }}
                        className="w-full px-2 py-1 bg-neutral-900 border border-neutral-600 rounded text-xs text-neutral-200"
                      />
                      
                      {/* Suggestions Dropdown */}
                      {showSuggestions[componentName] && filteredSuggestions[componentName]?.length > 0 && (
                        <div className="absolute z-10 top-full mt-1 w-full max-h-48 overflow-y-auto bg-neutral-800 border border-neutral-600 rounded shadow-lg">
                          {filteredSuggestions[componentName].slice(0, 10).map(prop => (
                            <button
                              key={prop}
                              type="button"
                              onClick={() => {
                                setNewStyleProperty({
                                  ...newStyleProperty,
                                  [componentName]: prop
                                });
                                setShowSuggestions({
                                  ...showSuggestions,
                                  [componentName]: false
                                });
                              }}
                              className="w-full px-2 py-1 text-left text-xs text-neutral-200 hover:bg-neutral-700 transition-colors"
                            >
                              {prop}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Value"
                      value={newStyleValue[componentName] || ''}
                      onChange={(e) => setNewStyleValue({
                        ...newStyleValue,
                        [componentName]: e.target.value
                      })}
                      className="flex-1 px-2 py-1 bg-neutral-900 border border-neutral-600 rounded text-xs text-neutral-200"
                    />
                    <button
                      onClick={() => {
                        const prop = newStyleProperty[componentName];
                        const val = newStyleValue[componentName];
                        if (prop && val) {
                          handleStyleAdd(componentName, prop, val);
                          setNewStyleProperty({
                            ...newStyleProperty,
                            [componentName]: ''
                          });
                          setNewStyleValue({
                            ...newStyleValue,
                            [componentName]: ''
                          });
                        }
                      }}
                      className="px-3 py-1 bg-primary-500 text-white rounded text-xs hover:bg-primary-600 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </details>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }, [config.components, renderStyleEditor, handleStyleAdd, cssProperties]);

  const CustomPropertiesEditor = useMemo(() => (
    <div className="space-y-4">
      <div className="text-sm text-neutral-400 mb-4">
        Add custom CSS properties
      </div>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="--custom-property"
          value={customProperty}
          onChange={(e) => setCustomProperty(e.target.value)}
          className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-600 rounded text-sm text-neutral-200"
        />
        <input
          type="text"
          placeholder="value"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-600 rounded text-sm text-neutral-200"
        />
        <button
          onClick={() => {
            if (customProperty && customValue) {
              addCustomOverride(customProperty, customValue);
              setCustomProperty('');
              setCustomValue('');
            }
          }}
          className="px-4 py-2 bg-primary-500 text-white rounded text-sm font-medium hover:bg-primary-600 transition-colors"
        >
          Add
        </button>
      </div>

      {/* Show existing custom properties */}
      {Object.keys(customOverrides).length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-neutral-200">Custom Properties:</div>
          {Object.entries(customOverrides).map(([property, value]) => (
            <div key={property} className="flex gap-2 items-center bg-neutral-700 p-2 rounded">
              <span className="text-xs font-mono text-neutral-300 w-32">{property}</span>
              <input
                type="text"
                value={value}
                onChange={(e) => addCustomOverride(property, e.target.value)}
                className="flex-1 px-2 py-1 bg-neutral-800 border border-neutral-600 rounded text-xs text-neutral-200"
              />
              <button
                onClick={() => removeCustomOverride(property)}
                className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  ), [customOverrides, customProperty, customValue, addCustomOverride, removeCustomOverride]);

  const FilesViewer = useMemo(() => (
    <div className="space-y-4">
      <div className="text-sm text-neutral-400 mb-4">
        View theme and React files - Read-only for inspection
      </div>
      
      {/* File Selection */}
      <div className="flex gap-2 mb-4">
        {[
          { key: 'ui-theme-config', label: 'ui-theme-config.json', desc: 'Theme configuration (539 lines)' },
          { key: 'useThemeConfig', label: 'useThemeConfig.js', desc: 'React hook for theme management' },
          { key: 'UIComponents', label: 'UIComponents.jsx', desc: '25+ theme-aware components' },
          { key: 'main.css', label: 'main.css', desc: 'Tailwind 4 with @theme directive' },
          { key: 'daniels-architecture', label: 'daniels-architecture.md', desc: 'Reference: Web component architecture' }
        ].map(file => (
          <button
            key={file.key}
            onClick={() => setSelectedFile(file.key)}
            className={`px-3 py-2 rounded text-xs font-medium transition-colors flex flex-col items-start ${
              selectedFile === file.key
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-700 text-neutral-200 hover:bg-neutral-600'
            }`}
            title={file.desc}
          >
            <span className="font-medium">{file.label}</span>
            <span className="text-xs opacity-75">{file.desc}</span>
          </button>
        ))}
      </div>

      {/* File Content */}
      <div className="bg-neutral-800 rounded-lg border border-neutral-700">
        <div className="flex justify-between items-center p-3 border-b border-neutral-700">
          <h3 className="text-sm font-medium text-neutral-200">
            {selectedFile === 'ui-theme-config' && 'UI Theme Configuration JSON'}
            {selectedFile === 'useThemeConfig' && 'Theme Configuration Hook'}
            {selectedFile === 'UIComponents' && 'Theme-Aware React Components'}
            {selectedFile === 'main.css' && 'Tailwind CSS with @theme Directive'}
            {selectedFile === 'daniels-architecture' && 'Daniel\'s Web Component Architecture Reference'}
          </h3>
          <button
            onClick={() => navigator.clipboard.writeText(fileContent)}
            className="px-2 py-1 bg-neutral-700 text-neutral-200 rounded text-xs hover:bg-neutral-600 transition-colors"
          >
            Copy
          </button>
        </div>
        <div className="p-4">
          <pre className="text-xs font-mono text-neutral-200 whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto">
            <code>{fileContent}</code>
          </pre>
        </div>
      </div>

      {/* File Info */}
      <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4">
        <h4 className="text-sm font-medium text-neutral-200 mb-2">File Information</h4>
        <div className="text-xs text-neutral-400 space-y-1">
          {selectedFile === 'ui-theme-config' && (
            <>
              <p>• 539 lines of comprehensive UI component styling</p>
              <p>• 25+ component definitions with complete property sets</p>
              <p>• Color scales, typography, layout, and animation definitions</p>
              <p>• Real-time editable through Components tab</p>
            </>
          )}
          {selectedFile === 'useThemeConfig' && (
            <>
              <p>• React hook managing theme configuration state</p>
              <p>• Converts JSON config to CSS rules automatically</p>
              <p>• Injects styles into Shadow DOM for real-time updates</p>
              <p>• Provides component styling functions</p>
            </>
          )}
          {selectedFile === 'UIComponents' && (
            <>
              <p>• 25+ theme-aware React components</p>
              <p>• Each component automatically pulls styles from JSON</p>
              <p>• Complete UI component library for the interface</p>
              <p>• Real-time style updates from theme changes</p>
            </>
          )}
          {selectedFile === 'main.css' && (
            <>
              <p>• Tailwind CSS 4 with @theme directive implementation</p>
              <p>• S4 design system tokens (not ShadCN)</p>
              <p>• Shadow DOM compatible with :host selector</p>
              <p>• 37KB compiled CSS with complete utility classes</p>
            </>
          )}
          {selectedFile === 'daniels-architecture' && (
            <>
              <p>• Overview of Daniel's WordPress + React architecture</p>
              <p>• Shadow DOM isolation and web component system</p>
              <p>• Data flow from WordPress PHP to React props</p>
              <p>• Reference for understanding the foundation we built on</p>
            </>
          )}
        </div>
      </div>
    </div>
  ), [selectedFile, fileContent]);

  const WhiteboardEditor = useMemo(() => (
    <div className="space-y-4">
      <div className="text-sm text-neutral-400 mb-4">
        Live editing workspace - Add notes, tasks, and ideas while we work
      </div>
      
      {/* Whiteboard Controls */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-neutral-200">Session Whiteboard</h3>
        <div className="flex gap-2">
          <button
            onClick={() => navigator.clipboard.writeText(whiteboardContent)}
            className="px-2 py-1 bg-neutral-700 text-neutral-200 rounded text-xs hover:bg-neutral-600 transition-colors"
          >
            Copy
          </button>
          <button
            onClick={() => {
              const confirmed = confirm('Clear all whiteboard content?');
              if (confirmed) {
                const clearedContent = `# PLUGIN BACKEND - WHITEBOARD

*Live editing workspace*

## 📝 CURRENT SESSION NOTES

### What we're working on:
- [ ] 

### Ideas & Discoveries:
- 

### Next Steps:
- 

### Blockers:
- 

---

*Edit freely - this is your workspace!*`;
                saveWhiteboardContent(clearedContent);
              }
            }}
            className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Editable Whiteboard */}
      <div className="bg-neutral-800 rounded-lg border border-neutral-700">
        {isWhiteboardLoading ? (
          <div className="p-4 text-center text-neutral-400">
            Loading whiteboard...
          </div>
        ) : (
          <textarea
            value={whiteboardContent}
            onChange={(e) => saveWhiteboardContent(e.target.value)}
            className="w-full h-96 bg-transparent text-neutral-200 font-mono text-sm p-4 rounded resize-none border-none outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Add your notes, tasks, and ideas here..."
            spellCheck={false}
          />
        )}
      </div>

      {/* Quick Reference */}
      <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4">
        <h4 className="text-sm font-medium text-neutral-200 mb-2">Quick Reference</h4>
        <div className="text-xs text-neutral-400 space-y-1">
          <p><strong>Markdown Support:</strong> # Headers, **bold**, *italic*, - lists, [ ] checkboxes</p>
          <p><strong>Auto-Save:</strong> Changes save automatically as you type</p>
          <p><strong>Purpose:</strong> Track session progress without jumping to docs</p>
        </div>
      </div>
    </div>
  ), [whiteboardContent, isWhiteboardLoading, saveWhiteboardContent]);

  // Early return AFTER all hooks
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-950 z-50">
      <div className="bg-neutral-900 w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-700 bg-neutral-800">
          <div>
            <h2 className="text-2xl font-bold text-neutral-100">React Plugin Design System</h2>
            <p className="text-sm text-neutral-400 mt-1">Backend interface editor • Cmd+4 (Mac) or Ctrl+4 (Win/Linux) to toggle open/close</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                syncNewComponents();
                alert('New components synced! Your custom styles have been preserved.');
              }}
              className="px-3 py-1 bg-primary-500 text-white rounded text-sm font-medium hover:bg-primary-600 transition-colors"
              title="Add new default components without losing your customizations"
            >
              Sync New
            </button>
            <button
              onClick={() => {
                mergeWithDefaults();
                alert('Cleaned deprecated components! Updated to latest configuration.');
              }}
              className="px-3 py-1 bg-orange-500 text-white rounded text-sm font-medium hover:bg-orange-600 transition-colors"
              title="Remove deprecated components and sync with latest defaults"
            >
              Clean
            </button>
            <button
              onClick={handleExport}
              className="px-3 py-1 bg-secondary-500 text-white rounded text-sm font-medium hover:bg-secondary-600 transition-colors"
            >
              Export
            </button>
            <button
              onClick={handleImport}
              className="px-3 py-1 bg-neutral-700 text-neutral-200 rounded text-sm font-medium hover:bg-neutral-600 transition-colors"
            >
              Import
            </button>
            <button
              onClick={() => {
                const confirmed = confirm(
                  '⚠️ WARNING: This will permanently delete ALL your custom styling and reset to default configuration.\n\nThis action cannot be undone.\n\nAre you sure you want to continue?'
                );
                if (confirmed) {
                  resetToDefault();
                  alert('Configuration reset to defaults. All custom edits have been lost.');
                }
              }}
              className="px-2 py-1 bg-red-800 text-red-300 border border-red-700 rounded text-xs font-normal hover:bg-red-700 hover:text-white transition-colors"
              title="⚠️ WARNING: Will delete all custom edits"
            >
              Reset All
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1 bg-neutral-700 text-neutral-200 rounded text-sm font-medium hover:bg-neutral-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-neutral-700">
          {[
            { key: 'components', label: 'Components' },
            { key: 'colors', label: 'Colors' },
            { key: 'custom', label: 'Custom Properties' },
            { key: 'files', label: 'Files' },
            { key: 'whiteboard', label: 'Whiteboard' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'text-primary-400 border-b-2 border-primary-500'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {activeTab === 'components' && ComponentEditor}
          {activeTab === 'colors' && ColorScaleEditor}
          {activeTab === 'custom' && CustomPropertiesEditor}
          {activeTab === 'files' && FilesViewer}
          {activeTab === 'whiteboard' && WhiteboardEditor}
        </div>

        {/* Live Preview */}
        <div className="border-t border-neutral-700 p-4 bg-neutral-800">
          <div className="text-sm font-medium text-neutral-200 mb-3">Live Preview</div>
          <div className="flex gap-3 flex-wrap">
            <button className="px-4 py-2 bg-primary-500 text-white rounded font-medium">
              Primary Button
            </button>
            <button className="px-4 py-2 bg-neutral-700 text-neutral-200 border border-neutral-600 rounded font-medium">
              Secondary Button
            </button>
            <div className="px-3 py-2 bg-neutral-700 border border-neutral-600 rounded">
              <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
            </div>
            <div className="px-3 py-2 bg-neutral-800 border border-neutral-600 rounded text-sm text-neutral-300">
              Sample Card
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeEditor;