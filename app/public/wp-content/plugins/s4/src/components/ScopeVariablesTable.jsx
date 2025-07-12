import React, { useState } from 'react';
import { useThemeConfig } from '../hooks/useThemeConfig.js';

export function ScopeVariablesTable() {
  const { config, updateScopePreset } = useThemeConfig();
  const [selectedScope, setSelectedScope] = useState('text-element');
  const [selectedPreset, setSelectedPreset] = useState('title');
  const [expandedScope, setExpandedScope] = useState('text-element');

  const scopes = config.scopes || {};
  const currentScope = scopes[selectedScope];
  const currentPreset = currentScope?.presets?.[selectedPreset] || {};

  const handlePropertyChange = (property, value) => {
    const updatedPreset = {
      ...currentPreset,
      [property]: value
    };
    updateScopePreset(selectedScope, selectedPreset, updatedPreset);
  };

  const addNewProperty = () => {
    const property = prompt('Enter CSS property name (with --one- prefix):');
    if (property && property.startsWith('--one-')) {
      const value = prompt('Enter property value:');
      if (value) {
        handlePropertyChange(property, value);
      }
    } else if (property) {
      alert('Property must start with --one- prefix');
    }
  };

  const removeProperty = (property) => {
    const updatedPreset = { ...currentPreset };
    delete updatedPreset[property];
    updateScopePreset(selectedScope, selectedPreset, updatedPreset);
  };

  return (
    <div className="one" style={{
      '--one-display': 'flex',
      '--one-flex-direction': 'column',
      '--one-gap': '1.5rem',
      '--one-padding': '1.5rem'
    }}>
      {/* Header */}
      <div className="one" style={{
        '--one-display': 'flex',
        '--one-flex-direction': 'column',
        '--one-gap': '0.5rem'
      }}>
        <h1 className="one" style={{
          '--one-font-size': '1.5rem',
          '--one-font-weight': '600',
          '--one-color': 'var(--color4-100)'
        }}>
          Scope Preset Manager
        </h1>
        <p className="one" style={{
          '--one-color': 'var(--color4-400)',
          '--one-font-size': '0.875rem'
        }}>
          Manage preset variations for unified .one element scopes
        </p>
      </div>

      {/* Scope Selector */}
      <div className="one" style={{
        '--one-background': 'var(--color3-900)',
        '--one-border': '1px solid var(--color3-700)',
        '--one-padding': '1rem',
        '--one-border-radius': '0.5rem'
      }}>
        <h2 className="one" style={{
          '--one-font-size': '1.125rem',
          '--one-font-weight': '600',
          '--one-color': 'var(--color4-200)',
          '--one-margin-bottom': '1rem'
        }}>
          Available Scopes
        </h2>
        
        <div className="one" style={{
          '--one-display': 'flex',
          '--one-flex-direction': 'column',
          '--one-gap': '0.5rem'
        }}>
          {Object.entries(scopes).map(([scopeName, scopeConfig]) => (
            <div key={scopeName} className="one" style={{
              '--one-border': '1px solid var(--color3-600)',
              '--one-border-radius': '0.375rem',
              '--one-overflow': 'hidden'
            }}>
              <button
                onClick={() => {
                  setSelectedScope(scopeName);
                  setExpandedScope(expandedScope === scopeName ? null : scopeName);
                  if (scopeConfig.presets) {
                    setSelectedPreset(Object.keys(scopeConfig.presets)[0]);
                  }
                }}
                className="one"
                style={{
                  '--one-width': '100%',
                  '--one-padding': '0.75rem 1rem',
                  '--one-display': 'flex',
                  '--one-align-items': 'center',
                  '--one-justify-content': 'space-between',
                  '--one-background': selectedScope === scopeName ? 'var(--color3-700)' : 'var(--color3-800)',
                  '--one-color': 'var(--color4-200)',
                  '--one-cursor': 'pointer',
                  '--one-transition': 'all 0.2s ease',
                  '--one-border': 'none'
                }}
              >
                <div className="one" style={{
                  '--one-display': 'flex',
                  '--one-align-items': 'center',
                  '--one-gap': '0.75rem'
                }}>
                  <div className="one" style={{
                    '--one-width': '2rem',
                    '--one-height': '2rem',
                    '--one-border-radius': '0.25rem',
                    '--one-background': 'var(--color3-500)',
                    '--one-display': 'flex',
                    '--one-align-items': 'center',
                    '--one-justify-content': 'center',
                    '--one-font-size': '0.875rem'
                  }}>
                    🎭
                  </div>
                  <div className="one" style={{
                    '--one-display': 'flex',
                    '--one-flex-direction': 'column',
                    '--one-align-items': 'flex-start',
                    '--one-gap': '0.25rem'
                  }}>
                    <span className="one" style={{
                      '--one-font-weight': '500',
                      '--one-color': 'var(--color4-100)'
                    }}>
                      {scopeName}
                    </span>
                    <span className="one" style={{
                      '--one-font-size': '0.75rem',
                      '--one-color': 'var(--color4-400)'
                    }}>
                      {Object.keys(scopeConfig.presets || {}).length} presets
                    </span>
                  </div>
                </div>
                <svg 
                  className="one"
                  style={{
                    '--one-width': '1rem',
                    '--one-height': '1rem',
                    'transform': expandedScope === scopeName ? 'rotate(180deg)' : 'rotate(0deg)',
                    'transition': 'transform 0.2s ease'
                  }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedScope === scopeName && scopeConfig.presets && (
                <div className="one" style={{
                  '--one-background': 'var(--color3-950)',
                  '--one-padding': '1rem',
                  '--one-display': 'flex',
                  '--one-flex-wrap': 'wrap',
                  '--one-gap': '0.5rem'
                }}>
                  {Object.keys(scopeConfig.presets).map((presetName) => (
                    <button
                      key={presetName}
                      onClick={() => setSelectedPreset(presetName)}
                      className="one"
                      style={{
                        '--one-padding': '0.5rem 0.75rem',
                        '--one-background': selectedPreset === presetName ? 'var(--color1-500)' : 'var(--color3-800)',
                        '--one-border': selectedPreset === presetName ? '1px solid var(--color1-400)' : '1px solid var(--color3-600)',
                        '--one-border-radius': '0.25rem',
                        '--one-color': selectedPreset === presetName ? 'var(--color4-50)' : 'var(--color4-300)',
                        '--one-font-size': '0.875rem',
                        '--one-font-weight': selectedPreset === presetName ? '500' : '400',
                        '--one-cursor': 'pointer',
                        '--one-transition': 'all 0.2s ease'
                      }}
                    >
                      {presetName}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Preset Editor */}
      {selectedScope && selectedPreset && (
        <div className="one" style={{
          '--one-background': 'var(--color3-900)',
          '--one-border': '1px solid var(--color3-700)',
          '--one-padding': '1rem',
          '--one-border-radius': '0.5rem'
        }}>
          <div className="one" style={{
            '--one-display': 'flex',
            '--one-align-items': 'center',
            '--one-justify-content': 'space-between',
            '--one-margin-bottom': '1rem'
          }}>
            <h2 className="one" style={{
              '--one-font-size': '1.125rem',
              '--one-font-weight': '600',
              '--one-color': 'var(--color4-200)'
            }}>
              Editing: {selectedScope} → {selectedPreset}
            </h2>
            <button
              onClick={addNewProperty}
              className="one button-primary"
              style={{
                '--one-font-size': '0.875rem',
                '--one-cursor': 'pointer'
              }}
            >
              Add Property
            </button>
          </div>

          {/* Base Properties Info */}
          {currentScope?.baseProperties && (
            <div className="one" style={{
              '--one-background': 'var(--color3-800)',
              '--one-border': '1px solid var(--color3-600)',
              '--one-padding': '0.75rem',
              '--one-border-radius': '0.375rem',
              '--one-margin-bottom': '1rem'
            }}>
              <h3 className="one" style={{
                '--one-font-size': '0.875rem',
                '--one-font-weight': '500',
                '--one-color': 'var(--color4-300)',
                '--one-margin-bottom': '0.5rem'
              }}>
                Base Properties (inherited by all presets)
              </h3>
              <div className="one" style={{
                '--one-display': 'flex',
                '--one-flex-wrap': 'wrap',
                '--one-gap': '0.5rem'
              }}>
                {Object.entries(currentScope.baseProperties).map(([prop, value]) => (
                  <span key={prop} className="one" style={{
                    '--one-font-size': '0.75rem',
                    '--one-color': 'var(--color4-400)',
                    '--one-background': 'var(--color3-700)',
                    '--one-padding': '0.25rem 0.5rem',
                    '--one-border-radius': '0.25rem',
                    '--one-font-family': 'monospace'
                  }}>
                    {prop}: {value}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Property Editor */}
          <div className="one" style={{
            '--one-display': 'flex',
            '--one-flex-direction': 'column',
            '--one-gap': '0.75rem'
          }}>
            {Object.entries(currentPreset).map(([property, value]) => (
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
                  onChange={(e) => handlePropertyChange(property, e.target.value)}
                  className="one input-field"
                  style={{
                    '--one-flex': '1',
                    '--one-font-family': 'monospace',
                    '--one-font-size': '0.875rem'
                  }}
                />
                <button
                  onClick={() => removeProperty(property)}
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
            
            {Object.keys(currentPreset).length === 0 && (
              <div className="one" style={{
                '--one-text-align': 'center',
                '--one-padding': '2rem',
                '--one-color': 'var(--color4-500)'
              }}>
                No properties set for this preset. Click "Add Property" to start.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Preview Section */}
      {selectedScope && selectedPreset && (
        <div className="one" style={{
          '--one-background': 'var(--color3-900)',
          '--one-border': '1px solid var(--color3-700)',
          '--one-padding': '1rem',
          '--one-border-radius': '0.5rem'
        }}>
          <h2 className="one" style={{
            '--one-font-size': '1.125rem',
            '--one-font-weight': '600',
            '--one-color': 'var(--color4-200)',
            '--one-margin-bottom': '1rem'
          }}>
            Live Preview
          </h2>
          
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
              &lt;div data-scope="{selectedScope}" data-preset="{selectedPreset}"&gt;
            </div>
            
            <div 
              data-scope={selectedScope} 
              data-preset={selectedPreset}
              className="one"
              style={{
                '--one-margin': '1rem 0'
              }}
            >
              <div className="one">
                {selectedPreset === 'eyebrow' && 'NEW COLLECTION'}
                {selectedPreset === 'title' && 'Featured Properties'}
                {selectedPreset === 'description' && 'Discover our most exclusive properties, carefully curated for the ultimate luxury experience.'}
                {!['eyebrow', 'title', 'description'].includes(selectedPreset) && `Sample ${selectedPreset} text content`}
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
      )}
    </div>
  );
}