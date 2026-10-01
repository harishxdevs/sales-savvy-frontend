import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base is the repo name so the app works at https://<user>.github.io/sales-savvy-frontend/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/sales-savvy-frontend/',
  server: {
    proxy: {
      '/api': { target: 'http://localhost:9090', changeOrigin: true },
    },
  },
})
