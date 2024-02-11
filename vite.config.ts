import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import svgr from 'vite-plugin-svgr';

const manifest: Partial<VitePWAOptions> = { 
  registerType: "prompt", 
  includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"], 
  manifest: { 
      name: "Expense Tracker", 
      short_name: "Expense Tracker", 
      description: "An app to track your expenses", 
      icons: [
          { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png", }, 
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png", }, 
          { src: "/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png", purpose: "apple touch icon" }, 
          { src: "/logo-225x225.png", sizes: "225x225", type: "image/png", purpose: "any maskable", },
      ], 
      theme_color: "#fff", 
      background_color: "#fff", 
      display: "standalone", 
      scope: "/", 
      start_url: "/", 
      orientation: "portrait", 
}
};

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(),svgr(), VitePWA(manifest)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
