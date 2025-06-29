# The Studio Design System V2 - Coexistence & Auto-Generation Architecture

**Created**: June 29, 2025  
**Status**: 🎯 Updated Master Implementation Guide  
**Purpose**: Complete development roadmap incorporating coexistence strategy, Tailwind integration, and auto-generation controls

---

## 🎯 **PROJECT VISION V2**

**The Studio** = Professional Visual Design System Builder for WordPress that creates mathematically consistent, scalable design systems through an intuitive interface. **NEW**: Works alongside any existing WordPress theme through scoped CSS architecture and includes auto-generation visual controls for component editing.

### **Core Value Proposition V2**
- **Theme Coexistence**: Works with Blocksy, Astra, GeneratePress without conflicts
- **Visual Design System Creation**: No-code interface with auto-generated controls
- **Mathematical Consistency**: Base + calculation system for infinite scalability  
- **Scoped CSS Output**: Components isolated with `[data-studio-scope]` wrappers
- **Auto-Generation Controls**: GB Styles-inspired visual editing interface
- **Dual Output Modes**: Scoped CSS (default) + Tailwind (optional)

---

## 🏗️ **V2 CORE ARCHITECTURE: SEPARATION OF CONCERNS**

### **Critical Distinction: Plugin vs User Output**

#### **1. Plugin Admin Interface (Our Development)**
```
Location: WordPress Admin Dashboard
Purpose: Design system management interface
Styling: Shadow DOM + React (completely isolated)
Integration: None - standalone admin interface
```

#### **2. User Output (What Plugin Generates)**
```
Location: User's website front-end
Purpose: Scoped components for user's site
Styling: Scoped CSS that coexists with existing themes
Integration: Works with Blocksy, WooCommerce, any theme
```

### **Coexistence Strategy Architecture**

#### **Theme Heavy Lifting + Studio Brand Sections**
```
EXISTING THEME (Blocksy)          STUDIO OUTPUT
├── Navigation                   ├── [data-studio-scope="hero"]
├── WooCommerce Integration      │   └── Branded hero sections
├── Blog layouts                 ├── [data-studio-scope="cta"] 
├── Core functionality           │   └── Call-to-action components
└── Base styling                 ├── [data-studio-scope="testimonial"]
                                 │   └── Customer testimonials
                                 └── [data-studio-scope="feature"]
                                     └── Feature highlights
```

#### **No Conflicts Strategy**
```css
/* Instead of global overrides that break things: */
.title { font-size: 2rem; } /* ❌ Conflicts with theme */

/* Studio generates scoped CSS: */
[data-studio-scope="hero"] .title { 
  font-size: var(--studio-text-hero); 
  color: var(--studio-color-primary);
} /* ✅ Isolated, no conflicts */
```

---

## 📁 **V2 TECHNICAL FOUNDATION**

### **Enhanced Technology Stack**
- **Frontend**: React 18 + TypeScript + Redux Toolkit + Styled Components
- **Build System**: Vite + TypeScript compilation
- **WordPress Integration**: REST API v2 + Custom endpoints
- **Storage**: JSON files at `/wp-content/uploads/studio-data/`
- **Plugin Styling**: Shadow DOM isolation (like GB Styles)
- **User Output**: Scoped CSS generation with WordPress filters
- **Auto-Generation**: GB Styles-inspired control system
- **Color System**: OKLCH primary with HSL/CMYK editing support

### **File Structure V2**
```
the-studio-plugin/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── AutoGenControls/  # 🆕 GB Styles-inspired auto controls
│   │   ├── ScopePreview/     # 🆕 Component scope preview system
│   │   └── ThemeIntegration/ # 🆕 Existing theme compatibility
│   ├── pages/               # Main page components
│   ├── services/            # 🆕 Enhanced services layer
│   │   ├── cssGenerator.ts  # 🆕 Scoped CSS generation
│   │   ├── themeDetector.ts # 🆕 Existing theme detection
│   │   └── controlMapper.ts # 🆕 Property-to-control mapping
│   ├── store/               # Redux store and slices
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions and helpers
│   ├── styles/              # Styled components and theme
│   └── main.tsx             # Application entry point
├── DOCS/
└── dist/                    # Built plugin files
```

### **V2 Data Architecture - Multi-Output Support**
```
/wp-content/uploads/studio-data/
└── users/{user_id}/
    └── clients/{client-slug}/
        ├── metadata.json
        ├── assets/
        ├── output-preferences.json    # 🆕 CSS vs Tailwind mode
        ├── theme-compatibility.json   # 🆕 Detected theme settings
        └── brands/{brand-slug}.json
            ├── colors: {...}
            ├── scoped-output.css      # 🆕 Generated scoped CSS
            └── tailwind-output.css    # 🆕 Generated Tailwind (optional)
```

---

## 🎨 **V2 USER WORKFLOW SYSTEM**

### **Enhanced Step 1: Base Styles + Theme Detection**
**Purpose**: Establish foundation values AND detect existing theme compatibility

**NEW Theme Detection Interface**:
```javascript
themeCompatibility: {
  detectedTheme: 'Blocksy',           // Auto-detected theme
  themeFeatures: {
    woocommerce: true,                // WooCommerce support detected
    customizer: true,                 // WordPress Customizer integration
    gutenberg: true,                  // Full block editor support
    existingColors: ['primary', 'secondary'] // Theme's existing colors
  },
  conflictRisks: {
    cssClasses: ['.hero', '.button'], // Potential class conflicts
    variables: ['--primary-color']    // Potential variable conflicts
  },
  scopingStrategy: 'data-attribute'   // Recommended scoping approach
}
```

**Base Categories (Enhanced)**:
```javascript
baseStyles: {
  outputMode: 'scoped-css',           // 'scoped-css' | 'tailwind'
  scopePrefix: 'studio',              // data-studio-scope prefix
  colors: {
    primary: { h: 200, s: 50, l: 50 },
    secondary: { h: 120, s: 40, l: 60 },
    neutral: { h: 220, s: 10, l: 50 }
  },
  typography: {
    baseFontSize: 16,
    scaleRatio: 1.25,
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  spacing: {
    baseUnit: 4,
    scaleType: 'linear'
  },
  themeIntegration: {
    respectThemeColors: true,         // Don't override theme colors
    scopeAllOutput: true,             // Always use scoped CSS
    generateFallbacks: true           // Provide fallback values
  }
}
```

### **Enhanced Step 4: Scopes + Theme Coexistence**
**Purpose**: Context-aware component modifications that coexist with existing themes

**Layout Scopes (Enhanced with Coexistence)**:
```css
/* Studio generates scoped CSS that doesn't conflict */
[data-studio-scope="hero"] {
  --studio-hero-title-size: calc(var(--studio-text-lg) * 2);
  --studio-hero-padding: calc(var(--studio-space-4) * 3);
}

[data-studio-scope="hero"] .title {
  font-size: var(--studio-hero-title-size);
  color: var(--studio-color-primary);
  /* Theme's .title class remains untouched */
}

[data-studio-scope="card"] {
  --studio-card-title-size: var(--studio-text-lg);
  --studio-card-padding: var(--studio-space-4);
}

[data-studio-scope="card"] .title {
  font-size: var(--studio-card-title-size);
  /* Blocksy's card titles work independently */
}
```

**Helper Scopes (Theme-Safe)**:
```css
/* Holiday theme can apply to any Studio component */
[data-studio-scope] .holiday .title { 
  color: var(--studio-holiday-title-color); 
}
[data-studio-scope] .holiday .wrapper { 
  background: var(--studio-holiday-background); 
}
/* Theme's holiday styling remains separate */
```

---

## 🔧 **V2 THEME OUTPUT SYSTEM**

### **Dual Output Architecture**

#### **Option 1: Scoped CSS Mode (Default)**
```css
/* Studio generates theme-safe scoped CSS */
:root {
  /* Studio variables with prefixes to avoid conflicts */
  --studio-primary-h: 200;
  --studio-primary-s: 50%;
  --studio-primary-l: 50%;
  --studio-primary: hsl(var(--studio-primary-h) var(--studio-primary-s) var(--studio-primary-l));
  
  --studio-base-font: 1rem;
  --studio-scale: 1.25;
  --studio-text-lg: calc(var(--studio-base-font) * var(--studio-scale));
}

/* All Studio components scoped to prevent conflicts */
[data-studio-scope="hero"] {
  --hero-title-size: calc(var(--studio-text-lg) * 2);
  --hero-padding: calc(var(--studio-space-4) * 3);
}

[data-studio-scope="hero"] .title {
  font-size: var(--hero-title-size);
  color: var(--studio-primary);
}
```

#### **Option 2: Tailwind Mode (Optional)**
```css
/* Studio generates scoped Tailwind utilities */
[data-studio-scope] {
  /* Scoped Tailwind reset */
  .tw-text-lg { font-size: var(--studio-text-lg); }
  .tw-text-primary { color: var(--studio-primary); }
  .tw-p-4 { padding: var(--studio-space-4); }
}

/* Usage in components */
[data-studio-scope="hero"] .title.tw-text-lg.tw-text-primary {
  /* Tailwind utilities scoped to Studio components */
}
```

### **WordPress Integration Strategy V2**
```php
class StudioDesignSystemV2 {
    public function __construct() {
        add_action('init', [$this, 'init']);
        add_action('wp_enqueue_scripts', [$this, 'enqueue_scoped_styles']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_filter('wp_head', [$this, 'inject_studio_variables'], 1);
        // NO theme.json override - coexistence strategy
    }
    
    public function enqueue_scoped_styles() {
        // Only load Studio CSS, never override theme
        wp_enqueue_style('studio-scoped', $this->generate_scoped_css());
    }
}
```

---

## 🎮 **V2 AUTO-GENERATION CONTROLS SYSTEM**

### **GB Styles Integration Architecture**

#### **Auto-Control Generation Pipeline**
```javascript
// Parse Studio component properties and auto-generate controls
class StudioControlGenerator {
  generateControlsForComponent(componentProps) {
    return componentProps.map(prop => {
      // Auto-detect control type based on property
      if (prop.name.includes('color')) return <StudioColorControl />;
      if (prop.name.includes('size') || prop.name.includes('font')) return <StudioSizeControl />;
      if (prop.name.includes('spacing') || prop.name.includes('padding')) return <StudioSpacingControl />;
      if (prop.name.includes('border')) return <StudioBorderControl />;
      return <StudioTextInput />;
    });
  }
}
```

#### **Variable-Aware Control System**
```jsx
// Context-aware variable picker integration
<StudioPropertyGroup 
  label="Text Color"
  description="Color of the text content with Studio variable picker"
>
  <StudioColorVariableInput 
    data-shortcut="--studio-color-"  // Auto-filters to Studio color variables
    value={componentProps.textColor}
    onChange={(value) => updateComponentProperty('textColor', value)}
    onClick={() => {
      setContextFilter('--studio-color-');
      openStudioVariablePicker(inputRef.current, 'replace');
    }}
  />
</StudioPropertyGroup>
```

#### **Live Preview System Integration**
```javascript
// Real-time component editing with live preview
function updateStudioComponent(scope, property, value) {
  // Update Studio data
  updateStudioData(scope, property, value);
  
  // Immediately inject scoped CSS for live preview
  const scopedCSS = `[data-studio-scope="${scope}"] { --${property}: ${value}; }`;
  injectCSS(scopedCSS);
  
  // Update component preview
  refreshStudioPreview(scope);
}
```

### **Component Property Mapping**
```javascript
// Auto-generate controls based on Studio component definitions
const studioComponentMap = {
  hero: {
    title: { 
      type: 'typography',
      controls: ['fontSize', 'fontWeight', 'color', 'lineHeight'],
      variables: ['--studio-text-hero', '--studio-color-primary']
    },
    background: {
      type: 'color',
      controls: ['backgroundColor', 'backgroundImage', 'opacity'],
      variables: ['--studio-bg-hero', '--studio-hero-overlay']
    },
    spacing: {
      type: 'spacing',
      controls: ['padding', 'margin'],
      variables: ['--studio-space-hero-x', '--studio-space-hero-y']
    }
  }
};
```

---

## 📱 **V2 PAGE ARCHITECTURE WITH AUTO-GENERATION**

### **Enhanced Colors Page**
**NEW Tab**: **Auto-Generation Controls**
- **Component Color Editor**: Visual controls for each component's color properties
- **Live Preview**: Real-time component rendering with color changes
- **Variable Picker**: Context-aware variable suggestions
- **Scope Testing**: See how colors look in different scopes (hero, card, etc.)

**Implementation**:
```jsx
<ColorAutoGenTab>
  <ComponentSelector 
    components={['hero', 'card', 'button', 'testimonial']}
    selectedComponent="hero"
  />
  
  <PropertyPanel component="hero">
    <StudioColorControl 
      label="Title Color"
      property="titleColor"
      variablePrefix="--studio-color-"
      livePreview={true}
    />
    <StudioColorControl 
      label="Background Color"
      property="backgroundColor"
      variablePrefix="--studio-bg-"
      livePreview={true}
    />
  </PropertyPanel>
  
  <LivePreview 
    component="hero"
    scope="data-studio-scope"
    sampleContent={heroSampleContent}
  />
</ColorAutoGenTab>
```

### **Enhanced Typography Page**
**NEW Tab**: **Component Typography Controls**
- **Auto-Generated Typography Controls**: Visual font size, weight, line height editing
- **Component-Specific Editing**: Different settings for hero vs card vs button text
- **Scoped Preview**: See typography in different component contexts

### **NEW Page: Component Editor**
**Purpose**: Visual component editing with auto-generated controls

**Features**:
- **Component Library**: All Studio components (hero, card, CTA, etc.)
- **Property Panels**: Auto-generated controls for each component
- **Live Preview**: Real-time component rendering
- **Scope Management**: Visual scope assignment and testing
- **Export**: Generate scoped CSS for integration

---

## 🔌 **V2 WORDPRESS INTEGRATION & TESTING**

### **Blocksy Theme Test Environment**
```
Test Setup:
1. Blocksy theme active
2. WooCommerce plugin active  
3. Studio plugin active
4. Test with existing Blocksy styling
```

**Test Scenarios**:
- Studio hero component + Blocksy navigation ✅
- Studio CTA + Blocksy blog layout ✅
- Studio testimonials + WooCommerce product pages ✅
- No CSS conflicts or overrides ✅

### **Theme Compatibility Layer**
```php
class StudioThemeCompatibility {
    public function detectActiveTheme() {
        $theme = wp_get_theme();
        return [
            'name' => $theme->get('Name'),
            'version' => $theme->get('Version'),
            'features' => $this->analyzeThemeFeatures(),
            'conflicts' => $this->detectPotentialConflicts()
        ];
    }
    
    public function generateScopedOutput($components) {
        // Generate CSS that doesn't interfere with detected theme
        $css = ":root {\n";
        foreach ($this->studioVariables as $var => $value) {
            $css .= "  --studio-{$var}: {$value};\n";
        }
        $css .= "}\n\n";
        
        foreach ($components as $component) {
            $css .= $this->generateScopedComponent($component);
        }
        
        return $css;
    }
}
```

---

## 🚀 **V2 DEVELOPMENT PHASES**

### **Phase 1: Foundation + Coexistence (Weeks 1-3)**
- [ ] Project setup with TypeScript + Redux architecture
- [ ] Shadow DOM admin interface (isolated from user themes)
- [ ] Theme detection and compatibility system
- [ ] Basic scoped CSS generation
- [ ] Blocksy theme test environment setup

### **Phase 2: Auto-Generation Controls (Weeks 4-6)**
- [ ] GB Styles-inspired control generation system
- [ ] Component property mapping
- [ ] Variable-aware input system with context filtering
- [ ] Live preview integration
- [ ] Basic component editing interface

### **Phase 3: Complete Visual Editor (Weeks 7-9)**
- [ ] Component Editor page with full auto-generation
- [ ] Enhanced Colors/Typography pages with visual controls
- [ ] Scope management and preview system
- [ ] Export functionality for scoped CSS
- [ ] Tailwind mode implementation

### **Phase 4: Polish + Production (Weeks 10-12)**
- [ ] Performance optimization
- [ ] Comprehensive theme compatibility testing
- [ ] User testing and feedback integration
- [ ] Documentation and guides
- [ ] Production deployment preparation

---

## 📋 **V2 SUCCESS METRICS**

### **Technical Goals V2**
- [ ] Zero conflicts with popular WordPress themes (Blocksy, Astra, GeneratePress)
- [ ] Auto-generate visual controls for all component properties
- [ ] Real-time preview with < 100ms update time
- [ ] Scoped CSS output that coexists with any theme
- [ ] Component editing interface matching professional design tools

### **User Experience Goals V2**
- [ ] Seamless integration with existing WordPress sites
- [ ] Visual component editing without CSS knowledge
- [ ] Professional auto-generated controls (like Figma/Webflow)
- [ ] No learning curve for existing theme users

### **Coexistence Goals**
- [ ] Works with WooCommerce without conflicts
- [ ] Preserves all existing theme functionality
- [ ] No override of theme.json or core theme files
- [ ] Professional agency workflow with multiple themes

---

## 🎯 **IMMEDIATE V2 IMPLEMENTATION STRATEGY**

### **1. Plugin Styling Strategy**
- **Admin Interface**: Shadow DOM (like GB Styles) for complete isolation
- **User Output**: Scoped CSS with `[data-studio-scope]` attributes
- **Testing**: Set up with Blocksy theme to ensure coexistence

### **2. Auto-Generation Integration**
- **Phase 1**: Basic property-to-control mapping
- **Phase 2**: Variable picker integration with Studio variables
- **Phase 3**: Full visual component editor

### **3. Dual Output Support**
- **Default**: Scoped CSS mode for theme compatibility
- **Optional**: Tailwind mode for developers who prefer utility classes
- **Both**: Use scoping to prevent conflicts

---

## 📚 **GUTENBERG-STYLES PLUGIN REFERENCE**

### **Complete Plugin Structure Documentation**
*For reference during Studio development - based on current GB Styles v1.1.2*

#### **Root Level Files**
```
Gutenberg-Styles/
├── gb-styles.php                    # Main plugin file (v1.1.2)
├── activation.php                   # Plugin activation/deactivation hooks
├── admin-page.php                   # WordPress admin page registration
├── block-css.php                    # Block-specific CSS injection
├── class-gb-styles-theme-json-integrator.php  # Theme.json integration
├── blank.php                        # Blank template file
├── CLAUDE.md                        # Development guidance for AI
├── PUBLIC-API.md                    # Public API documentation
├── README.md                        # Plugin documentation
├── release.json                     # Release configuration
└── creds.json                       # Credentials/configuration
```

#### **API Layer (`/api/`)**
```
api/
├── class-gb-styles-database.php              # CSS classes database operations
├── class-gb-styles-rest-controller.php       # CSS files REST endpoints
├── class-gb-styles-css-classes-controller.php # CSS classes REST endpoints  
├── class-gb-styles-compiler-controller.php   # CSS compilation REST endpoints
├── class-gb-styles-compiler.php              # Unified CSS compilation engine
├── class-gb-styles-breakpoint-parser.php     # Dynamic breakpoint parsing
├── endpoints/
│   └── css.php                               # CSS-specific endpoints
└── index.php                                 # Directory protection
```

#### **React Application (`/gb-styles-react/`)**
```
gb-styles-react/
├── package.json                     # Dependencies: React 18, TypeScript, Vite
├── vite.config.ts                   # Build configuration (UMD bundle)
├── tsconfig.json                    # TypeScript configuration
├── index.html                       # Development HTML template
├── global.d.ts                      # Global TypeScript definitions
└── src/                            # React application source
```

#### **React Source Structure (`/src/`)**
```
src/
├── main.jsx                         # Application entry point
├── SimpleApp.jsx                    # Main app component with shadow DOM
├── AdminStyles.jsx                  # Admin-specific styling
├── ShadowStyles.jsx                 # Shadow DOM style encapsulation
├── types.ts                         # TypeScript type definitions
│
├── components/                      # UI Components Library
│   ├── AppPanel/                    # Main resizable panel container
│   ├── BlockCSSEditor/              # CSS editing interface
│   ├── BlockCSSTab/                 # Block-specific CSS management
│   ├── BlockManager/                # Block operations management
│   ├── ClassesTab/                  # ⭐ AUTO-GENERATION CONTROLS SYSTEM
│   ├── CommandPalette/              # Search interface (cmdk)
│   ├── Gutenberg/                   # WordPress Gutenberg integration
│   ├── LiveEditor/                  # Monaco code editor integration
│   ├── StyleFileManager/            # CSS file management
│   ├── StylesheetsTab/              # Stylesheet operations
│   ├── WindowManager/               # Window state management
│   ├── Chat/                        # AI chat integration
│   └── ui/                          # Primitive UI components
│
├── store/                           # Zustand State Management
│   ├── app.store.ts                 # Global app state
│   ├── classes.store.ts             # CSS classes CRUD operations
│   ├── styles.store.js              # CSS files management
│   ├── variables.store.ts           # CSS variables extraction
│   ├── compiledCSS.store.ts         # Unified compilation state
│   ├── gutenberg.store.ts           # WordPress integration state
│   ├── sidebar.store.ts             # Sidebar management
│   ├── theme.store.ts               # Theme variables state
│   ├── toast.store.ts               # Notification system
│   ├── variablePicker.store.ts      # Variable picker state
│   └── window.store.ts              # Window management
│
├── services/                        # Business Logic Layer
│   ├── api.ts                       # WordPress REST API integration
│   ├── blockAPI.js                  # Block operations API
│   ├── blockInserter.ts             # Block insertion service
│   ├── classesInjector.ts           # CSS class injection
│   ├── compilerAPI.ts               # CSS compilation API
│   ├── cssInjector.ts               # Live CSS injection
│   ├── gutenbergAPI.ts              # Gutenberg editor API
│   ├── heightCalculator.ts          # UI height calculations
│   ├── monacoAutocomplete.ts        # Code editor autocomplete
│   ├── styleCollector.ts            # CSS parsing and collection
│   ├── stylesheetParser.ts          # CSS parsing utilities
│   ├── themeVariables.ts            # ⭐ THEME VARIABLE AUTO-PARSING
│   ├── variablesCollector.ts        # CSS variables extraction
│   └── wordpress.ts                 # WordPress utilities
│
├── hooks/                           # React Custom Hooks
│   ├── useKeyboardNavigation.js     # Keyboard navigation
│   ├── useKeyboardShortcuts.js      # Keyboard shortcuts
│   ├── useStyleCollector.js         # Style collection hook
│   └── useVariablePicker.js         # ⭐ VARIABLE PICKER HOOK
│
├── providers/                       # React Context Providers
│   └── VariablePickerProvider.jsx   # Variable picker context
│
├── data/                           # Static Data
│   └── themeVars.js                # Theme variable definitions
│
├── styles/                         # Styling
│   ├── _globals.css                # Global styles
│   ├── _variables.css              # CSS variables
│   ├── chat.css                    # Chat-specific styles
│   └── example-vars.css            # Example variables
│
└── utils/                          # Utility Functions
    ├── blockIcons.jsx              # Block icon utilities
    ├── cn.js                       # Class name utilities
    ├── colors.js                   # Color manipulation
    ├── cssBeautifier.js            # CSS formatting
    ├── dom.js                      # DOM manipulation
    └── iconRenderer.jsx            # Icon rendering
```

#### **⭐ Key Auto-Generation Components (`/components/ClassesTab/`)**
```
ClassesTab/                          # AUTO-GENERATION CONTROLS SYSTEM
├── ClassesTab.jsx                   # Main tab component
├── PropertyEditor.jsx               # Property editing interface
├── PropertyPanels.jsx               # Panel organization
├── ClassManager.jsx                 # CSS class management
├── CSSPreview.jsx                   # Live CSS preview
├── BreakpointTabs.jsx              # Responsive editing tabs
├── CreateClassModal.jsx            # Class creation interface
│
├── controls/                        # ⭐ AUTO-GENERATED CONTROLS
│   ├── EnhancedBoxShadowControl.jsx # Shadow editing
│   ├── EnhancedOpacityControl.jsx   # Opacity slider
│   ├── EnhancedSizeControl.jsx      # Size/dimension input
│   ├── EnhancedSpacingControl.jsx   # Spacing controls
│   ├── FontSizeControl.jsx          # Typography size control
│   ├── FontWeightControl.jsx        # Font weight selector
│   ├── LetterSpacingControl.jsx     # Letter spacing input
│   ├── LineHeightControl.jsx        # Line height control
│   ├── SpacingControl.jsx           # Padding/margin control
│   └── VisualInputToggle.jsx        # Visual/text input toggle
│
├── enhanced/                        # ⭐ ENHANCED VISUAL CONTROLS
│   ├── ColorControl.jsx             # Advanced color picker
│   ├── DimensionControl.jsx         # Width/height controls
│   ├── DisplayControl.jsx           # CSS display property
│   ├── FlexControls.jsx             # Flexbox controls
│   ├── FontSizeControl.jsx          # Enhanced typography
│   ├── GridControls.jsx             # CSS Grid controls
│   ├── PositionControl.jsx          # CSS positioning
│   └── SpacingControl.jsx           # Enhanced spacing
│
├── panels-new/                      # ⭐ PROPERTY PANEL SYSTEM
│   ├── BackgroundPanel.jsx          # Background properties
│   ├── BorderPanel.jsx              # Border properties
│   ├── DimensionPanel.jsx           # Size properties
│   ├── LayoutPanel.jsx              # Layout properties
│   ├── SelectorVariablesPanel.jsx   # Variable assignment
│   ├── ShadowPanel.jsx              # Shadow properties
│   ├── TransitionsPanel.jsx         # Animation properties
│   ├── TypographyPanel.jsx          # Typography properties
│   └── VisibilityPanel.jsx          # Display/visibility
│
├── primitives/                      # ⭐ PRIMITIVE CONTROLS
│   ├── ColorVariableInput.jsx       # Color with variable picker
│   ├── FontWeightControl.jsx        # Font weight primitive
│   ├── MediaPicker.jsx              # Media selection
│   └── TextInput.jsx                # Enhanced text input
│
└── core/                           # Core UI Components
    ├── Accordion.jsx               # Collapsible sections
    ├── Dialog.jsx                  # Modal dialogs
    ├── Select.jsx                  # Dropdown selectors
    ├── Switch.jsx                  # Toggle switches
    ├── Tabs.jsx                    # Tab interface
    └── Tooltip.jsx                 # Tooltip system
```

#### **WordPress Integration Files**
```
gb-styles-react/includes/api/        # WordPress PHP Integration
├── class-gb-apis.php               # API registration
├── class-gb-styles-context-controller.php  # Context management
├── class-html-to-generateblocks-api.php    # Block conversion API
├── class-html-to-generateblocks-converter.php  # HTML-to-blocks conversion
├── class-public-global-styles-proxy.php    # Public API proxy
│
├── providers/                      # Block Provider System
│   ├── abstract-gb-base-provider.php       # Base provider class
│   ├── class-gb-custom-element-provider.php # Custom elements
│   ├── class-gb-element-provider.php       # Standard elements
│   ├── class-gb-fallback-provider.php      # Fallback provider
│   ├── class-gb-media-provider.php         # Media handling
│   ├── class-gb-provider-manager.php       # Provider coordination
│   ├── class-gb-shape-provider.php         # Shape elements
│   ├── class-gb-tabs-provider.php          # Tab components
│   ├── class-gb-text-provider.php          # Text elements
│   └── interface-gb-block-provider.php     # Provider interface
│
└── examples/                       # Example Components
    ├── accordion-example.html       # Accordion markup
    ├── query-card.html             # Query card example
    ├── shape-example.html          # Shape example
    └── tabs-example.html           # Tabs example
```

#### **Key Auto-Generation Features for Studio Integration**

##### **1. Theme Variable Auto-Parsing (`themeVariables.ts`)**
```javascript
// Automatically parses CSS custom properties and categorizes them
parseVariables(cssContent: string) {
  const customPropertyRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;
  // Categories: color, spacing, text, radius, shadow, etc.
}
```

##### **2. Property-to-Control Mapping**
```javascript
// Auto-generates appropriate control types based on CSS property
const controlMap = {
  'color': ColorVariableInput,
  'background': ColorVariableInput,
  'font-size': FontSizeControl,
  'padding': SpacingControl,
  'margin': SpacingControl,
  'border-radius': SizeControl,
  'box-shadow': BoxShadowControl
};
```

##### **3. Variable Picker Context System**
```javascript
// Context-aware variable filtering with data-shortcut attributes
<TextInput 
  data-shortcut="--color-"    // Pre-filters to color variables
  onClick={() => openVariablePicker('--color-')}
/>
```

##### **4. Live CSS Injection System**
```javascript
// Real-time CSS updates without page refresh
function updateProperty(classId, property, value) {
  const css = `.${classId} { ${property}: ${value}; }`;
  injectCSS(css);  // Immediate visual feedback
}
```

##### **5. Scoped CSS Generation**
```javascript
// Generates scoped CSS with data attributes
generateScopedCSS(className, properties) {
  return `[data-component="${scope}"] .${className} { ${properties} }`;
}
```

#### **Database Schema**
```sql
-- CSS Classes Storage
wp_gb_styles_css_classes (
  id, user_id, class_name, selector, breakpoint, 
  created_at, updated_at
)

-- CSS Class Properties  
wp_gb_styles_css_class_properties (
  id, class_id, property, value, breakpoint,
  created_at, updated_at
)
```

#### **File Storage System**
```
/wp-content/uploads/gb-styles/
├── styles.json          # Multi-file CSS storage
├── global.css          # Compiled CSS output
└── theme.css           # Theme variables (for breakpoint parsing)
```

#### **REST API Endpoints**
```
/wp-json/gb-styles/v1/css              # CSS file operations
/wp-json/gb-styles/v1/css-classes      # CSS classes CRUD
/wp-json/gb-styles/v1/compile          # CSS compilation
/wp-json/gb-styles/v1/compile/public   # Public API access
```

This comprehensive structure provides the foundation for integrating GB Styles' auto-generation capabilities into the Studio admin interface, particularly the visual control system and property-to-control mapping functionality.

---

**🚀 This V2 architecture provides a complete roadmap for building The Studio as a professional, theme-compatible, auto-generation-enabled design system builder that works alongside any WordPress theme without conflicts.**

---

*Last Updated: June 29, 2025*  
*Key Changes: Coexistence strategy, auto-generation controls, dual output modes, theme compatibility, GB Styles integration reference*  
*Next Phase: Begin Phase 1 implementation with Blocksy test environment*