import React, { useState } from 'react';
import { useStudio1Store } from '../hooks/useStudio1Store.js';
import { useThemeConfig } from '../hooks/useThemeConfig.js';
import { ComponentVariablesTable } from '../components/ComponentVariablesTable.jsx';
import { ScopesBuilder } from '../components/ScopesBuilder.jsx';

export function Studio1ThemeBuilder({ isAdmin = false, isFrontend = false }) {
  const { config, updateConfig } = useStudio1Store();
  const { config: themeConfig, exportConfig, importConfig, resetToDefault, syncNewComponents } = useThemeConfig();
  const [activeTab, setActiveTab] = useState('components');
  const [expandedSection, setExpandedSection] = useState('components');
  
  const handleExport = () => {
    const configJson = exportConfig();
    navigator.clipboard.writeText(configJson);
    alert('Studio1 configuration copied to clipboard!');
  };
  
  const handleImport = () => {
    const input = prompt('Paste Studio1 configuration JSON:');
    if (input) {
      const success = importConfig(input);
      if (success) {
        alert('Studio1 configuration imported successfully!');
      } else {
        alert('Failed to import configuration. Please check the JSON format.');
      }
    }
  };
  
  return (
    <div className="one" style={{
      '--one-position': isFrontend ? 'fixed' : 'relative',
      '--one-top': isFrontend ? '0' : 'auto',
      '--one-left': isFrontend ? '0' : 'auto',
      '--one-right': isFrontend ? '0' : 'auto',
      '--one-bottom': isFrontend ? '0' : 'auto',
      '--one-width': isFrontend ? '100vw' : '100%',
      '--one-height': isFrontend ? '100vh' : 'auto',
      '--one-background': 'var(--color3-950)',
      '--one-z-index': isFrontend ? '50' : 'auto'
    }}>
      <div className="one" style={{
        '--one-background': 'var(--color3-900)',
        '--one-width': '100%',
        '--one-height': '100%',
        '--one-display': 'flex',
        '--one-flex-direction': 'column'
      }}>
        {/* Compact Header */}
        <div className="one theme-builder" style={{
          '--one-display': 'flex',
          '--one-align-items': 'center',
          '--one-justify-content': 'space-between',
          '--one-padding': '1rem',
          '--one-border-bottom': '1px solid var(--color3-700)',
          '--one-background': 'var(--color3-800)'
        }}>
          <div className="one">
            <h2 className="one" style={{
              '--one-font-size': '1.125rem',
              '--one-font-weight': '700',
              '--one-color': 'var(--color4-100)'
            }}>
              Studio1 Design System
            </h2>
            <p className="one" style={{
              '--one-font-size': '0.75rem',
              '--one-color': 'var(--color4-400)'
            }}>
              The One Element System • Real-time updates
            </p>
          </div>
          <div className="one" style={{
            '--one-display': 'flex',
            '--one-gap': '0.5rem'
          }}>
            <button
              onClick={handleExport}
              className="one button-primary"
              style={{
                '--one-font-size': '0.75rem',
                '--one-cursor': 'pointer',
                '--one-transition': 'all 0.2s ease'
              }}
            >
              Export
            </button>
            <button
              onClick={handleImport}
              className="one button-secondary"
              style={{
                '--one-font-size': '0.75rem',
                '--one-cursor': 'pointer',
                '--one-transition': 'all 0.2s ease'
              }}
            >
              Import
            </button>
            {isFrontend && (
              <button
                onClick={() => window.location.href = '/wp-admin/admin.php?page=studio1-dashboard'}
                className="one"
                style={{
                  '--one-padding': '0.25rem 0.5rem',
                  '--one-background': 'var(--color3-700)',
                  '--one-border': '1px solid var(--color3-600)',
                  '--one-border-radius': '0.25rem',
                  '--one-color': 'var(--color4-200)',
                  '--one-font-size': '0.75rem',
                  '--one-font-weight': '500',
                  '--one-cursor': 'pointer',
                  '--one-transition': 'all 0.2s ease'
                }}
              >
                Admin
              </button>
            )}
          </div>
        </div>

        {/* Main Layout - Different layouts for different tabs */}
        {activeTab === 'scopes' ? (
          /* Scopes Builder gets full area with its own layout */
          <div className="one" style={{
            '--one-flex': '1'
          }}>
            <ScopesBuilder />
          </div>
        ) : (
          /* Other tabs use the standard sidebar + content layout */
          <div className="one" style={{
            '--one-display': 'flex',
            '--one-flex': '1'
          }}>
            {/* Sidebar */}
            <div className="one" style={{
              '--one-width': '20rem',
              '--one-background': 'var(--color3-800)',
              '--one-border-right': '1px solid var(--color3-700)',
              '--one-display': 'flex',
              '--one-flex-direction': 'column'
            }}>
              {/* Sidebar Content */}
              <div className="one" style={{
                '--one-flex': '1',
                '--one-overflow-y': 'auto'
              }}>
                {/* Components Section */}
                <div className="one" style={{
                  '--one-border-bottom': '1px solid var(--color3-700)'
                }}>
                  <button
                    onClick={() => {
                      setExpandedSection(expandedSection === 'components' ? null : 'components');
                      setActiveTab('components');
                    }}
                    className="one nav-tab"
                    style={{
                      '--one-width': '100%',
                      '--one-padding': '0.75rem 1rem',
                      '--one-display': 'flex',
                      '--one-align-items': 'center',
                      '--one-justify-content': 'space-between',
                      '--one-background': 'var(--color3-800)',
                      '--one-border-left': expandedSection === 'components' ? '4px solid var(--color1-500)' : '4px solid transparent',
                      '--one-color': 'var(--color4-200)',
                      '--one-cursor': 'pointer',
                      '--one-transition': 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (expandedSection !== 'components') {
                        e.target.style.setProperty('--one-background', 'var(--color3-700)');
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (expandedSection !== 'components') {
                        e.target.style.setProperty('--one-background', 'var(--color3-800)');
                      }
                    }}
                  >
                    <div className="one" style={{
                      '--one-display': 'flex',
                      '--one-align-items': 'center',
                      '--one-gap': '0.75rem'
                    }}>
                      <div className="one" style={{
                        '--one-width': '1.5rem',
                        '--one-height': '1.5rem',
                        '--one-border-radius': '0.25rem',
                        '--one-background': 'var(--color1-500)',
                        '--one-display': 'flex',
                        '--one-align-items': 'center',
                        '--one-justify-content': 'center',
                        '--one-font-size': '0.75rem',
                        '--one-font-weight': '700',
                        '--one-color': 'var(--color4-50)'
                      }}>
                        🧩
                      </div>
                      <span className="one" style={{
                        '--one-font-weight': '500',
                        '--one-color': 'var(--color4-200)'
                      }}>
                        Components
                      </span>
                    </div>
                    <svg 
                      className="one"
                      style={{
                        '--one-width': '1rem',
                        '--one-height': '1rem',
                        'transform': expandedSection === 'components' ? 'rotate(180deg)' : 'rotate(0deg)',
                        'transition': 'transform 0.2s ease'
                      }}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {expandedSection === 'components' && (
                    <div className="one" style={{
                      '--one-background': 'var(--color3-900)',
                      '--one-padding': '0.5rem 1rem',
                      '--one-display': 'flex',
                      '--one-flex-direction': 'column',
                      '--one-gap': '0.25rem'
                    }}>
                      <p className="one" style={{
                        '--one-font-size': '0.75rem',
                        '--one-color': 'var(--color4-400)',
                        '--one-margin-bottom': '0.5rem'
                      }}>
                        {Object.keys(themeConfig.components || {}).length} components loaded
                      </p>
                      <div className="one" style={{
                        '--one-display': 'flex',
                        '--one-flex-wrap': 'wrap',
                        '--one-gap': '0.25rem'
                      }}>
                        {Object.keys(themeConfig.components || {}).slice(0, 8).map((componentName) => (
                          <span 
                            key={componentName} 
                            className="one" 
                            style={{
                              '--one-font-size': '0.625rem',
                              '--one-color': 'var(--color1-300)',
                              '--one-background': 'var(--color1-900)',
                              '--one-padding': '0.125rem 0.25rem',
                              '--one-border-radius': '0.125rem',
                              '--one-border': '1px solid var(--color1-700)'
                            }}
                          >
                            {componentName}
                          </span>
                        ))}
                        {Object.keys(themeConfig.components || {}).length > 8 && (
                          <span className="one" style={{
                            '--one-font-size': '0.625rem',
                            '--one-color': 'var(--color4-500)'
                          }}>
                            +{Object.keys(themeConfig.components || {}).length - 8} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Dashboard Section */}
                <div className="one" style={{
                  '--one-border-bottom': '1px solid var(--color3-700)'
                }}>
                  <button
                    onClick={() => {
                      setExpandedSection(expandedSection === 'dashboard' ? null : 'dashboard');
                      setActiveTab('dashboard');
                    }}
                    className="one"
                    style={{
                      '--one-width': '100%',
                      '--one-padding': '0.75rem 1rem',
                      '--one-display': 'flex',
                      '--one-align-items': 'center',
                      '--one-justify-content': 'space-between',
                      '--one-background': 'var(--color3-800)',
                      '--one-border-left': expandedSection === 'dashboard' ? '4px solid var(--color2-500)' : '4px solid transparent',
                      '--one-color': 'var(--color4-200)',
                      '--one-cursor': 'pointer',
                      '--one-transition': 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (expandedSection !== 'dashboard') {
                        e.target.style.setProperty('--one-background', 'var(--color3-700)');
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (expandedSection !== 'dashboard') {
                        e.target.style.setProperty('--one-background', 'var(--color3-800)');
                      }
                    }}
                  >
                    <div className="one" style={{
                      '--one-display': 'flex',
                      '--one-align-items': 'center',
                      '--one-gap': '0.75rem'
                    }}>
                      <div className="one" style={{
                        '--one-width': '1.5rem',
                        '--one-height': '1.5rem',
                        '--one-border-radius': '0.25rem',
                        '--one-background': 'var(--color2-500)',
                        '--one-display': 'flex',
                        '--one-align-items': 'center',
                        '--one-justify-content': 'center',
                        '--one-font-size': '0.75rem',
                        '--one-font-weight': '700',
                        '--one-color': 'var(--color4-50)'
                      }}>
                        📊
                      </div>
                      <span className="one" style={{
                        '--one-font-weight': '500',
                        '--one-color': 'var(--color4-200)'
                      }}>
                        Dashboard
                      </span>
                    </div>
                  </button>
                </div>

                {/* Theme Section */}
                <div className="one" style={{
                  '--one-border-bottom': '1px solid var(--color3-700)'
                }}>
                  <button
                    onClick={() => {
                      setExpandedSection(expandedSection === 'theme' ? null : 'theme');
                      setActiveTab('theme');
                    }}
                    className="one"
                    style={{
                      '--one-width': '100%',
                      '--one-padding': '0.75rem 1rem',
                      '--one-display': 'flex',
                      '--one-align-items': 'center',
                      '--one-justify-content': 'space-between',
                      '--one-background': 'var(--color3-800)',
                      '--one-border-left': expandedSection === 'theme' ? '4px solid var(--color1-500)' : '4px solid transparent',
                      '--one-color': 'var(--color4-200)',
                      '--one-cursor': 'pointer',
                      '--one-transition': 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (expandedSection !== 'theme') {
                        e.target.style.setProperty('--one-background', 'var(--color3-700)');
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (expandedSection !== 'theme') {
                        e.target.style.setProperty('--one-background', 'var(--color3-800)');
                      }
                    }}
                  >
                    <div className="one" style={{
                      '--one-display': 'flex',
                      '--one-align-items': 'center',
                      '--one-gap': '0.75rem'
                    }}>
                      <div className="one" style={{
                        '--one-width': '1.5rem',
                        '--one-height': '1.5rem',
                        '--one-border-radius': '0.25rem',
                        '--one-background': 'var(--color1-500)',
                        '--one-display': 'flex',
                        '--one-align-items': 'center',
                        '--one-justify-content': 'center',
                        '--one-font-size': '0.75rem',
                        '--one-font-weight': '700',
                        '--one-color': 'var(--color4-50)'
                      }}>
                        🎨
                      </div>
                      <span className="one" style={{
                        '--one-font-weight': '500',
                        '--one-color': 'var(--color4-200)'
                      }}>
                        Theme
                      </span>
                    </div>
                  </button>
                </div>

                {/* Scopes Section */}
                <div className="one" style={{
                  '--one-border-bottom': '1px solid var(--color3-700)'
                }}>
                  <button
                    onClick={() => {
                      setExpandedSection(expandedSection === 'scopes' ? null : 'scopes');
                      setActiveTab('scopes');
                    }}
                    className="one"
                    style={{
                      '--one-width': '100%',
                      '--one-padding': '0.75rem 1rem',
                      '--one-display': 'flex',
                      '--one-align-items': 'center',
                      '--one-justify-content': 'space-between',
                      '--one-background': 'var(--color3-800)',
                      '--one-border-left': expandedSection === 'scopes' ? '4px solid var(--color3-500)' : '4px solid transparent',
                      '--one-color': 'var(--color4-200)',
                      '--one-cursor': 'pointer',
                      '--one-transition': 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (expandedSection !== 'scopes') {
                        e.target.style.setProperty('--one-background', 'var(--color3-700)');
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (expandedSection !== 'scopes') {
                        e.target.style.setProperty('--one-background', 'var(--color3-800)');
                      }
                    }}
                  >
                    <div className="one" style={{
                      '--one-display': 'flex',
                      '--one-align-items': 'center',
                      '--one-gap': '0.75rem'
                    }}>
                      <div className="one" style={{
                        '--one-width': '1.5rem',
                        '--one-height': '1.5rem',
                        '--one-border-radius': '0.25rem',
                        '--one-background': 'var(--color3-500)',
                        '--one-display': 'flex',
                        '--one-align-items': 'center',
                        '--one-justify-content': 'center',
                        '--one-font-size': '0.75rem',
                        '--one-font-weight': '700',
                        '--one-color': 'var(--color4-50)'
                      }}>
                        🎭
                      </div>
                      <span className="one" style={{
                        '--one-font-weight': '500',
                        '--one-color': 'var(--color4-200)'
                      }}>
                        Scopes
                      </span>
                    </div>
                    <svg 
                      className="one"
                      style={{
                        '--one-width': '1rem',
                        '--one-height': '1rem',
                        'transform': expandedSection === 'scopes' ? 'rotate(180deg)' : 'rotate(0deg)',
                        'transition': 'transform 0.2s ease'
                      }}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {expandedSection === 'scopes' && (
                    <div className="one" style={{
                      '--one-background': 'var(--color3-900)',
                      '--one-padding': '0.5rem 1rem',
                      '--one-display': 'flex',
                      '--one-flex-direction': 'column',
                      '--one-gap': '0.25rem'
                    }}>
                      <p className="one" style={{
                        '--one-font-size': '0.75rem',
                        '--one-color': 'var(--color4-400)',
                        '--one-margin-bottom': '0.5rem'
                      }}>
                        {Object.keys(themeConfig.scopes || {}).length} scopes with presets
                      </p>
                      <div className="one" style={{
                        '--one-display': 'flex',
                        '--one-flex-wrap': 'wrap',
                        '--one-gap': '0.25rem'
                      }}>
                        {Object.entries(themeConfig.scopes || {}).map(([scopeName, scopeConfig]) => (
                          <span 
                            key={scopeName} 
                            className="one" 
                            style={{
                              '--one-font-size': '0.625rem',
                              '--one-color': 'var(--color3-300)',
                              '--one-background': 'var(--color3-800)',
                              '--one-padding': '0.125rem 0.25rem',
                              '--one-border-radius': '0.125rem',
                              '--one-border': '1px solid var(--color3-600)'
                            }}
                          >
                            {scopeName} ({Object.keys(scopeConfig.presets || {}).length})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="one" style={{
                '--one-margin-top': 'auto',
                '--one-padding': '1rem',
                '--one-display': 'flex',
                '--one-flex-direction': 'column',
                '--one-gap': '0.5rem'
              }}>
                <button
                  onClick={() => {
                    syncNewComponents();
                    alert('New components synced!');
                  }}
                  className="one"
                  style={{
                    '--one-width': '100%',
                    '--one-padding': '0.75rem 1rem',
                    '--one-background': 'var(--color1-500)',
                    '--one-border': '1px solid var(--color1-400)',
                    '--one-border-radius': '0.375rem',
                    '--one-color': 'var(--color4-50)',
                    '--one-font-size': '0.875rem',
                    '--one-font-weight': '600',
                    '--one-cursor': 'pointer',
                    '--one-transition': 'all 0.2s ease'
                  }}
                >
                  Sync New
                </button>
                <button
                  onClick={() => {
                    const confirmed = confirm('⚠️ Reset all custom styles?');
                    if (confirmed) {
                      resetToDefault();
                      alert('Reset to defaults.');
                    }
                  }}
                  className="one"
                  style={{
                    '--one-width': '100%',
                    '--one-padding': '0.75rem 1rem',
                    '--one-background': 'var(--color1-600)',
                    '--one-border': '1px solid var(--color1-500)',
                    '--one-border-radius': '0.375rem',
                    '--one-color': 'var(--color4-50)',
                    '--one-font-size': '0.875rem',
                    '--one-font-weight': '600',
                    '--one-cursor': 'pointer',
                    '--one-transition': 'all 0.2s ease'
                  }}
                >
                  Reset All
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="one" style={{
              '--one-flex': '1',
              '--one-padding': '1.5rem',
              '--one-overflow-y': 'auto'
            }}>
              {activeTab === 'dashboard' && <DashboardView />}
              {activeTab === 'theme' && <ThemeView />}
              {activeTab === 'components' && <ComponentVariablesTable />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardView() {
  const { config } = useStudio1Store();
  const { config: themeConfig } = useThemeConfig();
  
  return (
    <div className="one" style={{ '--one-padding': '1.5rem', '--one-display': 'flex', '--one-flex-direction': 'column', '--one-gap': '1.5rem' }}>
      <div className="one" style={{ '--one-display': 'flex', '--one-flex-direction': 'column', '--one-gap': '0.5rem' }}>
        <h1 className="one" style={{ '--one-font-size': '1.5rem', '--one-font-weight': '600', '--one-color': 'var(--color4-100)' }}>
          Studio1 Design System
        </h1>
        <p className="one" style={{ '--one-color': 'var(--color4-400)', '--one-font-size': '1rem' }}>
          The One Element System - Revolutionary unified architecture
        </p>
      </div>
      
      {/* Foundation Complete Status */}
      <div className="one" style={{ 
        '--one-background': 'var(--color3-900)', 
        '--one-border': '1px solid var(--color3-700)', 
        '--one-padding': '1rem', 
        '--one-border-radius': '0.5rem' 
      }}>
        <h2 className="one" style={{ '--one-font-size': '1.125rem', '--one-font-weight': '600', '--one-color': 'var(--color1-400)', '--one-margin-bottom': '0.75rem' }}>
          ✅ Revolutionary Foundation Complete
        </h2>
        <div className="one" style={{ '--one-display': 'flex', '--one-flex-direction': 'column', '--one-gap': '0.5rem' }}>
          <p className="one" style={{ '--one-color': 'var(--color4-300)', '--one-font-size': '0.875rem' }}>
            • The .one element with 80+ CSS properties unified
          </p>
          <p className="one" style={{ '--one-color': 'var(--color4-300)', '--one-font-size': '0.875rem' }}>
            • Perfect --one- variable naming consistency
          </p>
          <p className="one" style={{ '--one-color': 'var(--color4-300)', '--one-font-size': '0.875rem' }}>
            • JSON-driven component system with unified variables
          </p>
          <p className="one" style={{ '--one-color': 'var(--color4-300)', '--one-font-size': '0.875rem' }}>
            • Studio1 plugin architecture complete
          </p>
        </div>
        <div className="one" style={{ '--one-margin-top': '1rem' }}>
          <p className="one" style={{ '--one-color': 'var(--color1-300)', '--one-font-weight': '500', '--one-font-size': '0.875rem' }}>
            🎉 Every element can now be anything - Figma-like flexibility for web!
          </p>
        </div>
      </div>
      
      {/* Brand Colors Preview */}
      <div className="one" style={{ '--one-display': 'flex', '--one-flex-direction': 'column', '--one-gap': '1rem' }}>
        <h2 className="one" style={{ '--one-font-size': '1.125rem', '--one-font-weight': '600', '--one-color': 'var(--color4-200)' }}>
          Studio1 Brand Colors
        </h2>
        <div className="one" style={{ '--one-display': 'flex', '--one-gap': '1rem' }}>
          {Object.entries(config.brand).map(([name, color]) => (
            <div key={name} className="one" style={{ '--one-display': 'flex', '--one-flex-direction': 'column', '--one-gap': '0.5rem', '--one-align-items': 'center' }}>
              <div 
                className="one"
                style={{ 
                  '--one-background': color,
                  '--one-width': '60px', 
                  '--one-height': '60px',
                  '--one-border-radius': '0.5rem',
                  '--one-border': '2px solid var(--color3-700)'
                }}
              />
              <div className="one" style={{ '--one-font-size': '0.75rem', '--one-color': 'var(--color4-400)', '--one-font-weight': '500' }}>
                {name}
              </div>
              <div className="one" style={{ '--one-font-size': '0.625rem', '--one-color': 'var(--color4-500)', '--one-font-family': 'monospace' }}>
                {color}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Component Count */}
      <div className="one" style={{ 
        '--one-background': 'var(--color3-800)', 
        '--one-border': '1px solid var(--color3-600)', 
        '--one-padding': '1rem', 
        '--one-border-radius': '0.5rem' 
      }}>
        <h2 className="one" style={{ '--one-font-size': '1rem', '--one-font-weight': '600', '--one-color': 'var(--color4-200)', '--one-margin-bottom': '0.5rem' }}>
          Component Variables Loaded
        </h2>
        <p className="one" style={{ '--one-color': 'var(--color4-400)', '--one-font-size': '0.875rem' }}>
          {Object.keys(themeConfig.components || {}).length} components using unified --one- variables
        </p>
        <div className="one" style={{ '--one-margin-top': '0.75rem', '--one-display': 'flex', '--one-flex-wrap': 'wrap', '--one-gap': '0.5rem' }}>
          {Object.keys(themeConfig.components || {}).map((componentName) => (
            <span 
              key={componentName} 
              className="one" 
              style={{ 
                '--one-font-size': '0.75rem', 
                '--one-color': 'var(--color1-300)', 
                '--one-background': 'var(--color1-900)', 
                '--one-padding': '0.25rem 0.5rem', 
                '--one-border-radius': '0.25rem',
                '--one-border': '1px solid var(--color1-700)'
              }}
            >
              {componentName}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ThemeView() {
  return (
    <div className="one" style={{ 
      '--one-min-height': '200px',
      '--one-display': 'flex',
      '--one-align-items': 'center',
      '--one-justify-content': 'center'
    }}>
      <div className="one" style={{
        '--one-color': 'var(--color4-300)',
        '--one-font-size': '1rem'
      }}>
        Theme Builder - Coming Soon
      </div>
    </div>
  );
}

