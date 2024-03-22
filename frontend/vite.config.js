import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@daisyui/react': '@daisyui/react/dist/index.esm.js', // Adjust the path based on the actual location of the Daisy UI package
    },
  },
})
