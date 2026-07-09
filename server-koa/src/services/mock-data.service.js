/**
 * mock-data.service.js
 *
 * Load:     prefer data/{base}.iife.js; fall back to decrypt data/enc/{base}.enc.json
 *
 * Startup:  decrypt enc -> iife when iife is missing or older than enc
 *
 * Encrypt:  data/{base}.iife.js -> data/enc/{base}.enc.json when iife is newer than enc
 */

import { pbkdf2Sync, randomBytes, createCipheriv, createDecipheriv } from 'crypto';
import {
    mkdirSync,
    readdirSync,
    readFileSync,
    writeFileSync,
    existsSync,
    statSync,
} from 'fs';
import { join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIR = resolve(__dirname, '..', '..', 'data');
const ENC_DIR = resolve(__dirname, '..', '..', 'data', 'enc');
const iterations = 100000;

// ── Crypto helpers ────────────────────────────────────────────────────────────

const toBase64 = (buf) => buf.toString('base64');
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
    const iv = randomBytes(12);
    const derivedKey = pbkdf2Sync(passphrase, salt, iterations, 32, 'sha256');

    const cipher = createCipheriv('aes-256-gcm', derivedKey, iv);
    const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    const packed = Buffer.concat([ciphertext, authTag]);

    return {
        v: 1,
        alg: 'aes-256-gcm',
        kdf: 'pbkdf2-sha256',
        iterations,
        salt: toBase64(salt),
        iv: toBase64(iv),
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
    const packed = fromBase64(envelope.data);
    const authTag = packed.slice(packed.length - 16);
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

const encToBase = (name) => name.replace('.enc.json', '');
const baseToIife = (base) => join(DATA_DIR, `${base}.iife.js`);
const baseToEnc = (base) => join(ENC_DIR, `${base}.enc.json`);
const isInitBase = (base) => base.endsWith('.init');

const loadFromEnc = (base) => {
    const encPath = baseToEnc(base);
    if (!existsSync(encPath)) {
        return null;
    }

    const key = getKey();
    const envelope = JSON.parse(readFileSync(encPath, 'utf8'));
    const plaintext = decryptEnvelope(envelope, key);
    return JSON.parse(plaintext);
};

// ── Runtime load: iife first, then enc ──────────────────────────────────────

export const loadMockData = (base, { defaultValue = undefined } = {}) => {
    const iifePath = baseToIife(base);

    if (existsSync(iifePath)) {
        return evalIife(readFileSync(iifePath, 'utf8'), iifePath);
    }

    const fromEnc = loadFromEnc(base);
    if (fromEnc !== null) {
        return fromEnc;
    }

    if (defaultValue !== undefined) {
        return defaultValue;
    }

    throw new Error(
        `Mock data not found for "${base}". Tried ${base}.iife.js and enc/${base}.enc.json`,
    );
};

export const writeMockData = (base, data, { indent = 2 } = {}) => {
    mkdirSync(DATA_DIR, { recursive: true });
    const iifePath = baseToIife(base);
    const iifeContent = `(() => (${JSON.stringify(data, null, indent)}))()\n`;
    writeFileSync(iifePath, iifeContent, 'utf8');
};

// ── Startup: decrypt when enc is newer than iife ─────────────────────────────

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
        const base = encToBase(encFile);
        if (isInitBase(base)) {
            continue;
        }
        const iifePath = baseToIife(base);
        const encPath = join(ENC_DIR, encFile);

        try {
            if (!force && existsSync(iifePath)) {
                const iifeMtime = statSync(iifePath).mtimeMs;
                const encMtime = statSync(encPath).mtimeMs;
                if (iifeMtime >= encMtime) {
                    continue;
                }
            }

            const envelope = JSON.parse(readFileSync(encPath, 'utf8'));
            const plaintext = decryptEnvelope(envelope, key);
            const data = JSON.parse(plaintext);

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

export const decryptMissingIifeFiles = decryptChangedIifeFiles;

// ── Encrypt: iife files newer than enc counterpart ──────────────────────────

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
        const base = iifeFile.replace('.iife.js', '');
        if (isInitBase(base)) {
            continue;
        }
        const iifePath = join(DATA_DIR, iifeFile);
        const encPath = baseToEnc(base);

        try {
            if (!force && existsSync(encPath)) {
                const iifeMtime = statSync(iifePath).mtimeMs;
                const encMtime = statSync(encPath).mtimeMs;
                if (iifeMtime <= encMtime) {
                    continue;
                }
            }

            const content = readFileSync(iifePath, 'utf8');
            const data = evalIife(content, iifePath);
            const plaintext = dataToJson(data);
            const envelope = encryptPlaintext(plaintext, key);

            writeFileSync(encPath, `${JSON.stringify(envelope, null, 2)}\n`, 'utf8');
            encrypted++;
            changedFiles.push(iifeFile);
            console.log(`🔐 Encrypted: ${iifeFile} -> enc/${base}.enc.json`);
        } catch (err) {
            console.error(`❌ Encrypt failed for ${iifeFile}: ${err.message}`);
        }
    }

    if (encrypted === 0) {
        console.log(force
            ? '✅ No IIFE files found to encrypt.'
            : '✅ No IIFE files changed since last encrypt – skipped.');
    } else {
        console.log(`🔐 Encryption complete. Files encrypted: ${encrypted}`);
    }

    return { encrypted, scanned, changedFiles, reason: 'ok' };
};
