import { create } from "zustand";

type ThemeState = {
  isDarkTheme: boolean;
  toggleTheme: () => void;
};

const useTheme = create<ThemeState>((set) => ({
  isDarkTheme:
    window.matchMedia("(prefers-color-scheme: dark)").matches ?? false,
  toggleTheme: () =>
    set((state: { isDarkTheme: boolean }) => ({
      isDarkTheme: !state.isDarkTheme,
    })),
}));

export default useTheme;
