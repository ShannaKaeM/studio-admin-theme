import React, { useState, useEffect } from 'react';
import { useThemeConfig } from '../hooks/useThemeConfig.js';

export function ColorBook() {
  const { 
    config, 
    updateBaseColor, 
    createColorPreset, 
    deleteColorPreset
  } = useThemeConfig();
  
  // Extract HSL values from base color
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

  const baseColorHSL = extractHSL(config.colorBook?.baseColor || 'hsl(0, 0%, 50%)');
  
  const [hue, setHue] = useState(baseColorHSL.hue);
  const [saturation, setSaturation] = useState(baseColorHSL.saturation);
  const [lightness, setLightness] = useState(baseColorHSL.lightness);
  const [alpha, setAlpha] = useState(100);
  const [presetName, setPresetName] = useState('');

  // Update base color when sliders change
  useEffect(() => {
    const newBaseColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    updateBaseColor(newBaseColor);
  }, [hue, saturation, lightness, updateBaseColor]);

  // Note: clearOldColorVariations removed to preserve custom scopes

  const currentBaseColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const currentPresetColor = `hsl(${hue}, ${saturation}%, ${lightness}%, ${alpha / 100})`;

  const handleCreatePreset = () => {
    if (presetName.trim()) {
      const hslaAdjustments = {
        hueAdjustment: hue - baseColorHSL.hue,
        saturationAdjustment: saturation - baseColorHSL.saturation,
        lightnessAdjustment: lightness - baseColorHSL.lightness,
        alpha: alpha / 100
      };
      createColorPreset(presetName.trim(), hslaAdjustments);
      setPresetName('');
    }
  };

  const colorPresets = config.colorBook?.presets || {};

  return (
    <div className="color-creator-grid">
      {/* Left Sidebar */}
      <div className="color-creator-sidebar">
        {/* Header */}
        <div className="color-creator-sidebar-header">
          <h2>Color Book</h2>
          <p>Create your base color and HSLA presets</p>
        </div>

        {/* Base Color Section */}
        <div className="color-creator-section">
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: '600', 
            color: 'var(--ui-neutral-200)', 
            margin: '0 0 1rem 0' 
          }}>
            Base Color
          </h3>
          
          <div className="color-preview" style={{ 
            backgroundColor: currentBaseColor,
            marginBottom: '1rem'
          }} />
          
          <div className="color-preview-text">
            {currentBaseColor}
          </div>
        </div>

        {/* HSLA Sliders */}
        <div className="color-creator-section">
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: '600', 
            color: 'var(--ui-neutral-200)', 
            margin: '0 0 1rem 0' 
          }}>
            HSLA Adjustments
          </h3>
          
          <div className="slider-group">
            <div className="slider-label">
              <span>Hue</span>
              <span>{hue}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="359"
              value={hue}
              onChange={(e) => setHue(parseInt(e.target.value))}
              className="color-slider"
            />
          </div>

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

        {/* Preset Creation */}
        <div className="color-creator-section">
          <h3 style={{ 
            fontSize: '1rem', 
            fontWeight: '600', 
            color: 'var(--ui-neutral-200)', 
            margin: '0 0 1rem 0' 
          }}>
            Save Preset
          </h3>
          
          <div className="color-preview" style={{ 
            backgroundColor: currentPresetColor,
            marginBottom: '0.5rem'
          }} />
          
          <div className="color-preview-text" style={{ marginBottom: '1rem' }}>
            {currentPresetColor}
          </div>
          
          <input
            type="text"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            placeholder="e.g., Primary, Secondary, Accent"
            style={{
              width: '100%',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              background: 'var(--ui-base-800)',
              color: 'var(--ui-neutral-100)',
              border: '1px solid var(--ui-base-600)',
              borderRadius: 'var(--ui-border-radius)'
            }}
          />
          
          <button
            onClick={handleCreatePreset}
            disabled={!presetName.trim()}
            className="ui-button ui-button--primary"
            style={{ 
              width: '100%',
              opacity: presetName.trim() ? '1' : '0.5',
              cursor: presetName.trim() ? 'pointer' : 'not-allowed'
            }}
          >
            Save Preset
          </button>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="color-variations-area">
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          color: 'var(--ui-neutral-100)', 
          margin: '0 0 1.5rem 0' 
        }}>
          Color Presets
        </h2>
        
        {Object.keys(colorPresets).length === 0 ? (
          <div className="empty-state">
            <p>No color presets yet. Create your first preset using the controls on the left.</p>
          </div>
        ) : (
          <div className="color-variations-grid">
            {Object.entries(colorPresets).map(([presetName, adjustments]) => {
              const presetColor = `hsl(${baseColorHSL.hue + (adjustments.hueAdjustment || 0)}, ${baseColorHSL.saturation + (adjustments.saturationAdjustment || 0)}%, ${baseColorHSL.lightness + (adjustments.lightnessAdjustment || 0)}%, ${adjustments.alpha || 1})`;
              
              return (
                <div key={presetName} className="color-variation-card">
                  <div 
                    className="color-variation-swatch" 
                    style={{ backgroundColor: presetColor }}
                  />
                  <div className="color-variation-name">{presetName}</div>
                  <div className="color-variation-value">{presetColor}</div>
                  <button
                    onClick={() => deleteColorPreset(presetName)}
                    className="color-variation-delete"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}