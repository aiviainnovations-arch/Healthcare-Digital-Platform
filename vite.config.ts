import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Healthcare-Digital-Platform/',
  
  plugins: [react()],
  
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        // Keeps three.js out of the initial bundle: the 3D scenes are
        // dynamically imported, so this chunk only loads when a scene mounts.
        manualChunks: {
          three: ['three', '@react-three/fiber'],
          gsap: ['gsap'],
        },
      },
    },
  },
})
