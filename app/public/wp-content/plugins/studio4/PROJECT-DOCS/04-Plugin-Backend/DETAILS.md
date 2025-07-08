# PLUGIN BACKEND - DETAILS

*References: [01-Design-System-Framework](../01-Design-System-Framework/) + [02-Plugin-System](../02-Plugin-System/)*

## META UI SYSTEM
**Goal**: Developer tools to customize the Studio4 interface itself using the Design System Framework

## CURRENT IMPLEMENTATION
Revolutionary theme-aware React component system where every UI element automatically pulls styles from JSON configuration.

### JSON Configuration Structure
```json
{
  "components": {
    "sidebar": {
      "width": "400px",
      "backgroundColor": "var(--color-neutral-900)"
    },
    "button-primary": {
      "background": "linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))"
    }
  }
}
```

### Component Architecture
- **Theme-Aware Components**: Each component uses `useComponentStyles(componentName)`
- **Auto CSS Generation**: JSON config → CSS rules → Shadow DOM injection
- **Real-Time Updates**: Edit JSON properties → Instant UI changes
- **Complete Coverage**: 25+ editable components covering entire interface

### Developer Access
- **localhost only** or `?dev=true` parameter
- **Hidden from users**: Only developers can access UI customization
- **Full interface control**: Every element is editable

## INTEGRATED DOCUMENT MANAGEMENT SYSTEM
**Goal**: Provide direct access to all PROJECT-DOCS within the backend interface for efficient project management during complex refactor work.

### Top-Level Tab Architecture
Three-tab system to reveal three different sidebars, Theme, Docs, and Files :

#### 🎨 Theme Tab (Primary Pink)
- **Colors Accordion**: Brand color management with HSL controls
- **Components Accordion**: Theme-aware React component library editing

#### 📚 Docs Tab (Secondary Tangerine)  
- **Root Docs**: Claude.md (session memory), ClaudeAlways.md (rules)
- **00-Master**: Master project checklist
- **01-Design**: Design system checklists, details, whiteboard
- **02-Tech**: Technical architecture checklists, details, whiteboard  
- **03-Frontend**: Frontend plugin checklists, details, whiteboard
- **04-Backend**: Backend plugin checklists, details, whiteboard

#### 📁 Files Tab (Neutral Gray)
- **Technical Reference Files**: Live access to key system files
- **Configuration Files**: ui-theme-config.json (live from current state)
- **Component Files**: useThemeConfig.js, UIComponents.jsx
- **Documentation**: Architecture guides and system references

### Document Editing Features - **COMPLETE & WORKING**
- **Dynamic File Discovery**: API endpoint auto-discovers all PROJECT-DOCS structure
- **JSON-Based UI Generation**: Interface automatically syncs with filesystem changes
- **Real-Time Bi-Directional Sync**: Changes visible in both interface and filesystem
- **Complete Save Functionality**: Document edits persist to actual files
- **Edit/Preview Toggle**: Switch between markdown editing and rendered preview
- **Professional UX**: Color-coded navigation with visual hierarchy

### Working API Implementation
- **Dynamic Discovery Endpoint**: `/wp-json/studio4/v1/discover` - Auto-scans PROJECT-DOCS folders
- **Universal File Endpoint**: `/wp-json/studio4/v1/file/{filepath}` - GET/POST for any .md file
- **Security Validation**: Prevents directory traversal, .md files only
- **Real-Time Sync**: New files appear automatically, edits save instantly

### Technical Implementation - **PRODUCTION READY**
- **File Path Resolution**: Simple plugin-local paths eliminate permission issues
- **JSON Structure Generation**: Dynamic accordions based on actual filesystem
- **Bi-Directional Synchronization**: Interface ↔ Filesystem real-time updates
- **Security**: Input validation, path sanitization, file type restrictions
- **Error Handling**: Comprehensive error responses for debugging

### "Eating Our Own Dog Food" Validation
- **Meta System**: Interface uses our own theme-aware React components
- **Single Interface**: Theme development + Complete project management
- **Complex Project Management**: Proven effective for managing multi-phase S4 integration
- **Architecture Validation**: If good enough for our complex project, ready for users

## PLANNED UI REFACTOR
Apply the Design System Framework to the meta UI itself.

### UI-4LayerSystem Branch Strategy
1. **Apply [data] scopes** to UI components
2. **Use same CSS variable system** as user themes
3. **Test card global scope** in actual interface
4. **Rebuild JSON system** to match S4 architecture

### Benefits
- **Consistency**: Meta UI uses same system as user themes
- **Testing**: Dogfood our own Design System Framework
- **Simplification**: One system for everything

## WEB COMPONENT SYSTEM
Enhanced web component architecture for better integration.

### Current Features
- **Shadow DOM isolation**: Complete style separation
- **Attribute passing**: WordPress data to React
- **CSS injection**: Dynamic style updates
- **State management**: Zustand with persistence

### Planned Enhancements
- **Improved attribute system**: Better data flow
- **Performance optimization**: Faster rendering
- **Debug tools**: Component inspection
- **Documentation generation**: Auto-generated component docs