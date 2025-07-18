import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useThemeConfig } from '../hooks/useThemeConfig.js';

// Separate component for style input to prevent re-renders
const StyleInput = React.memo(({ componentName, fullKey, value, onChange, onDelete }) => {
  const [showDelete, setShowDelete] = useState(false);
  
  return (
    <div 
      className="flex gap-2 items-center"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <label className="text-xs text-neutral-400 w-24 capitalize">{fullKey.split('.').pop()}:</label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(componentName, fullKey, e.target.value)}
        className="flex-1 px-2 py-1 bg-neutral-900 border border-neutral-600 rounded text-xs text-neutral-200"
        placeholder="CSS value"
      />
      <button
        onClick={() => {
          console.log('Deleting style:', componentName, fullKey);
          onDelete(componentName, fullKey);
        }}
        className={`px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-all ${
          showDelete ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        title="Delete style"
      >
        ×
      </button>
    </div>
  );
});

/**
 * Theme Editor Component
 * Provides real-time editing of UI styling through JSON configuration
 */
export function ThemeEditor({ isOpen, onClose }) {
  const {
    config,
    updateColorScale,
    updateComponent,
    addCustomOverride,
    removeCustomOverride,
    exportConfig,
    importConfig,
    resetToDefault,
    syncNewComponents,
    mergeWithDefaults,
    customOverrides
  } = useThemeConfig();

  const [activeTab, setActiveTab] = useState('colors');
  const [expandedSection, setExpandedSection] = useState('colors');
  const [activeTopTab, setActiveTopTab] = useState('theme');
  const [selectedColor, setSelectedColor] = useState('primary');
  const [selectedWeight, setSelectedWeight] = useState('500');
  const [selectedFile, setSelectedFile] = useState('ui-theme-config');
  const [fileContent, setFileContent] = useState('');
  const [selectedDocSection, setSelectedDocSection] = useState('reference');
  const [selectedDoc, setSelectedDoc] = useState('ui-theme-config');
  const [isDocEditing, setIsDocEditing] = useState(false);
  
  // Dynamic document structure
  const [documentStructure, setDocumentStructure] = useState({});
  const [isLoadingStructure, setIsLoadingStructure] = useState(true);
  
  // Component Editor state hooks (moved from inside useMemo)
  const [newStyleProperty, setNewStyleProperty] = useState({});
  const [newStyleValue, setNewStyleValue] = useState({});
  const [showSuggestions, setShowSuggestions] = useState({});
  const [filteredSuggestions, setFilteredSuggestions] = useState({});

  // All hooks must be before any conditional returns
  const handleColorChange = useCallback((weight, value) => {
    const currentScale = config.colors.brand[selectedColor];
    updateColorScale(selectedColor, {
      ...currentScale,
      [weight]: value
    });
  }, [config.colors.brand, selectedColor, updateColorScale]);

  const handleStyleChange = useCallback((componentName, fullKey, value) => {
    const keys = fullKey.split('.');
    let newStyles = JSON.parse(JSON.stringify(config.components[componentName]));
    let current = newStyles;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    updateComponent(componentName, newStyles);
  }, [config.components, updateComponent]);

  const handleStyleDelete = useCallback((componentName, fullKey) => {
    const keys = fullKey.split('.');
    let newStyles = JSON.parse(JSON.stringify(config.components[componentName]));
    
    if (keys.length === 1) {
      // Direct property
      delete newStyles[keys[0]];
    } else {
      // Nested property
      let current = newStyles;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) return;
        if (i === keys.length - 2) {
          delete current[keys[i]][keys[keys.length - 1]];
        } else {
          current = current[keys[i]];
        }
      }
    }
    
    updateComponent(componentName, newStyles);
  }, [config.components, updateComponent]);

  const handleStyleAdd = useCallback((componentName, property, value) => {
    const newStyles = {
      ...config.components[componentName],
      [property]: value
    };
    updateComponent(componentName, newStyles);
  }, [config.components, updateComponent]);

  const renderStyleEditor = useCallback((componentName, styles, parentKey = '') => {
    return Object.entries(styles).map(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return (
          <div key={fullKey} className="ml-4 space-y-2">
            <div className="text-sm font-medium text-neutral-300 capitalize">{key}</div>
            {renderStyleEditor(componentName, value, fullKey)}
          </div>
        );
      }
      
      return (
        <StyleInput
          key={fullKey}
          componentName={componentName}
          fullKey={fullKey}
          value={value}
          onChange={handleStyleChange}
          onDelete={handleStyleDelete}
        />
      );
    });
  }, [handleStyleChange, handleStyleDelete]);

  const handleExport = useCallback(() => {
    const configJson = exportConfig();
    navigator.clipboard.writeText(configJson);
    alert('Theme configuration copied to clipboard!');
  }, [exportConfig]);

  const handleImport = useCallback(() => {
    const input = prompt('Paste theme configuration JSON:');
    if (input) {
      const success = importConfig(input);
      if (success) {
        alert('Theme configuration imported successfully!');
      } else {
        alert('Failed to import configuration. Please check the JSON format.');
      }
    }
  }, [importConfig]);

  // Simple file loading using new direct file API
  const loadDocumentContent = useCallback(async (filePath) => {
    try {
      const response = await fetch(`/wp-json/studio4/v1/file/${filePath}`, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success && data.content) {
        return data.content;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error loading document:', error);
      return `# Error Loading Document

**File**: ${filePath}
**Error**: ${error.message}

This document could not be loaded. Please check:
- File exists in the PROJECT-DOCS directory
- Server has proper file permissions

**Expected Path**: \`PROJECT-DOCS/${filePath}\``;
    }
  }, []);

  // Save document content to API
  const saveDocumentContent = useCallback(async (filePath, content) => {
    try {
      const response = await fetch(`/wp-json/studio4/v1/file/${filePath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        return data;
      } else {
        throw new Error('Failed to save document');
      }
    } catch (error) {
      console.error('Error saving document:', error);
      throw error;
    }
  }, []);

  // Save current document
  const handleSaveDocument = useCallback(async () => {
    if (!selectedDoc || selectedDocSection !== 'docs') {
      alert('No document selected for saving');
      return;
    }

    // Find the file path for the selected document
    let filePath = null;
    for (const sectionKey in documentStructure) {
      const sectionData = documentStructure[sectionKey];
      const file = sectionData.files?.find(f => f.key === selectedDoc);
      if (file) {
        filePath = file.path;
        break;
      }
    }

    if (!filePath) {
      alert('Could not find file path for selected document');
      return;
    }

    try {
      const result = await saveDocumentContent(filePath, fileContent);
      alert(`Document saved successfully! (${result.bytes_written} bytes)`);
      console.log('Document saved:', result);
    } catch (error) {
      alert(`Failed to save document: ${error.message}`);
    }
  }, [selectedDoc, selectedDocSection, documentStructure, fileContent, saveDocumentContent]);

  // Load document structure from API
  const loadDocumentStructure = useCallback(async () => {
    try {
      setIsLoadingStructure(true);
      const response = await fetch('/wp-json/studio4/v1/discover');
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.structure) {
        setDocumentStructure(data.structure);
      } else {
        console.error('Failed to load document structure');
      }
    } catch (error) {
      console.error('Error loading document structure:', error);
    } finally {
      setIsLoadingStructure(false);
    }
  }, []);

  // Load document structure on component mount
  useEffect(() => {
    loadDocumentStructure();
  }, [loadDocumentStructure]);

  // File loading logic with API integration
  const loadFileContent = useCallback(async (fileName, section = 'reference') => {
    try {
      let content = '';
      
      if (section === 'docs') {
        // Use dynamic document structure to find file path
        let filePath = null;
        
        // Search through all sections for the file with matching key
        for (const sectionKey in documentStructure) {
          const sectionData = documentStructure[sectionKey];
          const file = sectionData.files?.find(f => f.key === fileName);
          if (file) {
            filePath = file.path;
            break;
          }
        }

        if (filePath) {
          content = await loadDocumentContent(filePath);
        } else {
          // Generate list of available documents from structure
          const availableDocs = [];
          for (const sectionKey in documentStructure) {
            const sectionData = documentStructure[sectionKey];
            sectionData.files?.forEach(file => {
              availableDocs.push(`- ${file.key} (${file.title})`);
            });
          }
          
          content = `# Document Not Found

The document "${fileName}" was not found in the current PROJECT-DOCS structure.

Available documents:
${availableDocs.join('\n')}

**Tip**: The document structure is loaded dynamically from the filesystem. If you've added new files, try refreshing the interface.`;
        }
      } else {
        // Reference files (keep existing implementation for now)
        switch (fileName) {
          case 'claude-always':
            content = `# ClaudeAlways - Workflow Rules

## Core Rules
1. Never commit without explicit user approval
2. Update existing docs in DOCS/ folder, never create new ones elsewhere  
3. Use "docs" trigger to update documentation
4. Always commit to both local and GitHub when approved

## Development Workflow
- Read project memory files before starting
- Update documentation after major changes
- Track progress in appropriate PROJECT-DOCS folders`;
            break;
          case 'master-checklist':
            content = `# 00-Master Checklist

## Project Overview Status
- [ ] Complete S4 system implementation
- [x] Revolutionary theme-aware components system
- [x] Document management interface
- [ ] Full editing capabilities
- [ ] API integration for file operations

## Current Focus
Building complete document management system for all PROJECT-DOCS`;
            break;
          case 'design-checklist':
            content = `# 01-Design System Framework Checklist

## S4 System Status
- [x] 4-Layer architecture defined
- [x] Brand tokens system
- [x] Global elements concept
- [ ] Component scopes implementation
- [ ] Helper scopes system

## UI Design Status  
- [x] Theme-aware React components
- [x] JSON configuration system
- [x] Real-time style updates
- [x] Shadow DOM isolation`;
            break;
          case 'design-details':
            content = `# 01-Design System Framework Details

## S4 Architecture
The revolutionary 4-layer system that transforms how themes are built:

1. **Brand Tokens** - Core colors and typography
2. **Global Elements** - Universal element properties
3. **Component Scopes** - Context-specific modifications  
4. **Helper Scopes** - States and utilities

## Implementation Status
Currently building the complete user journey through our React interface.`;
            break;
          case 'design-whiteboard':
            content = `# 01-Design System Framework Whiteboard

## Live Collaboration Notes

### Current Session Focus
- Document management system implementation
- Complete editing capabilities for all docs
- API integration planning

### Ideas & Discoveries
- Using our own system for doc editing = ultimate dogfooding
- Single interface for all project management
- Real-time collaboration potential`;
            break;
          case 'tech-checklist':
            content = `# 02-Tech Stack Checklist

## Architecture Status
- [x] React 18 with Shadow DOM
- [x] Tailwind CSS 4 with @theme directive
- [x] Zustand state management
- [x] WordPress integration
- [x] Theme-aware component system

## Integration Status
- [x] Shadow DOM isolation working
- [x] CSS injection system operational
- [ ] Document API endpoints
- [ ] Real-time file operations`;
            break;
          case 'tech-details':
            content = `# 02-Tech Stack Details

## Revolutionary Architecture
- **Shadow DOM**: Complete isolation from WordPress
- **Theme-Aware Components**: JSON → CSS → React automatic styling
- **Real-time Updates**: Instant UI changes from configuration
- **Zero Conflicts**: WordPress themes can't interfere

## Current Implementation
Building on Daniel's R2WC boilerplate with our S4 system integration.`;
            break;
          case 'tech-whiteboard':
            content = `# 02-Tech Stack Whiteboard

## Technical Notes

### Document Management API
Need to implement:
- File read/write endpoints
- Version control integration  
- Real-time collaboration
- Auto-save functionality

### Architecture Benefits
- Eating our own dog food
- Single source of truth
- Revolutionary component system`;
            break;
          case 'frontend-checklist':
            content = `# 03-Plugin Frontend Checklist

## Frontend Interface Status
- [x] Theme editor with sidebar layout
- [x] Whiteboard for live notes
- [x] Files tab for reference
- [x] Document management interface
- [ ] Complete editing capabilities
- [ ] API integration

## User Experience
- [x] Intuitive accordion navigation
- [x] Real-time preview updates
- [x] Keyboard shortcuts (Cmd+4/Ctrl+4)`;
            break;
          case 'frontend-details':
            content = `# 03-Plugin Frontend Details

## Interface Architecture
Complete redesign with sidebar accordion layout providing:
- Better editing space
- Organized navigation
- Live whiteboard functionality
- Reference material access

## Theme-Aware System
Every interface element styled through JSON configuration, proving our system works.`;
            break;
          case 'frontend-whiteboard':
            content = `# 03-Plugin Frontend Whiteboard

## Frontend Development Notes

### Interface Evolution
1. Tab-based → Sidebar accordion
2. Added whiteboard for live collaboration
3. Files tab for reference materials
4. Now adding complete document management

### User Feedback Integration
- "More editing room" → Sidebar layout implemented
- "Reference materials" → Files tab added
- "Document editing" → Current implementation`;
            break;
          case 'backend-checklist':
            content = `# 04-Plugin Backend Checklist

## Backend Architecture Status
- [x] WordPress plugin foundation
- [x] REST API endpoints
- [x] Shadow DOM CSS injection
- [x] Theme configuration persistence
- [ ] Document API endpoints
- [ ] File operation handlers

## Database Integration
- [x] Theme configuration storage
- [ ] Document version control
- [ ] User collaboration tracking`;
            break;
          case 'backend-details':
            content = `# 04-Plugin Backend Details

## WordPress Integration
Built on Daniel's R2WC boilerplate providing:
- Custom web component registration
- Server-side CSS compilation
- Base64 CSS transport
- REST API integration

## Document Management Backend
Planning API endpoints for:
- File read/write operations
- Real-time collaboration
- Version control integration`;
            break;
          case 'backend-whiteboard':
            content = '# 04-Plugin Backend Whiteboard\n\n' +
                     '## 📊 STUDIO4 COMPONENT AUDIT RESULTS\n\n' +
                     '### **DEFINED COMPONENTS**: ~50+ in ui-theme-config.json\n\n' +
                     '#### **✅ ACTUALLY USED COMPONENTS** (28 components)\n' +
                     '**Used in S4ThemeBuilder.jsx + StructuredSidebar.jsx:**\n' +
                     '- main-header, header-brand, header-logo, header-title, header-subtitle\n' +
                     '- sidebar, sidebar-header, sidebar-header-content, sidebar-logo, sidebar-header-text\n' +
                     '- sidebar-title, sidebar-subtitle, sidebar-nav-grid, sidebar-nav-button, sidebar-nav-number, sidebar-nav-label\n' +
                     '- sidebar-content, content-area, section, sidebar-footer\n' +
                     '- preview-container, preview-header, preview-content, preview-canvas, preview-mode-toggle, preview-mode-button\n' +
                     '- button-primary, button-secondary\n' +
                     '- color-grid, color-card, color-swatch, color-scale\n\n' +
                     '#### **❌ UNUSED/ORPHANED COMPONENTS** (~22+ components)\n' +
                     '- accordion, accordion-item, accordion-trigger, accordion-content, accordion-icon\n' +
                     '- input, label, card\n' +
                     '- color-grid-xs, color-grid-sm, color-grid-md, color-grid-lg, color-grid-xl\n' +
                     '- color-card-content, color-card-title, color-card-value\n' +
                     '- color-swatch-number, color-swatch-label\n' +
                     '- color-scale-swatch, color-preview-title\n' +
                     '- preview-mode-button-active, preview-mode-button-hover\n' +
                     '- sidebar-nav-button-active, sidebar-nav-button-hover\n' +
                     '- sidebar-nav-number-active, sidebar-nav-label-active\n\n' +
                     '### **🚨 CURRENT SYSTEM USAGE REALITY CHECK**\n\n' +
                     '#### **Files Using Theme-Aware System**: 2 files\n' +
                     '1. **S4ThemeBuilder.jsx** - 🔀 MIXED (imports 28 components but still has Tailwind classes)\n' +
                     '2. **StructuredSidebar.jsx** - 🎯 PURE (fully theme-aware)\n\n' +
                     '#### **Files Using Pure Tailwind**: 7 files\n' +
                     '- ThemeEditor.jsx, CommandPalette.jsx, Panel.jsx, PanelHeader.jsx, SettingsDialog.jsx, TailwindDemo.jsx, ThemeEditor-old.jsx\n\n' +
                     '### **🔄 DUPLICATES & ODDITIES**\n\n' +
                     '#### **State Variants (Connected but separate)**:\n' +
                     '- `sidebar-nav-button` + `sidebar-nav-button-active` + `sidebar-nav-button-hover`\n' +
                     '- `preview-mode-button` + `preview-mode-button-active` + `preview-mode-button-hover`\n' +
                     '- `sidebar-nav-number` + `sidebar-nav-number-active`\n' +
                     '- `sidebar-nav-label` + `sidebar-nav-label-active`\n\n' +
                     '#### **Responsive Grid Variants**:\n' +
                     '- `color-grid` + `color-grid-xs` + `color-grid-sm` + `color-grid-md` + `color-grid-lg` + `color-grid-xl` (6 versions!)\n\n' +
                     '### **💡 REFACTOR RECOMMENDATIONS**\n\n' +
                     '#### **1. Remove Unused (22+ components)**\n' +
                     'Safe to delete since they\'re not imported anywhere\n\n' +
                     '#### **2. Consolidate State Variants**\n' +
                     'Instead of separate `-active` components, use CSS `:hover` and `[data-state="active"]`\n\n' +
                     '#### **3. Simplify Responsive Grids**\n' +
                     'Replace 6 grid variants with CSS `@media` queries in one component\n\n' +
                     '#### **4. Convert Tailwind Files**\n' +
                     '7 files still using pure Tailwind - prime candidates for S4 conversion\n\n' +
                     '## Backend Development Notes\n\n' +
                     '### Document API Design\n' +
                     'Need endpoints for:\n' +
                     '```\n' +
                     'GET /wp-json/studio4/v1/docs/{folder}/{file}\n' +
                     'POST /wp-json/studio4/v1/docs/{folder}/{file}\n' +
                     'PUT /wp-json/studio4/v1/docs/{folder}/{file}\n' +
                     '```\n\n' +
                     '### Security Considerations\n' +
                     '- Proper nonce verification\n' +
                     '- File path validation\n' +
                     '- User permission checks\n' +
                     '- Backup before saves';
            break;
        }
      }
      
      setFileContent(content);
    } catch (error) {
      setFileContent('Error loading file: ' + error.message);
    }
  }, [config, loadDocumentContent, documentStructure]);

  // Load file content when selection changes
  useEffect(() => {
    if (selectedDocSection === 'docs') {
      loadFileContent(selectedDoc, 'docs');
    } else {
      loadFileContent(selectedFile, 'reference');
    }
  }, [selectedDoc, selectedFile, selectedDocSection, loadFileContent]);

  const StyleEditor = useMemo(() => {
    if (!config || !config.components) {
      return (
        <div className="p-4 text-neutral-400">
          Loading theme configuration...
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-400 mb-4">
          Edit component styles in real-time. Changes are automatically applied to the interface.
        </div>
        <div className="space-y-2">
          {Object.entries(config.components).map(([componentName, styles]) => {
            return (
              <details key={componentName} className="bg-neutral-800 rounded border border-neutral-700">
                <summary className="p-3 cursor-pointer hover:bg-neutral-750 transition-colors">
                  <span className="font-medium text-neutral-200">{componentName}</span>
                  <span className="ml-2 text-xs text-neutral-400">({Object.keys(styles).length} properties)</span>
                </summary>
                <div className="p-3 border-t border-neutral-700 space-y-2">
                  {renderStyleEditor(componentName, styles)}
                  <div className="flex gap-2 mt-3">
                    <input
                      type="text"
                      placeholder="Property name"
                      value={newStyleProperty}
                      onChange={(e) => setNewStyleProperty(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                      className="flex-1 px-2 py-1 bg-neutral-700 border border-neutral-600 rounded text-sm text-neutral-200 placeholder-neutral-400"
                    />
                    <input
                      type="text"
                      placeholder="Value"
                      value={newStyleValue}
                      onChange={(e) => setNewStyleValue(e.target.value)}
                      className="flex-1 px-2 py-1 bg-neutral-700 border border-neutral-600 rounded text-sm text-neutral-200 placeholder-neutral-400"
                    />
                    <button
                      onClick={() => handleStyleAdd(componentName)}
                      className="px-3 py-1 bg-secondary-600 text-white rounded text-sm hover:bg-secondary-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute z-10 bg-neutral-800 border border-neutral-600 rounded mt-1 max-h-32 overflow-y-auto">
                      {filteredSuggestions.map((prop) => (
                        <div
                          key={prop}
                          className="px-3 py-1 hover:bg-neutral-700 cursor-pointer text-sm text-neutral-200"
                          onMouseDown={() => {
                            setNewStyleProperty(prop);
                            setShowSuggestions(false);
                          }}
                        >
                          {prop}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    );
  }, [config.components, renderStyleEditor, handleStyleAdd, cssProperties, newStyleProperty, newStyleValue, showSuggestions, filteredSuggestions]);

  const FilesViewer = useMemo(() => {
    const currentSection = selectedDocSection;
    const currentFile = currentSection === 'docs' ? selectedDoc : selectedFile;
    
    // Get display title based on section and file
    const getFileTitle = () => {
      if (currentSection === 'docs') {
        const titleMap = {
            } else {
              content = JSON.stringify({
                "loading": "Theme configuration is loading...",
                "note": "If this persists, the config state might not be initialized",
                "debug": {
                  "configExists": !!config,
                  "configKeys": config ? Object.keys(config).length : 0
                }
              }, null, 2);
            }
            break;
          case 'useThemeConfig':
            content = '// useThemeConfig.js - LIVE Theme Configuration Hook\n' +
                     '// This is the actual hook that powers the Studio4 interface\n\n' +
                     'import { useState, useEffect, useMemo } from \'react\';\n' +
                     'import themeConfig from \'../config/ui-theme-config.json\';\n\n' +
                     'export function useThemeConfig() {\n' +
                     '  // Load from localStorage on initialization\n' +
                     '  const [config, setConfig] = useState(() => {\n' +
                     '    try {\n' +
                     '      const saved = localStorage.getItem(\'studio4-ui-theme-config\');\n' +
                     '      return saved ? JSON.parse(saved) : themeConfig;\n' +
                     '    } catch {\n' +
                     '      return themeConfig;\n' +
                     '    }\n' +
                     '  });\n\n' +
                     '  // Generate CSS custom properties from JSON config\n' +
                     '  const cssVariables = useMemo(() => {\n' +
                     '    return generateCSSFromConfig(config);\n' +
                     '  }, [config]);\n\n' +
                     '  // Component style getter function\n' +
                     '  const getComponentStyles = (componentName) => {\n' +
                     '    return config.components[componentName] || {};\n' +
                     '  };\n\n' +
                     '  return {\n' +
                     '    config,\n' +
                     '    getComponentStyles,\n' +
                     '    updateColorScale,\n' +
                     '    updateComponent,\n' +
                     '    exportConfig: () => JSON.stringify(config, null, 2)\n' +
                     '  };\n' +
                     '}\n\n' +
                     '// This hook powers every component in the Studio4 interface!';
            break;
          case 'UIComponents':
            content = '// UIComponents.jsx - Theme-Aware React Components\n' +
                     '// Every component automatically pulls styles from JSON config\n\n' +
                     '// 50+ components available:\n' +
                     '// - Sidebar, SidebarHeader, SidebarTitle\n' +
                     '// - ButtonPrimary, ButtonSecondary\n' +
                     '// - ColorGrid, ColorCard, ColorSwatch\n' +
                     '// - All automatically styled from JSON config\n\n' +
                     '// See complete-component-list.md for full list';
            break;
          case 'main.css':
            content = '/* main.css - Tailwind 4 with @theme directive */\n\n' +
                     '@import "tailwindcss";\n' +
                     '@source "../**/*.jsx";\n' +
                     '@source "../**/*.js";\n\n' +
                     '@theme {\n' +
                     '  /* S4 Brand Colors (not ShadCN) */\n' +
                     '  --color-primary-500: hsl(337, 35%, 52%);\n' +
                     '  --color-secondary-500: hsl(29, 44%, 53%);\n' +
                     '  --color-neutral-950: hsl(0, 0%, 0%);\n' +
                     '  --color-neutral-50: hsl(0, 0%, 100%);\n' +
                     '  --radius: 0.375rem;\n' +
                     '}\n\n' +
                     '/* Shadow DOM styles with :host selector */\n' +
                     ':host {\n' +
                     '  /* Component isolation styles */\n' +
                     '}';
            break;
          case 'complete-component-list':
            content = 'COMPLETE STUDIO4 UI COMPONENT SYSTEM - 50+ COMPONENTS\n\n' +
                     'This is the COMPLETE list of theme-aware components from ui-theme-config.json\n\n' +
                     'MAIN LAYOUT COMPONENTS (6)\n' +
                     '- main-header - Top header spanning entire app width\n' +
                     '- header-brand - Logo and branding area\n\n' +
                     'SIDEBAR SYSTEM (15 components)\n' +
                     '- sidebar - Main 400px sidebar container\n' +
                     '- sidebar-header - Header section with dark background\n\n' +
                     'And 30+ more components... \n\n' +
                     'See REFERENCE/COMPLETE-COMPONENT-LIST.md for full details';
            break;
          case 'complete-current-state':
            content = '# COMPLETE CURRENT STATE - STUDIO4 STYLING SYSTEMS\n\n' +
                     '**This is EXACTLY what we have right now - no changes, just documentation**\n\n' +
                     '## 🔍 REALITY CHECK\n\n' +
                     '### **🎯 Theme-Aware System Usage: MINIMAL**\n' +
                     '- **Only 1 file** (S4ThemeBuilder.jsx) actually uses our revolutionary 50+ component system\n' +
                     '- **50+ components defined** in UIComponents.jsx but barely used\n' +
                     '- **Most components still use pure Tailwind**\n\n' +
                     '### **🔄 Actual File Breakdown:**\n\n' +
                     '**PURE TAILWIND (5 files):**\n' +
                     '- ThemeEditor.jsx - 100% Tailwind classes\n' +
                     '- Panel.jsx - 100% Tailwind classes\n' +  
                     '- CommandPalette.jsx - 100% Tailwind classes\n' +
                     '- SettingsDialog.jsx - 100% Tailwind classes\n' +
                     '- ShadowApp.jsx - 100% Tailwind classes\n\n' +
                     '**MIXED APPROACH (1 file):**\n' +
                     '- S4ThemeBuilder.jsx - 70% theme-aware / 30% Tailwind\n\n' +
                     '**PURE THEME-AWARE (0 files):**\n' +
                     '- None! Even our main interface mixes both systems\n\n' +
                     '## 🚨 MAJOR DUPLICATIONS\n\n' +
                     '### **Colors Defined in 3 Places:**\n' +
                     '1. ui-theme-config.json → "primary": { "500": "hsl(337, 35%, 52%)" }\n' +
                     '2. main.css → --color-primary-500: hsl(337, 35%, 52%);\n' +
                     '3. Components → className="bg-primary-500"\n\n' +
                     '### **Components Styled 2 Ways:**\n' +
                     '1. **Theme-aware**: <Sidebar> uses useComponentStyles(\'sidebar\')\n' +
                     '2. **Tailwind**: Still has className="w-80 bg-neutral-800"\n\n' +
                     '## 📊 BUILD OUTPUT\n\n' +
                     '**Current Build:**\n' +
                     '- **JS**: 1.156MB (includes React + all dependencies)\n' +
                     '- **CSS**: 38.18KB (Tailwind 4 full compilation)\n\n' +
                     '## 🎯 THE IRONY\n\n' +
                     'We built this **revolutionary 50+ component theme-aware system**, but we\'re only using it in **ONE file**!\n\n' +
                     'We created a system to replace CSS frameworks but most of our own components still use Tailwind.\n\n' +
                     '## 🔍 REFACTOR OPPORTUNITIES\n\n' +
                     '**Option 1: Pure S4 System (Eliminate Tailwind)**\n' +
                     '- Use only our JSON theme system\n' +
                     '- Generate minimal CSS from JSON\n' +
                     '- Every component uses useComponentStyles()\n\n' +
                     '**Option 2: S4-Enhanced Tailwind**\n' +
                     '- Generate Tailwind @theme from our JSON\n' +
                     '- Keep utilities for layout/spacing\n' +
                     '- Use theme-aware components for complex styling\n\n' +
                     '**Option 3: Hybrid Approach**\n' +
                     '- Theme-aware components for interface elements\n' +
                     '- Tailwind utilities for layout and responsive design\n' +
                     '- Single source of truth for colors/spacing\n\n' +
                     '---\n\n' +
                     '**This is the complete current state - 3 styling systems coexisting!**';
            break;
          case 'daniels-architecture':
            content = '# DANIEL\'S BOILERPLATE ARCHITECTURE - REFERENCE\n\n' +
                     '## 🏗️ THE REVOLUTIONARY STACK\n\n' +
                     '### 1. 🌐 WordPress → Web Component Bridge\n' +
                     'WHAT: Custom <studio4-builder> HTML element\n' +  
                     'PURPOSE: Isolates React app from WordPress completely\n' +  
                     'MAGIC: Shadow DOM = Zero style conflicts with themes\n\n' +  
                     '### 2. ⚛️ React Inside Shadow DOM\n' +
                     'WHAT: Full React 18 app in isolated bubble\n' +  
                     'PURPOSE: Modern UI without touching WordPress styles\n' +  
                     'RESULT: React works perfectly, WordPress themes can\'t interfere\n\n' +  
                     '### 3. 🎨 Our S4 Framework Integration\n' +
                     'WHAT: JSON config → CSS generation → Theme-aware components\n' +  
                     'PURPOSE: Complete theme control through Studio4 interface\n' +  
                     'NOTE: We replaced Daniel\'s original ShadCN with our S4 system\n\n' +  
                     '## 🔗 THE DATA FLOW\n\n' +
                     'WordPress PHP → Web Component Attributes → React Props → UI\n' +
                     '     ↓              ↓                      ↓           ↓\n' +
                     '"User data"    "user-role=\'admin\'"    "userRole"   "Admin UI"\n' +
                     '"CSS file"     "tailwind-css=\'...\'"   "CSS"        "Styled"\n' +
                     '"S4 config"    "settings=\'{...}\'"     "settings"   "S4 Theme"\n\n' +
                     '## 🛡️ SHADOW DOM ISOLATION\n\n' +
                     'Problem: WordPress themes break everything\n' +  
                     'Solution: Shadow DOM = Completely separate style universe\n' +  
                     'Result: Your React app is untouchable\n\n' +  
                     '// Inside shadow DOM - completely isolated\n' +
                     '<div className="bg-primary-500 text-white">\n' +
                     '  // WordPress themes can\'t touch this!\n' +
                     '</div>\n\n' +
                     '## 🔥 THE BREAKTHROUGH POINTS\n\n' +
                     '1. Web Component: React runs in isolated shadow DOM\n' +
                     '2. Server Props: PHP data flows seamlessly to React\n' +
                     '3. CSS Injection: Tailwind CSS injected safely via base64\n' +
                     '4. S4 Integration: Our theme system replaces ShadCN tokens\n' +
                     '5. Zero Conflicts: WordPress themes can\'t break anything\n' +
                     '6. JSON Control: Our ui-theme-config.json controls everything\n\n' +
                     '🚀 BOTTOM LINE: Daniel\'s bulletproof architecture + Our S4 system = Perfect combo!';
            break;
          default:
            content = 'File not found';
        }
      }
      
      setFileContent(content);
    } catch (error) {
      setFileContent('Error loading file: ' + error.message);
    }
  }, [config, loadDocumentContent, documentStructure]);

  // Load file content when selection changes
  useEffect(() => {
    if (selectedDocSection === 'docs') {
      loadFileContent(selectedDoc, 'docs');
    } else {
      loadFileContent(selectedFile, 'reference');
    }
  }, [selectedFile, selectedDoc, selectedDocSection, loadFileContent]);


  const ColorScaleEditor = useMemo(() => (
    <div className="space-y-4">
      <div className="flex gap-2 mb-4">
        {Object.keys(config.colors.brand).map(colorName => (
          <button
            key={colorName}
            onClick={() => setSelectedColor(colorName)}
            className={`px-3 py-2 rounded text-sm font-medium capitalize transition-colors ${
              selectedColor === colorName
                ? 'bg-primary-500 text-white'
                : 'bg-neutral-700 text-neutral-200 hover:bg-neutral-600'
            }`}
          >
            {colorName}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Object.entries(config.colors.brand[selectedColor]).map(([weight, value]) => (
          <div key={weight} className="space-y-2">
            <label className="text-sm font-medium text-neutral-200">
              {selectedColor}-{weight}
            </label>
            <div className="flex gap-2 items-center">
              <div
                className="w-8 h-8 rounded border-2 border-neutral-600"
                style={{ backgroundColor: value }}
              />
              <input
                type="text"
                value={value}
                onChange={(e) => handleColorChange(weight, e.target.value)}
                className="flex-1 px-2 py-1 bg-neutral-800 border border-neutral-600 rounded text-sm text-neutral-200"
                placeholder="hsl(0, 0%, 50%)"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ), [config.colors.brand, selectedColor, handleColorChange]);

  // Common CSS properties for autocomplete
  const cssProperties = [
    'display', 'position', 'top', 'right', 'bottom', 'left', 'float', 'clear',
    'width', 'height', 'maxWidth', 'maxHeight', 'minWidth', 'minHeight',
    'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'overflow', 'overflowX', 'overflowY', 'visibility', 'zIndex',
    'flex', 'flexDirection', 'flexWrap', 'flexGrow', 'flexShrink', 'flexBasis',
    'justifyContent', 'alignItems', 'alignContent', 'alignSelf', 'gap',
    'color', 'fontSize', 'fontWeight', 'fontFamily', 'fontStyle',
    'lineHeight', 'letterSpacing', 'textAlign', 'textDecoration',
    'textTransform', 'textOverflow', 'whiteSpace', 'wordBreak',
    'background', 'backgroundColor', 'backgroundImage', 'backgroundSize',
    'backgroundPosition', 'backgroundRepeat',
    'border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft',
    'borderColor', 'borderStyle', 'borderWidth', 'borderRadius',
    'opacity', 'boxShadow', 'textShadow', 'transform', 'transformOrigin',
    'transition', 'transitionProperty', 'transitionDuration', 'transitionTimingFunction',
    'cursor', 'pointerEvents', 'userSelect', 'resize', 'listStyle', 'outline'
  ].sort();

  const ComponentEditor = useMemo(() => {

    // Define component groups with section titles
    const componentGroups = [
      {
        title: "Main Header",
        components: ["main-header", "header-brand", "header-logo", "header-title", "header-subtitle"]
      },
      {
        title: "Sidebar Container",
        components: ["sidebar"]
      },
      {
        title: "Sidebar Header",
        components: ["sidebar-header", "sidebar-header-content", "sidebar-logo", "sidebar-header-text", "sidebar-title", "sidebar-subtitle"]
      },
      {
        title: "Sidebar Navigation (4-Square Grid)",
        components: ["sidebar-nav-grid", "sidebar-nav-button", "sidebar-nav-button-active", "sidebar-nav-button-hover", "sidebar-nav-number", "sidebar-nav-number-active", "sidebar-nav-label", "sidebar-nav-label-active"]
      },
      {
        title: "Sidebar Content Area",
        components: ["sidebar-content", "sidebar-section", "content-area", "section"]
      },
      {
        title: "Accordion Components",
        components: ["accordion", "accordion-item", "accordion-trigger", "accordion-trigger-open", "accordion-trigger-hover", "accordion-content", "accordion-icon"]
      },
      {
        title: "Buttons",
        components: ["button-primary", "button-secondary"]
      },
      {
        title: "Form Components",
        components: ["input", "label"]
      },
      {
        title: "Card Component",
        components: ["card"]
      }
    ];

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-400 mb-4">
          Edit component styles - Changes apply immediately
        </div>
        
        <div className="space-y-6">
          {componentGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h3 className="text-sm font-semibold text-primary-400 uppercase tracking-wider">{group.title}</h3>
              {group.components.map((componentName) => {
                const styles = config.components[componentName];
                if (!styles) return null;
                
                return (
                  <details key={componentName} className="bg-neutral-800 rounded p-3">
                    <summary className="font-medium text-neutral-200 cursor-pointer capitalize">
                      {componentName}
                    </summary>
                    <div className="mt-3 space-y-3">
                      {renderStyleEditor(componentName, styles)}
                      
                      {/* Add New Style Section */}
                      <div className="pt-3 border-t border-neutral-700">
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            placeholder="Property name"
                            value={newStyleProperty[componentName] || ''}
                            onChange={(e) => {
                              setNewStyleProperty({
                                ...newStyleProperty,
                                [componentName]: e.target.value
                              });
                            }}
                            className="flex-1 px-2 py-1 bg-neutral-900 border border-neutral-600 rounded text-xs text-neutral-200"
                          />
                          <input
                            type="text"
                            placeholder="Value"
                            value={newStyleValue[componentName] || ''}
                            onChange={(e) => setNewStyleValue({
                              ...newStyleValue,
                              [componentName]: e.target.value
                            })}
                            className="flex-1 px-2 py-1 bg-neutral-900 border border-neutral-600 rounded text-xs text-neutral-200"
                          />
                          <button
                            onClick={() => {
                              const prop = newStyleProperty[componentName];
                              const val = newStyleValue[componentName];
                              if (prop && val) {
                                handleStyleAdd(componentName, prop, val);
                                setNewStyleProperty({
                                  ...newStyleProperty,
                                  [componentName]: ''
                                });
                                setNewStyleValue({
                                  ...newStyleValue,
                                  [componentName]: ''
                                });
                              }
                            }}
                            className="px-3 py-1 bg-primary-500 text-white rounded text-xs hover:bg-primary-600 transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </details>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }, [config.components, renderStyleEditor, handleStyleAdd, cssProperties, newStyleProperty, newStyleValue, showSuggestions, filteredSuggestions]);

  const FilesViewer = useMemo(() => {
    const currentSection = selectedDocSection;
    const currentFile = currentSection === 'docs' ? selectedDoc : selectedFile;
    
    // Get display title based on section and file
    const getFileTitle = () => {
      if (currentSection === 'docs') {
        const titleMap = {
          'claude-memory': 'Claude Memory - Session Progress',
          'claude-always': 'ClaudeAlways - Workflow Rules',
          'master-checklist': '00-Master / CHECKLIST.md',
          'design-checklist': '01-Design / CHECKLIST.md',
          'design-details': '01-Design / DETAILS.md',
          'design-whiteboard': '01-Design / WHITEBOARD.md',
          'tech-checklist': '02-Tech / CHECKLIST.md',
          'tech-details': '02-Tech / DETAILS.md',
          'tech-whiteboard': '02-Tech / WHITEBOARD.md',
          'frontend-checklist': '03-Frontend / CHECKLIST.md',
          'frontend-details': '03-Frontend / DETAILS.md',
          'frontend-whiteboard': '03-Frontend / WHITEBOARD.md',
          'backend-checklist': '04-Backend / CHECKLIST.md',
          'backend-details': '04-Backend / DETAILS.md',
          'backend-whiteboard': '04-Backend / WHITEBOARD.md'
        };
        return titleMap[currentFile] || currentFile.toUpperCase();
      } else {
        const titleMap = {
          'ui-theme-config': 'UI Theme Configuration JSON',
          'useThemeConfig': 'Theme Configuration Hook',
          'UIComponents': 'Theme-Aware React Components',
          'main.css': 'Tailwind CSS with @theme Directive',
          'daniels-architecture': 'Daniel\'s Web Component Architecture Reference'
        };
        return titleMap[currentFile] || currentFile;
      }
    };

    const isDocumentEditable = currentSection === 'docs';

    return (
      <div className="space-y-4">
        <div className="text-sm text-neutral-400 mb-4">
          {currentSection === 'docs' 
            ? 'Project documentation - Full editing capabilities' 
            : 'Reference files - Read-only for inspection'
          }
        </div>
        
        {/* File Content */}
        <div className="bg-neutral-800 rounded-lg border border-neutral-700">
          <div className="flex justify-between items-center p-3 border-b border-neutral-700">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-medium text-neutral-200">
                {getFileTitle()}
              </h3>
              {currentSection === 'docs' && (
                <span className="px-2 py-1 bg-secondary-500 text-white text-xs rounded">
                  EDITABLE
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {isDocumentEditable && (
                <button
                  onClick={() => setIsDocEditing(!isDocEditing)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    isDocEditing 
                      ? 'bg-secondary-500 text-white hover:bg-secondary-600' 
                      : 'bg-neutral-700 text-neutral-200 hover:bg-neutral-600'
                  }`}
                >
                  {isDocEditing ? 'Preview' : 'Edit'}
                </button>
              )}
              <button
                onClick={() => navigator.clipboard.writeText(fileContent)}
                className="px-2 py-1 bg-neutral-700 text-neutral-200 rounded text-xs hover:bg-neutral-600 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="p-4">
            {isDocumentEditable && isDocEditing ? (
              <textarea
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                className="w-full h-96 bg-neutral-900 text-neutral-200 font-mono text-sm p-4 rounded border border-neutral-600 resize-none outline-none focus:ring-2 focus:ring-secondary-500"
                placeholder="Edit document content..."
                spellCheck={false}
              />
            ) : (
              <pre className="text-xs font-mono text-neutral-200 whitespace-pre-wrap overflow-x-auto max-h-96 overflow-y-auto">
                <code>{fileContent}</code>
              </pre>
            )}
          </div>
        </div>

        {/* Document Actions */}
        {isDocumentEditable && (
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4">
            <h4 className="text-sm font-medium text-neutral-200 mb-3">Document Actions</h4>
            <div className="flex gap-2">
              <button
                onClick={handleSaveDocument}
                disabled={selectedDocSection !== 'docs'}
                className="px-3 py-2 bg-secondary-500 text-white rounded text-sm font-medium hover:bg-secondary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Document
              </button>
              <button
                onClick={() => {
                  const confirmed = confirm('Revert all changes to last saved version?');
                  if (confirmed) {
                    loadFileContent(currentFile, 'docs');
                    setIsDocEditing(false);
                  }
                }}
                className="px-3 py-2 bg-neutral-700 text-neutral-200 rounded text-sm font-medium hover:bg-neutral-600 transition-colors"
              >
                Revert Changes
              </button>
            </div>
          </div>
        )}

        {/* File Info */}
        <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4">
          <h4 className="text-sm font-medium text-neutral-200 mb-2">
            {currentSection === 'docs' ? 'Document Information' : 'File Information'}
          </h4>
          <div className="text-xs text-neutral-400 space-y-1">
            {currentSection === 'docs' ? (
              <>
                <p>• PROJECT-DOCS structure for complete project management</p>
                <p>• Each folder organized with CHECKLIST, DETAILS, and WHITEBOARD files</p>
                <p>• Live editing capabilities with markdown support</p>
                <p>• Ready for API integration for persistent saves</p>
                {isDocumentEditable && (
                  <p>• <strong>Editing Mode:</strong> Click "Edit" button to modify content</p>
                )}
              </>
            ) : (
              <>
                {selectedFile === 'ui-theme-config' && (
                  <>
                    <p>• 539 lines of comprehensive UI component styling</p>
                    <p>• 25+ component definitions with complete property sets</p>
                    <p>• Color scales, typography, layout, and animation definitions</p>
                    <p>• Real-time editable through Components tab</p>
                  </>
                )}
                {selectedFile === 'useThemeConfig' && (
                  <>
                    <p>• React hook managing theme configuration state</p>
                    <p>• Converts JSON config to CSS rules automatically</p>
                    <p>• Injects styles into Shadow DOM for real-time updates</p>
                    <p>• Provides component styling functions</p>
                  </>
                )}
                {selectedFile === 'UIComponents' && (
                  <>
                    <p>• 25+ theme-aware React components</p>
                    <p>• Each component automatically pulls styles from JSON</p>
                    <p>• Complete UI component library for the interface</p>
                    <p>• Real-time style updates from theme changes</p>
                  </>
                )}
                {selectedFile === 'main.css' && (
                  <>
                    <p>• Tailwind CSS 4 with @theme directive implementation</p>
                    <p>• S4 design system tokens (not ShadCN)</p>
                    <p>• Shadow DOM compatible with :host selector</p>
                    <p>• 37KB compiled CSS with complete utility classes</p>
                  </>
                )}
                {selectedFile === 'daniels-architecture' && (
                  <>
                    <p>• Overview of Daniel's WordPress + React architecture</p>
                    <p>• Shadow DOM isolation and web component system</p>
                    <p>• Data flow from WordPress PHP to React props</p>
                    <p>• Reference for understanding the foundation we built on</p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }, [selectedFile, selectedDoc, selectedDocSection, fileContent, isDocEditing, loadFileContent]);


  // Early return AFTER all hooks
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-950 z-50">
      <div className="bg-neutral-900 w-full h-full flex flex-col">
        {/* Compact Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-700 bg-neutral-800">
          <div>
            <h2 className="text-lg font-bold text-neutral-100">Studio4 Design System</h2>
            <p className="text-xs text-neutral-400">Backend interface editor • Cmd+4 to toggle</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="px-2 py-1 bg-secondary-500 text-white rounded text-xs font-medium hover:bg-secondary-600 transition-colors"
            >
              Export
            </button>
            <button
              onClick={handleImport}
              className="px-2 py-1 bg-neutral-700 text-neutral-200 rounded text-xs font-medium hover:bg-neutral-600 transition-colors"
            >
              Import
            </button>
            <button
              onClick={onClose}
              className="px-2 py-1 bg-neutral-700 text-neutral-200 rounded text-xs font-medium hover:bg-neutral-600 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <div className="w-80 bg-neutral-800 border-r border-neutral-700 flex flex-col">
            

            {/* Top-Level Tab Navigation */}
            <div className="border-b border-neutral-700">
              <div className="flex bg-neutral-900">
                <button
                  onClick={() => setActiveTopTab('theme')}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                    activeTopTab === 'theme' 
                      ? 'bg-primary-500 text-white border-b-2 border-primary-300' 
                      : 'text-neutral-300 hover:bg-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  🎨 Theme
                </button>
                <button
                  onClick={() => setActiveTopTab('docs')}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                    activeTopTab === 'docs' 
                      ? 'bg-secondary-500 text-white border-b-2 border-secondary-300' 
                      : 'text-neutral-300 hover:bg-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  📚 Docs
                </button>
                <button
                  onClick={() => setActiveTopTab('files')}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                    activeTopTab === 'files' 
                      ? 'bg-neutral-600 text-white border-b-2 border-neutral-400' 
                      : 'text-neutral-300 hover:bg-neutral-700 hover:text-neutral-200'
                  }`}
                >
                  📁 Files
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto">
              
              {/* Theme Tab Content */}
              {activeTopTab === 'theme' && (
                <div className="space-y-0">
                  {/* Colors Section */}
                  <div className="border-b border-neutral-700">
                    <button
                      onClick={() => {
                        setExpandedSection(expandedSection === 'colors' ? null : 'colors');
                        setActiveTab('colors');
                      }}
                      className={`w-full py-3 px-4 flex items-center justify-between transition-colors bg-neutral-800 hover:bg-neutral-700 ${
                        expandedSection === 'colors' ? 'border-l-4 border-primary-500' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-primary-500 flex items-center justify-center text-xs font-bold text-white">
                          🎨
                        </div>
                        <span className="font-medium text-neutral-200">Colors</span>
                      </div>
                      <svg className={`w-4 h-4 transition-transform ${expandedSection === 'colors' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Components Section */}
                  <div className="border-b border-neutral-700">
                    <button
                      onClick={() => {
                        setExpandedSection(expandedSection === 'components' ? null : 'components');
                        setActiveTab('components');
                      }}
                      className={`w-full py-3 px-4 flex items-center justify-between transition-colors bg-neutral-800 hover:bg-neutral-700 ${
                        expandedSection === 'components' ? 'border-l-4 border-primary-500' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-secondary-500 flex items-center justify-center text-xs font-bold text-white">
                          🧩
                        </div>
                        <span className="font-medium text-neutral-200">Components</span>
                      </div>
                      <svg className={`w-4 h-4 transition-transform ${expandedSection === 'components' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Docs Tab Content */}
              {activeTopTab === 'docs' && (
                <div className="space-y-0">
                  {isLoadingStructure ? (
                    <div className="p-4 text-center text-neutral-400">
                      Loading documents...
                    </div>
                  ) : (
                    Object.entries(documentStructure).map(([sectionKey, sectionData]) => {
                      const sectionIcons = {
                        'root': '📋',
                        '00-master': '📊', 
                        '01-design-system-framework': '🎨',
                        '02-tech-stack': '⚙️',
                        '03-plugin-frontend': '🔌',
                        '04-plugin-backend': '🔧'
                      };
                      
                      const sectionColors = {
                        'root': 'bg-secondary-500',
                        '00-master': 'bg-neutral-600',
                        '01-design-system-framework': 'bg-pink-500',
                        '02-tech-stack': 'bg-blue-500',
                        '03-plugin-frontend': 'bg-green-500',
                        '04-plugin-backend': 'bg-purple-500'
                      };
                      
                      return (
                        <div key={sectionKey} className="border-b border-neutral-700">
                          <button
                            onClick={() => {
                              setExpandedSection(expandedSection === sectionKey ? null : sectionKey);
                            }}
                            className={`w-full py-3 px-4 flex items-center justify-between transition-colors bg-neutral-800 hover:bg-neutral-700 ${
                              expandedSection === sectionKey ? 'border-l-4 border-secondary-500' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded ${sectionColors[sectionKey] || 'bg-neutral-500'} flex items-center justify-center text-xs font-bold text-white`}>
                                {sectionIcons[sectionKey] || '📄'}
                              </div>
                              <span className="font-medium text-neutral-200">{sectionData.title}</span>
                            </div>
                            <svg className={`w-4 h-4 transition-transform ${expandedSection === sectionKey ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          {expandedSection === sectionKey && (
                            <div className="bg-neutral-900 px-4 py-2 space-y-1">
                              {sectionData.files?.map(file => (
                                <button
                                  key={file.key}
                                  onClick={() => {
                                    setSelectedDoc(file.key);
                                    setSelectedDocSection('docs');
                                    setActiveTab('files');
                                    loadFileContent(file.key, 'docs');
                                  }}
                                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                                    activeTab === 'files' && selectedDoc === file.key && selectedDocSection === 'docs' ? 'bg-secondary-500 text-white' : 'text-neutral-300 hover:bg-neutral-700'
                                  }`}
                                >
                                  {file.title}.md
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* Files Tab Content */}
              {activeTopTab === 'files' && (
                <div className="space-y-0">
                  <div className="border-b border-neutral-700">
                    <button
                      onClick={() => {
                        setExpandedSection(expandedSection === 'reference-files' ? null : 'reference-files');
                      }}
                      className={`w-full py-3 px-4 flex items-center justify-between transition-colors bg-neutral-800 hover:bg-neutral-700 ${
                        expandedSection === 'reference-files' ? 'border-l-4 border-neutral-500' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-neutral-600 flex items-center justify-center text-xs font-bold text-white">
                          📁
                        </div>
                        <span className="font-medium text-neutral-200">Reference Files</span>
                      </div>
                      <svg className={`w-4 h-4 transition-transform ${expandedSection === 'reference-files' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {expandedSection === 'reference-files' && (
                      <div className="bg-neutral-900 px-4 py-2 space-y-1">
                        {[
                          { key: 'ui-theme-config', label: 'ui-theme-config.json' },
                          { key: 'useThemeConfig', label: 'useThemeConfig.js' },
                          { key: 'UIComponents', label: 'UIComponents.jsx' },
                          { key: 'main.css', label: 'main.css' },
                          { key: 'complete-component-list', label: 'complete-component-list.md' },
                          { key: 'complete-current-state', label: 'complete-current-state.md' },
                          { key: 'daniels-architecture', label: 'daniels-architecture.md' }
                        ].map(file => (
                          <button
                            key={file.key}
                            onClick={() => {
                              setSelectedFile(file.key);
                              setSelectedDocSection('reference');
                              setActiveTab('files');
                              loadFileContent(file.key, 'reference');
                            }}
                            className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                              activeTab === 'files' && selectedFile === file.key && selectedDocSection === 'reference' ? 'bg-neutral-500 text-white' : 'text-neutral-300 hover:bg-neutral-700'
                            }`}
                          >
                            {file.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-auto p-4 space-y-2">
              <button
                onClick={() => {
                  syncNewComponents();
                  alert('New components synced!');
                }}
                className="w-full px-3 py-2 bg-primary-500 text-white rounded text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                Sync New
              </button>
              <button
                onClick={() => {
                  const confirmed = confirm('⚠️ Reset all custom styles?');
                  if (confirmed) {
                    resetToDefault();
                    alert('Reset to defaults.');
                  }
                }}
                className="w-full px-3 py-2 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Reset All
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {activeTab === 'colors' && ColorScaleEditor}
            {activeTab === 'components' && ComponentEditor}
            {activeTab === 'files' && FilesViewer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeEditor;