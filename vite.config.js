import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/backend": {
        target: "http://localhost:3000", // Proxy API requests to backend
        changeOrigin: true,
        secure: false,
      },
      optimizeDeps: {
        include: ['react-bootstrap']
      }
    },
  },
});