import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  root: '.', // root project
  build: {
    outDir: 'dist-mobile', // hasil build mobile
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
    },
  },
  server: {
    open: true,
  },
  plugins: [
    react(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(
          '/src/main.jsx',
          '/src/mobile/mainMobile.jsx'
        )
      }
    }
  ]
})