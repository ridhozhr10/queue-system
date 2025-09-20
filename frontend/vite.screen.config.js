import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: "src/screen-ui", // root folder
  publicDir: "../../public",
  cacheDir: "node_modules/.screen-kiosk",
  server: {
    port: 5173, // unique port for kiosk
  },
  build: {
    outDir: resolve("dist/screen"),
    emptyOutDir: true,
  },
});
