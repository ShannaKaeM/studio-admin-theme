import React, { useState, useEffect } from 'react';
import { useStore } from '../../storage/store';
import { S4PresetProcessor } from '../utils/S4PresetProcessor';
import ColorControls from './ColorControls';
import LayoutControls from './LayoutControls';
import LivePreview from './LivePreview';
import presetData from '../presets/s4-presets.json';

export function S4ThemeBuilder() {
  // Get S4 state from Zustand store
  const {
    theme,
    s4BrandColors,
    s4ActiveColorPreset,
    s4ActiveLayoutPreset,
    s4ActiveHelpers,
    s4LayoutSettings,
    setS4BrandColors,
    updateS4BrandColor,
    setS4ActiveColorPreset,
    setS4ActiveLayoutPreset,
    setS4ActiveHelpers,
    updateS4LayoutSetting
  } = useStore();
  
  // Initialize preset processor
  const [processor] = useState(() => new S4PresetProcessor(presetData));
  const [generatedCSS, setGeneratedCSS] = useState('');
  const [activeSection, setActiveSection] = useState('colors');
  
  // Debug logging
  console.log('Active section:', activeSection);
  
  // Generate CSS whenever settings change
  useEffect(() => {
    // Generate CSS variables from brand colors and layout settings
    const spacing = s4LayoutSettings?.spacing || { base: 1, scale: 1.5 };
    const sizing = s4LayoutSettings?.sizing || { base: 16, scale: 1.333 };
    const container = s4LayoutSettings?.container || { maxWidth: 1280, padding: 24 };
    const grid = s4LayoutSettings?.grid || { gap: 24, columns: 12 };
    
    // Generate spacing scale
    const spaceScale = Array.from({ length: 6 }, (_, i) => {
      const value = i === 0 ? 0 : spacing.base * Math.pow(spacing.scale, i - 1);
      return `  --space-${i}: ${value}rem;`;
    }).join('\n');
    
    // Generate type scale
    const typeScale = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].map((size, index) => {
      const value = sizing.base * Math.pow(sizing.scale, index - 2);
      return `  --text-${size}: ${value / 16}rem;`;
    }).join('\n');
    
    const css = `
:root {
  /* Brand Colors */
  --color1: ${s4BrandColors.color1};
  --color2: ${s4BrandColors.color2};
  --color3: ${s4BrandColors.color3};
  --color4: ${s4BrandColors.color4};
  
  /* Spacing Scale */
${spaceScale}
  
  /* Type Scale */
${typeScale}
  
  /* Container */
  --container-max-width: ${container.maxWidth}px;
  --container-padding: ${container.padding}px;
  
  /* Grid */
  --grid-gap: ${grid.gap}px;
  --grid-columns: ${grid.columns};
}

/* S4 System CSS */
.section { 
  background: var(--color4);
  padding: var(--space-4) var(--container-padding);
}
.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
}
.grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--grid-gap);
}
.title { 
  color: var(--color3);
  font-size: var(--text-2xl);
  margin-bottom: var(--space-2);
}
.subtitle {
  color: var(--color3);
  font-size: var(--text-lg);
  opacity: 0.9;
  margin-bottom: var(--space-1);
}
.text { 
  color: var(--color3);
  font-size: var(--text-base);
  opacity: 0.8;
  line-height: 1.6;
}
.button-primary { 
  background: var(--color1);
  color: white;
  padding: var(--space-2) var(--space-3);
  border-radius: 0.5rem;
  font-size: var(--text-sm);
}
.button-secondary { 
  color: var(--color1);
  border: 2px solid var(--color1);
  padding: var(--space-2) var(--space-3);
  border-radius: 0.5rem;
  font-size: var(--text-sm);
}
`;
    setGeneratedCSS(css);
  }, [s4BrandColors, s4ActiveColorPreset, s4ActiveLayoutPreset, s4ActiveHelpers, s4LayoutSettings]);
  
  return (
    <div className="flex h-full bg-background text-foreground">
      {/* Left Sidebar - Navigation */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#b25977] to-[#b8874d] rounded-lg flex items-center justify-center text-white font-bold">
              S4
            </div>
            <div>
              <h1 className="font-semibold">Studio4</h1>
              <p className="text-xs text-muted-foreground">Visual Theme Builder</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => setActiveSection('colors')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
              activeSection === 'colors'
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
            Colors
          </button>
          <button 
            onClick={() => setActiveSection('layouts')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
              activeSection === 'layouts'
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            Layouts
          </button>
        </nav>
        
        <div className="p-4 border-t border-border">
          <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90">
            Export Theme
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Control Panel */}
        <div className="w-96 bg-card border-r border-border overflow-y-auto">
          {activeSection === 'colors' && (
            <ColorControls 
              brandColors={s4BrandColors}
              setBrandColors={setS4BrandColors}
              updateBrandColor={updateS4BrandColor}
              activePreset={s4ActiveColorPreset}
              setActivePreset={setS4ActiveColorPreset}
            />
          )}
          {activeSection === 'layouts' && (
            <LayoutControls
              activeLayoutPreset={s4ActiveLayoutPreset}
              setActiveLayoutPreset={setS4ActiveLayoutPreset}
              layoutSettings={s4LayoutSettings}
              updateLayoutSetting={updateS4LayoutSetting}
            />
          )}
        </div>
        
        {/* Live Preview */}
        <div className="flex-1 bg-muted/30 p-8 overflow-y-auto">
          <LivePreview 
            css={generatedCSS}
            brandColors={s4BrandColors}
            colorPreset={s4ActiveColorPreset}
            layoutPreset={s4ActiveLayoutPreset}
          />
        </div>
      </div>
    </div>
  );
}