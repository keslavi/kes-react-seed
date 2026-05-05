/**
 * mock-data.service.js
 *
 * Startup:  analyze data/enc/*.enc.json and decrypt into data/*.iife.js
 *           when missing, stale, or force mode is enabled.
 *
 * Shutdown: for each data/*.iife.js that is newer than its
 *           data/enc/*.enc.json counterpart (or has no counterpart),
 *           encrypt it back into data/enc/.
 */

import { pbkdf2Sync, randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIR  = resolve(__dirname, '..', '..', 'data');
const ENC_DIR   = resolve(__dirname, '..', '..', 'data', 'enc');
const iterations = 100000;

// ── Crypto helpers ────────────────────────────────────────────────────────────

const toBase64   = (buf) => buf.toString('base64');
const fromBase64 = (str) => Buffer.from(str, 'base64');
const DEFAULT_MOCK_DATA_KEY = 'SteveCranford';

const getKey = () => {
    const k = process.env.MOCK_DATA_KEY || DEFAULT_MOCK_DATA_KEY;
    if (!process.env.MOCK_DATA_KEY) {
        console.warn('⚠️  MOCK_DATA_KEY not set – using fallback default key.');
    }
    return k;
};

const encryptPlaintext = (plaintext, passphrase) => {
    const salt = randomBytes(16);
    const iv   = randomBytes(12);
    const derivedKey = pbkdf2Sync(passphrase, salt, iterations, 32, 'sha256');

    const cipher     = createCipheriv('aes-256-gcm', derivedKey, iv);
    const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const authTag    = cipher.getAuthTag();
    const packed     = Buffer.concat([ciphertext, authTag]);

    return {
        v: 1,
        alg: 'aes-256-gcm',
        kdf: 'pbkdf2-sha256',
        iterations,
        salt: toBase64(salt),
        iv:   toBase64(iv),
        data: toBase64(packed),
        generatedAt: new Date().toISOString(),
    };
};

const decryptEnvelope = (envelope, passphrase) => {
    const derivedKey = pbkdf2Sync(
        passphrase,
        fromBase64(envelope.salt),
        envelope.iterations,
        32,
        'sha256',
    );
    const packed     = fromBase64(envelope.data);
    const authTag    = packed.slice(packed.length - 16);
    const ciphertext = packed.slice(0, packed.length - 16);

    const decipher = createDecipheriv('aes-256-gcm', derivedKey, fromBase64(envelope.iv));
    decipher.setAuthTag(authTag);

    return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString('utf8');
};

// ── IIFE helpers ──────────────────────────────────────────────────────────────

const dataToIife = (data) => `(() => (${JSON.stringify(data, null, 2)}))()`;
const dataToJson = (data) => JSON.stringify(data);

const evalIife = (content, filePath) => {
    try {
        return eval(content);
    } catch (e) {
        throw new Error(`Failed to evaluate ${filePath}: ${e.message}`);
    }
};

// ── name mapping helpers ──────────────────────────────────────────────────────
//   data/enc/task.enc.json  ↔  data/task.iife.js   (base = "task")

const encToBase   = (name) => name.replace('.enc.json', '');
const baseToIife  = (base) => join(DATA_DIR, `${base}.iife.js`);
const baseToEnc   = (base) => join(ENC_DIR,  `${base}.enc.json`);

// ── Startup: decrypt missing IIFE files ───────────────────────────────────────

export const decryptChangedIifeFiles = ({ force = false } = {}) => {
    const key = getKey();
    if (!key) return;

    if (!existsSync(ENC_DIR)) {
        console.log('ℹ️  data/enc not found – skipping startup decrypt.');
        return;
    }

    mkdirSync(DATA_DIR, { recursive: true });

    const encFiles = readdirSync(ENC_DIR).filter((f) => f.endsWith('.enc.json'));
    if (encFiles.length === 0) {
        console.log('ℹ️  No .enc.json files in data/enc – nothing to decrypt on startup.');
        return;
    }

    let decrypted = 0;
    for (const encFile of encFiles) {
        const base     = encToBase(encFile);
        const iifePath = baseToIife(base);
        const encPath  = join(ENC_DIR, encFile);

        try {
            const envelope  = JSON.parse(readFileSync(encPath, 'utf8'));
            const plaintext = decryptEnvelope(envelope, key);
            const data      = JSON.parse(plaintext);
            const jsonData  = dataToJson(data);

            if (!force && existsSync(iifePath)) {
                const existingData = evalIife(readFileSync(iifePath, 'utf8'), iifePath);
                if (dataToJson(existingData) === jsonData) {
                    continue;
                }
            }

            writeFileSync(iifePath, `${dataToIife(data)}\n`, 'utf8');
            decrypted++;
            console.log(`🔓 Decrypted: ${encFile} -> ${base}.iife.js`);
        } catch (err) {
            console.error(`❌ Startup decrypt failed for ${encFile}: ${err.message}`);
        }
    }

    if (decrypted === 0) {
        console.log(force
            ? '✅ No encrypted mock files found to decrypt.'
            : '✅ No encrypted files required decryption (IIFE files are current).');
    }
};

// Backward compatibility alias
export const decryptMissingIifeFiles = decryptChangedIifeFiles;

// ── Shutdown: encrypt new/changed IIFE files ──────────────────────────────────

export const encryptChangedIifeFiles = ({ force = false } = {}) => {
    const key = getKey();
    if (!key) {
        return { encrypted: 0, scanned: 0, changedFiles: [], reason: 'missing-key' };
    }

    if (!existsSync(DATA_DIR)) {
        console.log('ℹ️  data directory not found – nothing to encrypt.');
        return { encrypted: 0, scanned: 0, changedFiles: [], reason: 'missing-data-dir' };
    }

    mkdirSync(ENC_DIR, { recursive: true });

    const iifeFiles = readdirSync(DATA_DIR).filter((f) => f.endsWith('.iife.js'));

    if (iifeFiles.length === 0) {
        console.log('ℹ️  No .iife.js files found – nothing to encrypt.');
        return { encrypted: 0, scanned: 0, changedFiles: [], reason: 'no-iife-files' };
    }

    let encrypted = 0;
    const scanned = iifeFiles.length;
    const changedFiles = [];
    for (const iifeFile of iifeFiles) {
        const base    = iifeFile.replace('.iife.js', '');
        const iifePath = join(DATA_DIR, iifeFile);
        const encPath  = baseToEnc(base);

        try {
            const content   = readFileSync(iifePath, 'utf8');
            const data      = evalIife(content, iifePath);
            const plaintext = dataToJson(data);

            if (!force && existsSync(encPath)) {
                const existingEnvelope = JSON.parse(readFileSync(encPath, 'utf8'));
                const existingPlaintext = decryptEnvelope(existingEnvelope, key);
                if (existingPlaintext === plaintext) {
                    continue;
                }
            }

            const envelope  = encryptPlaintext(plaintext, key);

            writeFileSync(encPath, `${JSON.stringify(envelope, null, 2)}\n`, 'utf8');
            encrypted++;
            changedFiles.push(iifeFile);
            console.log(`🔐 Encrypted: ${iifeFile} -> enc/${base}.enc.json`);
        } catch (err) {
            console.error(`❌ Shutdown encrypt failed for ${iifeFile}: ${err.message}`);
        }
    }

    if (encrypted === 0) {
        console.log(force
            ? '✅ No IIFE files found to encrypt.'
            : '✅ No IIFE files changed – shutdown encrypt skipped.');
    } else {
        console.log(`🔐 Encryption complete. Files encrypted: ${encrypted}`);
    }

    return { encrypted, scanned, changedFiles, reason: 'ok' };
};
