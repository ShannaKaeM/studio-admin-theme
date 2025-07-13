import React, { useState } from 'react';
import { useThemeConfig } from '../hooks/useThemeConfig.js';

export function BaseColorEditor() {
  const { config, updateBaseColors } = useThemeConfig();
  
  // Extract base colors from config (500 level is the base color)
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

  const color1Base = extractHSL(config.colors.brand.color1['500']);
  const color2Base = extractHSL(config.colors.brand.color2['500']);
  const color3Base = extractHSL(config.colors.brand.color3['500']);
  const color4Base = extractHSL(config.colors.brand.color4['500']);

  const [hue1, setHue1] = useState(color1Base.hue);
  const [saturation1, setSaturation1] = useState(color1Base.saturation);
  const [lightness1, setLightness1] = useState(color1Base.lightness);

  const [hue2, setHue2] = useState(color2Base.hue);
  const [saturation2, setSaturation2] = useState(color2Base.saturation);
  const [lightness2, setLightness2] = useState(color2Base.lightness);

  const [hue3, setHue3] = useState(color3Base.hue);
  const [saturation3, setSaturation3] = useState(color3Base.saturation);
  const [lightness3, setLightness3] = useState(color3Base.lightness);

  const [hue4, setHue4] = useState(color4Base.hue);
  const [saturation4, setSaturation4] = useState(color4Base.saturation);
  const [lightness4, setLightness4] = useState(color4Base.lightness);

  const colorDefinitions = [
    {
      number: "color1",
      label: "Primary Color",
      description: "Best for your primary or pop color - buttons, links, highlights",
      hue: hue1,
      saturation: saturation1,
      lightness: lightness1,
      setHue: setHue1,
      setSaturation: setSaturation1,
      setLightness: setLightness1
    },
    {
      number: "color2", 
      label: "Secondary Color",
      description: "Best for secondary elements - accents, secondary buttons, icons",
      hue: hue2,
      saturation: saturation2,
      lightness: lightness2,
      setHue: setHue2,
      setSaturation: setSaturation2,
      setLightness: setLightness2
    },
    {
      number: "color3",
      label: "Neutral Color", 
      description: "Best for neutral elements - text, borders, backgrounds, UI elements",
      hue: hue3,
      saturation: saturation3,
      lightness: lightness3,
      setHue: setHue3,
      setSaturation: setSaturation3,
      setLightness: setLightness3
    },
    {
      number: "color4",
      label: "Base Color",
      description: "Best for base backgrounds - page backgrounds, cards, clean surfaces",
      hue: hue4,
      saturation: saturation4,
      lightness: lightness4,
      setHue: setHue4,
      setSaturation: setSaturation4,
      setLightness: setLightness4
    }
  ];

  const handleSaveColors = () => {
    const newBaseColors = {
      color1: `hsl(${hue1}, ${saturation1}%, ${lightness1}%)`,
      color2: `hsl(${hue2}, ${saturation2}%, ${lightness2}%)`, 
      color3: `hsl(${hue3}, ${saturation3}%, ${lightness3}%)`,
      color4: `hsl(${hue4}, ${saturation4}%, ${lightness4}%)`
    };
    
    updateBaseColors(newBaseColors);
    alert('Base colors updated! All components will inherit these new colors.');
  };

  return (
    <div className="base-color-editor-grid">
      {/* Left Sidebar */}
      <div className="base-color-editor-sidebar">
        {/* Sidebar Header */}
        <div className="base-color-editor-sidebar-header">
          <h2>Base Color System</h2>
          <p>Define your 4 core colors that drive everything</p>
        </div>

        {/* Save Button */}
        <div className="base-color-save-section">
          <button
            onClick={handleSaveColors}
            className="ui-button ui-button--primary"
            style={{ width: '100%' }}
          >
            Save Base Colors
          </button>
        </div>

        {/* Info Section */}
        <div className="base-color-info-section">
          <h3>How Base Colors Work</h3>
          <div className="base-color-info-list">
            <div className="base-color-info-item">
              <strong>color1-4</strong> are your foundation colors that cascade to all components.
            </div>
            <div className="base-color-info-item">
              Each generates a full scale (50-950) automatically for light/dark variations.
            </div>
            <div className="base-color-info-item">
              When you use presets later, elements will map correctly to their intended purpose.
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="base-color-editor-area">
        <h1 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          color: 'var(--ui-neutral-100)', 
          margin: '0 0 1.5rem 0' 
        }}>
          Foundation Color System
        </h1>

        <div className="base-color-grid">
          {colorDefinitions.map((colorDef) => (
            <ColorEditor
              key={colorDef.number}
              {...colorDef}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ColorEditor({ number, label, description, hue, saturation, lightness, setHue, setSaturation, setLightness }) {
  const currentColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  return (
    <div className="color-editor-card">
      <div className="color-editor-layout">
        {/* Color Preview */}
        <div className="color-editor-preview">
          <div 
            className="color-editor-swatch" 
            style={{ background: currentColor }}
          ></div>
          <div className="color-editor-variable">
            --{number}
          </div>
        </div>

        {/* Controls & Info */}
        <div className="color-editor-controls">
          {/* Header */}
          <div className="color-editor-header">
            <h3>{label}</h3>
            <p>{description}</p>
          </div>

          {/* HSL Controls */}
          <div className="color-editor-sliders">
            {/* Hue */}
            <div className="color-slider-group">
              <div className="color-slider-label">
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

            {/* Saturation */}
            <div className="color-slider-group">
              <div className="color-slider-label">
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

            {/* Lightness */}
            <div className="color-slider-group">
              <div className="color-slider-label">
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
          </div>

          {/* Current Values */}
          <div className="color-editor-value">
            {currentColor}
          </div>
        </div>
      </div>
    </div>
  );
}