import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        app: 'app.html',
        design1: 'design1.html',
        design2: 'design2.html',
        design3: 'design3.html',
        design4: 'design4.html',
      }
    }
  }
})
