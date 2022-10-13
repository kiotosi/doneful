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
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
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
