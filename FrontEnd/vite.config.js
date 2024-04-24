import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3001 // Set the port here
  },
  define: {
    'process.env': process.env,
  }
});
