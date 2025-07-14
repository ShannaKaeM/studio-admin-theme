import React, { useState, useEffect } from 'react';
import { useThemeConfig } from '../hooks/useThemeConfig.js';

export function PatternCreator() {
  const { config } = useThemeConfig();
  
  // Pattern Management State
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [patterns, setPatterns] = useState(() => {
    try {
      // Clear old patterns and start fresh with atomic-based patterns
      localStorage.removeItem('studio1-patterns');
      return {
        'card-vertical': {
          name: 'Vertical Card',
          description: 'Standard vertical card layout with atomic elements',
          triggerBlocks: ['wrapper'],
          structure: {
            'wrapper': {
              flexDirection: 'column',
              children: ['box', 'box-group']
            },
            'box-group': {
              children: ['title', 'description', 'button']
            }
          }
        },
        'hero-split': {
          name: 'Split Hero',
          description: 'Two-column hero with content and media',
          triggerBlocks: ['section'],
          structure: {
            'section': {
              flexDirection: 'row',
              children: ['box-group', 'box']
            },
            'box-group': {
              children: ['pretitle', 'title', 'description', 'button']
            }
          }
        },
        'text-stack': {
          name: 'Text Stack',
          description: 'Vertical text content grouping',
          triggerBlocks: ['box-group'],
          structure: {
            'box-group': {
              flexDirection: 'column',
              children: ['title', 'subtitle', 'body', 'label']
            }
          }
        }
      };
    } catch {
      return {};
    }
  });
  
  const [showCreatePattern, setShowCreatePattern] = useState(false);
  const [newPatternName, setNewPatternName] = useState('');
  const [newPatternType, setNewPatternType] = useState('card');

  // Persist patterns to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('studio1-patterns', JSON.stringify(patterns));
    } catch (error) {
      console.warn('Failed to save patterns:', error);
    }
  }, [patterns]);

  // Create new pattern
  const handleCreatePattern = () => {
    if (newPatternName && newPatternName.trim()) {
      const cleanName = newPatternName.trim().toLowerCase().replace(/\s+/g, '-');
      const timestamp = Date.now();
      const uniqueName = `${cleanName}-${timestamp}`;
      
      const newPattern = {
        name: newPatternName.trim(),
        description: `Custom ${newPatternType} pattern`,
        triggerBlocks: [`${newPatternType}-box`],
        structure: {
          [`${newPatternType}-box`]: {
            flexDirection: 'column',
            children: []
          }
        }
      };
      
      setPatterns(prev => ({
        ...prev,
        [uniqueName]: newPattern
      }));
      
      setSelectedPattern(uniqueName);
      setNewPatternName('');
      setShowCreatePattern(false);
    }
  };

  // Delete pattern
  const handleDeletePattern = (patternId) => {
    const pattern = patterns[patternId];
    if (confirm(`Delete pattern "${pattern.name}"? This action cannot be undone.`)) {
      setPatterns(prev => {
        const newPatterns = { ...prev };
        delete newPatterns[patternId];
        return newPatterns;
      });
      if (selectedPattern === patternId) {
        setSelectedPattern(null);
      }
    }
  };

  const currentPattern = patterns[selectedPattern];

  return (
    <div className="dashboard-layout">
      {/* Left Side Controls - 400px */}
      <div className="dashboard-sidebar">
        
        {/* Pattern Library */}
        <div className="control-section">
          <h3>🎨 Pattern Library</h3>
          {!showCreatePattern ? (
            <>
              <div className="pattern-list">
                {Object.entries(patterns).map(([patternId, pattern]) => (
                  <div 
                    key={patternId}
                    className={`pattern-item ${selectedPattern === patternId ? 'pattern-selected' : ''}`}
                    onClick={() => {
                      console.log('Pattern clicked:', patternId);
                      setSelectedPattern(patternId);
                    }}
                  >
                    <div className="pattern-item-name">
                      {pattern.name}
                    </div>
                    <div className="pattern-item-description">
                      {pattern.description}
                    </div>
                    <div className="pattern-item-metadata">
                      Triggers: {pattern.triggerBlocks.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setShowCreatePattern(true)}
                className="ui-button ui-button--primary"
              >
                + New Pattern
              </button>
            </>
          ) : (
            <div className="create-form">
              <input
                type="text"
                placeholder="Pattern name..."
                value={newPatternName}
                onChange={(e) => setNewPatternName(e.target.value)}
                className="property-value-input"
              />
              <select 
                value={newPatternType}
                onChange={(e) => setNewPatternType(e.target.value)}
                className="property-value-select"
              >
                <option value="card">Card Pattern</option>
                <option value="hero">Hero Pattern</option>
                <option value="nav">Navigation Pattern</option>
                <option value="footer">Footer Pattern</option>
              </select>
              <div className="form-actions">
                <button 
                  onClick={handleCreatePattern}
                  className="ui-button ui-button--primary ui-button--small"
                >
                  Create
                </button>
                <button 
                  onClick={() => setShowCreatePattern(false)}
                  className="ui-button ui-button--secondary ui-button--small"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pattern Editor */}
        {selectedPattern && currentPattern && (
          <div className="control-section">
            <div className="control-header">
              <h3>✏️ Edit Pattern</h3>
              <button
                onClick={() => handleDeletePattern(selectedPattern)}
                className="ui-button ui-button--danger ui-button--small"
              >
                Delete
              </button>
            </div>
            
            <div className="pattern-info">
              <div className="pattern-name">
                <strong>{currentPattern.name}</strong>
              </div>
              <div className="pattern-description">
                {currentPattern.description}
              </div>
            </div>

            <div className="pattern-structure">
              <h4>Pattern Structure</h4>
              <div className="structure-editor">
                <div className="property-item">
                  <label>Trigger Blocks</label>
                  <input
                    type="text"
                    value={currentPattern.triggerBlocks.join(', ')}
                    onChange={(e) => {
                      const newTriggers = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                      setPatterns(prev => ({
                        ...prev,
                        [selectedPattern]: {
                          ...prev[selectedPattern],
                          triggerBlocks: newTriggers
                        }
                      }));
                    }}
                    className="property-value-input"
                    placeholder="card-box, hero-box, nav-box..."
                  />
                </div>
                
                <div className="property-item">
                  <label>Layout Direction</label>
                  <select
                    value={currentPattern.structure[currentPattern.triggerBlocks[0]]?.flexDirection || 'column'}
                    onChange={(e) => {
                      const mainBlock = currentPattern.triggerBlocks[0];
                      setPatterns(prev => ({
                        ...prev,
                        [selectedPattern]: {
                          ...prev[selectedPattern],
                          structure: {
                            ...prev[selectedPattern].structure,
                            [mainBlock]: {
                              ...prev[selectedPattern].structure[mainBlock],
                              flexDirection: e.target.value
                            }
                          }
                        }
                      }));
                    }}
                    className="property-value-select"
                  >
                    <option value="column">Vertical (Column)</option>
                    <option value="row">Horizontal (Row)</option>
                    <option value="row-reverse">Horizontal Reverse</option>
                    <option value="column-reverse">Vertical Reverse</option>
                  </select>
                </div>

                <div className="property-item">
                  <label>Child Elements</label>
                  <input
                    type="text"
                    value={currentPattern.structure[currentPattern.triggerBlocks[0]]?.children?.join(', ') || ''}
                    onChange={(e) => {
                      const newChildren = e.target.value.split(',').map(t => t.trim()).filter(Boolean);
                      const mainBlock = currentPattern.triggerBlocks[0];
                      setPatterns(prev => ({
                        ...prev,
                        [selectedPattern]: {
                          ...prev[selectedPattern],
                          structure: {
                            ...prev[selectedPattern].structure,
                            [mainBlock]: {
                              ...prev[selectedPattern].structure[mainBlock],
                              children: newChildren
                            }
                          }
                        }
                      }));
                    }}
                    className="property-value-input"
                    placeholder="image-box, content-box, text-box, button..."
                  />
                </div>
              </div>
              
              <details className="json-details">
                <summary className="json-summary">View JSON Structure</summary>
                <pre className="code-block json-content">
                  {JSON.stringify(currentPattern.structure, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}
      </div>

      {/* Right Side Preview Area */}
      <div className="dashboard-preview">
        <div className="preview-header">
          <h2>Pattern Creator</h2>
          <p>Revolutionary layout pattern system - transform any component into infinite variations</p>
        </div>

        <div className="preview-content">
          {selectedPattern && currentPattern ? (
            <div className="pattern-preview">
              <h3>Pattern: {currentPattern.name}</h3>
              <div className="preview-container">
                {(() => {
                  const mainBlock = currentPattern.triggerBlocks[0];
                  const structure = currentPattern.structure[mainBlock];
                  const flexDirection = structure?.flexDirection || 'column';
                  const children = structure?.children || [];
                  
                  // Function to render atomic elements graphically
                  const renderAtomicElement = (elementName) => {
                    const atomicStyles = {
                      // Text atoms - different sizes and colors
                      pretitle: { height: '0.75rem', background: '#8b5cf6', width: '40%' },
                      title: { height: '1.5rem', background: '#3b82f6', width: '70%' },
                      subtitle: { height: '1rem', background: '#06b6d4', width: '60%' },
                      description: { height: '0.875rem', background: '#64748b', width: '90%' },
                      body: { height: '0.75rem', background: '#64748b', width: '100%' },
                      label: { height: '0.625rem', background: '#71717a', width: '30%' },
                      quote: { height: '1rem', background: '#f59e0b', width: '80%', fontStyle: 'italic' },
                      code: { height: '0.75rem', background: '#374151', width: '50%', fontFamily: 'monospace' },
                      
                      // Interactive atoms
                      button: { height: '2.5rem', background: '#22c55e', width: '6rem' },
                      icon: { height: '1.5rem', background: '#6366f1', width: '1.5rem' },
                      
                      // Box atoms - containers and structure
                      section: { background: '#fef3c7', border: '2px solid #f59e0b', minHeight: '3rem' },
                      container: { background: '#dbeafe', border: '2px solid #3b82f6', minHeight: '2rem' },
                      wrapper: { background: '#f3e8ff', border: '2px solid #8b5cf6', minHeight: '2rem' },
                      'box-group': { background: '#ecfdf5', border: '1px solid #10b981', minHeight: '1.5rem' },
                      box: { background: '#e2e8f0', border: '2px dashed #94a3b8', minHeight: '4rem' }
                    };
                    
                    const style = atomicStyles[elementName] || { height: '1rem', background: '#gray', width: '50%' };
                    
                    return (
                      <div 
                        key={elementName}
                        style={{
                          ...style,
                          borderRadius: '0.25rem',
                          marginBottom: '0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          color: elementName === 'code' ? 'white' : '#374151',
                          fontWeight: '500'
                        }}
                      >
                        {elementName}
                      </div>
                    );
                  };

                  // Render pattern structure using atomic elements
                  const renderPatternStructure = (structure, blockName, isRoot = false) => {
                    const blockStructure = structure[blockName];
                    if (!blockStructure) return null;

                    const { flexDirection = 'column', children = [] } = blockStructure;

                    // For box atoms, render as containers
                    if (['section', 'container', 'wrapper', 'box-group', 'box'].includes(blockName)) {
                      return (
                        <div style={{
                          display: 'flex',
                          flexDirection: flexDirection,
                          gap: '0.75rem',
                          padding: blockName === 'section' ? '2rem' : '1rem',
                          background: {
                            section: '#fef3c7',
                            container: '#dbeafe', 
                            wrapper: '#f3e8ff',
                            'box-group': '#ecfdf5',
                            box: '#e2e8f0'
                          }[blockName],
                          border: `2px ${blockName === 'box' ? 'dashed' : 'solid'} ${
                            { section: '#f59e0b', container: '#3b82f6', wrapper: '#8b5cf6', 'box-group': '#10b981', box: '#94a3b8' }[blockName]
                          }`,
                          borderRadius: '0.5rem',
                          minHeight: blockName === 'section' ? '200px' : 'auto',
                          alignItems: flexDirection === 'row' ? 'center' : 'stretch'
                        }}>
                          {children.map(child => {
                            // If child exists in structure, render it recursively
                            if (structure[child]) {
                              return renderPatternStructure(structure, child);
                            }
                            // Otherwise render as atomic element
                            return renderAtomicElement(child);
                          })}
                        </div>
                      );
                    }

                    // For other elements, render as atomic elements
                    return renderAtomicElement(blockName);
                  };

                  return renderPatternStructure(currentPattern.structure, mainBlock, true);
                })()}
              </div>
              
              <div className="pattern-details">
                <h4>Pattern Details</h4>
                <div className="details-card">
                  <div><strong>Trigger Blocks:</strong> {currentPattern.triggerBlocks.join(', ')}</div>
                  <div className="structure-info">
                    <strong>Structure:</strong> 
                    <div className="structure-summary">
                      {Object.keys(currentPattern.structure).length} element(s) defined
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div>🎨</div>
              <h3>Pattern Creator</h3>
              <p>Select a pattern from the library to edit, or create a new pattern to get started</p>
              <div style={{ marginTop: '2rem', textAlign: 'left' }}>
                <h4>What are Patterns?</h4>
                <ul>
                  <li>Define how 1Blocks nest and arrange within Box Groups</li>
                  <li>Create multiple layout variations for the same content</li>
                  <li>Enable responsive pattern switching per breakpoint</li>
                  <li>Transform one component into infinite layout possibilities</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}