import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: "src/counter-ui", // root folder
  publicDir: "../../public",
  cacheDir: "node_modules/.vite-counter",
  server: {
    port: 5172, // unique port for kiosk
  },
  build: {
    outDir: resolve("dist/admin"),
    emptyOutDir: true,
  },
});
