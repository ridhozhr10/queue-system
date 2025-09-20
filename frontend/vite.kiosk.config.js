import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  publicDir: "../../public",
  root: "src/kiosk-ui", // root folder
  server: {
    port: 5174, // unique port for kiosk
  },
});
