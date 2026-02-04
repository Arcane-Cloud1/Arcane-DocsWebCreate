import { build as viteBuild } from 'vite';
import pluginVue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';
import { markdownPlugin } from './plugins/markdown.js';
import { routesPlugin } from './plugins/routes.js';
import { searchPlugin } from './plugins/search.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLIENT_ROOT = path.resolve(__dirname, '../client');

export async function build(root) {
  console.log('Building for root:', root);
  
  await viteBuild({
    root: CLIENT_ROOT,
    base: './',
    build: {
      outDir: path.resolve(root, 'dist'),
      emptyOutDir: true
    },
    plugins: [
      markdownPlugin(),
      routesPlugin(root, CLIENT_ROOT),
      searchPlugin(root),
      pluginVue({
        include: [/\.vue$/, /\.md$/]
      })
    ]
  });
}
