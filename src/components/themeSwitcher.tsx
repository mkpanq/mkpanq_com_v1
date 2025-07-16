import useTheme from "../stores/useTheme";

const ThemeSwitcher = () => {
  const themeSwitcher = useTheme((state) => state.toggleTheme);

  return (
    <button
      type="button"
      className="absolute top-0 right-0 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={themeSwitcher}
    >
      Switch theme
    </button>
  );
};

export default ThemeSwitcher;
