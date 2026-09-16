import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  // GitHub Pages is a repository subpath; Render serves the same build at `/`.
  // VITE_BASE is set by each deployment workflow, while local dev stays at `/`.
  base: process.env.VITE_BASE || (command === 'build' || isPreview ? '/jianli/' : '/'),
}));
