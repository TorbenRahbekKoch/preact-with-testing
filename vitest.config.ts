import tsconfigPaths from 'vite-tsconfig-paths';
import {
  configDefaults,
  defineConfig,
  mergeConfig,
  type UserConfig,
} from 'vitest/config';

import viteConfig from './vite.config';


const config = mergeConfig(
  viteConfig, // Extending from an existing Vite configuration (`vite.config.ts` file)
  defineConfig({
    test: {
      ...configDefaults, // Extending Vitest's default options      
      environment: 'jsdom'
    },
    plugins: [tsconfigPaths()],
  }) as UserConfig
);

export default config;