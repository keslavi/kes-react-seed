#!/usr/bin/env node

import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';
import { dirname, join, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { config as loadEnv } from 'dotenv';
import { encryptChangedIifeFiles } from '../src/services/mock-data.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

loadEnv({ path: resolve(__dirname, '..', '.env.local') });
loadEnv({ path: resolve(__dirname, '..', '.env') });

const serverEncDir = resolve(__dirname, '..', 'data', 'enc');
const seedEncDir = resolve(__dirname, '..', '..', 'seed', 'public', 'mock', 'enc');

const ensureDir = (dirPath) => {
  mkdirSync(dirPath, { recursive: true });
};

const collectEncFiles = (rootDir) => {
  const files = new Map();

  const walk = (currentDir) => {
    const entries = readdirSync(currentDir);

    for (const entry of entries) {
      const absolutePath = join(currentDir, entry);
      const stats = statSync(absolutePath);

      if (stats.isDirectory()) {
        walk(absolutePath);
        continue;
      }

      if (!entry.endsWith('.enc.json')) {
        continue;
      }

      const relativePath = relative(rootDir, absolutePath);
      files.set(relativePath, {
        path: absolutePath,
        mtimeMs: stats.mtimeMs,
      });
    }
  };

  if (!existsSync(rootDir)) {
    return files;
  }

  walk(rootDir);
  return files;
};

const copyWithParents = (fromPath, toPath) => {
  ensureDir(dirname(toPath));
  copyFileSync(fromPath, toPath);
};

const syncNewestEncFiles = () => {
  ensureDir(serverEncDir);
  ensureDir(seedEncDir);

  const serverFiles = collectEncFiles(serverEncDir);
  const seedFiles = collectEncFiles(seedEncDir);
  const allRelativePaths = new Set([...serverFiles.keys(), ...seedFiles.keys()]);

  let copiedToServer = 0;
  let copiedToSeed = 0;
  let unchanged = 0;

  for (const relativePath of allRelativePaths) {
    const serverFile = serverFiles.get(relativePath);
    const seedFile = seedFiles.get(relativePath);

    const serverPath = join(serverEncDir, relativePath);
    const seedPath = join(seedEncDir, relativePath);

    if (serverFile && !seedFile) {
      copyWithParents(serverFile.path, seedPath);
      copiedToSeed += 1;
      console.log(`-> seed/public/mock/enc: ${relativePath}`);
      continue;
    }

    if (!serverFile && seedFile) {
      copyWithParents(seedFile.path, serverPath);
      copiedToServer += 1;
      console.log(`-> server-koa/data/enc: ${relativePath}`);
      continue;
    }

    if (serverFile.mtimeMs > seedFile.mtimeMs) {
      copyWithParents(serverFile.path, seedPath);
      copiedToSeed += 1;
      console.log(`server newer -> seed/public/mock/enc: ${relativePath}`);
      continue;
    }

    if (seedFile.mtimeMs > serverFile.mtimeMs) {
      copyWithParents(seedFile.path, serverPath);
      copiedToServer += 1;
      console.log(`seed newer -> server-koa/data/enc: ${relativePath}`);
      continue;
    }

    unchanged += 1;
  }

  console.log('\nSync summary');
  console.log(`Copied to server-koa/data/enc: ${copiedToServer}`);
  console.log(`Copied to seed/public/mock/enc: ${copiedToSeed}`);
  console.log(`Unchanged: ${unchanged}`);
};

try {
  const result = encryptChangedIifeFiles();
  if (result?.reason === 'missing-key') {
    console.warn('MOCK_DATA_KEY missing; using fallback key from service.');
  }
  syncNewestEncFiles();
} catch (error) {
  console.error(`mock-sync failed: ${error.message}`);
  process.exit(1);
}
