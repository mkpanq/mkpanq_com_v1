import { useEffect, useRef, useState } from "react";
import FOG from "vanta/dist/vanta.fog.min";
import ThemeSwitcher from "./themeSwitcher";

const Background = ({ children }: { children: React.ReactNode }) => {
  const bgRef = useRef(null);
  const [backgroundEffect, setBackgroundEffect] = useState(null);
  const [darkMode, setDarkMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ?? false,
  );

  useEffect(() => {
    console.log("Theme mode changed:", darkMode);
    setBackgroundEffect(
      FOG({
        el: bgRef.current,
        ...backgroundColorSet[darkMode ? "dark" : "light"],
        blurFactor: 0.8,
        speed: 2,
        zoom: 0.7,
      }),
    );
  }, [darkMode]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!backgroundEffect)
      setBackgroundEffect(
        FOG({
          el: bgRef.current,
          ...backgroundColorSet[darkMode ? "dark" : "light"],
          blurFactor: 0.8,
          speed: 2,
          zoom: 0.7,
        }),
      );

    return () => {
      // @ts-ignore
      if (backgroundEffect) backgroundEffect.destroy();
    };
  }, []);

  return (
    <div ref={bgRef} className="absolute top-0 left-0 w-full h-full -z-1">
      <div className="z-1">
        <ThemeSwitcher
          backgroundState={darkMode}
          backgroundStateSwitcher={setDarkMode}
        />
        {children}
      </div>
    </div>
  );
};

const backgroundColorSet = {
  dark: {
    highlightColor: 0x9fb3bf,
    midtoneColor: 0x16132b,
    lowlightColor: 0x9fb3bf,
    baseColor: 0x16132b,
  },
  light: {
    highlightColor: 0xf5d7a6,
    midtoneColor: 0xf5d7a6,
    lowlightColor: 0xf5d7a6,
    baseColor: 0xfffdfa,
  },
};

export default Background;

// Light mode colors:
// highlightColor: 0xf5d7a6,
// midtoneColor: 0xf5d7a6,
// lowlightColor: 0xf5d7a6,
// baseColor: 0xfffdfa,

// Dark Mode colors:
// highlightColor: 0x9fb3bf,
// midtoneColor: 0x16132b,
// lowlightColor: 0x9fb3bf,
// baseColor: 0x16132b,

// Others
// --day: #fffdfa;
// --evening: #fccc83;
// --dusk: #db7a2a;
// --night: #0f131c;
// --dawn: #16132b;
// --morning: #9fb3bf;
// --shadow: #1a1917;
// --bounce-light: #f5d7a6;
