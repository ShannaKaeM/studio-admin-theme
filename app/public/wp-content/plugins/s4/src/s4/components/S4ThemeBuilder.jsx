import React, { useState } from 'react';
import { useS4Store } from '../../hooks/useS4Store.js';
import { useThemeConfig } from '../../hooks/useThemeConfig.js';
import { ComponentVariablesTable } from '../../components/ComponentVariablesTable.jsx';

export function S4ThemeBuilder() {
  const { config, updateConfig } = useS4Store();
  const { config: themeConfig } = useThemeConfig();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  return (
    <div className="box" data-scope="card" data-preset="stack">
      {/* Header */}
      <div className="box" data-scope="header" data-preset="row">
        <div className="text" data-preset="heading">
          S4 Design System
        </div>
        <div className="text" data-preset="small">
          V2.0 - Pure Architecture
        </div>
      </div>
      
      {/* Navigation */}
      <div className="box" data-preset="row">
        {['dashboard', 'theme', 'components', 'presets'].map((tab) => (
          <button
            key={tab}
            className="box text"
            data-scope="button"
            data-preset={activeTab === tab ? 'primary' : 'muted'}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div className="box" data-preset="stack">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'theme' && <ThemeView />}
        {activeTab === 'components' && (
          <div className="box" style={{ '--box-padding': '1.5rem' }}>
            <ComponentVariablesTable />
          </div>
        )}
        {activeTab === 'presets' && <PresetsView />}
      </div>
    </div>
  );
}

function DashboardView() {
  const { config } = useS4Store();
  
  return (
    <div className="box" data-preset="stack">
      <div className="text" data-preset="subheading">
        Welcome to S4 V2.0
      </div>
      <div className="text" data-preset="body">
        Your fresh design system is ready! This is the foundation - we'll copy your genius functionality piece by piece.
      </div>
      
      {/* Brand Colors Preview */}
      <div className="box" data-preset="stack">
        <div className="text" data-preset="subheading">Brand Colors</div>
        <div className="box" data-preset="row">
          {Object.entries(config.brand).map(([name, color]) => (
            <div key={name} className="box" data-preset="stack">
              <div 
                className="box"
                style={{ 
                  backgroundColor: color, 
                  width: '60px', 
                  height: '60px',
                  borderRadius: '8px'
                }}
              />
              <div className="text" data-preset="small">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ThemeView() {
  return (
    <div className="box" data-preset="center" style={{ minHeight: '200px' }}>
      <div className="text" data-preset="body">
        Theme Builder - Coming Soon
      </div>
    </div>
  );
}

function ComponentsView() {
  return (
    <div className="box" data-preset="center" style={{ minHeight: '200px' }}>
      <div className="text" data-preset="body">
        Components Library - Coming Soon
      </div>
    </div>
  );
}

function PresetsView() {
  return (
    <div className="box" data-preset="center" style={{ minHeight: '200px' }}>
      <div className="text" data-preset="body">
        Preset Manager - Coming Soon
      </div>
    </div>
  );
}
