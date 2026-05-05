#!/usr/bin/env node

/**
 * Script to copy encrypted mock data files from server-koa/data/enc to public/mock/enc
 * This can be run independently of the build process
 * Only copies files if source is newer than destination
 */

import { copyFileSync, mkdirSync, readdirSync, statSync, existsSync, unlinkSync } from 'fs';
import { resolve, join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const seedRoot = resolve(__dirname, '..');

const sourceDir = resolve(seedRoot, '..', 'server-koa', 'data', 'enc');
const targetDir = resolve(seedRoot, 'public', 'mock', 'enc');
const encryptedOnly = ['1', 'true', 'yes', 'on'].includes(String(
  process.env.MOCK_DATA_ENCRYPTED_ONLY || process.env.VITE_MOCK_DATA_ENCRYPTED_ONLY || ''
).toLowerCase());
const isEncryptedMock = (fileName) => fileName.includes('.enc.');

console.log('Copying mock data files...');
console.log('Source:', sourceDir);
console.log('Target:', targetDir);
console.log('Encrypted only:', encryptedOnly);

if (!existsSync(sourceDir)) {
  console.error('❌ Could not find mock source directory:', sourceDir);
  process.exit(1);
}

try {
  // Create target directory if it doesn't exist
  mkdirSync(targetDir, { recursive: true });

  const cleanupPlaintextMocks = (dir) => {
    const items = readdirSync(dir);

    items.forEach((item) => {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        cleanupPlaintextMocks(fullPath);
        return;
      }

      if (!item.endsWith('.enc.json')) {
        unlinkSync(fullPath);
        console.log(`🧹 Removed plaintext mock: ${item}`);
      }
    });
  };

  if (encryptedOnly) {
    cleanupPlaintextMocks(targetDir);
  }

  let copiedCount = 0;
  let skippedCount = 0;
  
  // Copy files recursively, only if source is newer or dest doesn't exist
  const copyRecursive = (src, dest) => {
    const items = readdirSync(src);
    items.forEach(item => {
      const srcPath = join(src, item);
      const destPath = join(dest, item);
      const stat = statSync(srcPath);

      if (stat.isDirectory()) {
        mkdirSync(destPath, { recursive: true });
        copyRecursive(srcPath, destPath);
      } else {
        if (!isEncryptedMock(item)) {
          return;
        }

        if (encryptedOnly && !item.endsWith('.enc.json')) {
          return;
        }

        let shouldCopy = true;
        let reason = 'destination does not exist';
        
        if (existsSync(destPath)) {
          const destStat = statSync(destPath);
          // Only copy if source is newer
          shouldCopy = stat.mtime > destStat.mtime;
          if (!shouldCopy) {
            reason = 'destination is newer or same age';
          }
        }
        
        if (shouldCopy) {
          copyFileSync(srcPath, destPath);
          console.log(`✅ Copied: ${item}`);
          copiedCount++;
        } else {
          console.log(`⏭️  Skipped: ${item} (${reason})`);
          skippedCount++;
        }
      }
    });
  };
  
  if (statSync(sourceDir).isDirectory()) {
    copyRecursive(sourceDir, targetDir);
    console.log('\n📊 Copy Summary:');
    console.log(`   Copied: ${copiedCount} files`);
    console.log(`   Skipped: ${skippedCount} files`);
    console.log('✅ Mock data files processed successfully');
  } else {
    console.error('❌ Source directory does not exist:', sourceDir);
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error copying files:', error.message);
  process.exit(1);
}