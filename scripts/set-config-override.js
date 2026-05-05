import { mkdirSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';

const toBoolean = (value, fallback = false) => {
  if (typeof value === 'boolean') return value;
  if (typeof value !== 'string') return fallback;

  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return fallback;
};

const desired = toBoolean(process.argv[2], false);
const target = resolve(process.cwd(), process.argv[3] || './public/config-override.js');

const content = `globalThis.configOverride = {\n  msw: ${desired},\n};\n`;

mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, content, 'utf8');

console.log(`[config-override] Wrote ${target} with msw=${desired}`);