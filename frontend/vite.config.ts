import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: false,
    hmr: {
      port: 3000,
    },
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  },
  build: {
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          clerk: ['@clerk/clerk-react'],
          icons: ['@heroicons/react'],
          utils: ['axios']
        }
      }
    },
    // Enable source maps for debugging
    sourcemap: false,
    // Optimize for production
    minify: 'esbuild',
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', '@clerk/clerk-react', '@heroicons/react/24/outline']
  }
})
