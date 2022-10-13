import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import {URL, fileURLToPath} from 'node:url';

// Scss library files
const SCSS_FILE_LIST = [
  '_colors',
  '_sizes',
  '_mixins',
  '_media',
  '_fonts'
];

// Aliases for path
const ALIASES = {
  '@': fileURLToPath(new URL('./src', import.meta.url))
};

/**
 * Injecting SCSS import to string
 * @pathList - Paths to libraries
 * @return One-liner to import
 */
function injectSCSSImport(pathList: string[]): string {
  return pathList.map(path => {
    return `@import "@/scss/${path}.scss";`;
  }).join('');
}

// Vite configuration
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: ALIASES
  },
  css: {
    preprocessorOptions: { 
      scss: {
        additionalData: injectSCSSImport(SCSS_FILE_LIST)
      },
    },
  },
});
