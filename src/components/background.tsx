import { useEffect, useRef, useState } from "react";
import TOPOLOGY from "vanta/dist/vanta.topology.min";
import {
  DARK_BACKGROUND_CONFIG,
  LIGHT_BACKGROUND_CONFIG,
} from "../config/colors";
import useTheme, { type Theme } from "../stores/useTheme";

const Background = ({ children }: { children: React.ReactNode }) => {
  const bgRef = useRef(null);
  const theme = useTheme((state) => state.theme);
  const [currentBackgroundScene, setCurrentBackgroundScene] = useState(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Want to start and render first scene only once
  useEffect(() => {
    if (!currentBackgroundScene && bgRef.current) {
      const effect = TOPOLOGY({
        el: bgRef.current,
        ...getBackgroundConfiguration(theme),
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
      currentBackgroundScene.setOptions(getBackgroundConfiguration(theme));
    }
  }, [currentBackgroundScene, theme]);

  return (
    <div ref={bgRef} className="w-full h-full">
      <div className="w-full h-full">{children}</div>
    </div>
  );
};

const getBackgroundConfiguration = (theme: Theme) => {
  switch (theme) {
    case "dark":
      return DARK_BACKGROUND_CONFIG;
    case "light":
      return LIGHT_BACKGROUND_CONFIG;
    default:
      return DARK_BACKGROUND_CONFIG;
  }
};

export default Background;
