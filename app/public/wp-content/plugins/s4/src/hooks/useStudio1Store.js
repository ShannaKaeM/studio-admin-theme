import { create } from 'zustand';

/**
 * Studio1 Store - UI State + WordPress Integration Only
 * 
 * PURPOSE: UI state management + WordPress backend integration
 * SCOPE: Tab navigation, loading states, WordPress config data
 * SEPARATION: Works independently of useThemeConfig (user content management)
 * 
 * Uses Zustand for Daniel's R2WC boilerplate compatibility
 */
export const useStudio1Store = create((set, get) => ({
  // UI state for future tab system
  activeTab: 'scopes', // Default to scopes (current single page)
  isLoaded: false,
  
  // WordPress integration config (received from WP backend)
  wpConfig: {},
  
  // Actions
  initializeStore: (wpConfig) => {
    set({ 
      wpConfig: wpConfig || {},
      isLoaded: true 
    });
  },
  
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
  
  // Get WordPress config for integration purposes
  getWpConfig: () => get().wpConfig,
  
  // Get current UI state
  getActiveTab: () => get().activeTab,
  getIsLoaded: () => get().isLoaded
}));
