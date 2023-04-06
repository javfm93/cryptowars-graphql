import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  test: {
    globals: true,
    environment: 'happy-dom',
  }
});
