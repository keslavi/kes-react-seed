/*
  note: values are set for local development. 
  eventually, public/config-override.js 
  will be used to adjust with celestial variables in deployment.
*/
const isTruthyEnv = (key, fallback = false) => {
  const value = import.meta.env[key];
  if (value === undefined) return fallback;
  return value === 'true';
};

const configOverride = () => {
  const override = globalThis.configOverride ?? {};
  const toBoolean = (value) => {
    if (typeof value === 'boolean') return value;
    if (typeof value !== 'string') return value;

    const normalized = value.trim().toLowerCase();
    if (['true', 'yes'].includes(normalized)) return true;
    if (['false', 'no'].includes(normalized)) return false;
    return value;
  };

  return Object.fromEntries(
    Object.entries(override).map(([key, value]) => [key, toBoolean(value)])
  );
};

const buildEnv = () => {
  const href = globalThis.location?.hostname?.toLowerCase?.() ?? "";

  return Object.freeze({
    isLocal: href.includes("localhost"),
    isDev: href.includes("dev"),
    isPl: href.includes("pl"),
  });
};

export const config = {
  api: "/api",
  reduxLogger: false,
  env: buildEnv(),
  debug: isTruthyEnv('VITE_DEBUG',true),
  msw: isTruthyEnv('VITE_MSW'),
  ...configOverride(),
};
globalThis.config = config;
globalThis.env = config.env;
export default config;
