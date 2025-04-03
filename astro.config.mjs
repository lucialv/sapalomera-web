import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [react(), sitemap()],
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel(),
});