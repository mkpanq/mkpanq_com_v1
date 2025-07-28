import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  site: "https://mkpanq.com",
  vite: {
    plugins: [tailwindcss()],
  },
  // I guess we could skip it due to active ClientRouter but just leave it for now
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "load",
  },
  integrations: [sitemap(), robotsTxt()],
});
