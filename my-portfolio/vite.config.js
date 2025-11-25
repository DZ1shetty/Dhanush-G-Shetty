import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024
    }),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz",
      threshold: 1024
    })
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
    cors: true
  },
  preview: {
    port: 4173,
    strictPort: true
  },
  build: {
    target: "es2018",
    reportCompressedSize: true,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "framer-motion"],
          three: ["three"],
          ui: ["lucide-react"]
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
