import React, { useState, useEffect } from 'react';
import { useThemeConfig } from '../hooks/useThemeConfig.js';

export function BoxGroupsBuilder() {
  const { config } = useThemeConfig();
  
  // Collection Management with localStorage persistence for Box Groups
  const [selectedCollection, setSelectedCollection] = useState('default');
  const [boxGroupCollections, setBoxGroupCollections] = useState(() => {
    try {
      const saved = localStorage.getItem('studio1-boxgroup-collections');
      return saved ? JSON.parse(saved) : { 'default': { name: 'Default Box Groups', groups: [] } };
    } catch {
      return { 'default': { name: 'Default Box Groups', groups: [] } };
    }
  });
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');
  
  // Box Group Creation
  const [showCreateBoxGroup, setShowCreateBoxGroup] = useState(false);
  const [newBoxGroupName, setNewBoxGroupName] = useState('');
  const [selectedBoxGroup, setSelectedBoxGroup] = useState(null);
  const [showPropertyEditor, setShowPropertyEditor] = useState(false);
  
  // Box Group Storage - separate from 1Blocks
  const [boxGroups, setBoxGroups] = useState(() => {
    try {
      const saved = localStorage.getItem('studio1-box-groups');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Accordion states for property categories 
  const [expandedCategories, setExpandedCategories] = useState({
    layout: false,
    grid: false,
    spacing: false,
    appearance: false
  });

  // Persist collections to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('studio1-boxgroup-collections', JSON.stringify(boxGroupCollections));
    } catch (error) {
      console.warn('Failed to save box group collections:', error);
    }
  }, [boxGroupCollections]);

  // Persist box groups to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('studio1-box-groups', JSON.stringify(boxGroups));
    } catch (error) {
      console.warn('Failed to save box groups:', error);
    }
  }, [boxGroups]);

  // Get box groups for the selected collection
  const currentCollectionGroups = boxGroupCollections[selectedCollection]?.groups || [];

  // Collection Management Functions
  const handleCreateCollection = () => {
    if (newCollectionName && newCollectionName.trim()) {
      const cleanName = newCollectionName.trim();
      setBoxGroupCollections(prev => ({
        ...prev,
        [cleanName]: { name: cleanName, groups: [] }
      }));
      setSelectedCollection(cleanName);
      setNewCollectionName('');
      setShowCreateCollection(false);
    }
  };

  // Box Group Creation
  const handleCreateBoxGroup = () => {
    if (newBoxGroupName && newBoxGroupName.trim()) {
      const cleanName = newBoxGroupName.trim().toLowerCase().replace(/\s+/g, '-');
      const timestamp = Date.now();
      const uniqueName = `${cleanName}-${timestamp}`;
      
      // Create new box group with card-ready defaults
      const newBoxGroup = {
        name: cleanName,
        id: uniqueName,
        gridProperties: {
          '--one-display': 'flex',
          '--one-flex-direction': 'column',
          '--one-gap': '0',
          '--one-width': '100%',
          '--one-max-width': '24rem',
          '--one-background-color': 'hsl(0, 0%, 100%)',
          '--one-border': '1px solid hsl(0, 0%, 85%)',
          '--one-border-radius': '0.75rem',
          '--one-box-shadow': '0 1px 3px rgba(0, 0, 0, 0.1)',
          '--one-overflow': 'hidden'
        },
        items: [] // Will contain references to 1Blocks
      };
      
      setBoxGroups(prev => ({
        ...prev,
        [uniqueName]: newBoxGroup
      }));
      
      // Add to current collection
      setBoxGroupCollections(prev => ({
        ...prev,
        [selectedCollection]: {
          ...prev[selectedCollection],
          groups: [...prev[selectedCollection].groups, uniqueName]
        }
      }));
      
      setSelectedBoxGroup(uniqueName);
      setShowCreateBoxGroup(false);
      setNewBoxGroupName('');
      setShowPropertyEditor(true);
    }
  };

  // Toggle accordion function
  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Grid properties for Box Groups
  const getGridProperties = (category) => {
    const gridProps = {
      layout: [
        '--one-display',
        '--one-flex-direction',
        '--one-width',
        '--one-max-width',
        '--one-height'
      ],
      grid: [
        '--one-grid-template-columns',
        '--one-grid-template-rows', 
        '--one-gap'
      ],
      spacing: [
        '--one-padding',
        '--one-margin'
      ],
      appearance: [
        '--one-background-color',
        '--one-border',
        '--one-border-radius',
        '--one-box-shadow',
        '--one-overflow'
      ]
    };
    return gridProps[category] || [];
  };

  // Get common values for dropdowns
  const getCommonValues = (property) => {
    const values = {
      '--one-display': ['flex', 'grid', 'block'],
      '--one-flex-direction': ['column', 'row', 'column-reverse', 'row-reverse'],
      '--one-grid-template-columns': [
        '1fr',
        '1fr 1fr', 
        '1fr 1fr 1fr',
        '1fr 2fr',
        '2fr 1fr',
        'repeat(auto-fit, minmax(200px, 1fr))'
      ],
      '--one-gap': ['0', '0.5rem', '1rem', '1.5rem', '2rem'],
      '--one-width': ['100%', 'auto', 'fit-content'],
      '--one-max-width': ['none', '20rem', '24rem', '28rem', '32rem', '42rem', '1200px'],
      '--one-padding': ['0', '0.5rem', '1rem', '1.5rem', '2rem'],
      '--one-margin': ['0', 'auto', '0.5rem', '1rem', '1.5rem', '2rem'],
      '--one-border-radius': ['0', '0.25rem', '0.375rem', '0.5rem', '0.75rem', '1rem'],
      '--one-overflow': ['visible', 'hidden', 'scroll', 'auto']
    };
    return values[property] || null;
  };

  const currentBoxGroup = boxGroups[selectedBoxGroup];

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
                {Object.entries(boxGroupCollections).map(([key, collection]) => (
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

        {/* Box Group Creation */}
        <div className="control-section">
          <h3>🏗️ Create Box Group</h3>
          {!showCreateBoxGroup ? (
            <button 
              onClick={() => setShowCreateBoxGroup(true)}
              className="ui-button ui-button--primary"
            >
              + New Box Group
            </button>
          ) : (
            <div className="create-form">
              <input
                type="text"
                placeholder="Box group name..."
                value={newBoxGroupName}
                onChange={(e) => setNewBoxGroupName(e.target.value)}
                className="property-value-input"
              />
              <div className="form-actions">
                <button 
                  onClick={handleCreateBoxGroup}
                  className="ui-button ui-button--primary ui-button--small"
                >
                  Create
                </button>
                <button 
                  onClick={() => setShowCreateBoxGroup(false)}
                  className="ui-button ui-button--secondary ui-button--small"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Box Group Property Editor */}
        {selectedBoxGroup && showPropertyEditor && currentBoxGroup && (
          <div className="control-section property-editor">
            <h3>✏️ Edit: {currentBoxGroup.name}</h3>
            
            {/* Add 1Blocks Section */}
            <div className="accordion-section">
              <div className="accordion-header expanded">
                <span>📦 Add 1Blocks</span>
              </div>
              <div className="accordion-content">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      const scopeName = e.target.value;
                      setBoxGroups(prev => ({
                        ...prev,
                        [selectedBoxGroup]: {
                          ...prev[selectedBoxGroup],
                          items: [...(prev[selectedBoxGroup].items || []), scopeName]
                        }
                      }));
                      e.target.value = ''; // Reset select
                    }
                  }}
                  className="property-value-select"
                  style={{ marginBottom: '0.5rem' }}
                >
                  <option value="">Select 1Block to add...</option>
                  {Object.keys(config.scopes || {}).map(scopeName => (
                    <option key={scopeName} value={scopeName}>{scopeName}</option>
                  ))}
                </select>
                
                {/* Show current items */}
                {currentBoxGroup.items && currentBoxGroup.items.length > 0 && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <p className="property-item" style={{ 
                      fontSize: '0.75rem', 
                      color: 'var(--ui-muted-text)', 
                      margin: '0 0 0.5rem 0',
                      fontWeight: '500'
                    }}>
                      Current items:
                    </p>
                    {currentBoxGroup.items.map((scopeName, index) => (
                      <div key={index} className="property-row" style={{
                        padding: '0.5rem',
                        marginBottom: '0.25rem',
                        gridTemplateColumns: '1fr auto'
                      }}>
                        <span style={{ 
                          color: 'var(--ui-body-text)',
                          fontSize: '0.875rem',
                          fontWeight: '500'
                        }}>
                          {scopeName}
                        </span>
                        <button
                          onClick={() => {
                            setBoxGroups(prev => ({
                              ...prev,
                              [selectedBoxGroup]: {
                                ...prev[selectedBoxGroup],
                                items: prev[selectedBoxGroup].items.filter((_, i) => i !== index)
                              }
                            }));
                          }}
                          className="delete-block-btn"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Grid Property Accordions */}
            {[
              { key: 'layout', icon: '📐', label: 'Layout' },
              { key: 'grid', icon: '⚏', label: 'Grid' },
              { key: 'spacing', icon: '📏', label: 'Spacing' },
              { key: 'appearance', icon: '🎨', label: 'Appearance' }
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
                    {getGridProperties(key).map(prop => {
                      const availableValues = getCommonValues(prop);
                      const currentValue = currentBoxGroup.gridProperties[prop] || '';
                      
                      return (
                        <div key={prop} className="property-item">
                          <label>{prop.replace('--one-', '')}</label>
                          {availableValues ? (
                            <select
                              value={currentValue}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setBoxGroups(prev => ({
                                    ...prev,
                                    [selectedBoxGroup]: {
                                      ...prev[selectedBoxGroup],
                                      gridProperties: {
                                        ...prev[selectedBoxGroup].gridProperties,
                                        [prop]: e.target.value
                                      }
                                    }
                                  }));
                                }
                              }}
                              className="property-value-select"
                            >
                              <option value="">Select value...</option>
                              {availableValues.map(value => (
                                <option key={value} value={value}>{value}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              value={currentValue}
                              onChange={(e) => {
                                setBoxGroups(prev => ({
                                  ...prev,
                                  [selectedBoxGroup]: {
                                    ...prev[selectedBoxGroup],
                                    gridProperties: {
                                      ...prev[selectedBoxGroup].gridProperties,
                                      [prop]: e.target.value
                                    }
                                  }
                                }));
                              }}
                              className="property-value-input"
                              placeholder="Enter value..."
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

      {/* Right Side Preview Area */}
      <div className="dashboard-preview">
        <div className="preview-header">
          <h2>Box Groups Preview</h2>
          <p>Collection: {boxGroupCollections[selectedCollection]?.name || 'Default'}</p>
        </div>

        <div className="preview-grid-container">
          {currentCollectionGroups.length === 0 ? (
            <div className="empty-state">
              <div>🏗️</div>
              <h3>No Box Groups in Collection</h3>
              <p>Create a new box group to add grid-based assemblies</p>
            </div>
          ) : (
            <div className="dynamic-grid">
              {currentCollectionGroups.map((groupId) => {
                const boxGroup = boxGroups[groupId];
                if (!boxGroup) return null;

                return (
                  <div
                    key={groupId}
                    className={`grid-block-wrapper ${selectedBoxGroup === groupId ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedBoxGroup(groupId);
                      setShowPropertyEditor(true);
                    }}
                  >
                    <div className="block-preview">
                      <div 
                        className="one"
                        style={{
                          // Apply all box group properties as CSS styles
                          display: boxGroup.gridProperties['--one-display'] || 'flex',
                          flexDirection: boxGroup.gridProperties['--one-flex-direction'] || 'column',
                          gridTemplateColumns: boxGroup.gridProperties['--one-grid-template-columns'],
                          gridTemplateRows: boxGroup.gridProperties['--one-grid-template-rows'],
                          gap: boxGroup.gridProperties['--one-gap'] || '0',
                          width: boxGroup.gridProperties['--one-width'] || '100%',
                          maxWidth: boxGroup.gridProperties['--one-max-width'] || '24rem',
                          height: boxGroup.gridProperties['--one-height'],
                          padding: boxGroup.gridProperties['--one-padding'] || '0',
                          margin: boxGroup.gridProperties['--one-margin'] || '0',
                          backgroundColor: boxGroup.gridProperties['--one-background-color'] || 'hsl(0, 0%, 100%)',
                          border: boxGroup.gridProperties['--one-border'] || '1px solid hsl(0, 0%, 85%)',
                          borderRadius: boxGroup.gridProperties['--one-border-radius'] || '0.75rem',
                          boxShadow: boxGroup.gridProperties['--one-box-shadow'] || '0 1px 3px rgba(0, 0, 0, 0.1)',
                          overflow: boxGroup.gridProperties['--one-overflow'] || 'hidden',
                          minHeight: '200px'
                        }}
                      >
                        {/* Show actual 1Blocks with proper nesting */}
                        {boxGroup.items && boxGroup.items.length > 0 ? (
                          (() => {
                            // Helper function to get scope styles
                            const getScopeStyles = (scopeName) => {
                              const scope = config.scopes?.[scopeName];
                              const scopeProps = scope?.baseProperties || {};
                              const scopeStyles = {};
                              Object.entries(scopeProps).forEach(([prop, value]) => {
                                if (prop.startsWith('--one-')) {
                                  const cssProp = prop.replace('--one-', '').replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                                  scopeStyles[cssProp] = value;
                                }
                              });
                              return scopeStyles;
                            };

                            // Render nested card structure
                            const hasCardBox = boxGroup.items.includes('card-box');
                            const hasImageBox = boxGroup.items.includes('image-box');
                            const hasContentBox = boxGroup.items.includes('content-box');
                            const hasTextBox = boxGroup.items.includes('text-box');
                            const hasButton = boxGroup.items.includes('button');

                            if (hasCardBox) {
                              return (
                                <div className="one" style={getScopeStyles('card-box')}>
                                  {hasImageBox && (
                                    <div 
                                      className="one" 
                                      style={{
                                        ...getScopeStyles('image-box'),
                                        minHeight: '120px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--ui-muted-text)',
                                        fontSize: '0.875rem'
                                      }}
                                    >
                                      Image Placeholder
                                    </div>
                                  )}
                                  {hasContentBox && (
                                    <div className="one" style={getScopeStyles('content-box')}>
                                      {hasTextBox && (
                                        <div 
                                          className="one" 
                                          style={{
                                            ...getScopeStyles('text-box'),
                                            color: 'var(--ui-body-text)'
                                          }}
                                        >
                                          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
                                            Card Title
                                          </h3>
                                          <p style={{ margin: '0', fontSize: '0.875rem', lineHeight: '1.5' }}>
                                            Sample card description text goes here to show how the content will look.
                                          </p>
                                        </div>
                                      )}
                                      {hasButton && (
                                        <div 
                                          className="one" 
                                          style={{
                                            ...getScopeStyles('button'),
                                            color: 'var(--ui-primary-text)'
                                          }}
                                        >
                                          Learn More
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            } else {
                              // Fallback: show items in order if no card-box
                              return boxGroup.items.map((scopeName, index) => (
                                <div 
                                  key={index}
                                  className="one"
                                  style={getScopeStyles(scopeName)}
                                >
                                  {scopeName === 'button' && 'Button Text'}
                                  {scopeName === 'text-box' && 'Sample text content'}
                                  {scopeName === 'image-box' && 'Image'}
                                </div>
                              ));
                            }
                          })()
                        ) : (
                          <div style={{
                            gridColumn: '1 / -1',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--ui-muted-text)',
                            fontSize: '0.75rem',
                            fontStyle: 'italic',
                            minHeight: '40px'
                          }}>
                            Empty - add 1Blocks to populate
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="block-info">
                      <span className="block-name">{boxGroup.name}</span>
                      <div className="block-actions">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const confirmed = confirm(`Delete box group "${boxGroup.name}"? This action cannot be undone.`);
                            if (confirmed) {
                              // Remove from box groups
                              setBoxGroups(prev => {
                                const newGroups = { ...prev };
                                delete newGroups[groupId];
                                return newGroups;
                              });
                              // Remove from collection
                              setBoxGroupCollections(prev => ({
                                ...prev,
                                [selectedCollection]: {
                                  ...prev[selectedCollection],
                                  groups: prev[selectedCollection].groups.filter(g => g !== groupId)
                                }
                              }));
                              if (selectedBoxGroup === groupId) {
                                setSelectedBoxGroup(null);
                                setShowPropertyEditor(false);
                              }
                            }
                          }}
                          className="delete-block-btn"
                          title="Delete Box Group"
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
    </div>
  );
}