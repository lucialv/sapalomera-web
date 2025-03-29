import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";

export default defineConfig({
  site: 'http://localhost:4321',
  integrations: [react()],
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel(),
});
