import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react(),],
    base: '/never-break-a-stride/',
    build:{
      target: 'es2015',
    },
    resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },}
});
