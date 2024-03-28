import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

// Load the .env file
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port:3000,
    proxy: {
      "/api": {
        target: process.env.REACT_APP_SERVER_URL
        
      }
    }
  },
  resolve: {
    alias: {
      '@daisyui/react': '@daisyui/react/dist/index.esm.js', // Adjust the path based on the actual location of the Daisy UI package
    },
  },
})