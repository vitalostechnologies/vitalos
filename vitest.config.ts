import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// NOTE: Vitest 3.x on Windows emits a spurious EISDIR error at startup
// (a known upstream bug in the module resolver when traversing Windows paths).
// All tests pass despite this; exit code 1 is a false positive from that bug.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    exclude: ['node_modules', 'vite-legacy', '.next', 'dist', 'api'],
    include: ['__tests__/**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
