import React from 'react';
import { useThemeConfig } from '../hooks/useThemeConfig.js';
import { ScopesBuilder } from '../components/ScopesBuilder.jsx';

export function Studio1ThemeBuilder({ isAdmin = false, isFrontend = false }) {
  const { exportConfig, importConfig } = useThemeConfig();
  
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
          <h2 className="dashboard-title">Studio1 1Block Builder</h2>
          <p className="dashboard-subtitle">Create and organize your 1Blocks with complete creative freedom</p>
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

      {/* Direct to ScopesBuilder - No Tabs */}
      <ScopesBuilder />
    </div>
  );
}

