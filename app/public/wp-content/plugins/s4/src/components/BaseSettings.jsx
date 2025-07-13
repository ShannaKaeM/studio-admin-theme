import React, { useState } from 'react';
import { useThemeConfig } from '../hooks/useThemeConfig.js';

// CSS Property options for dropdowns (same as ScopesBuilder)
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

export function BaseSettings({ inline = false }) {
  const { config, updateScopeBaseProperties } = useThemeConfig();
  const [selectedBaseScope, setSelectedBaseScope] = useState('text');

  const scopes = config.scopes || {};
  const colorVariations = config.colorVariations || {};
  
  // Filter to only show base scopes
  const baseScopes = Object.entries(scopes).filter(([, scopeConfig]) => scopeConfig.isBaseScope);
  const currentScope = scopes[selectedBaseScope];
  const currentBaseProperties = currentScope?.baseProperties || {};

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

  if (inline) {
    // Inline version for use within ScopeEditor
    return (
      <PropertyEditor
        title="Text Base Properties"
        properties={currentBaseProperties}
        onPropertyChange={(property, value) => {
          const updatedProperties = { ...currentBaseProperties, [property]: value };
          updateScopeBaseProperties(selectedBaseScope, updatedProperties);
        }}
        onPropertyRemove={(property) => {
          const updatedProperties = { ...currentBaseProperties };
          delete updatedProperties[property];
          updateScopeBaseProperties(selectedBaseScope, updatedProperties);
        }}
        addButtonText="Add Base Property"
        buildColorOptions={buildColorOptions}
      />
    );
  }

  return (
    <div className="scopes-builder-grid">
      {/* Left Sidebar */}
      <div className="scopes-builder-sidebar">
        {/* Sidebar Header */}
        <div className="scopes-builder-sidebar-header">
          <h2>Base Settings</h2>
          <p>Edit global foundation elements</p>
        </div>

        {/* Base Scopes List */}
        <div className="scopes-list-area">
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
                Base Elements ({baseScopes.length})
              </h3>
            </div>

            <ul className="scopes-list">
              {baseScopes.map(([scopeName, scopeConfig]) => (
                <li key={scopeName} className={`scope-item ${selectedBaseScope === scopeName ? 'selected' : ''}`}>
                  <button
                    onClick={() => setSelectedBaseScope(scopeName)}
                    className="scope-item-button"
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontWeight: '500', 
                        color: 'var(--ui-neutral-100)', 
                        marginBottom: '0.25rem' 
                      }}>
                        🏗️ {scopeName}
                        <span style={{ 
                          fontSize: '0.625rem',
                          background: 'var(--ui-primary)',
                          color: 'white',
                          padding: '0.125rem 0.375rem',
                          borderRadius: '0.25rem',
                          marginLeft: '0.5rem'
                        }}>
                          BASE
                        </span>
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: 'var(--ui-neutral-400)' 
                      }}>
                        {scopeConfig.description || `${Object.keys(scopeConfig.baseProperties || {}).length} properties`}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>

            <div style={{
              fontSize: '0.75rem',
              color: 'var(--ui-neutral-400)',
              textAlign: 'center',
              marginTop: '1rem',
              fontStyle: 'italic',
              padding: '1rem'
            }}>
              Base elements provide the foundation that all child elements inherit. Changes here affect all elements of this type.
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div style={{ 
          padding: '1rem', 
          borderTop: '1px solid var(--ui-base-600)',
          fontSize: '0.75rem',
          color: 'var(--ui-neutral-400)',
          textAlign: 'center'
        }}>
          {selectedBaseScope ? `Editing base: ${selectedBaseScope}` : 'Select a base element to edit'}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="scope-editor-area">
        {selectedBaseScope ? (
          <BaseScopeEditor
            scope={selectedBaseScope}
            baseProperties={currentBaseProperties}
            onBasePropertyChange={(property, value) => {
              const updatedProperties = { ...currentBaseProperties, [property]: value };
              updateScopeBaseProperties(selectedBaseScope, updatedProperties);
            }}
            onBasePropertyRemove={(property) => {
              const updatedProperties = { ...currentBaseProperties };
              delete updatedProperties[property];
              updateScopeBaseProperties(selectedBaseScope, updatedProperties);
            }}
            buildColorOptions={buildColorOptions}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

// Base Scope Editor Component
function BaseScopeEditor({ scope, baseProperties, onBasePropertyChange, onBasePropertyRemove, buildColorOptions }) {
  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          color: 'var(--ui-neutral-100)', 
          margin: '0 0 0.5rem 0' 
        }}>
          🏗️ {scope} (Base Foundation)
        </h1>
        <p style={{ 
          color: 'var(--ui-neutral-400)', 
          fontSize: '0.875rem',
          margin: 0
        }}>
          Edit the global foundation that all {scope} elements inherit
        </p>
      </div>

      <PropertyEditor
        title={`${scope} Base Properties`}
        properties={baseProperties}
        onPropertyChange={onBasePropertyChange}
        onPropertyRemove={onBasePropertyRemove}
        addButtonText="Add Base Property"
        buildColorOptions={buildColorOptions}
      />

      {/* Global Impact Notice */}
      <div style={{
        background: 'var(--ui-neutral-50)',
        border: '1px solid var(--ui-primary)',
        borderRadius: 'var(--ui-border-radius)',
        padding: '1rem',
        marginTop: '1.5rem'
      }}>
        <div style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          color: 'var(--ui-primary)',
          marginBottom: '0.5rem'
        }}>
          ⚡ Global Foundation Impact
        </div>
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--ui-neutral-400)',
          lineHeight: '1.4'
        }}>
          Changes to this base foundation will automatically apply to all {scope} elements (title, subtitle, body, etc.). 
          Individual elements can override these properties when needed.
        </div>
      </div>
    </div>
  );
}

// Property Editor Component (reused from ScopesBuilder)
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
          No base properties set. {addButtonText} above to start.
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

// Empty State Component
function EmptyState() {
  return (
    <div className="select-scope-message">
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏗️</div>
      <h3 style={{ 
        fontSize: '1.25rem', 
        fontWeight: '600', 
        color: 'var(--ui-neutral-200)', 
        margin: '0 0 0.5rem 0' 
      }}>
        Select a Base Element
      </h3>
      <p style={{ 
        color: 'var(--ui-neutral-400)', 
        fontSize: '0.875rem',
        margin: 0
      }}>
        Choose a base element from the sidebar to edit its foundation properties
      </p>
    </div>
  );
}