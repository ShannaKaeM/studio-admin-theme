import React, { useState, useEffect } from 'react';
import { useThemeConfig } from '../hooks/useThemeConfig.js';
import { PatternCreator } from '../components/PatternCreator.jsx';
import { PatternWorkspace } from '../components/PatternWorkspace.jsx';

export function Studio1ThemeBuilder({ isAdmin = false, isFrontend = false }) {
  const { exportConfig, importConfig } = useThemeConfig();
  
  // Theme toggle state
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('studio1-ui-theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  // Sidebar collapse state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Pattern state for communication between sidebar and workspace
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [patterns, setPatterns] = useState({});
  
  // Apply theme to document and persist to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('studio1-ui-theme', theme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };
  
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
          <div 
            className="theme-toggle" 
            data-theme={theme}
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <div className="theme-toggle-track">
              <span className={`theme-toggle-icon ${theme === 'dark' ? 'active' : ''}`}>🌙</span>
              <span className={`theme-toggle-icon ${theme === 'light' ? 'active' : ''}`}>☀️</span>
            </div>
            <div className="theme-toggle-thumb">
              {theme === 'dark' ? '🌙' : '☀️'}
            </div>
          </div>
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

      {/* Main Content - Clean workspace */}
      <div className={`dashboard-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Collapsible Sidebar with Pattern Studio */}
        <div className={`dashboard-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          {/* Sidebar Header with Collapse Toggle */}
          <div className="sidebar-header">
            <div className="dashboard-tab dashboard-tab--active">
              🎨 Pattern Studio
            </div>
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {sidebarCollapsed ? '→' : '←'}
            </button>
          </div>
          
          {/* Pattern Creator Sidebar Content */}
          {!sidebarCollapsed && (
            <PatternCreator 
              selectedPattern={selectedPattern}
              setSelectedPattern={setSelectedPattern}
              patterns={patterns}
              setPatterns={setPatterns}
            />
          )}
        </div>

        {/* Clean Interactive Workspace */}
        <div className="dashboard-preview workspace">
          <PatternWorkspace 
            selectedPattern={selectedPattern}
            patterns={patterns}
          />
        </div>
      </div>
    </div>
  );
}


