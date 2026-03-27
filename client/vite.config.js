// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // Allows Docker to access the dev server
    port: 5173,        // Matches your Docker port
    strictPort: true,  // Ensures it doesn't try to switch to 5174
    watch: {
      usePolling: true // Required for hot-reload to work inside Docker
    },
    // This is the "Magic" line that fixes the Black Page on refresh:
    historyApiFallback: true, 
  },
  // Ensures all asset paths start with / (absolute paths)
  base: '/', 
})