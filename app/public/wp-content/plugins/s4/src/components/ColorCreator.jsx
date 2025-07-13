import React, { useState } from 'react';
import { useThemeConfig } from '../hooks/useThemeConfig.js';

export function ColorCreator() {
  const { 
    config, 
    updateColorVariations = () => {}, 
    createColorVariation = () => {}, 
    deleteColorVariation = () => {} 
  } = useThemeConfig();
  const [selectedCoreColor, setSelectedCoreColor] = useState('color1');
  const [hue, setHue] = useState(337);
  const [saturation, setSaturation] = useState(35);
  const [lightness, setLightness] = useState(52);
  const [alpha, setAlpha] = useState(100);
  const [colorName, setColorName] = useState('');

  // Extract base colors dynamically from config (500 level is the base)
  const extractHSL = (hslString) => {
    const match = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (match) {
      return {
        hue: parseInt(match[1]),
        saturation: parseInt(match[2]),
        lightness: parseInt(match[3])
      };
    }
    return { hue: 0, saturation: 0, lightness: 50 };
  };

  const coreColors = {
    color1: { 
      name: 'Color 1', 
      default: config.colors.brand.color1['500'],
      hsl: extractHSL(config.colors.brand.color1['500'])
    },
    color2: { 
      name: 'Color 2', 
      default: config.colors.brand.color2['500'],
      hsl: extractHSL(config.colors.brand.color2['500'])
    },
    color3: { 
      name: 'Color 3', 
      default: config.colors.brand.color3['500'],
      hsl: extractHSL(config.colors.brand.color3['500'])
    },
    color4: { 
      name: 'Color 4', 
      default: config.colors.brand.color4['500'],
      hsl: extractHSL(config.colors.brand.color4['500'])
    }
  };

  const currentHslColor = `hsl(${hue}, ${saturation}%, ${lightness}%, ${alpha / 100})`;
  const colorVariations = config?.colorVariations || {};

  const handleSaveColor = () => {
    if (!colorName.trim()) {
      alert('Please enter a name for this color');
      return;
    }

    const cleanName = colorName.trim();
    createColorVariation(selectedCoreColor, cleanName, currentHslColor);
    setColorName('');
    alert(`Color "${cleanName}" saved!`);
  };

  const loadCoreColorDefaults = (coreColorKey) => {
    const coreColor = coreColors[coreColorKey];
    const hslValues = coreColor.hsl;
    setHue(hslValues.hue);
    setSaturation(hslValues.saturation);
    setLightness(hslValues.lightness);
    setAlpha(100);
  };

  return (
    <div className="color-creator-grid">
      {/* Left Sidebar - Color Editor */}
      <div className="color-creator-sidebar">
        {/* Sidebar Header */}
        <div className="color-creator-sidebar-header">
          <h2>Color Creator</h2>
          <p>Create custom color variations</p>
        </div>

        {/* Core Color Selector */}
        <div className="color-creator-section">
          <label>Base Core Color</label>
          <select
            value={selectedCoreColor}
            onChange={(e) => {
              setSelectedCoreColor(e.target.value);
              loadCoreColorDefaults(e.target.value);
            }}
          >
            {Object.entries(coreColors).map(([key, color]) => (
              <option key={key} value={key}>{color.name}</option>
            ))}
          </select>
        </div>

        {/* Color Preview */}
        <div className="color-creator-section">
          <label>Color Preview</label>
          <div 
            className="color-preview" 
            style={{ background: currentHslColor }}
          ></div>
          <div className="color-preview-text">
            {currentHslColor}
          </div>
        </div>

        {/* HSLA Sliders */}
        <div className="color-creator-flex-section">
          <h3>HSLA Adjustments</h3>

          {/* Hue Slider */}
          <div className="slider-group">
            <div className="slider-label">
              <span>Hue</span>
              <span>{hue}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={(e) => setHue(parseInt(e.target.value))}
              className="color-slider"
            />
          </div>

          {/* Saturation Slider */}
          <div className="slider-group">
            <div className="slider-label">
              <span>Saturation</span>
              <span>{saturation}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={saturation}
              onChange={(e) => setSaturation(parseInt(e.target.value))}
              className="color-slider"
            />
          </div>

          {/* Lightness Slider */}
          <div className="slider-group">
            <div className="slider-label">
              <span>Lightness</span>
              <span>{lightness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={lightness}
              onChange={(e) => setLightness(parseInt(e.target.value))}
              className="color-slider"
            />
          </div>

          {/* Alpha Slider */}
          <div className="slider-group">
            <div className="slider-label">
              <span>Alpha</span>
              <span>{alpha}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={alpha}
              onChange={(e) => setAlpha(parseInt(e.target.value))}
              className="color-slider"
            />
          </div>
        </div>

        {/* Save Section */}
        <div className="color-creator-section">
          <label>Color Name</label>
          <input
            type="text"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            placeholder="e.g., Dark Primary, Light Accent..."
            style={{ width: '100%', marginBottom: '1rem' }}
          />
          <button
            onClick={handleSaveColor}
            disabled={!colorName.trim()}
            className="ui-button ui-button--primary"
            style={{ 
              width: '100%',
              cursor: colorName.trim() ? 'pointer' : 'not-allowed',
              opacity: colorName.trim() ? '1' : '0.5'
            }}
          >
            Save Color
          </button>
        </div>
      </div>

      {/* Right Area - Color Swatches Grid */}
      <div className="color-variations-area">
        <h1>Color Variations</h1>

        {/* Grid for each core color */}
        {Object.entries(coreColors).map(([coreKey, coreColor]) => (
          <div key={coreKey} style={{ marginBottom: '2rem' }}>
            <h2>{coreColor.name} Variations</h2>
            
            <div className="color-variations-grid">
              {/* Only show custom variations - no default colors */}
              {Object.entries(colorVariations[coreKey] || {}).length === 0 ? (
                <div className="empty-state">
                  No custom variations yet. Create some using the editor on the left.
                </div>
              ) : (
                Object.entries(colorVariations[coreKey] || {}).map(([varName, varColor]) => (
                <div key={varName} className="color-variation-card">
                  <div 
                    className="color-variation-swatch" 
                    style={{ background: varColor }}
                  ></div>
                  <div className="color-variation-name">
                    {varName}
                  </div>
                  <div className="color-variation-value">
                    {varColor}
                  </div>
                  
                  {/* Delete button */}
                  <button
                    onClick={() => {
                      const confirmed = confirm(`Delete "${varName}"?`);
                      if (confirmed) {
                        deleteColorVariation(coreKey, varName);
                      }
                    }}
                    className="color-variation-delete"
                  >
                    ✕
                  </button>
                </div>
              )))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}