import React, { useEffect, useState } from 'react';
import { useS4Store } from './hooks/useS4Store';
import { S4ThemeBuilder } from './s4/components/S4ThemeBuilder';

export function ShadowApp({ isAdmin = false }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { initializeStore, config } = useS4Store();
  
  useEffect(() => {
    // Initialize the store with WordPress data
    const wpConfig = window.s4Config || {};
    initializeStore(wpConfig);
    setIsLoaded(true);
  }, [initializeStore]);
  
  if (!isLoaded) {
    return (
      <div className="box" data-scope="card" data-preset="center" style={{ minHeight: '200px' }}>
        <div className="text" data-preset="body">
          Loading S4 Design System...
        </div>
      </div>
    );
  }
  
  return (
    <div className="box" data-preset="stack">
      {/* Inject CSS variables into shadow DOM */}
      <style>{generateCSSVariables(config)}</style>
      
      {/* Main application */}
      <S4ThemeBuilder isAdmin={isAdmin} />
      
      {/* Keyboard shortcut listener */}
      <KeyboardShortcuts />
    </div>
  );
}

function generateCSSVariables(config) {
  if (!config) return '';
  
  let css = ':host {\n';
  
  // Brand colors
  if (config.brand) {
    Object.entries(config.brand).forEach(([key, value]) => {
      css += `  --brand-${key}: ${value};\n`;
    });
  }
  
  // Typography
  if (config.typography) {
    Object.entries(config.typography).forEach(([key, value]) => {
      css += `  --brand-${key}: ${value};\n`;
    });
  }
  
  css += '}\n';
  return css;
}

function KeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + 4 to toggle S4 interface
      if ((e.metaKey || e.ctrlKey) && e.key === '4') {
        e.preventDefault();
        const s4Element = document.querySelector('s4-element');
        if (s4Element) {
          s4Element.style.display = s4Element.style.display === 'none' ? 'block' : 'none';
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return null;
}
