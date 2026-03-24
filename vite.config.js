import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("react-router-dom")) return "vendor-router";
          if (id.includes("react-dom") || id.includes("/node_modules/react/"))
            return "vendor-react";
          if (id.includes("@mui/")) return "vendor-mui";
          if (id.includes("swiper")) return "vendor-swiper";
          if (id.includes("firebase")) return "vendor-firebase";
          if (id.includes("react-bootstrap") || id.includes("/bootstrap/"))
            return "vendor-bootstrap";
          if (id.includes("framer-motion")) return "vendor-motion";
          if (id.includes("leaflet") || id.includes("react-leaflet"))
            return "vendor-maps";

          return;
        },
      },
    },
  },
});
