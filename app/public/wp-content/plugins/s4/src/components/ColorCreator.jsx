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
    <div className="one" style={{
      '--one-display': 'grid',
      '--one-grid-template-columns': '400px 1fr',
      '--one-height': '100%',
      '--one-background': 'var(--color3-950)'
    }}>
      {/* Left Sidebar - Color Editor */}
      <div className="one" style={{
        '--one-background': 'var(--color3-900)',
        '--one-border-right': '1px solid var(--color3-700)',
        '--one-display': 'flex',
        '--one-flex-direction': 'column',
        '--one-height': '100%'
      }}>
        {/* Sidebar Header */}
        <div className="one" style={{
          '--one-padding': '1rem',
          '--one-border-bottom': '1px solid var(--color3-700)',
          '--one-background': 'var(--color3-800)'
        }}>
          <h2 className="one" style={{
            '--one-font-size': '1.125rem',
            '--one-font-weight': '600',
            '--one-color': 'var(--color4-100)',
            '--one-margin-bottom': '0.5rem'
          }}>
            Color Creator
          </h2>
          <p className="one" style={{
            '--one-font-size': '0.75rem',
            '--one-color': 'var(--color4-400)'
          }}>
            Create custom color variations
          </p>
        </div>

        {/* Core Color Selector */}
        <div className="one" style={{
          '--one-padding': '1rem',
          '--one-border-bottom': '1px solid var(--color3-700)'
        }}>
          <label className="one" style={{
            '--one-display': 'block',
            '--one-font-size': '0.875rem',
            '--one-font-weight': '500',
            '--one-color': 'var(--color4-200)',
            '--one-margin-bottom': '0.5rem'
          }}>
            Base Core Color
          </label>
          <select
            value={selectedCoreColor}
            onChange={(e) => {
              setSelectedCoreColor(e.target.value);
              loadCoreColorDefaults(e.target.value);
            }}
            className="one input-field"
            style={{
              '--one-width': '100%'
            }}
          >
            {Object.entries(coreColors).map(([key, color]) => (
              <option key={key} value={key}>{color.name}</option>
            ))}
          </select>
        </div>

        {/* Color Preview */}
        <div className="one" style={{
          '--one-padding': '1rem',
          '--one-border-bottom': '1px solid var(--color3-700)'
        }}>
          <label className="one" style={{
            '--one-display': 'block',
            '--one-font-size': '0.875rem',
            '--one-font-weight': '500',
            '--one-color': 'var(--color4-200)',
            '--one-margin-bottom': '0.5rem'
          }}>
            Color Preview
          </label>
          <div className="one" style={{
            '--one-width': '100%',
            '--one-height': '80px',
            '--one-background': currentHslColor,
            '--one-border': '1px solid var(--color3-600)',
            '--one-border-radius': '0.375rem',
            '--one-margin-bottom': '0.5rem'
          }}></div>
          <div className="one" style={{
            '--one-font-family': 'monospace',
            '--one-font-size': '0.75rem',
            '--one-color': 'var(--color4-400)',
            '--one-text-align': 'center'
          }}>
            {currentHslColor}
          </div>
        </div>

        {/* HSLA Sliders */}
        <div className="one" style={{
          '--one-padding': '1rem',
          '--one-border-bottom': '1px solid var(--color3-700)',
          '--one-flex': '1'
        }}>
          <h3 className="one" style={{
            '--one-font-size': '0.875rem',
            '--one-font-weight': '500',
            '--one-color': 'var(--color4-200)',
            '--one-margin-bottom': '1rem'
          }}>
            HSLA Adjustments
          </h3>

          {/* Hue Slider */}
          <div className="one" style={{'--one-margin-bottom': '1rem'}}>
            <label className="one" style={{
              '--one-display': 'flex',
              '--one-justify-content': 'space-between',
              '--one-font-size': '0.75rem',
              '--one-color': 'var(--color4-300)',
              '--one-margin-bottom': '0.25rem'
            }}>
              <span>Hue</span>
              <span>{hue}°</span>
            </label>
            <input
              type="range"
              min="0"
              max="360"
              value={hue}
              onChange={(e) => setHue(parseInt(e.target.value))}
              className="one"
              style={{
                '--one-width': '100%',
                '--one-height': '20px',
                '--one-background': 'var(--color3-700)',
                '--one-border-radius': '10px',
                '--one-cursor': 'pointer'
              }}
            />
          </div>

          {/* Saturation Slider */}
          <div className="one" style={{'--one-margin-bottom': '1rem'}}>
            <label className="one" style={{
              '--one-display': 'flex',
              '--one-justify-content': 'space-between',
              '--one-font-size': '0.75rem',
              '--one-color': 'var(--color4-300)',
              '--one-margin-bottom': '0.25rem'
            }}>
              <span>Saturation</span>
              <span>{saturation}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={saturation}
              onChange={(e) => setSaturation(parseInt(e.target.value))}
              className="one"
              style={{
                '--one-width': '100%',
                '--one-height': '20px',
                '--one-background': 'var(--color3-700)',
                '--one-border-radius': '10px',
                '--one-cursor': 'pointer'
              }}
            />
          </div>

          {/* Lightness Slider */}
          <div className="one" style={{'--one-margin-bottom': '1rem'}}>
            <label className="one" style={{
              '--one-display': 'flex',
              '--one-justify-content': 'space-between',
              '--one-font-size': '0.75rem',
              '--one-color': 'var(--color4-300)',
              '--one-margin-bottom': '0.25rem'
            }}>
              <span>Lightness</span>
              <span>{lightness}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={lightness}
              onChange={(e) => setLightness(parseInt(e.target.value))}
              className="one"
              style={{
                '--one-width': '100%',
                '--one-height': '20px',
                '--one-background': 'var(--color3-700)',
                '--one-border-radius': '10px',
                '--one-cursor': 'pointer'
              }}
            />
          </div>

          {/* Alpha Slider */}
          <div className="one" style={{'--one-margin-bottom': '1rem'}}>
            <label className="one" style={{
              '--one-display': 'flex',
              '--one-justify-content': 'space-between',
              '--one-font-size': '0.75rem',
              '--one-color': 'var(--color4-300)',
              '--one-margin-bottom': '0.25rem'
            }}>
              <span>Alpha</span>
              <span>{alpha}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={alpha}
              onChange={(e) => setAlpha(parseInt(e.target.value))}
              className="one"
              style={{
                '--one-width': '100%',
                '--one-height': '20px',
                '--one-background': 'var(--color3-700)',
                '--one-border-radius': '10px',
                '--one-cursor': 'pointer'
              }}
            />
          </div>
        </div>

        {/* Save Section */}
        <div className="one" style={{
          '--one-padding': '1rem'
        }}>
          <label className="one" style={{
            '--one-display': 'block',
            '--one-font-size': '0.875rem',
            '--one-font-weight': '500',
            '--one-color': 'var(--color4-200)',
            '--one-margin-bottom': '0.5rem'
          }}>
            Color Name
          </label>
          <input
            type="text"
            value={colorName}
            onChange={(e) => setColorName(e.target.value)}
            placeholder="e.g., Dark Primary, Light Accent..."
            className="one input-field"
            style={{
              '--one-width': '100%',
              '--one-margin-bottom': '1rem'
            }}
          />
          <button
            onClick={handleSaveColor}
            disabled={!colorName.trim()}
            className="one button-primary"
            style={{
              '--one-width': '100%',
              '--one-cursor': colorName.trim() ? 'pointer' : 'not-allowed',
              '--one-opacity': colorName.trim() ? '1' : '0.5'
            }}
          >
            Save Color
          </button>
        </div>
      </div>

      {/* Right Area - Color Swatches Grid */}
      <div className="one" style={{
        '--one-padding': '1.5rem',
        '--one-overflow-y': 'auto',
        '--one-background': 'var(--color3-950)'
      }}>
        <h1 className="one" style={{
          '--one-font-size': '1.5rem',
          '--one-font-weight': '600',
          '--one-color': 'var(--color4-100)',
          '--one-margin-bottom': '1.5rem'
        }}>
          Color Variations
        </h1>

        {/* Grid for each core color */}
        {Object.entries(coreColors).map(([coreKey, coreColor]) => (
          <div key={coreKey} className="one" style={{
            '--one-margin-bottom': '2rem'
          }}>
            <h2 className="one" style={{
              '--one-font-size': '1.125rem',
              '--one-font-weight': '500',
              '--one-color': 'var(--color4-200)',
              '--one-margin-bottom': '1rem'
            }}>
              {coreColor.name} Variations
            </h2>
            
            <div className="one" style={{
              '--one-display': 'grid',
              '--one-grid-template-columns': 'repeat(4, 1fr)',
              '--one-gap': '1rem'
            }}>
              {/* Only show custom variations - no default colors */}
              {Object.entries(colorVariations[coreKey] || {}).length === 0 ? (
                <div className="one" style={{
                  '--one-grid-column': '1 / -1',
                  '--one-text-align': 'center',
                  '--one-padding': '2rem',
                  '--one-color': 'var(--color4-500)',
                  '--one-font-style': 'italic'
                }}>
                  No custom variations yet. Create some using the editor on the left.
                </div>
              ) : (
                Object.entries(colorVariations[coreKey] || {}).map(([varName, varColor]) => (
                <div key={varName} className="one" style={{
                  '--one-background': 'var(--color3-800)',
                  '--one-border': '1px solid var(--color3-600)',
                  '--one-border-radius': '0.5rem',
                  '--one-padding': '1rem',
                  '--one-text-align': 'center',
                  '--one-position': 'relative'
                }}>
                  <div className="one" style={{
                    '--one-width': '100%',
                    '--one-height': '60px',
                    '--one-background': varColor,
                    '--one-border': '1px solid var(--color3-500)',
                    '--one-border-radius': '0.375rem',
                    '--one-margin-bottom': '0.5rem'
                  }}></div>
                  <div className="one" style={{
                    '--one-font-size': '0.75rem',
                    '--one-font-weight': '500',
                    '--one-color': 'var(--color4-200)',
                    '--one-margin-bottom': '0.25rem'
                  }}>
                    {varName}
                  </div>
                  <div className="one" style={{
                    '--one-font-size': '0.625rem',
                    '--one-color': 'var(--color4-400)',
                    '--one-font-family': 'monospace'
                  }}>
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
                    className="one"
                    style={{
                      '--one-position': 'absolute',
                      '--one-top': '0.5rem',
                      '--one-right': '0.5rem',
                      '--one-width': '20px',
                      '--one-height': '20px',
                      '--one-background': 'var(--color1-600)',
                      '--one-border': 'none',
                      '--one-border-radius': '50%',
                      '--one-color': 'var(--color4-50)',
                      '--one-font-size': '0.75rem',
                      '--one-cursor': 'pointer',
                      '--one-display': 'flex',
                      '--one-align-items': 'center',
                      '--one-justify-content': 'center'
                    }}
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