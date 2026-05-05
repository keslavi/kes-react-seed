/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Create a test-specific config that doesn't depend on the main vite config
export default defineConfig({
  plugins: [
    react({
      // Explicit JSX configuration for React 19
      jsxImportSource: 'react',
      jsxRuntime: 'automatic',
      // Ensure proper JSX handling
      plugins: [
        ['@swc/plugin-emotion', {}]
      ]
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',//'happy-dom',
    globalSetup: './src/test/globalSetup.js',
    setupFiles: './src/test/_setupTest.js',
    css: true,
    watch: true,
    isolate: true, // <-- this helps with stale state
    forceRerunTriggers: ['src/**/*.{js,jsx,ts,tsx}'], // triggers full rerun
    fileParallelism: true, // default: true
    poolOptions: {
      threads: {
        maxThreads: 2 // Reduced to avoid file handle issues
      },
    },
    onConsoleLog: (log, type) => {
      // helpful for debugging
      console.log(`[Vitest][${type}] ${log}`);
    },
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],  // Only test files
    exclude: ['node_modules', 'dist'],    
    clearMocks: true,
    restoreMocks: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@formhelper": path.resolve(__dirname, "./formhelper-mui-dist/formhelper-mui.js"),
      "config": path.resolve(__dirname, "./config/config.js"),
      "components": path.resolve(__dirname, "./src/components"),
      "helpers": path.resolve(__dirname, "./src/helpers"),
      "pages": path.resolve(__dirname, "./src/pages"),
      "store": path.resolve(__dirname, "./src/store"),
      "theme-material": path.resolve(__dirname, "./src/theme-material.jsx"),
    },
    dedupe: ['react', 'react-dom', 'react-is', 'prop-types'],
  },
  optimizeDeps: {
    include: [
      '@emotion/react',
      '@emotion/styled',
      '@mui/material/Tooltip',
      '@mui/material/Box',
      'react-is',
      '@mui/utils',
      '@mui/system',
      '@mui/private-theming',
      'prop-types',
      // Explicitly include JSX runtime
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
    ],
    exclude: [
      '@mui/icons-material'
    ],
    esbuildOptions: {
      // Ensure React 19 compatibility
      jsx: 'automatic',
      jsxImportSource: 'react',
      // Add JSX runtime configuration
      jsxRuntime: 'automatic',
    }
  },
});