import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: "src/counter-ui", // root folder
  publicDir: "../../public",
  server: {
    port: 5175, // unique port for kiosk
  },
});
