import React, { useState } from 'react';

export default function LayoutControls({ 
  activeLayoutPreset, 
  setActiveLayoutPreset,
  layoutSettings,
  updateLayoutSetting
}) {
  const [activeTab, setActiveTab] = useState('spacing');
  
  // Layout presets
  const layoutPresets = {
    'compact': {
      name: 'Compact',
      description: 'Minimal spacing for dense layouts',
      settings: {
        spacing: { base: 0.5, scale: 1.2 },
        sizing: { base: 14, scale: 1.25 },
        container: { maxWidth: 1200, padding: 16 },
        grid: { gap: 16, columns: 12 }
      }
    },
    'balanced': {
      name: 'Balanced',
      description: 'Default spacing and sizing',
      settings: {
        spacing: { base: 1, scale: 1.5 },
        sizing: { base: 16, scale: 1.333 },
        container: { maxWidth: 1280, padding: 24 },
        grid: { gap: 24, columns: 12 }
      }
    },
    'spacious': {
      name: 'Spacious',
      description: 'Generous spacing for modern layouts',
      settings: {
        spacing: { base: 1.5, scale: 1.618 },
        sizing: { base: 18, scale: 1.414 },
        container: { maxWidth: 1440, padding: 32 },
        grid: { gap: 32, columns: 12 }
      }
    },
    'ultra': {
      name: 'Ultra Wide',
      description: 'Maximum spacing for large displays',
      settings: {
        spacing: { base: 2, scale: 2 },
        sizing: { base: 20, scale: 1.5 },
        container: { maxWidth: 1920, padding: 48 },
        grid: { gap: 48, columns: 12 }
      }
    }
  };
  
  const applyPreset = (presetKey) => {
    setActiveLayoutPreset(presetKey);
    const preset = layoutPresets[presetKey];
    if (preset && preset.settings) {
      Object.entries(preset.settings).forEach(([category, values]) => {
        Object.entries(values).forEach(([key, value]) => {
          updateLayoutSetting(category, key, value);
        });
      });
    }
  };
  
  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="sticky top-0 bg-card z-10 pb-4 mb-4 border-b border-border">
        <div className="flex gap-1">
          <button 
            onClick={() => setActiveTab('spacing')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'spacing' 
                ? 'bg-muted text-foreground' 
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Spacing
          </button>
          <button 
            onClick={() => setActiveTab('sizing')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'sizing' 
                ? 'bg-muted text-foreground' 
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Sizing
          </button>
          <button 
            onClick={() => setActiveTab('containers')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'containers' 
                ? 'bg-muted text-foreground' 
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Containers
          </button>
          <button 
            onClick={() => setActiveTab('presets')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'presets' 
                ? 'bg-muted text-foreground' 
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Presets
          </button>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Spacing Tab */}
        {activeTab === 'spacing' && (
          <>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Spacing System</h3>
              
              {/* Base Spacing */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-muted-foreground">Base Unit</label>
                  <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                    {layoutSettings?.spacing?.base || 1}rem
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0.25" 
                  max="2" 
                  step="0.25"
                  value={layoutSettings?.spacing?.base || 1}
                  onChange={(e) => updateLayoutSetting('spacing', 'base', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              
              {/* Spacing Scale */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-muted-foreground">Scale Ratio</label>
                  <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                    {layoutSettings?.spacing?.scale || 1.5}x
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1.1" 
                  max="2" 
                  step="0.1"
                  value={layoutSettings?.spacing?.scale || 1.5}
                  onChange={(e) => updateLayoutSetting('spacing', 'scale', parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
              
              {/* Spacing Preview */}
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <p className="text-xs text-muted-foreground mb-3">Spacing Scale Preview</p>
                {[0, 1, 2, 3, 4, 5].map(level => {
                  const base = layoutSettings?.spacing?.base || 1;
                  const scale = layoutSettings?.spacing?.scale || 1.5;
                  const value = level === 0 ? 0 : base * Math.pow(scale, level - 1);
                  return (
                    <div key={level} className="flex items-center gap-3">
                      <span className="text-xs font-mono w-16">space-{level}</span>
                      <div 
                        className="bg-primary h-2 rounded"
                        style={{ width: `${value * 16}px` }}
                      />
                      <span className="text-xs text-muted-foreground">{value.toFixed(2)}rem</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
        
        {/* Sizing Tab */}
        {activeTab === 'sizing' && (
          <>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Typography Sizing</h3>
              
              {/* Base Font Size */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-muted-foreground">Base Font Size</label>
                  <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                    {layoutSettings?.sizing?.base || 16}px
                  </span>
                </div>
                <input 
                  type="range" 
                  min="12" 
                  max="24" 
                  step="1"
                  value={layoutSettings?.sizing?.base || 16}
                  onChange={(e) => updateLayoutSetting('sizing', 'base', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              {/* Type Scale */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-muted-foreground">Type Scale</label>
                  <select 
                    value={layoutSettings?.sizing?.scale || 1.333}
                    onChange={(e) => updateLayoutSetting('sizing', 'scale', parseFloat(e.target.value))}
                    className="text-xs bg-muted px-2 py-1 rounded border-0"
                  >
                    <option value="1.125">Minor Second (1.125)</option>
                    <option value="1.2">Minor Third (1.2)</option>
                    <option value="1.25">Major Third (1.25)</option>
                    <option value="1.333">Perfect Fourth (1.333)</option>
                    <option value="1.414">Augmented Fourth (1.414)</option>
                    <option value="1.5">Perfect Fifth (1.5)</option>
                    <option value="1.618">Golden Ratio (1.618)</option>
                  </select>
                </div>
              </div>
              
              {/* Type Scale Preview */}
              <div className="bg-muted rounded-lg p-4 space-y-3">
                <p className="text-xs text-muted-foreground mb-3">Type Scale Preview</p>
                {['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'].map((size, index) => {
                  const base = layoutSettings?.sizing?.base || 16;
                  const scale = layoutSettings?.sizing?.scale || 1.333;
                  const value = base * Math.pow(scale, index - 2);
                  return (
                    <div key={size} className="flex items-baseline gap-3">
                      <span className="text-xs font-mono w-12">{size}</span>
                      <span 
                        style={{ fontSize: `${value}px` }}
                        className="flex-1"
                      >
                        The quick brown fox
                      </span>
                      <span className="text-xs text-muted-foreground">{value.toFixed(0)}px</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
        
        {/* Containers Tab */}
        {activeTab === 'containers' && (
          <>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Container Settings</h3>
              
              {/* Max Width */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-muted-foreground">Max Width</label>
                  <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                    {layoutSettings?.container?.maxWidth || 1280}px
                  </span>
                </div>
                <input 
                  type="range" 
                  min="960" 
                  max="1920" 
                  step="80"
                  value={layoutSettings?.container?.maxWidth || 1280}
                  onChange={(e) => updateLayoutSetting('container', 'maxWidth', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              {/* Container Padding */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-muted-foreground">Container Padding</label>
                  <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                    {layoutSettings?.container?.padding || 24}px
                  </span>
                </div>
                <input 
                  type="range" 
                  min="8" 
                  max="64" 
                  step="8"
                  value={layoutSettings?.container?.padding || 24}
                  onChange={(e) => updateLayoutSetting('container', 'padding', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              {/* Grid Settings */}
              <h3 className="text-sm font-medium mt-6">Grid System</h3>
              
              {/* Grid Gap */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-muted-foreground">Grid Gap</label>
                  <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                    {layoutSettings?.grid?.gap || 24}px
                  </span>
                </div>
                <input 
                  type="range" 
                  min="8" 
                  max="48" 
                  step="8"
                  value={layoutSettings?.grid?.gap || 24}
                  onChange={(e) => updateLayoutSetting('grid', 'gap', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              
              {/* Grid Columns */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-muted-foreground">Grid Columns</label>
                  <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                    {layoutSettings?.grid?.columns || 12}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="4" 
                  max="16" 
                  step="2"
                  value={layoutSettings?.grid?.columns || 12}
                  onChange={(e) => updateLayoutSetting('grid', 'columns', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </>
        )}
        
        {/* Presets Tab */}
        {activeTab === 'presets' && (
          <>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Layout Presets</h3>
              <p className="text-xs text-muted-foreground">
                Quick presets for common layout patterns
              </p>
              
              <div className="space-y-2">
                {Object.entries(layoutPresets).map(([key, preset]) => (
                  <button
                    key={key}
                    onClick={() => applyPreset(key)}
                    className={`w-full p-4 rounded-lg border text-left transition-all ${
                      activeLayoutPreset === key
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-muted-foreground'
                    }`}
                  >
                    <h4 className="font-medium text-sm">{preset.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{preset.description}</p>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Spacing:</span>
                        <span className="font-mono">{preset.settings.spacing.base}rem</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Base Size:</span>
                        <span className="font-mono">{preset.settings.sizing.base}px</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Container:</span>
                        <span className="font-mono">{preset.settings.container.maxWidth}px</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Grid Gap:</span>
                        <span className="font-mono">{preset.settings.grid.gap}px</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}