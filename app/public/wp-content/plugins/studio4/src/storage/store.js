import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/**
 * Main application store with localStorage persistence
 * Manages panel state, settings, and UI preferences
 */
export const useStore = create(
  persist(
    (set, get) => ({
      // Panel state
      isPanelOpen: false,
      panelPosition: 'right', // 'left', 'right', 'center'
      
      // Search and command state
      searchQuery: '',
      selectedCommandIndex: 0,
      
      // Settings
      settings: {
        enableNotifications: false,
        theme: 'dark',
        enableKeyboardShortcuts: true,
        autoOpenPanel: false, // Changed to false for better persistence behavior
        panelWidth: 500,
        enableAnimations: true,
      },
      
      // Demo mode
      isDemoMode: true,
      
      // S4 Theme Builder State
      s4BrandColors: {
        color1: 'hsl(337, 35%, 52%)', // Studio4 Pink Primary
        color2: 'hsl(29, 44%, 53%)',  // Studio4 Tangerine Secondary
        color3: 'hsl(0, 0%, 20%)',    // Neutral Dark
        color4: 'hsl(0, 0%, 98%)',    // Base Light
      },
      s4ActiveColorPreset: 'default-colors',
      s4ActiveLayoutPreset: 'balanced',
      s4ActiveHelpers: [],
      s4LayoutSettings: {
        spacing: { base: 1, scale: 1.5 },
        sizing: { base: 16, scale: 1.333 },
        container: { maxWidth: 1280, padding: 24 },
        grid: { gap: 24, columns: 12 }
      },
      
      // Actions
      togglePanel: () => set((state) => ({ 
        isPanelOpen: !state.isPanelOpen 
      })),
      
      openPanel: () => set({ isPanelOpen: true }),
      
      closePanel: () => set({ isPanelOpen: false }),
      
      setPanelPosition: (position) => set({ panelPosition: position }),
      
      setSearchQuery: (query) => set({ 
        searchQuery: query,
        selectedCommandIndex: 0 // Reset selection when search changes
      }),
      
      setSelectedCommandIndex: (index) => set({ 
        selectedCommandIndex: index 
      }),
      
      updateSetting: (key, value) => set((state) => ({
        settings: {
          ...state.settings,
          [key]: value
        }
      })),
      
      updateSettings: (newSettings) => set((state) => ({
        settings: {
          ...state.settings,
          ...newSettings
        }
      })),
      
      resetSettings: () => set((state) => ({
        settings: {
          enableNotifications: false,
          theme: 'dark',
          enableKeyboardShortcuts: true,
          autoOpenPanel: false, // Changed to false for consistency
          panelWidth: 500,
          enableAnimations: true,
        }
      })),
      
      setDemoMode: (enabled) => set({ isDemoMode: enabled }),
      
      // S4 Actions
      setS4BrandColors: (colors) => set({ s4BrandColors: colors }),
      updateS4BrandColor: (colorKey, value) => set((state) => ({
        s4BrandColors: {
          ...state.s4BrandColors,
          [colorKey]: value
        }
      })),
      setS4ActiveColorPreset: (preset) => set({ s4ActiveColorPreset: preset }),
      setS4ActiveLayoutPreset: (preset) => set({ s4ActiveLayoutPreset: preset }),
      setS4ActiveHelpers: (helpers) => set({ s4ActiveHelpers: helpers }),
      setS4LayoutSettings: (settings) => set({ s4LayoutSettings: settings }),
      updateS4LayoutSetting: (category, key, value) => set((state) => ({
        s4LayoutSettings: {
          ...state.s4LayoutSettings,
          [category]: {
            ...state.s4LayoutSettings[category],
            [key]: value
          }
        }
      })),
      
      // Computed getters
      getFilteredCommands: (commands) => {
        const { searchQuery } = get();
        if (!searchQuery.trim()) return commands;
        
        return commands.filter(command =>
          command.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          command.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (command.keywords && command.keywords.some(keyword => 
            keyword.toLowerCase().includes(searchQuery.toLowerCase())
          ))
        );
      },
      
      // localStorage helpers
      exportSettings: () => {
        const { settings, panelPosition } = get();
        return JSON.stringify({ settings, panelPosition }, null, 2);
      },
      
      importSettings: (jsonString) => {
        try {
          const imported = JSON.parse(jsonString);
          if (imported.settings) {
            set((state) => ({
              settings: { ...state.settings, ...imported.settings }
            }));
          }
          if (imported.panelPosition) {
            set({ panelPosition: imported.panelPosition });
          }
          return true;
        } catch (error) {
          console.error('Failed to import settings:', error);
          return false;
        }
      }
    }),
    {
      name: 'shadow-plugin-storage', // localStorage key
      storage: createJSONStorage(() => localStorage),
      
      // Only persist certain parts of the state
      partialize: (state) => ({
        isPanelOpen: state.isPanelOpen,
        panelPosition: state.panelPosition,
        settings: state.settings,
        isDemoMode: state.isDemoMode,
        s4BrandColors: state.s4BrandColors,
        s4ActiveColorPreset: state.s4ActiveColorPreset,
        s4ActiveLayoutPreset: state.s4ActiveLayoutPreset,
        s4LayoutSettings: state.s4LayoutSettings,
        s4ActiveHelpers: state.s4ActiveHelpers,
      }),
      
      // Handle storage events for cross-tab sync
      onRehydrateStorage: () => (state) => {
        console.log('💾 Zustand store rehydrated from localStorage');
        
        // Respect the persistent panel state - don't auto-open if state exists
        // The isPanelOpen value from localStorage should be maintained
        console.log('🔄 Panel state from storage:', state?.isPanelOpen);
        
        // Only auto-open on very first visit when no storage exists
        if (!state && window.innerWidth > 768) {
          setTimeout(() => {
            useStore.getState().openPanel();
          }, 500);
        }
      },
    }
  )
);

/**
 * Store for WordPress integration data
 * This data comes from server-side and doesn't need persistence
 */
export const useWordPressStore = create((set, get) => ({
  // Server data
  serverData: {
    userRole: 'guest',
    siteUrl: '',
    userId: 0,
    settings: {},
    apiNonce: '',
    pluginVersion: '1.0.0',
    isAdmin: false,
    theme: 'dark'
  },
  
  // API state
  isLoading: false,
  error: null,
  lastApiCall: null,
  
  // Actions
  setServerData: (data) => set({ serverData: data }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  clearError: () => set({ error: null }),
  
  // API helpers
  makeApiCall: async (endpoint, options = {}) => {
    const { serverData } = get();
    set({ isLoading: true, error: null });
    
    try {
      const apiUrl = window.shadowPluginData?.apiUrl || '/wp-json/shadow-plugin/v1/';
      const url = `${apiUrl}${endpoint}`;
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': serverData.apiNonce || window.shadowPluginData?.nonce || '',
          ...options.headers
        },
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      set({ 
        isLoading: false, 
        lastApiCall: { endpoint, timestamp: Date.now(), success: true }
      });
      
      return data;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error.message,
        lastApiCall: { endpoint, timestamp: Date.now(), success: false, error: error.message }
      });
      throw error;
    }
  }
}));

/**
 * Custom hook for easy access to common store actions
 */
export const useStoreActions = () => {
  const store = useStore();
  return {
    togglePanel: store.togglePanel,
    openPanel: store.openPanel,
    closePanel: store.closePanel,
    updateSetting: store.updateSetting,
    setSearchQuery: store.setSearchQuery,
  };
};

/**
 * Custom hook for easy access to WordPress store actions
 */
export const useWordPressActions = () => {
  const store = useWordPressStore();
  return {
    setServerData: store.setServerData,
    makeApiCall: store.makeApiCall,
    setError: store.setError,
    clearError: store.clearError,
  };
};