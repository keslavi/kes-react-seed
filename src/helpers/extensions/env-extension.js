import config from '@/config';
if (!globalThis.env) {
  const href = globalThis.location?.hostname?.toLowerCase?.() ?? "";

  const env = {
    isLocal: href.includes("localhost"),
    isDev: href.includes("dev"),
    isPl: href.includes("pl"),
  }
  globalThis.env = Object.freeze(env);
}

if (!globalThis.config) {
  globalThis.config = config;
}
