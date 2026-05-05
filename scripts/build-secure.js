#!/usr/bin/env node

/**
 * Build script for security-controlled environments
 * This script ensures proper JSX runtime compatibility
 */

import { build } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync } from 'fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const projectRoot = resolve(__dirname, '..');

function isSecureMockFile(fileName) {
  return fileName.includes('.enc.');
}

function copyDirectoryRecursive(sourceDir, targetDir) {
  mkdirSync(targetDir, { recursive: true });
  const items = readdirSync(sourceDir);

  for (const item of items) {
    const sourcePath = resolve(sourceDir, item);
    const targetPath = resolve(targetDir, item);
    const sourceStat = statSync(sourcePath);

    if (sourceStat.isDirectory()) {
      copyDirectoryRecursive(sourcePath, targetPath);
    } else {
      if (isSecureMockFile(item)) {
        copyFileSync(sourcePath, targetPath);
      }
    }
  }
}

async function buildSecure() {
  try {
    console.log(["all"],'Building for security-controlled environment...');
    
    await build({
      root: projectRoot,
      configFile: resolve(projectRoot, 'vite.config.js'),
      mode: 'production',
      build: {
        outDir: 'dist-secure',
        rollupOptions: {
          external: [],
          output: {
            // Ensure JSX runtime is bundled
            manualChunks: {
              'jsx-runtime': ['react/jsx-runtime'],
              'vendor-react': ['react', 'react-dom'],
            },
            // Inline JSX runtime for compatibility
            inlineDynamicImports: true,
          }
        }
      },
      define: {
        // Ensure JSX runtime is available
        'process.env.NODE_ENV': '"production"',
        '__DEV__': false,
      }
    });

    const mockSourceDir = resolve(projectRoot, '..', 'server-koa', 'data', 'mock');

    if (!existsSync(mockSourceDir)) {
      console.warn(["all"], `⚠️ Mock source not found: ${mockSourceDir}`);
    } else {
      const mockTargetDir = resolve(projectRoot, 'dist-secure', 'mock');
      copyDirectoryRecursive(mockSourceDir, mockTargetDir);
      console.log(["all"], `📦 Secure mock data copied from ${mockSourceDir} to ${mockTargetDir}`);
    }
    
    console.log(["all"],'✅ Build completed successfully for secure environment');
    console.log(["all"],'📁 Output directory: dist-secure/');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildSecure(); 