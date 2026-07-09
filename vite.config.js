import path from "path";
import { defineConfig, loadEnv, normalizePath } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteStaticCopy } from "vite-plugin-static-copy";
import {
  FORMHELPER_STORYBOOK_PUBLIC_DIR,
  getFormhelperAliases,
  getFormhelperStorybookStaticDir,
} from "./config/formhelper-resolve.js";

// Plugin to fix prop-types import issues
const propTypesFixPlugin = () => { 
  return {
    name: 'prop-types-fix',
    resolveId(id) {
      if (id === 'prop-types') {
        return 'prop-types'; 
      }
      return null;
    },
    load(id) {
      if (id === 'prop-types') {
        return `
          import * as PropTypes from 'prop-types';
          export default PropTypes;
          export * from 'prop-types';
        `;
      }
      return null;
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const formhelperAliases = getFormhelperAliases({ env, command });
  const storybookStaticDir = getFormhelperStorybookStaticDir();

  const plugins = [
    react({
      // Explicit JSX configuration for React 19
      jsxImportSource: 'react',
      jsxRuntime: 'automatic',
      // Ensure proper JSX handling
      plugins: [
        // intenionally disabled, causing  build issues on some windows builds.
        //['@swc/plugin-emotion', {}]
      ]
    }), 
    propTypesFixPlugin(),
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(path.join(storybookStaticDir, "**/*")),
          dest: FORMHELPER_STORYBOOK_PUBLIC_DIR,
        },
      ],
    }),
  ];
  
  return {
    server: {
      port: 3000,
      host: true,
      proxy: {
        //mock server should have the same endpoint as the eventual live endpoint
        //that way we can just remove "mock/" and switch to live endpoint.
        "/api": {   
          target: "http://localhost:5000",
          changeOrigin: true,
          //rewrite: (path)=> path.replace(/^\/api\/mock/,"api"),
        },

        "/api/mock": {   
          target: "http://localhost:5000",
          changeOrigin: true,
          rewrite: (path)=> path.replace(/^\/api\/mock/,"api"),
        },
      },
      // Ensure static files are served correctly
      fs: {
        strict: false
      }
    },
    // Serve dist/mock as public files during development
    // publicDir: command === 'dev' ? 'dist' : 'public',
    build: {
      chunkSizeWarningLimit: 1000, // Increase warning limit to 1000kb
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor chunks
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-mui': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
            'vendor-utils': ['lodash', 'dayjs', 'axios', 'yup', 'zustand'],
          },
          // Ensure chunks are named consistently
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]'
        }
      }
    },
    resolve: {
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        ...formhelperAliases,
        "components": path.resolve(__dirname, "./src/components"),
        "config": path.resolve(__dirname, "./config/config.js"),
        "helpers": path.resolve(__dirname, "./src/helpers"),
        "pages": path.resolve(__dirname, "./src/pages"),
        "store": path.resolve(__dirname, "./src/store"),
        "theme-material": path.resolve(__dirname, "./src/theme-material.jsx"),
        //"assets": path.resolve(__dirname, "./src/assets"),
      },
      dedupe: ['react', 'react-dom', 'react-is', 'prop-types'],
    },
    plugins,
    optimizeDeps:{
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
        '@mui/icons-material',
      ],
      esbuildOptions: {
        // Ensure React 19 compatibility
        jsx: 'automatic',
        jsxImportSource: 'react',
      }
    },
    envDir: '.',
    envPrefix: 'VITE_',
  };
});
