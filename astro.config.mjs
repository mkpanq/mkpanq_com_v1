// @ts-check

import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  // I guess we could skip it due to active ClientRouter but just leave it for now
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "load",
  },
  integrations: [preact()],
});
