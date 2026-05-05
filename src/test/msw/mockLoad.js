const decryptEnvelopeNode = async (envelope, passphrase) => {
  const { pbkdf2Sync, createDecipheriv } = await import('crypto');

  const iterations = envelope.iterations || 100000;
  const salt = Buffer.from(envelope.salt, 'base64');
  const iv = Buffer.from(envelope.iv, 'base64');
  const packed = Buffer.from(envelope.data, 'base64');
  const ciphertext = packed.subarray(0, packed.length - 16);
  const authTag = packed.subarray(packed.length - 16);

  const key = pbkdf2Sync(passphrase, salt, iterations, 32, 'sha256');
  const decipher = createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString('utf8');
};

const b64ToBytesBrowser = (base64) => {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
};

const decryptEnvelopeBrowser = async (envelope, passphrase) => {
  const iterations = envelope.iterations || 100000;
  const encoder = new TextEncoder();

  const keyMaterial = await globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  const aesKey = await globalThis.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      hash: 'SHA-256',
      salt: b64ToBytesBrowser(envelope.salt),
      iterations,
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  const decrypted = await globalThis.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: b64ToBytesBrowser(envelope.iv),
    },
    aesKey,
    b64ToBytesBrowser(envelope.data)
  );

  return new TextDecoder().decode(decrypted);
};

const decryptEnvelope = async (envelope, passphrase, isNode) => {
  if (!envelope || envelope.v !== 1 || envelope.alg !== 'aes-256-gcm') {
    throw new Error('Unsupported encrypted envelope format');
  }

  return isNode
    ? decryptEnvelopeNode(envelope, passphrase)
    : decryptEnvelopeBrowser(envelope, passphrase);
};

const getMockDataKey = (isNode) => {
  const keyHarcoded = 'SteveCranford';
  if (isNode) {
    return process.env.MOCK_DATA_KEY || keyHarcoded;
  }

  return (
    globalThis.__MOCK_DATA_KEY__ ||
    import.meta.env?.VITE_MOCK_DATA_KEY ||
    keyHarcoded
  );
};

const isTruthyFlag = (value) => ['1', 'true', 'yes', 'on'].includes(String(value || '').toLowerCase());

const getEncryptedOnlyMode = (isNode) => {
  if (isNode) {
    return isTruthyFlag(process.env.MOCK_DATA_ENCRYPTED_ONLY);
  }

  return isTruthyFlag(
    globalThis.__MOCK_DATA_ENCRYPTED_ONLY__ ||
    import.meta.env?.VITE_MOCK_DATA_ENCRYPTED_ONLY
  );
};

export const clearMockLoadCache = () => {};

export const mockLoad = async (url) => {
  // Simple and reliable Node.js detection
  const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
  const encryptedOnly = getEncryptedOnlyMode(isNode);
  
//  console.log(["all"], `[MSW] mockLoad called for ${url}, isNode: ${isNode}`);
  
  if (isNode) {
    // Running in Node.js (test environment)
    try {
      // Dynamic imports for Node.js modules
      const { readFileSync, existsSync } = await import('fs');
      const { fileURLToPath } = await import('url');
      const { dirname, join } = await import('path');
      
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);

      const plainFileName = `${url}.iife.js`;
      const encryptedFileName = `${url}.enc.json`;

      const encryptedCandidatePaths = [
        join(__dirname, '..', '..', '..', '..', 'server-koa', 'data', 'enc', encryptedFileName),
        join(__dirname, '..', '..', '..', 'server-koa', 'data', 'enc', encryptedFileName),
        join(__dirname, '..', '..', '..', 'public', 'mock', 'enc', encryptedFileName),
      ];

      const plainCandidatePaths = [
        join(__dirname, '..', '..', '..', '..', 'server-koa', 'data', plainFileName),
        join(__dirname, '..', '..', '..', 'server-koa', 'data', plainFileName),
        join(__dirname, '..', '..', '..', 'public', 'mock', plainFileName),
      ];

      if (!encryptedOnly) {
        const dataPath = plainCandidatePaths.find((path) => existsSync(path));
        if (dataPath) {
          // Read the IIFE file content
          const fileContent = readFileSync(dataPath, 'utf8');

          // Execute the IIFE and return the result
          const data = eval(fileContent);

         //console.log(["all"], `[MSW] Successfully loaded mock data for ${url} from ${dataPath}`);
          return data;
        }
      }

      let encryptedError = null;

      const encryptedPath = encryptedCandidatePaths.find((path) => existsSync(path));
      if (encryptedPath) {
        try {
          const mockDataKey = getMockDataKey(true);
          if (!mockDataKey) {
            throw new Error('MOCK_DATA_KEY is required to read encrypted mock data');
          }

          const encryptedContent = readFileSync(encryptedPath, 'utf8');
          const envelope = JSON.parse(encryptedContent);
          const decryptedText = await decryptEnvelope(envelope, mockDataKey, true);
          return JSON.parse(decryptedText);
        } catch (error) {
          encryptedError = error;
        }
      }

      if (encryptedOnly) {
        const prefix = encryptedError ? `Encrypted load failed: ${encryptedError.message}. ` : '';
        throw new Error(`${prefix}Plaintext mock fallback is disabled (MOCK_DATA_ENCRYPTED_ONLY=true)`);
      }

      const prefix = encryptedError ? `Encrypted load failed: ${encryptedError.message}. ` : '';
      throw new Error(`${prefix}Mock file not found. Tried plain paths: ${plainCandidatePaths.join(' | ')}`);
      
    } catch (error) {
      console.error(["all"], `[MSW] Error loading mock data for ${url}:`, error.message);
      throw new Error(`Failed to load mock data for ${url}: ${error.message}`);
    }
  } else {
    // Running in browser - fetch and eval IIFE files
    try {
      if (!encryptedOnly) {
        const response = await fetch(`/mock/${url}.iife.js`);
        if (response.ok) {
          const fileContent = await response.text();
          //console.log(["all"], `[MSW] Successfully fetched /mock/${url}.iife.js, content length: ${fileContent.length}`);

          // Execute the IIFE and return the result
          const data = eval(fileContent);

          // console.log(["all"], `[MSW] Successfully loaded mock data for ${url} from browser`);
          return data;
        }

        if (response.status !== 404) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      }

      let encryptedError = null;

      const encryptedResponse = await fetch(`/mock/enc/${url}.enc.json`);
      if (encryptedResponse.ok) {
        try {
          const mockDataKey = getMockDataKey(false);
          if (!mockDataKey) {
            throw new Error('Mock data key is missing. Set window.__MOCK_DATA_KEY__ or VITE_MOCK_DATA_KEY');
          }

          const envelope = await encryptedResponse.json();
          const decryptedText = await decryptEnvelope(envelope, mockDataKey, false);
          return JSON.parse(decryptedText);
        } catch (error) {
          encryptedError = error;
        }
      }

      if (encryptedOnly) {
        const prefix = encryptedError ? `Encrypted load failed: ${encryptedError.message}. ` : '';
        throw new Error(`${prefix}Plaintext mock fallback is disabled (encrypted-only mode)`);
      }

      const prefix = encryptedError ? `Encrypted load failed: ${encryptedError.message}. ` : '';
      throw new Error(`${prefix}Encrypted fallback not available for /mock/enc/${url}.enc.json`);
      
    } catch (error) {
      console.error(["all"], `[MSW] Error loading mock data for ${url} from browser:`, error.message);
      throw new Error(`Failed to load mock data for ${url} from browser: ${error.message}`);
    }
  }
};
