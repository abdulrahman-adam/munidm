// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // This forces ALL assets to load from the root, no matter the URL depth
  server: {
    host: true,
    port: 5173,
    historyApiFallback: true, // Tells Vite to serve index.html for unknown routes
  }
})