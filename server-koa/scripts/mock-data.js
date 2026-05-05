#!/usr/bin/env node
// Usage: node mock-data.js encrypt | decrypt

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { config as loadEnv } from 'dotenv';
import {
	decryptChangedIifeFiles,
	encryptChangedIifeFiles,
} from '../src/services/mock-data.service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

loadEnv({ path: resolve(__dirname, '..', '.env.local') });
loadEnv({ path: resolve(__dirname, '..', '.env') });

const mode = process.argv[2];

if (mode === 'encrypt') {
	encryptChangedIifeFiles();
} else if (mode === 'decrypt') {
	decryptChangedIifeFiles();
} else {
	console.error('❌ Usage: node mock-data.js <encrypt|decrypt>');
	process.exit(1);
}
