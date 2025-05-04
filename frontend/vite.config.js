import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '', // ✅ Set to empty string for correct asset loading on Vercel root
  build: {
    outDir: 'dist',
  },
});
