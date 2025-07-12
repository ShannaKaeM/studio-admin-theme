import React, { useState } from 'react';
import { useStudio1Store } from '../hooks/useStudio1Store.js';
import { useThemeConfig } from '../hooks/useThemeConfig.js';
import { ComponentVariablesTable } from '../components/ComponentVariablesTable.jsx';
import { ScopesBuilder } from '../components/ScopesBuilder.jsx';
import { ColorCreator } from '../components/ColorCreator.jsx';
import { BaseColorEditor } from '../components/BaseColorEditor.jsx';

export function Studio1ThemeBuilder({ isAdmin = false, isFrontend = false }) {
  const { config, updateConfig } = useStudio1Store();
  const { config: themeConfig, exportConfig, importConfig, resetToDefault, syncNewComponents } = useThemeConfig();
  const [activeTab, setActiveTab] = useState('colors');
  const [expandedSection, setExpandedSection] = useState('colors');
  
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
      '--one-background': 'var(--builder-neutral-950)',
      '--one-z-index': isFrontend ? '50' : 'auto'
    }}>
      <div className="one" style={{
        '--one-background': 'var(--builder-neutral-900)',
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
          '--one-border-bottom': '1px solid var(--builder-neutral-700)',
          '--one-background': 'var(--builder-neutral-800)'
        }}>
          <div className="one">
            <h2 className="one" style={{
              '--one-font-size': '1.125rem',
              '--one-font-weight': '700',
              '--one-color': 'var(--builder-text-100)'
            }}>
              Studio1 Design System
            </h2>
            <p className="one" style={{
              '--one-font-size': '0.75rem',
              '--one-color': 'var(--builder-text-400)'
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

        {/* Main Layout - Unified with tabs for Base, Colors, and Scopes */}
        {activeTab === 'base' || activeTab === 'colors' || activeTab === 'scopes' ? (
          /* Unified interface with top tabs */
          <div className="one" style={{
            '--one-display': 'flex',
            '--one-flex-direction': 'column',
            '--one-flex': '1'
          }}>
            {/* Top Tab Navigation */}
            <div className="one" style={{
              '--one-display': 'flex',
              '--one-background': 'var(--color3-800)',
              '--one-border-bottom': '1px solid var(--color3-700)',
              '--one-padding': '0 1.5rem'
            }}>
              <button
                onClick={() => setActiveTab('base')}
                className="one"
                style={{
                  '--one-padding': '1rem 1.5rem',
                  '--one-background': activeTab === 'base' ? 'var(--builder-primary)' : 'transparent',
                  '--one-color': activeTab === 'base' ? 'var(--builder-text-50)' : 'var(--builder-text-300)',
                  '--one-border': 'none',
                  '--one-border-bottom': activeTab === 'base' ? '3px solid var(--builder-primary)' : '3px solid transparent',
                  '--one-cursor': 'pointer',
                  '--one-font-weight': '500',
                  '--one-transition': 'all 0.2s ease'
                }}
              >
                🎯 Base
              </button>
              <button
                onClick={() => setActiveTab('colors')}
                className="one"
                style={{
                  '--one-padding': '1rem 1.5rem',
                  '--one-background': activeTab === 'colors' ? 'var(--color2-500)' : 'transparent',
                  '--one-color': activeTab === 'colors' ? 'var(--color4-50)' : 'var(--color4-300)',
                  '--one-border': 'none',
                  '--one-border-bottom': activeTab === 'colors' ? '3px solid var(--color2-400)' : '3px solid transparent',
                  '--one-cursor': 'pointer',
                  '--one-font-weight': '500',
                  '--one-transition': 'all 0.2s ease'
                }}
              >
                🎨 Colors
              </button>
              <button
                onClick={() => setActiveTab('scopes')}
                className="one"
                style={{
                  '--one-padding': '1rem 1.5rem',
                  '--one-background': activeTab === 'scopes' ? 'var(--color3-500)' : 'transparent',
                  '--one-color': activeTab === 'scopes' ? 'var(--color4-50)' : 'var(--color4-300)',
                  '--one-border': 'none',
                  '--one-border-bottom': activeTab === 'scopes' ? '3px solid var(--color3-400)' : '3px solid transparent',
                  '--one-cursor': 'pointer',
                  '--one-font-weight': '500',
                  '--one-transition': 'all 0.2s ease'
                }}
              >
                🎭 Scopes
              </button>
            </div>

            {/* Tab Content */}
            <div className="one" style={{
              '--one-flex': '1'
            }}>
              {activeTab === 'base' && <BaseColorEditor />}
              {activeTab === 'colors' && <ColorCreator />}
              {activeTab === 'scopes' && <ScopesBuilder />}
            </div>
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

                {/* Colors Section */}
                <div className="one" style={{
                  '--one-border-bottom': '1px solid var(--color3-700)'
                }}>
                  <button
                    onClick={() => {
                      setExpandedSection('colors');
                      setActiveTab('colors');
                    }}
                    className="one"
                    style={{
                      '--one-width': '100%',
                      '--one-padding': '0.75rem 1rem',
                      '--one-display': 'flex',
                      '--one-align-items': 'center',
                      '--one-justify-content': 'space-between',
                      '--one-background': 'var(--color3-800)',
                      '--one-border-left': expandedSection === 'colors' ? '4px solid var(--color2-500)' : '4px solid transparent',
                      '--one-color': 'var(--color4-200)',
                      '--one-cursor': 'pointer',
                      '--one-transition': 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (expandedSection !== 'colors') {
                        e.target.style.setProperty('--one-background', 'var(--color3-700)');
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (expandedSection !== 'colors') {
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
                        🎨
                      </div>
                      <span className="one" style={{
                        '--one-font-weight': '500',
                        '--one-color': 'var(--color4-200)'
                      }}>
                        Colors
                      </span>
                    </div>
                  </button>
                  
                  {expandedSection === 'colors' && (
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
                        Create custom color variations from your 4 core colors
                      </p>
                    </div>
                  )}
                </div>

                {/* Scopes Section */}
                <div className="one" style={{
                  '--one-border-bottom': '1px solid var(--color3-700)'
                }}>
                  <button
                    onClick={() => {
                      setExpandedSection('scopes');
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
    <div className="one" style={{ '--one-padding': '2rem', '--one-display': 'flex', '--one-flex-direction': 'column', '--one-gap': '2rem', '--one-align-items': 'center', '--one-justify-content': 'center', '--one-text-align': 'center', '--one-min-height': '400px' }}>
      <div className="one" style={{ '--one-display': 'flex', '--one-flex-direction': 'column', '--one-gap': '1rem' }}>
        <div className="one" style={{ '--one-font-size': '3rem', '--one-margin-bottom': '0.5rem' }}>
          🚀
        </div>
        <h1 className="one" style={{ '--one-font-size': '2rem', '--one-font-weight': '700', '--one-color': 'var(--color4-100)', '--one-margin-bottom': '0.5rem' }}>
          Studio1 Design System
        </h1>
        <p className="one" style={{ '--one-color': 'var(--color4-400)', '--one-font-size': '1.125rem', '--one-max-width': '600px' }}>
          The One Element System - Revolutionary unified architecture with real-time visual editing
        </p>
      </div>

      {/* Quick Actions */}
      <div className="one" style={{
        '--one-display': 'flex',
        '--one-gap': '1rem',
        '--one-margin-top': '1rem'
      }}>
        <button
          onClick={() => setActiveTab('colors')}
          className="one"
          style={{
            '--one-padding': '1rem 2rem',
            '--one-background': 'var(--color2-500)',
            '--one-border': '1px solid var(--color2-400)',
            '--one-border-radius': '0.5rem',
            '--one-color': 'var(--color4-50)',
            '--one-font-weight': '600',
            '--one-cursor': 'pointer',
            '--one-transition': 'all 0.2s ease',
            '--one-display': 'flex',
            '--one-align-items': 'center',
            '--one-gap': '0.5rem'
          }}
        >
          🎨 Create Colors
        </button>
        <button
          onClick={() => setActiveTab('scopes')}
          className="one"
          style={{
            '--one-padding': '1rem 2rem',
            '--one-background': 'var(--color3-500)',
            '--one-border': '1px solid var(--color3-400)',
            '--one-border-radius': '0.5rem',
            '--one-color': 'var(--color4-50)',
            '--one-font-weight': '600',
            '--one-cursor': 'pointer',
            '--one-transition': 'all 0.2s ease',
            '--one-display': 'flex',
            '--one-align-items': 'center',
            '--one-gap': '0.5rem'
          }}
        >
          🎭 Design Scopes
        </button>
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

