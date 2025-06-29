# The Studio Design System - Fresh Start Installation Guide

**Created**: June 28, 2025  
**Status**: 🎯 Implementation Guide  
**Purpose**: Step-by-step technical setup for fresh Studio plugin implementation

---

## 📋 **OVERVIEW**

This guide provides the exact steps to implement The Studio Design System plugin from scratch using the comprehensive architecture outlined in `STUDIO-ARCHITECTURE.md` and `ACTION-PLAN-V2.md`. The fresh start uses modern React + TypeScript + Redux architecture instead of the current complex implementation built on Daniel's simple boilerplate.

---

## 🎯 **REFERENCE DOCUMENTS**

**MUST READ FIRST:**
- `/DOCS/STUDIO-DOCS/STUDIO-ARCHITECTURE.md` - Complete vision and feature specifications
- `/DOCS/STUDIO-DOCS/ACTION-PLAN-V2.md` - Detailed implementation phases and technical requirements

**Current Implementation:**
- `/app/public/wp-content/plugins/the-studio-plugin/` - Existing plugin for reference

---

## 🏗️ **ARCHITECTURE DECISIONS**

### **Modern Stack (Fresh Start)**
```
Frontend: React 18 + TypeScript + Redux Toolkit
Styling: Styled Components (CSS isolation)
Build: Vite + TypeScript
API: WordPress REST API v2
Storage: JSON files at /wp-content/uploads/studio-data/
Integration: theme.json + wp_theme_json_data_theme filter
```

### **Core Design Principles**
1. **Base + Calculation System**: Minimal variables (~20) with mathematical relationships
2. **Scopes Architecture**: Context-aware components (`.card .title` vs `.hero .title`)
3. **Progressive Enhancement**: Primitives → Theme → Presets → Components
4. **Professional UI**: Card-based interfaces with smooth interactions

---

## 📁 **STEP 1: PROJECT SETUP**

### **1.1 Create Fresh Plugin Directory**
```bash
cd /app/public/wp-content/plugins/
cp -r the-studio-plugin the-studio-fresh
cd the-studio-fresh
```

### **1.2 Initialize Modern Stack**
```bash
# Remove old dependencies
rm -rf node_modules package-lock.json

# Create new package.json with TypeScript + Redux
cat > package.json << 'EOF'
{
  "name": "the-studio-design-system",
  "version": "2.0.0",
  "description": "Professional WordPress Design System Manager",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build && npm run build:types",
    "build:types": "tsc --emitDeclarationOnly",
    "build:watch": "vite build --watch",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src --ext .ts,.tsx"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.2.1",
    "eslint": "^8.45.0",
    "eslint-plugin-react": "^7.32.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "typescript": "^5.1.0",
    "vite": "^5.1.0"
  },
  "dependencies": {
    "@r2wc/react-to-web-component": "^2.0.3",
    "@reduxjs/toolkit": "^2.0.0",
    "@types/styled-components": "^5.1.26",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^9.0.0",
    "react-router-dom": "^6.8.0",
    "styled-components": "^6.0.0"
  }
}
EOF

npm install
```

### **1.3 TypeScript Configuration**
```bash
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

cat > tsconfig.node.json << 'EOF'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF
```

### **1.4 Vite Configuration**
```bash
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'src/main.tsx',
      output: {
        entryFileNames: 'studio-app.js',
        assetFileNames: 'studio-app.css'
      }
    }
  }
})
EOF
```

---

## 📱 **STEP 2: CORE ARCHITECTURE**

### **2.1 Create Source Structure**
```bash
mkdir -p src/{components,pages,store,types,utils,styles}
mkdir -p src/components/{ui,forms,layout}
mkdir -p src/pages/{Projects,Colors,Typography,Layouts,Effects,Scopes}
```

### **2.2 TypeScript Types (src/types/index.ts)**
```typescript
// Core data types
export interface Project {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  brands: Brand[];
  stats: ProjectStats;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  projectId: string;
  colors: Color[];
  themeMappings: ThemeMapping[];
}

export interface Color {
  id: string;
  name: string;
  hex: string;
  hsl: HSLColor;
  oklch: OKLCHColor;
  cmyk: CMYKColor;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export interface OKLCHColor {
  l: number;
  c: number;
  h: number;
}

export interface CMYKColor {
  c: number;
  m: number;
  y: number;
  k: number;
}

export interface ThemeMapping {
  id: string;
  name: string;
  mappings: {
    primary: string;
    secondary: string;
    accent: string;
    neutral: string;
    base: string;
  };
}

export interface ProjectStats {
  totalBrands: number;
  totalColors: number;
  totalThemes: number;
  lastModified: string;
}

// Redux state types
export interface RootState {
  projects: ProjectsState;
  colors: ColorsState;
  ui: UIState;
}

export interface ProjectsState {
  projects: Project[];
  activeProjectId: string | null;
  loading: boolean;
  error: string | null;
}

export interface ColorsState {
  activeBrandId: string | null;
  activeTab: 'sets' | 'theme' | 'presets' | 'components';
  loading: boolean;
  error: string | null;
}

export interface UIState {
  sidebarOpen: boolean;
  activeTab: 'projects' | 'colors' | 'typography' | 'layouts' | 'effects' | 'scopes';
  theme: 'light' | 'dark';
}
```

### **2.3 Redux Store Setup (src/store/index.ts)**
```typescript
import { configureStore } from '@reduxjs/toolkit';
import { projectsSlice } from './projectsSlice';
import { colorsSlice } from './colorsSlice';
import { uiSlice } from './uiSlice';

export const store = configureStore({
  reducer: {
    projects: projectsSlice.reducer,
    colors: colorsSlice.reducer,
    ui: uiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### **2.4 Projects Redux Slice (src/store/projectsSlice.ts)**
```typescript
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Project, ProjectsState } from '@/types';
import { projectsAPI } from '@/utils/api';

const initialState: ProjectsState = {
  projects: [],
  activeProjectId: localStorage.getItem('studio-active-project') || null,
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    const response = await projectsAPI.getAll();
    return response;
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData: Partial<Project>) => {
    const response = await projectsAPI.create(projectData);
    return response;
  }
);

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setActiveProject: (state, action: PayloadAction<string>) => {
      state.activeProjectId = action.payload;
      localStorage.setItem('studio-active-project', action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch projects';
      });
  },
});

export const { setActiveProject, clearError } = projectsSlice.actions;
```

---

## 🎨 **STEP 3: PAGE IMPLEMENTATIONS**

### **3.1 Projects Page (src/pages/Projects/ProjectsPage.tsx)**
```typescript
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { RootState, AppDispatch } from '@/store';
import { fetchProjects, setActiveProject } from '@/store/projectsSlice';
import { ProjectCard } from './ProjectCard';
import { CreateProjectButton } from './CreateProjectButton';

const ProjectsContainer = styled.div`
  padding: 48px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 32px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: var(--foreground);
  margin: 0;
`;

export const ProjectsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { projects, loading, activeProjectId } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleProjectSelect = (projectId: string) => {
    dispatch(setActiveProject(projectId));
  };

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <ProjectsContainer>
      <PageHeader>
        <Title>Projects</Title>
        <CreateProjectButton />
      </PageHeader>
      
      <ProjectsGrid>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isActive={project.id === activeProjectId}
            onSelect={() => handleProjectSelect(project.id)}
          />
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
};
```

### **3.2 Colors Page Structure (src/pages/Colors/ColorsPage.tsx)**
```typescript
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '@/store';
import { TabNavigation } from '@/components/ui/TabNavigation';
import { ColorSetsTab } from './ColorSetsTab';
import { ThemeColorsTab } from './ThemeColorsTab';
import { ColorPresetsTab } from './ColorPresetsTab';

const ColorsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const PageHeader = styled.div`
  padding: 24px 48px;
  border-bottom: 1px solid var(--border);
`;

const TabContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const tabs = [
  { id: 'sets', label: 'Color Sets', icon: '🎨' },
  { id: 'theme', label: 'Theme Colors', icon: '🖌️' },
  { id: 'presets', label: 'Color Presets', icon: '📊' },
  { id: 'components', label: 'Components', icon: '🧩' },
];

export const ColorsPage: React.FC = () => {
  const { activeTab } = useSelector((state: RootState) => state.colors);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sets':
        return <ColorSetsTab />;
      case 'theme':
        return <ThemeColorsTab />;
      case 'presets':
        return <ColorPresetsTab />;
      case 'components':
        return <div>Components coming soon...</div>;
      default:
        return <ColorSetsTab />;
    }
  };

  return (
    <ColorsContainer>
      <PageHeader>
        <h1>Colors</h1>
        <TabNavigation tabs={tabs} activeTab={activeTab} />
      </PageHeader>
      <TabContent>
        {renderTabContent()}
      </TabContent>
    </ColorsContainer>
  );
};
```

---

## 🔌 **STEP 4: WORDPRESS INTEGRATION**

### **4.1 Update Plugin Main File (the-studio-plugin.php)**
```php
<?php
/**
 * Plugin Name: The Studio Design System
 * Description: Professional WordPress Design System Manager
 * Version: 2.0.0
 * Author: MI Agency
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class StudioDesignSystem {
    
    public function __construct() {
        add_action('init', [$this, 'init']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_filter('theme_json_data_theme', [$this, 'add_studio_theme_data']);
    }
    
    public function init() {
        // Create uploads directory for studio data
        $this->create_studio_directories();
    }
    
    public function enqueue_scripts() {
        if (current_user_can('edit_theme_options')) {
            wp_enqueue_script(
                'studio-app',
                plugin_dir_url(__FILE__) . 'dist/studio-app.js',
                [],
                '2.0.0',
                true
            );
            
            wp_enqueue_style(
                'studio-app',
                plugin_dir_url(__FILE__) . 'dist/studio-app.css',
                [],
                '2.0.0'
            );
            
            // Pass PHP data to React
            wp_localize_script('studio-app', 'studioConfig', [
                'apiUrl' => rest_url('studio/v2/'),
                'nonce' => wp_create_nonce('wp_rest'),
                'userId' => get_current_user_id(),
                'userRole' => wp_get_current_user()->roles[0] ?? 'subscriber',
                'isAdmin' => current_user_can('manage_options'),
                'siteUrl' => home_url(),
            ]);
        }
    }
    
    public function register_rest_routes() {
        // Projects endpoints
        register_rest_route('studio/v2', '/projects', [
            'methods' => 'GET',
            'callback' => [$this, 'get_projects'],
            'permission_callback' => [$this, 'check_permissions']
        ]);
        
        register_rest_route('studio/v2', '/projects', [
            'methods' => 'POST',
            'callback' => [$this, 'create_project'],
            'permission_callback' => [$this, 'check_permissions']
        ]);
        
        // Add more endpoints for brands, colors, etc.
    }
    
    private function create_studio_directories() {
        $upload_dir = wp_upload_dir();
        $studio_dir = $upload_dir['basedir'] . '/studio-data';
        
        if (!file_exists($studio_dir)) {
            wp_mkdir_p($studio_dir);
            wp_mkdir_p($studio_dir . '/users');
        }
    }
    
    public function check_permissions() {
        return current_user_can('edit_theme_options');
    }
}

new StudioDesignSystem();
```

### **4.2 Create API Utils (src/utils/api.ts)**
```typescript
interface APIConfig {
  apiUrl: string;
  nonce: string;
}

declare global {
  interface Window {
    studioConfig: APIConfig;
  }
}

const api = {
  baseURL: window.studioConfig?.apiUrl || '/wp-json/studio/v2/',
  headers: {
    'Content-Type': 'application/json',
    'X-WP-Nonce': window.studioConfig?.nonce || '',
  },
};

export const projectsAPI = {
  async getAll() {
    const response = await fetch(`${api.baseURL}projects`, {
      headers: api.headers,
    });
    return response.json();
  },
  
  async create(data: any) {
    const response = await fetch(`${api.baseURL}projects`, {
      method: 'POST',
      headers: api.headers,
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  async update(id: string, data: any) {
    const response = await fetch(`${api.baseURL}projects/${id}`, {
      method: 'PUT',
      headers: api.headers,
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  async delete(id: string) {
    const response = await fetch(`${api.baseURL}projects/${id}`, {
      method: 'DELETE',
      headers: api.headers,
    });
    return response.json();
  },
};
```

---

## 🎯 **STEP 5: BUILD AND TEST**

### **5.1 Build the Application**
```bash
# Type check
npm run typecheck

# Build for production
npm run build

# Watch for development
npm run build:watch
```

### **5.2 Test WordPress Integration**
1. Activate the plugin in WordPress admin
2. Go to any page with edit capabilities
3. Look for the Studio web component to load
4. Test project creation and management
5. Verify API endpoints respond correctly

### **5.3 Verify Core Features**
- [ ] Projects page loads with grid layout
- [ ] Create new project functionality works
- [ ] Active project persistence in localStorage
- [ ] Navigation between main pages (Projects, Colors, etc.)
- [ ] Redux state management working
- [ ] TypeScript compilation successful
- [ ] API integration functional

---

## 📋 **NEXT STEPS**

### **Immediate Tasks**
1. **Complete Colors Page**: Implement all 4 tabs (Sets, Theme, Presets, Components)
2. **Add Typography Page**: Extract from Daniel's Theme and implement scale builders
3. **Implement Scopes Architecture**: Revolutionary context-aware component system
4. **Build Base + Calculation System**: Minimal variable output with mathematical relationships

### **Integration Tasks**
1. **Theme.json Generation**: Export clean, minimal theme files
2. **Gutenberg Styles Sync**: Ensure compatibility with existing GB Styles plugin
3. **Daniel's Theme Integration**: Leverage existing CSS variable system
4. **Performance Optimization**: Code splitting and lazy loading

### **Future Enhancements**
1. **AI Site Builder**: Implement conversation-based site generation
2. **Multi-theme Support**: Light/dark/seasonal theme variations
3. **Asset Management**: Logo, font, and image upload system
4. **Export/Import**: Project portability and backup system

---

## 🔗 **IMPORTANT REFERENCES**

**Must implement from architecture docs:**
- **Projects Management**: Section 2.2 in ACTION-PLAN-V2.md
- **Colors Architecture**: Section 3 in ACTION-PLAN-V2.md  
- **Scopes System**: Lines 222-226 in STUDIO-ARCHITECTURE.md
- **Base + Calculation**: Lines 47-53 in ACTION-PLAN-V2.md
- **Integration Strategy**: Lines 657-766 in ACTION-PLAN-V2.md

**Key Design Decisions:**
- Use existing JSON file storage system at `/wp-content/uploads/studio-data/`
- Implement card-based theme mapping interface from current system
- Follow 5-page navigation structure: Projects, Colors, Typography, Layouts, Effects, Scopes
- Build on modern React + TypeScript + Redux instead of current Zustand implementation

---

**🚀 This installation guide provides the foundation for implementing The Studio's complete architecture using modern development practices and the comprehensive specifications from the existing documentation.**