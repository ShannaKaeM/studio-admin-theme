import React, { useState, useEffect } from 'react';
import { useThemeConfig } from '../hooks/useThemeConfig.js';

// CSS Property options for dropdowns
const CSS_PROPERTIES = {
  typography: [
    '--one-font-family', '--one-font-size', '--one-font-weight', '--one-line-height',
    '--one-letter-spacing', '--one-text-align', '--one-text-transform', '--one-text-decoration',
    '--one-color', '--one-caret-color'
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
    '--one-background-color', '--one-border', '--one-border-color', '--one-outline-color', '--one-border-radius', '--one-box-shadow',
    '--one-opacity', '--one-transform', '--one-transition'
  ],
  svg: [
    '--one-fill', '--one-stroke', '--one-stroke-width'
  ],
  interaction: [
    '--one-cursor', '--one-user-select', '--one-pointer-events', '--one-accent-color'
  ]
};

const getCommonValues = (property) => {
  const staticValues = {
    // Typography values
    '--one-font-size': ['0.75rem', '0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '1.75rem', '2rem', '2.25rem', '2.5rem', '3rem', '3.5rem', '4rem'],
    '--one-font-weight': ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    '--one-line-height': ['1', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.75', '2'],
    '--one-letter-spacing': ['normal', '-0.05em', '-0.025em', '0', '0.025em', '0.05em', '0.1em', '0.15em'],
    '--one-text-transform': ['none', 'uppercase', 'lowercase', 'capitalize'],
    '--one-text-align': ['left', 'center', 'right', 'justify'],
    '--one-font-style': ['normal', 'italic', 'oblique'],
    
    // Layout values
    '--one-display': ['block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid', 'none'],
    '--one-position': ['static', 'relative', 'absolute', 'fixed', 'sticky'],
    '--one-overflow': ['visible', 'hidden', 'scroll', 'auto'],
    '--one-visibility': ['visible', 'hidden', 'collapse'],
    
    // Spacing values
    '--one-padding': ['0', '0.25rem', '0.5rem', '0.75rem', '1rem', '1.25rem', '1.5rem', '2rem', '2.5rem', '3rem'],
    '--one-margin': ['0', 'auto', '0.25rem', '0.5rem', '0.75rem', '1rem', '1.25rem', '1.5rem', '2rem', '2.5rem', '3rem'],
    '--one-gap': ['0', '0.25rem', '0.5rem', '0.75rem', '1rem', '1.25rem', '1.5rem', '2rem', '2.5rem', '3rem'],
    
    // Flexbox values
    '--one-flex-direction': ['row', 'row-reverse', 'column', 'column-reverse'],
    '--one-flex-wrap': ['nowrap', 'wrap', 'wrap-reverse'],
    '--one-justify-content': ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    '--one-align-items': ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
    '--one-align-content': ['stretch', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
    
    // Grid values
    '--one-grid-template-columns': ['1fr', '1fr 1fr', '1fr 1fr 1fr', '1fr 2fr', '2fr 1fr', 'repeat(auto-fit, minmax(200px, 1fr))', 'repeat(auto-fill, minmax(150px, 1fr))'],
    '--one-grid-template-rows': ['auto', '1fr', '1fr 1fr', 'repeat(3, 1fr)', 'repeat(auto, minmax(100px, auto))'],
    '--one-justify-items': ['stretch', 'start', 'end', 'center'],
    '--one-place-items': ['stretch', 'start', 'end', 'center'],
    
    // Border values
    '--one-border-style': ['none', 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge'],
    '--one-border-width': ['0', '1px', '2px', '3px', '4px', '5px'],
    '--one-border-radius': ['0', '0.125rem', '0.25rem', '0.375rem', '0.5rem', '0.75rem', '1rem', '1.5rem', '50%'],
    
    // Common sizing values
    '--one-width': ['auto', '100%', '50%', '33.333%', '25%', '20%', '16.667%', 'fit-content', 'max-content', 'min-content'],
    '--one-height': ['auto', '100%', '100vh', '50vh', 'fit-content', 'max-content', 'min-content'],
    '--one-max-width': ['none', '100%', '20rem', '24rem', '28rem', '32rem', '36rem', '42rem', '48rem', '56rem', '64rem', '72rem'],
    
    // Effects values
    '--one-opacity': ['0', '0.25', '0.5', '0.75', '1'],
    '--one-cursor': ['auto', 'default', 'pointer', 'text', 'not-allowed', 'grab', 'grabbing']
  };

  // Return static values for non-color properties
  if (staticValues[property]) {
    return staticValues[property];
  }

  // Color properties will use text inputs (no dropdowns)
  return null;
};

export function ScopesBuilder() {
  const { config, updateScopeBaseProperties, createNewScope, deleteScope, resetToDefault, createBaseTestScopes } = useThemeConfig();
  const [selectedScope, setSelectedScope] = useState(null);
  
  // Collection Management with localStorage persistence
  const [selectedCollection, setSelectedCollection] = useState('default');
  const [collections, setCollections] = useState(() => {
    try {
      const saved = localStorage.getItem('studio1-collections');
      return saved ? JSON.parse(saved) : { 'default': { name: 'Default Collection', blocks: [] } };
    } catch {
      return { 'default': { name: 'Default Collection', blocks: [] } };
    }
  });
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  
  // 1Block Creation
  const [showCreate1Block, setShowCreate1Block] = useState(false);
  const [newBlockName, setNewBlockName] = useState('');
  const [showPropertyEditor, setShowPropertyEditor] = useState(false);
  
  // Move/Rearrange functionality
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [blockToMove, setBlockToMove] = useState(null);
  const [targetCollection, setTargetCollection] = useState('');
  
  // Accordion states for property categories
  const [expandedCategories, setExpandedCategories] = useState({
    typography: false,
    layout: false,
    spacing: false,
    flexbox: false,
    grid: false,
    background: false,
    border: false,
    appearance: false,
    svg: false,
    effects: false,
    interaction: false
  });

  const scopes = config.scopes || {};
  const colorVariations = config.colorVariations || {};
  const currentScope = scopes[selectedScope];
  const currentBaseProperties = currentScope?.baseProperties || {};

  // Persist collections to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('studio1-collections', JSON.stringify(collections));
    } catch (error) {
      console.warn('Failed to save collections:', error);
    }
  }, [collections]);

  // Get scopes for the selected collection
  const currentCollectionBlocks = collections[selectedCollection]?.blocks || [];
  const collectionScopes = Object.entries(scopes).filter(([scopeName]) => 
    currentCollectionBlocks.includes(scopeName)
  );

  // Helper function to check if scope has text properties
  const hasTextProperties = (scopeName) => {
    const scope = scopes[scopeName];
    if (!scope || !scope.baseProperties) return false;
    
    // Exclude wrapper elements that contain text but don't display text themselves
    const wrapperElements = ['text-box', 'card-box', 'content-box', 'image-box', 'three-col-grid', 'container'];
    if (wrapperElements.includes(scopeName)) return false;
    
    const textProperties = [
      '--one-font-family', '--one-font-size', '--one-font-weight', '--one-line-height',
      '--one-letter-spacing', '--one-text-align', '--one-text-transform', '--one-text-decoration',
      '--one-color', '--one-caret-color', '--one-text-shadow', '--one-white-space',
      '--one-text-overflow', '--one-vertical-align', '--one-font-style', '--one-font-variant'
    ];
    
    return Object.keys(scope.baseProperties).some(prop => textProperties.includes(prop));
  };

  // Toggle accordion function
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // All available --one CSS properties organized by category
  const getBasicProperties = (category) => {
    const allProps = {
      typography: [
        '--one-font-family',
        '--one-font-size',
        '--one-font-weight',
        '--one-font-style',
        '--one-font-variant',
        '--one-line-height',
        '--one-letter-spacing',
        '--one-color',
        '--one-text-align',
        '--one-text-transform',
        '--one-text-decoration',
        '--one-text-shadow',
        '--one-white-space',
        '--one-text-overflow',
        '--one-vertical-align'
      ],
      layout: [
        '--one-display',
        '--one-position',
        '--one-z-index',
        '--one-overflow',
        '--one-visibility',
        '--one-width',
        '--one-height',
        '--one-min-width',
        '--one-max-width',
        '--one-min-height',
        '--one-max-height',
        '--one-aspect-ratio'
      ],
      spacing: [
        '--one-padding',
        '--one-padding-top',
        '--one-padding-right',
        '--one-padding-bottom',
        '--one-padding-left',
        '--one-margin',
        '--one-margin-top',
        '--one-margin-right',
        '--one-margin-bottom',
        '--one-margin-left',
        '--one-gap',
        '--one-row-gap',
        '--one-column-gap'
      ],
      flexbox: [
        '--one-flex-direction',
        '--one-flex-wrap',
        '--one-flex-flow',
        '--one-flex',
        '--one-flex-grow',
        '--one-flex-shrink',
        '--one-flex-basis',
        '--one-justify-content',
        '--one-align-items',
        '--one-align-content'
      ],
      grid: [
        '--one-grid-area',
        '--one-grid-template-columns',
        '--one-grid-template-rows',
        '--one-grid-template-areas',
        '--one-grid-auto-columns',
        '--one-grid-auto-rows',
        '--one-grid-auto-flow',
        '--one-justify-items',
        '--one-place-items',
        '--one-place-content'
      ],
      background: [
        '--one-background',
        '--one-background-image',
        '--one-background-size',
        '--one-background-position',
        '--one-background-repeat',
        '--one-background-attachment'
      ],
      border: [
        '--one-border',
        '--one-border-width',
        '--one-border-style',
        '--one-border-color',
        '--one-border-radius',
        '--one-border-top',
        '--one-border-right',
        '--one-border-bottom',
        '--one-border-left'
      ],
      effects: [
        '--one-box-shadow',
        '--one-opacity',
        '--one-filter',
        '--one-backdrop-filter',
        '--one-transform',
        '--one-transform-origin',
        '--one-transition',
        '--one-animation'
      ],
      interaction: [
        '--one-cursor',
        '--one-user-select',
        '--one-pointer-events',
        '--one-touch-action',
        '--one-content',
        '--one-list-style',
        '--one-resize',
        '--one-outline'
      ]
    };
    return allProps[category] || [];
  };


  // Collection Management Functions
  const handleCreateCollection = () => {
    if (newCollectionName && newCollectionName.trim()) {
      const cleanName = newCollectionName.trim();
      setCollections(prev => ({
        ...prev,
        [cleanName]: { name: cleanName, blocks: [] }
      }));
      setSelectedCollection(cleanName);
      setNewCollectionName('');
      setShowCreateCollection(false);
    }
  };

  // Clean Start Function - clears ALL old data including legacy items
  const handleCleanStart = () => {
    if (confirm('Clear all collections and 1Blocks? This will give you a completely fresh start and remove any legacy data.')) {
      // Reset config to default empty state
      resetToDefault();
      
      // Remove all Studio1 related localStorage
      localStorage.removeItem('studio1-collections');
      localStorage.removeItem('studio1-theme-config');
      localStorage.removeItem('studio1-theme-overrides');
      localStorage.removeItem('studio1-color-variations');
      // Remove any other legacy keys that might exist
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('studio1-') || key.startsWith('s4-')) {
          localStorage.removeItem(key);
        }
      });
      
      // Reset collections to default
      setCollections({ 'default': { name: 'Default Collection', blocks: [] } });
      setSelectedCollection('default');
      setSelectedScope(null);
      setShowPropertyEditor(false);
      
      // Reload to ensure clean state
      window.location.reload();
    }
  };

  const handleCreate1Block = () => {
    if (newBlockName && newBlockName.trim()) {
      const cleanName = newBlockName.trim().toLowerCase().replace(/\s+/g, '-');
      
      // Create new 1Block with minimal defaults
      createNewScope(cleanName, {
        '--one-display': 'block',
        '--one-font-family': 'var(--font-family)'
      });
      
      // Add to current collection
      setCollections(prev => ({
        ...prev,
        [selectedCollection]: {
          ...prev[selectedCollection],
          blocks: [...prev[selectedCollection].blocks, cleanName]
        }
      }));
      
      setSelectedScope(cleanName);
      setShowCreate1Block(false);
      setNewBlockName('');
      setShowPropertyEditor(true);
    }
  };

  // Move 1Block between collections
  const handleMoveBlock = () => {
    if (blockToMove && targetCollection && targetCollection !== selectedCollection) {
      setCollections(prev => {
        // Remove from current collection
        const sourceCollection = selectedCollection;
        const newCollections = { ...prev };
        
        newCollections[sourceCollection] = {
          ...newCollections[sourceCollection],
          blocks: newCollections[sourceCollection].blocks.filter(b => b !== blockToMove)
        };
        
        // Add to target collection (avoid duplicates)
        if (!newCollections[targetCollection].blocks.includes(blockToMove)) {
          newCollections[targetCollection] = {
            ...newCollections[targetCollection],
            blocks: [...newCollections[targetCollection].blocks, blockToMove]
          };
        }
        
        return newCollections;
      });
      
      // Reset move dialog
      setShowMoveDialog(false);
      setBlockToMove(null);
      setTargetCollection('');
    }
  };

  const startMoveBlock = (blockName) => {
    setBlockToMove(blockName);
    setTargetCollection('');
    setShowMoveDialog(true);
  };

  // Removed legacy preset system - users create 1Blocks with complete creative freedom

  return (
    <div className="dashboard-layout">
      {/* Left Side Controls - 400px */}
      <div className="dashboard-sidebar">
        {/* Collection Management */}
        <div className="control-section">
          <h3>📁 Collections</h3>
          {!showCreateCollection ? (
            <>
              <select 
                value={selectedCollection} 
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="property-select"
              >
                {Object.entries(collections).map(([key, collection]) => (
                  <option key={key} value={key}>{collection.name}</option>
                ))}
              </select>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button 
                  onClick={() => setShowCreateCollection(true)}
                  className="ui-button ui-button--secondary ui-button--small"
                  style={{ flex: 1 }}
                >
                  + New Collection
                </button>
                <button 
                  onClick={handleCleanStart}
                  className="ui-button ui-button--secondary ui-button--small"
                  style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                  title="Clear all data for fresh start"
                >
                  🧹
                </button>
              </div>
            </>
          ) : (
            <div className="create-form">
              <input
                type="text"
                placeholder="Collection name..."
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                className="property-value-input"
              />
              <div className="form-actions">
                <button 
                  onClick={handleCreateCollection}
                  className="ui-button ui-button--primary ui-button--small"
                >
                  Create
                </button>
                <button 
                  onClick={() => setShowCreateCollection(false)}
                  className="ui-button ui-button--secondary ui-button--small"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 1Block Creation */}
        <div className="control-section">
          <h3>📦 Create 1Block</h3>
          {!showCreate1Block ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button 
                onClick={() => setShowCreate1Block(true)}
                className="ui-button ui-button--primary"
              >
                + New 1Block
              </button>
              {Object.keys(collections).length > 1 && (
                <button 
                  onClick={() => {
                    createBaseTestScopes();
                    // Add base scopes to current collection
                    const baseScopes = ['button', 'text-box', 'card-box', 'content-box', 'image-box', 'three-col-grid', 'container'];
                    setCollections(prev => ({
                      ...prev,
                      [selectedCollection]: {
                        ...prev[selectedCollection],
                        blocks: [...new Set([...prev[selectedCollection].blocks, ...baseScopes])]
                      }
                    }));
                  }}
                  className="ui-button ui-button--secondary ui-button--small"
                >
                  🚀 Create Base Test Scopes
                </button>
              )}
            </div>
          ) : (
            <div className="create-form">
              <input
                type="text"
                placeholder="1Block name..."
                value={newBlockName}
                onChange={(e) => setNewBlockName(e.target.value)}
                className="property-value-input"
              />
              
              <div className="form-actions">
                <button 
                  onClick={handleCreate1Block}
                  className="ui-button ui-button--primary ui-button--small"
                >
                  Create
                </button>
                <button 
                  onClick={() => setShowCreate1Block(false)}
                  className="ui-button ui-button--secondary ui-button--small"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 1Block Property Editor */}
        {selectedScope && showPropertyEditor && (
          <div className="control-section property-editor">
            <h3>✏️ Edit: {selectedScope}</h3>
            
            {/* Generate all accordion sections dynamically */}
            {[
              { key: 'typography', icon: '🔤', label: 'Typography' },
              { key: 'layout', icon: '📐', label: 'Layout' },
              { key: 'spacing', icon: '📏', label: 'Spacing' },
              { key: 'flexbox', icon: '🔄', label: 'Flexbox' },
              { key: 'grid', icon: '⚏', label: 'Grid' },
              { key: 'background', icon: '🖼️', label: 'Background' },
              { key: 'border', icon: '⬜', label: 'Border' },
              { key: 'appearance', icon: '🎨', label: 'Appearance' },
              { key: 'svg', icon: '🖼️', label: 'SVG & Graphics' },
              { key: 'effects', icon: '✨', label: 'Effects' },
              { key: 'interaction', icon: '👆', label: 'Interaction' }
            ].map(({ key, icon, label }) => (
              <div key={key} className="accordion-section">
                <button 
                  className={`accordion-header ${expandedCategories[key] ? 'expanded' : ''}`}
                  onClick={() => toggleCategory(key)}
                >
                  <span>{icon} {label}</span>
                  <span className="accordion-arrow">{expandedCategories[key] ? '▼' : '▶'}</span>
                </button>
                {expandedCategories[key] && (
                  <div className="accordion-content">
                    {getBasicProperties(key).map(prop => {
                      const availableValues = getCommonValues(prop);
                      return (
                        <div key={prop} className="property-item">
                          <label>{prop.replace('--one-', '')}</label>
                          {availableValues ? (
                            <select
                              value={currentBaseProperties[prop] || ''}
                              onChange={(e) => {
                                if (e.target.value) {
                                  const updatedProperties = { ...currentBaseProperties, [prop]: e.target.value };
                                  updateScopeBaseProperties(selectedScope, updatedProperties);
                                } else {
                                  const updatedProperties = { ...currentBaseProperties };
                                  delete updatedProperties[prop];
                                  updateScopeBaseProperties(selectedScope, updatedProperties);
                                }
                              }}
                              className="property-value-select"
                            >
                              <option value="">Default</option>
                              {availableValues.map(item => {
                                // Handle both object format (colors) and string format (other values)
                                if (typeof item === 'object') {
                                  return (
                                    <option key={item.value} value={item.value}>
                                      {item.label}
                                    </option>
                                  );
                                } else {
                                  return <option key={item} value={item}>{item}</option>;
                                }
                              })}
                            </select>
                          ) : (
                            <input 
                              type="text" 
                              placeholder="Enter value..." 
                              value={currentBaseProperties[prop] || ''}
                              onChange={(e) => {
                                if (e.target.value) {
                                  const updatedProperties = { ...currentBaseProperties, [prop]: e.target.value };
                                  updateScopeBaseProperties(selectedScope, updatedProperties);
                                } else {
                                  const updatedProperties = { ...currentBaseProperties };
                                  delete updatedProperties[prop];
                                  updateScopeBaseProperties(selectedScope, updatedProperties);
                                }
                              }}
                              className="property-value-input"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Right Side Preview Grid */}
      <div className="dashboard-preview">
        <div className="preview-header">
          <h2>{collections[selectedCollection]?.name || 'Collection'}</h2>
          <p>{currentCollectionBlocks.length} blocks in collection</p>
        </div>

        <div className="preview-grid-container">
          {currentCollectionBlocks.length === 0 ? (
            <div className="empty-state">
              <div>📦</div>
              <h3>No 1Blocks in Collection</h3>
              <p>Create a new 1Block to add to this collection</p>
            </div>
          ) : (
            <div className="dynamic-grid">
              {currentCollectionBlocks.map((blockName) => {
                return (
                  <div
                    key={blockName}
                    className={`grid-block-wrapper ${selectedScope === blockName ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedScope(blockName);
                      setShowPropertyEditor(true);
                    }}
                  >
                    <div className="block-preview">
                      <div 
                        data-scope={blockName}
                        className="one"
                      >
                        {hasTextProperties(blockName) ? blockName : ''}
                      </div>
                    </div>
                    <div className="block-info">
                      <span className="block-name">{blockName}</span>
                      <div className="block-actions">
                        {Object.keys(collections).length > 1 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              startMoveBlock(blockName);
                            }}
                            className="delete-block-btn"
                            title="Move to another collection"
                          >
                            📁
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const confirmed = confirm(`Delete 1Block "${blockName}"? This action cannot be undone.`);
                            if (confirmed) {
                              deleteScope(blockName);
                              // Remove from collection
                              setCollections(prev => ({
                                ...prev,
                                [selectedCollection]: {
                                  ...prev[selectedCollection],
                                  blocks: prev[selectedCollection].blocks.filter(b => b !== blockName)
                                }
                              }));
                              if (selectedScope === blockName) {
                                setSelectedScope(null);
                                setShowPropertyEditor(false);
                              }
                            }
                          }}
                          className="delete-block-btn"
                          title="Delete 1Block"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Move Dialog */}
      {showMoveDialog && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'var(--ui-cards)',
            padding: '1.5rem',
            borderRadius: 'var(--ui-border-radius)',
            border: '1px solid var(--ui-borders)',
            minWidth: '300px'
          }}>
            <h3 style={{ 
              color: 'var(--ui-secondary-text)', 
              margin: '0 0 1rem 0',
              fontSize: '1rem'
            }}>
              Move "{blockToMove}" to Collection
            </h3>
            
            <select
              value={targetCollection}
              onChange={(e) => setTargetCollection(e.target.value)}
              className="property-select"
              style={{ marginBottom: '1rem', width: '100%' }}
            >
              <option value="">Select target collection...</option>
              {Object.entries(collections)
                .filter(([key]) => key !== selectedCollection)
                .map(([key, collection]) => (
                  <option key={key} value={key}>{collection.name}</option>
                ))
              }
            </select>
            
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowMoveDialog(false);
                  setBlockToMove(null);
                  setTargetCollection('');
                }}
                className="ui-button ui-button--secondary ui-button--small"
              >
                Cancel
              </button>
              <button
                onClick={handleMoveBlock}
                disabled={!targetCollection}
                className="ui-button ui-button--primary ui-button--small"
              >
                Move
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Scopes Tab Component
function ScopesTab({ scopes, selectedScope, setSelectedScope, onCreateNewScope, onDeleteScope }) {
  return (
    <div>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '1rem' 
      }}>
        <h3 style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          color: 'var(--ui-neutral-200)',
          margin: 0
        }}>
          Your 1Blocks ({Object.keys(scopes).length})
        </h3>
      </div>

      <ul className="scopes-list">
        {Object.entries(scopes).map(([scopeName, scopeConfig]) => (
          <li key={scopeName} className={`scope-item ${selectedScope === scopeName ? 'selected' : ''}`}>
            <button
              onClick={() => setSelectedScope(scopeName)}
              className="scope-item-button"
            >
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontWeight: '500', 
                  color: 'var(--ui-neutral-100)', 
                  marginBottom: '0.25rem' 
                }}>
                  📦 {scopeName}
                </div>
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: 'var(--ui-neutral-400)' 
                }}>
                  {scopeConfig.description || `${Object.keys(scopeConfig.baseProperties || {}).length} properties`}
                </div>
              </div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const confirmed = confirm(`Delete 1Block "${scopeName}"? This action cannot be undone.`);
                if (confirmed) {
                  onDeleteScope(scopeName);
                  if (selectedScope === scopeName) {
                    setSelectedScope(null);
                  }
                }
              }}
              className="scope-delete-button"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={onCreateNewScope}
        className="ui-button ui-button--primary"
        style={{ width: '100%' }}
      >
        + Add New 1Block
      </button>
    </div>
  );
}

// Scope Editor Component
function ScopeEditor({ scope, baseProperties, onBasePropertyChange, onBasePropertyRemove }) {
  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          color: 'var(--ui-neutral-100)', 
          margin: '0 0 0.5rem 0' 
        }}>
          📦 {scope}
        </h1>
        <p style={{ 
          color: 'var(--ui-neutral-400)', 
          fontSize: '0.875rem',
          margin: 0
        }}>
          Edit the styling properties for this 1Block. You have access to all 80+ CSS properties.
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
      <div className="scope-preview">
        <div className="scope-preview-title">Live Preview</div>
        
        <div style={{ 
          background: 'var(--ui-neutral-50)', 
          padding: '1.5rem', 
          borderRadius: 'var(--ui-border-radius)', 
          border: '1px solid var(--ui-base-600)' 
        }}>
          <div style={{ 
            fontSize: '0.75rem', 
            color: 'var(--ui-base-600)', 
            marginBottom: '0.5rem', 
            fontFamily: 'monospace' 
          }}>
            &lt;div data-scope="{scope}" class="one"&gt;
          </div>
          
          <div 
            data-scope={scope}
            className="one"
            style={{ margin: '1rem 0' }}
          >
            Sample {scope} content for testing your styling
          </div>
          
          <div style={{ 
            fontSize: '0.75rem', 
            color: 'var(--ui-base-600)', 
            fontFamily: 'monospace' 
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
      console.log('Adding property:', selectedProperty, '=', selectedValue);
      onPropertyChange(selectedProperty, selectedValue);
      setSelectedProperty('');
      setSelectedValue('');
    }
  };

  return (
    <div className="property-editor-section">
      <h3>{title}</h3>
      
      {/* Add Property Section */}
      <div className="property-row">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="property-select"
        >
          <option value="typography">Typography</option>
          <option value="layout">Layout</option>
          <option value="spacing">Spacing</option>
          <option value="appearance">Appearance</option>
        </select>

        <select
          value={selectedProperty}
          onChange={(e) => setSelectedProperty(e.target.value)}
          className="property-select"
        >
          <option value="">Choose Property</option>
          {CSS_PROPERTIES[selectedCategory].map(prop => (
            <option key={prop} value={prop}>{prop}</option>
          ))}
        </select>

        {(() => {
          const availableValues = getCommonValues(selectedProperty);
          return availableValues ? (
            <select
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              className="property-value-select"
            >
              <option value="">Choose Value</option>
              {availableValues.map(item => {
                // Handle both object format (colors) and string format (other values)
                if (typeof item === 'object') {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.label} ({item.value})
                    </option>
                  );
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
              className="property-value-input"
            />
          );
        })()}

        <button
          onClick={addNewProperty}
          disabled={!selectedProperty || !selectedValue}
          className="add-property-button"
          style={{
            cursor: selectedProperty && selectedValue ? 'pointer' : 'not-allowed',
            opacity: selectedProperty && selectedValue ? '1' : '0.5'
          }}
        >
          Add
        </button>
      </div>

      {/* Current Properties */}
      {Object.keys(properties).length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: 'var(--ui-neutral-400)',
          fontStyle: 'italic'
        }}>
          No properties set. {addButtonText} above to start.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {Object.entries(properties).map(([property, value]) => (
            <div key={property} className="property-row">
              <div style={{
                minWidth: '200px',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                color: 'var(--ui-primary)'
              }}>
                {property}
              </div>
              <input
                type="text"
                value={value}
                onChange={(e) => onPropertyChange(property, e.target.value)}
                className="property-value-input"
                style={{
                  flex: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.875rem'
                }}
              />
              <button
                onClick={() => onPropertyRemove(property)}
                className="remove-property-button"
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

// Base Element Message Component
function BaseElementMessage({ scope }) {
  return (
    <div className="select-scope-message">
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏗️</div>
      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: '600', 
        color: 'var(--ui-neutral-200)', 
        margin: '0 0 0.5rem 0' 
      }}>
        {scope} Global Foundation
      </h3>
      <p style={{ 
        color: 'var(--ui-neutral-400)', 
        fontSize: '0.875rem',
        margin: '0 0 1rem 0'
      }}>
        This is the global foundation that all {scope} elements inherit from.
      </p>
      <div style={{
        background: 'var(--ui-neutral-50)',
        border: '1px solid var(--ui-primary)',
        borderRadius: 'var(--ui-border-radius)',
        padding: '1rem',
        textAlign: 'left'
      }}>
        <div style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: 'var(--ui-primary)',
          marginBottom: '0.5rem'
        }}>
          💡 How to Edit This Foundation
        </div>
        <div style={{
          fontSize: '0.875rem',
          color: 'var(--ui-neutral-400)',
          lineHeight: '1.4'
        }}>
          To edit the global {scope} foundation, use the <strong>🏗️ Base Settings</strong> tab. 
          Changes there will automatically apply to all {scope} elements you create.
        </div>
      </div>
    </div>
  );
}

// Base Editor Inline Component
function BaseEditorInline({ textBaseProperties = {}, updateScopeBaseProperties }) {
  const safeTextBaseProperties = textBaseProperties || {};
  
  return (
    <div>
      <div style={{
        background: 'var(--ui-neutral-50)',
        border: '1px solid var(--ui-primary)',
        borderRadius: 'var(--ui-border-radius)',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: 'var(--ui-primary)',
          marginBottom: '0.5rem'
        }}>
          ⚡ Global Foundation Mode
        </div>
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--ui-neutral-400)',
          lineHeight: '1.4'
        }}>
          You're editing the global text foundation. Changes here will automatically apply to all text elements (title, subtitle, body, etc.).
        </div>
      </div>
      
      <PropertyEditor
        title="Text Base Properties"
        properties={safeTextBaseProperties}
        onPropertyChange={(property, value) => {
          const updatedProperties = { ...safeTextBaseProperties, [property]: value };
          updateScopeBaseProperties('text', updatedProperties);
        }}
        onPropertyRemove={(property) => {
          const updatedProperties = { ...safeTextBaseProperties };
          delete updatedProperties[property];
          updateScopeBaseProperties('text', updatedProperties);
        }}
        addButtonText="Add Base Property"
      />
    </div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="select-scope-message">
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎭</div>
      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: '600', 
        color: 'var(--ui-neutral-200)', 
        margin: '0 0 0.5rem 0' 
      }}>
        Select an Element
      </h3>
      <p style={{ 
        color: 'var(--ui-neutral-400)', 
        fontSize: '0.875rem',
        margin: 0
      }}>
        Choose an element from the sidebar to edit its styling properties
      </p>
    </div>
  );
}