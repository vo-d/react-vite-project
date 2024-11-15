// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.tsx'), // Updated to use main.tsx
      name: 'MyComponent',
      fileName: 'my-component',
      formats: ['es'],
    },
  },
});
