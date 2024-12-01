import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Increase chunk size warning limit (default is 500 KB)
    chunkSizeWarningLimit: 1000, // You can adjust this value as needed

    // Rollup options to manually chunk vendor libraries
    rollupOptions: {
      output: {
        // Manual chunking: Move all third-party libraries (from node_modules) into a separate vendor chunk
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // This will group all node_modules into a 'vendor' chunk
          }
        }
      }
    }
  }
});
