import React, { useState, useEffect } from 'react';

// Helper function to convert hex to HSL
const hexToHSL = (hex) => {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  
  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

// Helper to parse HSL string
const parseHSL = (hslString) => {
  const match = hslString.match(/hsl\((\d+),?\s*(\d+)%,?\s*(\d+)%\)/);
  if (match) {
    return {
      h: parseInt(match[1]),
      s: parseInt(match[2]),
      l: parseInt(match[3])
    };
  }
  return { h: 0, s: 0, l: 50 };
};

export default function ColorControls({ brandColors, setBrandColors, updateBrandColor, activePreset, setActivePreset }) {
  const [expandedColor, setExpandedColor] = useState('color1');
  
  const updateColor = (colorKey, value) => {
    // Use the Zustand store update function
    updateBrandColor(colorKey, value);
  };
  
  return (
    <div className="p-6">
      <div className="sticky top-0 bg-card z-10 pb-4 mb-4 border-b border-border">
        <div className="flex gap-1">
          <button className="flex-1 px-3 py-2 bg-muted text-foreground rounded-md text-sm font-medium">
            Brand Colors
          </button>
          <button className="flex-1 px-3 py-2 text-muted-foreground hover:bg-muted rounded-md text-sm font-medium">
            Theme Mapping
          </button>
          <button className="flex-1 px-3 py-2 text-muted-foreground hover:bg-muted rounded-md text-sm font-medium">
            Presets
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Primary Color */}
        <ColorCard
          label="Primary"
          colorKey="color1"
          color={brandColors.color1}
          expanded={expandedColor === 'color1'}
          onExpand={() => setExpandedColor('color1')}
          onColorChange={(value) => updateColor('color1', value)}
        />
        
        {/* Secondary Color */}
        <ColorCard
          label="Secondary"
          colorKey="color2"
          color={brandColors.color2}
          expanded={expandedColor === 'color2'}
          onExpand={() => setExpandedColor('color2')}
          onColorChange={(value) => updateColor('color2', value)}
        />
        
        {/* Neutral Dark */}
        <ColorCard
          label="Neutral Dark"
          colorKey="color3"
          color={brandColors.color3}
          expanded={expandedColor === 'color3'}
          onExpand={() => setExpandedColor('color3')}
          onColorChange={(value) => updateColor('color3', value)}
        />
        
        {/* Base Light */}
        <ColorCard
          label="Base Light"
          colorKey="color4"
          color={brandColors.color4}
          expanded={expandedColor === 'color4'}
          onExpand={() => setExpandedColor('color4')}
          onColorChange={(value) => updateColor('color4', value)}
        />
        
        {/* Add Color Button */}
        <button className="w-full border-2 border-dashed border-border rounded-xl p-8 text-muted-foreground hover:border-muted-foreground hover:text-foreground transition-colors">
          <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="text-sm font-medium">Add Brand Color</span>
        </button>
      </div>
      
      {/* Preset Selector */}
      <div className="pt-6 mt-6 border-t border-border">
        <h3 className="text-sm font-medium mb-3">Active Color Preset</h3>
        <select 
          value={activePreset}
          onChange={(e) => setActivePreset(e.target.value)}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm"
        >
          <option value="default-colors">Default Colors</option>
          <option value="emphasis-colors">Emphasis Colors</option>
          <option value="dark-theme">Dark Theme</option>
        </select>
      </div>
    </div>
  );
}

function ColorCard({ label, colorKey, color, expanded, onExpand, onColorChange }) {
  // Initialize HSL values from the color prop
  const getInitialHSL = () => {
    if (color.startsWith('#')) {
      return hexToHSL(color);
    } else if (color.startsWith('hsl')) {
      return parseHSL(color);
    }
    return { h: 0, s: 0, l: 50 };
  };
  
  const initialHSL = getInitialHSL();
  const [hue, setHue] = useState(initialHSL.h);
  const [saturation, setSaturation] = useState(initialHSL.s);
  const [lightness, setLightness] = useState(initialHSL.l);
  
  // Update local state when color prop changes
  useEffect(() => {
    const newHSL = getInitialHSL();
    setHue(newHSL.h);
    setSaturation(newHSL.s);
    setLightness(newHSL.l);
  }, [color]);
  
  // Update color when sliders change
  const updateColor = (h, s, l) => {
    const newColor = `hsl(${h}, ${s}%, ${l}%)`;
    onColorChange(newColor);
  };
  
  return (
    <div className="bg-muted rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <input 
          type="text" 
          value={label}
          className="text-sm font-medium bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
          readOnly
        />
        <button className="text-muted-foreground hover:text-foreground">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      {/* Color Preview */}
      <div 
        className="h-24 rounded-lg shadow-inner cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={onExpand}
      />
      
      {expanded ? (
        <>
          {/* HSL Sliders */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground w-12">HUE</span>
              <input 
                type="range" 
                value={hue} 
                max="360" 
                onChange={(e) => {
                  const newHue = e.target.value;
                  setHue(newHue);
                  updateColor(newHue, saturation, lightness);
                }}
                className="flex-1 h-1.5"
              />
              <span className="text-xs font-mono w-10 text-right">{hue}°</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground w-12">SAT</span>
              <input 
                type="range" 
                value={saturation} 
                max="100"
                onChange={(e) => {
                  const newSat = e.target.value;
                  setSaturation(newSat);
                  updateColor(hue, newSat, lightness);
                }}
                className="flex-1 h-1.5"
              />
              <span className="text-xs font-mono w-10 text-right">{saturation}%</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground w-12">LIGHT</span>
              <input 
                type="range" 
                value={lightness} 
                max="100"
                onChange={(e) => {
                  const newLight = e.target.value;
                  setLightness(newLight);
                  updateColor(hue, saturation, newLight);
                }}
                className="flex-1 h-1.5"
              />
              <span className="text-xs font-mono w-10 text-right">{lightness}%</span>
            </div>
          </div>
          
          {/* Color Values */}
          <div className="flex gap-2 text-xs">
            <span className="px-2 py-1 bg-background rounded font-mono">{color}</span>
            <span className="px-2 py-1 bg-background rounded font-mono">
              HSL({hue}, {saturation}%, {lightness}%)
            </span>
          </div>
        </>
      ) : (
        <button 
          onClick={onExpand}
          className="w-full text-left text-xs text-muted-foreground hover:text-foreground"
        >
          Click to edit →
        </button>
      )}
    </div>
  );
}