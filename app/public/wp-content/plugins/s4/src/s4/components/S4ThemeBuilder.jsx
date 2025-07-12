import React, { useState } from 'react';
import { useS4Store } from '../../hooks/useS4Store.js';
import { useThemeConfig } from '../../hooks/useThemeConfig.js';
import { ComponentVariablesTable } from '../../components/ComponentVariablesTable.jsx';

export function S4ThemeBuilder({ isAdmin = false, isFrontend = false }) {
  const { config, updateConfig } = useS4Store();
  const { config: themeConfig, exportConfig, importConfig, resetToDefault, syncNewComponents } = useThemeConfig();
  const [activeTab, setActiveTab] = useState('components');
  const [expandedSection, setExpandedSection] = useState('components');
  
  const handleExport = () => {
    const configJson = exportConfig();
    navigator.clipboard.writeText(configJson);
    alert('S4 configuration copied to clipboard!');
  };
  
  const handleImport = () => {
    const input = prompt('Paste S4 configuration JSON:');
    if (input) {
      const success = importConfig(input);
      if (success) {
        alert('S4 configuration imported successfully!');
      } else {
        alert('Failed to import configuration. Please check the JSON format.');
      }
    }
  };
  
  return (
    <div className="box" style={{
      '--box-position': isFrontend ? 'fixed' : 'relative',
      '--box-top': isFrontend ? '0' : 'auto',
      '--box-left': isFrontend ? '0' : 'auto',
      '--box-right': isFrontend ? '0' : 'auto',
      '--box-bottom': isFrontend ? '0' : 'auto',
      '--box-width': isFrontend ? '100vw' : '100%',
      '--box-height': isFrontend ? '100vh' : 'auto',
      '--box-background': 'var(--color3-950)',
      '--box-z-index': isFrontend ? '50' : 'auto'
    }}>
      <div className="box" style={{
        '--box-background': 'var(--color3-900)',
        '--box-width': '100%',
        '--box-height': '100%',
        '--box-display': 'flex',
        '--box-flex-direction': 'column'
      }}>
        {/* Compact Header */}
        <div className="box" style={{
          '--box-display': 'flex',
          '--box-align-items': 'center',
          '--box-justify-content': 'space-between',
          '--box-padding': '1rem',
          '--box-border-bottom': '1px solid var(--color3-700)',
          '--box-background': 'var(--color3-800)'
        }}>
          <div className="box">
            <h2 className="text" style={{
              '--text-font-size': '1.125rem',
              '--text-font-weight': '700',
              '--text-color': 'var(--color4-100)'
            }}>
              S4 Design System
            </h2>
            <p className="text" style={{
              '--text-font-size': '0.75rem',
              '--text-color': 'var(--color4-400)'
            }}>
              Component variables editor • Real-time updates
            </p>
          </div>
          <div className="box" style={{
            '--box-display': 'flex',
            '--box-gap': '0.5rem'
          }}>
            <button
              onClick={handleExport}
              className="box text"
              style={{
                '--box-padding': '0.25rem 0.5rem',
                '--box-background': 'var(--color2-500)',
                '--box-border': '1px solid var(--color2-400)',
                '--box-border-radius': '0.25rem',
                '--text-color': 'var(--color4-50)',
                '--text-font-size': '0.75rem',
                '--text-font-weight': '500',
                'cursor': 'pointer',
                'transition': 'all 0.2s ease'
              }}
            >
              Export
            </button>
            <button
              onClick={handleImport}
              className="box text"
              style={{
                '--box-padding': '0.25rem 0.5rem',
                '--box-background': 'var(--color3-700)',
                '--box-border': '1px solid var(--color3-600)',
                '--box-border-radius': '0.25rem',
                '--text-color': 'var(--color4-200)',
                '--text-font-size': '0.75rem',
                '--text-font-weight': '500',
                'cursor': 'pointer',
                'transition': 'all 0.2s ease'
              }}
            >
              Import
            </button>
            {isFrontend && (
              <button
                onClick={() => window.location.href = '/wp-admin/admin.php?page=s4-dashboard'}
                className="box text"
                style={{
                  '--box-padding': '0.25rem 0.5rem',
                  '--box-background': 'var(--color3-700)',
                  '--box-border': '1px solid var(--color3-600)',
                  '--box-border-radius': '0.25rem',
                  '--text-color': 'var(--color4-200)',
                  '--text-font-size': '0.75rem',
                  '--text-font-weight': '500',
                  'cursor': 'pointer',
                  'transition': 'all 0.2s ease'
                }}
              >
                Admin
              </button>
            )}
          </div>
        </div>

        {/* Main Layout */}
        <div className="box" style={{
          '--box-display': 'flex',
          '--box-flex': '1'
        }}>
          {/* Sidebar */}
          <div className="box" style={{
            '--box-width': '20rem',
            '--box-background': 'var(--color3-800)',
            '--box-border-right': '1px solid var(--color3-700)',
            '--box-display': 'flex',
            '--box-flex-direction': 'column'
          }}>
            {/* Sidebar Content */}
            <div className="box" style={{
              '--box-flex': '1',
              '--box-overflow-y': 'auto'
            }}>
              {/* Components Section */}
              <div className="box" style={{
                '--box-border-bottom': '1px solid var(--color3-700)'
              }}>
                <button
                  onClick={() => {
                    setExpandedSection(expandedSection === 'components' ? null : 'components');
                    setActiveTab('components');
                  }}
                  className="box text"
                  style={{
                    '--box-width': '100%',
                    '--box-padding': '0.75rem 1rem',
                    '--box-display': 'flex',
                    '--box-align-items': 'center',
                    '--box-justify-content': 'space-between',
                    '--box-background': 'var(--color3-800)',
                    '--box-border-left': expandedSection === 'components' ? '4px solid var(--color1-500)' : '4px solid transparent',
                    '--text-color': 'var(--color4-200)',
                    'cursor': 'pointer',
                    'transition': 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (expandedSection !== 'components') {
                      e.target.style.setProperty('--box-background', 'var(--color3-700)');
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (expandedSection !== 'components') {
                      e.target.style.setProperty('--box-background', 'var(--color3-800)');
                    }
                  }}
                >
                  <div className="box" style={{
                    '--box-display': 'flex',
                    '--box-align-items': 'center',
                    '--box-gap': '0.75rem'
                  }}>
                    <div className="box text" style={{
                      '--box-width': '1.5rem',
                      '--box-height': '1.5rem',
                      '--box-border-radius': '0.25rem',
                      '--box-background': 'var(--color1-500)',
                      '--box-display': 'flex',
                      '--box-align-items': 'center',
                      '--box-justify-content': 'center',
                      '--text-font-size': '0.75rem',
                      '--text-font-weight': '700',
                      '--text-color': 'var(--color4-50)'
                    }}>
                      🧩
                    </div>
                    <span className="text" style={{
                      '--text-font-weight': '500',
                      '--text-color': 'var(--color4-200)'
                    }}>
                      Components
                    </span>
                  </div>
                  <svg 
                    className="box"
                    style={{
                      '--box-width': '1rem',
                      '--box-height': '1rem',
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
                  <div className="box" style={{
                    '--box-background': 'var(--color3-900)',
                    '--box-padding': '0.5rem 1rem',
                    '--box-display': 'flex',
                    '--box-flex-direction': 'column',
                    '--box-gap': '0.25rem'
                  }}>
                    <p className="text" style={{
                      '--text-font-size': '0.75rem',
                      '--text-color': 'var(--color4-400)',
                      '--text-margin-bottom': '0.5rem'
                    }}>
                      {Object.keys(themeConfig.components || {}).length} components loaded
                    </p>
                    <div className="box" style={{
                      '--box-display': 'flex',
                      '--box-flex-wrap': 'wrap',
                      '--box-gap': '0.25rem'
                    }}>
                      {Object.keys(themeConfig.components || {}).slice(0, 8).map((componentName) => (
                        <span 
                          key={componentName} 
                          className="text" 
                          style={{
                            '--text-font-size': '0.625rem',
                            '--text-color': 'var(--color1-300)',
                            '--text-background': 'var(--color1-900)',
                            '--text-padding': '0.125rem 0.25rem',
                            '--text-border-radius': '0.125rem',
                            '--text-border': '1px solid var(--color1-700)'
                          }}
                        >
                          {componentName}
                        </span>
                      ))}
                      {Object.keys(themeConfig.components || {}).length > 8 && (
                        <span className="text" style={{
                          '--text-font-size': '0.625rem',
                          '--text-color': 'var(--color4-500)'
                        }}>
                          +{Object.keys(themeConfig.components || {}).length - 8} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Dashboard Section */}
              <div className="box" style={{
                '--box-border-bottom': '1px solid var(--color3-700)'
              }}>
                <button
                  onClick={() => {
                    setExpandedSection(expandedSection === 'dashboard' ? null : 'dashboard');
                    setActiveTab('dashboard');
                  }}
                  className="box text"
                  style={{
                    '--box-width': '100%',
                    '--box-padding': '0.75rem 1rem',
                    '--box-display': 'flex',
                    '--box-align-items': 'center',
                    '--box-justify-content': 'space-between',
                    '--box-background': 'var(--color3-800)',
                    '--box-border-left': expandedSection === 'dashboard' ? '4px solid var(--color2-500)' : '4px solid transparent',
                    '--text-color': 'var(--color4-200)',
                    'cursor': 'pointer',
                    'transition': 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (expandedSection !== 'dashboard') {
                      e.target.style.setProperty('--box-background', 'var(--color3-700)');
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (expandedSection !== 'dashboard') {
                      e.target.style.setProperty('--box-background', 'var(--color3-800)');
                    }
                  }}
                >
                  <div className="box" style={{
                    '--box-display': 'flex',
                    '--box-align-items': 'center',
                    '--box-gap': '0.75rem'
                  }}>
                    <div className="box text" style={{
                      '--box-width': '1.5rem',
                      '--box-height': '1.5rem',
                      '--box-border-radius': '0.25rem',
                      '--box-background': 'var(--color2-500)',
                      '--box-display': 'flex',
                      '--box-align-items': 'center',
                      '--box-justify-content': 'center',
                      '--text-font-size': '0.75rem',
                      '--text-font-weight': '700',
                      '--text-color': 'var(--color4-50)'
                    }}>
                      📊
                    </div>
                    <span className="text" style={{
                      '--text-font-weight': '500',
                      '--text-color': 'var(--color4-200)'
                    }}>
                      Dashboard
                    </span>
                  </div>
                </button>
              </div>

              {/* Theme Section */}
              <div className="box" style={{
                '--box-border-bottom': '1px solid var(--color3-700)'
              }}>
                <button
                  onClick={() => {
                    setExpandedSection(expandedSection === 'theme' ? null : 'theme');
                    setActiveTab('theme');
                  }}
                  className="box text"
                  style={{
                    '--box-width': '100%',
                    '--box-padding': '0.75rem 1rem',
                    '--box-display': 'flex',
                    '--box-align-items': 'center',
                    '--box-justify-content': 'space-between',
                    '--box-background': 'var(--color3-800)',
                    '--box-border-left': expandedSection === 'theme' ? '4px solid var(--color1-500)' : '4px solid transparent',
                    '--text-color': 'var(--color4-200)',
                    'cursor': 'pointer',
                    'transition': 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (expandedSection !== 'theme') {
                      e.target.style.setProperty('--box-background', 'var(--color3-700)');
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (expandedSection !== 'theme') {
                      e.target.style.setProperty('--box-background', 'var(--color3-800)');
                    }
                  }}
                >
                  <div className="box" style={{
                    '--box-display': 'flex',
                    '--box-align-items': 'center',
                    '--box-gap': '0.75rem'
                  }}>
                    <div className="box text" style={{
                      '--box-width': '1.5rem',
                      '--box-height': '1.5rem',
                      '--box-border-radius': '0.25rem',
                      '--box-background': 'var(--color1-500)',
                      '--box-display': 'flex',
                      '--box-align-items': 'center',
                      '--box-justify-content': 'center',
                      '--text-font-size': '0.75rem',
                      '--text-font-weight': '700',
                      '--text-color': 'var(--color4-50)'
                    }}>
                      🎨
                    </div>
                    <span className="text" style={{
                      '--text-font-weight': '500',
                      '--text-color': 'var(--color4-200)'
                    }}>
                      Theme
                    </span>
                  </div>
                </button>
              </div>

              {/* Presets Section */}
              <div className="box" style={{
                '--box-border-bottom': '1px solid var(--color3-700)'
              }}>
                <button
                  onClick={() => {
                    setExpandedSection(expandedSection === 'presets' ? null : 'presets');
                    setActiveTab('presets');
                  }}
                  className="box text"
                  style={{
                    '--box-width': '100%',
                    '--box-padding': '0.75rem 1rem',
                    '--box-display': 'flex',
                    '--box-align-items': 'center',
                    '--box-justify-content': 'space-between',
                    '--box-background': 'var(--color3-800)',
                    '--box-border-left': expandedSection === 'presets' ? '4px solid var(--color3-500)' : '4px solid transparent',
                    '--text-color': 'var(--color4-200)',
                    'cursor': 'pointer',
                    'transition': 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (expandedSection !== 'presets') {
                      e.target.style.setProperty('--box-background', 'var(--color3-700)');
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (expandedSection !== 'presets') {
                      e.target.style.setProperty('--box-background', 'var(--color3-800)');
                    }
                  }}
                >
                  <div className="box" style={{
                    '--box-display': 'flex',
                    '--box-align-items': 'center',
                    '--box-gap': '0.75rem'
                  }}>
                    <div className="box text" style={{
                      '--box-width': '1.5rem',
                      '--box-height': '1.5rem',
                      '--box-border-radius': '0.25rem',
                      '--box-background': 'var(--color3-500)',
                      '--box-display': 'flex',
                      '--box-align-items': 'center',
                      '--box-justify-content': 'center',
                      '--text-font-size': '0.75rem',
                      '--text-font-weight': '700',
                      '--text-color': 'var(--color4-50)'
                    }}>
                      🎭
                    </div>
                    <span className="text" style={{
                      '--text-font-weight': '500',
                      '--text-color': 'var(--color4-200)'
                    }}>
                      Presets
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="box" style={{
              '--box-margin-top': 'auto',
              '--box-padding': '1rem',
              '--box-display': 'flex',
              '--box-flex-direction': 'column',
              '--box-gap': '0.5rem'
            }}>
              <button
                onClick={() => {
                  syncNewComponents();
                  alert('New components synced!');
                }}
                className="box text"
                style={{
                  '--box-width': '100%',
                  '--box-padding': '0.75rem 1rem',
                  '--box-background': 'var(--color1-500)',
                  '--box-border': '1px solid var(--color1-400)',
                  '--box-border-radius': '0.375rem',
                  '--text-color': 'var(--color4-50)',
                  '--text-font-size': '0.875rem',
                  '--text-font-weight': '600',
                  'cursor': 'pointer',
                  'transition': 'all 0.2s ease'
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
                className="box text"
                style={{
                  '--box-width': '100%',
                  '--box-padding': '0.75rem 1rem',
                  '--box-background': 'var(--color1-600)',
                  '--box-border': '1px solid var(--color1-500)',
                  '--box-border-radius': '0.375rem',
                  '--text-color': 'var(--color4-50)',
                  '--text-font-size': '0.875rem',
                  '--text-font-weight': '600',
                  'cursor': 'pointer',
                  'transition': 'all 0.2s ease'
                }}
              >
                Reset All
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="box" style={{
            '--box-flex': '1',
            '--box-padding': '1.5rem',
            '--box-overflow-y': 'auto'
          }}>
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'theme' && <ThemeView />}
            {activeTab === 'components' && <ComponentVariablesTable />}
            {activeTab === 'presets' && <PresetsView />}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardView() {
  const { config } = useS4Store();
  const { config: themeConfig } = useThemeConfig();
  
  return (
    <div className="box" style={{ '--box-padding': '1.5rem', '--box-display': 'flex', '--box-flex-direction': 'column', '--box-gap': '1.5rem' }}>
      <div className="box" style={{ '--box-display': 'flex', '--box-flex-direction': 'column', '--box-gap': '0.5rem' }}>
        <h1 className="text" style={{ '--text-font-size': '1.5rem', '--text-font-weight': '600', '--text-color': 'var(--color4-100)' }}>
          S4 Design System V2.0
        </h1>
        <p className="text" style={{ '--text-color': 'var(--color4-400)', '--text-font-size': '1rem' }}>
          Fresh foundation with JSON-driven component variables system
        </p>
      </div>
      
      {/* Phase 2 Completion Status */}
      <div className="box" style={{ 
        '--box-background': 'var(--color3-900)', 
        '--box-border': '1px solid var(--color3-700)', 
        '--box-padding': '1rem', 
        '--box-border-radius': '0.5rem' 
      }}>
        <h2 className="text" style={{ '--text-font-size': '1.125rem', '--text-font-weight': '600', '--text-color': 'var(--color1-400)', '--text-margin-bottom': '0.75rem' }}>
          ✅ Phase 2 Complete: Component Variables Table
        </h2>
        <div className="box" style={{ '--box-display': 'flex', '--box-flex-direction': 'column', '--box-gap': '0.5rem' }}>
          <p className="text" style={{ '--text-color': 'var(--color4-300)', '--text-font-size': '0.875rem' }}>
            • JSON-driven styling system integrated
          </p>
          <p className="text" style={{ '--text-color': 'var(--color4-300)', '--text-font-size': '0.875rem' }}>
            • Real-time component variable editing
          </p>
          <p className="text" style={{ '--text-color': 'var(--color4-300)', '--text-font-size': '0.875rem' }}>
            • CSS custom properties with .box/.text system
          </p>
          <p className="text" style={{ '--text-color': 'var(--color4-300)', '--text-font-size': '0.875rem' }}>
            • Export/Import functionality working
          </p>
        </div>
        <div className="box" style={{ '--box-margin-top': '1rem' }}>
          <p className="text" style={{ '--text-color': 'var(--color1-300)', '--text-font-weight': '500', '--text-font-size': '0.875rem' }}>
            👉 Click the "Components" tab above to see the variables table in action!
          </p>
        </div>
      </div>
      
      {/* Brand Colors Preview */}
      <div className="box" style={{ '--box-display': 'flex', '--box-flex-direction': 'column', '--box-gap': '1rem' }}>
        <h2 className="text" style={{ '--text-font-size': '1.125rem', '--text-font-weight': '600', '--text-color': 'var(--color4-200)' }}>
          S4 Brand Colors
        </h2>
        <div className="box" style={{ '--box-display': 'flex', '--box-gap': '1rem' }}>
          {Object.entries(config.brand).map(([name, color]) => (
            <div key={name} className="box" style={{ '--box-display': 'flex', '--box-flex-direction': 'column', '--box-gap': '0.5rem', '--box-align-items': 'center' }}>
              <div 
                className="box"
                style={{ 
                  '--box-background': color,
                  '--box-width': '60px', 
                  '--box-height': '60px',
                  '--box-border-radius': '0.5rem',
                  '--box-border': '2px solid var(--color3-700)'
                }}
              />
              <div className="text" style={{ '--text-font-size': '0.75rem', '--text-color': 'var(--color4-400)', '--text-font-weight': '500' }}>
                {name}
              </div>
              <div className="text" style={{ '--text-font-size': '0.625rem', '--text-color': 'var(--color4-500)', '--text-font-family': 'monospace' }}>
                {color}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Component Count */}
      <div className="box" style={{ 
        '--box-background': 'var(--color3-800)', 
        '--box-border': '1px solid var(--color3-600)', 
        '--box-padding': '1rem', 
        '--box-border-radius': '0.5rem' 
      }}>
        <h2 className="text" style={{ '--text-font-size': '1rem', '--text-font-weight': '600', '--text-color': 'var(--color4-200)', '--text-margin-bottom': '0.5rem' }}>
          Component Variables Loaded
        </h2>
        <p className="text" style={{ '--text-color': 'var(--color4-400)', '--text-font-size': '0.875rem' }}>
          {Object.keys(themeConfig.components || {}).length} components ready for editing
        </p>
        <div className="box" style={{ '--box-margin-top': '0.75rem', '--box-display': 'flex', '--box-flex-wrap': 'wrap', '--box-gap': '0.5rem' }}>
          {Object.keys(themeConfig.components || {}).map((componentName) => (
            <span 
              key={componentName} 
              className="text" 
              style={{ 
                '--text-font-size': '0.75rem', 
                '--text-color': 'var(--color1-300)', 
                '--text-background': 'var(--color1-900)', 
                '--text-padding': '0.25rem 0.5rem', 
                '--text-border-radius': '0.25rem',
                '--text-border': '1px solid var(--color1-700)'
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
    <div className="box" data-preset="center" style={{ minHeight: '200px' }}>
      <div className="text" data-preset="body">
        Theme Builder - Coming Soon
      </div>
    </div>
  );
}

function ComponentsView() {
  return (
    <div className="box" data-preset="center" style={{ minHeight: '200px' }}>
      <div className="text" data-preset="body">
        Components Library - Coming Soon
      </div>
    </div>
  );
}

function PresetsView() {
  return (
    <div className="box" data-preset="center" style={{ minHeight: '200px' }}>
      <div className="text" data-preset="body">
        Preset Manager - Coming Soon
      </div>
    </div>
  );
}
