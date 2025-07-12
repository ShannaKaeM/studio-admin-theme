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
    <div className="one" style={{
      '--one-display': 'grid',
      '--one-grid-template-columns': '400px 1fr',
      '--one-height': '100%',
      '--one-background': 'var(--color3-950)'
    }}>
      {/* Left Sidebar */}
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
            Base Color System
          </h2>
          <p className="one" style={{
            '--one-font-size': '0.75rem',
            '--one-color': 'var(--color4-400)'
          }}>
            Define your 4 core colors that drive everything
          </p>
        </div>

        {/* Save Button */}
        <div className="one" style={{
          '--one-padding': '1rem',
          '--one-border-bottom': '1px solid var(--color3-700)'
        }}>
          <button
            onClick={handleSaveColors}
            className="one button-primary"
            style={{
              '--one-width': '100%',
              '--one-cursor': 'pointer'
            }}
          >
            Save Base Colors
          </button>
        </div>

        {/* Info Section */}
        <div className="one" style={{
          '--one-padding': '1rem',
          '--one-flex': '1'
        }}>
          <h3 className="one" style={{
            '--one-font-size': '0.875rem',
            '--one-font-weight': '600',
            '--one-color': 'var(--color4-200)',
            '--one-margin-bottom': '0.75rem'
          }}>
            How Base Colors Work
          </h3>
          <div className="one" style={{
            '--one-display': 'flex',
            '--one-flex-direction': 'column',
            '--one-gap': '0.75rem'
          }}>
            <div className="one" style={{
              '--one-font-size': '0.75rem',
              '--one-color': 'var(--color4-400)',
              '--one-line-height': '1.4'
            }}>
              <strong className="one" style={{'--one-color': 'var(--color4-300)'}}>color1-4</strong> are your foundation colors that cascade to all components.
            </div>
            <div className="one" style={{
              '--one-font-size': '0.75rem',
              '--one-color': 'var(--color4-400)',
              '--one-line-height': '1.4'
            }}>
              Each generates a full scale (50-950) automatically for light/dark variations.
            </div>
            <div className="one" style={{
              '--one-font-size': '0.75rem',
              '--one-color': 'var(--color4-400)',
              '--one-line-height': '1.4'
            }}>
              When you use presets later, elements will map correctly to their intended purpose.
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
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
          Foundation Color System
        </h1>

        <div className="one" style={{
          '--one-display': 'flex',
          '--one-flex-direction': 'column',
          '--one-gap': '2rem'
        }}>
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
    <div className="one" style={{
      '--one-background': 'var(--color3-900)',
      '--one-border': '1px solid var(--color3-700)',
      '--one-padding': '1.5rem',
      '--one-border-radius': '0.5rem'
    }}>
      <div className="one" style={{
        '--one-display': 'flex',
        '--one-align-items': 'flex-start',
        '--one-gap': '1.5rem'
      }}>
        {/* Color Preview */}
        <div className="one" style={{
          '--one-display': 'flex',
          '--one-flex-direction': 'column',
          '--one-align-items': 'center',
          '--one-gap': '0.75rem'
        }}>
          <div className="one" style={{
            '--one-width': '120px',
            '--one-height': '120px',
            '--one-background': currentColor,
            '--one-border': '1px solid var(--color3-600)',
            '--one-border-radius': '0.5rem'
          }}></div>
          <div className="one" style={{
            '--one-font-family': 'monospace',
            '--one-font-size': '0.875rem',
            '--one-color': 'var(--color4-400)',
            '--one-text-align': 'center',
            '--one-padding': '0.5rem',
            '--one-background': 'var(--color3-800)',
            '--one-border-radius': '0.25rem',
            '--one-border': '1px solid var(--color3-600)',
            '--one-user-select': 'text'
          }}>
            --{number}
          </div>
        </div>

        {/* Controls & Info */}
        <div className="one" style={{
          '--one-flex': '1',
          '--one-display': 'flex',
          '--one-flex-direction': 'column',
          '--one-gap': '1rem'
        }}>
          {/* Header */}
          <div className="one">
            <h3 className="one" style={{
              '--one-font-size': '1.125rem',
              '--one-font-weight': '600',
              '--one-color': 'var(--color4-100)',
              '--one-margin-bottom': '0.5rem'
            }}>
              {label}
            </h3>
            <p className="one" style={{
              '--one-font-size': '0.875rem',
              '--one-color': 'var(--color4-400)',
              '--one-line-height': '1.4'
            }}>
              {description}
            </p>
          </div>

          {/* HSL Controls */}
          <div className="one" style={{
            '--one-display': 'grid',
            '--one-grid-template-columns': '1fr 1fr 1fr',
            '--one-gap': '1rem'
          }}>
            {/* Hue */}
            <div className="one">
              <label className="one" style={{
                '--one-display': 'flex',
                '--one-justify-content': 'space-between',
                '--one-font-size': '0.75rem',
                '--one-color': 'var(--color4-300)',
                '--one-margin-bottom': '0.5rem'
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

            {/* Saturation */}
            <div className="one">
              <label className="one" style={{
                '--one-display': 'flex',
                '--one-justify-content': 'space-between',
                '--one-font-size': '0.75rem',
                '--one-color': 'var(--color4-300)',
                '--one-margin-bottom': '0.5rem'
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

            {/* Lightness */}
            <div className="one">
              <label className="one" style={{
                '--one-display': 'flex',
                '--one-justify-content': 'space-between',
                '--one-font-size': '0.75rem',
                '--one-color': 'var(--color4-300)',
                '--one-margin-bottom': '0.5rem'
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
          </div>

          {/* Current Values */}
          <div className="one" style={{
            '--one-background': 'var(--color3-800)',
            '--one-padding': '0.75rem',
            '--one-border-radius': '0.25rem',
            '--one-border': '1px solid var(--color3-600)'
          }}>
            <div className="one" style={{
              '--one-font-family': 'monospace',
              '--one-font-size': '0.875rem',
              '--one-color': 'var(--color4-300)'
            }}>
              {currentColor}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}