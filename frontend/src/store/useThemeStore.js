import { create } from "zustand";

const DEFAULT_THEME = "coffee";
const STORAGE_KEY = "chat-theme";

export const useThemeStore = create((set) => ({
  //////////////////////////////////////////////////////
  // State
  //////////////////////////////////////////////////////

  theme: localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME,

  //////////////////////////////////////////////////////
  // Change Theme
  //////////////////////////////////////////////////////

  setTheme: (theme) => {
    // Save Theme
    localStorage.setItem(STORAGE_KEY, theme);

    // Update State
    set({
      theme,
    });
  },

  //////////////////////////////////////////////////////
  // Reset Theme
  //////////////////////////////////////////////////////

  resetTheme: () => {
    localStorage.removeItem(STORAGE_KEY);

    set({
      theme: DEFAULT_THEME,
    });
  },
}));