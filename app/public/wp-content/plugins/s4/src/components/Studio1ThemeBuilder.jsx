import React, { useState } from 'react';
import { useStudio1Store } from '../hooks/useStudio1Store.js';
import { useThemeConfig } from '../hooks/useThemeConfig.js';
import { ComponentVariablesTable } from '../components/ComponentVariablesTable.jsx';
import { ScopesBuilder } from '../components/ScopesBuilder.jsx';
import { ColorCreator } from '../components/ColorCreator.jsx';
import { BaseColorEditor } from '../components/BaseColorEditor.jsx';

export function Studio1ThemeBuilder({ isAdmin = false, isFrontend = false }) {
  const { config, updateConfig } = useStudio1Store();
  const { config: themeConfig, exportConfig, importConfig, resetToDefault, syncNewComponents } = useThemeConfig();
  const [activeTab, setActiveTab] = useState('colors');
  const [expandedSection, setExpandedSection] = useState('colors');
  
  const handleExport = () => {
    const configJson = exportConfig();
    navigator.clipboard.writeText(configJson);
    alert('Studio1 configuration copied to clipboard!');
  };
  
  const handleImport = () => {
    const input = prompt('Paste Studio1 configuration JSON:');
    if (input) {
      const success = importConfig(input);
      if (success) {
        alert('Studio1 configuration imported successfully!');
      } else {
        alert('Failed to import configuration. Please check the JSON format.');
      }
    }
  };
  
  return (
    <div className="dashboard-container" style={{
      position: isFrontend ? 'fixed' : 'relative',
      top: isFrontend ? '0' : 'auto',
      left: isFrontend ? '0' : 'auto',
      right: isFrontend ? '0' : 'auto',
      bottom: isFrontend ? '0' : 'auto',
      width: isFrontend ? '100vw' : '100%',
      height: isFrontend ? '100vh' : 'auto',
      zIndex: isFrontend ? '50' : 'auto'
    }}>
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Studio1 Design System</h2>
          <p className="dashboard-subtitle">The One Element System • Real-time updates</p>
        </div>
        <div className="dashboard-actions">
          <button onClick={handleExport} className="ui-button ui-button--primary ui-button--small">
            Export
          </button>
          <button onClick={handleImport} className="ui-button ui-button--secondary ui-button--small">
            Import
          </button>
          {isFrontend && (
            <button
              onClick={() => window.location.href = '/wp-admin/admin.php?page=studio1-dashboard'}
              className="ui-button ui-button--secondary ui-button--small"
            >
              Admin
            </button>
          )}
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="dashboard-tabs">
        <button
          onClick={() => setActiveTab('base')}
          className={`dashboard-tab ${activeTab === 'base' ? 'dashboard-tab--active' : ''}`}
        >
          🎯 Base
        </button>
        <button
          onClick={() => setActiveTab('colors')}
          className={`dashboard-tab dashboard-tab--secondary ${activeTab === 'colors' ? 'dashboard-tab--active' : ''}`}
        >
          🎨 Colors
        </button>
        <button
          onClick={() => setActiveTab('scopes')}
          className={`dashboard-tab ${activeTab === 'scopes' ? 'dashboard-tab--active' : ''}`}
        >
          🎭 Scopes
        </button>
      </nav>

      {/* Tab Content */}
      <main className="dashboard-content">
        {activeTab === 'base' && <BaseColorEditor />}
        {activeTab === 'colors' && <ColorCreator />}
        {activeTab === 'scopes' && <ScopesBuilder />}
      </main>
    </div>
  );
}

