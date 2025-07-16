import { useEffect, useRef, useState } from "react";
import FOG from "vanta/dist/vanta.fog.min";
import useTheme from "../stores/useTheme";
import ThemeSwitcher from "./themeSwitcher";

const Background = ({ children }: { children: React.ReactNode }) => {
  const bgRef = useRef(null);
  const isDarkTheme = useTheme((state) => state.isDarkTheme);
  const [currentBackgroundScene, setCurrentBackgroundScene] = useState(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Want to start and render first scene only once
  useEffect(() => {
    if (!currentBackgroundScene && bgRef.current) {
      const effect = FOG({
        el: bgRef.current,
        ...getBackgroundConfiguration(isDarkTheme),
      });
      setCurrentBackgroundScene(effect);
    }

    return () => {
      // Cleanup on unmount only
      if (currentBackgroundScene) {
        //@ts-ignore
        currentBackgroundScene.destroy();
        setCurrentBackgroundScene(null);
      }
    };
  }, []);

  useEffect(() => {
    if (currentBackgroundScene) {
      //@ts-ignore
      currentBackgroundScene.setOptions(
        getBackgroundConfiguration(isDarkTheme),
      );
    }
  }, [isDarkTheme, currentBackgroundScene]);

  return (
    <div ref={bgRef} className="absolute top-0 left-0 w-full h-full -z-1">
      <div className="z-1">
        <ThemeSwitcher />
        {children}
      </div>
    </div>
  );
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
