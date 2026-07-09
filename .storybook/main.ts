import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  getFormhelperAliases,
  getFormhelperStoriesDir,
} from '../config/formhelper-resolve.js';

const STORYBOOK_BASE_PATH = '/storybook-dist';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const seedRoot = path.resolve(dirname, '..');

// Resolve story location at config load time.
// VITE_FORMHELPER_LOCAL=true → sibling repo's src/stories (live reload).
// Default (npm)             → node_modules/kes-formhelper-mui/src/stories.
// null                      → npm package predates story shipping; only seed stories shown.
const storiesDir = getFormhelperStoriesDir({ env: process.env, seedDir: seedRoot });

if (!storiesDir) {
  console.warn('[storybook] Formhelper stories not available. Set VITE_FORMHELPER_LOCAL=true to use the sibling repo, or upgrade kes-formhelper-mui to a version that ships src/stories.');
}

const formhelperStories = storiesDir
  ? [
      `${storiesDir}/**/*.mdx`,
      `${storiesDir}/**/*.stories.@(js|jsx|mjs|ts|tsx)`,
    ]
  : [];

const config: StorybookConfig = {
  stories: [
    ...formhelperStories,
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/react-vite',
  managerHead: (head, { configType }) => {
    const defaultRedirect = `<script>(function(){
      var p = new URLSearchParams(window.location.search).get('path');
      if (!p) window.location.replace(window.location.href.split('?')[0] + '?path=/docs/formhelper--docs');
    })()</script>`;
    if (configType === 'PRODUCTION') {
      return `${head}<base href="${STORYBOOK_BASE_PATH}/" />${defaultRedirect}`;
    }
    return `${head}${defaultRedirect}`;
  },
  async viteFinal(config, { configType }) {
    const isProduction = configType === 'PRODUCTION';
    // In production Storybook builds always use the npm package, never local source.
    const command = isProduction ? 'build' : 'serve';
    const formhelperAliases = getFormhelperAliases({ env: process.env, command, seedDir: seedRoot });

    if (isProduction) {
      config.base = `${STORYBOOK_BASE_PATH}/`;
    }

    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      // Seed source alias — required for preview.tsx and any seed helpers.
      '@': path.resolve(seedRoot, 'src'),
      // @formhelper → npm dist (default) or live sibling src (VITE_FORMHELPER_LOCAL).
      ...formhelperAliases,
      // Preserve any aliases Storybook itself set.
      ...(typeof config.resolve.alias === 'object' && !Array.isArray(config.resolve.alias)
        ? config.resolve.alias
        : {}),
    };

    return config;
  },
};

export default config;
