import React, { useEffect, useState } from 'react';
import { useStudio1Store } from './hooks/useStudio1Store';
import { Studio1ThemeBuilder } from './components/Studio1ThemeBuilder';

export function ShadowApp({ isAdmin = false, isFrontend = false }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { initializeStore, config } = useStudio1Store();
  
  useEffect(() => {
    // Initialize the store with WordPress data
    const wpConfig = window.studio1Config || {};
    initializeStore(wpConfig);
    setIsLoaded(true);
  }, [initializeStore]);
  
  if (!isLoaded) {
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
          Loading Studio1 Design System...
        </div>
      </div>
    );
  }
  
  return (
    <div className="one" style={{
      '--one-width': isFrontend ? '100vw' : 'auto',
      '--one-height': isFrontend ? '100vh' : 'auto',
      '--one-background': 'var(--color3-950)',
      '--one-overflow': 'auto'
    }}>
      {/* Inject CSS variables into shadow DOM */}
      <style>{generateCSSVariables(config)}</style>
      
      <Studio1ThemeBuilder isAdmin={isAdmin} isFrontend={isFrontend} />
      
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
      // Cmd/Ctrl + 1 to toggle Studio1 interface
      if ((e.metaKey || e.ctrlKey) && e.key === '1') {
        e.preventDefault();
        const studio1Element = document.querySelector('studio1-element');
        if (studio1Element) {
          studio1Element.style.display = studio1Element.style.display === 'none' ? 'block' : 'none';
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  return null;
}
