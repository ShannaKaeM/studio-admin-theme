import React, { useState, useEffect } from 'react';

export function PatternCreator({ 
  selectedPattern, 
  setSelectedPattern, 
  patterns, 
  setPatterns 
}) {
  
  // Keep patterns empty for now - clean slate
  useEffect(() => {
    if (Object.keys(patterns).length === 0) {
      setPatterns({});
    }
  }, [patterns, setPatterns]);

  return (
    <>
      {/* Clean Sidebar - Core Elements Only */}
      <div className="pattern-creator-sidebar">
        
        {/* Core Elements Section */}
        <div className="control-section">
          <h3>🎯 Core Elements</h3>
          <div className="empty-state">
            <p>Clean workspace ready for experimentation</p>
          </div>
        </div>

      </div>
    </>
  );
}