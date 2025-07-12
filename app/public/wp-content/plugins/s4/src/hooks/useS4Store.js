import { create } from 'zustand';

// S4 Store - Clean V2.0 State Management
export const useS4Store = create((set, get) => ({
  // Configuration state
  config: {
    brand: {
      color1: 'hsl(337, 35%, 52%)',
      color2: 'hsl(29, 44%, 53%)',
      color3: 'hsl(0, 0%, 50%)',
      color4: 'hsl(0, 0%, 70%)'
    },
    theme: 'dark',
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
