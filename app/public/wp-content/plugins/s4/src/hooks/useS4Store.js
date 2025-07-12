import { create } from 'zustand';

// S4 Store - Clean V2.0 State Management
export const useS4Store = create((set, get) => ({
  // Configuration state
  config: {
    brand: {
      primary: 'hsla(330, 85%, 60%, 1)',
      secondary: 'hsla(25, 95%, 65%, 1)', 
      neutral: 'hsla(220, 15%, 25%, 1)',
      accent: 'hsla(280, 75%, 70%, 1)'
    },
    typography: {
      'font-family': 'system-ui, -apple-system, sans-serif'
    }
  },
  
  // UI state
  isLoaded: false,
  activeTab: 'dashboard',
  
  // Actions
  initializeStore: (wpConfig) => {
    set((state) => ({
      config: { ...state.config, ...wpConfig },
      isLoaded: true
    }));
  },
  
  updateConfig: (newConfig) => {
    set((state) => ({
      config: { ...state.config, ...newConfig }
    }));
  },
  
  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
  
  // Get current config
  getConfig: () => get().config
}));
