import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isDarkMode: boolean;
  activeSection: string;
  activePage: string;
  activeTab: string;
}

const initialState: UIState = {
  isDarkMode: true,
  activeSection: 'projects',
  activePage: 'projects',
  activeTab: 'dashboard',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    setActivePage: (state, action: PayloadAction<string>) => {
      state.activePage = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
  },
});

export const { toggleTheme, setActiveSection, setActivePage, setActiveTab } = uiSlice.actions;
export default uiSlice.reducer;