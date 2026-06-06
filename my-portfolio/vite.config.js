import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  base: "/",
  plugins: [
    react({
      // Faster HMR with SWC-style transform (babel fast-path)
      fastRefresh: true,
    }),
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
  optimizeDeps: {
    // Pre-bundle heavy deps so dev server starts instantly
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "three",
      "lucide-react"
    ]
  },
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
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,   // Strip console.log from prod
        drop_debugger: true,
        passes: 2
      }
    },
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
