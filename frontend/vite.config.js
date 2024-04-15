import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path, { resolve } from 'path'; // import resolve from path module




// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port:3000,
    proxy: {
      "/api": {
        target: 'http://localhost:5000'
      }
    }
  },
  dotenv: {
    path: resolve(__dirname, '../.env'), // use resolve to ensure correct path
  },
  resolve: {
    alias: {
      '@daisyui/react': '@daisyui/react/dist/index.esm.js',
      '@shared': path.resolve(__dirname, '../shared'), 
    },
  },
})