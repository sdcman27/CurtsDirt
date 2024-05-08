import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';


export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, 'src'),  // Set 'src' as the root directory
  server: {
    port: 3001,
    strictPort: true,
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),  // Update the alias if necessary
    }
  }
});