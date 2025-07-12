import React, { useState, useCallback, useMemo } from 'react';
import { useThemeConfig } from '../hooks/useThemeConfig.js';

// Separate component for style input to prevent re-renders
const StyleInput = React.memo(({ componentName, property, value, onChange, onDelete }) => {
  const [showDelete, setShowDelete] = useState(false);
  
  return (
    <div 
      className="box flex gap-2 items-center"
      style={{
        '--box-padding': '0.5rem',
        '--box-background': 'var(--color3-800)',
        '--box-border': '1px solid var(--color3-700)',
        '--box-border-radius': '0.25rem'
      }}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <label className="text" style={{ '--text-color': 'var(--color4-400)', '--text-font-size': '0.75rem' }}>
        {property}:
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(componentName, property, e.target.value)}
        className="box text"
        style={{
          '--box-flex': '1',
          '--box-padding': '0.25rem 0.5rem',
          '--box-background': 'var(--color3-900)',
          '--box-border': '1px solid var(--color3-600)',
          '--box-border-radius': '0.25rem',
          '--text-color': 'var(--color4-200)',
          '--text-font-size': '0.75rem'
        }}
        placeholder="CSS value"
      />
      <button
        onClick={() => onDelete(componentName, property)}
        className="box text"
        style={{
          '--box-padding': '0.25rem 0.5rem',
          '--box-background': 'var(--color1-600)',
          '--box-border': '1px solid var(--color1-500)',
          '--box-border-radius': '0.25rem',
          '--text-color': 'var(--color4-50)',
          '--text-font-size': '0.75rem',
          '--box-opacity': showDelete ? '1' : '0',
          '--box-cursor': showDelete ? 'pointer' : 'default',
          'transition': 'opacity 0.2s ease'
        }}
        title="Delete style"
      >
        ×
      </button>
    </div>
  );
});

/**
 * Component Variables Table
 * Provides real-time editing of component styles using S4 CSS custom properties
 */
export function ComponentVariablesTable() {
  const {
    config,
    updateComponent,
    exportConfig,
    importConfig,
    resetToDefault,
    syncNewComponents
  } = useThemeConfig();

  const [newStyleProperty, setNewStyleProperty] = useState({});
  const [newStyleValue, setNewStyleValue] = useState({});

  const handleStyleChange = useCallback((componentName, property, value) => {
    const currentStyles = config.components[componentName] || {};
    updateComponent(componentName, {
      ...currentStyles,
      [property]: value
    });
  }, [config.components, updateComponent]);

  const handleStyleDelete = useCallback((componentName, property) => {
    const currentStyles = { ...config.components[componentName] };
    delete currentStyles[property];
    updateComponent(componentName, currentStyles);
  }, [config.components, updateComponent]);

  const handleStyleAdd = useCallback((componentName, property, value) => {
    if (!property || !value) return;
    
    const currentStyles = config.components[componentName] || {};
    updateComponent(componentName, {
      ...currentStyles,
      [property]: value
    });
  }, [config.components, updateComponent]);

  const renderStyleEditor = useCallback((componentName, styles) => {
    return Object.entries(styles).map(([property, value]) => {
      if (typeof value !== 'string') return null;
      
      return (
        <StyleInput
          key={property}
          componentName={componentName}
          property={property}
          value={value}
          onChange={handleStyleChange}
          onDelete={handleStyleDelete}
        />
      );
    }).filter(Boolean);
  }, [handleStyleChange, handleStyleDelete]);

  // Define component groups with section titles
  const componentGroups = useMemo(() => [
    {
      title: "Theme Builder",
      components: ["theme-builder"]
    },
    {
      title: "Navigation",
      components: ["nav-tab", "nav-tab-active"]
    },
    {
      title: "Content Cards",
      components: ["color-card"]
    },
    {
      title: "Form Elements",
      components: ["input-field"]
    },
    {
      title: "Buttons",
      components: ["button-primary", "button-secondary"]
    }
  ], []);

  const handleExport = useCallback(() => {
    const configJson = exportConfig();
    navigator.clipboard.writeText(configJson);
    alert('S4 theme configuration copied to clipboard!');
  }, [exportConfig]);

  const handleImport = useCallback(() => {
    const input = prompt('Paste S4 theme configuration JSON:');
    if (input) {
      const success = importConfig(input);
      if (success) {
        alert('S4 theme configuration imported successfully!');
      } else {
        alert('Failed to import configuration. Please check the JSON format.');
      }
    }
  }, [importConfig]);

  return (
    <div className="box" style={{ '--box-padding': '1.5rem' }}>
      {/* Header */}
      <div className="box" style={{ '--box-margin-bottom': '1.5rem' }}>
        <h2 className="text" style={{ 
          '--text-font-size': '1.25rem', 
          '--text-font-weight': '600', 
          '--text-color': 'var(--color4-100)',
          '--text-margin-bottom': '0.5rem'
        }}>
          Component Variables Table
        </h2>
        <p className="text" style={{ 
          '--text-font-size': '0.875rem', 
          '--text-color': 'var(--color4-400)' 
        }}>
          Edit component styles using S4 CSS custom properties. Changes apply immediately to the interface.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="box" style={{ 
        '--box-display': 'flex', 
        '--box-gap': '0.75rem',
        '--box-margin-bottom': '1.5rem'
      }}>
        <button
          onClick={() => {
            syncNewComponents();
            alert('New components synced!');
          }}
          className="box text"
          style={{
            '--box-padding': '0.5rem 1rem',
            '--box-background': 'var(--color1-500)',
            '--box-border': '1px solid var(--color1-400)',
            '--box-border-radius': '0.375rem',
            '--text-color': 'var(--color4-50)',
            '--text-font-weight': '500',
            '--text-font-size': '0.875rem'
          }}
        >
          Sync New
        </button>
        <button
          onClick={handleExport}
          className="box text"
          style={{
            '--box-padding': '0.5rem 1rem',
            '--box-background': 'var(--color3-700)',
            '--box-border': '1px solid var(--color3-600)',
            '--box-border-radius': '0.375rem',
            '--text-color': 'var(--color4-200)',
            '--text-font-weight': '500',
            '--text-font-size': '0.875rem'
          }}
        >
          Export
        </button>
        <button
          onClick={handleImport}
          className="box text"
          style={{
            '--box-padding': '0.5rem 1rem',
            '--box-background': 'var(--color3-700)',
            '--box-border': '1px solid var(--color3-600)',
            '--box-border-radius': '0.375rem',
            '--text-color': 'var(--color4-200)',
            '--text-font-weight': '500',
            '--text-font-size': '0.875rem'
          }}
        >
          Import
        </button>
        <button
          onClick={() => {
            const confirmed = confirm('⚠️ Reset all custom styles to defaults?');
            if (confirmed) {
              resetToDefault();
              alert('Reset to defaults.');
            }
          }}
          className="box text"
          style={{
            '--box-padding': '0.5rem 1rem',
            '--box-background': 'var(--color1-600)',
            '--box-border': '1px solid var(--color1-500)',
            '--box-border-radius': '0.375rem',
            '--text-color': 'var(--color4-50)',
            '--text-font-weight': '500',
            '--text-font-size': '0.875rem'
          }}
        >
          Reset All
        </button>
      </div>

      {/* Component Groups */}
      <div className="box" style={{ '--box-display': 'flex', '--box-flex-direction': 'column', '--box-gap': '1.5rem' }}>
        {componentGroups.map((group) => (
          <div key={group.title} className="box" style={{ '--box-display': 'flex', '--box-flex-direction': 'column', '--box-gap': '0.75rem' }}>
            <h3 className="text" style={{ 
              '--text-font-size': '0.875rem', 
              '--text-font-weight': '600', 
              '--text-color': 'var(--color1-400)',
              '--text-text-transform': 'uppercase',
              '--text-letter-spacing': '0.05em'
            }}>
              {group.title}
            </h3>
            
            {group.components.map((componentName) => {
              const styles = config.components[componentName];
              if (!styles) return null;
              
              return (
                <details 
                  key={componentName} 
                  className="box" 
                  style={{ 
                    '--box-background': 'var(--color3-800)',
                    '--box-border': '1px solid var(--color3-700)',
                    '--box-border-radius': '0.5rem',
                    '--box-padding': '0.75rem'
                  }}
                >
                  <summary className="text" style={{ 
                    '--text-font-weight': '500', 
                    '--text-color': 'var(--color4-200)',
                    '--text-cursor': 'pointer',
                    '--text-text-transform': 'capitalize'
                  }}>
                    {componentName}
                  </summary>
                  
                  <div className="box" style={{ 
                    '--box-margin-top': '0.75rem', 
                    '--box-display': 'flex', 
                    '--box-flex-direction': 'column', 
                    '--box-gap': '0.75rem' 
                  }}>
                    {renderStyleEditor(componentName, styles)}
                    
                    {/* Add New Style Section */}
                    <div className="box" style={{ 
                      '--box-padding-top': '0.75rem', 
                      '--box-border-top': '1px solid var(--color3-700)' 
                    }}>
                      <div className="box" style={{ 
                        '--box-display': 'flex', 
                        '--box-gap': '0.5rem', 
                        '--box-align-items': 'center' 
                      }}>
                        <input
                          type="text"
                          placeholder="Property name (e.g., --box-background)"
                          value={newStyleProperty[componentName] || ''}
                          onChange={(e) => {
                            setNewStyleProperty({
                              ...newStyleProperty,
                              [componentName]: e.target.value
                            });
                          }}
                          className="box text"
                          style={{
                            '--box-flex': '1',
                            '--box-padding': '0.25rem 0.5rem',
                            '--box-background': 'var(--color3-900)',
                            '--box-border': '1px solid var(--color3-600)',
                            '--box-border-radius': '0.25rem',
                            '--text-color': 'var(--color4-200)',
                            '--text-font-size': '0.75rem'
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Value (e.g., var(--color1-500))"
                          value={newStyleValue[componentName] || ''}
                          onChange={(e) => setNewStyleValue({
                            ...newStyleValue,
                            [componentName]: e.target.value
                          })}
                          className="box text"
                          style={{
                            '--box-flex': '1',
                            '--box-padding': '0.25rem 0.5rem',
                            '--box-background': 'var(--color3-900)',
                            '--box-border': '1px solid var(--color3-600)',
                            '--box-border-radius': '0.25rem',
                            '--text-color': 'var(--color4-200)',
                            '--text-font-size': '0.75rem'
                          }}
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
                          className="box text"
                          style={{
                            '--box-padding': '0.25rem 0.75rem',
                            '--box-background': 'var(--color1-500)',
                            '--box-border': '1px solid var(--color1-400)',
                            '--box-border-radius': '0.25rem',
                            '--text-color': 'var(--color4-50)',
                            '--text-font-size': '0.75rem',
                            '--text-font-weight': '500'
                          }}
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
}

export default ComponentVariablesTable;
