import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: "src/kiosk-ui", // root folder
  publicDir: "../../public",
  cacheDir: "node_modules/.vite-kiosk",
  server: {
    port: 5171, // unique port for kiosk
  },
  build: {
    outDir: resolve("dist/kiosk"),
    emptyOutDir: true,
  },
});
