import React, { useState } from 'react';

export function PatternWorkspace({ selectedPattern, patterns }) {
  // Pattern builder state
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [gridSize] = useState(20); // 20px grid
  
  // Available content types
  const contentTypes = [
    { id: 'title', name: 'Title', color: 'var(--element-secondary)' },
    { id: 'subtitle', name: 'Subtitle', color: 'var(--element-primary)' },
    { id: 'description', name: 'Description', color: 'var(--element-secondary)' },
    { id: 'button', name: 'Button', color: 'var(--element-primary)' },
    { id: 'image', name: 'Image', color: '#94a3b8' },
    { id: 'container', name: 'Container', color: 'var(--element-secondary)' }
  ];

  // Add a new block
  const addBlock = () => {
    const newBlock = {
      id: Date.now(),
      x: 40,
      y: 40,
      width: 200,
      height: 60,
      contentType: 'title',
      name: `Block ${blocks.length + 1}`
    };
    setBlocks([...blocks, newBlock]);
  };

  // Update block content type
  const updateBlockContentType = (blockId, contentType) => {
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, contentType } : block
    ));
  };

  // Delete block
  const deleteBlock = (blockId) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
    if (selectedBlock === blockId) {
      setSelectedBlock(null);
    }
  };

  // Get content type info
  const getContentTypeInfo = (contentType) => {
    return contentTypes.find(type => type.id === contentType) || contentTypes[0];
  };

  // Visual pattern builder
  return (
    <div className="pattern-builder">
      
      {/* Toolbar */}
      <div className="builder-toolbar">
        <button 
          onClick={addBlock}
          className="ui-button ui-button--primary ui-button--small"
        >
          + Add Block
        </button>
        <span className="toolbar-info">
          {blocks.length} blocks • Click blocks to select • Drag to move
        </span>
      </div>

      {/* Grid Canvas */}
      <div className="builder-canvas">
        <div 
          className="grid-canvas"
          style={{
            backgroundSize: `${gridSize}px ${gridSize}px`
          }}
        >
          {blocks.map(block => {
            const contentTypeInfo = getContentTypeInfo(block.contentType);
            return (
              <div
                key={block.id}
                className={`pattern-block ${selectedBlock === block.id ? 'selected' : ''}`}
                style={{
                  left: block.x,
                  top: block.y,
                  width: block.width,
                  height: block.height,
                  backgroundColor: contentTypeInfo.color
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBlock(block.id);
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  
                  // Check if we're resizing (clicking near edges)
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const clickY = e.clientY - rect.top;
                  const resizeThreshold = 10;
                  
                  const isResizingRight = clickX > rect.width - resizeThreshold;
                  const isResizingBottom = clickY > rect.height - resizeThreshold;
                  const isResizing = isResizingRight || isResizingBottom;
                  
                  if (isResizing) {
                    // Resize functionality - fixed canvas reference
                    const canvas = document.querySelector('.grid-canvas');
                    const canvasRect = canvas.getBoundingClientRect();
                    
                    const handleMouseMove = (e) => {
                      const newWidth = isResizingRight ? 
                        Math.round((e.clientX - canvasRect.left - block.x) / gridSize) * gridSize :
                        block.width;
                      const newHeight = isResizingBottom ?
                        Math.round((e.clientY - canvasRect.top - block.y) / gridSize) * gridSize :
                        block.height;
                      
                      setBlocks(blocks.map(b => 
                        b.id === block.id 
                          ? { 
                              ...b, 
                              width: Math.max(gridSize * 2, newWidth), // Minimum 2 grid units
                              height: Math.max(gridSize, newHeight)
                            }
                          : b
                      ));
                    };
                    
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  } else {
                    // Drag functionality
                    const startX = e.clientX - block.x;
                    const startY = e.clientY - block.y;
                    
                    const handleMouseMove = (e) => {
                      const newX = Math.round((e.clientX - startX) / gridSize) * gridSize;
                      const newY = Math.round((e.clientY - startY) / gridSize) * gridSize;
                      
                      setBlocks(blocks.map(b => 
                        b.id === block.id 
                          ? { ...b, x: Math.max(0, newX), y: Math.max(0, newY) }
                          : b
                      ));
                    };
                    
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }
                }}
              >
                <div className="block-content">
                  {contentTypeInfo.name}
                </div>
                
                {selectedBlock === block.id && (
                  <button
                    className="block-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBlock(block.id);
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Block Properties Panel */}
      {selectedBlock && (
        <div className="properties-panel">
          <h3>Block Properties</h3>
          {(() => {
            const block = blocks.find(b => b.id === selectedBlock);
            if (!block) return null;
            
            return (
              <div className="property-controls">
                <label>Content Type:</label>
                <select
                  value={block.contentType}
                  onChange={(e) => updateBlockContentType(block.id, e.target.value)}
                  className="property-select"
                >
                  {contentTypes.map(type => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                
                <div className="size-info">
                  Size: {block.width} × {block.height}px
                  <br />
                  Position: {block.x}, {block.y}
                </div>
              </div>
            );
          })()}
        </div>
      )}

    </div>
  );
}