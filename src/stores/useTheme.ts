import { create } from "zustand";

const initialTheme = getCurrentTheme();
document.documentElement.setAttribute("theme", initialTheme);
const useTheme = create<ThemeState>((set) => ({
  theme: getCurrentTheme(),
  toggleTheme: () => {
    document.documentElement.setAttribute(
      "theme",
      switchTheme(getCurrentTheme()),
    );
    set((state: { theme: Theme }) => ({
      theme: switchTheme(state.theme),
    }));
  },
}));

export type Theme = "light" | "dark";
type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
};

function getCurrentTheme(): Theme {
  const htmlTheme = document.documentElement.getAttribute("theme");
  const theme: Theme =
    htmlTheme === "dark" || htmlTheme === "light"
      ? htmlTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";

  return theme;
}

function switchTheme(currentTheme: Theme | null): Theme {
  return currentTheme === "dark" ? "light" : "dark";
}

export default useTheme;
