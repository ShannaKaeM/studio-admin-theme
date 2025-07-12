import React, { useState } from 'react';
import { useThemeConfig } from '../hooks/useThemeConfig.js';

// CSS Property options for dropdowns
const CSS_PROPERTIES = {
  typography: [
    '--one-font-family', '--one-font-size', '--one-font-weight', '--one-line-height',
    '--one-letter-spacing', '--one-text-align', '--one-text-transform', '--one-text-decoration',
    '--one-color'
  ],
  layout: [
    '--one-display', '--one-position', '--one-width', '--one-height', '--one-max-width',
    '--one-min-width', '--one-flex-direction', '--one-justify-content', '--one-align-items',
    '--one-gap', '--one-grid-template-columns', '--one-grid-template-rows'
  ],
  spacing: [
    '--one-margin', '--one-margin-top', '--one-margin-right', '--one-margin-bottom', '--one-margin-left',
    '--one-padding', '--one-padding-top', '--one-padding-right', '--one-padding-bottom', '--one-padding-left'
  ],
  appearance: [
    '--one-background', '--one-border', '--one-border-color', '--one-border-radius', '--one-box-shadow',
    '--one-opacity', '--one-transform', '--one-transition'
  ]
};

const COMMON_VALUES = {
  '--one-font-size': ['0.75rem', '0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '2rem', '2.5rem', '3rem'],
  '--one-font-weight': ['300', '400', '500', '600', '700', '800'],
  '--one-line-height': ['1', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6'],
  '--one-text-transform': ['none', 'uppercase', 'lowercase', 'capitalize'],
  '--one-display': ['block', 'flex', 'grid', 'inline', 'inline-block', 'none'],
  '--one-flex-direction': ['row', 'column', 'row-reverse', 'column-reverse'],
  '--one-justify-content': ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
  '--one-align-items': ['flex-start', 'center', 'flex-end', 'stretch'],
  '--one-color': [
    { label: 'Primary', value: 'var(--color1-500)' },
    { label: 'Secondary', value: 'var(--color2-500)' }, 
    { label: 'Neutral', value: 'var(--color3-800)' },
    { label: 'Base', value: 'var(--color4-100)' }
  ],
  '--one-background': [
    { label: 'Primary', value: 'var(--color1-500)' },
    { label: 'Secondary', value: 'var(--color2-500)' },
    { label: 'Neutral', value: 'var(--color3-800)' },
    { label: 'Base', value: 'var(--color4-100)' },
    { label: 'Transparent', value: 'transparent' }
  ],
  '--one-border-color': [
    { label: 'Primary', value: 'var(--color1-500)' },
    { label: 'Secondary', value: 'var(--color2-500)' },
    { label: 'Neutral', value: 'var(--color3-800)' },
    { label: 'Base', value: 'var(--color4-100)' }
  ]
};

export function ScopesBuilder() {
  const { config, updateScopeBaseProperties, createNewScope, deleteScope } = useThemeConfig();
  const [selectedScope, setSelectedScope] = useState(null);

  const scopes = config.scopes || {};
  const currentScope = scopes[selectedScope];
  const currentBaseProperties = currentScope?.baseProperties || {};

  const handleCreateNewScope = () => {
    const scopeName = prompt('Enter scope name (e.g., "eyebrow", "title", "subtitle"):');
    if (scopeName && scopeName.trim()) {
      const cleanName = scopeName.trim().toLowerCase().replace(/\s+/g, '-');
      createNewScope(cleanName, {
        '--one-display': 'block',
        '--one-font-family': 'var(--font-family)',
        '--one-color': 'var(--color3-800)'
      });
      setSelectedScope(cleanName);
    }
  };

  return (
    <div className="one" style={{
      '--one-display': 'grid',
      '--one-grid-template-columns': '400px 1fr',
      '--one-height': '100%',
      '--one-background': 'var(--color3-950)'
    }}>
      {/* Left Sidebar */}
      <div className="one" style={{
        '--one-background': 'var(--color3-900)',
        '--one-border-right': '1px solid var(--color3-700)',
        '--one-display': 'flex',
        '--one-flex-direction': 'column',
        '--one-height': '100%'
      }}>
        {/* Sidebar Header */}
        <div className="one" style={{
          '--one-padding': '1rem',
          '--one-border-bottom': '1px solid var(--color3-700)',
          '--one-background': 'var(--color3-800)'
        }}>
          <h2 className="one" style={{
            '--one-font-size': '1.125rem',
            '--one-font-weight': '600',
            '--one-color': 'var(--color4-100)',
            '--one-margin-bottom': '0.5rem'
          }}>
            Scope Builder
          </h2>
          <p className="one" style={{
            '--one-font-size': '0.75rem',
            '--one-color': 'var(--color4-400)'
          }}>
            Create individual scopes with styling
          </p>
        </div>

        {/* Scopes List */}
        <div className="one" style={{
          '--one-flex': '1',
          '--one-overflow-y': 'auto',
          '--one-padding': '1rem'
        }}>
          <ScopesTab
            scopes={scopes}
            selectedScope={selectedScope}
            setSelectedScope={setSelectedScope}
            onCreateNewScope={handleCreateNewScope}
            onDeleteScope={deleteScope}
          />
        </div>

        {/* Sidebar Footer */}
        <div className="one" style={{
          '--one-padding': '1rem',
          '--one-border-top': '1px solid var(--color3-700)'
        }}>
          <div className="one" style={{
            '--one-font-size': '0.75rem',
            '--one-color': 'var(--color4-400)',
            '--one-text-align': 'center'
          }}>
            {selectedScope ? `Editing scope: ${selectedScope}` : 'Select a scope to edit'}
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="one" style={{
        '--one-padding': '1.5rem',
        '--one-overflow-y': 'auto',
        '--one-background': 'var(--color3-950)'
      }}>
        {selectedScope ? (
          <ScopeEditor
            scope={selectedScope}
            baseProperties={currentBaseProperties}
            onBasePropertyChange={(property, value) => {
              const updatedProperties = { ...currentBaseProperties, [property]: value };
              updateScopeBaseProperties(selectedScope, updatedProperties);
            }}
            onBasePropertyRemove={(property) => {
              const updatedProperties = { ...currentBaseProperties };
              delete updatedProperties[property];
              updateScopeBaseProperties(selectedScope, updatedProperties);
            }}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

// Scopes Tab Component
function ScopesTab({ scopes, selectedScope, setSelectedScope, onCreateNewScope, onDeleteScope }) {
  return (
    <div className="one" style={{
      '--one-display': 'flex',
      '--one-flex-direction': 'column',
      '--one-gap': '0.75rem'
    }}>
      <div className="one" style={{
        '--one-display': 'flex',
        '--one-align-items': 'center',
        '--one-justify-content': 'space-between',
        '--one-margin-bottom': '0.5rem'
      }}>
        <h3 className="one" style={{
          '--one-font-size': '1rem',
          '--one-font-weight': '600',
          '--one-color': 'var(--color4-200)'
        }}>
          Available Scopes ({Object.keys(scopes).length})
        </h3>
      </div>

      {Object.entries(scopes).map(([scopeName, scopeConfig]) => (
        <div key={scopeName} className="one" style={{
          '--one-border': '1px solid var(--color3-600)',
          '--one-border-radius': '0.375rem',
          '--one-overflow': 'hidden'
        }}>
          <button
            onClick={() => setSelectedScope(scopeName)}
            className="one"
            style={{
              '--one-width': '100%',
              '--one-padding': '1rem',
              '--one-display': 'flex',
              '--one-align-items': 'center',
              '--one-justify-content': 'space-between',
              '--one-background': selectedScope === scopeName ? 'var(--color1-600)' : 'var(--color3-800)',
              '--one-color': 'var(--color4-200)',
              '--one-cursor': 'pointer',
              '--one-border': 'none',
              '--one-text-align': 'left'
            }}
          >
            <div className="one" style={{
              '--one-flex': '1'
            }}>
              <div className="one" style={{
                '--one-font-weight': '500',
                '--one-color': 'var(--color4-100)',
                '--one-margin-bottom': '0.25rem'
              }}>
                🎭 {scopeName}
              </div>
              <div className="one" style={{
                '--one-font-size': '0.75rem',
                '--one-color': 'var(--color4-400)'
              }}>
                {Object.keys(scopeConfig.baseProperties || {}).length} properties
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const confirmed = confirm(`Delete scope "${scopeName}"? This action cannot be undone.`);
                if (confirmed) {
                  onDeleteScope(scopeName);
                  if (selectedScope === scopeName) {
                    setSelectedScope(null);
                  }
                }
              }}
              className="one"
              style={{
                '--one-padding': '0.25rem',
                '--one-background': 'var(--color1-600)',
                '--one-border': '1px solid var(--color1-500)',
                '--one-border-radius': '0.25rem',
                '--one-color': 'var(--color4-50)',
                '--one-cursor': 'pointer',
                '--one-font-size': '0.75rem',
                '--one-margin-left': '0.5rem'
              }}
            >
              ✕
            </button>
          </button>
        </div>
      ))}

      <button
        onClick={onCreateNewScope}
        className="one"
        style={{
          '--one-width': '100%',
          '--one-padding': '1rem',
          '--one-background': 'var(--color1-600)',
          '--one-border': '1px solid var(--color1-500)',
          '--one-border-radius': '0.375rem',
          '--one-color': 'var(--color4-50)',
          '--one-font-weight': '500',
          '--one-cursor': 'pointer',
          '--one-text-align': 'center'
        }}
      >
        + Add New Scope
      </button>
    </div>
  );
}


// Scope Editor Component
function ScopeEditor({ scope, baseProperties, onBasePropertyChange, onBasePropertyRemove }) {
  return (
    <div className="one" style={{
      '--one-display': 'flex',
      '--one-flex-direction': 'column',
      '--one-gap': '1.5rem'
    }}>
      <div className="one">
        <h1 className="one" style={{
          '--one-font-size': '1.5rem',
          '--one-font-weight': '600',
          '--one-color': 'var(--color4-100)',
          '--one-margin-bottom': '0.5rem'
        }}>
          🎭 {scope}
        </h1>
        <p className="one" style={{
          '--one-color': 'var(--color4-400)',
          '--one-font-size': '0.875rem'
        }}>
          Edit the styling properties for this scope
        </p>
      </div>

      <PropertyEditor
        title={`${scope} Properties`}
        properties={baseProperties}
        onPropertyChange={onBasePropertyChange}
        onPropertyRemove={onBasePropertyRemove}
        addButtonText="Add Property"
      />

      {/* Live Preview */}
      <div className="one" style={{
        '--one-background': 'var(--color3-900)',
        '--one-border': '1px solid var(--color3-700)',
        '--one-padding': '1rem',
        '--one-border-radius': '0.5rem'
      }}>
        <h3 className="one" style={{
          '--one-font-size': '1rem',
          '--one-font-weight': '600',
          '--one-color': 'var(--color4-200)',
          '--one-margin-bottom': '1rem'
        }}>
          Live Preview
        </h3>
        
        <div className="one" style={{
          '--one-background': 'var(--color4-50)',
          '--one-padding': '1.5rem',
          '--one-border-radius': '0.375rem',
          '--one-border': '1px solid var(--color3-200)'
        }}>
          <div className="one" style={{
            '--one-font-size': '0.75rem',
            '--one-color': 'var(--color3-600)',
            '--one-margin-bottom': '0.5rem',
            '--one-font-family': 'monospace'
          }}>
            &lt;div data-scope="{scope}"&gt;
          </div>
          
          <div 
            data-scope={scope}
            className="one"
            style={{
              '--one-margin': '1rem 0'
            }}
          >
            <div className="one">
              {scope === 'eyebrow' && 'Sample Eyebrow Text'}
              {scope === 'title' && 'Sample Title Text'}
              {scope === 'description' && 'Sample description text content for testing the base scope styling.'}
              {!['eyebrow', 'title', 'description'].includes(scope) && `Sample ${scope} content for testing`}
            </div>
          </div>
          
          <div className="one" style={{
            '--one-font-size': '0.75rem',
            '--one-color': 'var(--color3-600)',
            '--one-font-family': 'monospace'
          }}>
            &lt;/div&gt;
          </div>
        </div>
      </div>
    </div>
  );
}


// Property Editor Component
function PropertyEditor({ title, properties, onPropertyChange, onPropertyRemove, addButtonText }) {
  const [selectedCategory, setSelectedCategory] = useState('typography');
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  const addNewProperty = () => {
    if (selectedProperty && selectedValue) {
      onPropertyChange(selectedProperty, selectedValue);
      setSelectedProperty('');
      setSelectedValue('');
    }
  };

  return (
    <div className="one" style={{
      '--one-background': 'var(--color3-900)',
      '--one-border': '1px solid var(--color3-700)',
      '--one-padding': '1rem',
      '--one-border-radius': '0.5rem'
    }}>
      <h3 className="one" style={{
        '--one-font-size': '1rem',
        '--one-font-weight': '600',
        '--one-color': 'var(--color4-200)',
        '--one-margin-bottom': '1rem'
      }}>
        {title}
      </h3>
      
      {/* Add Property Section */}
      <div className="one" style={{
        '--one-display': 'grid',
        '--one-grid-template-columns': '120px 1fr 1fr auto',
        '--one-gap': '0.75rem',
        '--one-align-items': 'center',
        '--one-margin-bottom': '1.5rem'
      }}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="one input-field"
          style={{
            '--one-font-size': '0.875rem'
          }}
        >
          <option value="typography">Typography</option>
          <option value="layout">Layout</option>
          <option value="spacing">Spacing</option>
          <option value="appearance">Appearance</option>
        </select>

        <select
          value={selectedProperty}
          onChange={(e) => setSelectedProperty(e.target.value)}
          className="one input-field"
          style={{
            '--one-font-size': '0.875rem'
          }}
        >
          <option value="">Choose Property</option>
          {CSS_PROPERTIES[selectedCategory].map(prop => (
            <option key={prop} value={prop}>{prop}</option>
          ))}
        </select>

        {COMMON_VALUES[selectedProperty] ? (
          <select
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            className="one input-field"
            style={{
              '--one-font-size': '0.875rem'
            }}
          >
            <option value="">Choose Value</option>
            {COMMON_VALUES[selectedProperty].map(item => {
              // Handle both object format (colors) and string format (other values)
              if (typeof item === 'object') {
                return <option key={item.value} value={item.value}>{item.label}</option>;
              } else {
                return <option key={item} value={item}>{item}</option>;
              }
            })}
          </select>
        ) : (
          <input
            type="text"
            value={selectedValue}
            onChange={(e) => setSelectedValue(e.target.value)}
            placeholder="Enter value..."
            className="one input-field"
            style={{
              '--one-font-size': '0.875rem'
            }}
          />
        )}

        <button
          onClick={addNewProperty}
          disabled={!selectedProperty || !selectedValue}
          className="one button-primary"
          style={{
            '--one-font-size': '0.875rem',
            '--one-cursor': selectedProperty && selectedValue ? 'pointer' : 'not-allowed',
            '--one-opacity': selectedProperty && selectedValue ? '1' : '0.5'
          }}
        >
          Add
        </button>
      </div>

      {/* Current Properties */}
      {Object.keys(properties).length === 0 ? (
        <div className="one" style={{
          '--one-text-align': 'center',
          '--one-padding': '2rem',
          '--one-color': 'var(--color4-500)'
        }}>
          No properties set. {addButtonText} above to start.
        </div>
      ) : (
        <div className="one" style={{
          '--one-display': 'flex',
          '--one-flex-direction': 'column',
          '--one-gap': '0.75rem'
        }}>
          {Object.entries(properties).map(([property, value]) => (
            <div key={property} className="one" style={{
              '--one-display': 'flex',
              '--one-align-items': 'center',
              '--one-gap': '1rem',
              '--one-padding': '0.75rem',
              '--one-background': 'var(--color3-800)',
              '--one-border': '1px solid var(--color3-600)',
              '--one-border-radius': '0.375rem'
            }}>
              <div className="one" style={{
                '--one-min-width': '200px',
                '--one-font-family': 'monospace',
                '--one-font-size': '0.875rem',
                '--one-color': 'var(--color1-300)'
              }}>
                {property}
              </div>
              <input
                type="text"
                value={value}
                onChange={(e) => onPropertyChange(property, e.target.value)}
                className="one input-field"
                style={{
                  '--one-flex': '1',
                  '--one-font-family': 'monospace',
                  '--one-font-size': '0.875rem'
                }}
              />
              <button
                onClick={() => onPropertyRemove(property)}
                className="one"
                style={{
                  '--one-padding': '0.5rem',
                  '--one-background': 'var(--color1-600)',
                  '--one-border': '1px solid var(--color1-500)',
                  '--one-border-radius': '0.25rem',
                  '--one-color': 'var(--color4-50)',
                  '--one-cursor': 'pointer',
                  '--one-font-size': '0.75rem'
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="one" style={{
      '--one-display': 'flex',
      '--one-align-items': 'center',
      '--one-justify-content': 'center',
      '--one-height': '400px',
      '--one-text-align': 'center'
    }}>
      <div className="one">
        <div className="one" style={{
          '--one-font-size': '3rem',
          '--one-margin-bottom': '1rem'
        }}>
          🎭
        </div>
        <h3 className="one" style={{
          '--one-font-size': '1.25rem',
          '--one-font-weight': '600',
          '--one-color': 'var(--color4-200)',
          '--one-margin-bottom': '0.5rem'
        }}>
          Select a Scope
        </h3>
        <p className="one" style={{
          '--one-color': 'var(--color4-400)',
          '--one-font-size': '0.875rem'
        }}>
          Choose a scope from the sidebar to edit its styling properties
        </p>
      </div>
    </div>
  );
}