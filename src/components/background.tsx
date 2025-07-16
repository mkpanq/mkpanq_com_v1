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
    setBackgroundEffect(getBackgroundScene(bgRef.current, darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (!backgroundEffect)
      setBackgroundEffect(getBackgroundScene(bgRef.current, darkMode));

    return () => {
      // @ts-ignore
      if (backgroundEffect) backgroundEffect.destroy();
    };
  }, [backgroundEffect, darkMode]);

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

const getBackgroundScene = (
  bgRefElement: HTMLElement | null,
  darkMode: boolean,
) => {
  if (!bgRefElement) return;
  const config = getBackgroundConfiguration(darkMode);

  return FOG({
    el: bgRefElement,
    ...config,
  });
};

const getBackgroundConfiguration = (darkMode: boolean) => {
  return darkMode
    ? {
        highlightColor: 0x9fb3bf,
        midtoneColor: 0x16132b,
        lowlightColor: 0x9fb3bf,
        baseColor: 0x16132b,
        blurFactor: 0.8,
        speed: 2,
        zoom: 0.7,
      }
    : {
        highlightColor: 0xf5d7a6,
        midtoneColor: 0xf5d7a6,
        lowlightColor: 0xf5d7a6,
        baseColor: 0xfffdfa,
        blurFactor: 0.8,
        speed: 2,
        zoom: 0.7,
      };
};

export default Background;
