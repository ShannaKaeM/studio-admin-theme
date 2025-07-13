import React, { useEffect, useState } from 'react';
import { useStudio1Store } from './hooks/useStudio1Store';
import { Studio1ThemeBuilder } from './components/Studio1ThemeBuilder';
import uiComponentsCSS from './styles/ui-components.css?inline';

export function ShadowApp({ isAdmin = false, isFrontend = false }) {
  const { initializeStore, getIsLoaded, getWpConfig } = useStudio1Store();
  const isLoaded = getIsLoaded();
  const wpConfig = getWpConfig();
  
  useEffect(() => {
    // Initialize the store with WordPress data
    const config = window.studio1Config || {};
    initializeStore(config);
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
          '--one-color': 'var(--ui-muted-text)',
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
      '--one-background': 'var(--ui-base-900)',
      '--one-overflow': 'auto'
    }}>
      {/* Inject CSS variables and UI components into shadow DOM */}
      <style>{uiComponentsCSS}</style>
      <style>{generateCSSVariables(wpConfig)}</style>
      
      <Studio1ThemeBuilder isAdmin={isAdmin} isFrontend={isFrontend} />
      
      {/* Keyboard shortcut listener */}
      <KeyboardShortcuts />
    </div>
  );
}

function generateCSSVariables(wpConfig) {
  if (!wpConfig || Object.keys(wpConfig).length === 0) return '';
  
  let css = ':host {\n';
  
  // Generate CSS variables from any WordPress config data
  // This is for future WordPress integration - currently empty is fine
  Object.entries(wpConfig).forEach(([key, value]) => {
    if (typeof value === 'string') {
      css += `  --wp-${key}: ${value};\n`;
    }
  });
  
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
