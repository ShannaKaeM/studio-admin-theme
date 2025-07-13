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
  const { config, updateScopeBaseProperties, createNewScope, deleteScope } = useThemeConfig();
  const [selectedScope, setSelectedScope] = useState(null);

  const scopes = config.scopes || {};
  const colorVariations = config.colorVariations || {};
  const currentScope = scopes[selectedScope];
  const currentBaseProperties = currentScope?.baseProperties || {};

  // For base editor inline mode
  const textBaseScope = scopes.text;
  const textBaseProperties = textBaseScope?.baseProperties || {};

  // Build dynamic color options from Color Book and Color Creator variations
  const buildColorOptions = (propertyType) => {
    console.log('Color variations available:', colorVariations);
    const options = [];

    // Add Color Book base color
    if (config.colorBook?.baseColor) {
      options.push({
        label: 'Base Color',
        value: 'var(--base-color)',
        group: 'Color Book'
      });
    }

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

  const handleCreateNewScope = () => {
    const elementType = prompt('Choose element type:\n1. Text (title, subtitle, body, etc.)\n\nEnter "text":');
    
    if (elementType && elementType.trim().toLowerCase() === 'text') {
      const scopeName = prompt('Enter text element name (e.g., "title", "subtitle", "body"):');
      if (scopeName && scopeName.trim()) {
        const cleanName = scopeName.trim().toLowerCase().replace(/\s+/g, '-');
        
        // Auto-inherit from base text scope (excluding color to allow inheritance)
        const textProperties = scopes.text?.baseProperties || {};
        const { '--one-color': removedColor, ...inheritedProperties } = textProperties;
        createNewScope(cleanName, {
          ...inheritedProperties,  // Inherit foundation properties (except color)
          '--one-font-size': '1rem',  // Default size, can be customized
          '--one-font-weight': '400'  // Default weight, can be customized
          // Color will inherit from base text scope naturally
        });
        setSelectedScope(cleanName);
      }
    } else if (elementType && elementType.trim()) {
      alert('Only "text" element type is available for now. More types coming soon!');
    }
  };

  return (
    <div className="scopes-builder-grid">
      {/* Left Sidebar */}
      <div className="scopes-builder-sidebar">
        {/* Sidebar Header */}
        <div className="scopes-builder-sidebar-header">
          <h2>Element Builder</h2>
          <p>Create design elements with styling</p>
        </div>

        {/* Scopes List */}
        <div className="scopes-list-area">
          <ScopesTab
            scopes={scopes}
            selectedScope={selectedScope}
            setSelectedScope={setSelectedScope}
            onCreateNewScope={handleCreateNewScope}
            onDeleteScope={deleteScope}
          />
        </div>

        {/* Sidebar Footer */}
        <div style={{ 
          padding: '1rem', 
          borderTop: '1px solid var(--ui-base-600)',
          fontSize: '0.75rem',
          color: 'var(--ui-neutral-400)',
          textAlign: 'center'
        }}>
          {selectedScope ? `Editing element: ${selectedScope}` : 'Select an element to edit'}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="scope-editor-area">
        {selectedScope ? (
          currentScope?.isBaseScope ? (
            <BaseElementMessage scope={selectedScope} />
          ) : (
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
              buildColorOptions={buildColorOptions}
            />
          )
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
          All Elements ({Object.keys(scopes).length})
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
                  {scopeConfig.isBaseScope ? '🏗️' : '🎭'} {scopeName}
                  {scopeConfig.isBaseScope && (
                    <span style={{ 
                      fontSize: '0.625rem',
                      background: 'var(--ui-neutral-600)',
                      color: 'white',
                      padding: '0.125rem 0.375rem',
                      borderRadius: '0.25rem',
                      marginLeft: '0.5rem'
                    }}>
                      GLOBAL
                    </span>
                  )}
                </div>
                <div style={{ 
                  fontSize: '0.75rem', 
                  color: 'var(--ui-neutral-400)' 
                }}>
                  {scopeConfig.isBaseScope 
                    ? `Global foundation - edit in Base Settings tab`
                    : (scopeConfig.description || `${Object.keys(scopeConfig.baseProperties || {}).length} properties`)
                  }
                </div>
              </div>
            </button>
            {!scopeConfig.isBaseScope && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const confirmed = confirm(`Delete element "${scopeName}"? This action cannot be undone.`);
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
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={onCreateNewScope}
        className="ui-button ui-button--primary"
        style={{ width: '100%' }}
      >
        + Add New Element
      </button>
    </div>
  );
}

// Scope Editor Component
function ScopeEditor({ scope, baseProperties, onBasePropertyChange, onBasePropertyRemove, buildColorOptions }) {
  const [editMode, setEditMode] = useState('element'); // 'element' or 'base'
  
  // Check if this scope has a corresponding base scope
  const hasBaseScope = scope !== 'text'; // text elements have a base, text itself IS the base
  
  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            color: 'var(--ui-neutral-100)', 
            margin: 0 
          }}>
            🎭 {scope}
          </h1>
          
          {hasBaseScope && (
            <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--ui-neutral-50)', borderRadius: '0.25rem', padding: '0.25rem' }}>
              <button
                onClick={() => setEditMode('element')}
                style={{
                  padding: '0.375rem 0.75rem',
                  border: 'none',
                  borderRadius: '0.125rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  background: editMode === 'element' ? 'var(--ui-primary)' : 'transparent',
                  color: editMode === 'element' ? 'white' : 'var(--ui-neutral-400)'
                }}
              >
                🎭 Element
              </button>
              <button
                onClick={() => setEditMode('base')}
                style={{
                  padding: '0.375rem 0.75rem',
                  border: 'none',
                  borderRadius: '0.125rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  background: editMode === 'base' ? 'var(--ui-primary)' : 'transparent',
                  color: editMode === 'base' ? 'white' : 'var(--ui-neutral-400)'
                }}
              >
                🏗️ Base
              </button>
            </div>
          )}
        </div>
        
        <p style={{ 
          color: 'var(--ui-neutral-400)', 
          fontSize: '0.875rem',
          margin: 0
        }}>
          {hasBaseScope && editMode === 'base' 
            ? `Edit the global foundation that all text elements inherit`
            : `Edit the styling properties for this ${scope} element`
          }
        </p>
      </div>

      {hasBaseScope && editMode === 'base' ? (
        <BaseEditorInline 
          textBaseProperties={textBaseProperties}
          updateScopeBaseProperties={updateScopeBaseProperties}
          buildColorOptions={buildColorOptions}
        />
      ) : (
        <>
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
                &lt;div data-scope="{scope}"&gt;
              </div>
              
              <div 
                data-scope={scope}
                className="one"
                style={{ margin: '1rem 0' }}
              >
                <div className="one">
                  {scope === 'eyebrow' && 'Sample Eyebrow Text'}
                  {scope === 'title' && 'Sample Title Text'}
                  {scope === 'description' && 'Sample description text content for testing the base scope styling.'}
                  {!['eyebrow', 'title', 'description'].includes(scope) && `Sample ${scope} content for testing`}
                </div>
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
        </>
      )}
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