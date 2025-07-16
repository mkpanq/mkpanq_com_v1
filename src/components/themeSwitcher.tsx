import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ?? false,
  );

  useEffect(() => {
    console.log("Theme mode changed:", darkMode);
  }, [darkMode]);

  return (
    <button
      type="button"
      className="absolute top-0 right-0 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={() => setDarkMode(!darkMode)}
    >
      Switch theme
    </button>
  );
};

export default ThemeSwitcher;
