# Studio4 Master Roadmap

## Vision
Studio4 is a visual theme building system for WordPress that implements the S4 (4-Layer Scope System) architecture. It enables users to create consistent, scalable design systems through an intuitive interface.

## S4 System Architecture Overview

### Layer 1: Brand Tokens (Foundation)
- **Brand Colors**: 4 core colors that define the entire system
- **Typography Stack**: Font families and base sizing

### Layer 2: Global Elements
- **Core Elements**: section, container, wrapper, title, subtitle, text, button, etc.
- **Every property defined**: color, background, border, spacing, etc.
- **Generates CSS variables**: for complete control

### Layer 3: Component Scopes
- **Layout Components**: hero, card, sidebar, footer
- **Modifies global elements**: within component context
- **Scalable system**: consistent variations

### Layer 4: Helper Scopes
- **State modifiers**: hover, active, focus
- **Hierarchy**: visual importance through modifications
- **Utilities**: specific adjustments

## Development Phases

### Phase 1: Foundation Setup ✅
- [x] WordPress plugin structure (using Daniel's R2WC boilerplate)
- [x] React Shadow DOM implementation
- [x] Zustand state management with persistence
- [x] Basic S4 theme builder interface

### Phase 2: Brand & Typography (CURRENT) 🔄
- [x] Brand color picker with HSL controls
- [x] Color persistence
- [ ] Typography stack selection
- [ ] Font management system
- [ ] Base sizing controls

### Phase 3: Global Elements System 📋
- [ ] Define complete element list:
  - section, container, wrapper
  - title, subtitle, pretitle, text
  - button-primary, button-secondary
  - link, list, divider
- [ ] Property matrix for each element:
  - color, background-color
  - border, border-radius
  - padding, margin
  - font-size, line-height
  - opacity, transition
- [ ] Generate comprehensive CSS variables

### Phase 4: Color Preset System 📋
- [ ] Default color preset (baseline mapping)
- [ ] Emphasis preset (high contrast)
- [ ] Dark mode preset
- [ ] Custom preset creation
- [ ] Preview all elements with presets

### Phase 5: Helper Presets 📋
- [ ] Typography hierarchy (lightness/opacity scales)
- [ ] Interactive states (hover, active, focus)
- [ ] Saturation modifiers (vibrant, muted, grayscale)
- [ ] Custom helper creation

### Phase 6: Component Scopes 📋
- [ ] Hero scope variations:
  - Center aligned
  - Half-page split
  - Full-width background
- [ ] Card scope variations:
  - Grid layout
  - List layout
  - Featured card
- [ ] Sidebar scope
- [ ] Footer scope

### Phase 7: Layout Transformations 📋
- [ ] Component layout engine
- [ ] Responsive variations
- [ ] Animation transitions
- [ ] Layout preset library

### Phase 8: Integration & Export 📋
- [ ] CSS generation engine
- [ ] WordPress theme export
- [ ] Gutenberg block styles
- [ ] JSON configuration export
- [ ] Import/export system

### Phase 9: Advanced Features 📋
- [ ] Project/client management
- [ ] Asset management (logos, images)
- [ ] Version control
- [ ] Collaboration features
- [ ] AI-powered suggestions

## User Journey Flow

### 1. Initial Setup
```
Welcome → New Project → Brand Setup → Typography
```

### 2. Design System Creation
```
Global Elements → Define Properties → Color Presets → Helper Presets
```

### 3. Component Configuration
```
Component Scopes → Layout Options → Preview → Refinement
```

### 4. Export & Implementation
```
Review → Export Options → Download → WordPress Integration
```

## Technical Architecture

### Frontend Stack
- React 18 with Hooks
- Zustand for state management
- Tailwind CSS 4 for UI
- Shadow DOM isolation
- Radix UI components

### WordPress Integration
- Custom post types for projects
- REST API endpoints
- Block editor support
- Theme export functionality

### S4 Processing Engine
- CSS variable generation
- Cascade calculation
- Preset application
- Real-time preview

## Success Metrics
- Complete S4 system implementation
- Intuitive user interface
- < 5 minute learning curve
- Export-ready themes
- WordPress compatibility

## Current Status (January 2025)
- ✅ Plugin architecture complete
- ✅ Basic theme builder interface
- ✅ Color management working
- ❌ Removed incorrect "layouts" (spacing/sizing)
- 🔄 Refocusing on proper S4 flow
- 📋 Next: Typography stack & Global Elements

## Next Immediate Steps
1. Remove current layouts tab
2. Add Typography to Brand section
3. Create Global Elements interface
4. Build property matrix system
5. Implement color preset mapping