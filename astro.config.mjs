import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import robotsTxt from "astro-robots-txt";
import webmanifest from "astro-webmanifest";

// https://astro.build/config
export default defineConfig({
  site: "https://mkpanq.com",

  // I guess we could skip it due to active ClientRouter but just leave it for now
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "load",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap(),
    robotsTxt(),
    webmanifest({
      name: "Marek Pankowski - Software Engineer",
      icon: "public/favicon.png",
      short_name: "mkpanq.com",
      description: "Marek Pankowski - Personal website",
      start_url: "/",
      display: "standalone",
    }),
  ],

  adapter: node({
    mode: "standalone",
  }),
});
