/**
 * S4 System TypeScript Type Definitions
 * Core types for the Visual Theme Builder
 */

// Color Types
export interface HSLColor {
  h: number;  // 0-360
  s: number;  // 0-100
  l: number;  // 0-100
}

export interface BrandToken {
  name: string;
  value: HSLColor;
  id: string;
}

export interface BrandTokens {
  color1: BrandToken;
  color2: BrandToken;
  color3: BrandToken;
  color4: BrandToken;
}

// Color Preset Types
export interface ColorAssignment {
  bg?: string;
  color?: string;
  [key: string]: string | undefined;
}

export interface ColorPreset {
  name: string;
  description: string;
  assignments: {
    section?: ColorAssignment;
    container?: ColorAssignment;
    wrapper?: ColorAssignment;
    pretitle?: ColorAssignment;
    title?: ColorAssignment;
    subtitle?: ColorAssignment;
    description?: ColorAssignment;
    button?: ColorAssignment;
    [key: string]: ColorAssignment | undefined;
  };
}

// Layout Preset Types
export interface LayoutModification {
  'flex-direction'?: string;
  'justify-content'?: string;
  'align-items'?: string;
  padding?: string;
  'max-width'?: string;
  flex?: string;
  display?: string;
  width?: string;
  height?: string;
  position?: string;
  opacity?: string;
  'z-index'?: string;
  'text-align'?: string;
  gap?: string;
  [key: string]: string | undefined;
}

export interface LayoutPreset {
  name: string;
  description: string;
  modifications: {
    section?: LayoutModification;
    container?: LayoutModification;
    wrapper?: LayoutModification;
    'media-container'?: LayoutModification;
    [key: string]: LayoutModification | undefined;
  };
  colorOverrides?: {
    [element: string]: ColorAssignment;
  };
}

// Helper Preset Types
export interface ColorOperation {
  operation: 'set' | 'adjust' | 'multiply' | 'divide';
  value: number;
}

export interface HelperModification {
  hue?: ColorOperation;
  saturation?: ColorOperation;
  lightness?: ColorOperation;
  opacity?: number;
}

export interface HelperPreset {
  name: string;
  description: string;
  modifications: {
    [element: string]: HelperModification;
  };
}

export interface HelperPresetCategory {
  [presetKey: string]: HelperPreset;
}

// Scope Types
export interface ScopeModifier {
  scale?: number;
  intensity?: number;
  [key: string]: number | undefined;
}

export interface ComponentScope {
  name: string;
  modifiers: {
    [element: string]: ScopeModifier;
  };
}

// Complete S4 Preset System
export interface S4PresetSystem {
  brandTokens: {
    colors: {
      [key: string]: BrandToken;
    };
  };
  colorPresets: {
    [presetKey: string]: ColorPreset;
  };
  layoutPresets: {
    [presetKey: string]: LayoutPreset;
  };
  helperPresets: {
    typography?: HelperPresetCategory;
    interactive?: HelperPresetCategory;
    saturation?: HelperPresetCategory;
    [category: string]: HelperPresetCategory | undefined;
  };
  scopes: {
    layout: {
      [scopeKey: string]: ComponentScope;
    };
  };
}

// UI State Types
export interface ThemeBuilderState {
  activeProject: string | null;
  activeColorPreset: string;
  activeLayoutPreset: string;
  activeScope: string;
  activeHelpers: {
    typography?: string;
    saturation?: string;
    interactive?: string;
  };
  previewMode: 'desktop' | 'tablet' | 'mobile';
  isDarkMode: boolean;
}

// Export/Import Types
export interface S4Export {
  version: string;
  name: string;
  created: string;
  presets: S4PresetSystem;
  metadata?: {
    author?: string;
    description?: string;
    tags?: string[];
  };
}