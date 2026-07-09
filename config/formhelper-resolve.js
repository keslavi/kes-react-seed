import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const seedRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_LOCAL_PATH = "../2-kes-formhelper";

/** URL path where the host app serves kes-formhelper-mui storybook-static. */
export const FORMHELPER_STORYBOOK_BASE_PATH = "/formhelper-storybook";

/** Folder name used by vite-plugin-static-copy under public/dist. */
export const FORMHELPER_STORYBOOK_PUBLIC_DIR = "formhelper-storybook";

function isFormhelperLocalEnabled(value) {
  if (value === undefined || value === null || String(value).trim() === "") {
    return false;
  }

  const normalized = String(value).trim().toLowerCase();
  return normalized === "true" || normalized === "1";
}

/**
 * Resolve @formhelper (and @x when using local source) for Vite/Vitest.
 * package.json always installs kes-formhelper-mui from npm.
 * VITE_FORMHELPER_LOCAL must be true or 1 to alias to a sibling repo in dev;
 * omitted, commented out, empty, or false all use the npm package.
 */
export function getFormhelperAliases({
  env = {},
  command = "serve",
  seedDir = seedRoot,
} = {}) {
  // Point at the pre-built ESM file so Vite serves it as-is (see optimizeDeps.exclude).
  const npmDist = path.resolve(
    seedDir,
    "node_modules/kes-formhelper-mui/dist/formhelper-mui.js",
  );
  const useLocal = command !== "build" && isFormhelperLocalEnabled(env.VITE_FORMHELPER_LOCAL);

  if (!useLocal) {
    return { "@formhelper": npmDist };
  }

  const localRoot = path.resolve(seedDir, env.VITE_FORMHELPER_PATH || DEFAULT_LOCAL_PATH);
  const localEntry = path.join(localRoot, "src/index.ts");

  if (!existsSync(localEntry)) {
    console.warn(
      `[formhelper] VITE_FORMHELPER_LOCAL is set but ${localEntry} was not found; using npm package.`,
    );
    return { "@formhelper": npmDist };
  }

  return {
    "@formhelper": localEntry,
    // formhelper-mui internal imports use `@x/…` so they never collide with seed `@/`
    "@x": path.join(localRoot, "src"),
  };
}

/**
 * Directory containing the published Storybook static build inside kes-formhelper-mui.
 */
export function getFormhelperStorybookStaticDir(seedDir = seedRoot) {
  return path.resolve(seedDir, "node_modules/kes-formhelper-mui/storybook-static");
}
