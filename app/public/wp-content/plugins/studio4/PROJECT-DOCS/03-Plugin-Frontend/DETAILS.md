# PLUGIN FRONTEND - DETAILS

*References: [01-Design-System-Framework](../01-Design-System-Framework/) + [02-Plugin-System](../02-Plugin-System/)*

## USER JOURNEY IMPLEMENTATION
**Goal**: Users create themes using the Design System Framework through a visual interface

## STEP 1: THEME GLOBAL ELEMENTS
Users define base elements that all components inherit from.

### Color System
- **Interface**: HSL sliders in accordion
- **Output**: CSS variables in :root
- **Preview**: Real-time updates in preview area

### Typography System
- **Font Stack**: System fonts + Google Fonts integration
- **Base Size**: 1rem default, scalable
- **Global Elements**: title, subtitle, description, body, quote, caption, label
- **Properties**: fontSize, fontWeight, lineHeight, color, margin, textTransform

### UI Global Elements
- **Wrapper**: background, padding, border, borderRadius
- **Button**: background, color, padding, borderRadius, fontWeight
- **Link**: color, textDecoration, fontWeight
- **Input**: background, border, padding, borderRadius, color

### Layout Global Elements
- **Section**: width, padding, minHeight, background
- **Container**: maxWidth, padding, margin
- **Grid**: gridTemplateColumns, gap, padding

## STEP 2: COMPONENT SCOPES
Users create specific components that override global elements.

### Implementation
- **Scope Selection**: Dropdown of available scopes (hero, card, sidebar)
- **Property Override**: Copy global element properties, allow modifications
- **Live Preview**: Show component with applied scope

## STEP 3: PRESETS
Users apply preset combinations for quick styling.

### Preset Types
- **Color Presets**: Map brand colors to elements
- **Typography Presets**: Set size relationships and hierarchy
- **Layout Presets**: Transform component layouts
- **Helper Presets**: Apply modifications (hover, emphasis)

## STEP 4: SECTIONS
Users assemble complete page sections.

### Assembly Interface
- **Drag & Drop**: Combine scopes into sections
- **Live Preview**: Real-time rendering with all presets
- **Export**: Generate CSS for WordPress theme integration

## TECHNICAL IMPLEMENTATION
- **State Management**: Zustand store with S4 system data
- **CSS Generation**: S4PresetProcessor converts JSON to CSS
- **Preview System**: Inject generated CSS into preview iframe
- **Persistence**: Save to WordPress database via REST API