import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

/**
 * Injecting SCSS import to string
 * @path - Path to scss file
 */
function injectSCSSImport(path: string): string {
  return '@import "' + path + '";';
}

const INDEX_SCSS = 'src/style.scss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: { 
      scss: {
        additionalData: injectSCSSImport(INDEX_SCSS)
      },
    },
  },
});
