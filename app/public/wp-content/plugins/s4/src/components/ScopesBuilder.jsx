import React, { useState, useEffect } from 'react';
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

const getCommonValues = (property, buildColorOptions) => {
  const staticValues = {
    '--one-font-size': ['0.75rem', '0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '2rem', '2.5rem', '3rem'],
    '--one-font-weight': ['300', '400', '500', '600', '700', '800'],
    '--one-line-height': ['1', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6'],
    '--one-text-transform': ['none', 'uppercase', 'lowercase', 'capitalize'],
    '--one-display': ['block', 'flex', 'grid', 'inline', 'inline-block', 'none'],
    '--one-flex-direction': ['row', 'column', 'row-reverse', 'column-reverse'],
    '--one-justify-content': ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
    '--one-align-items': ['flex-start', 'center', 'flex-end', 'stretch']
  };

  // Return static values for non-color properties
  if (staticValues[property]) {
    return staticValues[property];
  }

  // Return dynamic color options for color properties
  if (property === '--one-color' || property === '--one-background' || property === '--one-border-color') {
    return buildColorOptions(property);
  }

  return null;
};

export function ScopesBuilder() {
  const { config, updateScopeBaseProperties, createNewScope, deleteScope, resetToDefault } = useThemeConfig();
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
  
  // Accordion states for property categories
  const [expandedCategories, setExpandedCategories] = useState({
    typography: false,
    layout: false,
    spacing: false,
    flexbox: false,
    grid: false,
    background: false,
    border: false,
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

  // Build dynamic color options from color variations only
  const buildColorOptions = (propertyType) => {
    console.log('Color variations available:', colorVariations);
    const options = [];

    // Add any color variations from Color Creator (if they exist)
    Object.entries(colorVariations).forEach(([colorKey, variations]) => {
      Object.entries(variations).forEach(([varName, varColor]) => {
        options.push({
          label: `Custom: ${varName}`,
          value: varColor,
          group: 'Custom Colors'
        });
      });
    });

    // Add special options for certain properties
    if (propertyType === '--one-background') {
      options.push({
        label: 'Transparent',
        value: 'transparent',
        group: 'Special'
      });
    }

    return options;
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

  const getPresetProperties = (preset) => {
    const presets = {
      text: {
        '--one-font-size': '1rem',
        '--one-line-height': '1.5',
        '--one-margin': '0'
      },
      button: {
        '--one-display': 'inline-flex',
        '--one-align-items': 'center',
        '--one-justify-content': 'center',
        '--one-padding': '0.75rem 1.5rem',
        '--one-border-radius': '0.375rem',
        '--one-cursor': 'pointer',
        '--one-font-weight': '500'
      },
      layout: {
        '--one-display': 'flex',
        '--one-flex-direction': 'column',
        '--one-gap': '1rem',
        '--one-padding': '1rem'
      }
    };
    return presets[preset] || {};
  };

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
            <button 
              onClick={() => setShowCreate1Block(true)}
              className="ui-button ui-button--primary"
            >
              + New 1Block
            </button>
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
                    {getBasicProperties(key).map(prop => (
                      <div key={prop} className="property-item">
                        <label>{prop}</label>
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
                      </div>
                    ))}
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
                        {blockName}
                      </div>
                    </div>
                    <div className="block-info">
                      <span className="block-name">{blockName}</span>
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
                      >
                        ✕
                      </button>
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
function ScopeEditor({ scope, baseProperties, onBasePropertyChange, onBasePropertyRemove, buildColorOptions }) {
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
        buildColorOptions={buildColorOptions}
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
function PropertyEditor({ title, properties, onPropertyChange, onPropertyRemove, addButtonText, buildColorOptions }) {
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
          const availableValues = getCommonValues(selectedProperty, buildColorOptions);
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
function BaseEditorInline({ textBaseProperties = {}, updateScopeBaseProperties, buildColorOptions }) {
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
        buildColorOptions={buildColorOptions}
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