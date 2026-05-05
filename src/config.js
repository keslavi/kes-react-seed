/*
  note: values are set for local development. 
  eventually, public/config-override.js 
  will be used to adjust with celestial variables in deployment.
*/
export const config= {
  api:"/api",
  reduxLogger:false,
  env:"local",
  debug: import.meta.env.VITEST ? false : true,
  msw:false,
}

const parseBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value !== 'string') return undefined;

  const normalized = value.trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  return undefined;
};

const runtimeOverride = globalThis?.configOverride || globalThis?.config || {};
const envMsw = parseBoolean(import.meta.env?.VITE_MSW);
const overrideMsw = parseBoolean(runtimeOverride?.msw);

if (!globalThis.config) {
  globalThis.config = {
    ...config,
    ...runtimeOverride,
    msw: overrideMsw ?? envMsw ?? config.msw,
  };
}

config.api = globalThis.config.api;
config.reduxLogger = globalThis.config.reduxLogger;
config.env = globalThis.config.env;
config.debug = globalThis.config.debug;
config.msw = globalThis.config.msw;

export default config;
