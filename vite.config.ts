// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        main: resolve(__dirname, 'src/main.tsx'),
        'my-component': resolve(__dirname, 'src/myComponent.tsx'),
        'add-post-component': resolve(__dirname, 'src/addPostComponent.tsx'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        // Use the entry name to create separate files
        entryFileNames: '[name].js',
        dir: 'dist',
      },
    },
  },
});
