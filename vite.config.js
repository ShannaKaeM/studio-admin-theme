import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  build: {
    outDir: 'dist/js',
    emptyOutDir: false,
    lib: {
      entry: 'src/main.jsx',
      name: 'ShadowPlugin',
      fileName: () => 'shadow-plugin.js',
      formats: ['iife']
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    },
    sourcemap: false,
    minify: 'terser'
  },
  
  server: {
    port: 3000,
    host: true
  }
});